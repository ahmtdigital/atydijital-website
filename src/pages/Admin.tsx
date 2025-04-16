
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";
import AdminNav from '@/components/admin/AdminNav';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff, X, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ServiceManager from '@/components/admin/ServiceManager';
import ProjectManagerNew from '@/components/admin/ProjectManagerNew';
import BlogManager from '@/components/admin/BlogManager';
import PageManager from '@/components/admin/PageManager';
import DatabaseManager from '@/components/admin/DatabaseManager';
import MarketingDashboard from '@/components/admin/MarketingDashboard';
import AnalyticsSettings from '@/components/admin/AnalyticsSettings';
import MediaManager from '@/components/admin/MediaManager';
import TeamManager from '@/components/admin/TeamManager';
import HeroSliderManager from '@/components/admin/HeroSliderManager';
import SiteSettingsManager from '@/components/admin/SiteSettingsManager';
import SeoManager from '@/components/admin/SeoManager';
import { useMySQLService } from '@/lib/mysql-service';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const mysqlService = useMySQLService();

  useEffect(() => {
    // URL parametrelerinden aktif sekmeyi kontrol et
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
    
    // Kullanıcı zaten giriş yapmış mı kontrol et (localStorage'dan)
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
    
    // Sayfa başlığını güncelle
    document.title = 'Yönetim Paneli | Ignite Pazarlama';
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // URL'yi sekme parametresiyle güncelle
    const newUrl = `${window.location.pathname}?tab=${value}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Demo giriş (gerçek bir uygulamada bu bir backend çağrısı olacaktır)
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        setIsLoggedIn(true);
        localStorage.setItem('adminLoggedIn', 'true');
        toast({
          title: "Başarıyla Giriş Yapıldı",
          description: "Hoş geldiniz, Admin!",
        });
        setLoginError('');
        
        // MySQL bağlantısını test et
        mysqlService.testConnection().then(isConnected => {
          if (isConnected) {
            console.log('MySQL bağlantısı başarılı');
          } else {
            console.log('MySQL bağlantısı kurulamadı');
          }
        });
      } else {
        setLoginError('Kullanıcı adı veya şifre hatalı');
        toast({
          title: "Giriş Başarısız",
          description: "Kullanıcı adı veya şifre hatalı",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    toast({
      title: "Çıkış Yapıldı",
      description: "Başarıyla çıkış yaptınız.",
    });
  };

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="min-h-screen pt-32 bg-dark">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <Card className="bg-dark-500 border-dark-400 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-ignite/5 via-transparent to-transparent" />
                <CardHeader className="bg-dark-600 border-b border-dark-400 relative">
                  <CardTitle className="text-2xl text-white">Yönetici Girişi</CardTitle>
                  <CardDescription className="text-white/60">
                    Web sitenizi yönetmek için giriş yapın
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 relative">
                  <form onSubmit={handleLogin} className="space-y-4">
                    {loginError && (
                      <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-400">
                        <AlertDescription>{loginError}</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Kullanıcı Adı</label>
                      <Input 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Kullanıcı adınızı girin"
                        className="bg-dark-400 border-dark-300 focus:border-ignite/50 focus:ring-1 focus:ring-ignite/30"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Şifre</label>
                      <div className="relative">
                        <Input 
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Şifrenizi girin"
                          className="bg-dark-400 border-dark-300 focus:border-ignite/50 focus:ring-1 focus:ring-ignite/30 pr-10"
                          required
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-ignite hover:bg-ignite-700 mt-6 relative overflow-hidden group" 
                      disabled={isLoading}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        initial={{ x: '-100%' }}
                        animate={isLoading ? { x: '100%' } : { x: '-100%' }}
                        transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
                      />
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Giriş Yapılıyor...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <LogIn className="mr-2 h-4 w-4" />
                          Giriş Yap
                        </div>
                      )}
                    </Button>
                    
                    <div className="text-center text-sm mt-4 p-4 bg-dark-600 rounded-lg border border-dark-400">
                      <p className="text-white/60 mb-2">Demo Giriş Bilgileri:</p>
                      <p className="text-white/80">Kullanıcı adı: <span className="text-ignite">admin</span></p>
                      <p className="text-white/80">Şifre: <span className="text-ignite">admin123</span></p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Admin Header */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-24 md:pt-16 pb-6 bg-dark-600 border-b border-dark-500"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-white flex items-center">
                <Database className="mr-3 h-6 w-6 text-ignite" />
                Yönetim Paneli
              </h1>
              <p className="text-white/60">Web sitenizi yönetin ve içerikleri güncelleyin</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                title="Çıkış Yap"
                className="border-dark-400 hover:bg-dark-500"
              >
                <X className="h-4 w-4 mr-2" />
                Çıkış Yap
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Admin Navigation */}
      <AdminNav activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Admin Content */}
      <section className="py-10 bg-dark min-h-screen">
        <div className="container mx-auto px-4">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 gap-6">
                <DatabaseManager />
              </div>
            </motion.div>
          )}
          
          {/* Marketing */}
          {activeTab === 'marketing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MarketingDashboard />
            </motion.div>
          )}
          
          {/* Services */}
          {activeTab === 'services' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ServiceManager />
            </motion.div>
          )}
          
          {/* Projects */}
          {activeTab === 'projects' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectManagerNew />
            </motion.div>
          )}
          
          {/* Blog */}
          {activeTab === 'blog' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BlogManager />
            </motion.div>
          )}
          
          {/* Hero Slider */}
          {activeTab === 'slider' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSliderManager />
            </motion.div>
          )}
          
          {/* Media */}
          {activeTab === 'media' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MediaManager />
            </motion.div>
          )}
          
          {/* Team */}
          {activeTab === 'team' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TeamManager />
            </motion.div>
          )}
          
          {/* Analytics */}
          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnalyticsSettings />
            </motion.div>
          )}
          
          {/* SEO */}
          {activeTab === 'seo' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SeoManager />
            </motion.div>
          )}
          
          {/* Pages */}
          {activeTab === 'pages' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PageManager />
            </motion.div>
          )}
          
          {/* Settings */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SiteSettingsManager />
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
