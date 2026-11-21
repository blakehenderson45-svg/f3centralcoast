import React, { useState, useEffect } from 'react';
import { Camera, X, ZoomIn } from 'lucide-react';

interface GalleryPhoto {
  src: string;
  alt: string;
  tag: string;
  title: string;
  caption: string;
  objectPosition: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: '/images/pax-bluff-sunrise.jpg',
    alt: 'Central Coast F3 men lined up along the coastal bluff overlook with sunrise glowing over the Pacific Ocean',
    tag: 'COASTAL BLUFF • SUNRISE',
    title: 'EARN THE SUNRISE',
    caption: 'Weighted vests, salt air, and Pacific horizon views before most of town wakes up.',
    objectPosition: 'object-[center_35%]',
  },
  {
    src: '/images/pax-gloom-track.jpg',
    alt: 'Central Coast F3 crew in the foggy pre-dawn gloom under stadium lights at SBCC La Playa Track',
    tag: '0530 IN THE GLOOM',
    title: 'FOG, LIGHTS & ZERO EXCUSES',
    caption: 'Marine layer rolling over La Playa Track—rain, fog, or shine, the PAX post.',
    objectPosition: 'object-[center_30%]',
  },
  {
    src: '/images/pax-brotherhood-selfie.jpg',
    alt: 'Smiling Central Coast F3 brothers in F3 shirts and weighted vests on the SBCC stadium turf',
    tag: '2ND F • FELLOWSHIP',
    title: 'BROTHERHOOD THAT STICKS',
    caption: 'Hard work strips away ego and turns strangers into brothers who actually have your back.',
    objectPosition: 'object-[center_20%]',
  },
  {
    src: '/images/pax-sbcc-lot.jpg',
    alt: 'Central Coast F3 PAX gathered at the SBCC Parking Lot Area of Operation under Santa Barbara palms',
    tag: 'PRIMARY AO • SBCC LOT',
    title: 'WHERE WE LAUNCH',
    caption: 'Right in the SBCC Parking Lot—look for the crew Tuesdays at 5:30 AM and Saturdays at 6:00 AM.',
    objectPosition: 'object-[center_30%]',
  },
];

export function PaxGallerySection() {
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    if (!lightboxPhoto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxPhoto(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxPhoto]);

  return (
    <section
      aria-label="Central Coast F3 Photo Gallery"
      className="relative py-16 sm:py-20 bg-[#101114] border-b border-[#24262d]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs tracking-[0.22em] text-[#f85e5e] uppercase font-bold mb-2.5 flex items-center gap-2.5">
              <span className="inline-block w-6 h-[2px] bg-[#f85e5e]" />
              <span>REAL MEN // REAL MORNINGS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-none">
              SHOTS FROM THE <span className="text-[#f85e5e]">CENTRAL COAST GLOOM</span>
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#8d919c]">
            <Camera className="w-3.5 h-3.5 text-[#f85e5e]" />
            <span>CLICK ANY PHOTO TO ENLARGE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_PHOTOS.map((photo) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setLightboxPhoto(photo)}
              className="group relative text-left rounded-xl overflow-hidden border border-[#2b2e37] hover:border-[#f85e5e]/60 bg-[#17181c] transition-all shadow-[0_12px_32px_rgba(0,0,0,0.45)] focus:outline-none focus:ring-2 focus:ring-[#f85e5e]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0e0f11]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className={`w-full h-full object-cover ${photo.objectPosition} contrast-[1.05] group-hover:scale-105 transition-transform duration-500`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121315]/90 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#121315]/85 border border-[#343743] backdrop-blur-sm font-mono text-[9px] tracking-[0.16em] text-[#e4e5e8] uppercase">
                  {photo.tag}
                </span>
                <span className="absolute top-3 right-3 w-7 h-7 rounded bg-[#121315]/80 border border-[#343743] flex items-center justify-center text-[#cfd3dc] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5 text-[#f85e5e]" />
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white group-hover:text-[#f85e5e] transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-[#9ea3ae] mt-1 leading-relaxed">{photo.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPhoto.title}
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#151619] border border-[#343743] rounded-xl overflow-hidden shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close photo preview"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#121315]/90 border border-[#3c3f4d] flex items-center justify-center text-white hover:text-[#f85e5e] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxPhoto.src}
              alt={lightboxPhoto.alt}
              className="w-full max-h-[75vh] object-contain bg-[#0c0d0f]"
            />
            <div className="p-4 sm:p-5 border-t border-[#262831] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f85e5e] font-bold">
                  {lightboxPhoto.tag}
                </div>
                <div className="font-display text-xl font-bold uppercase tracking-wide text-white">
                  {lightboxPhoto.title}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#aeb2bc] max-w-md">{lightboxPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
