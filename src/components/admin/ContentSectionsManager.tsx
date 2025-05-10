
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, PenSquare, Check, LayoutGrid } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';

interface SectionContent {
  id?: number;
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroButtonLink: string;
  servicesTitle: string;
  servicesSubtitle: string;
  servicesDescription: string;
  toolsTitle: string;
  toolsSubtitle: string;
  toolsDescription: string;
  portfolioTitle: string;
  portfolioSubtitle: string;
  portfolioDescription: string;
  caseStudiesTitle: string;
  caseStudiesSubtitle: string;
  caseStudiesDescription: string;
  contactTitle: string;
  contactSubtitle: string;
  contactDescription: string;
}

const defaultContent: SectionContent = {
  heroTitle: 'Dijital Dünyada Markanızı Büyütün',
  heroSubtitle: 'SEO ve Dijital Pazarlama Çözümleri',
  heroButtonText: 'Hemen Başlayın',
  heroButtonLink: '/contact',
  servicesTitle: 'HİZMETLERİMİZ',
  servicesSubtitle: 'Kapsamlı Dijital Çözümler',
  servicesDescription: 'İşletmenizin dijital dünyada büyümesi ve gelişmesi için eksiksiz dijital pazarlama hizmetleri sunuyoruz.',
  toolsTitle: 'KULLANDIĞIMIZ ARAÇLAR',
  toolsSubtitle: 'En İyi Pazarlama Araçları',
  toolsDescription: 'Güncel ve etkin araçlarla markanızı zirveye taşıyoruz.',
  portfolioTitle: 'PROJELERİMİZ',
  portfolioSubtitle: 'Son Çalışmalarımız',
  portfolioDescription: 'Müşterilerimiz için geliştirdiğimiz en güncel projelerimize göz atın.',
  caseStudiesTitle: 'BAŞARI HİKAYELERİ',
  caseStudiesSubtitle: 'Müşterilerimizin Başarıları',
  caseStudiesDescription: 'Müşterilerimizin bizimle elde ettiği sonuçları ve başarı hikayelerini keşfedin.',
  contactTitle: 'BİZE ULAŞIN',
  contactSubtitle: 'Projenizi Hayata Geçirelim',
  contactDescription: 'Dijital pazarlama ihtiyaçlarınız için bizimle iletişime geçin.',
};

const ContentSectionsManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('hero');
  const [isSaved, setIsSaved] = useState(false);
  
  const { 
    items: contentSettings, 
    update: updateSettings,
    add: addSettings,
    isLoading 
  } = useDataService<SectionContent>('sectionContent', [defaultContent]);

  const [content, setContent] = useState<SectionContent>(defaultContent);

  useEffect(() => {
    if (contentSettings && contentSettings.length > 0) {
      setContent(contentSettings[0]);
    }
  }, [contentSettings]);

  const handleSave = () => {
    try {
      if (contentSettings && contentSettings.length > 0) {
        updateSettings(contentSettings[0].id!, content);
      } else {
        addSettings(content);
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

  const handleChange = (key: keyof SectionContent, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
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
            <LayoutGrid className="mr-2 h-6 w-6 text-ignite" />
            Bölüm İçerikleri
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Web sitenizdeki bölüm başlıklarını ve metinlerini düzenleyin
          </p>
        </div>
      </div>

      <Card className="bg-dark-500 border-dark-400 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-ignite/5 via-transparent to-transparent opacity-40 z-0" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-white">Bölüm İçerikleri</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-dark-600 mb-6 overflow-x-auto flex-wrap">
              <TabsTrigger value="hero" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
                Hero
              </TabsTrigger>
              <TabsTrigger value="services" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
                Hizmetler
              </TabsTrigger>
              <TabsTrigger value="tools" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
                Araçlar
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
                Portfolyo
              </TabsTrigger>
              <TabsTrigger value="casestudies" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
                Başarı Hikayeleri
              </TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-ignite data-[state=active]:text-white">
                İletişim
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hero" className="space-y-4 mt-4">
              <div className="bg-dark-600/50 rounded-lg p-4 border border-dark-400 space-y-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Ana Başlık</label>
                  <Input 
                    value={content.heroTitle}
                    onChange={(e) => handleChange('heroTitle', e.target.value)}
                    className="bg-dark-400 border-dark-300"
                    placeholder="Ana başlık metni"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Alt Başlık</label>
                  <Input 
                    value={content.heroSubtitle}
                    onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                    className="bg-dark-400 border-dark-300"
                    placeholder="Alt başlık metni"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white/80 mb-1 block">Buton Metni</label>
                    <Input 
                      value={content.heroButtonText}
                      onChange={(e) => handleChange('heroButtonText', e.target.value)}
                      className="bg-dark-400 border-dark-300"
                      placeholder="Buton metni"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-white/80 mb-1 block">Buton Bağlantısı</label>
                    <Input 
                      value={content.heroButtonLink}
                      onChange={(e) => handleChange('heroButtonLink', e.target.value)}
                      className="bg-dark-400 border-dark-300"
                      placeholder="/contact"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-4 mt-4">
              <div className="bg-dark-600/50 rounded-lg p-4 border border-dark-400 space-y-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Üst Başlık</label>
                  <Input 
                    value={content.servicesTitle}
                    onChange={(e) => handleChange('servicesTitle', e.target.value)}
                    className="bg-dark-400 border-dark-300"
                    placeholder="Üst başlık metni"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Ana Başlık</label>
                  <Input 
                    value={content.servicesSubtitle}
                    onChange={(e) => handleChange('servicesSubtitle', e.target.value)}
                    className="bg-dark-400 border-dark-300"
                    placeholder="Ana başlık metni"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Açıklama</label>
                  <Textarea 
                    value={content.servicesDescription}
                    onChange={(e) => handleChange('servicesDescription', e.target.value)}
                    className="bg-dark-400 border-dark-300 resize-none"
                    placeholder="Açıklama metni"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-4 mt-4">
              <div className="bg-dark-600/50 rounded-lg p-4 border border-dark-400 space-y-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Üst Başlık</label>
                  <Input 
                    value={content.toolsTitle}
                    onChange={(e) => handleChange('toolsTitle', e.target.value)}
                    className="bg-dark-400 border-dark-300"
                    placeholder="Üst başlık metni"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Ana Başlık</label>
                  <Input 
                    value={content.toolsSubtitle}
                    onChange={(e) => handleChange('toolsSubtitle', e.target.value)}
                    className="bg-dark-400 border-dark-300"
                    placeholder="Ana başlık metni"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Açıklama</label>
                  <Textarea 
                    value={content.toolsDescription}
                    onChange={(e) => handleChange('toolsDescription', e.target.value)}
                    className="bg-dark-400 border-dark-300 resize-none"
                    placeholder="Açıklama metni"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-4 mt-4">
              <div className="bg-dark-600/50 rounded-lg p-4 border border-dark-400 space-y-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Üst Başlık</label>
                  <Input 
                    value={content.portfolioTitle}
                    onChange={(e) => handleChange('portfolioTitle', e.target.value)}
                    className="bg-dark-400 border-dark-300"
                    placeholder="Üst başlık metni"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Ana Başlık</label>
                  <Input 
                    value={content.portfolioSubtitle}
                    onChange={(e) => handleChange('portfolioSubtitle', e.target.value)}
                    className="bg-dark-400 border-dark-300"
                    placeholder="Ana başlık metni"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Açıklama</label>
                  <Textarea 
                    value={content.portfolioDescription}
                    onChange={(e) => handleChange('portfolioDescription', e.target.value)}
                    className="bg-dark-400 border-dark-300 resize-none"
                    placeholder="Açıklama metni"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="casestudies" className="space-y-4 mt-4">
              <div className="bg-dark-600/50 rounded-lg p-4 border border-dark-400 space-y-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Üst Başlık</label>
                  <Input 
                    value={content.caseStudiesTitle}
                    onChange={(e) => handleChange('caseStudiesTitle', e.target.value)}
                    className="bg-dark-400 border-dark-300"
                    placeholder="Üst başlık metni"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Ana Başlık</label>
                  <Input 
                    value={content.caseStudiesSubtitle}
                    onChange={(e) => handleChange('caseStudiesSubtitle', e.target.value)}
                    className="bg-dark-400 border-dark-300"
                    placeholder="Ana başlık metni"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Açıklama</label>
                  <Textarea 
                    value={content.caseStudiesDescription}
                    onChange={(e) => handleChange('caseStudiesDescription', e.target.value)}
                    className="bg-dark-400 border-dark-300 resize-none"
                    placeholder="Açıklama metni"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-4">
              <div className="bg-dark-600/50 rounded-lg p-4 border border-dark-400 space-y-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Üst Başlık</label>
                  <Input 
                    value={content.contactTitle}
                    onChange={(e) => handleChange('contactTitle', e.target.value)}
                    className="bg-dark-400 border-dark-300"
                    placeholder="Üst başlık metni"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Ana Başlık</label>
                  <Input 
                    value={content.contactSubtitle}
                    onChange={(e) => handleChange('contactSubtitle', e.target.value)}
                    className="bg-dark-400 border-dark-300"
                    placeholder="Ana başlık metni"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1 block">Açıklama</label>
                  <Textarea 
                    value={content.contactDescription}
                    onChange={(e) => handleChange('contactDescription', e.target.value)}
                    className="bg-dark-400 border-dark-300 resize-none"
                    placeholder="Açıklama metni"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
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

export default ContentSectionsManager;
