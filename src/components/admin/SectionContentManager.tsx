
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Save, FileText, Brush, Rocket, Menu, Phone, Layout, FileImage } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

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
  heroButtonText: string;
  heroButtonLink: string;
  contactTitle: string;
  contactSubtitle: string;
  contactDescription: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutDescription: string;
  testimonialTitle: string;
  testimonialSubtitle: string;
  blogTitle: string;
  blogSubtitle: string;
  blogDescription: string;
  callToActionTitle: string;
  callToActionSubtitle: string;
  callToActionButtonText: string;
}

const SectionContentManager = () => {
  const { toast } = useToast();
  const { items: sectionContentItems, update } = useDataService('sectionContent', [
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
      heroButtonText: 'Hizmetleri İncele',
      heroButtonLink: '/services',
      contactTitle: 'Bizimle İletişime Geçin',
      contactSubtitle: 'Projeniz Hakkında Konuşalım',
      contactDescription: 'Dijital başarı yolculuğunuza başlamak için bizimle iletişime geçin.',
      aboutTitle: 'Hakkımızda',
      aboutSubtitle: 'Biz Kimiz',
      aboutDescription: 'Dijital alanda uzman ekibimizle markaların online varlığını güçlendiriyoruz.',
      testimonialTitle: 'Müşterilerimizin Yorumları',
      testimonialSubtitle: 'Bizimle Çalışanlar Ne Diyor?',
      blogTitle: 'Blog',
      blogSubtitle: 'Son Yazılarımız',
      blogDescription: 'Dijital pazarlama ve web tasarımı alanında güncel makaleler ve ipuçları.',
      callToActionTitle: 'Projenizi Hayata Geçirmeye Hazır Mısınız?',
      callToActionSubtitle: 'Hemen İletişime Geçin',
      callToActionButtonText: 'Ücretsiz Teklif Alın'
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
    heroButtonText: '',
    heroButtonLink: '',
    contactTitle: '',
    contactSubtitle: '',
    contactDescription: '',
    aboutTitle: '',
    aboutSubtitle: '',
    aboutDescription: '',
    testimonialTitle: '',
    testimonialSubtitle: '',
    blogTitle: '',
    blogSubtitle: '',
    blogDescription: '',
    callToActionTitle: '',
    callToActionSubtitle: '',
    callToActionButtonText: ''
  });
  
  const [activeTab, setActiveTab] = useState('hero');
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
      await update(formData.id, formData);
      
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
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-ignite" />
          Sayfa Bölüm İçeriklerini Düzenle
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-dark-600 mb-4 w-full overflow-x-auto flex-wrap">
            <TabsTrigger value="hero" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
              <Layout className="h-4 w-4" />
              Ana Sayfa Hero
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
              <Rocket className="h-4 w-4" />
              Hizmetler
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
              <FileImage className="h-4 w-4" />
              Portföy
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
              <Brush className="h-4 w-4" />
              Hakkımızda
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
              <Menu className="h-4 w-4" />
              Yorumlar
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="cta" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
              <Rocket className="h-4 w-4" />
              Çağrı Butonu
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              İletişim
            </TabsTrigger>
          </TabsList>
          
          {/* Hero Section Content */}
          <TabsContent value="hero" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Başlık</Label>
                <Input
                  value={formData.heroTitle}
                  onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Alt Başlık</Label>
                <Input
                  value={formData.heroSubtitle}
                  onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Açıklama</Label>
              <Textarea
                value={formData.heroDescription}
                onChange={(e) => handleInputChange('heroDescription', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Buton Metni</Label>
                <Input
                  value={formData.heroButtonText}
                  onChange={(e) => handleInputChange('heroButtonText', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Buton Linki</Label>
                <Input
                  value={formData.heroButtonLink}
                  onChange={(e) => handleInputChange('heroButtonLink', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
          </TabsContent>

          {/* Services Section Content */}
          <TabsContent value="services" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Başlık</Label>
                <Input
                  value={formData.servicesTitle}
                  onChange={(e) => handleInputChange('servicesTitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Alt Başlık</Label>
                <Input
                  value={formData.servicesSubtitle}
                  onChange={(e) => handleInputChange('servicesSubtitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Açıklama</Label>
              <Textarea
                value={formData.servicesDescription}
                onChange={(e) => handleInputChange('servicesDescription', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
                rows={3}
              />
            </div>
          </TabsContent>

          {/* Portfolio Section Content */}
          <TabsContent value="portfolio" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Başlık</Label>
                <Input
                  value={formData.portfolioTitle}
                  onChange={(e) => handleInputChange('portfolioTitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Alt Başlık</Label>
                <Input
                  value={formData.portfolioSubtitle}
                  onChange={(e) => handleInputChange('portfolioSubtitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Açıklama</Label>
              <Textarea
                value={formData.portfolioDescription}
                onChange={(e) => handleInputChange('portfolioDescription', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
                rows={3}
              />
            </div>
          </TabsContent>

          {/* About Section Content */}
          <TabsContent value="about" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Başlık</Label>
                <Input
                  value={formData.aboutTitle}
                  onChange={(e) => handleInputChange('aboutTitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Alt Başlık</Label>
                <Input
                  value={formData.aboutSubtitle}
                  onChange={(e) => handleInputChange('aboutSubtitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Açıklama</Label>
              <Textarea
                value={formData.aboutDescription}
                onChange={(e) => handleInputChange('aboutDescription', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
                rows={3}
              />
            </div>
          </TabsContent>

          {/* Testimonials Section Content */}
          <TabsContent value="testimonials" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Başlık</Label>
                <Input
                  value={formData.testimonialTitle}
                  onChange={(e) => handleInputChange('testimonialTitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Alt Başlık</Label>
                <Input
                  value={formData.testimonialSubtitle}
                  onChange={(e) => handleInputChange('testimonialSubtitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
          </TabsContent>

          {/* Blog Section Content */}
          <TabsContent value="blog" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Başlık</Label>
                <Input
                  value={formData.blogTitle}
                  onChange={(e) => handleInputChange('blogTitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Alt Başlık</Label>
                <Input
                  value={formData.blogSubtitle}
                  onChange={(e) => handleInputChange('blogSubtitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Açıklama</Label>
              <Textarea
                value={formData.blogDescription}
                onChange={(e) => handleInputChange('blogDescription', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
                rows={3}
              />
            </div>
          </TabsContent>

          {/* Call to Action Section Content */}
          <TabsContent value="cta" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Başlık</Label>
                <Input
                  value={formData.callToActionTitle}
                  onChange={(e) => handleInputChange('callToActionTitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Alt Başlık</Label>
                <Input
                  value={formData.callToActionSubtitle}
                  onChange={(e) => handleInputChange('callToActionSubtitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Buton Metni</Label>
              <Input
                value={formData.callToActionButtonText}
                onChange={(e) => handleInputChange('callToActionButtonText', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
          </TabsContent>

          {/* Contact Section Content */}
          <TabsContent value="contact" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Başlık</Label>
                <Input
                  value={formData.contactTitle}
                  onChange={(e) => handleInputChange('contactTitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Alt Başlık</Label>
                <Input
                  value={formData.contactSubtitle}
                  onChange={(e) => handleInputChange('contactSubtitle', e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Açıklama</Label>
              <Textarea
                value={formData.contactDescription}
                onChange={(e) => handleInputChange('contactDescription', e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
                rows={3}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
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
