import React, { useMemo } from 'react';
import {
  MapPin,
  ChevronRight,
  Clock,
  Shield,
  CloudRain,
  Users,
  DollarSign,
  Compass,
} from 'lucide-react';
import { getNextWorkoutSession } from '../data/centralCoastData';

const QUICK_PILLARS = [
  { icon: DollarSign, value: '$0 FOREVER', label: 'Always Free of Charge' },
  { icon: Users, value: 'ALL MEN', label: 'Every Age & Fitness Level' },
  { icon: CloudRain, value: 'OUTDOORS', label: 'Rain, Fog, or Shine' },
  { icon: Shield, value: 'PEER-LED', label: 'Rotating Peer Leadership' },
  { icon: Compass, value: 'ENDS IN COT', label: 'Circle of Trust Every Morning' },
];

export function HeroSection() {
  const nextUp = useMemo(() => getNextWorkoutSession(), []);

  return (
    <section
      id="top"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-0 overflow-hidden bg-[#0f1012]"
    >
      {/* Background Documentary Photo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/pax-palms.jpg"
          alt="Central Coast F3 men gathered together under the Santa Barbara coastal palm trees"
          className="w-full h-full object-cover object-[center_45%] scale-[1.01] brightness-[0.58] contrast-[1.08]"
        />
        {/* Layered dark charcoal directional gradients for sharp readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0f11]/95 via-[#121315]/78 to-[#121315]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-transparent to-[#0e0f11]/70" />
        <div className="absolute inset-0 grit-overlay pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-12 sm:pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Live Next Beatdown Telemetry Pill */}
          <a
            href="#schedule"
            className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-2 rounded bg-[#18191d]/90 border border-[#343741] hover:border-[#f85e5e]/70 transition-colors mb-6 group backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f85e5e] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f85e5e]" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#f85e5e] font-bold">
              NEXT BEATDOWN:
            </span>
            <span className="font-mono text-[11px] sm:text-xs text-white font-semibold tracking-wide">
              {nextUp.label} • {nextUp.session.aoName}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8d919c] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* Monospace Pre-header */}
          <div className="font-mono text-xs sm:text-[13px] tracking-[0.26em] text-[#a6aab4] uppercase mb-3 flex items-center gap-3">
            <span className="inline-block w-8 h-[2px] bg-[#f85e5e]" />
            <span>FITNESS /// FELLOWSHIP /// FAITH</span>
          </div>

          {/* Gritty Display Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-bold uppercase tracking-tight leading-[0.96] text-white mb-6 drop-shadow-[0_6px_28px_rgba(0,0,0,0.65)]">
            FORGED IN THE GLOOM.
            <span className="block text-[#f85e5e] mt-1">CENTRAL COAST F3.</span>
          </h1>

          {/* Clear Recruitment Subhead */}
          <p className="text-base sm:text-lg md:text-xl text-[#cfd3dc] max-w-2xl leading-relaxed mb-8 font-normal">
            Free, peer-led outdoor workouts for men in{' '}
            <strong className="text-white font-semibold">Santa Barbara</strong> and{' '}
            <strong className="text-white font-semibold">Carpinteria</strong>. Show up before
            sunrise, push alongside everyday brothers, and leave stronger for your family and
            community.{' '}
            <span className="text-white font-semibold">No dues. No ego. Just show up.</span>
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
            <a
              href="#schedule"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded bg-[#f85e5e] hover:bg-[#ff6d6d] text-white font-display text-base sm:text-lg font-semibold uppercase tracking-[0.12em] shadow-[0_8px_28px_rgba(248,94,94,0.38)] hover:shadow-[0_10px_34px_rgba(248,94,94,0.5)] transition-all active:scale-[0.98]"
            >
              <MapPin className="w-5 h-5" />
              <span>Find a Workout & Map</span>
            </a>
            <a
              href="#first-timers"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded bg-[#18191d]/85 hover:bg-[#23252c] text-white border border-[#3e424e] hover:border-[#f85e5e]/60 font-display text-base sm:text-lg font-medium uppercase tracking-[0.12em] backdrop-blur-sm transition-all"
            >
              <span>I'm New — What to Expect</span>
              <ChevronRight className="w-5 h-5 text-[#f85e5e]" />
            </a>
          </div>

          {/* Coordinates & Schedule Quick Line */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] sm:text-xs text-[#9ca0aa]">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#eab308]" />
              <span>TUE & THU 05:30 • SAT 06:00</span>
            </span>
            <span className="hidden sm:inline text-[#424652]">|</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#f85e5e]" />
              <span>SBCC PARKING LOT & LINDEN AVE, CARPINTERIA</span>
            </span>
            <span className="hidden md:inline text-[#424652]">|</span>
            <span className="hidden md:inline text-[#7c808c]">34.4039° N, 119.6968° W</span>
          </div>
        </div>
      </div>

      {/* Bottom 5 Core Pillars Bar */}
      <div className="relative z-10 border-y border-[#272930] bg-[#16171a]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#25272e]">
            {QUICK_PILLARS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.value}
                  className="py-4 px-3 sm:px-4 flex items-center gap-3 first:pl-0 last:pr-0"
                >
                  <div className="w-9 h-9 rounded bg-[#212329] border border-[#30333d] flex items-center justify-center shrink-0 text-[#f85e5e]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-sm sm:text-[15px] font-bold tracking-wider text-white uppercase leading-tight">
                      {item.value}
                    </div>
                    <div className="text-[11px] text-[#8d919c] truncate">{item.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
