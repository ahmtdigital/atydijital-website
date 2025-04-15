
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Save, Palette, Layout, Image, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';

const SiteSettingsManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('appearance');
  
  const { 
    items: siteSettings, 
    update: updateSettings,
    add: addSettings,
    isLoading 
  } = useDataService('siteSettings', [{
    id: 1,
    darkMode: true,
    glassmorphism: true,
    animationsEnabled: true,
    projectsPerRow: 2,
    projectImageHeight: 400,
    projectHoverEffect: 'scale',
    showProjectTags: true,
    showProjectCategory: true,
    showCaseStudies: true,
    caseStudiesAnimationType: 'fade',
    caseStudiesAutoplay: true,
    caseStudiesInterval: 5000,
  }]);

  const [settings, setSettings] = useState({
    darkMode: true,
    glassmorphism: true,
    animationsEnabled: true,
    projectsPerRow: 2,
    projectImageHeight: 400,
    projectHoverEffect: 'scale',
    showProjectTags: true,
    showProjectCategory: true,
    showCaseStudies: true,
    caseStudiesAnimationType: 'fade',
    caseStudiesAutoplay: true,
    caseStudiesInterval: 5000,
  });

  useEffect(() => {
    if (siteSettings && siteSettings.length > 0) {
      setSettings(siteSettings[0]);
    }
  }, [siteSettings]);

  const handleSave = () => {
    try {
      if (siteSettings && siteSettings.length > 0) {
        updateSettings(siteSettings[0].id, { ...settings });
      } else {
        addSettings({ ...settings });
      }
      
      toast({
        title: "Başarılı",
        description: "Site ayarları kaydedildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ayarlar kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
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
          <h2 className="text-2xl font-bold flex items-center">
            <Palette className="mr-2 h-6 w-6 text-ignite" />
            Site Ayarları
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Sitenizin görünümünü ve davranışını buradan özelleştirebilirsiniz
          </p>
        </div>
      </div>

      <Card className="bg-dark-500 border-dark-400">
        <CardHeader>
          <CardTitle>Görünüm ve Davranış Ayarları</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-dark-600">
              <TabsTrigger value="appearance">Genel Görünüm</TabsTrigger>
              <TabsTrigger value="projects">Proje Görünümü</TabsTrigger>
              <TabsTrigger value="casestudies">Vaka Çalışmaları</TabsTrigger>
              <TabsTrigger value="animations">Animasyonlar</TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Karanlık Mod</h3>
                  <p className="text-sm text-white/60">Site genelinde karanlık tema kullan</p>
                </div>
                <Switch 
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => setSettings({...settings, darkMode: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Cam Efekti (Glassmorphism)</h3>
                  <p className="text-sm text-white/60">Elementlerde cam efekti kullan</p>
                </div>
                <Switch 
                  checked={settings.glassmorphism}
                  onCheckedChange={(checked) => setSettings({...settings, glassmorphism: checked})}
                />
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Satır Başına Proje Sayısı</h3>
                  <Input 
                    type="number" 
                    value={settings.projectsPerRow}
                    onChange={(e) => setSettings({...settings, projectsPerRow: parseInt(e.target.value)})}
                    min={1}
                    max={4}
                    className="bg-dark-400 border-dark-300 w-32"
                  />
                </div>

                <div>
                  <h3 className="font-medium mb-2">Proje Resim Yüksekliği (px)</h3>
                  <Input 
                    type="number" 
                    value={settings.projectImageHeight}
                    onChange={(e) => setSettings({...settings, projectImageHeight: parseInt(e.target.value)})}
                    className="bg-dark-400 border-dark-300 w-32"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Etiketleri Göster</h3>
                    <p className="text-sm text-white/60">Proje kartlarında etiketleri görüntüle</p>
                  </div>
                  <Switch 
                    checked={settings.showProjectTags}
                    onCheckedChange={(checked) => setSettings({...settings, showProjectTags: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Kategoriyi Göster</h3>
                    <p className="text-sm text-white/60">Proje kartlarında kategori bilgisini görüntüle</p>
                  </div>
                  <Switch 
                    checked={settings.showProjectCategory}
                    onCheckedChange={(checked) => setSettings({...settings, showProjectCategory: checked})}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="casestudies" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Vaka Çalışmalarını Göster</h3>
                  <p className="text-sm text-white/60">Ana sayfada vaka çalışmaları bölümünü görüntüle</p>
                </div>
                <Switch 
                  checked={settings.showCaseStudies}
                  onCheckedChange={(checked) => setSettings({...settings, showCaseStudies: checked})}
                />
              </div>

              <div>
                <h3 className="font-medium mb-2">Animasyon Tipi</h3>
                <select 
                  value={settings.caseStudiesAnimationType}
                  onChange={(e) => setSettings({...settings, caseStudiesAnimationType: e.target.value})}
                  className="bg-dark-400 border-dark-300 rounded-md p-2 w-full"
                >
                  <option value="fade">Solma Efekti</option>
                  <option value="slide">Kayma Efekti</option>
                  <option value="zoom">Yakınlaşma Efekti</option>
                  <option value="flip">Çevirme Efekti</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Otomatik Oynat</h3>
                  <p className="text-sm text-white/60">Vaka çalışmalarını otomatik olarak değiştir</p>
                </div>
                <Switch 
                  checked={settings.caseStudiesAutoplay}
                  onCheckedChange={(checked) => setSettings({...settings, caseStudiesAutoplay: checked})}
                />
              </div>

              <div>
                <h3 className="font-medium mb-2">Değişim Aralığı (ms)</h3>
                <Input 
                  type="number" 
                  value={settings.caseStudiesInterval}
                  onChange={(e) => setSettings({...settings, caseStudiesInterval: parseInt(e.target.value)})}
                  min={1000}
                  max={10000}
                  step={500}
                  className="bg-dark-400 border-dark-300 w-32"
                />
              </div>
            </TabsContent>

            <TabsContent value="animations" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Animasyonları Etkinleştir</h3>
                  <p className="text-sm text-white/60">Site genelinde animasyonları kullan</p>
                </div>
                <Switch 
                  checked={settings.animationsEnabled}
                  onCheckedChange={(checked) => setSettings({...settings, animationsEnabled: checked})}
                />
              </div>

              <div>
                <h3 className="font-medium mb-2">Proje Hover Efekti</h3>
                <select 
                  value={settings.projectHoverEffect}
                  onChange={(e) => setSettings({...settings, projectHoverEffect: e.target.value})}
                  className="bg-dark-400 border-dark-300 rounded-md p-2 w-full"
                >
                  <option value="scale">Büyütme Efekti</option>
                  <option value="slide">Kayma Efekti</option>
                  <option value="fade">Solma Efekti</option>
                  <option value="none">Efekt Yok</option>
                </select>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleSave} 
              className="bg-ignite hover:bg-ignite-700"
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SiteSettingsManager;
