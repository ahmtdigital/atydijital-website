
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDataService } from '@/lib/db';
import { MessageSquare, Save, Check } from 'lucide-react';
import { ChromePicker } from 'react-color';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

interface LiveChatSettings {
  id?: number;
  enabled: boolean;
  position: string;
  primaryColor: string;
  buttonText: string;
  welcomeMessage: string;
  agentName: string;
  agentTitle: string;
  agentAvatar: string;
  offlineMessage: string;
  workingHours: string;
  emailNotifications: boolean;
  notificationEmail: string;
}

const defaultSettings: LiveChatSettings = {
  enabled: false,
  position: 'bottom-right',
  primaryColor: '#FF6B00',
  buttonText: 'Canlı Destek',
  welcomeMessage: 'Merhaba! Size nasıl yardımcı olabilirim?',
  agentName: 'Destek Ekibi',
  agentTitle: 'Müşteri Temsilcisi',
  agentAvatar: '',
  offlineMessage: 'Şu anda çevrimdışıyız. Lütfen mesaj bırakın, size en kısa sürede dönüş yapacağız.',
  workingHours: '09:00 - 18:00, Pazartesi - Cuma',
  emailNotifications: false,
  notificationEmail: ''
};

const LiveChatSettings = () => {
  const { toast } = useToast();
  const { items: chatSettings, update, add } = useDataService<LiveChatSettings>('liveChat', [defaultSettings]);
  
  const [settings, setSettings] = useState<LiveChatSettings>(defaultSettings);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (chatSettings && chatSettings.length > 0) {
      setSettings(chatSettings[0]);
    }
  }, [chatSettings]);

  const handleInputChange = (key: keyof LiveChatSettings, value: string | boolean) => {
    setSettings({...settings, [key]: value});
  };

  const handleColorChange = (color: { hex: string }) => {
    setSettings({...settings, primaryColor: color.hex});
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      if (chatSettings && chatSettings.length > 0 && chatSettings[0].id) {
        await update(chatSettings[0].id, settings);
      } else {
        await add(settings);
      }
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
      
      toast({
        title: "Başarılı",
        description: "Canlı destek ayarları kaydedildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Canlı destek ayarları kaydedilirken bir sorun oluştu.",
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
          <MessageSquare className="mr-2 h-5 w-5 text-ignite" />
          Canlı Destek Ayarları
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableChat" className="text-white">
                Canlı Destek Aktif
              </Label>
              <p className="text-sm text-gray-400">Sitenizde canlı destek özelliğini etkinleştirin.</p>
            </div>
            <Switch
              id="enableChat"
              checked={settings.enabled}
              onCheckedChange={(checked) => handleInputChange('enabled', checked)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Pozisyon</Label>
                <Select
                  value={settings.position}
                  onValueChange={(value) => handleInputChange('position', value)}
                  disabled={!settings.enabled}
                >
                  <SelectTrigger className="bg-dark-400 border-dark-300 text-white">
                    <SelectValue placeholder="Butonun konumunu seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-600 border-dark-300">
                    <SelectItem value="bottom-right">Sağ Alt</SelectItem>
                    <SelectItem value="bottom-left">Sol Alt</SelectItem>
                    <SelectItem value="top-right">Sağ Üst</SelectItem>
                    <SelectItem value="top-left">Sol Üst</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Buton Metni</Label>
                <Input
                  value={settings.buttonText}
                  onChange={(e) => handleInputChange('buttonText', e.target.value)}
                  placeholder="Canlı Destek"
                  className="bg-dark-400 border-dark-300 text-white"
                  disabled={!settings.enabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Renk</Label>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-10 h-10 rounded border border-dark-300 cursor-pointer"
                    style={{ backgroundColor: settings.primaryColor }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  ></div>
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    className="bg-dark-400 border-dark-300 text-white"
                    disabled={!settings.enabled}
                  />
                </div>
                {showColorPicker && (
                  <div className="absolute z-10 mt-2">
                    <div
                      className="fixed inset-0"
                      onClick={() => setShowColorPicker(false)}
                    ></div>
                    <ChromePicker
                      color={settings.primaryColor}
                      onChange={handleColorChange}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Karşılama Mesajı</Label>
                <Textarea
                  value={settings.welcomeMessage}
                  onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
                  placeholder="Merhaba! Size nasıl yardımcı olabilirim?"
                  className="bg-dark-400 border-dark-300 text-white resize-none"
                  rows={2}
                  disabled={!settings.enabled}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Temsilci Adı</Label>
                <Input
                  value={settings.agentName}
                  onChange={(e) => handleInputChange('agentName', e.target.value)}
                  placeholder="Destek Ekibi"
                  className="bg-dark-400 border-dark-300 text-white"
                  disabled={!settings.enabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Temsilci Ünvanı</Label>
                <Input
                  value={settings.agentTitle}
                  onChange={(e) => handleInputChange('agentTitle', e.target.value)}
                  placeholder="Müşteri Temsilcisi"
                  className="bg-dark-400 border-dark-300 text-white"
                  disabled={!settings.enabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Temsilci Avatar URL'si</Label>
                <Input
                  value={settings.agentAvatar}
                  onChange={(e) => handleInputChange('agentAvatar', e.target.value)}
                  placeholder="/img/avatar.jpg"
                  className="bg-dark-400 border-dark-300 text-white"
                  disabled={!settings.enabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Çalışma Saatleri</Label>
                <Input
                  value={settings.workingHours}
                  onChange={(e) => handleInputChange('workingHours', e.target.value)}
                  placeholder="09:00 - 18:00, Pazartesi - Cuma"
                  className="bg-dark-400 border-dark-300 text-white"
                  disabled={!settings.enabled}
                />
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-dark-400">
            <div className="space-y-2">
              <Label className="text-white">Çevrimdışı Mesajı</Label>
              <Textarea
                value={settings.offlineMessage}
                onChange={(e) => handleInputChange('offlineMessage', e.target.value)}
                placeholder="Şu anda çevrimdışıyız. Lütfen mesaj bırakın, size en kısa sürede dönüş yapacağız."
                className="bg-dark-400 border-dark-300 text-white resize-none"
                rows={2}
                disabled={!settings.enabled}
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-dark-400">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Label htmlFor="emailNotifications" className="text-white">
                  E-posta Bildirimleri
                </Label>
                <p className="text-sm text-gray-400">Yeni mesaj geldiğinde e-posta bildirimi alın.</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                disabled={!settings.enabled}
              />
            </div>
            
            {settings.emailNotifications && (
              <div className="space-y-2">
                <Label className="text-white">Bildirim E-postası</Label>
                <Input
                  value={settings.notificationEmail}
                  onChange={(e) => handleInputChange('notificationEmail', e.target.value)}
                  type="email"
                  placeholder="bildirim@atydigital.com.tr"
                  className="bg-dark-400 border-dark-300 text-white"
                  disabled={!settings.enabled}
                />
              </div>
            )}
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={isLoading || !settings.enabled}
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
                  {isLoading ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
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

export default LiveChatSettings;
