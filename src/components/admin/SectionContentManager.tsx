
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Check, FileText, Layout, LayoutGrid } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SectionContent {
  id?: number;
  servicesTitle: string;
  servicesSubtitle: string;
  servicesDescription: string;
  portfolioTitle?: string;
  portfolioSubtitle?: string;
  portfolioDescription?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  contactTitle?: string;
  contactSubtitle?: string;
  contactDescription?: string;
}

const SectionContentManager = () => {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('services');
  
  const { 
    items: sectionContents, 
    update: updateContent,
    add: addContent,
    isLoading 
  } = useDataService('sectionContent', [{
    id: 1,
    servicesTitle: 'HİZMETLERİMİZ',
    servicesSubtitle: 'Kapsamlı Dijital Çözümler',
    servicesDescription: 'İşletmenizin dijital dünyada büyümesi ve gelişmesi için eksiksiz dijital pazarlama hizmetleri sunuyoruz.',
    portfolioTitle: 'PORTFOLYO',
    portfolioSubtitle: 'Son Çalışmalarımız',
    portfolioDescription: 'Müşterilerimiz için gerçekleştirdiğimiz başarılı dijital projelerden bazı örnekler.',
    heroTitle: 'DİJİTALDE BÜYÜME ZAMANI',
    heroSubtitle: 'Dijital Pazarlama ve SEO Çözümleri',
    heroDescription: 'İşletmenizi dijital dünyada üst sıralara taşıyacak stratejiler geliştiriyoruz.',
    contactTitle: 'İLETİŞİM',
    contactSubtitle: 'Bize Ulaşın',
    contactDescription: 'Dijital pazarlama ihtiyaçlarınız için bizimle iletişime geçin.',
  }]);

  const [content, setContent] = useState<SectionContent>({
    servicesTitle: 'HİZMETLERİMİZ',
    servicesSubtitle: 'Kapsamlı Dijital Çözümler',
    servicesDescription: 'İşletmenizin dijital dünyada büyümesi ve gelişmesi için eksiksiz dijital pazarlama hizmetleri sunuyoruz.',
    portfolioTitle: 'PORTFOLYO',
    portfolioSubtitle: 'Son Çalışmalarımız',
    portfolioDescription: 'Müşterilerimiz için gerçekleştirdiğimiz başarılı dijital projelerden bazı örnekler.',
    heroTitle: 'DİJİTALDE BÜYÜME ZAMANI',
    heroSubtitle: 'Dijital Pazarlama ve SEO Çözümleri',
    heroDescription: 'İşletmenizi dijital dünyada üst sıralara taşıyacak stratejiler geliştiriyoruz.',
    contactTitle: 'İLETİŞİM',
    contactSubtitle: 'Bize Ulaşın',
    contactDescription: 'Dijital pazarlama ihtiyaçlarınız için bizimle iletişime geçin.',
  });

  useEffect(() => {
    if (sectionContents && sectionContents.length > 0) {
      setContent({
        ...sectionContents[0],
      });
    }
  }, [sectionContents]);

  const handleSave = () => {
    try {
      if (sectionContents && sectionContents.length > 0) {
        updateContent(sectionContents[0].id, { 
          ...content
        });
      } else {
        addContent({ 
          ...content
        });
      }
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
      
      toast({
        title: "Başarılı",
        description: "Bölüm içerikleri kaydedildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "İçerikler kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (section: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [`${section}${field}`]: value
    }));
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
            <FileText className="mr-2 h-6 w-6 text-ignite" />
            Bölüm İçerikleri
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Web sitenizdeki bölümlerin metinlerini düzenleyin
          </p>
        </div>
      </div>

      <Card className="bg-dark-500 border-dark-400 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-ignite/5 via-transparent to-transparent opacity-40 z-0" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-white">Bölüm Metinleri</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-dark-600 mb-4">
              <TabsTrigger value="services" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
                Hizmetler
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
                Portfolyo
              </TabsTrigger>
              <TabsTrigger value="hero" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
                Ana Bölüm
              </TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
                İletişim
              </TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Başlık</label>
                <Input 
                  value={content.servicesTitle}
                  onChange={(e) => handleChange('services', 'Title', e.target.value)}
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Alt Başlık</label>
                <Input 
                  value={content.servicesSubtitle}
                  onChange={(e) => handleChange('services', 'Subtitle', e.target.value)}
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Açıklama</label>
                <Textarea 
                  value={content.servicesDescription}
                  onChange={(e) => handleChange('services', 'Description', e.target.value)}
                  className="bg-dark-400 border-dark-300 min-h-[100px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Başlık</label>
                <Input 
                  value={content.portfolioTitle}
                  onChange={(e) => handleChange('portfolio', 'Title', e.target.value)}
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Alt Başlık</label>
                <Input 
                  value={content.portfolioSubtitle}
                  onChange={(e) => handleChange('portfolio', 'Subtitle', e.target.value)}
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Açıklama</label>
                <Textarea 
                  value={content.portfolioDescription}
                  onChange={(e) => handleChange('portfolio', 'Description', e.target.value)}
                  className="bg-dark-400 border-dark-300 min-h-[100px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="hero" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Başlık</label>
                <Input 
                  value={content.heroTitle}
                  onChange={(e) => handleChange('hero', 'Title', e.target.value)}
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Alt Başlık</label>
                <Input 
                  value={content.heroSubtitle}
                  onChange={(e) => handleChange('hero', 'Subtitle', e.target.value)}
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Açıklama</label>
                <Textarea 
                  value={content.heroDescription}
                  onChange={(e) => handleChange('hero', 'Description', e.target.value)}
                  className="bg-dark-400 border-dark-300 min-h-[100px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Başlık</label>
                <Input 
                  value={content.contactTitle}
                  onChange={(e) => handleChange('contact', 'Title', e.target.value)}
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Alt Başlık</label>
                <Input 
                  value={content.contactSubtitle}
                  onChange={(e) => handleChange('contact', 'Subtitle', e.target.value)}
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Açıklama</label>
                <Textarea 
                  value={content.contactDescription}
                  onChange={(e) => handleChange('contact', 'Description', e.target.value)}
                  className="bg-dark-400 border-dark-300 min-h-[100px]"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="pt-4 border-t border-dark-400 mt-4">
            <h3 className="font-medium text-white mb-4">Önizleme</h3>
            
            <div className="bg-dark-600 p-6 rounded-lg border border-dark-400">
              {activeTab === 'services' && (
                <div className="text-center">
                  <p className="text-sm text-ignite font-semibold">{content.servicesTitle}</p>
                  <h3 className="text-xl font-bold text-white mt-2">{content.servicesSubtitle}</h3>
                  <p className="text-white/70 mt-2">{content.servicesDescription}</p>
                </div>
              )}
              
              {activeTab === 'portfolio' && (
                <div className="text-center">
                  <p className="text-sm text-ignite font-semibold">{content.portfolioTitle}</p>
                  <h3 className="text-xl font-bold text-white mt-2">{content.portfolioSubtitle}</h3>
                  <p className="text-white/70 mt-2">{content.portfolioDescription}</p>
                </div>
              )}
              
              {activeTab === 'hero' && (
                <div className="text-center">
                  <p className="text-sm text-ignite font-semibold">{content.heroTitle}</p>
                  <h3 className="text-xl font-bold text-white mt-2">{content.heroSubtitle}</h3>
                  <p className="text-white/70 mt-2">{content.heroDescription}</p>
                </div>
              )}
              
              {activeTab === 'contact' && (
                <div className="text-center">
                  <p className="text-sm text-ignite font-semibold">{content.contactTitle}</p>
                  <h3 className="text-xl font-bold text-white mt-2">{content.contactSubtitle}</h3>
                  <p className="text-white/70 mt-2">{content.contactDescription}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button 
              onClick={handleSave} 
              className={`relative overflow-hidden ${isSaved ? 'bg-green-600 hover:bg-green-700' : 'bg-ignite hover:bg-ignite-700'}`}
              disabled={isLoading}
            >
              {isSaved ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Kaydedildi
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Kaydediliyor...' : 'İçerikleri Kaydet'}
                </>
              )}
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: '-100%' }}
                animate={isSaved ? { x: '100%' } : { x: '-100%' }}
                transition={{ duration: 0.5 }}
              />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SectionContentManager;
