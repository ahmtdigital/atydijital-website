
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Facebook, Instagram, Linkedin, Twitter, Github, Youtube, Save, Check } from 'lucide-react';
import { useDataService } from '@/lib/db';
import { motion } from 'framer-motion';

interface SocialMediaData {
  id?: number;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  github?: string;
  showInHeader?: boolean;
  showInFooter?: boolean;
}

const defaultData: SocialMediaData = {
  facebook: 'https://facebook.com/atydigital',
  twitter: 'https://twitter.com/atydigital',
  instagram: 'https://instagram.com/atydigital',
  linkedin: 'https://linkedin.com/company/atydigital',
  youtube: '',
  github: '',
  showInHeader: true,
  showInFooter: true
};

const SocialMediaSettings = () => {
  const { toast } = useToast();
  const { items: socialMediaItems, update, add } = useDataService<SocialMediaData>('socialMedia', [defaultData]);
  
  const [formData, setFormData] = useState<SocialMediaData>(
    socialMediaItems.length > 0 ? socialMediaItems[0] : defaultData
  );
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (key: keyof SocialMediaData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      if (socialMediaItems.length > 0 && socialMediaItems[0].id) {
        await update(socialMediaItems[0].id, formData);
      } else {
        await add(formData);
      }
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
      
      toast({
        title: "Başarılı",
        description: "Sosyal medya ayarları kaydedildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ayarlar kaydedilirken bir sorun oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-dark-500 border-dark-400">
      <CardHeader className="border-b border-dark-400">
        <CardTitle className="text-white flex items-center">
          <Facebook className="mr-2 h-5 w-5 text-ignite" />
          Sosyal Medya Ayarları
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white flex items-center">
                  <Facebook className="mr-2 h-4 w-4 text-blue-500" />
                  Facebook URL
                </Label>
                <Input
                  value={formData.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/sirketiniz"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white flex items-center">
                  <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                  Twitter URL
                </Label>
                <Input
                  value={formData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/sirketiniz"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white flex items-center">
                  <Instagram className="mr-2 h-4 w-4 text-pink-500" />
                  Instagram URL
                </Label>
                <Input
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/sirketiniz"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white flex items-center">
                  <Linkedin className="mr-2 h-4 w-4 text-blue-600" />
                  LinkedIn URL
                </Label>
                <Input
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/sirketiniz"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white flex items-center">
                  <Youtube className="mr-2 h-4 w-4 text-red-500" />
                  YouTube URL
                </Label>
                <Input
                  value={formData.youtube}
                  onChange={(e) => handleInputChange('youtube', e.target.value)}
                  placeholder="https://youtube.com/c/sirketiniz"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white flex items-center">
                  <Github className="mr-2 h-4 w-4 text-gray-300" />
                  GitHub URL
                </Label>
                <Input
                  value={formData.github}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  placeholder="https://github.com/sirketiniz"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-dark-400">
            <h3 className="text-white font-medium">Görünürlük Ayarları</h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="showInHeader" className="text-white">
                Header'da Sosyal Medya İkonlarını Göster
              </Label>
              <Switch
                id="showInHeader"
                checked={formData.showInHeader}
                onCheckedChange={(checked) => handleInputChange('showInHeader', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="showInFooter" className="text-white">
                Footer'da Sosyal Medya İkonlarını Göster
              </Label>
              <Switch
                id="showInFooter" 
                checked={formData.showInFooter}
                onCheckedChange={(checked) => handleInputChange('showInFooter', checked)}
              />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={isLoading}
              className={`relative overflow-hidden ${isSaved ? 'bg-green-600 hover:bg-green-700' : 'bg-ignite hover:bg-ignite-700'} text-white`}
            >
              {isSaved ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Kaydedildi
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaSettings;
