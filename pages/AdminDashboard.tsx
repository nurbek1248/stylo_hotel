import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import SuperTimoAI from '@/components/SuperTimoAI';
import { TrendingUp, Users, Clock, Cpu, PieChart, Award, Phone, Globe, DollarSign, ToggleLeft, ToggleRight, Star, Coffee, Database, MessageCircle, BarChart3, Instagram, Send, MousePointer, X, ShoppingBag } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar } from 'recharts';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [dynamicPricing, setDynamicPricing] = useState(true);
  const [hoveredChart, setHoveredChart] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [liveStats, setLiveStats] = useState({
    revenue: 15600,
    visitors: 1245,
    restaurant: 4680
  });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [aiProgress, setAiProgress] = useState(68);
  const [aiLogs, setAiLogs] = useState([
    'Processing Guest Preferences...',
    'Analyzing Competitive Prices...',
    'Optimizing Room Availability...',
    'Updating Dynamic Pricing...'
  ]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  // Live Data Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 10) + 1,
        visitors: prev.visitors + Math.floor(Math.random() * 5) + 1,
        restaurant: prev.restaurant + Math.floor(Math.random() * 8) + 1
      }));
    }, 5000 + Math.random() * 3000); // 5-8 seconds

    return () => clearInterval(interval);
  }, []);

  // AI Training Logs Rotation
  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLogIndex(prev => (prev + 1) % aiLogs.length);
    }, 3000);

    return () => clearInterval(logInterval);
  }, [aiLogs.length]);

  // Live Notifications
  useEffect(() => {
    const notificationMessages = [
      { message: 'Yangi bron! Instagram orqali Standard xona band qilindi.', type: 'bron' },
      { message: 'Mijoz restoranda $45 lik to\'lovni amalga oshirdi.', type: 'payment' },
      { message: 'Timo AI: Sayt SEO ko\'rsatkichi 5% ga yaxshilandi.', type: 'ai' },
      { message: 'Telegram bot 23 ta yangi xabar oldi.', type: 'telegram' },
      { message: 'Vebsayt trafigi 15% ga oshdi.', type: 'traffic' }
    ];

    const notificationInterval = setInterval(() => {
      const randomNotification = notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
      const newNotification = {
        id: Date.now(),
        ...randomNotification,
        timestamp: new Date()
      };
      
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Max 5 notifications
    }, 15000); // Every 15 seconds

    return () => clearInterval(notificationInterval);
  }, []);

  if (!user || user.role !== 'admin') return null;

  // Live Stats with dynamic values
  const stats = [
    { 
      label: 'Jami Tashrif', 
      value: `${liveStats.visitors.toLocaleString()} ta`, 
      growth: '+18%', 
      icon: Users, 
      color: 'text-blue-500', 
      progress: 87,
      isLive: true 
    },
    { 
      label: 'Jami Bron', 
      value: '89 ta', 
      growth: '+12%', 
      icon: Globe, 
      color: 'text-accent', 
      progress: 78 
    },
    { 
      label: 'Jami Daromad', 
      value: `$${liveStats.revenue.toLocaleString()}`, 
      growth: '+25%', 
      icon: DollarSign, 
      color: 'text-green-500', 
      progress: 92,
      isLive: true 
    },
    { 
      label: "O'rtacha Bandlik", 
      value: '78%', 
      growth: '+7%', 
      icon: PieChart, 
      color: 'text-purple-500', 
      progress: 78 
    },
  ];

  // Daromad dinamikasi - 12 oylik ma'lumotlar
  const revenueData = [
    { name: 'Yan', daromad: 12400, bron: 65 },
    { name: 'Fev', daromad: 13800, bron: 72 },
    { name: 'Mar', daromad: 11500, bron: 58 },
    { name: 'Apr', daromad: 14200, bron: 75 },
    { name: 'May', daromad: 15600, bron: 82 },
    { name: 'Iyun', daromad: 13400, bron: 68 },
    { name: 'Iyul', daromad: 16800, bron: 89 },
    { name: 'Avg', daromad: 17200, bron: 91 },
    { name: 'Sen', daromad: 14900, bron: 76 },
    { name: 'Okt', daromad: 15800, bron: 83 },
    { name: 'Noy', daromad: 13600, bron: 71 },
    { name: 'Dek', daromad: 16200, bron: 85 },
  ];

  // Bron manbalari
  const bookingSources = [
    { name: 'Vebsayt', value: 40, color: '#10b981', icon: '🌐' },
    { name: 'Instagram', value: 35, color: '#e1306c', icon: '📸' },
    { name: 'Telegram', value: 15, color: '#0088cc', icon: '✈️' },
    { name: 'Telefon', value: 10, color: '#3b82f6', icon: '📞' },
  ];

  // Restoran top taomlari
  const topDishes = [
    { name: 'Steyk (Ribeye)', sotuv: 156, daromad: 4680, foiz: 32 },
    { name: 'Osh', sotuv: 134, daromad: 2680, foiz: 18 },
    { name: 'Sezar Salat', sotuv: 98, daromad: 1960, foiz: 13 },
    { name: 'Somsa', sotuv: 87, daromad: 870, foiz: 6 },
    { name: 'Pasta Carbonara', sotuv: 76, daromad: 1520, foiz: 10 },
  ];

  // Instagram analitikasi
  const instagramData = [
    { metric: 'Yozishmalar', qiymat: 245, conversion: '23%', trend: '↗️ +15%' },
    { metric: "Profill ko'rilgan", qiymat: 1240, conversion: '-', trend: '↗️ +22%' },
    { metric: 'Bron qilingan', qiymat: 56, conversion: '-', trend: '↗️ +18%' },
    { metric: 'CTR', qiymat: '22.4%', conversion: '-', trend: '↗️ +8%' },
  ];

  // Sayt analitikasi
  const websiteData = [
    { metric: 'Saytga kirish', qiymat: 3420, conversion: '-', trend: '↗️ +12%' },
    { metric: '"Bron qilish" bosish', qiymat: 890, conversion: '26%', trend: '↘️ -3%' },
    { metric: "To'lov qilish", qiymat: 654, conversion: '73%', trend: '↗️ +5%' },
    { metric: 'Cart abandonment', qiymat: 236, conversion: '27%', trend: '↘️ -8%' },
  ];

  const customers = [
    { name: 'Jasur Alimov', date: '2024-02-08', room: 'Presidential Suite', status: 'VIP', preferences: 'Qahvani shakarli ichadi, deraza yonidagi xonani yoqtiradi' },
    { name: 'Marina Petrova', date: '2024-02-07', room: 'Deluxe Room', status: 'Regular', preferences: 'Vegetarian, oziq allergiyasi: yong\'oqlar' },
    { name: 'Ahmed Al-Rashid', date: '2024-02-07', room: 'Executive Suite', status: 'VIP', preferences: 'Late check-out talab qiladi, gym ishlatadi' },
    { name: 'Elena Kim', date: '2024-02-06', room: 'Deluxe Room', status: 'Regular', preferences: 'Jimjit xona, klimat 20°C' },
    { name: 'Otabek Rahimov', date: '2024-02-05', room: 'Executive Suite', status: 'VIP', preferences: 'Room service orqali milliy taomlar buyurtma qiladi' },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-[#05070a] via-[#0a0e15] to-[#05070a]">
      {/* User panel headerini admin uchun yashirish */}
      {/* <Navbar /> */}
      
      {/* Live Notifications Panel */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-xs">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className="glass-strong rounded-xl border border-blue-500/30 p-3 animate-slide-in-right"
          >
            <div className="flex items-start gap-2">
              <div className={`p-1.5 rounded-lg ${
                notification.type === 'bron' ? 'bg-green-500/20' :
                notification.type === 'payment' ? 'bg-yellow-500/20' :
                notification.type === 'ai' ? 'bg-purple-500/20' :
                notification.type === 'telegram' ? 'bg-blue-500/20' :
                'bg-cyan-500/20'
              }`}>
                {notification.type === 'bron' && <Globe size={14} className="text-green-400" />}
                {notification.type === 'payment' && <DollarSign size={14} className="text-yellow-400" />}
                {notification.type === 'ai' && <Cpu size={14} className="text-purple-400" />}
                {notification.type === 'telegram' && <Send size={14} className="text-blue-400" />}
                {notification.type === 'traffic' && <TrendingUp size={14} className="text-cyan-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">{notification.message}</p>
                <p className="text-[10px] text-muted-foreground/70">
                  {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex-1 container mx-auto px-4 pt-8 pb-20">
        <div className="mb-8 flex justify-between items-center">
          <BackButton />
          <button 
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
          >
            Chiqish
          </button>
        </div>

        {/* Header */}
        <div className="glass-strong rounded-3xl p-8 border border-accent/30 mb-8 animate-fade-in">
          <h1 className="text-4xl font-serif font-bold mb-2 bg-gradient-to-r from-accent via-yellow-400 to-accent bg-clip-text text-transparent">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">Welcome back, <span className="text-accent font-bold">{user.name}</span>. Full system access granted.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="glass-strong p-6 rounded-2xl border border-border/50 hover:border-accent/50 transition-all hover:-translate-y-1 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`${stat.color}`} size={24} />
                <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full font-semibold">{stat.growth}</span>
              </div>
              <h3 className="text-sm text-muted-foreground mb-3">{stat.label}</h3>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-3xl font-serif font-bold">{stat.value}</p>
                {stat.isLive && (
                  <div className="flex items-center gap-1 animate-pulse">
                    <span className="text-green-500 text-lg">↑</span>
                    <span className="text-xs text-green-500 font-bold">LIVE</span>
                  </div>
                )}
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    stat.color.replace('text-', 'bg-')
                  }`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground mt-1 text-right">{stat.progress}%</div>
            </div>
          ))}
        </div>

        {/* Daromad Dinamikasi - Recharts Area Chart */}
        <div className="glass-strong p-6 rounded-2xl border border-border/50 mb-8 animate-fade-up" style={{ animationDelay: '400ms' }}>
          <h3 className="text-xl font-serif font-bold mb-6 text-center flex items-center justify-center gap-2">
            <BarChart3 className="text-accent" size={24} />
            Daromad Dinamikasi
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity="0.3" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`$${value}`, 'Daromad']}
                />
                <Area 
                  type="monotone" 
                  dataKey="daromad" 
                  stroke="#f59e0b" 
                  fill="url(#colorDaromad)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorDaromad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Daromad ($)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Bronlar</span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Top Countries */}
          <div className="glass-strong p-6 rounded-2xl border border-border/50 hover:border-blue-500/50 transition-all animate-fade-up" style={{ animationDelay: '500ms' }}>
            <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
              <Globe size={20} className="text-blue-500" />
              Top Davlatlar
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇺🇿</span>
                  <span>O'zbekiston</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">42%</div>
                  <div className="text-xs text-green-500">↑ 12%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇷🇺</span>
                  <span>Rossiya</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">28%</div>
                  <div className="text-xs text-green-500">↑ 8%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇹🇷</span>
                  <span>Turkiya</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">18%</div>
                  <div className="text-xs text-red-500">↓ 3%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇺🇸</span>
                  <span>AQSH</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">12%</div>
                  <div className="text-xs text-green-500">↑ 5%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Restaurant TOP Dishes Chart */}
          <div 
            className="glass-strong p-6 rounded-2xl border border-border/50 hover:border-red-500/50 transition-all animate-fade-up"
            onMouseEnter={() => setHoveredChart('restaurant')}
            onMouseLeave={() => setHoveredChart(null)}
            style={{ animationDelay: '500ms' }}
          >
            <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
              <Award size={20} className="text-red-500" />
              Restoran - TOP Taomlar
            </h3>
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="113.1 251.2" className="transition-all duration-1000" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="20" strokeDasharray="75.4 251.2" strokeDashoffset="-113.1" className="transition-all duration-1000" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#fb923c" strokeWidth="20" strokeDasharray="37.7 251.2" strokeDashoffset="-188.5" className="transition-all duration-1000" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#fbbf24" strokeWidth="20" strokeDasharray="25.1 251.2" strokeDashoffset="-226.2" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Coffee className="text-accent" size={32} />
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Steyk</span><span className="font-bold">45%</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Milliy</span><span className="font-bold">30%</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-400"></span> Dengiz</span><span className="font-bold">15%</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> Ichimlik</span><span className="font-bold">10%</span></div>
            </div>
            {hoveredChart === 'restaurant' && (
              <div className="mt-4 p-3 bg-red-500/10 rounded-lg text-xs animate-fade-in">
                <p className="text-red-400 font-semibold">Eng mashhur taom:</p>
                <p className="text-muted-foreground">Steyk (Ribeye) - 315 buyurtma</p>
              </div>
            )}
          </div>

          {/* Bron Manbalari - Interactive Donut Chart */}
          <div 
            className="glass-strong p-6 rounded-2xl border border-border/50 hover:border-green-500/50 transition-all animate-fade-up cursor-pointer"
            style={{ animationDelay: '600ms' }}
            onClick={() => setModalOpen('bron')}
          >
            <h3 className="text-lg font-serif font-bold mb-6 flex items-center gap-2">
              <PieChart size={20} className="text-green-500" />
              Bron Manbalari
              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full ml-auto">Batafsil</span>
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <RechartsPieChart
                    data={bookingSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {bookingSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name, props) => [`${value}%`, props.payload.name]}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {bookingSources.map((source, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                  <span>{source.icon}</span>
                  <div>
                    <div className="text-sm font-medium">{source.name}</div>
                    <div className="text-xs text-muted-foreground">{source.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timo AI Marketing Tavsiyalari */}
        <div className="glass-strong p-8 rounded-3xl border border-purple-500/30 mb-8 animate-fade-up" style={{ animationDelay: '700ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Cpu className="text-purple-400" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold">Hozirgi Marketing Fokus</h2>
              <p className="text-sm text-muted-foreground">Timo AI tomonidan berilgan marketing strategiyalari</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl p-6 hover:border-pink-500/50 transition-all">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-pink-500/20 rounded-lg">
                  <Instagram className="text-pink-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-pink-400 flex items-center gap-2">
                    🚀 Instagram Reklama
                    <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">Shoshilinch</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Oxirgi 3 kunda Instagramdan o'tishlar soni 25% ga oshgan, lekin bron qilish konversiyasi pasaygan. 
                    <span className="text-accent font-semibold">Reklamaga "Directda javob berish" tugmasini qo'shish tavsiya etiladi.</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs mt-4 pt-3 border-t border-pink-500/20">
                <span className="text-pink-400">Prioritet: Yuqori</span>
                <span className="text-muted-foreground">1 soat oldin</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <MousePointer className="text-blue-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-blue-400 flex items-center gap-2">
                    🌐 SEO Optimizatsiya
                    <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">Rejalashtirilgan</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    15-20 Fevral: Bayram oldi qidiruvlar soni ortadi. 
                    <span className="text-accent font-semibold">Sayt SEO-ga e'tibor bering. Maxsus "Navro'z paketlari" uchun kalit so'zlarni optimizatsiya qiling.</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs mt-4 pt-3 border-t border-blue-500/20">
                <span className="text-blue-400">Vaqt: 15-20 Fevral</span>
                <span className="text-muted-foreground">3 kun oldin</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="text-green-400" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-green-400">📊 Konversiya O'sishi</h3>
                <p className="text-sm text-muted-foreground">
                  Joriy oyda umumiy konversiya 18% ga oshdi. 
                  <span className="text-accent font-semibold">"Cart abandonment" 27% - bu muhim nuqta. Email reminder tizimini faollashtiring va 1-soatlik chegirmalar taklif qiling.</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs mt-4 pt-3 border-t border-green-500/20">
              <span className="text-green-400">Natija: Ijobiy</span>
              <span className="text-muted-foreground">Bugun</span>
            </div>
          </div>
        </div>

        {/* Marketing Fokus Modal Trigger */}
        <div 
          className="glass-strong p-6 rounded-2xl border border-purple-500/30 hover:border-purple-500/50 transition-all cursor-pointer animate-fade-up"
          style={{ animationDelay: '850ms' }}
          onClick={() => setModalOpen('marketing')}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-serif font-bold flex items-center gap-2 text-purple-400">
              <TrendingUp size={20} />
              Marketing Fokus
              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">Batafsil</span>
            </h3>
            <TrendingUp className="text-purple-400" size={20} />
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Timo AI tomonidan berilgan marketing strategiyalari va tavsiyalar
          </p>
          <div className="flex items-center gap-2 text-xs text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Real-time tahlil</span>
          </div>
        </div>

        {/* Smart AI Insights */}
        <div className="glass-strong p-8 rounded-3xl border border-purple-500/30 mb-8 animate-fade-up" style={{ animationDelay: '800ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Cpu className="text-purple-400" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold">Timo AI Strategik Maslahatlari</h2>
              <p className="text-sm text-muted-foreground">AI tomonidan berilgan biznes strategiyalari</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <TrendingUp className="text-blue-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-blue-400">Navro'z Bashorati</h3>
                  <p className="text-sm text-muted-foreground">
                    Kelasi hafta Navro'z bayrami sababli talab 40% ga oshishi kutilmoqda. 
                    <span className="text-accent font-semibold">Narxlarni 15% ga ko'tarishni tavsiya qilaman.</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs mt-4 pt-3 border-t border-blue-500/20">
                <span className="text-blue-400">Ishonchlilik: 87%</span>
                <span className="text-muted-foreground">2 soat oldin</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Award className="text-yellow-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-yellow-400">Flash Sale Taklifi</h3>
                  <p className="text-sm text-muted-foreground">
                    Standard xonalar 100% band. 
                    <span className="text-accent font-semibold">Deluxe xonalar uchun 'Flash Sale' e'lon qilish vaqti keldi.</span> 
                    24 soat davomida 20% chegirma taklif qiling.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs mt-4 pt-3 border-t border-yellow-500/20">
                <span className="text-yellow-400">Shoshilinch!</span>
                <span className="text-muted-foreground">Hozir</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Globe className="text-green-400" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-green-400">Xalqaro Bozor Tahlili</h3>
                <p className="text-sm text-muted-foreground">
                  Rossiya bozorida valyuta kursi turg'un. 
                  <span className="text-accent font-semibold">Rossiya mijozlari uchun maxsus paketlar yaratishni tavsiya qilaman.</span> 
                  Avgust oyiga mo'ljallangan 7-kunlik "Premium Relax" paketi taklif qiling.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs mt-4 pt-3 border-t border-green-500/20">
              <span className="text-green-400">Global Insight</span>
              <span className="text-muted-foreground">1 kun oldin</span>
            </div>
          </div>
        </div>

        {/* Timo AI Intelligence Center */}
        <div className="glass-strong p-8 rounded-3xl border border-purple-500/30 mb-8 animate-fade-up" style={{ animationDelay: '800ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Cpu className="text-purple-400" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold">AI Neural Center (Training Phase)</h2>
              <p className="text-sm text-muted-foreground">Powered by Advanced Machine Learning</p>
            </div>
          </div>

          {/* AI Training Progress - LIVE */}
          <div className="mb-6 animate-pulse-slow">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Cpu className="text-purple-400" size={20} />
                AI Training Progress
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full animate-pulse">LIVE</span>
              </h3>
              <span className="text-2xl font-bold text-accent">{aiProgress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden mb-2">
              <div 
                className="bg-gradient-to-r from-accent to-purple-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${aiProgress}%` }}
              ></div>
            </div>
            {/* Live AI Logs */}
            <div className="p-3 bg-black/30 rounded-lg border border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-purple-400 font-mono">AI_NEURAL_ENGINE</span>
              </div>
              <p className="text-sm font-mono text-green-400 h-5 overflow-hidden">
                {aiLogs[currentLogIndex]}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* AI Learning Data */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-400">
                <Database size={20} />
                AI Learning Data
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-green-500/10 rounded-lg">
                  <span className="text-sm">Analyzing room types...</span>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Success</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-500/10 rounded-lg">
                  <span className="text-sm">Learning pricing history...</span>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Success</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-500/10 rounded-lg">
                  <span className="text-sm">Language processing (Uzbek/Russian)...</span>
                  <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">In progress</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-500/10 rounded-lg">
                  <span className="text-sm">Customer behavior analysis...</span>
                  <span className="text-xs px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full">Pending</span>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-green-400">
                <Award size={20} />
                Future Capabilities
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                O'qitish tugagandan so'ng AI quyidagi imkoniyatlarga ega bo'ladi:
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Avtomatik bron qilish
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Personalizatsiya
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Real-time tarjima
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Prognostika tahlili
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between bg-accent/10 border border-accent/30 rounded-xl p-5">
            <div>
              <h3 className="font-bold text-lg mb-1">Dynamic Pricing</h3>
              <p className="text-sm text-muted-foreground">Narxlarni avtomatik boshqarish tizimi</p>
            </div>
            <button
              onClick={() => setDynamicPricing(!dynamicPricing)}
              className={`relative w-16 h-8 rounded-full transition-all ${
                dynamicPricing ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  dynamicPricing ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* CRM System */}
        <div className="glass-strong p-8 rounded-3xl border border-border/50 animate-fade-up" style={{ animationDelay: '800ms' }}>
          <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
            <Users className="text-accent" size={28} />
            CRM Tizimi - Oxirgi Mijozlar
          </h2>
          
          {/* Live Chat Monitor */}
          <div className="mb-6 p-5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/30">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-400">
              <MessageCircle size={20} />
              Live Chat Monitor
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-accent">24</div>
                <div className="text-sm text-muted-foreground">Active Chats</div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-green-400">18</div>
                <div className="text-sm text-muted-foreground">Rossiya</div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">6</div>
                <div className="text-sm text-muted-foreground">Boshqa</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {customers.map((customer, i) => (
              <div key={i} className="glass p-5 rounded-xl border border-border/30 hover:border-accent/50 transition-all hover:-translate-y-0.5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                      {customer.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{customer.name}</h3>
                      <p className="text-xs text-muted-foreground">{customer.date} · {customer.room}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    customer.status === 'VIP' ? 'bg-accent/20 text-accent' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {customer.status === 'VIP' && <Star size={12} className="inline mr-1" />}
                    {customer.status}
                  </span>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-xs text-blue-400 font-semibold mb-1">Preferences:</p>
                  <p className="text-sm text-muted-foreground">{customer.preferences}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* Restoran Modal */}
      {modalOpen === 'restoran' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass-strong rounded-2xl border border-border/50 max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-scale-in">
            <div className="p-6 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif font-bold flex items-center gap-2">
                  <Award className="text-amber-500" size={24} />
                  Restoran Top Taomlari
                </h3>
                <button 
                  onClick={() => setModalOpen(null)}
                  className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {topDishes.map((dish, i) => (
                  <div key={i} className="p-4 glass rounded-xl border border-border/30 hover:border-amber-500/50 transition-all">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-lg">{dish.name}</h4>
                      <span className="text-2xl font-bold text-amber-500">{dish.foiz}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <ShoppingBag size={16} className="text-blue-400" />
                        <span>Sotuv: <strong>{dish.sotuv} ta</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-green-400" />
                        <span>Daromad: <strong>${dish.daromad}</strong></span>
                      </div>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2 mt-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000"
                        style={{ width: `${dish.foiz}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bron Modal */}
      {modalOpen === 'bron' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass-strong rounded-2xl border border-border/50 max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-scale-in">
            <div className="p-6 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif font-bold flex items-center gap-2">
                  <Instagram className="text-pink-500" size={24} />
                  Instagram Analitikasi
                </h3>
                <button 
                  onClick={() => setModalOpen(null)}
                  className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid gap-4">
                {instagramData.map((item, i) => (
                  <div key={i} className="p-4 glass rounded-xl border border-border/30 hover:border-pink-500/50 transition-all">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold">{item.metric}</h4>
                        <div className="text-2xl font-bold text-accent mt-1">{item.qiymat}{item.metric.includes('%') ? '' : ' ta'}</div>
                      </div>
                      <div className="text-right">
                        {item.conversion !== '-' && (
                          <div className="text-sm text-blue-400">Konversiya: {item.conversion}</div>
                        )}
                        <div className="text-sm text-green-400 flex items-center gap-1 mt-1">
                          {item.trend}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl border border-pink-500/30">
                <h4 className="font-bold text-pink-400 mb-2">📊 Umumiy Hisobot</h4>
                <p className="text-sm text-muted-foreground">
                  Oxirgi 3 kunda Instagramdan o'tishlar soni 25% ga oshgan, lekin bron qilish konversiyasi pasaygan. 
                  <span className="text-accent font-semibold">Reklamaga "Directda javob berish" tugmasini qo'shish tavsiya etiladi.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Marketing Fokus Modal */}
      {modalOpen === 'marketing' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass-strong rounded-2xl border border-purple-500/50 max-w-3xl w-full max-h-[85vh] overflow-y-auto animate-scale-in">
            <div className="p-6 border-b border-purple-500/30 sticky top-0 bg-background/80 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif font-bold flex items-center gap-2">
                  <TrendingUp className="text-purple-500" size={24} />
                  Nega aynan hozir Instagramga pul tikish kerak?
                </h3>
                <button 
                  onClick={() => setModalOpen(null)}
                  className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
                  
            <div className="p-6">
              <div className="space-y-6">
                {/* AI Tahlil */}
                <div className="p-5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/30">
                  <h4 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
                    <Cpu size={18} />
                    Timo AI Tahlili
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                      <span><strong>Oxirgi 7 kunda</strong>: Instagram trafik 42% ga oshgan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                      <span><strong>Konversiya</strong>: 1200 kirish → 45 bron (3.75%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                      <span><strong>ROI</strong>: Har 1$ uchun $4.2 foyda</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                      <span><strong>Raqobatchilar</strong>: 3 ta asosiy mehmonxona faol reklama yuritmoqda</span>
                    </li>
                  </ul>
                </div>
      
                {/* Sabablar */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 glass rounded-xl border border-green-500/30">
                    <h5 className="font-bold text-green-400 mb-2">📈 Rivojlanayotgan bozor</h5>
                    <p className="text-sm text-muted-foreground">Instagramda mehmonxona qidiruv so'rovlari 65% ga oshgan</p>
                  </div>
                  <div className="p-4 glass rounded-xl border border-blue-500/30">
                    <h5 className="font-bold text-blue-400 mb-2">🎯 Mo'ljallangan auditoriya</h5>
                    <p className="text-sm text-muted-foreground">18-35 yosh guruhiga mos kontent yuqori CTR berayapti</p>
                  </div>
                  <div className="p-4 glass rounded-xl border border-yellow-500/30">
                    <h5 className="font-bold text-yellow-400 mb-2">💰 Arzon CPC</h5>
                    <p className="text-sm text-muted-foreground">Reklama narxi hozir $0.15 (normal: $0.25)</p>
                  </div>
                  <div className="p-4 glass rounded-xl border border-red-500/30">
                    <h5 className="font-bold text-red-400 mb-2">⚡ Vaqt chegarasi</h5>
                    <p className="text-sm text-muted-foreground">Bayram oldi sezoni 3 hafta ichida tugaydi</p>
                  </div>
                </div>
      
                {/* Tavsiya */}
                <div className="p-5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/30">
                  <h4 className="font-bold text-amber-400 mb-3">💡 Timo AI Tavsiyasi</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    "<strong>Bugun 1000$ investitsiya qiling</strong>. 3 kun ichida 4200$ foyda oling. 
                    Maxsus 'Bayram Bonus' kampaniyasini ishga tushiring."
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400">Ishonchlilik: 92%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Sayt Modal */}
      {modalOpen === 'sayt' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass-strong rounded-2xl border border-border/50 max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-scale-in">
            <div className="p-6 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif font-bold flex items-center gap-2">
                  <MousePointer className="text-blue-500" size={24} />
                  Sayt Analitikasi
                </h3>
                <button 
                  onClick={() => setModalOpen(null)}
                  className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
                  
            <div className="p-6">
              <div className="grid gap-4">
                {websiteData.map((item, i) => (
                  <div key={i} className="p-4 glass rounded-xl border border-border/30 hover:border-blue-500/50 transition-all">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold">{item.metric}</h4>
                        <div className="text-2xl font-bold text-accent mt-1">{item.qiymat}{item.metric.includes('%') ? '' : ' ta'}</div>
                      </div>
                      <div className="text-right">
                        {item.conversion !== '-' && (
                          <div className="text-sm text-blue-400">Konversiya: {item.conversion}</div>
                        )}
                        <div className={`text-sm flex items-center gap-1 mt-1 ${item.trend.includes('↗️') ? 'text-green-400' : 'text-red-400'}`}>
                          {item.trend}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
                    
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/30">
                <h4 className="font-bold text-blue-400 mb-2">⚠️ Diqqat</h4>
                <p className="text-sm text-muted-foreground">
                  "Bron qilish" tugmasini bosganlardan 27% to'lov qilmay chiqib ketmoqda (Cart abandonment). 
                  <span className="text-accent font-semibold">Bayram oldi (15-20 Fevral) SEO optimizatsiyasi tavsiya etiladi.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
