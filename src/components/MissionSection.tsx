import React from 'react';
import { Flame, Users, Compass, CheckCircle2, Quote } from 'lucide-react';
import { FIVE_PILLARS } from '../data/centralCoastData';

const THREE_FS = [
  {
    code: '1ST F',
    title: 'FITNESS',
    subtitle: 'The Magnet',
    accent: 'border-l-[#f85e5e]',
    badgeColor: 'text-[#f85e5e] bg-[#f85e5e]/10 border-[#f85e5e]/25',
    icon: Flame,
    description:
      'Peer-led 45–60 minute outdoor bootcamps before the sun comes up. Bodyweight grit, coastal hills, stadium stairs, sprints, and partner circuits—open and scalable for every man regardless of current fitness.',
  },
  {
    code: '2ND F',
    title: 'FELLOWSHIP',
    subtitle: 'The Glue',
    accent: 'border-l-[#eab308]',
    badgeColor: 'text-[#eab308] bg-[#eab308]/10 border-[#eab308]/25',
    icon: Users,
    description:
      'Modern men are more isolated than ever. Suffering together at 5:30 AM strips away small talk and builds real friendships—cemented over post-workout Coffeeteria, beach rucks, and brothers who show up when life gets hard.',
  },
  {
    code: '3RD F',
    title: 'FAITH',
    subtitle: 'The Dynamite',
    accent: 'border-l-[#38bdf8]',
    badgeColor: 'text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/25',
    icon: Compass,
    description:
      'Not one specific religion or church—simply a belief in something bigger than yourself. Putting ego aside to become a stronger husband, father, friend, and leader serving the Central Coast community.',
  },
];

export function MissionSection() {
  return (
    <section id="mission" className="relative py-20 sm:py-24 bg-[#121315] border-b border-[#24262d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Brotherhood Documentary Photo Split */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          <div className="lg:col-span-6">
            <div className="font-mono text-xs tracking-[0.22em] text-[#f85e5e] uppercase font-bold mb-3 flex items-center gap-2.5">
              <span className="inline-block w-6 h-[2px] bg-[#f85e5e]" />
              <span>WHO WE ARE // THE MISSION</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-[1.02] mb-6">
              MORE THAN A WORKOUT.
              <span className="block text-[#9ca0aa] mt-1">A BROTHERHOOD OF LEADERS.</span>
            </h2>

            {/* Official F3 Mission Statement Block */}
            <div className="bg-[#1a1b1e] border border-[#2c2f38] border-l-4 border-l-[#f85e5e] rounded-r-lg p-5 sm:p-6 mb-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f85e5e] font-bold mb-2">
                OFFICIAL F3 MISSION STATEMENT
              </div>
              <p className="text-lg sm:text-xl font-medium text-white leading-snug">
                “To plant, grow and serve small workout groups for men for the invigoration of male
                community leadership.”
              </p>
            </div>

            {/* Credo Quote */}
            <div className="flex items-start gap-3.5 px-4 py-3.5 rounded bg-[#16171b] border border-[#262830] mb-6">
              <Quote className="w-5 h-5 text-[#f85e5e] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm sm:text-base italic text-[#e4e5e8] font-medium">
                  “Leave no man behind, but leave no man where you find him.”
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#838793] block mt-1">
                  THE F3 CREDO
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#a6aab4] leading-relaxed">
              Started in 2011 and now thousands of groups strong across the nation,{' '}
              <strong className="text-white">F3 Nation</strong> exists to combat male isolation and
              complacency. Here on California’s Central Coast, men from Santa Barbara to Carpinteria
              meet in the pre-dawn gloom—not to chase vanity, but to build grit, brotherhood, and
              purpose that carry into our homes and workplaces.
            </p>
          </div>

          {/* Documentary Photo Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden border border-[#2e313a] shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
              <img
                src="/images/brotherhood-cot.jpg"
                alt="Men standing shoulder to shoulder in a Circle of Trust along the Central Coast at sunrise"
                className="w-full h-[320px] sm:h-[400px] object-cover object-center contrast-[1.06] group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012]/90 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#121315]/85 border border-[#353844] backdrop-blur-sm font-mono text-[10px] tracking-[0.18em] text-[#e4e5e8] uppercase">
                CIRCLE OF TRUST (COT) • CENTRAL COAST
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <div className="font-display text-lg sm:text-xl uppercase tracking-wide text-white">
                    IRON SHARPENS IRON
                  </div>
                  <p className="text-xs text-[#b8bcc6] mt-0.5">
                    Every workout ends shoulder-to-shoulder—celebrating new brothers and lifting up
                    real life challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 3 Fs Cards */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8d919c]">
                WHAT DOES F3 STAND FOR?
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white mt-1">
                THE THREE F’S
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#8d919c] max-w-md">
              Fitness gets you out of bed. Fellowship keeps you coming back. Faith gives your
              strength a target outside yourself.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {THREE_FS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.code}
                  className={`bg-[#1a1b1e] border border-[#2c2e36] border-l-4 ${item.accent} rounded-lg p-6 flex flex-col justify-between hover:border-[#3d404c] transition-colors`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span
                        className={`font-mono text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border ${item.badgeColor}`}
                      >
                        {item.code}
                      </span>
                      <Icon className="w-5 h-5 text-[#8d919c]" />
                    </div>
                    <h4 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                      {item.title}
                    </h4>
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8d919c] mb-3">
                      {item.subtitle}
                    </div>
                    <p className="text-sm text-[#b4b8c2] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* The 5 Core Principles (Non-Negotiable Pillars) */}
        <div className="bg-[#17181c] border border-[#2b2e37] rounded-xl p-6 sm:p-8 tactical-grid">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#292c34]">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#f85e5e] font-bold">
                NON-NEGOTIABLE STANDARDS
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white mt-1">
                THE 5 CORE PRINCIPLES OF F3
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#10b981]/10 border border-[#10b981]/25 text-[#10b981] font-mono text-xs self-start md:self-auto">
              <CheckCircle2 className="w-4 h-4" />
              <span>UPHELD AT EVERY CENTRAL COAST WORKOUT</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {FIVE_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="bg-[#1c1d22]/95 border border-[#2d3039] rounded-lg p-4 flex flex-col"
              >
                <span className="font-display text-3xl font-bold text-[#f85e5e]/80 leading-none mb-2">
                  {pillar.number}
                </span>
                <h4 className="font-display text-lg font-semibold uppercase tracking-wide text-white leading-snug mb-1">
                  {pillar.title}
                </h4>
                <div className="font-mono text-[10px] tracking-wider text-[#8d919c] uppercase mb-2.5">
                  {pillar.subtitle}
                </div>
                <p className="text-xs text-[#aeb2bc] leading-relaxed flex-1">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
