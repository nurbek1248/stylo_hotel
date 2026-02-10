import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingWidget from '@/components/BookingWidget';
import BackButton from '@/components/BackButton';
import ScrollReveal from '@/components/ScrollReveal';
import { Users, Maximize, X, Wifi, Wind, Bed, Shield, Tv, Star } from 'lucide-react';
import { allRooms, Room } from '@/lib/rooms-data';

export default function Rooms() {
  const { t, lang } = useI18n();
  const location = useLocation();
  const [filter, setFilter] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomId = params.get('roomId');
    const guestFilter = params.get('guests');
    
    if (roomId) {
      const room = allRooms.find(r => r.id === parseInt(roomId));
      if (room) setSelectedRoom(room);
    }

    if (guestFilter) {
      setFilter('all'); // Clear specific type filter if looking by guests
    }
  }, [location]);

  const filtered = allRooms.filter(r => {
    const params = new URLSearchParams(location.search);
    const guestsNeeded = parseInt(params.get('guests') || '0');
    
    const matchesType = filter === 'all' || r.type === filter;
    const matchesGuests = r.guests >= guestsNeeded;
    
    return matchesType && matchesGuests;
  });

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <BackButton />
          </div>
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t('nav.rooms')}</p>
            <h1 className="text-4xl font-serif font-semibold">{t('rooms.title')}</h1>
            <p className="mt-3 text-muted-foreground">{t('rooms.subtitle')}</p>
          </div>

          {/* Filter */}
          <div className="flex justify-center gap-2 mb-10">
            {['all', 'deluxe', 'suite'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f ? 'bg-accent text-accent-foreground' : 'glass hover:bg-accent/10'
                }`}
              >
                {f === 'all' ? t('rooms.all') : f === 'deluxe' ? t('rooms.deluxe') : t('rooms.executive')}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((room, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="glass rounded-2xl overflow-hidden group cursor-pointer" onClick={() => setSelectedRoom(room)}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={room.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg font-semibold">{t(`rooms.${room.key}`)}</h3>
                    <p className="text-sm text-muted-foreground">{t(`rooms.${room.key}Desc`)}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Maximize size={12} />{room.sqm} {t('rooms.sqm')}</span>
                      <span className="flex items-center gap-1"><Users size={12} />{room.guests} {t('rooms.guests')}</span>
                    </div>
                    <p className="text-accent font-semibold pt-1">{t('rooms.from')} ${room.price}{t('booking.perNight')}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Room Detail Modal */}
      {selectedRoom !== null && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-4 animate-fade-in" onClick={() => setSelectedRoom(null)}>
          <div className="bg-white dark:bg-zinc-900 w-full max-w-6xl max-h-screen md:max-h-[95vh] overflow-y-auto md:rounded-2xl shadow-2xl relative" onClick={e => e.stopPropagation()}>
            
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-4 border-b border-border flex justify-between items-center">
              <h2 className="font-serif text-2xl font-semibold">{t(`rooms.${selectedRoom.key}`)}</h2>
              <button onClick={() => setSelectedRoom(null)} className="p-2 hover:bg-muted rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Image Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px]">
                <div className="md:col-span-2 relative">
                  <span className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-md z-10">
                    {t('rooms.availability')}
                  </span>
                  <img src={selectedRoom.img} alt="" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="hidden md:grid grid-cols-1 gap-4">
                  <img src={selectedRoom.img} alt="" className="w-full h-full object-cover rounded-xl opacity-80" />
                  <img src={selectedRoom.img} alt="" className="w-full h-full object-cover rounded-xl opacity-80" />
                </div>
                <div className="hidden md:grid grid-cols-1 gap-4">
                  <img src={selectedRoom.img} alt="" className="w-full h-1/2 object-cover rounded-xl opacity-80" />
                  <div className="relative h-1/2">
                    <img src={selectedRoom.img} alt="" className="w-full h-full object-cover rounded-xl opacity-50 brightness-50" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <Maximize size={24} className="mb-2" />
                      <span className="text-xs font-medium">Fotojamlanma...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Users size={18} className="text-accent" />
                      <span>{selectedRoom.guests} {t('rooms.guests')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Maximize size={18} className="text-accent" />
                      <span>{selectedRoom.sqm} {t('rooms.sqm')}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`rooms.${selectedRoom.key}Desc`)}. 
                      Experience the ultimate in comfort and style in our meticulously designed rooms.
                      Each detail has been curated to provide a sanctuary of peace and luxury.
                    </p>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl font-semibold">{t('rooms.amenities')}</h3>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { icon: Wifi, label: 'rooms.wifi' },
                        { icon: Wind, label: 'rooms.ac' },
                        { icon: Bed, label: 'rooms.kingsize' },
                        { icon: Shield, label: 'rooms.safe' },
                        { icon: Tv, label: 'rooms.tv' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-muted/50 px-4 py-2.5 rounded-lg border border-border/50">
                          <item.icon size={16} className="text-accent" />
                          <span className="text-sm">{t(item.label)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Room Reviews */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <h3 className="font-serif text-xl font-semibold">{t('rooms.reviews')}</h3>
                    <div className="space-y-4">
                      {selectedRoom.reviews.map((rev, idx) => (
                        <div key={idx} className="bg-muted/30 p-4 rounded-xl space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{rev.name}</span>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} size={10} className="text-accent fill-accent" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm italic text-muted-foreground">"{rev.text[lang]}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 glass-strong p-6 rounded-2xl border border-border/50 shadow-xl space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('rooms.from')} boshlab</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-medium">UZS</span>
                        <span className="text-3xl font-bold">{(selectedRoom.price * 12600).toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">1 kecha / 2 mehmon</p>
                    </div>
                    
                    <button className="w-full py-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl font-bold tracking-wider transition-all shadow-lg shadow-accent/20">
                      {t('rooms.select')}
                    </button>
                    
                    <div className="space-y-4 pt-4 border-t border-border">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Hayvonlar bilan joylashish</span>
                        <span>Uy hayvonlarisiz</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Tashqi hudud</span>
                        <span>Balkon</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
