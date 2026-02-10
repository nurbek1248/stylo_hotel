import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { 
  Sparkles, Calendar, Home, Coffee, UtensilsCrossed, Car,
  MapPin, Star, Clock, Bell, ChevronRight, Heart, Bed,
  MessageCircle, TrendingUp, Gift, Info
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Profile() {
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [timoMessage, setTimoMessage] = useState('');
  const [showTimo, setShowTimo] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Timo Welcome Animation
    setTimeout(() => {
      setShowTimo(true);
      const messages = [
        `Xush kelibsiz, ${user.name}! ${user.role === 'admin' ? 'Siz bizning VIP mijozimizsiz' : 'Sizni qayta ko\'rishdan xursandmiz'}`,
        'Bugun sizga qanday yordam bera olaman?'
      ];
      setTimoMessage(messages[0]);
      setTimeout(() => setTimoMessage(messages[1]), 2000);
    }, 500);
  }, [user, navigate]);

  if (!user) return null;

  const preferences = [
    { icon: Bed, label: 'Yostiq yumshoq bo\'lsin', active: true },
    { icon: Coffee, label: 'Xonada doim gazli suv', active: true },
    { icon: Home, label: 'Deraza yonidagi xona', active: false },
    { icon: Star, label: 'Late check-out', active: true },
  ];

  const bookings = [
    { id: 1, date: '2024-02-15 - 2024-02-18', room: 'Executive Suite #402', status: 'Upcoming', color: 'text-green-500' },
    { id: 2, date: '2024-01-10 - 2024-01-12', room: 'Deluxe Room #305', status: 'Completed', color: 'text-blue-500' },
    { id: 3, date: '2023-12-20 - 2023-12-25', room: 'Presidential Suite #501', status: 'Completed', color: 'text-blue-500' },
  ];

  const localGuide = [
    { title: 'Mebel Forumi 2024', desc: 'Tashkent Expo Center, 15-22 Fevral', icon: TrendingUp, tag: 'Tadbir' },
    { title: 'Milliy Taomlar Festivali', desc: 'Old City, har kuni 18:00-22:00', icon: UtensilsCrossed, tag: 'Restoran' },
    { title: 'Toshkent Zamonaviy San\'at Muzeyi', desc: '1.2 km, Ochiq: 10:00-18:00', icon: MapPin, tag: 'Madaniyat' },
  ];

  const services = [
    { icon: UtensilsCrossed, label: 'Restorandan buyurtma', color: 'bg-red-500/10 text-red-500 hover:bg-red-500/20' },
    { icon: Coffee, label: 'Xonaga qahva', color: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' },
    { icon: Home, label: 'Xonani tozalash', color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20' },
    { icon: Car, label: 'Transfer chaqirish', color: 'bg-green-500/10 text-green-500 hover:bg-green-500/20' },
  ];

  const timoMemory = {
    lastMeal: 'Steyk (Ribeye)',
    favoriteRoom: '402',
    preferredTime: 'Kechqurun bron qiladi',
  };

  const handleFastBooking = () => {
    toast({
      title: '🎉 Fast Booking!',
      description: `${timoMemory.favoriteRoom}-xona sizning nomingizga bron qilindi!`,
    });
  };

  const handleService = (service: string) => {
    toast({
      title: '✓ So\'rov yuborildi',
      description: `${service} xizmati 10 daqiqada bajariladi`,
    });
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 pt-32 pb-20 max-w-7xl">
        <div className="mb-6 flex justify-between items-center">
          <BackButton />
          <button 
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-4 py-2 glass rounded-lg text-sm hover:bg-red-500/10 hover:text-red-500 transition-all"
          >
            Chiqish
          </button>
        </div>

        {/* Timo AI Welcome Widget */}
        {showTimo && (
          <div className="glass-strong rounded-3xl p-6 border border-accent/30 mb-8 animate-fade-up relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            <div className="relative flex items-start gap-4">
              <div className="p-4 bg-accent/20 rounded-2xl animate-pulse">
                <Sparkles className="text-accent" size={32} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold mb-2 flex items-center gap-2">
                  Timo AI <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded-full">Online</span>
                </h2>
                <p className="text-lg text-muted-foreground animate-fade-in">{timoMessage}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Preferences */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <div className="glass-strong rounded-2xl p-6 border border-border/50 animate-fade-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-2xl font-bold text-accent">
                  {user.name[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <span className="inline-block mt-1 px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-bold">
                    {user.role === 'admin' ? 'VIP Guest' : 'Valued Guest'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-border/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Visits</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Loyalty Points</span>
                  <span className="font-bold text-accent">2,450 pts</span>
                </div>
              </div>
            </div>

            {/* Preferences Card */}
            <div className="glass-strong rounded-2xl p-6 border border-border/50 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
                <Heart className="text-pink-500" size={20} />
                Mening qiziqishlarim
              </h3>
              <div className="space-y-3">
                {preferences.map((pref, i) => (
                  <button
                    key={i}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      pref.active 
                        ? 'bg-accent/10 border border-accent/30 text-accent' 
                        : 'glass border border-border/30 hover:border-accent/30'
                    }`}
                  >
                    <pref.icon size={18} />
                    <span className="text-sm flex-1 text-left">{pref.label}</span>
                    {pref.active && <Star size={14} className="fill-current" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Bookings & Services */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timo Smart Memory */}
            <div className="glass-strong rounded-2xl p-6 border border-purple-500/30 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
                <MessageCircle className="text-purple-500" size={20} />
                Timo ning "Xotirasi"
              </h3>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  <span className="text-accent font-semibold">"{timoMemory.lastMeal}"</span> ni sog'indingizmi? 
                  Bugun oshpazimiz uni yanada mazaliroq tayyorlagan! 🥩
                </p>
                <button 
                  onClick={() => handleService('Steyk buyurtmasi')}
                  className="w-full py-2 bg-accent/20 hover:bg-accent text-accent hover:text-white rounded-lg text-sm font-semibold transition-all"
                >
                  Hoziroq buyurtma berish
                </button>
              </div>
            </div>

            {/* Event-Based Offer */}
            <div className="glass-strong rounded-2xl p-6 border border-green-500/30 animate-fade-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Gift className="text-green-500" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">Maxsus Taklif - Mebel Forumi 2024</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Siz forum ishtirokchisimisiz? Unda bizning restoranda kechki ovqat uchun 
                    <span className="text-green-500 font-bold"> 15% chegirma</span> dan foydalaning!
                  </p>
                  <button className="px-4 py-2 bg-green-500/20 text-green-500 rounded-lg text-sm font-semibold hover:bg-green-500 hover:text-white transition-all">
                    Chegirmani faollashtirish
                  </button>
                </div>
              </div>
            </div>

            {/* Fast Booking */}
            <div className="glass-strong rounded-2xl p-6 border border-blue-500/30 animate-fade-up" style={{ animationDelay: '400ms' }}>
              <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
                <Clock className="text-blue-500" size={20} />
                Fast Booking
              </h3>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold mb-1">Siz yoqtirgan {timoMemory.favoriteRoom}-xona bo'sh!</p>
                  <p className="text-sm text-muted-foreground">15-18 Fevral, 3 kun</p>
                </div>
                <button 
                  onClick={handleFastBooking}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all whitespace-nowrap"
                >
                  1 ta tugma bilan bron
                </button>
              </div>
            </div>

            {/* Booking History */}
            <div className="glass-strong rounded-2xl p-6 border border-border/50 animate-fade-up" style={{ animationDelay: '500ms' }}>
              <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
                <Calendar className="text-accent" size={20} />
                Shaxsiy Bronlar Tarixi
              </h3>
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="glass p-4 rounded-xl border border-border/30 hover:border-accent/30 transition-all flex items-center justify-between group">
                    <div>
                      <p className="font-semibold mb-1">{booking.room}</p>
                      <p className="text-xs text-muted-foreground">{booking.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold ${booking.color}`}>{booking.status}</span>
                      <ChevronRight size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* In-Room Services */}
            <div className="glass-strong rounded-2xl p-6 border border-border/50 animate-fade-up" style={{ animationDelay: '600ms' }}>
              <h3 className="text-lg font-serif font-bold mb-4">Xizmatlarni buyurtma qilish</h3>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service, i) => (
                  <button
                    key={i}
                    onClick={() => handleService(service.label)}
                    className={`p-4 rounded-xl ${service.color} transition-all flex flex-col items-center gap-2 hover:scale-105`}
                  >
                    <service.icon size={24} />
                    <span className="text-sm font-semibold text-center">{service.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Local Guide AI */}
            <div className="glass-strong rounded-2xl p-6 border border-border/50 animate-fade-up" style={{ animationDelay: '700ms' }}>
              <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-accent" size={20} />
                Local Guide AI - Sizning uchun
              </h3>
              <div className="space-y-3">
                {localGuide.map((item, i) => (
                  <div key={i} className="glass p-4 rounded-xl border border-border/30 hover:border-accent/30 transition-all group">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <item.icon size={20} className="text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-bold">{item.title}</h4>
                          <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">{item.tag}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Info size={16} className="text-muted-foreground group-hover:text-accent transition-colors cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
