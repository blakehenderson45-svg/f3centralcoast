import React, { useState, useMemo } from 'react';
import { BookOpen, Flame, Dumbbell, Search, Music } from 'lucide-react';
import {
  F3_LEXICON,
  FEATURED_WORKOUT_FORMATS,
  CURATED_EXERCISES,
  TOTAL_EXICON_COUNT,
} from '../data/centralCoastData';

type ActiveTab = 'lexicon' | 'formats' | 'exicon';

export function CultureExplorerSection() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lexicon');
  const [query, setQuery] = useState('');
  const [phaseFilter, setPhaseFilter] = useState<'All' | 'Warm-O-Rama' | 'The Thang' | 'Mary'>(
    'All'
  );

  const filteredLexicon = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return F3_LEXICON;
    return F3_LEXICON.filter(
      (item) =>
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredExercises = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CURATED_EXERCISES.filter((ex) => {
      if (phaseFilter !== 'All' && ex.phase !== phaseFilter) return false;
      if (!q) return true;
      return (
        ex.name.toLowerCase().includes(q) ||
        ex.description.toLowerCase().includes(q) ||
        ex.muscleGroups.some((m) => m.toLowerCase().includes(q))
      );
    });
  }, [query, phaseFilter]);

  return (
    <section
      id="culture"
      className="relative py-20 sm:py-24 bg-[#151619] border-b border-[#24262d]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="font-mono text-xs tracking-[0.22em] text-[#f85e5e] uppercase font-bold mb-3 flex items-center gap-2.5">
              <span className="inline-block w-6 h-[2px] bg-[#f85e5e]" />
              <span>INSIDE THE GLOOM // CULTURE & TRAINING</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-[1.02]">
              LINGO, FORMATS & <span className="text-[#f85e5e]">EXICON PREVIEW</span>
            </h2>
            <p className="text-sm sm:text-base text-[#a6aab4] mt-3 max-w-2xl leading-relaxed">
              F3 has its own language, creative team-based beatdowns, and a library of{' '}
              <strong className="text-white">{TOTAL_EXICON_COUNT}+ bodyweight exercises</strong>. No
              two mornings are ever the same—explore what you’ll hear and do out on the pavement.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex flex-wrap sm:flex-nowrap p-1 rounded-lg bg-[#101114] border border-[#2c2e37] self-start lg:self-end">
            <button
              type="button"
              onClick={() => {
                setActiveTab('lexicon');
                setQuery('');
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'lexicon'
                  ? 'bg-[#f85e5e] text-white shadow'
                  : 'text-[#9ca0aa] hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>F3 Lexicon</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('formats');
                setQuery('');
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'formats'
                  ? 'bg-[#f85e5e] text-white shadow'
                  : 'text-[#9ca0aa] hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Beatdown Formats</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('exicon');
                setQuery('');
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'exicon'
                  ? 'bg-[#f85e5e] text-white shadow'
                  : 'text-[#9ca0aa] hover:text-white'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Sample Moves</span>
            </button>
          </div>
        </div>

        {/* Tab 1: F3 Lexicon */}
        {activeTab === 'lexicon' && (
          <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative max-w-md w-full">
                <Search className="w-4 h-4 text-[#7c808c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter F3 terms (e.g. PAX, FNG, Merkin, COT, Six)..."
                  className="w-full bg-[#1a1b1e] border border-[#2f323c] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#737782] focus:outline-none focus:border-[#f85e5e]"
                />
              </div>
              <span className="font-mono text-xs text-[#8d919c]">
                SHOWING {filteredLexicon.length} OF {F3_LEXICON.length} ESSENTIAL TERMS
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLexicon.map((entry) => (
                <div
                  key={entry.term}
                  className="bg-[#1a1b1e] border border-[#2b2d36] hover:border-[#3e424e] rounded-lg p-5 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">
                      {entry.term}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#121315] border border-[#2b2d36] text-[#f85e5e]">
                      {entry.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#aeb2bc] leading-relaxed">
                    {entry.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Signature Workout Formats */}
        {activeTab === 'formats' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_WORKOUT_FORMATS.map((format) => {
              const isMusical = format.name.includes('Musical');
              return (
                <div
                  key={format.name}
                  className="bg-[#1a1b1e] border border-[#2c2e36] border-t-2 border-t-[#f85e5e]/80 rounded-lg p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f85e5e]/12 text-[#f85e5e] border border-[#f85e5e]/25">
                        {format.tag}
                      </span>
                      {isMusical && <Music className="w-4 h-4 text-[#eab308]" />}
                    </div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white mb-2.5">
                      {format.name}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#aeb2bc] leading-relaxed whitespace-pre-line">
                      {format.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Sample Moves (Exicon Preview) */}
        {activeTab === 'exicon' && (
          <div>
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative max-w-md w-full">
                <Search className="w-4 h-4 text-[#7c808c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search classic moves (e.g. Merkin, Bobby Hurley, LBC)..."
                  className="w-full bg-[#1a1b1e] border border-[#2f323c] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#737782] focus:outline-none focus:border-[#f85e5e]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {(['All', 'Warm-O-Rama', 'The Thang', 'Mary'] as const).map((phase) => (
                  <button
                    key={phase}
                    type="button"
                    onClick={() => setPhaseFilter(phase)}
                    className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider border transition-colors ${
                      phaseFilter === phase
                        ? 'bg-[#f85e5e] border-[#f85e5e] text-white font-bold'
                        : 'bg-[#1a1b1e] border-[#2d3039] text-[#9ca0aa] hover:text-white'
                    }`}
                  >
                    {phase}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExercises.map((ex) => (
                <div
                  key={ex.name}
                  className="bg-[#1a1b1e] border border-[#2c2e36] rounded-lg p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#f85e5e] font-semibold">
                        {ex.phase}
                      </span>
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                          ex.difficulty === 'Beginner'
                            ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/25'
                            : ex.difficulty === 'Intermediate'
                              ? 'bg-[#eab308]/10 text-[#eab308] border-[#eab308]/25'
                              : 'bg-[#f85e5e]/10 text-[#f85e5e] border-[#f85e5e]/25'
                        }`}
                      >
                        {ex.difficulty}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white mb-2">
                      {ex.name}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#aeb2bc] leading-relaxed mb-3">
                      {ex.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#262830]">
                    {ex.muscleGroups.map((mg) => (
                      <span
                        key={mg}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#121315] text-[#9ca0aa] border border-[#272932]"
                      >
                        {mg}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
