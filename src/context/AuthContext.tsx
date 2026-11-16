import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  DEFAULT_DEVICE_PREFERENCES,
  DevicePreferences,
  UserAccount,
} from '../types/tourPro3';

interface StoredAccountRecord {
  account: UserAccount;
  passwordHash: string;
  preferences: DevicePreferences;
}

interface AuthContextValue {
  user: UserAccount | null;
  preferences: DevicePreferences;
  isAuthReady: boolean;
  savedNotice: string | null;
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  updatePreferences: (patch: Partial<DevicePreferences>) => void;
  saveCurrentPreferences: () => void;
  resetPreferences: () => void;
}

const ACCOUNTS_KEY = 'jbl_tour_pro_3_accounts_v1';
const SESSION_KEY = 'jbl_tour_pro_3_session_v1';
const GUEST_PREFS_KEY = 'jbl_tour_pro_3_guest_prefs_v1';

function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `h_${Math.abs(hash).toString(36)}_${input.length}`;
}

function readAccounts(): Record<string, StoredAccountRecord> {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, StoredAccountRecord>;
  } catch {
    return {};
  }
}

function writeAccounts(records: Record<string, StoredAccountRecord>) {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(records));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [preferences, setPreferences] = useState<DevicePreferences>(DEFAULT_DEVICE_PREFERENCES);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      const sessionEmail = localStorage.getItem(SESSION_KEY);
      if (sessionEmail) {
        const accounts = readAccounts();
        const existing = accounts[sessionEmail.toLowerCase()];
        if (existing) {
          setUser(existing.account);
          setPreferences({ ...DEFAULT_DEVICE_PREFERENCES, ...existing.preferences });
          setIsAuthReady(true);
          return;
        }
      }
      const guestRaw = localStorage.getItem(GUEST_PREFS_KEY);
      if (guestRaw) {
        const parsed = JSON.parse(guestRaw) as Partial<DevicePreferences>;
        setPreferences({ ...DEFAULT_DEVICE_PREFERENCES, ...parsed });
      }
    } catch {
      // Fallback to defaults
    } finally {
      setIsAuthReady(true);
    }
  }, []);

  const flashNotice = (msg: string) => {
    setSavedNotice(msg);
    window.setTimeout(() => {
      setSavedNotice((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const register = (name: string, email: string, password: string) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2) {
      return { ok: false, error: 'Please enter your full name (at least 2 characters).' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return { ok: false, error: 'Please enter a valid email address.' };
    }
    if (password.length < 6) {
      return { ok: false, error: 'Password must be at least 6 characters.' };
    }

    const accounts = readAccounts();
    if (accounts[cleanEmail]) {
      return { ok: false, error: 'An account with this email already exists. Please sign in.' };
    }

    const serialSuffix = Math.floor(100000 + Math.random() * 899999);
    const newAccount: UserAccount = {
      id: `usr_${Date.now().toString(36)}`,
      name: cleanName,
      email: cleanEmail,
      createdAt: new Date().toISOString(),
      deviceSerial: `TP3-${serialSuffix}`,
    };

    const initialPrefs: DevicePreferences = {
      ...preferences,
      updatedAt: new Date().toISOString(),
    };

    accounts[cleanEmail] = {
      account: newAccount,
      passwordHash: simpleHash(password),
      preferences: initialPrefs,
    };

    writeAccounts(accounts);
    try {
      localStorage.setItem(SESSION_KEY, cleanEmail);
    } catch {
      // Ignore storage error
    }

    setUser(newAccount);
    setPreferences(initialPrefs);
    flashNotice('Account created and Tour Pro 3 paired');
    return { ok: true };
  };

  const login = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return { ok: false, error: 'Please enter a valid email address.' };
    }
    if (!password) {
      return { ok: false, error: 'Please enter your password.' };
    }

    const accounts = readAccounts();
    const record = accounts[cleanEmail];
    if (!record) {
      return { ok: false, error: 'No account found for that email. Create a free account first.' };
    }
    if (record.passwordHash !== simpleHash(password)) {
      return { ok: false, error: 'Incorrect password. Please try again.' };
    }

    try {
      localStorage.setItem(SESSION_KEY, cleanEmail);
    } catch {
      // Ignore storage error
    }

    setUser(record.account);
    setPreferences({ ...DEFAULT_DEVICE_PREFERENCES, ...record.preferences });
    flashNotice(`Welcome back, ${record.account.name.split(' ')[0]}`);
    return { ok: true };
  };

  const logout = () => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore storage error
    }
    setUser(null);
    flashNotice('Signed out');
  };

  const persistPrefs = (next: DevicePreferences) => {
    if (user) {
      const accounts = readAccounts();
      const key = user.email.toLowerCase();
      if (accounts[key]) {
        accounts[key] = {
          ...accounts[key],
          preferences: next,
        };
        writeAccounts(accounts);
      }
    } else {
      try {
        localStorage.setItem(GUEST_PREFS_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage error
      }
    }
  };

  const updatePreferences = (patch: Partial<DevicePreferences>) => {
    setPreferences((prev) => {
      const next: DevicePreferences = {
        ...prev,
        ...patch,
        updatedAt: new Date().toISOString(),
      };
      persistPrefs(next);
      return next;
    });
  };

  const saveCurrentPreferences = () => {
    const stamped: DevicePreferences = {
      ...preferences,
      updatedAt: new Date().toISOString(),
    };
    setPreferences(stamped);
    persistPrefs(stamped);
    flashNotice(
      user
        ? `Profile synced to ${user.deviceSerial}`
        : 'Saved locally — sign in to bind to your profile'
    );
  };

  const resetPreferences = () => {
    const fresh: DevicePreferences = {
      ...DEFAULT_DEVICE_PREFERENCES,
      updatedAt: new Date().toISOString(),
    };
    setPreferences(fresh);
    persistPrefs(fresh);
    flashNotice('Restored JBL Studio defaults');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        preferences,
        isAuthReady,
        savedNotice,
        register,
        login,
        logout,
        updatePreferences,
        saveCurrentPreferences,
        resetPreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
