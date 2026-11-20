import React, { useState } from 'react';
import { Shield, Star, Cog, Users, Compass } from 'lucide-react';
import { LEADERSHIP_ROLES } from '../data/centralCoastData';

export function LeadershipSection() {
  const [filter, setFilter] = useState<'ALL' | 'Core' | 'SLT' | 'AO'>('ALL');

  const visibleRoles =
    filter === 'ALL'
      ? LEADERSHIP_ROLES
      : LEADERSHIP_ROLES.filter((role) => role.category === filter);

  return (
    <section
      id="leadership"
      className="relative py-20 sm:py-24 bg-[#121315] border-b border-[#24262d]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="font-mono text-xs tracking-[0.22em] text-[#f85e5e] uppercase font-bold mb-3 flex items-center gap-2.5">
              <span className="inline-block w-6 h-[2px] bg-[#f85e5e]" />
              <span>THE STARFISH MODEL // PEER LEADERSHIP</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-[1.02]">
              NO BOSSES. <span className="text-[#9ca0aa]">EVERY MAN STEPS UP.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#a6aab4] mt-3 leading-relaxed">
              F3 operates on a decentralized “starfish” leadership model—not a top-down franchise.
              Every position is a rotating volunteer role designed to sharpen real-world male
              leadership across the Central Coast.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 self-start lg:self-end">
            {(
              [
                { id: 'ALL', label: 'All Roles' },
                { id: 'Core', label: "Nant'an & COO" },
                { id: 'SLT', label: 'Shared Leadership (3 Fs)' },
                { id: 'AO', label: 'Site & Support' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider border transition-colors ${
                  filter === tab.id
                    ? 'bg-[#f85e5e] border-[#f85e5e] text-white font-bold'
                    : 'bg-[#1a1b1e] border-[#2e3039] text-[#9ca0aa] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Role Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {visibleRoles.map((role) => {
            const Icon =
              role.id === 'nantan'
                ? Star
                : role.id === 'weasel-shaker'
                  ? Cog
                  : role.category === 'SLT'
                    ? Compass
                    : role.id === 'site-q'
                      ? Shield
                      : Users;

            return (
              <div
                key={role.id}
                className="bg-[#1a1b1e] border border-[#2c2e36] hover:border-[#3f4250] rounded-xl p-6 flex flex-col transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#23252d] border border-[#343743] flex items-center justify-center text-[#f85e5e] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-[#131417] border border-[#2d3039] text-[#cfd3dc]">
                    {role.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white mb-2">
                  {role.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#cfd3dc] font-medium leading-relaxed mb-4">
                  {role.summary}
                </p>

                <ul className="space-y-2 text-xs text-[#9ea3ae] leading-relaxed mt-auto pt-3 border-t border-[#262830]">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f85e5e] shrink-0 mt-1.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Philosophy Footer Strip */}
        <div className="rounded-lg bg-[#191a1e] border border-[#2d303a] border-l-4 border-l-[#f85e5e] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-[#cfd3dc]">
            <strong className="text-white uppercase font-mono tracking-wider mr-2">
              ROTATING SERVANT LEADERSHIP:
            </strong>
            All F3 leadership positions are temporary volunteer seats designed to develop leaders
            through service—never permanent titles or hierarchy.
          </p>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#f85e5e] shrink-0">
            V.A.P.E. // LEAD BY EXAMPLE
          </span>
        </div>
      </div>
    </section>
  );
}
