import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedSlider from '@/components/AnimatedSlider';
import { X } from 'lucide-react';
import heroImg from '@/assets/hero-hotel.jpg';
import roomDeluxe from '@/assets/room-deluxe.jpg';
import roomExec from '@/assets/room-executive.jpg';
import roomPres from '@/assets/room-presidential.jpg';
import gallerySpa from '@/assets/gallery-spa.jpg';
import galleryRestaurant from '@/assets/gallery-restaurant.jpg';

const images = [
  { src: heroImg, cat: 'lobby' },
  { src: roomDeluxe, cat: 'rooms' },
  { src: roomExec, cat: 'rooms' },
  { src: roomPres, cat: 'rooms' },
  { src: gallerySpa, cat: 'spa' },
  { src: galleryRestaurant, cat: 'restaurant' },
];

// Slider uchun rasm ma'lumotlari
const sliderImages = [
  {
    id: 1,
    src: heroImg,
    alt: 'Hotel Lobby',
    title: 'Luxury Lobby',
    description: 'Welcome to our elegant entrance hall'
  },
  {
    id: 2,
    src: roomDeluxe,
    alt: 'Deluxe Room',
    title: 'Deluxe Comfort',
    description: 'Spacious rooms with modern amenities'
  },
  {
    id: 3,
    src: roomExec,
    alt: 'Executive Suite',
    title: 'Executive Excellence',
    description: 'Premium suites for discerning guests'
  },
  {
    id: 4,
    src: roomPres,
    alt: 'Presidential Suite',
    title: 'Presidential Luxury',
    description: 'The pinnacle of hospitality experience'
  },
  {
    id: 5,
    src: gallerySpa,
    alt: 'Spa Facilities',
    title: 'Relaxation Haven',
    description: 'Rejuvenate your mind and body'
  },
  {
    id: 6,
    src: galleryRestaurant,
    alt: 'Fine Dining',
    title: 'Culinary Excellence',
    description: 'Exquisite cuisine in elegant surroundings'
  }
];

const filters = ['all', 'rooms', 'lobby', 'spa', 'restaurant'] as const;

export default function GalleryPage() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<string>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === 'all' ? images : images.filter(i => i.cat === filter);

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <BackButton />
          </div>
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t('nav.gallery')}</p>
            <h1 className="text-4xl font-serif font-semibold">{t('gallery.title')}</h1>
          </div>

          {/* Animated Slider Section */}
          <div className="mb-16">
            <ScrollReveal>
              <AnimatedSlider 
                images={sliderImages}
                autoPlay={true}
                interval={4000}
                showThumbnails={true}
                showDots={true}
              />
            </ScrollReveal>
          </div>

          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f ? 'bg-accent text-accent-foreground' : 'glass'
                }`}
              >
                {t(`gallery.${f}`)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map((img, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <button 
                  onClick={() => setLightbox(i)} 
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl w-full transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <img 
                    src={img.src} 
                    alt="" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  {/* Hover overlay with zoom effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-4">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  {/* Border glow effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 p-2 glass rounded-full" onClick={() => setLightbox(null)}><X size={20} /></button>
          <img src={filtered[lightbox].src} alt="" className="max-h-[85vh] max-w-full rounded-xl object-contain" onClick={e => e.stopPropagation()} />
        </div>
      )}

      <Footer />
    </main>
  );
}
