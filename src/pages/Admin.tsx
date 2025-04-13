
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import MarketingDashboard from '@/components/admin/MarketingDashboard';
import AnalyticsSettings from '@/components/admin/AnalyticsSettings';
import MediaManager from '@/components/admin/MediaManager';
import TeamManager from '@/components/admin/TeamManager';
import HeroSliderManager from '@/components/admin/HeroSliderManager';
import SiteSettingsManager from '@/components/admin/SiteSettingsManager';
import ProjectManager from '@/components/admin/ProjectManager';
import SeoManager from '@/components/admin/SeoManager';
import { 
  BarChart3, 
  ListTodo, 
  Settings, 
  User, 
  PenTool, 
  Briefcase,
  FileEdit,
  Save,
  Trash2,
  Plus,
  LineChart,
  LayoutDashboard,
  LogIn,
  Check,
  Eye,
  EyeOff,
  Upload,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Code,
  X,
  ImageIcon,
  Search,
  Tag,
  Calendar,
  Clock,
  Link,
  Edit,
  AlertCircle,
  Pencil,
  UserPlus,
  Send,
  Filter,
  BookOpen,
  Mail,
  FileText,
  Layers,
  Database
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AdminNav from '@/components/admin/AdminNav';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { useDatabaseConnection } from '@/lib/db';
import { Badge } from "@/components/ui/badge";

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
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { config: dbConfig, testConnection, saveConfig, disconnect, isLoading: dbLoading, error: dbError } = useDatabaseConnection();

  useEffect(() => {
    // Check URL parameters for active tab
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
    
    // Check if user is already logged in (from localStorage)
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
    
    // Update page title
    document.title = 'Yönetim Paneli | Ignite Pazarlama';
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL with tab parameter
    const newUrl = `${window.location.pathname}?tab=${value}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple demo login (in a real app, this would be a backend call)
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        setIsLoggedIn(true);
        localStorage.setItem('adminLoggedIn', 'true');
        toast({
          title: "Başarıyla Giriş Yapıldı",
          description: "Hoş geldiniz, Admin!",
        });
        setLoginError('');
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
              <Card className="bg-dark-500 border-dark-400">
                <CardHeader>
                  <CardTitle className="text-2xl">Yönetici Girişi</CardTitle>
                  <CardDescription>Yönetim paneline erişmek için giriş yapın</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    {loginError && (
                      <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-400">
                        <AlertDescription>{loginError}</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Kullanıcı Adı</label>
                      <Input 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Kullanıcı adınızı girin"
                        className="bg-dark-400 border-dark-300"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Şifre</label>
                      <div className="relative">
                        <Input 
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Şifrenizi girin"
                          className="bg-dark-400 border-dark-300 pr-10"
                          required
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-ignite hover:bg-ignite-700 mt-6" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Giriş Yapılıyor...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <LogIn className="mr-2 h-4 w-4" />
                          Giriş Yap
                        </div>
                      )}
                    </Button>
                    
                    <div className="text-center text-sm mt-4 text-gray-400">
                      <p>Demo Giriş:</p>
                      <p>Kullanıcı adı: admin</p>
                      <p>Şifre: admin123</p>
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
        className="pt-10 pb-6 bg-dark-600"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Yönetim Paneli</h1>
              <p className="text-gray-400">Web sitenizi yönetin ve içerikleri güncelleyin</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-dark-500 p-2 rounded-lg">
                <div className="bg-ignite/20 p-2 rounded-full">
                  <User className="h-5 w-5 text-ignite" />
                </div>
                <span>Admin</span>
              </div>
              <Button variant="outline" size="icon" onClick={handleLogout} title="Çıkış Yap">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Admin Navigation */}
      <AdminNav activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Admin Content */}
      <section className="py-10 bg-dark">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-8">
              {/* Analytics Settings Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  variant="outline"
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className="mb-4 flex items-center gap-2 bg-dark-400 hover:bg-dark-300 border-dark-300"
                >
                  <Code className="h-4 w-4" />
                  Analitik Ayarları
                  {showAnalytics ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                
                <AnimatePresence>
                  {showAnalytics && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-8"
                    >
                      <AnalyticsSettings />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <Card className="bg-dark-500 border-dark-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Toplam Ziyaretçi</CardTitle>
                    <CardDescription>Son 30 gün</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-ignite">15,842</div>
                    <p className="text-sm text-green-500 flex items-center mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                        <path d="m18 15-6-6-6 6"/>
                      </svg>
                      24% artış
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-dark-500 border-dark-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Ortalama Oturum Süresi</CardTitle>
                    <CardDescription>Son 30 gün</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-ignite">3:42</div>
                    <p className="text-sm text-green-500 flex items-center mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                        <path d="m18 15-6-6-6 6"/>
                      </svg>
                      12% artış
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-dark-500 border-dark-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Form Gönderimi</CardTitle>
                    <CardDescription>Son 30 gün</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-ignite">87</div>
                    <p className="text-sm text-green-500 flex items-center mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                        <path d="m18 15-6-6-6 6"/>
                      </svg>
                      18% artış
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <Card className="bg-dark-500 border-dark-400">
                  <CardHeader>
                    <CardTitle>Son Etkinlikler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 pb-4 border-b border-dark-400">
                        <div className="bg-ignite/10 p-2 rounded-full">
                          <FileEdit className="h-5 w-5 text-ignite" />
                        </div>
                        <div>
                          <p className="font-medium">"E-Ticaret Marka Yenileme" projesi güncellendi</p>
                          <p className="text-sm text-gray-400">2 saat önce</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 pb-4 border-b border-dark-400">
                        <div className="bg-ignite/10 p-2 rounded-full">
                          <Plus className="h-5 w-5 text-ignite" />
                        </div>
                        <div>
                          <p className="font-medium">Yeni blog yazısı eklendi</p>
                          <p className="text-sm text-gray-400">Dün</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 pb-4 border-b border-dark-400">
                        <div className="bg-ignite/10 p-2 rounded-full">
                          <User className="h-5 w-5 text-ignite" />
                        </div>
                        <div>
                          <p className="font-medium">Yeni iletişim formu gönderildi</p>
                          <p className="text-sm text-gray-400">2 gün önce</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-dark-500 border-dark-400">
                  <CardHeader>
                    <CardTitle>Hızlı İstatistikler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Toplam Sayfa Görüntüleme</span>
                          <span className="font-medium">48,325</span>
                        </div>
                        <div className="w-full bg-dark-400 h-2 rounded-full">
                          <div className="bg-ignite h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>En Çok Ziyaret Edilen Sayfalar</span>
                          <span className="font-medium">Ana Sayfa</span>
                        </div>
                        <div className="w-full bg-dark-400 h-2 rounded-full">
                          <div className="bg-ignite h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Dönüşüm Oranı</span>
                          <span className="font-medium">3.8%</span>
                        </div>
                        <div className="w-full bg-dark-400 h-2 rounded-full">
                          <div className="bg-ignite h-2 rounded-full" style={{ width: '38%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Mobil Ziyaretçiler</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <div className="w-full bg-dark-400 h-2 rounded-full">
                          <div className="bg-ignite h-2 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Database Connection Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="bg-dark-500 border-dark-400">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          <Database className="mr-2 h-5 w-5 text-ignite" />
                          Veritabanı Bağlantısı
                        </CardTitle>
                        <CardDescription>Veri yönetimi ve API entegrasyonu için veritabanı bağlantınızı yapılandırın</CardDescription>
                      </div>
                      <div className="flex items-center">
                        {dbConfig.isConnected ? (
                          <Badge className="bg-green-600 text-white">Bağlı</Badge>
                        ) : (
                          <Badge variant="outline" className="border-orange-500 text-orange-500">Bağlı Değil</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">API URL</label>
                      <Input 
                        value={dbConfig.apiUrl}
                        onChange={(e) => saveConfig({ apiUrl: e.target.value })}
                        placeholder="https://api.example.com/v1"
                        className="bg-dark-400 border-dark-300"
                        disabled={dbConfig.isConnected}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">API Anahtarı</label>
                      <Input 
                        type="password"
                        value={dbConfig.apiKey}
                        onChange={(e) => saveConfig({ apiKey: e.target.value })}
                        placeholder="API anahtarınızı girin"
                        className="bg-dark-400 border-dark-300"
                        disabled={dbConfig.isConnected}
                      />
                    </div>
                    
                    {dbError && (
                      <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-400">
                        <AlertDescription>{dbError}</AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="bg-dark-600 p-4 rounded-md border border-dark-300">
                      <p className="text-sm">
                        <span className="font-medium">Not:</span> Bu demo sürümünde, veritabanı bağlantısı simüle edilmektedir. Gerçek uygulamada, bu bölüm API hizmetleri ile entegre edilecektir.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {dbConfig.isConnected ? (
                      <Button 
                        variant="destructive" 
                        onClick={disconnect}
                        disabled={dbLoading}
                        className="w-full sm:w-auto ml-auto"
                      >
                        {dbLoading ? 'İşlem Yapılıyor...' : 'Bağlantıyı Kes'}
                      </Button>
                    ) : (
                      <Button 
                        className="bg-ignite hover:bg-ignite-700 w-full sm:w-auto ml-auto"
                        onClick={testConnection}
                        disabled={dbLoading || !dbConfig.apiKey}
                      >
                        {dbLoading ? 'Bağlanıyor...' : 'Bağlantıyı Test Et'}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Marketing Dashboard Tab */}
            <TabsContent value="marketing" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MarketingDashboard />
              </motion.div>
            </TabsContent>
            
            {/* Services Tab */}
            <TabsContent value="services" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Hizmetleri Yönet</h2>
                  <Button className="bg-ignite hover:bg-ignite-700">
                    <Plus className="h-4 w-4 mr-2" /> Yeni Hizmet Ekle
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-6 mt-6">
                  {/* Service management UI */}
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProjectManager />
              </motion.div>
            </TabsContent>
            
            {/* Hero Slider Tab */}
            <TabsContent value="slider" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HeroSliderManager />
              </motion.div>
            </TabsContent>
            
            {/* Blog Tab */}
            <TabsContent value="blog" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Blog Yazılarını Yönet</h2>
                  <Button className="bg-ignite hover:bg-ignite-700">
                    <Plus className="h-4 w-4 mr-2" /> Yeni Blog Yazısı
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-6 mt-6">
                  {/* Blog management UI */}
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Media Tab */}
            <TabsContent value="media" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MediaManager />
              </motion.div>
            </TabsContent>
            
            {/* Team Tab */}
            <TabsContent value="team" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TeamManager />
              </motion.div>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AnalyticsSettings />
              </motion.div>
            </TabsContent>
            
            {/* SEO Tab - New */}
            <TabsContent value="seo" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SeoManager />
              </motion.div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SiteSettingsManager />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
