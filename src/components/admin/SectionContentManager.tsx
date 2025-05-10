
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Save } from 'lucide-react';

// Define proper type for section content
interface SectionContent {
  id: number;
  servicesTitle: string;
  servicesSubtitle: string;
  servicesDescription: string;
  portfolioTitle: string;
  portfolioSubtitle: string;
  portfolioDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  contactTitle: string;
  contactSubtitle: string;
  contactDescription: string;
}

const SectionContentManager = () => {
  const { toast } = useToast();
  const { items: sectionContentItems, update, create } = useDataService('sectionContent', [
    {
      id: 1,
      servicesTitle: 'Hizmetlerimiz',
      servicesSubtitle: 'İşinizi Büyütmenize Yardımcı Oluyoruz',
      servicesDescription: 'Dijital pazarlama, web tasarım ve içerik stratejisi alanlarında uzmanlaşmış ekibimizle işletmenizin online varlığını güçlendiriyoruz.',
      portfolioTitle: 'Portföyümüz',
      portfolioSubtitle: 'Son Projelerimiz',
      portfolioDescription: 'Farklı sektörlerden müşterilerimiz için gerçekleştirdiğimiz başarılı projelerimizi inceleyin.',
      heroTitle: 'Dijital Dünyada İşinizi Büyütün',
      heroSubtitle: 'Stratejik Dijital Pazarlama Çözümleri',
      heroDescription: 'Markanızı dijital dünyada öne çıkaracak stratejik çözümler sunuyoruz.',
      contactTitle: 'Bizimle İletişime Geçin',
      contactSubtitle: 'Projeniz Hakkında Konuşalım',
      contactDescription: 'Dijital başarı yolculuğunuza başlamak için bizimle iletişime geçin.'
    }
  ]);

  const sectionContent = sectionContentItems.length > 0 ? sectionContentItems[0] : null;
  
  const [formData, setFormData] = useState<SectionContent>(sectionContent || {
    id: 1,
    servicesTitle: '',
    servicesSubtitle: '',
    servicesDescription: '',
    portfolioTitle: '',
    portfolioSubtitle: '',
    portfolioDescription: '',
    heroTitle: '',
    heroSubtitle: '',
    heroDescription: '',
    contactTitle: '',
    contactSubtitle: '',
    contactDescription: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof SectionContent, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSaveContent = async () => {
    setIsLoading(true);
    try {
      if (sectionContent) {
        await update(formData.id, formData);
      } else {
        await create({
          servicesTitle: formData.servicesTitle,
          servicesSubtitle: formData.servicesSubtitle,
          servicesDescription: formData.servicesDescription,
          portfolioTitle: formData.portfolioTitle,
          portfolioSubtitle: formData.portfolioSubtitle,
          portfolioDescription: formData.portfolioDescription,
          heroTitle: formData.heroTitle,
          heroSubtitle: formData.heroSubtitle,
          heroDescription: formData.heroDescription,
          contactTitle: formData.contactTitle,
          contactSubtitle: formData.contactSubtitle,
          contactDescription: formData.contactDescription
        });
      }
      
      toast({
        title: "Başarılı",
        description: "Bölüm içerikleri başarıyla güncellendi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bölüm içerikleri güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-dark-500 border-dark-400">
      <CardHeader className="border-b border-dark-400">
        <CardTitle className="text-white">Bölüm İçeriklerini Düzenle</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        {/* Hero Section Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Ana Sayfa Hero Alanı</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Başlık</label>
              <Input
                value={formData.heroTitle}
                onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Alt Başlık</label>
              <Input
                value={formData.heroSubtitle}
                onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Açıklama</label>
            <Textarea
              value={formData.heroDescription}
              onChange={(e) => handleInputChange('heroDescription', e.target.value)}
              className="bg-dark-400 border-dark-300 text-white"
              rows={3}
            />
          </div>
        </div>

        {/* Services Section Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Hizmetler Bölümü</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Başlık</label>
              <Input
                value={formData.servicesTitle}
                onChange={(e) => handleInputChange('servicesTitle', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Alt Başlık</label>
              <Input
                value={formData.servicesSubtitle}
                onChange={(e) => handleInputChange('servicesSubtitle', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Açıklama</label>
            <Textarea
              value={formData.servicesDescription}
              onChange={(e) => handleInputChange('servicesDescription', e.target.value)}
              className="bg-dark-400 border-dark-300 text-white"
              rows={3}
            />
          </div>
        </div>

        {/* Portfolio Section Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Portföy Bölümü</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Başlık</label>
              <Input
                value={formData.portfolioTitle}
                onChange={(e) => handleInputChange('portfolioTitle', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Alt Başlık</label>
              <Input
                value={formData.portfolioSubtitle}
                onChange={(e) => handleInputChange('portfolioSubtitle', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Açıklama</label>
            <Textarea
              value={formData.portfolioDescription}
              onChange={(e) => handleInputChange('portfolioDescription', e.target.value)}
              className="bg-dark-400 border-dark-300 text-white"
              rows={3}
            />
          </div>
        </div>

        {/* Contact Section Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">İletişim Bölümü</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Başlık</label>
              <Input
                value={formData.contactTitle}
                onChange={(e) => handleInputChange('contactTitle', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Alt Başlık</label>
              <Input
                value={formData.contactSubtitle}
                onChange={(e) => handleInputChange('contactSubtitle', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Açıklama</label>
            <Textarea
              value={formData.contactDescription}
              onChange={(e) => handleInputChange('contactDescription', e.target.value)}
              className="bg-dark-400 border-dark-300 text-white"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSaveContent} 
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
                İçerikleri Kaydet
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionContentManager;
