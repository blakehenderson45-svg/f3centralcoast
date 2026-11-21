import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Navigation,
  CalendarPlus,
  ExternalLink,
  Compass,
  Layers,
  Crosshair,
  Satellite,
  Mail,
} from 'lucide-react';
import {
  WEEKLY_SCHEDULE,
  COASTAL_SPOTS,
  CENTRAL_COAST_LINKS,
  CoastalSpot,
  WorkoutSession,
  downloadWorkoutIcs,
} from '../data/centralCoastData';
import { CentralCoastMap, MapStyleMode } from './CentralCoastMap';

export function ScheduleMapSection() {
  const [selectedSpot, setSelectedSpot] = useState<CoastalSpot>(COASTAL_SPOTS[0]);
  const [selectedSessionId, setSelectedSessionId] = useState<string>(WEEKLY_SCHEDULE[0].id);
  const [showStations, setShowStations] = useState<boolean>(true);
  const [mapMode, setMapMode] = useState<MapStyleMode>('tactical');
  const [viewportCommand, setViewportCommand] = useState<{
    center: [number, number];
    zoom: number;
    nonce: number;
  } | null>(null);

  const primaryAOs = COASTAL_SPOTS.filter((s) => s.type === 'primary');
  const painStations = COASTAL_SPOTS.filter((s) => s.type === 'station');

  const flyTo = (center: [number, number], zoom: number) => {
    setViewportCommand({ center, zoom, nonce: Date.now() });
  };

  const handleSelectSession = (session: WorkoutSession) => {
    setSelectedSessionId(session.id);
    const matchingAo =
      COASTAL_SPOTS.find((s) =>
        session.id === 'thu-sb-ruck'
          ? s.id === 'ao-sb-foothills-ruck'
          : session.city.includes('Carpinteria')
            ? s.id === 'ao-linden-carp'
            : s.id === 'ao-sbcc-lot'
      ) || COASTAL_SPOTS[0];
    setSelectedSpot(matchingAo);
    flyTo([session.lat, session.lng], session.locationVaries ? 13 : 14);
  };

  const handleSelectSpot = (spot: CoastalSpot) => {
    setSelectedSpot(spot);
    if (spot.id === 'ao-linden-carp') {
      setSelectedSessionId('thu-carp');
    } else if (spot.id === 'ao-sb-foothills-ruck') {
      setSelectedSessionId('thu-sb-ruck');
    } else if (spot.id === 'ao-sbcc-lot') {
      setSelectedSessionId('tue-sbcc');
    }
    flyTo(
      [spot.lat, spot.lng],
      spot.id === 'ao-sb-foothills-ruck' ? 13 : spot.type === 'primary' ? 14 : 15
    );
  };

  return (
    <section
      id="schedule"
      className="relative py-20 sm:py-24 bg-[#151619] border-b border-[#25272f]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="font-mono text-xs tracking-[0.22em] text-[#f85e5e] uppercase font-bold mb-3 flex items-center gap-2.5">
              <span className="inline-block w-6 h-[2px] bg-[#f85e5e]" />
              <span>AREA OF OPERATIONS // WEEKLY SCHEDULE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-[1.02]">
              SHOW UP. <span className="text-[#f85e5e]">POST IN THE GLOOM.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#a6aab4] mt-3 max-w-2xl leading-relaxed">
              We launch five times a week across{' '}
              <strong className="text-white">Santa Barbara</strong> and{' '}
              <strong className="text-white">Carpinteria</strong>. Pick a morning below to inspect
              the exact launch point, parking details, and surrounding coastal terrain on our live
              map.
            </p>
          </div>

          <a
            href={CENTRAL_COAST_LINKS.f3NationMap}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#1d1f25] hover:bg-[#262931] border border-[#343743] text-xs font-mono uppercase tracking-wider text-[#d6d9e0] hover:text-white transition-colors self-start lg:self-end shrink-0"
          >
            <Compass className="w-4 h-4 text-[#f85e5e]" />
            <span>Open National F3 Map</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8d919c]" />
          </a>
        </div>

        {/* Main Split Layout: Schedule Cards (Left) + Interactive Map (Right) */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Schedule List */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {WEEKLY_SCHEDULE.map((session) => {
              const isSelected = selectedSessionId === session.id;
              return (
                <div
                  key={session.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectSession(session)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectSession(session);
                    }
                  }}
                  className={`text-left rounded-xl p-5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1d1f25] border-[#f85e5e] shadow-[0_10px_30px_rgba(248,94,94,0.12)]'
                      : 'bg-[#191a1e] border-[#2c2e36] hover:border-[#434754] hover:bg-[#1d1f24]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-2xl font-bold uppercase tracking-wide text-white leading-none">
                          {session.day}s
                        </span>
                        <span
                          className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            session.locationVaries
                              ? 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30'
                              : session.day === 'Saturday'
                                ? 'bg-[#eab308]/15 text-[#eab308] border border-[#eab308]/30'
                                : 'bg-[#f85e5e]/15 text-[#f85e5e] border border-[#f85e5e]/30'
                          }`}
                        >
                          {session.shortTag}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-mono text-[#e4e5e8] mt-1.5 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-[#f85e5e]" />
                        <span>{session.timeLabel}</span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#8d919c] bg-[#131417] border border-[#2a2c34] px-2 py-1 rounded shrink-0">
                      {session.city.replace(', CA', '')}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-white font-semibold mb-1.5">
                    <MapPin className="w-4 h-4 text-[#f85e5e] shrink-0 mt-0.5" />
                    <span>{session.aoName}</span>
                  </div>
                  <p className="text-xs text-[#9ea3ae] leading-relaxed mb-3">
                    {session.meetupDetails}
                  </p>

                  <div className="text-[11px] text-[#848894] bg-[#131417] border border-[#25272f] rounded px-3 py-2 mb-3.5">
                    <strong className="text-[#d6d9e0]">FNG Note:</strong> {session.fngFriendlyNote}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {session.locationVaries ? (
                      <a
                        href={`mailto:${CENTRAL_COAST_LINKS.contactEmail}?subject=Central%20Coast%20F3%20%E2%80%94%20Thursday%20Foothills%20Ruck%20Location`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#f85e5e] hover:bg-[#ff6d6d] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Contact to Verify</span>
                      </a>
                    ) : (
                      <a
                        href={session.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#f85e5e] hover:bg-[#ff6d6d] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Directions</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadWorkoutIcs(session);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#25272f] hover:bg-[#313440] border border-[#383b47] text-[#e4e5e8] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <CalendarPlus className="w-3.5 h-3.5 text-[#f85e5e]" />
                      <span>Add to Calendar</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectSession(session);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-[#9ca0aa] hover:text-white text-xs font-mono transition-colors ml-auto"
                    >
                      <Crosshair className="w-3.5 h-3.5 text-[#f85e5e]" />
                      <span>Pin</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Map Column */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {/* Map Control Header Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#191a1e] border border-[#2c2e36] rounded-xl p-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => flyTo([34.402, -119.615], 11)}
                  className="px-3 py-1.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#23252d] hover:bg-[#2d303a] text-white border border-[#363945] transition-colors"
                >
                  Full Coast View
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectSpot(primaryAOs[0])}
                  className="px-3 py-1.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#151619] hover:bg-[#23252d] text-[#d6d9e0] hover:text-white border border-[#2d3039] transition-colors"
                >
                  Santa Barbara (SBCC)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!showStations) setShowStations(true);
                    setSelectedSpot(primaryAOs[2]);
                    setSelectedSessionId('thu-sb-ruck');
                    flyTo([34.455, -119.69], 12);
                  }}
                  className="px-3 py-1.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#151619] hover:bg-[#23252d] text-[#d6d9e0] hover:text-white border border-[#2d3039] transition-colors"
                >
                  SB Foothills Ruck
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectSpot(primaryAOs[1])}
                  className="px-3 py-1.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#151619] hover:bg-[#23252d] text-[#d6d9e0] hover:text-white border border-[#2d3039] transition-colors"
                >
                  Carpinteria (Linden)
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setMapMode((prev) => (prev === 'tactical' ? 'satellite' : 'tactical'))
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider border transition-colors ${
                    mapMode === 'satellite'
                      ? 'bg-[#38bdf8]/15 border-[#38bdf8]/45 text-[#38bdf8]'
                      : 'bg-[#151619] border-[#2d3039] text-[#cfd3dc] hover:text-white'
                  }`}
                >
                  <Satellite className="w-3.5 h-3.5" />
                  <span>{mapMode === 'satellite' ? 'Satellite' : 'Dark Map'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowStations((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider border transition-colors ${
                    showStations
                      ? 'bg-[#eab308]/15 border-[#eab308]/40 text-[#eab308]'
                      : 'bg-[#151619] border-[#2d3039] text-[#8d919c] hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Pain Stations ({painStations.length})</span>
                </button>
              </div>
            </div>

            {/* Map Canvas + Tactical Selected Spot Overlay */}
            <div className="relative flex-1">
              <CentralCoastMap
                spots={COASTAL_SPOTS}
                selectedSpot={selectedSpot}
                showStations={showStations}
                mapMode={mapMode}
                viewportCommand={viewportCommand}
                onSelectSpot={handleSelectSpot}
              />

              {/* Legend Pill (Top-Right inside map) */}
              <div className="hidden sm:flex items-center gap-4 absolute top-3 right-3 z-[400] px-3 py-1.5 rounded-lg bg-[#121315]/90 border border-[#30333d] backdrop-blur-md font-mono text-[10px] uppercase tracking-wider text-[#cfd3dc]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f85e5e] ring-2 ring-white/80" />
                  <span>Primary AO</span>
                </span>
                {showStations && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rotate-45 bg-[#eab308] inline-block" />
                    <span>Pain Station</span>
                  </span>
                )}
              </div>

              {/* Selected Pin Intel Bar (Bottom of map) */}
              <div className="absolute bottom-3 left-3 right-3 z-[400] bg-[#141518]/95 border border-[#343743] rounded-lg p-3.5 sm:p-4 backdrop-blur-md shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                          selectedSpot.type === 'primary'
                            ? 'bg-[#f85e5e]/20 text-[#f85e5e] border border-[#f85e5e]/35'
                            : 'bg-[#eab308]/15 text-[#eab308] border border-[#eab308]/35'
                        }`}
                      >
                        {selectedSpot.type === 'primary' ? 'PRIMARY LAUNCH AO' : 'COASTAL PAIN STATION'}
                      </span>
                      <span className="font-mono text-[10px] text-[#8d919c]">
                        {selectedSpot.lat.toFixed(4)}° N, {Math.abs(selectedSpot.lng).toFixed(4)}° W
                      </span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-white truncate">
                      {selectedSpot.name}
                    </h3>
                    <p className="text-xs text-[#a6aab4] mt-0.5 line-clamp-2">
                      {selectedSpot.terrainNote}
                    </p>
                  </div>
                  {selectedSpot.id === 'ao-sb-foothills-ruck' ? (
                    <a
                      href={`mailto:${CENTRAL_COAST_LINKS.contactEmail}?subject=Central%20Coast%20F3%20%E2%80%94%20Thursday%20Foothills%20Ruck%20Location`}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded bg-[#f85e5e] hover:bg-[#ff6d6d] text-white text-xs font-bold uppercase tracking-wider shrink-0 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Verify Location</span>
                    </a>
                  ) : (
                    <a
                      href={selectedSpot.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded bg-[#f85e5e] hover:bg-[#ff6d6d] text-white text-xs font-bold uppercase tracking-wider shrink-0 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coastal Training Grounds Strip (from Santa Barbara locations in data.ts) */}
        <div className="mt-8 bg-[#191a1e] border border-[#2a2c35] rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#eab308] font-bold">
                OUR OUTDOOR GYM // CLICK ANY ZONE TO INSPECT ON MAP
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                CENTRAL COAST TRAINING GROUNDS (PAIN STATIONS)
              </h3>
            </div>
            <span className="text-xs text-[#8d919c]">
              Coastal landmarks & foothill trailheads used across Santa Barbara, SB Foothills & Carpinteria
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {painStations.map((station) => {
              const active = selectedSpot.id === station.id;
              return (
                <button
                  key={station.id}
                  type="button"
                  onClick={() => {
                    if (!showStations) setShowStations(true);
                    handleSelectSpot(station);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                    active
                      ? 'bg-[#f85e5e]/15 border-[#f85e5e] text-white'
                      : 'bg-[#131417] border-[#2c2e37] text-[#b4b8c2] hover:border-[#4c5060] hover:text-white'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rotate-45 inline-block ${
                      active ? 'bg-[#f85e5e]' : 'bg-[#eab308]'
                    }`}
                  />
                  <span>{station.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
