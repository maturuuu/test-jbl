import { CheckCircle2, FileText, Instagram, Mail, Radio, Share2, Youtube } from 'lucide-react';
import React, { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'subscribed'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) {
      setStatus('error');
      setErrorMsg('Enter a valid email address to subscribe.');
      return;
    }
    setStatus('subscribed');
    setErrorMsg('');
    setEmail('');
  };

  return (
    <footer className="bg-[#0A0A0B] pt-16 pb-10 text-zinc-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 pb-12 border-b border-white/10 md:grid-cols-12">
          {/* Brand & Social Column */}
          <div className="md:col-span-4 space-y-4">
            <a
              href="#overview"
              className="font-display text-lg font-extrabold tracking-tight text-white inline-block"
            >
              JBL <span className="text-[#FF5722]">TOUR PRO 3</span>
            </a>
            <p className="text-xs leading-relaxed text-zinc-400 max-w-xs">
              Flagship true wireless noise-cancelling earbuds with hybrid dual drivers and the
              touchscreen Smart Charging Case™ by Harman International Industries.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="#overview"
                aria-label="JBL YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#141416] text-zinc-400 hover:border-[#FF5722] hover:text-white transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#overview"
                aria-label="JBL Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#141416] text-zinc-400 hover:border-[#FF5722] hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#overview"
                aria-label="JBL Broadcast Audio"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#141416] text-zinc-400 hover:border-[#FF5722] hover:text-white transition-colors"
              >
                <Radio className="h-4 w-4" />
              </a>
              <a
                href="#overview"
                aria-label="Share JBL Tour Pro 3"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#141416] text-zinc-400 hover:border-[#FF5722] hover:text-white transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product & Documentation Links */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider">Product</p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#overview" className="hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Smart Charging Case™
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  True Adaptive ANC
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-white transition-colors">
                  Tech Specs
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider">Support</p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#guide" className="hover:text-white transition-colors">
                  Touch Controls
                </a>
              </li>
              <li>
                <a href="#guide" className="hover:text-white transition-colors">
                  LED &amp; Factory Reset
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-white transition-colors">
                  Personal Audio Studio
                </a>
              </li>
              <li>
                <a
                  href="/assets/aistudio/LS_JBL_Tour_Pro_3_QSG_Multilingual_fab6f60d.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#FF5722] transition-colors"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Quick Start Guide (PDF)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Sign-Up Form */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider">
              Firmware &amp; Sound Updates
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Receive firmware notes, JBL Headphones app releases, and acoustic tuning drops.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2" noValidate>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status !== 'idle') setStatus('idle');
                    }}
                    placeholder="you@example.com"
                    aria-label="Newsletter email address"
                    className="w-full rounded-lg border border-white/10 bg-[#141416] py-2.5 pl-9 pr-3 text-xs text-white placeholder:text-zinc-500 focus:border-[#FF5722] focus:outline-none min-h-[40px]"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-[#FF5722] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#e64a19] transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[40px]"
                >
                  Subscribe
                </button>
              </div>

              {status === 'error' && (
                <p role="alert" className="text-[11px] text-red-400">
                  {errorMsg}
                </p>
              )}
              {status === 'subscribed' && (
                <p className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Subscribed to JBL Tour Pro 3 updates.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Legal & Compliance Row */}
        <div className="mt-8 flex flex-col gap-3 text-[11px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            HARMAN International Industries, Incorporated · Bluetooth® &amp; Auracast™ marks owned
            by Bluetooth SIG, Inc.
          </p>
          <p className="font-mono">
            FCC ID: APITOURPRO3 / APITOURPRO3C · Specifications subject to change without notice.
          </p>
        </div>
      </div>
    </footer>
  );
}
