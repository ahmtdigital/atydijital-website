
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from '@/components/admin/GeneralSettings';
import { Download, Settings, PaintBucket, FileText, Mail, Globe, Share2, MessageSquare, Database, Server } from 'lucide-react';
import SiteColorsManager from './SiteColorsManager';
import ContentSectionsManager from './ContentSectionsManager';
import SectionContentManager from './SectionContentManager';
import SmtpSettings from './SmtpSettings';
import SocialMediaSettings from './SocialMediaSettings';
import SeoSettingsPanel from './SeoSettingsPanel';
import LiveChatSettings from './LiveChatSettings';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const SiteSettingsManager = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // Update URL with hash to remember section on page reload
    // Using hash to avoid triggering page refresh
    try {
      window.history.replaceState(
        {}, 
        '', 
        `${window.location.pathname}${window.location.search}#${value}`
      );
    } catch (error) {
      console.error("Error updating URL hash:", error);
    }
  };

  // Check URL hash on load - using a more stable approach
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const hashValue = window.location.hash.replace('#', '');
        if (['general', 'colors', 'content', 'email', 'social', 'seo', 'chat', 'database', 'api'].includes(hashValue)) {
          setActiveTab(hashValue);
        }
      }
    };

    // Initial check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleBackupSettings = () => {
    // Prevent multiple clicks
    if (isExporting) return;
    
    setIsExporting(true);
    
    // Generate settings data as JSON
    const settings = {
      general: { /* Site general settings */ },
      colors: { /* Site color settings */ },
      content: { /* Site content settings */ },
      email: { /* Email settings */ },
      // Add timestamp
      timestamp: new Date().toISOString()
    };

    // Convert to JSON and create download link
    setTimeout(() => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `site-settings-backup-${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      toast({
        title: "Yedekleme Başarılı",
        description: "Site ayarları başarıyla indirildi.",
      });
      
      setIsExporting(false);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center text-white">
            <Settings className="mr-2 h-6 w-6 text-ignite" />
            Site Ayarları
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Sitenizin görünümünü ve içeriğini buradan özelleştirebilirsiniz
          </p>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a 
            href="#" 
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-dark-600 border border-dark-400 text-white hover:bg-dark-500 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handleBackupSettings();
            }}
          >
            <Download className={`h-4 w-4 ${isExporting ? 'animate-spin' : ''}`} />
            {isExporting ? 'Yedekleniyor...' : 'Ayarları Yedekle'}
          </a>
        </motion.div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="bg-dark-600 mb-4 w-full overflow-x-auto flex-wrap">
          <TabsTrigger value="general" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <Settings className="h-4 w-4" />
            Genel Ayarlar
          </TabsTrigger>
          <TabsTrigger value="colors" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <PaintBucket className="h-4 w-4" />
            Renkler
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            Bölüm İçerikleri
          </TabsTrigger>
          <TabsTrigger value="email" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <Mail className="h-4 w-4" />
            E-posta Ayarları
          </TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <Share2 className="h-4 w-4" />
            Sosyal Medya
            <Badge className="ml-1 bg-ignite-700 text-white text-[10px] px-1 py-0">Yeni</Badge>
          </TabsTrigger>
          <TabsTrigger value="seo" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <Globe className="h-4 w-4" />
            SEO Ayarları
            <Badge className="ml-1 bg-ignite-700 text-white text-[10px] px-1 py-0">Yeni</Badge>
          </TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" />
            Canlı Destek
            <Badge className="ml-1 bg-ignite-700 text-white text-[10px] px-1 py-0">Yeni</Badge>
          </TabsTrigger>
          <TabsTrigger value="database" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <Database className="h-4 w-4" />
            Veritabanı
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
            <Server className="h-4 w-4" />
            API Ayarları
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader className="border-b border-dark-400">
              <CardTitle className="text-white">Genel Site Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <GeneralSettings />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="colors" className="mt-6">
          <SiteColorsManager />
        </TabsContent>
        
        <TabsContent value="content" className="mt-6">
          <ContentSectionsManager />
          <div className="mt-6">
            <SectionContentManager />
          </div>
        </TabsContent>
        
        <TabsContent value="email" className="mt-6">
          <SmtpSettings />
        </TabsContent>
        
        <TabsContent value="social" className="mt-6">
          <SocialMediaSettings />
        </TabsContent>
        
        <TabsContent value="seo" className="mt-6">
          <SeoSettingsPanel />
        </TabsContent>
        
        <TabsContent value="chat" className="mt-6">
          <LiveChatSettings />
        </TabsContent>
        
        <TabsContent value="database" className="mt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="text-ignite h-5 w-5" />
                Veritabanı Yönetimi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-dark-600 border-dark-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <Database className="h-4 w-4 text-ignite" />
                        MySQL Bağlantısı
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-dark-700 p-3 rounded-md border border-dark-400">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span className="text-white/80 text-sm">Bağlantı Aktif</span>
                            </div>
                            <Badge className="bg-green-800 text-white text-xs">Çevrimiçi</Badge>
                          </div>
                          <div className="mt-2 pt-2 border-t border-dark-400">
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <span className="text-white/60">Sunucu:</span>
                              <span className="text-white/90">example-server.com</span>
                              <span className="text-white/60">Veritabanı:</span>
                              <span className="text-white/90">atydijital_db</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-xs py-1 px-3 bg-ignite hover:bg-ignite-700 text-white rounded-md">Bağlantıyı Yönet</button>
                          <button className="text-xs py-1 px-3 bg-dark-400 hover:bg-dark-300 text-white rounded-md">Tabloları Görüntüle</button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-dark-600 border-dark-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <Server className="h-4 w-4 text-ignite" />
                        Veritabanı Yedekleme
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center text-sm mb-1">
                            <span className="text-white/80">Son yedekleme</span>
                            <span className="text-white/60">2 saat önce</span>
                          </div>
                          <div className="w-full h-2 bg-dark-400 rounded-full overflow-hidden">
                            <div className="h-full bg-ignite w-3/4"></div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-xs py-1 px-3 bg-ignite hover:bg-ignite-700 text-white rounded-md flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            Şimdi Yedekle
                          </button>
                          <button className="text-xs py-1 px-3 bg-dark-400 hover:bg-dark-300 text-white rounded-md">Otomatik Yedekleme</button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="bg-dark-600 border-dark-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white">Son Veritabanı İşlemleri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex justify-between items-center p-2 bg-dark-500 rounded-md border border-dark-400">
                          <div className="flex items-center gap-2">
                            <div className="bg-ignite/20 p-1.5 rounded-md">
                              <FileText className="h-4 w-4 text-ignite" />
                            </div>
                            <div>
                              <p className="text-white/90 text-sm">Tablo {item} güncellendi</p>
                              <p className="text-white/50 text-xs">2 saat önce</p>
                            </div>
                          </div>
                          <button className="text-xs py-1 px-2 bg-dark-400 hover:bg-dark-300 text-white rounded-md">Görüntüle</button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="mt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Server className="text-ignite h-5 w-5" />
                API Ayarları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-dark-600 border-dark-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">API Erişim Anahtarları</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-dark-700 p-3 rounded-md border border-dark-400">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span className="text-white/80 text-sm">Canlı API Anahtarı</span>
                            </div>
                          </div>
                          <div className="mt-2 pt-2 border-t border-dark-400">
                            <div className="flex items-center gap-2 bg-dark-800 p-2 rounded-md text-sm">
                              <code className="text-white/80">••••••••••••••••••••••••</code>
                              <button className="text-xs py-0.5 px-2 bg-dark-500 hover:bg-dark-400 text-white/70 rounded-md">
                                Göster
                              </button>
                            </div>
                          </div>
                        </div>
                        <button className="text-xs py-1 px-3 bg-ignite hover:bg-ignite-700 text-white rounded-md">
                          Anahtarları Yönet
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-dark-600 border-dark-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">API İzinleri</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          {['Kullanıcı Verileri', 'İçerik', 'Medya'].map((item) => (
                            <div key={item} className="flex justify-between items-center bg-dark-700 p-2 rounded-md">
                              <span className="text-white/80 text-sm">{item}</span>
                              <div>
                                <input type="checkbox" className="rounded bg-dark-800 border-dark-400 text-ignite focus:ring-ignite/30" defaultChecked />
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="text-xs py-1 px-3 bg-dark-400 hover:bg-dark-300 text-white rounded-md">
                          İzinleri Güncelle
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Collapsible className="bg-dark-600 rounded-lg border border-dark-300 overflow-hidden">
                  <CollapsibleTrigger className="flex justify-between items-center w-full p-4 hover:bg-dark-500">
                    <span className="text-white font-medium">API Kullanım İstatistikleri</span>
                    <span className="text-ignite">+</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 border-t border-dark-400">
                    <div className="space-y-4">
                      <div className="aspect-w-16 aspect-h-8">
                        <AspectRatio ratio={16/8}>
                          <div className="bg-dark-700 rounded-md w-full h-full flex items-center justify-center">
                            <div className="text-white/40 flex flex-col items-center gap-2">
                              <BarChart4 className="h-8 w-8" />
                              <span>API Kullanım Grafiği</span>
                            </div>
                          </div>
                        </AspectRatio>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        {['Toplam İstek', 'Başarılı', 'Başarısız'].map((stat, index) => (
                          <div key={stat} className="bg-dark-700 p-3 rounded-md text-center">
                            <p className="text-white/60 text-xs">{stat}</p>
                            <p className={`text-lg font-semibold ${
                              index === 0 ? 'text-white' :
                              index === 1 ? 'text-green-500' : 
                              'text-red-500'
                            }`}>
                              {index === 0 ? '5,234' : 
                               index === 1 ? '4,987' : '247'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SiteSettingsManager;
