import { Eye, EyeOff, Lock, Mail, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ isOpen, initialMode, onClose, onSuccess }: AuthModalProps) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setError(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (mode === 'register') {
      const res = register(name, email, password);
      if (!res.ok) {
        setError(res.error ?? 'Unable to create account.');
        return;
      }
      onSuccess();
    } else {
      const res = login(email, password);
      if (!res.ok) {
        setError(res.error ?? 'Unable to sign in.');
        return;
      }
      onSuccess();
    }
  };

  const handleDemoAccount = () => {
    const demoEmail = 'alex.mercer@audio.studio';
    const demoPass = 'TourPro3!2026';
    const loginAttempt = login(demoEmail, demoPass);
    if (loginAttempt.ok) {
      onSuccess();
      return;
    }
    const regAttempt = register('Alex Mercer', demoEmail, demoPass);
    if (regAttempt.ok) {
      onSuccess();
    } else {
      setError(regAttempt.error ?? 'Could not initialize demo account.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#141416] p-6 sm:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close authentication dialog"
          className="absolute right-4 top-4 rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-1.5">
          <p className="text-xs font-medium tracking-wider text-[#FF5722] uppercase">
            JBL Headphones Account
          </p>
          <h2 id="auth-modal-title" className="font-display text-2xl font-bold text-white">
            {mode === 'login' ? 'Sign in to your Audio Studio' : 'Create your Tour Pro 3 profile'}
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Save custom Equalizer curves, Spatial Sound modes, and Smart Charging Case™ shortcuts.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="mt-6 grid grid-cols-2 rounded-lg border border-white/10 bg-[#0A0A0B] p-1">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`rounded-md py-2 text-xs font-semibold transition-colors cursor-pointer ${
              mode === 'login' ? 'bg-[#FF5722] text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`rounded-md py-2 text-xs font-semibold transition-colors cursor-pointer ${
              mode === 'register' ? 'bg-[#FF5722] text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          {mode === 'register' && (
            <div className="space-y-1.5">
              <label htmlFor="auth-name" className="block text-xs font-medium text-zinc-300">
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  id="auth-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Mercer"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#0A0A0B] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#FF5722] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="auth-email" className="block text-xs font-medium text-zinc-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-white/10 bg-[#0A0A0B] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#FF5722] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="auth-password" className="block text-xs font-medium text-zinc-300">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                required
                className="w-full rounded-lg border border-white/10 bg-[#0A0A0B] py-2.5 pl-9 pr-10 text-sm text-white placeholder:text-zinc-500 focus:border-[#FF5722] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-[#FF5722] py-2.5 text-sm font-semibold text-white hover:bg-[#e64a19] transition-colors cursor-pointer min-h-[44px]"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account & Pair Device'}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <span className="text-xs text-zinc-400">Want to preview immediately?</span>
          <button
            type="button"
            onClick={handleDemoAccount}
            className="text-xs font-semibold text-[#FF5722] hover:underline cursor-pointer whitespace-nowrap"
          >
            Continue with Demo Account
          </button>
        </div>
      </div>
    </div>
  );
}
