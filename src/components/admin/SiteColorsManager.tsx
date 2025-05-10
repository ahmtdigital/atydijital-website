import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Palette, Check, PaintBucket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';

interface ColorSettings {
  id?: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  darkMode: boolean;
  glassmorphism: boolean;
}

const SiteColorsManager = () => {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  
  const { 
    items: siteSettings, 
    update: updateSettings,
    add: addSettings,
    isLoading 
  } = useDataService('siteSettings', [{
    id: 1,
    primaryColor: '#FF6B00',
    secondaryColor: '#FFA133',
    accentColor: '#FF8A00',
    textColor: '#FFFFFF',
    darkMode: true,
    glassmorphism: true,
  }]);

  const [colors, setColors] = useState<ColorSettings>({
    primaryColor: '#FF6B00',
    secondaryColor: '#FFA133',
    accentColor: '#FF8A00',
    textColor: '#FFFFFF',
    darkMode: true,
    glassmorphism: true,
  });

  useEffect(() => {
    if (siteSettings && siteSettings.length > 0) {
      setColors({
        primaryColor: siteSettings[0].primaryColor || '#FF6B00',
        secondaryColor: siteSettings[0].secondaryColor || '#FFA133',
        accentColor: siteSettings[0].accentColor || '#FF8A00',
        textColor: siteSettings[0].textColor || '#FFFFFF',
        darkMode: siteSettings[0].darkMode !== undefined ? siteSettings[0].darkMode : true,
        glassmorphism: siteSettings[0].glassmorphism !== undefined ? siteSettings[0].glassmorphism : true,
      });
    }
  }, [siteSettings]);

  const handleSave = () => {
    try {
      if (siteSettings && siteSettings.length > 0) {
        updateSettings(siteSettings[0].id, { 
          ...siteSettings[0],
          primaryColor: colors.primaryColor,
          secondaryColor: colors.secondaryColor,
          accentColor: colors.accentColor,
          textColor: colors.textColor,
          darkMode: colors.darkMode,
          glassmorphism: colors.glassmorphism,
        });
      } else {
        // Fix: Remove projectsPerRow and other properties from the object
        addSettings({ 
          ...colors,
          // These fields will be added by the backend with default values
        });
      }
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
      
      // Update CSS variables in real-time
      document.documentElement.style.setProperty('--gradient-color-1', colors.primaryColor);
      document.documentElement.style.setProperty('--gradient-color-2', colors.secondaryColor);
      document.documentElement.style.setProperty('--ignite', colors.primaryColor);
      document.documentElement.style.setProperty('--text-color', colors.textColor);
      
      toast({
        title: "Başarılı",
        description: "Renk ayarları kaydedildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ayarlar kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const updateColor = (colorName: keyof ColorSettings, value: string) => {
    setColors(prev => ({ ...prev, [colorName]: value }));
    
    // Preview color in real-time
    if (colorName === 'primaryColor') {
      document.documentElement.style.setProperty('--gradient-color-1', value);
      document.documentElement.style.setProperty('--ignite', value);
    } else if (colorName === 'secondaryColor') {
      document.documentElement.style.setProperty('--gradient-color-2', value);
    } else if (colorName === 'textColor') {
      document.documentElement.style.setProperty('--text-color', value);
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
          <h2 className="text-2xl font-bold flex items-center text-white">
            <Palette className="mr-2 h-6 w-6 text-ignite" />
            Site Renkleri
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Sitenizin renklerini özelleştirin
          </p>
        </div>
      </div>

      <Card className="bg-dark-500 border-dark-400 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-ignite/5 via-transparent to-transparent opacity-40 z-0" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-white">Renk Şeması</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 flex items-center">
                <PaintBucket className="h-4 w-4 mr-2 text-ignite" />
                Ana Renk
              </label>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-md border border-dark-300"
                  style={{ backgroundColor: colors.primaryColor }}
                />
                <Input 
                  type="text"
                  value={colors.primaryColor}
                  onChange={(e) => updateColor('primaryColor', e.target.value)}
                  className="bg-dark-400 border-dark-300 w-full"
                />
                <Input 
                  type="color"
                  value={colors.primaryColor}
                  onChange={(e) => updateColor('primaryColor', e.target.value)}
                  className="w-10 h-10 p-1 bg-transparent border-none"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 flex items-center">
                <PaintBucket className="h-4 w-4 mr-2 text-ignite" />
                İkincil Renk
              </label>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-md border border-dark-300"
                  style={{ backgroundColor: colors.secondaryColor }}
                />
                <Input 
                  type="text"
                  value={colors.secondaryColor}
                  onChange={(e) => updateColor('secondaryColor', e.target.value)}
                  className="bg-dark-400 border-dark-300 w-full"
                />
                <Input 
                  type="color"
                  value={colors.secondaryColor}
                  onChange={(e) => updateColor('secondaryColor', e.target.value)}
                  className="w-10 h-10 p-1 bg-transparent border-none"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 flex items-center">
                <PaintBucket className="h-4 w-4 mr-2 text-ignite" />
                Vurgu Rengi
              </label>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-md border border-dark-300"
                  style={{ backgroundColor: colors.accentColor }}
                />
                <Input 
                  type="text"
                  value={colors.accentColor}
                  onChange={(e) => updateColor('accentColor', e.target.value)}
                  className="bg-dark-400 border-dark-300 w-full"
                />
                <Input 
                  type="color"
                  value={colors.accentColor}
                  onChange={(e) => updateColor('accentColor', e.target.value)}
                  className="w-10 h-10 p-1 bg-transparent border-none"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 flex items-center">
                <PaintBucket className="h-4 w-4 mr-2 text-ignite" />
                Metin Rengi
              </label>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-md border border-dark-300"
                  style={{ backgroundColor: colors.textColor }}
                />
                <Input 
                  type="text"
                  value={colors.textColor}
                  onChange={(e) => updateColor('textColor', e.target.value)}
                  className="bg-dark-400 border-dark-300 w-full"
                />
                <Input 
                  type="color"
                  value={colors.textColor}
                  onChange={(e) => updateColor('textColor', e.target.value)}
                  className="w-10 h-10 p-1 bg-transparent border-none"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-dark-400 mt-4">
            <h3 className="font-medium text-white mb-4">Renk Önizleme</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className="p-6 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.primaryColor }}
              >
                <span className="text-white font-bold">Ana Renk</span>
              </div>
              
              <div 
                className="p-6 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.secondaryColor }}
              >
                <span className="text-white font-bold">İkincil Renk</span>
              </div>
              
              <div 
                className="p-6 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.accentColor }}
              >
                <span className="text-white font-bold">Vurgu Rengi</span>
              </div>
              
              <div className="md:col-span-3 bg-dark-600 p-6 rounded-lg">
                <h4 
                  className="text-xl font-bold mb-2"
                  style={{ color: colors.textColor }}
                >
                  Metin Başlık Örneği
                </h4>
                <p 
                  className="opacity-80"
                  style={{ color: colors.textColor }}
                >
                  Bu bir örnek metin paragrafıdır. Belirlediğiniz metin rengi burada görüntülenir.
                </p>
                <div className="mt-4">
                  <button 
                    className="px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: colors.primaryColor }}
                  >
                    Örnek Buton
                  </button>
                </div>
              </div>
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
                  {isLoading ? 'Kaydediliyor...' : 'Renkleri Kaydet'}
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

export default SiteColorsManager;
