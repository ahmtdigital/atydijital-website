import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";
import AdminNav from '@/components/admin/AdminNav';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff, X, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Component imports
import ServiceManager from '@/components/admin/ServiceManager';
import ProjectManagerNew from '@/components/admin/ProjectManagerNew';
import BlogManagerEnhanced from '@/components/admin/BlogManagerEnhanced';
import PageManager from '@/components/admin/PageManager';
import MarketingDashboard from '@/components/admin/MarketingDashboard';
import AnalyticsSettings from '@/components/admin/AnalyticsSettings';
import MediaManager from '@/components/admin/MediaManager';
import TeamManager from '@/components/admin/TeamManager';
import HeroSliderManager from '@/components/admin/HeroSliderManager';
import SiteSettingsManager from '@/components/admin/SiteSettingsManager';
import SeoManager from '@/components/admin/SeoManager';
import PageContentManager from '@/components/admin/PageContentManager';
import ServiceDetailFixedManager from '@/components/admin/ServiceDetailFixedManager';
import { useMySQLService } from '@/lib/mysql-service';
import BreadcrumbManager from '@/components/admin/BreadcrumbManager';
import MarketingToolsManager from '@/components/admin/MarketingToolsManager';
import ServiceDetailManager from '@/components/admin/ServiceDetailManager';
import NewsletterManager from '@/components/admin/NewsletterManager';
import DatabaseManager from '@/components/admin/DatabaseManager';

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const mysqlService = useMySQLService();

  // Update URL hash without causing page refresh
  const updateUrlHash = useCallback((tab: string) => {
    try {
      window.history.replaceState(
        {}, 
        '', 
        `${window.location.pathname}#admin#${tab}`
      );
    } catch (error) {
      console.error("Error updating URL hash:", error);
    }
  }, []);

  // Check login status on mount
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
    
    // Update page title
    document.title = 'Yönetim Paneli | ATY Dijital';
  }, []);

  // Parse the URL hash on initial load
  useEffect(() => {
    const parseInitialHash = () => {
      const hashParts = window.location.hash.split('#');
      if (hashParts.length >= 3 && hashParts[1] === 'admin') {
        const tabFromHash = hashParts[2];
        if (tabFromHash) {
          setActiveTab(tabFromHash);
        } else {
          // Set default tab if nothing specified after #admin#
          updateUrlHash('dashboard');
        }
      } else if (location.hash.startsWith('#')) {
        // Handle legacy hash format
        const tab = location.hash.replace('#', '');
        if (tab) {
          setActiveTab(tab);
          updateUrlHash(tab);
        } else {
          updateUrlHash('dashboard');
        }
      } else {
        // No hash at all, set default
        updateUrlHash('dashboard');
      }
    };

    if (isLoggedIn) {
      parseInitialHash();
    }
  }, [location.hash, isLoggedIn, updateUrlHash]);

  // Update hash when tab changes without causing a full reload
  useEffect(() => {
    if (isLoggedIn && activeTab) {
      updateUrlHash(activeTab);
    }
  }, [activeTab, isLoggedIn, updateUrlHash]);

  const handleTabChange = (value: string) => {
    if (value === activeTab) return; // Prevent unnecessary state updates
    
    setActiveTab(value);
    
    // Reset scroll position when changing tabs
    window.scrollTo(0, 0);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Demo login 
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        setIsLoggedIn(true);
        localStorage.setItem('adminLoggedIn', 'true');
        toast({
          title: "Başarıyla Giriş Yapıldı",
          description: "Hoş geldiniz, Admin!",
        });
        setLoginError('');
        
        // Set the default hash if none exists
        updateUrlHash('dashboard');
      } else {
        setLoginError('Kullanıcı adı veya şifre hatalı');
        toast({
          title: "Giriş Başarısız",
          description: "Kullanıcı adı veya şifre hatalı",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    toast({
      title: "Çıkış Yapıldı",
      description: "Başarıyla çıkış yaptınız.",
    });
    navigate('/admin', { replace: true });
  };

  // Show login form if not logged in
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
              <Card className="bg-dark-500 border-dark-400 overflow-hidden relative animated-border shine">
                <div className="absolute inset-0 bg-gradient-to-br from-ignite/10 via-transparent to-transparent" />
                <CardHeader className="bg-dark-600 border-b border-dark-400 relative">
                  <CardTitle className="text-2xl text-white">ATY Dijital Yönetici Girişi</CardTitle>
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
                        className="bg-dark-400 border-dark-300 focus:border-ignite/50 focus:ring-1 focus:ring-ignite/30 text-white"
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
                          className="bg-dark-400 border-dark-300 focus:border-ignite/50 focus:ring-1 focus:ring-ignite/30 pr-10 text-white"
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
                      variant="modern"
                      className="w-full relative overflow-hidden group shadow-lg" 
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

  // Define a function to render the appropriate content based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-6">
              <MarketingDashboard />
            </div>
          </motion.div>
        );
      case 'marketing':
        
        return (
          <motion.div
            key="marketing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <MarketingDashboard />
            <MarketingToolsManager />
            <NewsletterManager />
          </motion.div>
        );
      case 'services':
        
        return (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <ServiceManager />
            <ServiceDetailManager />
            <ServiceDetailFixedManager />
          </motion.div>
        );
      case 'projects':
        
        return (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectManagerNew />
          </motion.div>
        );
      case 'blog':
        
        return (
          <motion.div
            key="blog"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BlogManagerEnhanced />
          </motion.div>
        );
      case 'slider':
        
        return (
          <motion.div
            key="slider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSliderManager />
          </motion.div>
        );
      case 'media':
        
        return (
          <motion.div
            key="media"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MediaManager />
          </motion.div>
        );
      case 'team':
        
        return (
          <motion.div
            key="team"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TeamManager />
          </motion.div>
        );
      case 'analytics':
        
        return (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnalyticsSettings />
          </motion.div>
        );
      case 'seo':
        
        return (
          <motion.div
            key="seo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SeoManager />
          </motion.div>
        );
      case 'pages':
        
        return (
          <motion.div
            key="pages"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <PageManager />
            <PageContentManager />
            <div className="mt-8">
              <BreadcrumbManager />
            </div>
          </motion.div>
        );
      case 'settings':
        
        return (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <SiteSettingsManager />
          </motion.div>
        );
      case 'database':
        
        return (
          <motion.div
            key="database"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DatabaseManager />
          </motion.div>
        );
      case 'appearance':
        
        return (
          <motion.div
            key="appearance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              <Card className="bg-dark-500 border-dark-400">
                <CardHeader>
                  <CardTitle className="text-white">Görünüm Ayarları</CardTitle>
                  <CardDescription className="text-white/60">
                    Site renklerini ve görsel temalarını buradan düzenleyin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">Görünüm ayarlarını düzenlemek için Site Ayarları bölümünde "Renkler" sekmesine geçiş yapabilirsiniz.</p>
                  <div className="mt-4">
                    <Button 
                      variant="ignite"
                      onClick={() => handleTabChange('settings')}
                    >
                      Site Ayarlarına Git
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );
      default:
        
        return (
          <motion.div
            key="default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <Card className="bg-dark-500 border-dark-400">
              <CardHeader>
                <CardTitle className="text-white">Sekme Bulunamadı</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">İstenen sekme bulunamadı. Lütfen başka bir sekme seçin.</p>
                <Button 
                  variant="ignite"
                  onClick={() => handleTabChange('dashboard')}
                >
                  Gösterge Paneline Git
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );
    }
  };

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
                ATY Dijital Yönetim Paneli
              </h1>
              <p className="text-white/60">Web sitenizi yönetin ve içerikleri güncelleyin</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="professional" 
                onClick={handleLogout} 
                title="Çıkış Yap"
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
      <section className="py-10 bg-dark min-h-screen text-white">
        <div className="container mx-auto px-4">
          {/* Render the active tab's content */}
          {renderTabContent()}
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
