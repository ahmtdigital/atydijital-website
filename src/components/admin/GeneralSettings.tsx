
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDataService } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';
import { Save, Mail, Phone, MapPin, Globe, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const GeneralSettings = () => {
  const { toast } = useToast();
  const { items: settings, update } = useDataService('siteSettings', [{
    id: 1,
    siteTitle: 'Ignite Pazarlama',
    siteDescription: 'Dijital pazarlama ve web tasarım hizmetleri',
    logoUrl: '/logo.svg',
    favicon: '/favicon.ico',
    primaryColor: '#ff6b00',
    secondaryColor: '#2d3748',
    footerText: '© 2023 Ignite Pazarlama. Tüm hakları saklıdır.',
    contactEmail: 'info@ignitepazarlama.com',
    contactPhone: '+90 (212) 123 4567',
    contactAddress: 'İstanbul, Türkiye',
    socialLinks: {
      facebook: 'https://facebook.com/ignitepazarlama',
      twitter: 'https://twitter.com/ignitepazarlama',
      instagram: 'https://instagram.com/ignitepazarlama',
      linkedin: 'https://linkedin.com/company/ignitepazarlama',
      youtube: 'https://youtube.com/c/ignitepazarlama'
    },
    metaTags: {
      title: 'Ignite Pazarlama | Dijital Pazarlama ve Web Tasarım',
      description: 'Markanızı büyütmek için dijital pazarlama ve web tasarım çözümleri',
      keywords: 'dijital pazarlama, web tasarım, seo, sosyal medya'
    }
  }]);

  const currentSettings = settings[0] || {};
  const [formData, setFormData] = useState(currentSettings);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [platform]: value
      }
    });
  };

  const handleMetaTagChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      metaTags: {
        ...formData.metaTags,
        [field]: value
      }
    });
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      await update(formData.id, formData);
      toast({
        title: "Ayarlar Kaydedildi",
        description: "Genel site ayarları başarıyla güncellendi.",
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

  return (
    <div className="space-y-6">
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <Globe className="mr-2 h-5 w-5 text-ignite" />
            Temel Bilgiler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Site Başlığı</label>
              <Input
                value={formData.siteTitle}
                onChange={(e) => handleInputChange('siteTitle', e.target.value)}
                className="bg-dark-400 border-dark-300"
                placeholder="Site Başlığı"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Site Açıklaması</label>
              <Input
                value={formData.siteDescription}
                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                className="bg-dark-400 border-dark-300"
                placeholder="Site Açıklaması"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Logo URL</label>
              <Input
                value={formData.logoUrl}
                onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                className="bg-dark-400 border-dark-300"
                placeholder="/logo.svg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Favicon URL</label>
              <Input
                value={formData.favicon}
                onChange={(e) => handleInputChange('favicon', e.target.value)}
                className="bg-dark-400 border-dark-300"
                placeholder="/favicon.ico"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ana Renk</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                  className="w-12 h-10 p-1 bg-dark-400 border-dark-300"
                />
                <Input
                  value={formData.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                  className="bg-dark-400 border-dark-300"
                  placeholder="#ff6b00"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">İkincil Renk</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={formData.secondaryColor}
                  onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                  className="w-12 h-10 p-1 bg-dark-400 border-dark-300"
                />
                <Input
                  value={formData.secondaryColor}
                  onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                  className="bg-dark-400 border-dark-300"
                  placeholder="#2d3748"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Footer Metni</label>
            <Input
              value={formData.footerText}
              onChange={(e) => handleInputChange('footerText', e.target.value)}
              className="bg-dark-400 border-dark-300"
              placeholder="© 2023 Ignite Pazarlama. Tüm hakları saklıdır."
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-dark-500 border-dark-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <Mail className="mr-2 h-5 w-5 text-ignite" />
            İletişim Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Mail className="mr-2 h-4 w-4" /> E-posta Adresi
              </label>
              <Input
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                className="bg-dark-400 border-dark-300"
                placeholder="info@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Phone className="mr-2 h-4 w-4" /> Telefon Numarası
              </label>
              <Input
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                className="bg-dark-400 border-dark-300"
                placeholder="+90 (212) 123 4567"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <MapPin className="mr-2 h-4 w-4" /> Adres
            </label>
            <Textarea
              value={formData.contactAddress}
              onChange={(e) => handleInputChange('contactAddress', e.target.value)}
              className="bg-dark-400 border-dark-300 resize-none"
              placeholder="Adres bilgisi"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-dark-500 border-dark-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <Facebook className="mr-2 h-5 w-5 text-ignite" />
            Sosyal Medya Bağlantıları
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Facebook className="mr-2 h-4 w-4 text-blue-500" /> Facebook
              </label>
              <Input
                value={formData.socialLinks?.facebook || ''}
                onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                className="bg-dark-400 border-dark-300"
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Twitter className="mr-2 h-4 w-4 text-blue-400" /> Twitter
              </label>
              <Input
                value={formData.socialLinks?.twitter || ''}
                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                className="bg-dark-400 border-dark-300"
                placeholder="https://twitter.com/yourhandle"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Instagram className="mr-2 h-4 w-4 text-pink-500" /> Instagram
              </label>
              <Input
                value={formData.socialLinks?.instagram || ''}
                onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                className="bg-dark-400 border-dark-300"
                placeholder="https://instagram.com/yourprofile"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Linkedin className="mr-2 h-4 w-4 text-blue-600" /> LinkedIn
              </label>
              <Input
                value={formData.socialLinks?.linkedin || ''}
                onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                className="bg-dark-400 border-dark-300"
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Youtube className="mr-2 h-4 w-4 text-red-500" /> YouTube
              </label>
              <Input
                value={formData.socialLinks?.youtube || ''}
                onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
                className="bg-dark-400 border-dark-300"
                placeholder="https://youtube.com/c/yourchannel"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-dark-500 border-dark-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <Globe className="mr-2 h-5 w-5 text-ignite" />
            SEO Meta Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Meta Başlık</label>
            <Input
              value={formData.metaTags?.title || ''}
              onChange={(e) => handleMetaTagChange('title', e.target.value)}
              className="bg-dark-400 border-dark-300"
              placeholder="Sitenizin meta başlığı"
            />
            <p className="text-xs text-white/50">Arama motorlarında görünen ana başlık.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Meta Açıklama</label>
            <Textarea
              value={formData.metaTags?.description || ''}
              onChange={(e) => handleMetaTagChange('description', e.target.value)}
              className="bg-dark-400 border-dark-300 resize-none"
              placeholder="Sitenizin meta açıklaması"
              rows={2}
            />
            <p className="text-xs text-white/50">Arama motorlarında başlığın altında görünen kısa açıklama.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Anahtar Kelimeler</label>
            <Input
              value={formData.metaTags?.keywords || ''}
              onChange={(e) => handleMetaTagChange('keywords', e.target.value)}
              className="bg-dark-400 border-dark-300"
              placeholder="anahtar,kelime,örnek"
            />
            <p className="text-xs text-white/50">Virgülle ayrılmış anahtar kelimeler.</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings} 
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
              Ayarları Kaydet
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default GeneralSettings;
