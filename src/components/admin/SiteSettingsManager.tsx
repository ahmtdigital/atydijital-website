
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from '@/components/admin/GeneralSettings';
import { Globe, Server, Boxes, Palette, Layout, Type, Download, Settings } from 'lucide-react';
import { useDataService } from '@/lib/db';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Define the interface for site settings
interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  heading: string;
}

interface SectionContent {
  enabled: boolean;
  title: string;
  subtitle: string;
  description: string;
}

interface SiteSettingsData {
  id: string;
  siteName: string;
  siteTagline: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  googleAnalyticsId: string;
  faviconUrl: string;
  logoUrl: string;
  darkMode: boolean;
  glassmorphism: boolean;
  animationsEnabled: boolean;
  sections: {
    hero: SectionContent;
    services: SectionContent;
    portfolio: SectionContent;
    caseStudies: SectionContent;
    contact: SectionContent;
  };
  socialLinks: SocialLinks;
  colorScheme: ColorScheme;
}

// Create a default settings object
const defaultSettings: SiteSettingsData = {
  id: 'general',
  siteName: 'Ignite Pazarlama',
  siteTagline: 'Dijital Pazarlama Çözümleri',
  siteDescription: 'Profesyonel dijital pazarlama hizmetleri sunuyoruz',
  contactEmail: 'info@ignitepazarlama.com',
  contactPhone: '0212 555 7890',
  address: 'İstanbul, Türkiye',
  googleAnalyticsId: 'UA-12345678-1',
  faviconUrl: '/favicon.ico',
  logoUrl: '/logo.png',
  darkMode: true,
  glassmorphism: true,
  animationsEnabled: true,
  sections: {
    hero: {
      enabled: true,
      title: 'Dijital Pazarlama Çözümleri',
      subtitle: 'Markanızı bir sonraki seviyeye taşıyoruz',
      description: 'SEO, sosyal medya ve içerik pazarlama stratejilerimizle işletmenizi büyütün'
    },
    services: {
      enabled: true,
      title: 'Hizmetlerimiz',
      subtitle: 'Size nasıl yardımcı olabiliriz?',
      description: 'İşletmenizi büyütmek için ihtiyacınız olan tüm dijital pazarlama hizmetlerini sunuyoruz'
    },
    portfolio: {
      enabled: true,
      title: 'Portfolyo',
      subtitle: 'Başarılı Projelerimiz',
      description: 'Müşterilerimizle birlikte yarattığımız başarı hikayeleri'
    },
    caseStudies: {
      enabled: true,
      title: 'Başarı Hikayeleri',
      subtitle: 'Nasıl fark yarattık?',
      description: 'Müşterilerimizin hedeflerine ulaşmalarına nasıl yardımcı olduğumuzu keşfedin'
    },
    contact: {
      enabled: true,
      title: 'İletişim',
      subtitle: 'Bize Ulaşın',
      description: 'Sizin için ne yapabileceğimizi konuşalım'
    }
  },
  socialLinks: {
    facebook: 'https://facebook.com/ignitepazarlama',
    twitter: 'https://twitter.com/ignitepazarlama',
    instagram: 'https://instagram.com/ignitepazarlama',
    linkedin: 'https://linkedin.com/company/ignitepazarlama'
  },
  colorScheme: {
    primary: '#FF6B00',
    secondary: '#6b7280',
    accent: '#8b5cf6',
    background: '#121212',
    text: '#ffffff',
    heading: '#ffffff'
  }
};

const SiteSettingsManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const { items: settings, update: updateSettings } = useDataService<SiteSettingsData>('siteSettings', [defaultSettings]);
  const [formData, setFormData] = useState<SiteSettingsData>(settings[0] || defaultSettings);
  const [isLoading, setIsLoading] = useState(false);

  // Update local state when settings change
  useEffect(() => {
    if (settings && settings.length > 0) {
      setFormData(settings[0]);
    }
  }, [settings]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleInputChange = (field: keyof SiteSettingsData, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSocialLinkChange = (platform: keyof SocialLinks, value: string) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [platform]: value
      }
    });
  };

  const handleColorChange = (type: keyof ColorScheme, value: string) => {
    setFormData({
      ...formData,
      colorScheme: {
        ...formData.colorScheme,
        [type]: value
      }
    });
  };

  const handleSectionChange = (section: keyof typeof formData.sections, field: keyof SectionContent, value: any) => {
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        [section]: {
          ...formData.sections[section],
          [field]: value
        }
      }
    });
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      await updateSettings(formData.id, formData);
      toast({
        title: "Başarılı",
        description: "Site ayarları başarıyla kaydedildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ayarlar kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Apply custom CSS variables based on color scheme
  useEffect(() => {
    if (formData && formData.colorScheme) {
      const root = document.documentElement;
      root.style.setProperty('--gradient-color-1', formData.colorScheme.primary);
      root.style.setProperty('--gradient-color-2', formData.colorScheme.accent);
    }
  }, [formData.colorScheme]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Site Yönetimi</h2>
          <p className="text-sm text-white/60 mt-1">Web sitenizin temel ayarlarını buradan yönetin</p>
        </div>
      </div>

      <Card className="bg-dark-500 border-dark-400 shadow-lg overflow-hidden">
        <CardHeader className="bg-dark-600 border-b border-dark-400">
          <CardTitle className="flex items-center text-xl text-white">
            <Globe className="mr-2 h-5 w-5 text-ignite" />
            Site Ayarları Yönetimi
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="general" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="flex items-center p-6 overflow-x-auto">
              <TabsList className="bg-dark-600">
                <TabsTrigger value="general" className="text-white">
                  <Globe className="mr-2 h-4 w-4" />
                  Genel Ayarlar
                </TabsTrigger>
                <TabsTrigger value="appearance" className="text-white">
                  <Palette className="mr-2 h-4 w-4" />
                  Görünüm
                </TabsTrigger>
                <TabsTrigger value="sections" className="text-white">
                  <Layout className="mr-2 h-4 w-4" />
                  Bölümler
                </TabsTrigger>
                <TabsTrigger value="advanced" className="text-white">
                  <Server className="mr-2 h-4 w-4" />
                  Gelişmiş
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="general" className="p-6 pt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-dark-600 border-dark-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">Site Bilgileri</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Site Adı</label>
                        <Input 
                          value={formData.siteName || ''}
                          onChange={(e) => handleInputChange('siteName', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Site Sloganı</label>
                        <Input 
                          value={formData.siteTagline || ''}
                          onChange={(e) => handleInputChange('siteTagline', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Site Açıklaması</label>
                        <Input 
                          value={formData.siteDescription || ''}
                          onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-dark-600 border-dark-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">İletişim Bilgileri</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">E-posta Adresi</label>
                        <Input 
                          value={formData.contactEmail || ''}
                          onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Telefon Numarası</label>
                        <Input 
                          value={formData.contactPhone || ''}
                          onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Adres</label>
                        <Input 
                          value={formData.address || ''}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-dark-600 border-dark-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">Sosyal Medya Bağlantıları</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Facebook</label>
                        <Input 
                          value={formData.socialLinks?.facebook || ''}
                          onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Twitter</label>
                        <Input 
                          value={formData.socialLinks?.twitter || ''}
                          onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Instagram</label>
                        <Input 
                          value={formData.socialLinks?.instagram || ''}
                          onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">LinkedIn</label>
                        <Input 
                          value={formData.socialLinks?.linkedin || ''}
                          onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-dark-600 border-dark-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">Analitik ve Görsel</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Google Analytics ID</label>
                        <Input 
                          value={formData.googleAnalyticsId || ''}
                          onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Logo URL</label>
                        <Input 
                          value={formData.logoUrl || ''}
                          onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Favicon URL</label>
                        <Input 
                          value={formData.faviconUrl || ''}
                          onChange={(e) => handleInputChange('faviconUrl', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="appearance" className="p-6 pt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-dark-600 border-dark-400 col-span-1 md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">Genel Görünüm Ayarları</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="dark-mode" 
                            checked={formData.darkMode}
                            onCheckedChange={(checked) => handleInputChange('darkMode', checked)}
                          />
                          <Label htmlFor="dark-mode" className="text-white">Koyu Tema</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="glassmorphism" 
                            checked={formData.glassmorphism}
                            onCheckedChange={(checked) => handleInputChange('glassmorphism', checked)}
                          />
                          <Label htmlFor="glassmorphism" className="text-white">Cam Efekti</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="animations" 
                            checked={formData.animationsEnabled}
                            onCheckedChange={(checked) => handleInputChange('animationsEnabled', checked)}
                          />
                          <Label htmlFor="animations" className="text-white">Animasyonlar</Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-dark-600 border-dark-400 col-span-1 md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">Renk Şeması</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">Ana Renk</label>
                          <div className="flex gap-2">
                            <Input 
                              type="color"
                              value={formData.colorScheme?.primary || '#FF6B00'}
                              onChange={(e) => handleColorChange('primary', e.target.value)}
                              className="w-12 h-10 p-1 bg-dark-400"
                            />
                            <Input 
                              value={formData.colorScheme?.primary || '#FF6B00'}
                              onChange={(e) => handleColorChange('primary', e.target.value)}
                              className="bg-dark-400 border-dark-300 text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">İkincil Renk</label>
                          <div className="flex gap-2">
                            <Input 
                              type="color"
                              value={formData.colorScheme?.secondary || '#6b7280'}
                              onChange={(e) => handleColorChange('secondary', e.target.value)}
                              className="w-12 h-10 p-1 bg-dark-400"
                            />
                            <Input 
                              value={formData.colorScheme?.secondary || '#6b7280'}
                              onChange={(e) => handleColorChange('secondary', e.target.value)}
                              className="bg-dark-400 border-dark-300 text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">Vurgu Rengi</label>
                          <div className="flex gap-2">
                            <Input 
                              type="color"
                              value={formData.colorScheme?.accent || '#8b5cf6'}
                              onChange={(e) => handleColorChange('accent', e.target.value)}
                              className="w-12 h-10 p-1 bg-dark-400"
                            />
                            <Input 
                              value={formData.colorScheme?.accent || '#8b5cf6'}
                              onChange={(e) => handleColorChange('accent', e.target.value)}
                              className="bg-dark-400 border-dark-300 text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">Arka Plan Rengi</label>
                          <div className="flex gap-2">
                            <Input 
                              type="color"
                              value={formData.colorScheme?.background || '#121212'}
                              onChange={(e) => handleColorChange('background', e.target.value)}
                              className="w-12 h-10 p-1 bg-dark-400"
                            />
                            <Input 
                              value={formData.colorScheme?.background || '#121212'}
                              onChange={(e) => handleColorChange('background', e.target.value)}
                              className="bg-dark-400 border-dark-300 text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">Metin Rengi</label>
                          <div className="flex gap-2">
                            <Input 
                              type="color"
                              value={formData.colorScheme?.text || '#ffffff'}
                              onChange={(e) => handleColorChange('text', e.target.value)}
                              className="w-12 h-10 p-1 bg-dark-400"
                            />
                            <Input 
                              value={formData.colorScheme?.text || '#ffffff'}
                              onChange={(e) => handleColorChange('text', e.target.value)}
                              className="bg-dark-400 border-dark-300 text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">Başlık Rengi</label>
                          <div className="flex gap-2">
                            <Input 
                              type="color"
                              value={formData.colorScheme?.heading || '#ffffff'}
                              onChange={(e) => handleColorChange('heading', e.target.value)}
                              className="w-12 h-10 p-1 bg-dark-400"
                            />
                            <Input 
                              value={formData.colorScheme?.heading || '#ffffff'}
                              onChange={(e) => handleColorChange('heading', e.target.value)}
                              className="bg-dark-400 border-dark-300 text-white"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 border border-dark-400 rounded-lg">
                        <h3 className="text-lg font-medium text-white mb-3">Önizleme</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div 
                            className="p-4 rounded-lg flex flex-col items-center justify-center aspect-video" 
                            style={{ background: formData.colorScheme?.background || '#121212' }}
                          >
                            <h3 
                              className="text-xl font-bold mb-2"
                              style={{ color: formData.colorScheme?.heading || '#ffffff' }}
                            >
                              Örnek Başlık
                            </h3>
                            <p 
                              className="text-center"
                              style={{ color: formData.colorScheme?.text || '#ffffff' }}
                            >
                              Bu bir örnek metindir. Site genelinde metin rengi bu şekilde görünecektir.
                            </p>
                            <Button 
                              className="mt-4"
                              style={{ 
                                backgroundColor: formData.colorScheme?.primary || '#FF6B00',
                                color: '#ffffff'
                              }}
                            >
                              Örnek Buton
                            </Button>
                          </div>
                          
                          <div 
                            className="p-4 rounded-lg flex flex-col items-center justify-center aspect-video" 
                            style={{ 
                              background: formData.colorScheme?.background || '#121212',
                              borderColor: formData.colorScheme?.accent || '#8b5cf6',
                              borderWidth: '1px'
                            }}
                          >
                            <div 
                              className="w-full h-6 mb-4 rounded"
                              style={{ backgroundColor: formData.colorScheme?.secondary || '#6b7280' }}
                            ></div>
                            <div 
                              className="w-3/4 h-4 mb-2 rounded"
                              style={{ backgroundColor: formData.colorScheme?.accent || '#8b5cf6', opacity: 0.7 }}
                            ></div>
                            <div 
                              className="w-full h-20 mt-2 rounded flex items-center justify-center"
                              style={{ backgroundColor: formData.colorScheme?.primary || '#FF6B00', opacity: 0.8 }}
                            >
                              <span style={{ color: '#ffffff' }}>Vurgu Alanı</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="sections" className="p-6 pt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hero Section Settings */}
                  <Card className="bg-dark-600 border-dark-400">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-lg text-white">Ana Bölüm (Hero)</CardTitle>
                      <Switch 
                        checked={formData.sections?.hero?.enabled}
                        onCheckedChange={(checked) => handleSectionChange('hero', 'enabled', checked)}
                      />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Başlık</label>
                        <Input 
                          value={formData.sections?.hero?.title || ''}
                          onChange={(e) => handleSectionChange('hero', 'title', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.hero?.enabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Alt Başlık</label>
                        <Input 
                          value={formData.sections?.hero?.subtitle || ''}
                          onChange={(e) => handleSectionChange('hero', 'subtitle', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.hero?.enabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Açıklama</label>
                        <Input 
                          value={formData.sections?.hero?.description || ''}
                          onChange={(e) => handleSectionChange('hero', 'description', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.hero?.enabled}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Services Section Settings */}
                  <Card className="bg-dark-600 border-dark-400">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-lg text-white">Hizmetler Bölümü</CardTitle>
                      <Switch 
                        checked={formData.sections?.services?.enabled}
                        onCheckedChange={(checked) => handleSectionChange('services', 'enabled', checked)}
                      />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Başlık</label>
                        <Input 
                          value={formData.sections?.services?.title || ''}
                          onChange={(e) => handleSectionChange('services', 'title', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.services?.enabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Alt Başlık</label>
                        <Input 
                          value={formData.sections?.services?.subtitle || ''}
                          onChange={(e) => handleSectionChange('services', 'subtitle', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.services?.enabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Açıklama</label>
                        <Input 
                          value={formData.sections?.services?.description || ''}
                          onChange={(e) => handleSectionChange('services', 'description', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.services?.enabled}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Portfolio Section Settings */}
                  <Card className="bg-dark-600 border-dark-400">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-lg text-white">Portfolyo Bölümü</CardTitle>
                      <Switch 
                        checked={formData.sections?.portfolio?.enabled}
                        onCheckedChange={(checked) => handleSectionChange('portfolio', 'enabled', checked)}
                      />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Başlık</label>
                        <Input 
                          value={formData.sections?.portfolio?.title || ''}
                          onChange={(e) => handleSectionChange('portfolio', 'title', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.portfolio?.enabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Alt Başlık</label>
                        <Input 
                          value={formData.sections?.portfolio?.subtitle || ''}
                          onChange={(e) => handleSectionChange('portfolio', 'subtitle', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.portfolio?.enabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Açıklama</label>
                        <Input 
                          value={formData.sections?.portfolio?.description || ''}
                          onChange={(e) => handleSectionChange('portfolio', 'description', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.portfolio?.enabled}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Case Studies Section Settings */}
                  <Card className="bg-dark-600 border-dark-400">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-lg text-white">Başarı Hikayeleri Bölümü</CardTitle>
                      <Switch 
                        checked={formData.sections?.caseStudies?.enabled}
                        onCheckedChange={(checked) => handleSectionChange('caseStudies', 'enabled', checked)}
                      />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Başlık</label>
                        <Input 
                          value={formData.sections?.caseStudies?.title || ''}
                          onChange={(e) => handleSectionChange('caseStudies', 'title', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.caseStudies?.enabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Alt Başlık</label>
                        <Input 
                          value={formData.sections?.caseStudies?.subtitle || ''}
                          onChange={(e) => handleSectionChange('caseStudies', 'subtitle', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.caseStudies?.enabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Açıklama</label>
                        <Input 
                          value={formData.sections?.caseStudies?.description || ''}
                          onChange={(e) => handleSectionChange('caseStudies', 'description', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.caseStudies?.enabled}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Contact Section Settings */}
                  <Card className="bg-dark-600 border-dark-400">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-lg text-white">İletişim Bölümü</CardTitle>
                      <Switch 
                        checked={formData.sections?.contact?.enabled}
                        onCheckedChange={(checked) => handleSectionChange('contact', 'enabled', checked)}
                      />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Başlık</label>
                        <Input 
                          value={formData.sections?.contact?.title || ''}
                          onChange={(e) => handleSectionChange('contact', 'title', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.contact?.enabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Alt Başlık</label>
                        <Input 
                          value={formData.sections?.contact?.subtitle || ''}
                          onChange={(e) => handleSectionChange('contact', 'subtitle', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.contact?.enabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Açıklama</label>
                        <Input 
                          value={formData.sections?.contact?.description || ''}
                          onChange={(e) => handleSectionChange('contact', 'description', e.target.value)}
                          className="bg-dark-400 border-dark-300 text-white"
                          disabled={!formData.sections?.contact?.enabled}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="advanced" className="p-6 pt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <Alert className="bg-dark-600 border-ignite/30">
                    <AlertDescription className="text-white">
                      Bu bölüm, gelişmiş site yapılandırma seçenekleri içerir. Yalnızca gerekli olduğunda bu ayarları değiştirin.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-dark-600 border-dark-400 shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center text-white">
                          <Server className="h-4 w-4 mr-2 text-ignite" /> Manuel Yedekleme
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-white/70 mb-4">
                          Sitenizin tüm içeriklerini ve ayarlarını manuel olarak yedekleyebilirsiniz. 
                          Yedek dosyası indirilebilir bir JSON formatında oluşturulacaktır.
                        </p>
                        <Button className="bg-dark-400 hover:bg-dark-300 text-white">
                          <Download className="h-4 w-4 mr-2" />
                          Verileri Yedekle
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-dark-600 border-dark-400 shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center text-white">
                          <Type className="h-4 w-4 mr-2 text-ignite" /> Yazı Tipleri
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-white/70">
                          Sitenizde kullanılacak yazı tiplerini özelleştirebilirsiniz. Bu özellik yakında eklenecektir.
                        </p>
                        <div className="flex items-center">
                          <Button disabled className="bg-dark-400 hover:bg-dark-300 text-white opacity-50">
                            <Settings className="h-4 w-4 mr-2" />
                            Yazı Tiplerini Ayarla
                          </Button>
                          <span className="text-xs text-white/50 ml-3">(Yakında)</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end m-6">
            <Button 
              onClick={handleSaveSettings}
              className="bg-ignite hover:bg-ignite-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Kaydediliyor...
                </>
              ) : (
                <>
                  Ayarları Kaydet
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettingsManager;
