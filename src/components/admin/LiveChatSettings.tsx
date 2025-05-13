
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, MessageSquare } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface LiveChatSettings {
  id: number;
  enabled: boolean;
  position: string;
  primaryColor: string;
  agentName: string;
  agentTitle: string;
  agentAvatar: string;
  welcomeMessage: string;
  offlineMessage: string;
  autoResponseTime: number;
  showOnMobile: boolean;
}

const LiveChatSettings = () => {
  const { toast } = useToast();
  const { items: chatSettings, update } = useDataService('liveChat', [
    {
      id: 1,
      enabled: true,
      position: 'bottom-right',
      primaryColor: '#FF6B00',
      agentName: 'ATY Digital Destek',
      agentTitle: 'Müşteri Temsilcisi',
      agentAvatar: '',
      welcomeMessage: 'Merhaba! Size nasıl yardımcı olabiliriz?',
      offlineMessage: 'Şu anda çevrimiçi değiliz. Lütfen bir mesaj bırakın, size en kısa sürede dönüş yapacağız.',
      autoResponseTime: 5,
      showOnMobile: true
    }
  ]);

  const settings = chatSettings.length > 0 ? chatSettings[0] : null;
  
  const [formData, setFormData] = useState<LiveChatSettings>(settings || {
    id: 1,
    enabled: false,
    position: 'bottom-right',
    primaryColor: '#FF6B00',
    agentName: '',
    agentTitle: '',
    agentAvatar: '',
    welcomeMessage: '',
    offlineMessage: '',
    autoResponseTime: 5,
    showOnMobile: true
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof LiveChatSettings, value: string | boolean | number) => {
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
        description: "Canlı destek ayarları başarıyla güncellendi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Canlı destek ayarları güncellenirken bir hata oluştu.",
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
          <MessageSquare className="h-5 w-5 text-ignite" />
          Canlı Destek Ayarları
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="flex items-center space-x-2 mb-2">
          <Switch
            checked={formData.enabled}
            onCheckedChange={(checked) => handleInputChange('enabled', checked)}
            id="enableChat"
          />
          <Label htmlFor="enableChat" className="text-white">
            Canlı Destek Sistemini Etkinleştir
          </Label>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-white mb-1 block">Konum</Label>
              <Select 
                value={formData.position} 
                onValueChange={(value) => handleInputChange('position', value)}
                disabled={!formData.enabled}
              >
                <SelectTrigger className="bg-dark-400 border-dark-300 text-white">
                  <SelectValue placeholder="Konum Seçin" />
                </SelectTrigger>
                <SelectContent className="bg-dark-400 border-dark-300 text-white">
                  <SelectItem value="bottom-right">Sağ Alt</SelectItem>
                  <SelectItem value="bottom-left">Sol Alt</SelectItem>
                  <SelectItem value="top-right">Sağ Üst</SelectItem>
                  <SelectItem value="top-left">Sol Üst</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-white mb-1 block">Ana Renk</Label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                  className="w-16 h-10 p-1 bg-dark-400 border-dark-300"
                  disabled={!formData.enabled}
                />
                <Input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                  className="flex-1 bg-dark-400 border-dark-300 text-white"
                  disabled={!formData.enabled}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-white mb-1 block">Temsilci Adı</Label>
              <Input
                value={formData.agentName}
                onChange={(e) => handleInputChange('agentName', e.target.value)}
                placeholder="Destek Ekibi"
                className="bg-dark-400 border-dark-300 text-white"
                disabled={!formData.enabled}
              />
            </div>
            
            <div>
              <Label className="text-white mb-1 block">Temsilci Ünvanı</Label>
              <Input
                value={formData.agentTitle}
                onChange={(e) => handleInputChange('agentTitle', e.target.value)}
                placeholder="Müşteri Temsilcisi"
                className="bg-dark-400 border-dark-300 text-white"
                disabled={!formData.enabled}
              />
            </div>
          </div>
          
          <div>
            <Label className="text-white mb-1 block">Temsilci Avatar URL</Label>
            <Input
              value={formData.agentAvatar}
              onChange={(e) => handleInputChange('agentAvatar', e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="bg-dark-400 border-dark-300 text-white"
              disabled={!formData.enabled}
            />
          </div>
          
          <div>
            <Label className="text-white mb-1 block">Karşılama Mesajı</Label>
            <Textarea
              value={formData.welcomeMessage}
              onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
              placeholder="Merhaba! Size nasıl yardımcı olabiliriz?"
              className="bg-dark-400 border-dark-300 text-white"
              rows={3}
              disabled={!formData.enabled}
            />
          </div>
          
          <div>
            <Label className="text-white mb-1 block">Çevrimdışı Mesaj</Label>
            <Textarea
              value={formData.offlineMessage}
              onChange={(e) => handleInputChange('offlineMessage', e.target.value)}
              placeholder="Şu anda çevrimiçi değiliz. Lütfen bir mesaj bırakın, size en kısa sürede dönüş yapacağız."
              className="bg-dark-400 border-dark-300 text-white"
              rows={3}
              disabled={!formData.enabled}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-white mb-1 block">Otomatik Yanıt Süresi (dakika)</Label>
              <Input
                type="number"
                value={formData.autoResponseTime}
                onChange={(e) => handleInputChange('autoResponseTime', parseInt(e.target.value))}
                className="bg-dark-400 border-dark-300 text-white"
                disabled={!formData.enabled}
                min={1}
                max={60}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.showOnMobile}
                onCheckedChange={(checked) => handleInputChange('showOnMobile', checked)}
                id="showOnMobile"
                disabled={!formData.enabled}
              />
              <Label htmlFor="showOnMobile" className="text-white">
                Mobil Cihazlarda Göster
              </Label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-4 border-t border-dark-400">
          <Button 
            onClick={handleSave} 
            disabled={isLoading || !formData.enabled}
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
      </CardContent>
    </Card>
  );
};

export default LiveChatSettings;
