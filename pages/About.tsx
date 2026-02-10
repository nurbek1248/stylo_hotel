import { useI18n } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import ScrollReveal from '@/components/ScrollReveal';
import { Award, Gem, Heart } from 'lucide-react';

export default function About() {
  const { t } = useI18n();

  const values = [
    { icon: Award, key: 'excellence' },
    { icon: Gem, key: 'elegance' },
    { icon: Heart, key: 'hospitality' },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <BackButton />
          </div>
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t('nav.about')}</p>
              <h1 className="text-4xl font-serif font-semibold">{t('about.title')}</h1>
              <p className="mt-3 text-muted-foreground">{t('about.subtitle')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass rounded-2xl p-8 mb-12">
              <p className="text-muted-foreground leading-relaxed text-lg font-serif italic">
                {t('about.story')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="text-2xl font-serif font-semibold text-center mb-8">{t('about.values')}</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.key} delay={i * 150}>
                <div className="glass rounded-2xl p-6 text-center space-y-3">
                  <v.icon size={28} className="mx-auto text-accent" />
                  <h3 className="font-serif text-lg font-semibold">{t(`about.${v.key}`)}</h3>
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
