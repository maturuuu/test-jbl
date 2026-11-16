import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenAuth: (initialMode?: 'login' | 'register') => void;
  onOpenDashboard: () => void;
}

const NAV_LINKS = [
  { href: '#overview', label: 'Overview' },
  { href: '#features', label: 'Features' },
  { href: '#guide', label: 'Guide & Box' },
  { href: '#specs', label: 'Tech Specs' },
  { href: '#studio', label: 'Audio Studio' },
];

export function Navbar({ onOpenAuth, onOpenDashboard }: NavbarProps) {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handlePrimaryAction = () => {
    setMobileOpen(false);
    if (user) {
      onOpenDashboard();
    } else {
      onOpenAuth('login');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0A0A0B]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#overview"
          className="font-display text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] rounded-sm"
        >
          JBL <span className="text-[#FF5722]">TOUR PRO 3</span>
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-white hover:underline hover:decoration-[#FF5722] hover:underline-offset-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#FF5722] px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#e64a19] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
          >
            {user ? `My Studio · ${user.name.split(' ')[0]}` : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex md:hidden items-center justify-center rounded-lg border border-white/10 bg-[#141416] p-2.5 text-zinc-200 hover:bg-[#1C1C20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] min-w-[44px] min-h-[44px]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0A0A0B] px-4 py-4 space-y-2">
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-[#141416] hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="w-full rounded-lg bg-[#FF5722] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#e64a19] transition-colors cursor-pointer min-h-[44px]"
            >
              {user ? `Open Studio (${user.name.split(' ')[0]})` : 'Sign In / Register'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
