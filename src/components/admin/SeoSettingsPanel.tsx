
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDataService } from '@/lib/db';
import { Globe, Tags, Link2, Search, BarChart, Save, Check, AlertCircle } from 'lucide-react';

interface SeoSettings {
  id?: number;
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  enableIndexing: boolean;
  analyticsActive: boolean;
  googleAnalyticsId: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: string;
  twitterCardType: string;
  twitterUsername: string;
  structuredData: string;
  customHeadTags: string;
}

const defaultSettings: SeoSettings = {
  siteTitle: 'ATY Digital | Performans Pazarlama ve SEO Ajansı',
  metaDescription: 'ATY Digital, markanızı büyütmek için performans pazarlama, SEO ve dijital pazarlama hizmetleri sunar. Projeleriniz için profesyonel çözümler.',
  keywords: 'performans pazarlama, seo, dijital pazarlama, sosyal medya yönetimi, ppc, google ads',
  canonicalUrl: 'https://www.atydigital.com.tr',
  enableIndexing: true,
  analyticsActive: false,
  googleAnalyticsId: '',
  openGraphTitle: 'ATY Digital | Performans Pazarlama ve SEO Ajansı',
  openGraphDescription: 'Dijital başarı için ATY Digital ile çalışın. Performans odaklı pazarlama ve SEO stratejileri.',
  openGraphImage: '/img/og-image.jpg',
  twitterCardType: 'summary_large_image',
  twitterUsername: '@atydigital',
  structuredData: '{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "ATY Digital",\n  "url": "https://www.atydigital.com.tr",\n  "logo": "https://www.atydigital.com.tr/img/logo.png"\n}',
  customHeadTags: '<!-- Özel head etiketleri buraya -->'
};

const SeoSettingsPanel = () => {
  const { toast } = useToast();
  const { items: seoItems, update, add } = useDataService<SeoSettings>('seoSettings', [defaultSettings]);
  
  const [settings, setSettings] = useState<SeoSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState('general');
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (seoItems && seoItems.length > 0) {
      setSettings(seoItems[0]);
    }
  }, [seoItems]);

  const handleInputChange = (key: keyof SeoSettings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      if (seoItems && seoItems.length > 0 && seoItems[0].id) {
        await update(seoItems[0].id, settings);
      } else {
        await add(settings);
      }
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
      
      toast({
        title: "Başarılı",
        description: "SEO ayarları kaydedildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "SEO ayarları kaydedilirken bir sorun oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-dark-500 border-dark-400">
      <CardHeader className="border-b border-dark-400">
        <CardTitle className="text-white flex items-center">
          <Search className="mr-2 h-5 w-5 text-ignite" />
          SEO Ayarları
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-dark-600 mb-4 flex-wrap">
            <TabsTrigger value="general" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              Genel SEO
            </TabsTrigger>
            <TabsTrigger value="opengraph" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center">
              <Link2 className="mr-2 h-4 w-4" />
              Open Graph
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center">
              <AlertCircle className="mr-2 h-4 w-4" />
              Gelişmiş
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white">Site Başlığı</Label>
                <Input
                  value={settings.siteTitle}
                  onChange={(e) => handleInputChange('siteTitle', e.target.value)}
                  placeholder="Site başlığı"
                  className="bg-dark-400 border-dark-300 text-white"
                />
                <p className="text-sm text-gray-400">Bu başlık tarayıcı sekmesinde ve arama sonuçlarında görünecektir.</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Meta Açıklaması</Label>
                <Textarea
                  value={settings.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  placeholder="Sitenizin kısa açıklaması"
                  className="bg-dark-400 border-dark-300 text-white resize-none"
                  rows={3}
                />
                <p className="text-sm text-gray-400">Bu açıklama, arama sonuçlarında başlığın altında görünecektir.</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white flex items-center">
                  <Tags className="mr-2 h-4 w-4" />
                  Anahtar Kelimeler
                </Label>
                <Textarea
                  value={settings.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  placeholder="anahtar1, anahtar2, anahtar3"
                  className="bg-dark-400 border-dark-300 text-white resize-none"
                  rows={2}
                />
                <p className="text-sm text-gray-400">Virgülle ayırarak anahtar kelimeleri girin.</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Canonical URL</Label>
                <Input
                  value={settings.canonicalUrl}
                  onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
                  placeholder="https://www.siteniz.com"
                  className="bg-dark-400 border-dark-300 text-white"
                />
                <p className="text-sm text-gray-400">Ana domain adresinizi belirtin.</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableIndexing" className="text-white">
                    Arama Motorları İndekslemesi
                  </Label>
                  <p className="text-sm text-gray-400">Arama motorlarının sitenizi indekslemesine izin verin.</p>
                </div>
                <Switch
                  id="enableIndexing"
                  checked={settings.enableIndexing}
                  onCheckedChange={(checked) => handleInputChange('enableIndexing', checked)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="opengraph">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white">Open Graph Başlığı</Label>
                <Input
                  value={settings.openGraphTitle}
                  onChange={(e) => handleInputChange('openGraphTitle', e.target.value)}
                  placeholder="Open Graph başlığı"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Open Graph Açıklaması</Label>
                <Textarea
                  value={settings.openGraphDescription}
                  onChange={(e) => handleInputChange('openGraphDescription', e.target.value)}
                  placeholder="Sosyal medya paylaşım açıklaması"
                  className="bg-dark-400 border-dark-300 text-white resize-none"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Open Graph Görsel URL</Label>
                <Input
                  value={settings.openGraphImage}
                  onChange={(e) => handleInputChange('openGraphImage', e.target.value)}
                  placeholder="/img/og-image.jpg"
                  className="bg-dark-400 border-dark-300 text-white"
                />
                <p className="text-sm text-gray-400">Sosyal medya paylaşımlarında görünecek görselin URL'si.</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Twitter Kart Tipi</Label>
                <Input
                  value={settings.twitterCardType}
                  onChange={(e) => handleInputChange('twitterCardType', e.target.value)}
                  placeholder="summary_large_image"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Twitter Kullanıcı Adı</Label>
                <Input
                  value={settings.twitterUsername}
                  onChange={(e) => handleInputChange('twitterUsername', e.target.value)}
                  placeholder="@kullaniciadi"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analyticsActive" className="text-white">
                    Google Analytics Aktif
                  </Label>
                  <p className="text-sm text-gray-400">Google Analytics izlemesini etkinleştirin.</p>
                </div>
                <Switch
                  id="analyticsActive"
                  checked={settings.analyticsActive}
                  onCheckedChange={(checked) => handleInputChange('analyticsActive', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Google Analytics ID</Label>
                <Input
                  value={settings.googleAnalyticsId}
                  onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                  placeholder="G-XXXXXXXXXX veya UA-XXXXXXXX-X"
                  className="bg-dark-400 border-dark-300 text-white"
                  disabled={!settings.analyticsActive}
                />
                <p className="text-sm text-gray-400">Google Analytics'ten aldığınız takip ID'sini girin.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white">Structured Data (JSON-LD)</Label>
                <Textarea
                  value={settings.structuredData}
                  onChange={(e) => handleInputChange('structuredData', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white font-mono resize-none"
                  rows={8}
                />
                <p className="text-sm text-gray-400">Zengin sonuçlar için yapılandırılmış veri.</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Özel Head Etiketleri</Label>
                <Textarea
                  value={settings.customHeadTags}
                  onChange={(e) => handleInputChange('customHeadTags', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white font-mono resize-none"
                  rows={6}
                />
                <p className="text-sm text-gray-400">Meta etiketleri, script veya diğer özel head etiketleri.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="pt-6 flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            className={`relative overflow-hidden ${isSaved ? 'bg-green-600 hover:bg-green-700' : 'bg-ignite hover:bg-ignite-700'} text-white`}
          >
            {isSaved ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Kaydedildi
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeoSettingsPanel;
