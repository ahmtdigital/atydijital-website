
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from 'lucide-react';
import { useDataService } from '@/lib/db';

interface SocialMediaData {
  id: number;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  github: string;
  showInHeader: boolean;
  showInFooter: boolean;
}

const SocialMediaSettings = () => {
  const { toast } = useToast();
  const { items: socialMediaItems, update } = useDataService('socialMedia', [
    {
      id: 1,
      facebook: 'https://facebook.com/ignitepazarlama',
      twitter: 'https://twitter.com/ignitepazarlama',
      instagram: 'https://instagram.com/ignitepazarlama',
      linkedin: 'https://linkedin.com/company/ignitepazarlama',
      youtube: 'https://youtube.com/channel/ignitepazarlama',
      github: 'https://github.com/ignitepazarlama',
      showInHeader: true,
      showInFooter: true
    }
  ]);

  const socialMedia = socialMediaItems.length > 0 ? socialMediaItems[0] : null;
  
  const [formData, setFormData] = useState<SocialMediaData>(socialMedia || {
    id: 1,
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    github: '',
    showInHeader: true,
    showInFooter: true
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof SocialMediaData, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSaveSocialMedia = async () => {
    setIsLoading(true);
    try {
      await update(formData.id, formData);
      
      toast({
        title: "Başarılı",
        description: "Sosyal medya bağlantıları başarıyla güncellendi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Sosyal medya bağlantıları güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-dark-500 border-dark-400">
      <CardHeader className="border-b border-dark-400">
        <CardTitle className="text-white">Sosyal Medya Bağlantıları</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <Facebook className="h-4 w-4 text-blue-500" />
                Facebook URL
              </Label>
              <Input
                value={formData.facebook}
                onChange={(e) => handleInputChange('facebook', e.target.value)}
                placeholder="https://facebook.com/sayfaniz"
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <Twitter className="h-4 w-4 text-blue-400" />
                Twitter URL
              </Label>
              <Input
                value={formData.twitter}
                onChange={(e) => handleInputChange('twitter', e.target.value)}
                placeholder="https://twitter.com/kullaniciadiniz"
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <Instagram className="h-4 w-4 text-pink-500" />
                Instagram URL
              </Label>
              <Input
                value={formData.instagram}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
                placeholder="https://instagram.com/kullaniciadiniz"
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-blue-600" />
                LinkedIn URL
              </Label>
              <Input
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/sirketadiniz"
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <Youtube className="h-4 w-4 text-red-600" />
                Youtube URL
              </Label>
              <Input
                value={formData.youtube}
                onChange={(e) => handleInputChange('youtube', e.target.value)}
                placeholder="https://youtube.com/channel/kanaliniz"
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <Github className="h-4 w-4 text-gray-300" />
                Github URL
              </Label>
              <Input
                value={formData.github}
                onChange={(e) => handleInputChange('github', e.target.value)}
                placeholder="https://github.com/kullaniciadiniz"
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <h3 className="text-lg font-medium text-white">Görünürlük Ayarları</h3>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="showInHeader" 
                checked={formData.showInHeader}
                onCheckedChange={(checked) => handleInputChange('showInHeader', checked)}
                className="data-[state=checked]:bg-ignite"
              />
              <Label htmlFor="showInHeader" className="text-white">Header'da göster</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="showInFooter" 
                checked={formData.showInFooter}
                onCheckedChange={(checked) => handleInputChange('showInFooter', checked)} 
                className="data-[state=checked]:bg-ignite"
              />
              <Label htmlFor="showInFooter" className="text-white">Footer'da göster</Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSaveSocialMedia} 
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
                Sosyal Medyayı Kaydet
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaSettings;
