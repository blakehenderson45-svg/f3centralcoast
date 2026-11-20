import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, ArrowUpRight } from 'lucide-react';
import { CENTRAL_COAST_LINKS } from '../data/centralCoastData';

const NAV_LINKS = [
  { label: 'Mission', href: '#mission' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'First Timers', href: '#first-timers' },
  { label: 'Culture', href: '#culture' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Resources', href: '#join' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#121315]/95 backdrop-blur-md border-b border-[#2a2c34] shadow-[0_8px_30px_rgba(0,0,0,0.55)]'
          : 'bg-gradient-to-b from-[#0d0e10]/90 via-[#0d0e10]/50 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <a href="#top" className="flex items-center gap-3 group shrink-0">
          <img
            src="/icon.svg"
            alt="Central Coast F3 Shield"
            className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-[0_4px_12px_rgba(248,94,94,0.35)] group-hover:scale-105 transition-transform"
          />
          <div className="leading-none">
            <div className="font-display text-lg sm:text-xl font-bold tracking-wider text-white uppercase flex items-center gap-1.5">
              <span>CENTRAL COAST</span>
              <span className="text-[#f85e5e]">F3</span>
            </div>
            <div className="font-mono text-[10px] tracking-[0.18em] text-[#8d919c] uppercase mt-0.5 flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5 text-[#f85e5e]" />
              <span>SANTA BARBARA • CARPINTERIA</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 min-w-0">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap px-2.5 xl:px-3 py-2 text-[11px] xl:text-xs font-semibold uppercase tracking-[0.12em] text-[#b4b8c2] hover:text-white transition-colors relative after:content-[''] after:absolute after:left-2.5 after:right-2.5 after:bottom-1 after:h-[2px] after:bg-[#f85e5e] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <a
            href="#schedule"
            className="whitespace-nowrap px-3 py-2 text-[11px] xl:text-xs font-bold uppercase tracking-wider text-[#e4e5e8] hover:text-white border border-[#343741] hover:border-[#525666] rounded bg-[#1a1b1e]/80 transition-colors"
          >
            Schedule
          </a>
          <a
            href={CENTRAL_COAST_LINKS.fngSlackInvite}
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] xl:text-xs font-bold uppercase tracking-wider bg-[#f85e5e] hover:bg-[#ff6d6d] text-white rounded shadow-[0_4px_16px_rgba(248,94,94,0.3)] transition-all active:scale-[0.98]"
          >
            <span>Join Slack</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="lg:hidden p-2 rounded border border-[#32343d] bg-[#1a1b1e]/90 text-[#e4e5e8] hover:text-[#f85e5e] transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#141518] border-b border-[#2c2e36] px-4 pt-2 pb-5 shadow-2xl">
          <nav className="flex flex-col divide-y divide-[#23252c]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3.5 text-sm font-display uppercase tracking-[0.16em] text-[#d6d9e0] hover:text-[#f85e5e] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="grid grid-cols-2 gap-2.5 mt-4">
            <a
              href="#schedule"
              onClick={() => setMobileOpen(false)}
              className="text-center py-2.5 px-3 rounded border border-[#363943] bg-[#1d1f24] text-xs font-bold uppercase tracking-wider text-white"
            >
              Schedule & Map
            </a>
            <a
              href={CENTRAL_COAST_LINKS.fngSlackInvite}
              target="_blank"
              rel="noreferrer"
              className="text-center py-2.5 px-3 rounded bg-[#f85e5e] text-xs font-bold uppercase tracking-wider text-white"
            >
              Join Slack (FNG)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
