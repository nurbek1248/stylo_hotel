import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import ScrollReveal from '@/components/ScrollReveal';
import { CalendarDays, Briefcase, Heart, X } from 'lucide-react';

const offersData = [
  { key: 'weekend', icon: CalendarDays, price: '$399' },
  { key: 'business', icon: Briefcase, price: '$249' },
  { key: 'honeymoon', icon: Heart, price: '$599' },
];

export default function OffersPage() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <BackButton />
          </div>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t('nav.offers')}</p>
            <h1 className="text-4xl font-serif font-semibold">{t('offers.title')}</h1>
            <p className="mt-3 text-muted-foreground">{t('offers.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {offersData.map((o, i) => (
              <ScrollReveal key={o.key} delay={i * 150}>
                <div className="glass rounded-2xl p-6 space-y-4 hover:-translate-y-1 transition-transform duration-300 cursor-pointer" onClick={() => setSelected(i)}>
                  <o.icon size={24} className="text-accent" />
                  <h3 className="font-serif text-xl font-semibold">{t(`offers.${o.key}`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`offers.${o.key}Desc`)}</p>
                  <p className="text-accent font-semibold">{t('rooms.from')} {o.price}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {selected !== null && (
        <div className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelected(null)}>
          <div className="glass-strong rounded-2xl max-w-md w-full p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between">
              <h2 className="font-serif text-2xl font-semibold">{t(`offers.${offersData[selected].key}`)}</h2>
              <button onClick={() => setSelected(null)}><X size={20} /></button>
            </div>
            <p className="text-muted-foreground">{t(`offers.${offersData[selected].key}Desc`)}</p>
            <p className="text-accent font-semibold text-lg">{offersData[selected].price}</p>
            <a href="/#booking" className="block w-full py-3 rounded-xl bg-accent text-accent-foreground text-center font-medium">{t('nav.bookNow')}</a>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
