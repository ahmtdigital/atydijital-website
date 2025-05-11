
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, MessageSquare, Clock, UserRound, AlertTriangle, Palette } from 'lucide-react';
import { useDataService } from '@/lib/db';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LiveChatSettings {
  id: number;
  enabled: boolean;
  welcomeMessage: string;
  offlineMessage: string;
  agentName: string;
  agentTitle: string;
  agentAvatar: string;
  position: string;
  autoResponse: boolean;
  primaryColor: string;
  chatButtonText: string;
  workingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  }
}

const LiveChatSettings = () => {
  const { toast } = useToast();
  const { items: liveChatItems, update } = useDataService('liveChat', [
    {
      id: 1,
      enabled: true,
      welcomeMessage: 'Hoş geldiniz! Size nasıl yardımcı olabilirim?',
      offlineMessage: 'Şu anda çevrimdışıyız. Lütfen mesaj bırakın, size en kısa sürede dönüş yapacağız.',
      agentName: 'Ali Yılmaz',
      agentTitle: 'Müşteri Temsilcisi',
      agentAvatar: '/images/agent-avatar.jpg',
      position: 'bottom-right',
      autoResponse: true,
      primaryColor: '#FF6B00',
      chatButtonText: 'Canlı Destek',
      workingHours: {
        monday: '09:00-18:00',
        tuesday: '09:00-18:00',
        wednesday: '09:00-18:00',
        thursday: '09:00-18:00',
        friday: '09:00-18:00',
        saturday: '10:00-14:00',
        sunday: 'Kapalı'
      }
    }
  ]);

  const liveChat = liveChatItems.length > 0 ? liveChatItems[0] : null;
  
  const [formData, setFormData] = useState<LiveChatSettings>(liveChat || {
    id: 1,
    enabled: false,
    welcomeMessage: '',
    offlineMessage: '',
    agentName: '',
    agentTitle: '',
    agentAvatar: '',
    position: 'bottom-right',
    autoResponse: false,
    primaryColor: '#FF6B00',
    chatButtonText: 'Canlı Destek',
    workingHours: {
      monday: '09:00-18:00',
      tuesday: '09:00-18:00',
      wednesday: '09:00-18:00',
      thursday: '09:00-18:00',
      friday: '09:00-18:00',
      saturday: '10:00-14:00',
      sunday: 'Kapalı'
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof LiveChatSettings],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  const handleSaveLiveChat = async () => {
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
    <div className="space-y-6">
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader className="border-b border-dark-400">
          <CardTitle className="text-white flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-ignite" />
            Canlı Destek Ayarları
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="p-4 border border-amber-600/30 rounded-md bg-amber-600/10 flex gap-3 items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div className="text-sm text-amber-200">
              <p><strong>Bu özellik beta sürümündedir.</strong></p>
              <p>Canlı destek özelliğini kullanmak için destek panelini ayrıca açmanız gerekmektedir. Mesajları görüntülemek ve yanıtlamak için admin panelindeki Canlı Destek sekmesini kullanabilirsiniz.</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch 
              id="chatEnabled" 
              checked={formData.enabled} 
              onCheckedChange={(checked) => handleInputChange('enabled', checked)}
              className="data-[state=checked]:bg-ignite"
            />
            <Label htmlFor="chatEnabled" className="text-white">Canlı Desteği Etkinleştir</Label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-ignite" />
                Mesaj Ayarları
              </h3>
              
              <div className="space-y-2">
                <Label className="text-white">Karşılama Mesajı</Label>
                <Textarea
                  value={formData.welcomeMessage}
                  onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
                  placeholder="Ziyaretçilere görüntülenecek karşılama mesajı"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Çevrimdışı Mesaj</Label>
                <Textarea
                  value={formData.offlineMessage}
                  onChange={(e) => handleInputChange('offlineMessage', e.target.value)}
                  placeholder="Çevrimdışı olduğunuzda görüntülenecek mesaj"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Chat Buton Metni</Label>
                <Input
                  value={formData.chatButtonText}
                  onChange={(e) => handleInputChange('chatButtonText', e.target.value)}
                  placeholder="Canlı Destek"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <UserRound className="h-4 w-4 text-ignite" />
                Temsilci Bilgileri
              </h3>
              
              <div className="space-y-2">
                <Label className="text-white">Temsilci Adı</Label>
                <Input
                  value={formData.agentName}
                  onChange={(e) => handleInputChange('agentName', e.target.value)}
                  placeholder="Temsilci adı"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Temsilci Ünvanı</Label>
                <Input
                  value={formData.agentTitle}
                  onChange={(e) => handleInputChange('agentTitle', e.target.value)}
                  placeholder="Ünvan (örn: Müşteri Temsilcisi)"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Temsilci Avatarı</Label>
                <Input
                  value={formData.agentAvatar}
                  onChange={(e) => handleInputChange('agentAvatar', e.target.value)}
                  placeholder="/images/avatar.jpg"
                  className="bg-dark-400 border-dark-300 text-white"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <Palette className="h-4 w-4 text-ignite" />
                Görünüm Ayarları
              </h3>
              
              <div className="space-y-2">
                <Label className="text-white">Ana Renk</Label>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded" style={{ backgroundColor: formData.primaryColor }}></div>
                  <Input
                    type="text"
                    value={formData.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    placeholder="#FF6B00"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Chat Pozisyonu</Label>
                <Select 
                  value={formData.position} 
                  onValueChange={(value) => handleInputChange('position', value)}
                >
                  <SelectTrigger className="bg-dark-400 border-dark-300 text-white">
                    <SelectValue placeholder="Pozisyon seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-400 border-dark-300">
                    <SelectItem value="bottom-right" className="text-white hover:bg-dark-500">Sağ Alt</SelectItem>
                    <SelectItem value="bottom-left" className="text-white hover:bg-dark-500">Sol Alt</SelectItem>
                    <SelectItem value="top-right" className="text-white hover:bg-dark-500">Sağ Üst</SelectItem>
                    <SelectItem value="top-left" className="text-white hover:bg-dark-500">Sol Üst</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="autoResponse" 
                  checked={formData.autoResponse} 
                  onCheckedChange={(checked) => handleInputChange('autoResponse', checked)}
                  className="data-[state=checked]:bg-ignite"
                />
                <Label htmlFor="autoResponse" className="text-white">Otomatik Yanıt Etkinleştir</Label>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-ignite" />
                Çalışma Saatleri
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-white text-sm">Pazartesi</Label>
                  <Input
                    value={formData.workingHours.monday}
                    onChange={(e) => handleInputChange('workingHours.monday', e.target.value)}
                    placeholder="09:00-18:00"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label className="text-white text-sm">Salı</Label>
                  <Input
                    value={formData.workingHours.tuesday}
                    onChange={(e) => handleInputChange('workingHours.tuesday', e.target.value)}
                    placeholder="09:00-18:00"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label className="text-white text-sm">Çarşamba</Label>
                  <Input
                    value={formData.workingHours.wednesday}
                    onChange={(e) => handleInputChange('workingHours.wednesday', e.target.value)}
                    placeholder="09:00-18:00"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label className="text-white text-sm">Perşembe</Label>
                  <Input
                    value={formData.workingHours.thursday}
                    onChange={(e) => handleInputChange('workingHours.thursday', e.target.value)}
                    placeholder="09:00-18:00"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label className="text-white text-sm">Cuma</Label>
                  <Input
                    value={formData.workingHours.friday}
                    onChange={(e) => handleInputChange('workingHours.friday', e.target.value)}
                    placeholder="09:00-18:00"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label className="text-white text-sm">Cumartesi</Label>
                  <Input
                    value={formData.workingHours.saturday}
                    onChange={(e) => handleInputChange('workingHours.saturday', e.target.value)}
                    placeholder="10:00-14:00"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>
                
                <div className="space-y-1 col-span-2">
                  <Label className="text-white text-sm">Pazar</Label>
                  <Input
                    value={formData.workingHours.sunday}
                    onChange={(e) => handleInputChange('workingHours.sunday', e.target.value)}
                    placeholder="Kapalı"
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleSaveLiveChat} 
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
              Canlı Destek Ayarlarını Kaydet
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default LiveChatSettings;
