import { useI18n } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import ScrollReveal from '@/components/ScrollReveal';
import { Sparkles, Waves, UtensilsCrossed, Dumbbell, Headphones, Plane } from 'lucide-react';
import gallerySpa from '@/assets/gallery-spa.jpg';
import galleryRestaurant from '@/assets/gallery-restaurant.jpg';

export default function AmenitiesPage() {
  const { t } = useI18n();

  const sections = [
    { title: t('amenities.spa'), desc: 'Rejuvenate body and mind in our world-class spa with signature treatments.', icon: Sparkles, img: gallerySpa },
    { title: t('amenities.restaurant'), desc: 'Savor culinary masterpieces crafted by award-winning chefs.', icon: UtensilsCrossed, img: galleryRestaurant },
  ];

  const services = [
    { icon: Waves, key: 'pool' },
    { icon: Dumbbell, key: 'gym' },
    { icon: Headphones, key: 'concierge' },
    { icon: Plane, key: 'transfer' },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <BackButton />
          </div>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t('nav.amenities')}</p>
            <h1 className="text-4xl font-serif font-semibold">{t('amenities.title')}</h1>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">{t('amenities.subtitle')}</p>
          </div>

          <div className="space-y-16">
            {sections.map((s, i) => (
              <ScrollReveal key={i}>
                <div className={`grid lg:grid-cols-2 gap-8 items-center ${i % 2 ? 'lg:flex-row-reverse' : ''}`}>
                  <img src={s.img} alt={s.title} className="rounded-2xl w-full aspect-video object-cover" />
                  <div className="glass rounded-2xl p-8 space-y-4">
                    <s.icon size={24} className="text-accent" />
                    <h2 className="font-serif text-2xl font-semibold">{s.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {services.map((s, i) => (
              <ScrollReveal key={s.key} delay={i * 100}>
                <div className="glass rounded-xl p-6 text-center">
                  <s.icon size={24} className="mx-auto mb-3 text-accent" />
                  <p className="font-medium text-sm">{t(`amenities.${s.key}`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
