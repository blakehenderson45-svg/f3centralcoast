import React from 'react';
import { MapPin, Clock, ExternalLink, Mail } from 'lucide-react';
import { CENTRAL_COAST_LINKS, WEEKLY_SCHEDULE } from '../data/centralCoastData';

export function Footer() {
  return (
    <footer className="bg-[#0e0f11] text-[#9ca0aa] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-10 pb-10 border-b border-[#22242b]">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img src="/icon.svg" alt="Central Coast F3" className="w-10 h-10" />
              <div>
                <div className="font-display text-xl font-bold uppercase tracking-wider text-white">
                  CENTRAL COAST <span className="text-[#f85e5e]">F3</span>
                </div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-[#7c808c] uppercase">
                  FITNESS /// FELLOWSHIP /// FAITH
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#8d919c] leading-relaxed max-w-md mb-4">
              A local chapter of F3 Nation serving Santa Barbara, Carpinteria, and California’s
              Central Coast. Free, peer-led outdoor workouts for men—rain or shine.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#cfd3dc]">
              “LEAVE NO MAN BEHIND, BUT LEAVE NO MAN WHERE YOU FIND HIM.”
            </p>
          </div>

          {/* Schedule Recap */}
          <div className="md:col-span-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white mb-4">
              WEEKLY BEATDOWNS
            </h4>
            <ul className="space-y-3 text-xs">
              {WEEKLY_SCHEDULE.map((s) => (
                <li key={s.id} className="flex items-start gap-2.5">
                  <Clock className="w-3.5 h-3.5 text-[#f85e5e] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold">
                      {s.day}s • {s.timeLabel}
                    </div>
                    <div className="text-[#8d919c] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#6c707d]" />
                      <span>
                        {s.aoName} ({s.city})
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white mb-4">
              LINKS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#mission" className="hover:text-white transition-colors">
                  Mission & 5 Core Principles
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-white transition-colors">
                  Schedule & Live AO Map
                </a>
              </li>
              <li>
                <a href="#first-timers" className="hover:text-white transition-colors">
                  First-Timers (FNG) Guide
                </a>
              </li>
              <li>
                <a href="#culture" className="hover:text-white transition-colors">
                  F3 Lexicon & Formats
                </a>
              </li>
              <li>
                <a
                  href={CENTRAL_COAST_LINKS.contactMailto}
                  className="inline-flex items-center gap-1.5 text-[#f85e5e] hover:text-[#ff7a7a] font-semibold transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  <span>Contact Us (F3CentralCoast@gmail.com)</span>
                </a>
              </li>
              <li>
                <a
                  href={CENTRAL_COAST_LINKS.f3NationHome}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>F3 Nation Official</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright / Credo Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#6e727e]">
          <span>F3CENTRALCOAST.COM • SANTA BARBARA & CARPINTERIA, CA</span>
          <span>100% FREE • OPEN TO ALL MEN • OUTDOORS RAIN OR SHINE</span>
        </div>
      </div>
    </footer>
  );
}
