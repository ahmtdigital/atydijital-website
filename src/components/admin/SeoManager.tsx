
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Globe, 
  Search, 
  FileText, 
  Tag, 
  Share2, 
  List, 
  BarChart4, 
  Settings, 
  Code, 
  FileJson, 
  AlertCircle 
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const SeoManager = () => {
  const [activeTab, setActiveTab] = useState('page-seo');
  const [sitemapGenerated, setSitemapGenerated] = useState(false);
  const [metaTags, setMetaTags] = useState<Record<string, string>>({
    title: '',
    description: '',
    keywords: ''
  });
  const [ogTags, setOgTags] = useState<Record<string, string>>({
    title: '',
    description: '',
    image: ''
  });
  const [selectedPage, setSelectedPage] = useState('home');
  const [isLoading, setIsLoading] = useState(false);

  const pages = [
    { id: 'home', name: 'Ana Sayfa', slug: '/' },
    { id: 'services', name: 'Hizmetler', slug: '/services' },
    { id: 'portfolio', name: 'Portfolyo', slug: '/portfolio' },
    { id: 'about', name: 'Hakkımızda', slug: '/about' },
    { id: 'blog', name: 'Blog', slug: '/blog' },
    { id: 'contact', name: 'İletişim', slug: '/contact' }
  ];

  const handlePageSelect = (pageId: string) => {
    setSelectedPage(pageId);
    // Simulate loading SEO data for the selected page
    setIsLoading(true);
    setTimeout(() => {
      const pageData = {
        home: {
          metaTags: {
            title: 'Ignite Marketing | Dijital Pazarlama Ajansı',
            description: 'Markanızı dijital dünyada parlatacak stratejiler ve çözümler sunan pazarlama ajansı.',
            keywords: 'dijital pazarlama, SEO, sosyal medya, web tasarım, içerik üretimi'
          },
          ogTags: {
            title: 'Ignite Marketing | Dijital Pazarlama Ajansı',
            description: 'Markanızı dijital dünyada parlatacak stratejiler ve çözümler sunan pazarlama ajansı.',
            image: 'https://ignitepazarlama.com/images/og-image.jpg'
          }
        },
        services: {
          metaTags: {
            title: 'Hizmetlerimiz | Ignite Marketing',
            description: 'Dijital pazarlama, SEO, sosyal medya ve web geliştirme hizmetlerimiz ile işinizi büyütün.',
            keywords: 'dijital pazarlama hizmetleri, SEO hizmetleri, sosyal medya yönetimi, web tasarım, içerik üretimi'
          },
          ogTags: {
            title: 'Hizmetlerimiz | Ignite Marketing',
            description: 'Dijital pazarlama, SEO, sosyal medya ve web geliştirme hizmetlerimiz ile işinizi büyütün.',
            image: 'https://ignitepazarlama.com/images/services-og.jpg'
          }
        }
      };
      
      // Default data for pages that aren't specifically defined
      const defaultData = {
        metaTags: {
          title: `${pages.find(p => p.id === pageId)?.name || pageId} | Ignite Marketing`,
          description: 'Ignite Marketing ile dijital dünyada varlığınızı güçlendirin.',
          keywords: 'dijital pazarlama, SEO, sosyal medya, web tasarım'
        },
        ogTags: {
          title: `${pages.find(p => p.id === pageId)?.name || pageId} | Ignite Marketing`,
          description: 'Ignite Marketing ile dijital dünyada varlığınızı güçlendirin.',
          image: 'https://ignitepazarlama.com/images/default-og.jpg'
        }
      };
      
      const data = pageData[pageId as keyof typeof pageData] || defaultData;
      setMetaTags(data.metaTags);
      setOgTags(data.ogTags);
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    handlePageSelect('home');
  }, []);

  const handleSaveSeoSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "SEO Ayarları Kaydedildi",
        description: `${pages.find(p => p.id === selectedPage)?.name} sayfası için SEO ayarları güncellendi.`,
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleGenerateSitemap = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSitemapGenerated(true);
      toast({
        title: "Sitemap Oluşturuldu",
        description: "sitemap.xml başarıyla oluşturuldu ve web sitenizin kök dizinine yerleştirildi.",
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmitToSearchConsole = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Google Search Console'a Gönderildi",
        description: "Sitemap.xml dosyanız başarıyla Google Search Console'a gönderildi.",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">SEO Yönetimi</h2>
        <Button 
          onClick={handleSaveSeoSettings}
          className="bg-ignite hover:bg-ignite-700"
          disabled={isLoading}
        >
          {isLoading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-dark-400 w-full justify-start overflow-auto">
          <TabsTrigger value="page-seo" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Sayfa SEO</span>
          </TabsTrigger>
          <TabsTrigger value="technical-seo" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>Teknik SEO</span>
          </TabsTrigger>
          <TabsTrigger value="social-seo" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>Sosyal Medya</span>
          </TabsTrigger>
          <TabsTrigger value="google" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Google Entegrasyonu</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart4 className="h-4 w-4" />
            <span>SEO Analizi</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Page SEO Tab */}
        <TabsContent value="page-seo" className="space-y-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-ignite" />
                Sayfa SEO Ayarları
              </CardTitle>
              <CardDescription>
                Her sayfa için meta etiketlerini ve SEO ayarlarını yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Sayfa Seçin</Label>
                <Select value={selectedPage} onValueChange={handlePageSelect}>
                  <SelectTrigger className="bg-dark-400 border-dark-300">
                    <SelectValue placeholder="Sayfa seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-400 border-dark-300">
                    {pages.map(page => (
                      <SelectItem key={page.id} value={page.id} className="hover:bg-dark-500">
                        {page.name} ({page.slug})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {isLoading ? (
                <div className="py-10 flex justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-ignite border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Meta Etiketleri</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="meta-title">Başlık (Title)</Label>
                      <Input 
                        id="meta-title"
                        value={metaTags.title}
                        onChange={(e) => setMetaTags({...metaTags, title: e.target.value})}
                        placeholder="Sayfa başlığı"
                        className="bg-dark-400 border-dark-300"
                      />
                      <p className="text-xs text-gray-400">Önerilen uzunluk: 50-60 karakter</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="meta-description">Açıklama (Description)</Label>
                      <Textarea 
                        id="meta-description"
                        value={metaTags.description}
                        onChange={(e) => setMetaTags({...metaTags, description: e.target.value})}
                        placeholder="Sayfa açıklaması"
                        className="bg-dark-400 border-dark-300 min-h-20"
                      />
                      <p className="text-xs text-gray-400">Önerilen uzunluk: 150-160 karakter</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="meta-keywords">Anahtar Kelimeler (Keywords)</Label>
                      <Textarea 
                        id="meta-keywords"
                        value={metaTags.keywords}
                        onChange={(e) => setMetaTags({...metaTags, keywords: e.target.value})}
                        placeholder="Anahtar kelimeler (virgülle ayrılmış)"
                        className="bg-dark-400 border-dark-300"
                      />
                      <p className="text-xs text-gray-400">Anahtar kelimeleri virgülle ayırın</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-4">
                    <h3 className="text-lg font-medium">Önizleme</h3>
                    <div className="bg-dark-600 p-4 rounded-md border border-dark-300">
                      <div className="text-blue-400 text-lg font-medium line-clamp-1">{metaTags.title || 'Sayfa Başlığı'}</div>
                      <div className="text-green-400 text-sm line-clamp-1">{pages.find(p => p.id === selectedPage)?.slug || '/'}</div>
                      <div className="text-gray-300 text-sm mt-1 line-clamp-2">{metaTags.description || 'Sayfa açıklaması burada görünecek...'}</div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Technical SEO Tab */}
        <TabsContent value="technical-seo" className="space-y-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-ignite" />
                Teknik SEO
              </CardTitle>
              <CardDescription>
                Sitemap, robots.txt ve yapısal veri gibi teknik SEO ayarlarını yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <FileJson className="h-4 w-4 text-ignite" />
                  Sitemap Oluşturucu
                </h3>
                
                <div className="flex items-center justify-between p-4 bg-dark-600 rounded-md border border-dark-300">
                  <div>
                    <p className="font-medium">XML Sitemap</p>
                    <p className="text-sm text-gray-400">Web sitenizin arama motorlarına taranmak üzere sayfalarını bildirmek için XML sitemap oluşturun.</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-ignite text-ignite hover:bg-ignite hover:text-white"
                    onClick={handleGenerateSitemap}
                    disabled={isLoading}
                  >
                    {isLoading ? 'İşleniyor...' : 'Sitemap Oluştur'}
                  </Button>
                </div>
                
                {sitemapGenerated && (
                  <Alert className="bg-green-900/20 border-green-900/50">
                    <AlertDescription className="flex justify-between items-center">
                      <span>
                        sitemap.xml başarıyla oluşturuldu: <span className="text-green-400">https://ignitepazarlama.com/sitemap.xml</span>
                      </span>
                      <Button 
                        variant="ghost" 
                        className="h-8 px-2 text-green-400 hover:text-green-300 hover:bg-green-900/30"
                        onClick={() => window.open('/sitemap.xml', '_blank')}
                      >
                        Görüntüle
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <List className="h-4 w-4 text-ignite" />
                    Robots.txt
                  </h3>
                  
                  <Textarea 
                    className="bg-dark-400 border-dark-300 font-mono min-h-32"
                    value={`User-agent: *
Allow: /
Disallow: /admin
Disallow: /private

# Sitemap
Sitemap: https://ignitepazarlama.com/sitemap.xml`}
                  />
                </div>
                
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Code className="h-4 w-4 text-ignite" />
                    Schema.org Yapısal Veriler
                  </h3>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="schema-org" defaultChecked />
                    <Label htmlFor="schema-org">Organization Schema.org verilerini ekle</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="schema-breadcrumbs" defaultChecked />
                    <Label htmlFor="schema-breadcrumbs">Breadcrumbs Schema.org verilerini ekle</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="schema-faq" />
                    <Label htmlFor="schema-faq">FAQ Schema.org verilerini ekle</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Social SEO Tab */}
        <TabsContent value="social-seo" className="space-y-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-ignite" />
                Sosyal Medya Paylaşımları
              </CardTitle>
              <CardDescription>
                Sosyal medya platformlarında paylaşıldığında içeriğinizin nasıl görüneceğini yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="py-10 flex justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-ignite border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Open Graph Etiketleri</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="og-title">OG Başlık</Label>
                      <Input 
                        id="og-title"
                        value={ogTags.title}
                        onChange={(e) => setOgTags({...ogTags, title: e.target.value})}
                        placeholder="Open Graph başlığı"
                        className="bg-dark-400 border-dark-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="og-description">OG Açıklama</Label>
                      <Textarea 
                        id="og-description"
                        value={ogTags.description}
                        onChange={(e) => setOgTags({...ogTags, description: e.target.value})}
                        placeholder="Open Graph açıklaması"
                        className="bg-dark-400 border-dark-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="og-image">OG Görsel URL</Label>
                      <Input 
                        id="og-image"
                        value={ogTags.image}
                        onChange={(e) => setOgTags({...ogTags, image: e.target.value})}
                        placeholder="https://example.com/image.jpg"
                        className="bg-dark-400 border-dark-300"
                      />
                    </div>
                    
                    <div className="pt-4 space-y-4">
                      <h3 className="text-lg font-medium">Sosyal Medya Önizleme</h3>
                      <div className="bg-dark-600 p-4 rounded-md border border-dark-300">
                        <div className="max-w-md border border-dark-300 rounded-md overflow-hidden">
                          <div className="h-48 bg-dark-400 flex items-center justify-center">
                            {ogTags.image ? (
                              <img 
                                src={ogTags.image} 
                                alt="OG Image Preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/1200x630/2a2a2a/cccccc?text=Ignite+Marketing';
                                }}
                              />
                            ) : (
                              <div className="text-gray-400">Görsel URL girişi yapılmadı</div>
                            )}
                          </div>
                          <div className="p-3 bg-dark-700">
                            <div className="text-blue-400 text-sm">ignitepazarlama.com</div>
                            <div className="text-white font-medium">{ogTags.title || 'OG Başlık'}</div>
                            <div className="text-gray-400 text-sm line-clamp-2 mt-1">{ogTags.description || 'OG açıklaması buraya girilecek...'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Google Tab */}
        <TabsContent value="google" className="space-y-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-ignite" />
                Google Entegrasyonu
              </CardTitle>
              <CardDescription>
                Google Search Console, Google Analytics ve diğer Google araçlarını yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Google Search Console</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="google-verification">Site Doğrulama Kodu</Label>
                  <Input 
                    id="google-verification"
                    placeholder="google-site-verification: xxxxxxxxxxxxx"
                    className="bg-dark-400 border-dark-300"
                  />
                  <p className="text-xs text-gray-400">Google Search Console'da site doğrulaması için HTML meta etiketi</p>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-dark-600 rounded-md border border-dark-300 mt-4">
                  <div>
                    <p className="font-medium">Sitemap Gönderimi</p>
                    <p className="text-sm text-gray-400">Sitemap'inizi Google Search Console'a gönderin</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-ignite text-ignite hover:bg-ignite hover:text-white"
                    onClick={handleSubmitToSearchConsole}
                    disabled={isLoading || !sitemapGenerated}
                  >
                    {isLoading ? 'Gönderiliyor...' : 'Search Console\'a Gönder'}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 pt-6">
                <h3 className="text-lg font-medium">Google Analytics</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="google-analytics">Google Analytics Ölçüm ID</Label>
                  <Input 
                    id="google-analytics"
                    placeholder="G-XXXXXXXXXX veya UA-XXXXXXXX-X"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="enable-analytics" defaultChecked />
                  <Label htmlFor="enable-analytics">Google Analytics Etkinleştir</Label>
                </div>
              </div>
              
              <div className="space-y-4 pt-6">
                <h3 className="text-lg font-medium">Google Tag Manager</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="gtm-id">Google Tag Manager ID</Label>
                  <Input 
                    id="gtm-id"
                    placeholder="GTM-XXXXXXX"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="enable-gtm" />
                  <Label htmlFor="enable-gtm">Google Tag Manager Etkinleştir</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart4 className="h-5 w-5 text-ignite" />
                SEO Analizi
              </CardTitle>
              <CardDescription>
                SEO performansınızı izleyin ve optimizasyon önerileri alın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-6 text-center">
                <AlertCircle className="h-12 w-12 text-ignite mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">SEO Analizi Entegrasyonu</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  Bu özellik veritabanı bağlantısı gerektirmektedir. Lütfen veritabanı ayarlarınızı yapılandırın ve tekrar deneyin.
                </p>
                <Button className="bg-ignite hover:bg-ignite-700">
                  Veritabanı Ayarlarına Git
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SeoManager;
