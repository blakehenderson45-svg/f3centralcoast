import React, { useState } from 'react';
import {
  TriangleAlert,
  Sunrise,
  Flame,
  Heart,
  Users,
  Shuffle,
  Check,
  ChevronDown,
  ChevronUp,
  Backpack,
} from 'lucide-react';
import { COT_INTENTIONS, FNG_FAQS } from '../data/centralCoastData';

const BEATDOWN_PHASES = [
  {
    step: '01',
    title: 'Warm-O-Rama',
    duration: '~5 MINS',
    color: 'border-l-[#10b981]',
    iconColor: 'text-[#10b981]',
    icon: Sunrise,
    summary:
      'Shake off the morning chill in cadence: Side Straddle Hops, Imperial Walkers, Windmills, Arm Circles, and a short group Mosey.',
  },
  {
    step: '02',
    title: 'The Thang',
    duration: '~30 MINS',
    color: 'border-l-[#f97316]',
    iconColor: 'text-[#f97316]',
    icon: Flame,
    summary:
      'The heart of the beatdown. Partner drills (D.O.R.A.), Pearls on a String down to Leadbetter Beach, stadium stair climbs, hills, sprints, and Merkins—all modifiable.',
  },
  {
    step: '03',
    title: 'Mary (Core)',
    duration: '~7 MINS',
    color: 'border-l-[#a855f7]',
    iconColor: 'text-[#a855f7]',
    icon: Heart,
    summary:
      'Circle up on your six for a group core burnout: LBCs, American Hammers, Low Slow Flutters, Hello Dollies, and Boat/Canoe.',
  },
  {
    step: '04',
    title: 'Circle of Trust (COT)',
    duration: '~3 MINS',
    color: 'border-l-[#38bdf8]',
    iconColor: 'text-[#38bdf8]',
    icon: Users,
    summary:
      'Count-O-Rama, Name-O-Rama (where FNGs earn their official F3 name!), announcements, and Ball of Man intentions before heading into the day.',
  },
];

const GEAR_CHECKLIST = [
  { item: 'Athletic running/training shoes', note: 'Expect asphalt, grass, sand, or stairs' },
  { item: 'Weather-appropriate workout clothes', note: 'Layers for chilly coastal dawn fog' },
  { item: 'Water bottle', note: 'Hydrate before & after the beatdown' },
  { item: 'Work or mechanics gloves (optional)', note: 'Great for pavement Merkins & bear crawls' },
  { item: 'Small headlamp (winter months)', note: 'Helpful during pitch-black 5:30 AM starts' },
  { item: 'Zero dollars & zero ego', note: 'Always free. Modify anything you need.' },
];

export function FirstTimerSection() {
  const [intentionIdx, setIntentionIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const cycleIntention = () => {
    setIntentionIdx((prev) => (prev + 1) % COT_INTENTIONS.length);
  };

  return (
    <section
      id="first-timers"
      className="relative py-20 sm:py-24 bg-[#121315] border-b border-[#24262d]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header + Documentary Coastal Stairs Split */}
        <div className="grid lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-xl overflow-hidden border border-[#2e313a] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <img
                src="/images/pax-stadium-dawn.jpg"
                alt="Central Coast F3 men standing shoulder to shoulder at sunrise on the SBCC La Playa Stadium field"
                className="w-full h-[320px] sm:h-[400px] object-cover object-[center_22%] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012]/90 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#f85e5e] text-white font-mono text-[10px] font-bold tracking-[0.16em] uppercase shadow">
                PICK UP THE SIX
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-display text-lg sm:text-xl uppercase tracking-wide text-white">
                  NOBODY FINISHES ALONE
                </div>
                <p className="text-xs text-[#c2c6d0] mt-0.5">
                  Fast guys circle back for the back of the pack. Push at your pace—we finish as a
                  unit.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="font-mono text-xs tracking-[0.22em] text-[#f85e5e] uppercase font-bold mb-3 flex items-center gap-2.5">
              <span className="inline-block w-6 h-[2px] bg-[#f85e5e]" />
              <span>FRIENDLY NEW GUY (FNG) FIELD GUIDE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-[1.02] mb-5">
              FIRST TIME IN THE GLOOM?
              <span className="block text-[#9ca0aa] mt-1">HERE’S WHAT TO EXPECT.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#a6aab4] leading-relaxed mb-6">
              Showing up to an unfamiliar group of men in a dark parking lot at 5:30 AM takes
              courage. Every single guy in our circle remembers his first morning—we call first-timers{' '}
              <strong className="text-white">FNGs (Friendly New Guys)</strong>, and welcoming you is
              the highlight of our week.
            </p>

            {/* Official F3 Pre-Workout Disclaimer (preserved verbatim from original app) */}
            <div className="bg-[#1b1c20] border border-[#30333c] border-l-4 border-l-[#f85e5e] rounded-r-lg p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <TriangleAlert className="w-5 h-5 text-[#f85e5e]" />
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                  The Morning Disclaimer
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#8d919c] ml-auto">
                  SPOKEN BEFORE EVERY BEATDOWN
                </span>
              </div>
              <div className="space-y-2 text-sm text-[#c5c9d3] leading-relaxed">
                <p>
                  “I am not a professional. You are participating at your own risk. Modify exercises
                  as needed.”
                </p>
                <p className="text-white font-medium">
                  “Push yourself, but don’t hurt yourself. Aye!”
                </p>
                <p className="text-[#9ca0aa] italic">
                  “Leave no man behind, but leave no man where you find him.”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Anatomy of a Beatdown (4 Phases) */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8d919c]">
                MINUTE-BY-MINUTE BREAKDOWN
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white mt-1">
                ANATOMY OF A 45-MINUTE BEATDOWN
              </h3>
            </div>
            <span className="font-mono text-xs text-[#9ca0aa]">
              SATURDAYS RUN 60 MINS + COFFEETERIA
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BEATDOWN_PHASES.map((phase) => {
              const Icon = phase.icon;
              return (
                <div
                  key={phase.step}
                  className={`bg-[#1a1b1e] border border-[#2c2e37] border-l-4 ${phase.color} rounded-lg p-5 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-[#8d919c]">
                        PHASE {phase.step}
                      </span>
                      <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-[#121315] border border-[#2c2e37] text-[#cfd3dc]">
                        {phase.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <Icon className={`w-5 h-5 ${phase.iconColor}`} />
                      <h4 className="font-display text-xl font-bold uppercase tracking-wide text-white">
                        {phase.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-[13px] text-[#a9adb8] leading-relaxed">
                      {phase.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive COT Intention Preview */}
          <div className="mt-4 bg-[#17191e] border border-[#29323c] rounded-lg px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#38bdf8] font-bold">
                  SAMPLE CIRCLE OF TRUST (BOM) INTENTION
                </div>
                <p className="text-sm sm:text-[15px] italic text-[#e4e5e8] mt-0.5">
                  “{COT_INTENTIONS[intentionIdx]}”
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={cycleIntention}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#22252e] hover:bg-[#2c303c] border border-[#343846] text-xs font-mono text-[#cfd3dc] hover:text-white shrink-0 transition-colors self-start sm:self-center"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Another Intention</span>
            </button>
          </div>
        </div>

        {/* Bottom Split: What to Bring Checklist + FNG FAQs */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* What to Bring */}
          <div className="lg:col-span-5 bg-[#1a1b1e] border border-[#2c2e36] rounded-xl p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#f85e5e]/15 border border-[#f85e5e]/30 flex items-center justify-center text-[#f85e5e]">
                <Backpack className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f85e5e] font-bold">
                  PACKING LIST
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white leading-tight">
                  WHAT TO BRING
                </h3>
              </div>
            </div>
            <ul className="space-y-3">
              {GEAR_CHECKLIST.map((entry) => (
                <li
                  key={entry.item}
                  className="flex items-start gap-3 pb-3 border-b border-[#262830] last:border-0 last:pb-0"
                >
                  <span className="w-5 h-5 rounded bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center text-[#10b981] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{entry.item}</div>
                    <div className="text-xs text-[#8d919c] mt-0.5">{entry.note}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* FNG FAQs */}
          <div className="lg:col-span-7 bg-[#1a1b1e] border border-[#2c2e36] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#2a2c34] flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f85e5e] font-bold">
                  NO EXCUSES
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                  COMMON FNG QUESTIONS
                </h3>
              </div>
            </div>
            <div className="divide-y divide-[#262830]">
              {FNG_FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.q}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#202228] transition-colors"
                    >
                      <span className="text-sm sm:text-[15px] font-semibold text-white">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#f85e5e] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8d919c] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm text-[#aeb2bc] leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
