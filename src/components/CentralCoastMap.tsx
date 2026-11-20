import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CoastalSpot } from '../data/centralCoastData';

export type MapStyleMode = 'tactical' | 'satellite';

interface CentralCoastMapProps {
  spots: CoastalSpot[];
  selectedSpot: CoastalSpot;
  showStations: boolean;
  mapMode: MapStyleMode;
  viewportCommand: { center: [number, number]; zoom: number; nonce: number } | null;
  onSelectSpot: (spot: CoastalSpot) => void;
}

function createBeaconIcon(spot: CoastalSpot, isSelected: boolean): L.DivIcon {
  if (spot.type === 'primary') {
    const size = isSelected ? 34 : 28;
    return L.divIcon({
      className: 'f3-custom-marker',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2],
      html: `
        <div style="position:relative;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
          <span class="f3-pin-pulse" style="position:absolute;inset:-4px;border-radius:9999px;background:rgba(248,94,94,0.5);"></span>
          <span style="position:relative;width:${isSelected ? 20 : 16}px;height:${isSelected ? 20 : 16}px;border-radius:9999px;background:#f85e5e;border:2.5px solid #ffffff;box-shadow:0 0 18px rgba(248,94,94,0.9);"></span>
        </div>
      `,
    });
  }

  const size = isSelected ? 22 : 16;
  return L.divIcon({
    className: 'f3-custom-station',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
    html: `
      <div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
        <span style="width:${isSelected ? 13 : 10}px;height:${isSelected ? 13 : 10}px;transform:rotate(45deg);background:${isSelected ? '#f85e5e' : '#eab308'};border:2px solid #121315;box-shadow:0 0 10px ${isSelected ? 'rgba(248,94,94,0.85)' : 'rgba(234,179,8,0.6)'};display:block;"></span>
      </div>
    `,
  });
}

export function CentralCoastMap({
  spots,
  selectedSpot,
  showStations,
  mapMode,
  viewportCommand,
  onSelectSpot,
}: CentralCoastMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const baseLayerRef = useRef<L.LayerGroup | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const onSelectRef = useRef(onSelectSpot);

  useEffect(() => {
    onSelectRef.current = onSelectSpot;
  }, [onSelectSpot]);

  // Initialize Leaflet map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [34.402, -119.615],
      zoom: 11,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    const baseLayer = L.layerGroup().addTo(map);
    const markersLayer = L.layerGroup().addTo(map);

    mapRef.current = map;
    baseLayerRef.current = baseLayer;
    markersLayerRef.current = markersLayer;

    // Ensure accurate sizing after initial paint
    const resizeTimer = window.setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      window.clearTimeout(resizeTimer);
      map.remove();
      mapRef.current = null;
      baseLayerRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // Swap map tile layers cleanly without API keys (OSM Tactical Dark vs Esri Coastal Satellite)
  useEffect(() => {
    const baseLayer = baseLayerRef.current;
    if (!baseLayer) return;

    baseLayer.clearLayers();

    if (mapMode === 'satellite') {
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
          maxZoom: 18,
        }
      ).addTo(baseLayer);

      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 18,
          opacity: 0.85,
        }
      ).addTo(baseLayer);
    } else {
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(baseLayer);
    }
  }, [mapMode]);

  // Render markers whenever visible spots or selection change
  useEffect(() => {
    const map = mapRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    const visibleSpots = spots.filter((s) => s.type === 'primary' || showStations);

    visibleSpots.forEach((spot) => {
      const isSelected = spot.id === selectedSpot.id;
      const marker = L.marker([spot.lat, spot.lng], {
        icon: createBeaconIcon(spot, isSelected),
        zIndexOffset: spot.type === 'primary' ? 500 : isSelected ? 400 : 100,
      });

      const badgeText =
        spot.type === 'primary'
          ? `<span style="display:inline-block;padding:2px 6px;border-radius:3px;background:rgba(248,94,94,0.18);color:#f85e5e;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">PRIMARY AO</span>`
          : `<span style="display:inline-block;padding:2px 6px;border-radius:3px;background:rgba(234,179,8,0.16);color:#eab308;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">PAIN STATION</span>`;

      const scheduleLine = spot.scheduleSummary
        ? `<div style="font-size:11px;color:#f85e5e;font-weight:600;margin-top:3px;">${spot.scheduleSummary}</div>`
        : '';

      marker.bindTooltip(
        `<div style="min-width:160px;">
          ${badgeText}
          <div style="font-weight:700;color:#ffffff;font-size:13px;">${spot.name}</div>
          ${scheduleLine}
        </div>`,
        {
          direction: 'top',
          offset: [0, -12],
          opacity: 0.96,
        }
      );

      marker.on('click', () => {
        onSelectRef.current(spot);
      });

      marker.addTo(layer);
    });
  }, [spots, selectedSpot, showStations]);

  // Execute explicit viewport commands (e.g. clicking a schedule card or quick region button)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !viewportCommand) return;

    map.flyTo(viewportCommand.center, viewportCommand.zoom, {
      duration: 0.9,
      easeLinearity: 0.25,
    });
  }, [viewportCommand]);

  return (
    <div
      className={`relative w-full h-[380px] sm:h-[460px] lg:h-full lg:min-h-[540px] rounded-xl overflow-hidden border border-[#2d3039] bg-[#0d0e10] ${
        mapMode === 'satellite' ? 'f3-map-satellite' : 'f3-map-dark'
      }`}
    >
      <div ref={containerRef} className="w-full h-full z-0" />
    </div>
  );
}
