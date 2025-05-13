
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, Globe, Search, FileText, Settings } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SeoSettings {
  id: number;
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  enableIndexing: boolean;
  analyticsActive: boolean;
  googleAnalyticsId: string;
  facebookPixelId: string;
  structuredData: string;
  robotsTxt: string;
  customHeaderCode: string;
  customFooterCode: string;
}

const SeoSettingsPanel = () => {
  const { toast } = useToast();
  const { items: seoItems, update } = useDataService('seoSettings', [
    {
      id: 1,
      siteTitle: 'ATY Digital | Performans Pazarlama Ajansı',
      metaDescription: 'ATY Digital, SEO, sosyal medya ve performans pazarlama hizmetleri sunan lider dijital pazarlama ajansıdır.',
      keywords: 'dijital pazarlama, performans pazarlama, SEO, sosyal medya, içerik pazarlama',
      canonicalUrl: 'https://atydigital.com.tr',
      enableIndexing: true,
      analyticsActive: true,
      googleAnalyticsId: 'G-XXXXXXXXXX',
      facebookPixelId: '',
      structuredData: '{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "ATY Digital",\n  "url": "https://atydigital.com.tr",\n  "logo": "https://atydigital.com.tr/logo.png"\n}',
      robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://atydigital.com.tr/sitemap.xml',
      customHeaderCode: '',
      customFooterCode: ''
    }
  ]);

  const seoSettings = seoItems.length > 0 ? seoItems[0] : null;
  
  const [formData, setFormData] = useState<SeoSettings>(seoSettings || {
    id: 1,
    siteTitle: '',
    metaDescription: '',
    keywords: '',
    canonicalUrl: '',
    enableIndexing: true,
    analyticsActive: false,
    googleAnalyticsId: '',
    facebookPixelId: '',
    structuredData: '',
    robotsTxt: '',
    customHeaderCode: '',
    customFooterCode: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const handleInputChange = (field: keyof SeoSettings, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSave = async () => {
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
    <Card className="bg-dark-500 border-dark-400">
      <CardHeader className="border-b border-dark-400">
        <CardTitle className="text-white flex items-center gap-2">
          <Search className="h-5 w-5 text-ignite" />
          SEO Ayarları
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-dark-600 mb-4">
            <TabsTrigger value="basic" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white">
              Temel Ayarlar
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white">
              Analitik Kodları
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white">
              Gelişmiş Ayarlar
            </TabsTrigger>
            <TabsTrigger value="custom" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white">
              Özel Kodlar
            </TabsTrigger>
          </TabsList>
        
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-1 block">Site Başlığı</Label>
                <Input
                  value={formData.siteTitle}
                  onChange={(e) => handleInputChange('siteTitle', e.target.value)}
                  placeholder="Site Başlığı"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              
              <div>
                <Label className="text-white mb-1 block">Meta Açıklaması</Label>
                <Textarea
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  placeholder="Meta Açıklaması (150-160 karakter)"
                  className="bg-dark-400 border-dark-300 text-white"
                  rows={3}
                />
              </div>
              
              <div>
                <Label className="text-white mb-1 block">Anahtar Kelimeler</Label>
                <Input
                  value={formData.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  placeholder="Anahtar Kelimeler (virgülle ayırın)"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              
              <div>
                <Label className="text-white mb-1 block">Canonical URL</Label>
                <Input
                  value={formData.canonicalUrl}
                  onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
                  placeholder="https://siteadresi.com"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.enableIndexing}
                  onCheckedChange={(checked) => handleInputChange('enableIndexing', checked)}
                  id="enableIndexing"
                />
                <Label htmlFor="enableIndexing" className="text-white">
                  Site İndekslemeyi Etkinleştir (robots.txt)
                </Label>
              </div>
            </div>
          </TabsContent>
        
          <TabsContent value="analytics" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  checked={formData.analyticsActive}
                  onCheckedChange={(checked) => handleInputChange('analyticsActive', checked)}
                  id="analyticsActive"
                />
                <Label htmlFor="analyticsActive" className="text-white">
                  Analytics Kodlarını Etkinleştir
                </Label>
              </div>
              
              <div>
                <Label className="text-white mb-1 block">Google Analytics ID</Label>
                <Input
                  value={formData.googleAnalyticsId}
                  onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="bg-dark-400 border-dark-300 text-white"
                  disabled={!formData.analyticsActive}
                />
              </div>
              
              <div>
                <Label className="text-white mb-1 block">Facebook Pixel ID</Label>
                <Input
                  value={formData.facebookPixelId}
                  onChange={(e) => handleInputChange('facebookPixelId', e.target.value)}
                  placeholder="XXXXXXXXXXXXXXXXXX"
                  className="bg-dark-400 border-dark-300 text-white"
                  disabled={!formData.analyticsActive}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-1 block">JSON-LD Yapılandırılmış Veri</Label>
                <Textarea
                  value={formData.structuredData}
                  onChange={(e) => handleInputChange('structuredData', e.target.value)}
                  placeholder='{"@context": "https://schema.org", "@type": "Organization", ...}'
                  className="bg-dark-400 border-dark-300 text-white font-mono text-sm"
                  rows={6}
                />
              </div>
              
              <div>
                <Label className="text-white mb-1 block">Robots.txt İçeriği</Label>
                <Textarea
                  value={formData.robotsTxt}
                  onChange={(e) => handleInputChange('robotsTxt', e.target.value)}
                  placeholder="User-agent: *
Disallow: /admin/
Allow: /
Sitemap: https://siteadresi.com/sitemap.xml"
                  className="bg-dark-400 border-dark-300 text-white font-mono text-sm"
                  rows={6}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-1 block">Header Özel Kodu (head etiketinin içine)</Label>
                <Textarea
                  value={formData.customHeaderCode}
                  onChange={(e) => handleInputChange('customHeaderCode', e.target.value)}
                  placeholder="<!-- Özel header kodlarını buraya ekleyin -->"
                  className="bg-dark-400 border-dark-300 text-white font-mono text-sm"
                  rows={6}
                />
              </div>
              
              <div>
                <Label className="text-white mb-1 block">Footer Özel Kodu (body etiketinin sonuna)</Label>
                <Textarea
                  value={formData.customFooterCode}
                  onChange={(e) => handleInputChange('customFooterCode', e.target.value)}
                  placeholder="<!-- Özel footer kodlarını buraya ekleyin -->"
                  className="bg-dark-400 border-dark-300 text-white font-mono text-sm"
                  rows={6}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end pt-4 border-t border-dark-400">
          <Button 
            onClick={handleSave} 
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
      </CardContent>
    </Card>
  );
};

export default SeoSettingsPanel;
