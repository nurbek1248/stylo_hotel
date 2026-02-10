import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import ScrollReveal from '@/components/ScrollReveal';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setForm({ name: '', email: '', phone: '', message: '' });
    toast({ title: '✓', description: t('contact.success') });
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <BackButton />
          </div>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t('nav.contact')}</p>
            <h1 className="text-4xl font-serif font-semibold">{t('contact.title')}</h1>
            <p className="mt-3 text-muted-foreground">{t('contact.subtitle')}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Form */}
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">{t('contact.name')}</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full mt-1 glass rounded-lg px-3 py-2.5 text-sm bg-transparent outline-none focus:ring-1 focus:ring-accent"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">{t('contact.email')}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full mt-1 glass rounded-lg px-3 py-2.5 text-sm bg-transparent outline-none focus:ring-1 focus:ring-accent"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">{t('contact.phone')}</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full mt-1 glass rounded-lg px-3 py-2.5 text-sm bg-transparent outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">{t('contact.message')}</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full mt-1 glass rounded-lg px-3 py-2.5 text-sm bg-transparent outline-none focus:ring-1 focus:ring-accent resize-none"
                    required
                  />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity">
                  {t('contact.send')}
                </button>
              </form>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={150}>
              <div className="space-y-4">
                <div className="glass rounded-xl p-4 flex items-start gap-3">
                  <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{t('location.address')}</p>
                    <p className="text-sm">{t('location.address')}</p>
                  </div>
                </div>
                <a href="tel:+998555206777" className="glass rounded-xl p-4 flex items-start gap-3 hover:border-accent/30 transition-colors">
                  <Phone size={18} className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{t('location.phone')}</p>
                    <p className="text-sm">+998 55 520 67 77</p>
                  </div>
                </a>
                <a href="https://wa.me/998770041800" target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-4 flex items-start gap-3 hover:border-[#25D366]/50 transition-colors group">
                  <MessageCircle size={18} className="text-[#25D366] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{t('location.whatsapp')}</p>
                    <p className="text-sm font-medium">+998 77 004 18 00</p>
                  </div>
                </a>
                <a href="https://t.me/stylo_residence_suite" target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-4 flex items-start gap-3 hover:border-accent/30 transition-colors">
                  <Send size={18} className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{t('location.telegram')}</p>
                    <p className="text-sm">@stylo_residence_suite</p>
                  </div>
                </a>
                <a href="mailto:info@bookstylo.com" className="glass rounded-xl p-4 flex items-start gap-3 hover:border-accent/30 transition-colors">
                  <Mail size={18} className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{t('location.email')}</p>
                    <p className="text-sm">info@bookstylo.com</p>
                  </div>
                </a>
                <div className="glass rounded-xl p-4 flex items-start gap-3">
                  <Clock size={18} className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{t('contact.hours')}</p>
                    <p className="text-sm text-muted-foreground">{t('contact.hoursValue')}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Google Map - Full Width */}
          <ScrollReveal delay={300}>
            <div className="mt-16 glass rounded-2xl overflow-hidden aspect-[21/9] relative max-w-6xl mx-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.9!2d69.271742!3d41.291504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE3JzI5LjQiTiA2OcKwMTYnMTguMyJF!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="STYLO Residence Contact Location"
                className="absolute inset-0"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
