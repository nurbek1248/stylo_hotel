import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';
import { Mail, Lock, Chrome, Apple, Loader2, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Auth() {
  const { t } = useI18n();
  const { user, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: t('auth.error'), description: 'Please fill all fields', variant: 'destructive' });
      return;
    }
    login(email, 'email');
    toast({ title: t('auth.success') });
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    // For demo purposes, we use a specific email for admin check
    const demoEmail = provider === 'google' ? 'Nurbek1348@gmail.com' : 'user@example.com';
    login(demoEmail, provider);
    toast({ title: t('auth.success') });
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#05070a]">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 pt-32 pb-20 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />

        <div className="w-full max-w-md relative z-10">
          <div className="glass-strong rounded-3xl p-8 border border-white/10 shadow-2xl backdrop-blur-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif font-bold text-white mb-2">{t('auth.title')}</h1>
              <p className="text-muted-foreground text-sm">{t('auth.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground ml-1">{t('auth.email')}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-accent/50 transition-all"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground ml-1">{t('auth.password')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-accent/50 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 rounded-xl transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? t('auth.signIn') : t('auth.signUp'))}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0a0c10] px-2 text-muted-foreground">{t('auth.or')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl transition-all group"
              >
                <Chrome size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin('apple')}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl transition-all group"
              >
                <Apple size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Apple</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
                <span className="text-accent font-semibold">{isLogin ? t('auth.signUp') : t('auth.signIn')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
