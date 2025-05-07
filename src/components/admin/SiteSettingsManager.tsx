
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from '@/components/admin/GeneralSettings';
import { Globe, Server, Boxes } from 'lucide-react';
import { useDataService } from '@/lib/db';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
  socialLinks: {
    facebook: 'https://facebook.com/ignitepazarlama',
    twitter: 'https://twitter.com/ignitepazarlama',
    instagram: 'https://instagram.com/ignitepazarlama',
    linkedin: 'https://linkedin.com/company/ignitepazarlama'
  },
  colorScheme: {
    primary: '#f97316',
    secondary: '#6b7280',
    accent: '#8b5cf6'
  }
};

const SiteSettingsManager = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { items: settings, update: updateSettings } = useDataService<SiteSettingsData>('siteSettings', [defaultSettings]);
  const [formData, setFormData] = useState<SiteSettingsData>(settings[0] || defaultSettings);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleInputChange = (field: keyof SiteSettingsData, value: string) => {
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

  const handleSaveSettings = () => {
    updateSettings(formData.id, formData);
  };

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
                <TabsTrigger value="backups" className="text-white">
                  <Server className="mr-2 h-4 w-4" />
                  Yedekleme
                </TabsTrigger>
                <TabsTrigger value="structure" className="text-white">
                  <Boxes className="mr-2 h-4 w-4" />
                  İçerik Yapısı
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
                  
                  <Card className="bg-dark-600 border-dark-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">Renk Şeması</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Ana Renk</label>
                        <div className="flex gap-2">
                          <Input 
                            type="color"
                            value={formData.colorScheme?.primary || '#f97316'}
                            onChange={(e) => handleColorChange('primary', e.target.value)}
                            className="w-12 h-10 p-1 bg-dark-400"
                          />
                          <Input 
                            value={formData.colorScheme?.primary || '#f97316'}
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
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveSettings}
                    className="bg-ignite hover:bg-ignite-700"
                  >
                    Ayarları Kaydet
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="backups" className="p-6 pt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <Alert className="bg-dark-600 border-ignite/30">
                    <AlertDescription className="text-white">
                      Veritabanı yedekleme özelliği yakında eklenecektir. Bu özellik sayesinde sitenizin 
                      içeriklerini ve ayarlarını düzenli olarak yedekleyebileceksiniz.
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
                        <p className="text-sm text-white/70">
                          Sitenizin tüm içeriklerini ve ayarlarını manuel olarak yedekleyebilirsiniz. 
                          Yedek dosyası indirilebilir bir JSON formatında oluşturulacaktır.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-dark-600 border-dark-400 shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center text-white">
                          <Server className="h-4 w-4 mr-2 text-ignite" /> Otomatik Yedekleme
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-white/70">
                          Sitenizin içeriklerini ve ayarlarını belirli aralıklarla otomatik olarak 
                          yedekleyebilirsiniz. Yedekler güvenli bir şekilde saklanacaktır.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="structure" className="p-6 pt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <p className="text-sm text-white/70 mb-4">
                    İçerik yapınızı özelleştirin ve web sitenizin organizasyonunu düzenleyin. 
                    Özel içerik tipleri ekleyebilir ve mevcut yapıyı değiştirebilirsiniz.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="bg-dark-600 border-dark-400">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2 flex items-center text-white">
                          <div className="w-8 h-8 bg-ignite/10 rounded-md flex items-center justify-center mr-2">
                            <Boxes className="h-5 w-5 text-ignite" />
                          </div>
                          Hizmetler
                        </h3>
                        <p className="text-sm text-white/70">
                          Hizmet içerik tipi: başlık, açıklama, ikon, bağlantı
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-dark-600 border-dark-400">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2 flex items-center text-white">
                          <div className="w-8 h-8 bg-blue-500/10 rounded-md flex items-center justify-center mr-2">
                            <Boxes className="h-5 w-5 text-blue-400" />
                          </div>
                          Projeler
                        </h3>
                        <p className="text-sm text-white/70">
                          Proje içerik tipi: başlık, açıklama, resim, kategori, etiketler
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-dark-600 border-dark-400">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2 flex items-center text-white">
                          <div className="w-8 h-8 bg-purple-500/10 rounded-md flex items-center justify-center mr-2">
                            <Boxes className="h-5 w-5 text-purple-400" />
                          </div>
                          Blog Yazıları
                        </h3>
                        <p className="text-sm text-white/70">
                          Blog içerik tipi: başlık, içerik, yazar, tarih, kategori
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettingsManager;
