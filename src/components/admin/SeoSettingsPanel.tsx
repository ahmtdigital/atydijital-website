
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Label } from '@/components/ui/label';
import { Save, Globe, FileCode, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface SeoSettings {
  id: number;
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  googleAnalyticsId: string;
  analyticsActive: boolean;
  googleSiteVerification: string;
  facebookAppId: string;
  twitterUsername: string;
  favicon: string;
  robotsTxt: string;
  canonicalUrl: string;
  enableIndexing: boolean;
  enableSitemap: boolean;
  pageStructuredData: boolean;
}

const pages = [
  { id: 'home', name: 'Ana Sayfa', slug: '/' },
  { id: 'services', name: 'Hizmetler', slug: '/services' },
  { id: 'portfolio', name: 'Portfolyo', slug: '/portfolio' },
  { id: 'about', name: 'Hakkımızda', slug: '/about' },
  { id: 'blog', name: 'Blog', slug: '/blog' },
  { id: 'contact', name: 'İletişim', slug: '/contact' }
];

const SeoSettingsPanel = () => {
  const { toast } = useToast();
  const { items: seoSettingsItems, update } = useDataService('seoSettings', [
    {
      id: 1,
      siteTitle: 'Ignite Digital - Dijital Pazarlama ve Web Tasarım Ajansı',
      metaDescription: 'Profesyonel web tasarım, SEO ve dijital pazarlama hizmetleri sunan ajansımızla markanızı bir üst seviyeye taşıyın.',
      keywords: 'dijital pazarlama, web tasarım, SEO, sosyal medya, içerik üretimi, dijital ajans',
      googleAnalyticsId: 'UA-123456789-1',
      analyticsActive: true,
      googleSiteVerification: 'verification-code-here',
      facebookAppId: '123456789',
      twitterUsername: '@ignitedigital',
      favicon: '/favicon.ico',
      robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://ignitedigital.com/sitemap.xml',
      canonicalUrl: 'https://ignitedigital.com',
      enableIndexing: true,
      enableSitemap: true,
      pageStructuredData: true
    }
  ]);

  const seoSettings = seoSettingsItems.length > 0 ? seoSettingsItems[0] : null;
  const [selectedPage, setSelectedPage] = useState('home');
  const [activeTab, setActiveTab] = useState('general');
  
  const [formData, setFormData] = useState<SeoSettings>(seoSettings || {
    id: 1,
    siteTitle: '',
    metaDescription: '',
    keywords: '',
    googleAnalyticsId: '',
    analyticsActive: false,
    googleSiteVerification: '',
    facebookAppId: '',
    twitterUsername: '',
    favicon: '',
    robotsTxt: '',
    canonicalUrl: '',
    enableIndexing: true,
    enableSitemap: true,
    pageStructuredData: false
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof SeoSettings, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSaveSeoSettings = async () => {
    setIsLoading(true);
    try {
      await update(formData.id, formData);
      
      toast({
        title: "Başarılı",
        description: "SEO ayarları başarıyla güncellendi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "SEO ayarları güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-dark-600 w-full justify-start overflow-x-auto">
          <TabsTrigger value="general" className="text-white">Genel SEO</TabsTrigger>
          <TabsTrigger value="pages" className="text-white">Sayfa SEO</TabsTrigger>
          <TabsTrigger value="technical" className="text-white">Teknik SEO</TabsTrigger>
          <TabsTrigger value="social" className="text-white">Sosyal Medya SEO</TabsTrigger>
          <TabsTrigger value="structured" className="text-white">
            Yapısal Veri
            <Badge className="ml-2 bg-ignite text-white text-[10px] px-1 py-0">Yeni</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader className="border-b border-dark-400">
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-ignite" />
                Genel SEO Ayarları
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Site Başlığı</Label>
                  <Input
                    value={formData.siteTitle}
                    onChange={(e) => handleInputChange('siteTitle', e.target.value)}
                    placeholder="Site başlığınızı girin"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                  <p className="text-xs text-gray-400">Önerilen uzunluk: 50-60 karakter</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Meta Açıklaması</Label>
                  <Textarea
                    value={formData.metaDescription}
                    onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                    placeholder="Site meta açıklamasını girin"
                    className="bg-dark-400 border-dark-300 text-white min-h-[100px]"
                  />
                  <p className="text-xs text-gray-400">Önerilen uzunluk: 150-160 karakter</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Anahtar Kelimeler</Label>
                  <Textarea
                    value={formData.keywords}
                    onChange={(e) => handleInputChange('keywords', e.target.value)}
                    placeholder="Virgülle ayrılmış anahtar kelimeler"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                  <p className="text-xs text-gray-400">Anahtar kelimeleri virgülle ayırın</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Canonical URL</Label>
                  <Input
                    value={formData.canonicalUrl}
                    onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
                    placeholder="https://siteadresi.com"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Favicon URL</Label>
                  <Input
                    value={formData.favicon}
                    onChange={(e) => handleInputChange('favicon', e.target.value)}
                    placeholder="/favicon.ico"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="enableIndexing"
                    checked={formData.enableIndexing}
                    onCheckedChange={(checked) => handleInputChange('enableIndexing', checked)}
                    className="data-[state=checked]:bg-ignite"
                  />
                  <Label htmlFor="enableIndexing" className="text-white">Arama motorlarında indekslenmeyi etkinleştir</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="mt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader className="border-b border-dark-400">
              <CardTitle className="text-white">Sayfa SEO Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Sayfa Seçin</Label>
                  <Select value={selectedPage} onValueChange={setSelectedPage}>
                    <SelectTrigger className="bg-dark-400 border-dark-300 text-white">
                      <SelectValue placeholder="Sayfa seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-400 border-dark-300">
                      {pages.map(page => (
                        <SelectItem key={page.id} value={page.id} className="text-white hover:bg-dark-500">
                          {page.name} ({page.slug})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Sayfa Başlığı</Label>
                    <Input
                      placeholder="Sayfa başlığı"
                      className="bg-dark-400 border-dark-300 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white">Sayfa Meta Açıklaması</Label>
                    <Textarea
                      placeholder="Sayfa açıklaması"
                      className="bg-dark-400 border-dark-300 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white">Sayfa Anahtar Kelimeleri</Label>
                    <Input
                      placeholder="Virgülle ayrılmış anahtar kelimeler"
                      className="bg-dark-400 border-dark-300 text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <h3 className="text-lg font-medium text-white">Önizleme</h3>
                  <div className="bg-dark-600 p-4 rounded-md border border-dark-400">
                    <div className="text-blue-400 text-lg font-medium line-clamp-1">Sayfa Başlığı Örneği - Ignite Digital</div>
                    <div className="text-green-400 text-sm line-clamp-1">www.ignitedigital.com/sayfa-url</div>
                    <div className="text-gray-300 text-sm mt-1 line-clamp-2">Bu bir sayfa açıklaması örneğidir. Bu metin, arama motorlarında görüntülenecek olan SEO meta açıklamasıdır...</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-ignite hover:bg-ignite/90 text-white">
                  <Save className="mr-2 h-4 w-4" />
                  Sayfa SEO Ayarlarını Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="mt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader className="border-b border-dark-400">
              <CardTitle className="text-white flex items-center gap-2">
                <FileCode className="h-5 w-5 text-ignite" />
                Teknik SEO Ayarları
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Google Analytics ID</Label>
                  <Input
                    value={formData.googleAnalyticsId}
                    onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                    placeholder="UA-XXXXXXXX-X or G-XXXXXXXXXX"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="analyticsActive"
                    checked={formData.analyticsActive}
                    onCheckedChange={(checked) => handleInputChange('analyticsActive', checked)}
                    className="data-[state=checked]:bg-ignite"
                  />
                  <Label htmlFor="analyticsActive" className="text-white">Analytics'i Aktifleştir</Label>
                </div>

                <div className="space-y-2 pt-4">
                  <Label className="text-white">Google Site Doğrulama Kodu</Label>
                  <Input
                    value={formData.googleSiteVerification}
                    onChange={(e) => handleInputChange('googleSiteVerification', e.target.value)}
                    placeholder="Google verification code"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>

                <div className="space-y-2 pt-4">
                  <Label className="text-white">Robots.txt İçeriği</Label>
                  <Textarea
                    value={formData.robotsTxt}
                    onChange={(e) => handleInputChange('robotsTxt', e.target.value)}
                    className="bg-dark-400 border-dark-300 text-white font-mono min-h-[150px]"
                  />
                  <p className="text-xs text-gray-400">Arama motorları ve botlar için erişim kuralları</p>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="enableSitemap"
                    checked={formData.enableSitemap}
                    onCheckedChange={(checked) => handleInputChange('enableSitemap', checked)}
                    className="data-[state=checked]:bg-ignite"
                  />
                  <Label htmlFor="enableSitemap" className="text-white">Sitemap XML Oluşturmayı Etkinleştir</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="mt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader className="border-b border-dark-400">
              <CardTitle className="text-white">Sosyal Medya SEO Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Open Graph Meta Etiketleri</h3>
                
                <div className="space-y-2">
                  <Label className="text-white">Facebook App ID</Label>
                  <Input
                    value={formData.facebookAppId}
                    onChange={(e) => handleInputChange('facebookAppId', e.target.value)}
                    placeholder="Facebook App ID"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Twitter Kullanıcı Adı</Label>
                  <Input
                    value={formData.twitterUsername}
                    onChange={(e) => handleInputChange('twitterUsername', e.target.value)}
                    placeholder="@kullaniciadi"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>

                <div className="pt-4 space-y-2">
                  <h3 className="text-lg font-medium text-white">Varsayılan Sosyal Medya Görseli</h3>
                  <div className="space-y-2">
                    <Input
                      placeholder="https://ignitedigital.com/social-image.jpg"
                      className="bg-dark-400 border-dark-300 text-white"
                    />
                    <p className="text-xs text-gray-400">Önerilen boyut: 1200x630 piksel</p>
                  </div>

                  <div className="border border-dashed border-dark-300 rounded-md p-4 mt-2">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Bir görsel seçin veya sürükleyip bırakın</p>
                      <Button variant="outline" className="mt-2 text-white border-dark-300 hover:bg-dark-400">
                        Görsel Seç
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structured" className="mt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader className="border-b border-dark-400">
              <CardTitle className="text-white">Yapısal Veri (Schema.org)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-4 border border-amber-600/30 rounded-md bg-amber-600/10 flex gap-3 items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <p className="text-sm text-amber-200">
                    Yapısal veri, arama motoru sonuç sayfalarında zengin snippet'ler oluşturmanıza yardımcı olur. 
                    Bu özellik BETA sürümündedir ve yakında tamamen kullanıma sunulacaktır.
                  </p>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="pageStructuredData"
                    checked={formData.pageStructuredData}
                    onCheckedChange={(checked) => handleInputChange('pageStructuredData', checked)}
                    className="data-[state=checked]:bg-ignite"
                  />
                  <Label htmlFor="pageStructuredData" className="text-white">
                    Sayfa Yapısal Verilerini Etkinleştir
                    <Badge className="ml-2 bg-amber-700 text-white text-[10px] px-1 py-0">BETA</Badge>
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSeoSettings} 
          disabled={isLoading}
          className="bg-ignite hover:bg-ignite-700 text-white"
        >
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              SEO Ayarlarını Kaydet
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SeoSettingsPanel;
