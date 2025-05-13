
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, Share2, Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from 'lucide-react';

interface SocialMedia {
  id: number;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  github?: string;
  showInHeader?: boolean;
  showInFooter?: boolean;
}

const SocialMediaSettings = () => {
  const { toast } = useToast();
  const { items: socialMediaItems, update } = useDataService('socialMedia', [
    {
      id: 1,
      facebook: 'https://facebook.com/atydigital',
      twitter: 'https://twitter.com/atydigital',
      instagram: 'https://instagram.com/atydigital',
      linkedin: 'https://linkedin.com/company/atydigital',
      youtube: 'https://youtube.com/c/atydigital',
      github: '',
      showInHeader: true,
      showInFooter: true
    }
  ]);

  const socialMedia = socialMediaItems.length > 0 ? socialMediaItems[0] : null;
  
  const [formData, setFormData] = useState<SocialMedia>(socialMedia || {
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

  const handleInputChange = (field: keyof SocialMedia, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await update(formData.id, formData);
      
      toast({
        title: "Başarılı",
        description: "Sosyal medya ayarları başarıyla güncellendi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Sosyal medya ayarları güncellenirken bir hata oluştu.",
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
          <Share2 className="h-5 w-5 text-ignite" />
          Sosyal Medya Ayarları
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Facebook className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <Label className="text-white mb-1 block">Facebook</Label>
                <Input
                  value={formData.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/sayfaniz"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Twitter className="h-5 w-5 text-blue-400" />
              <div className="flex-1">
                <Label className="text-white mb-1 block">Twitter</Label>
                <Input
                  value={formData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/kullaniciadiniz"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Instagram className="h-5 w-5 text-pink-500" />
              <div className="flex-1">
                <Label className="text-white mb-1 block">Instagram</Label>
                <Input
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/kullaniciadiniz"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Linkedin className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <Label className="text-white mb-1 block">LinkedIn</Label>
                <Input
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/sirketiniz"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Youtube className="h-5 w-5 text-red-500" />
              <div className="flex-1">
                <Label className="text-white mb-1 block">YouTube</Label>
                <Input
                  value={formData.youtube}
                  onChange={(e) => handleInputChange('youtube', e.target.value)}
                  placeholder="https://youtube.com/c/kanaliniz"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Github className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <Label className="text-white mb-1 block">GitHub</Label>
                <Input
                  value={formData.github}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  placeholder="https://github.com/kullaniciadiniz"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-dark-400 pt-6 flex flex-col md:flex-row gap-6 items-start">
          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.showInHeader}
              onCheckedChange={(checked) => handleInputChange('showInHeader', checked)}
              id="showInHeader"
            />
            <Label htmlFor="showInHeader" className="text-white">
              Header'da Göster
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.showInFooter}
              onCheckedChange={(checked) => handleInputChange('showInFooter', checked)}
              id="showInFooter"
            />
            <Label htmlFor="showInFooter" className="text-white">
              Footer'da Göster
            </Label>
          </div>
          
          <div className="ml-auto">
            <Button 
              onClick={handleSave} 
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
      </CardContent>
    </Card>
  );
};

export default SocialMediaSettings;
