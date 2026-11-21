import React, { useState } from 'react';
import {
  Mail,
  MessageCircle,
  CalendarPlus,
  Copy,
  Check,
  Navigation,
  BookOpen,
  CirclePlay,
  ShoppingBag,
  Map,
  ExternalLink,
} from 'lucide-react';
import {
  WEEKLY_SCHEDULE,
  CENTRAL_COAST_LINKS,
  downloadWorkoutIcs,
} from '../data/centralCoastData';

const PAX_RESOURCES = [
  {
    title: 'Contact Us — F3CentralCoast@gmail.com',
    subtitle: 'Questions before your first beatdown? Send us an email directly',
    href: CENTRAL_COAST_LINKS.contactMailto,
    icon: Mail,
    isExternal: false,
  },
  {
    title: 'Central Coast Slack Workspace',
    subtitle: 'Existing PAX: daily backblasts, HC roll calls, Coffeeteria & 2nd F updates',
    href: CENTRAL_COAST_LINKS.slackWorkspace,
    icon: MessageCircle,
    isExternal: true,
  },
  {
    title: 'Central Coast User Manual',
    subtitle: 'Everything a new PAX or Q needs to navigate our local AOs',
    href: CENTRAL_COAST_LINKS.userManual,
    icon: BookOpen,
    isExternal: true,
  },
  {
    title: 'Video: How to Sign Up for a Q',
    subtitle: 'Ready to step up and lead a morning beatdown? Watch this quick walkthrough',
    href: CENTRAL_COAST_LINKS.howToSignUpQ,
    icon: CirclePlay,
    isExternal: true,
  },
  {
    title: 'Video: How to Submit a BackBlast',
    subtitle: 'Log your beatdown, count the PAX, and celebrate FNGs on Slack',
    href: CENTRAL_COAST_LINKS.howToBackblast,
    icon: CirclePlay,
    isExternal: true,
  },
  {
    title: 'F3 Nation Global Map',
    subtitle: 'Traveling out of town? Find free F3 workouts nationwide',
    href: CENTRAL_COAST_LINKS.f3NationMap,
    icon: Map,
    isExternal: true,
  },
  {
    title: 'F3 Gear Store',
    subtitle: 'Official F3 Nation shirts, hats, and cold-morning gloom layers',
    href: CENTRAL_COAST_LINKS.f3Gear,
    icon: ShoppingBag,
    isExternal: true,
  },
];

export function JoinConnectSection() {
  const [selectedId, setSelectedId] = useState<string>('sat-sbcc'); // Default to Saturday (FNG favorite)
  const [copiedInvite, setCopiedInvite] = useState(false);

  const selectedSession =
    WEEKLY_SCHEDULE.find((s) => s.id === selectedId) || WEEKLY_SCHEDULE[0];

  const handleCopyBuddyInvite = () => {
    const text = `Hey man — come hit a free outdoor men's workout with me at Central Coast F3!\n\nWhen: ${selectedSession.day}s, ${selectedSession.timeLabel}\nWhere: ${selectedSession.aoName} (${selectedSession.city})\nDirections: ${selectedSession.googleMapsUrl}\nInfo & Map: ${CENTRAL_COAST_LINKS.websiteUrl}\n\n100% free, all fitness levels, rain or shine. Just bring water and show up 5 mins early!`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 2500);
    });
  };

  return (
    <section
      id="join"
      className="relative py-20 sm:py-24 bg-[#151619] border-b border-[#24262d]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* High-Impact Recruitment Banner + Interactive First-Post HC Planner */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Interactive "Hard Commit (HC)" First-Post Card */}
          <div className="lg:col-span-7 bg-[#1a1b1e] border border-[#323540] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
            <div className="h-1.5 bg-gradient-to-r from-[#f85e5e] via-[#eab308] to-[#f85e5e]" />
            <div className="p-6 sm:p-8">
              <div className="font-mono text-xs tracking-[0.22em] text-[#f85e5e] uppercase font-bold mb-2">
                STEP ONE // HARD COMMIT (HC)
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-2">
                PICK YOUR FIRST MORNING
              </h2>
              <p className="text-sm text-[#a6aab4] mb-6 leading-relaxed">
                Don’t overthink it—the heaviest weight in F3 is the front door at 5:15 AM. Choose
                your day below, put it on your calendar, and bring a friend.
              </p>

              {/* Session Picker Buttons */}
              <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                {WEEKLY_SCHEDULE.map((session) => {
                  const active = session.id === selectedSession.id;
                  return (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => setSelectedId(session.id)}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        active
                          ? 'bg-[#f85e5e]/12 border-[#f85e5e] shadow-[0_0_20px_rgba(248,94,94,0.15)]'
                          : 'bg-[#131417] border-[#2c2e37] hover:border-[#444856]'
                      }`}
                    >
                      <div className="font-display text-lg font-bold uppercase tracking-wide text-white leading-tight">
                        {session.day}
                      </div>
                      <div className="font-mono text-xs text-[#f85e5e] font-semibold mt-0.5">
                        {session.timeLabel.split('–')[0].trim()}
                      </div>
                      <div className="text-[11px] text-[#9ca0aa] truncate mt-1">
                        {session.aoName}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Tailored Briefing Box */}
              <div className="bg-[#131417] border border-[#2a2c35] rounded-lg p-4 sm:p-5 mb-6 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#24262e]">
                  <span className="font-display text-lg uppercase tracking-wide text-white">
                    {selectedSession.day} • {selectedSession.aoName}
                  </span>
                  <span className="font-mono text-xs text-[#eab308] font-bold">
                    ARRIVE BY {selectedSession.day === 'Saturday' ? '5:50 AM' : '5:20 AM'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#b8bcc6] leading-relaxed">
                  {selectedSession.meetupDetails}
                </p>
                <p className="text-xs text-[#8d919c]">
                  <strong className="text-[#d6d9e0]">Address:</strong> {selectedSession.address}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => downloadWorkoutIcs(selectedSession)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded bg-[#f85e5e] hover:bg-[#ff6d6d] text-white font-display text-base font-semibold uppercase tracking-wider shadow-[0_6px_22px_rgba(248,94,94,0.32)] transition-all active:scale-[0.98]"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span>Add to Calendar (.ICS)</span>
                </button>
                <a
                  href={selectedSession.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded bg-[#252730] hover:bg-[#2f323e] border border-[#3a3d4a] text-white font-display text-base font-semibold uppercase tracking-wider transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#f85e5e]" />
                  <span>Open Directions</span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-3 border-t border-[#262830]">
                <button
                  type="button"
                  onClick={handleCopyBuddyInvite}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#131417] hover:bg-[#1e2026] border border-[#2f323c] text-xs font-mono uppercase tracking-wider text-[#cfd3dc] hover:text-white transition-colors"
                >
                  {copiedInvite ? (
                    <>
                      <Check className="w-4 h-4 text-[#10b981]" />
                      <span className="text-[#10b981]">Invite Text Copied — Send to a Buddy!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#f85e5e]" />
                      <span>EH a Buddy (Copy Invite Text)</span>
                    </>
                  )}
                </button>
                <a
                  href={CENTRAL_COAST_LINKS.contactMailto}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded bg-[#131417] hover:bg-[#f85e5e] border border-[#f85e5e]/45 text-xs font-mono font-bold uppercase tracking-wider text-[#f85e5e] hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Central Coast PAX & Q Resources Hub */}
          <div className="lg:col-span-5 bg-[#1a1b1e] border border-[#2c2e36] rounded-xl p-6">
            <div className="mb-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f85e5e] font-bold">
                COMMUNITY LINKS & Q RESOURCES
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white mt-1">
                PLUG INTO CENTRAL COAST F3
              </h3>
              <p className="text-xs sm:text-sm text-[#9ca0aa] mt-1">
                Have questions before your first post or already part of the PAX? Reach out or grab
                the local resources below.
              </p>
            </div>

            <div className="space-y-2">
              {PAX_RESOURCES.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noreferrer' : undefined}
                    className="flex items-start gap-3.5 p-3 rounded-lg bg-[#141518] hover:bg-[#202229] border border-[#262831] hover:border-[#3c3f4d] transition-all group"
                  >
                    <div className="w-9 h-9 rounded bg-[#1e2027] border border-[#30333e] flex items-center justify-center text-[#f85e5e] shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-white group-hover:text-[#f85e5e] transition-colors flex items-center gap-1.5">
                        <span className="truncate">{item.title}</span>
                        {item.isExternal && (
                          <ExternalLink className="w-3 h-3 text-[#6c707d] group-hover:text-[#f85e5e] shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[#8d919c] mt-0.5 leading-snug">{item.subtitle}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Final Gritty Callout Strip with Real SBCC Parking Lot Dawn Crew Photo */}
        <div className="rounded-xl bg-[#111214] border border-[#2d3039] overflow-hidden tactical-stripes flex flex-col md:flex-row items-stretch">
          <div className="md:w-56 lg:w-64 shrink-0 relative min-h-[220px] md:min-h-0">
            <img
              src="/images/pax-gloom-lot.jpg"
              alt="Central Coast F3 dawn patrol crew in the SBCC parking lot at sunrise"
              className="w-full h-full object-cover object-[center_30%] contrast-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-[#111214]/90" />
          </div>
          <div className="flex-1 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#f85e5e] font-bold mb-1.5">
                CENTRAL COAST F3 • SANTA BARBARA & CARPINTERIA
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white">
                THE WORLD NEEDS STRONGER MEN. START AT 5:30 AM.
              </h3>
              <p className="text-sm text-[#aeb2bc] mt-1">
                Bring a friend, drop the excuses, and see what happens when you surround yourself
                with men who refuse to settle. Questions? Email{' '}
                <span className="text-white font-medium">{CENTRAL_COAST_LINKS.contactEmail}</span>.
              </p>
            </div>
            <a
              href={CENTRAL_COAST_LINKS.contactMailto}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded bg-[#f85e5e] hover:bg-[#ff6d6d] text-white font-display text-lg font-bold uppercase tracking-wider shadow-[0_8px_28px_rgba(248,94,94,0.35)] shrink-0 transition-all"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
