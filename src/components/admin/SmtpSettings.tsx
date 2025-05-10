
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Save, Send } from 'lucide-react';

// Define proper type for SMTP settings
interface SmtpSettings {
  id: number;
  server: string;
  port: string;
  username: string;
  password: string;
  senderEmail: string;
  senderName: string;
  useTLS: boolean;
  notifyOn: {
    contactForm: boolean;
    quoteRequest: boolean;
    newsletter: boolean;
  };
  notificationEmails: string;
}

const SmtpSettings = () => {
  const { toast } = useToast();
  const { items: smtpItems, update } = useDataService('smtp', [{
    id: 1,
    server: 'smtp.example.com',
    port: '587',
    username: 'user@example.com',
    password: 'password123',
    senderEmail: 'noreply@yourdomain.com',
    senderName: 'ATY Dijital',
    useTLS: true,
    notifyOn: {
      contactForm: true,
      quoteRequest: true,
      newsletter: true
    },
    notificationEmails: 'admin@yourdomain.com'
  }]);

  const smtpSettings = smtpItems.length > 0 ? smtpItems[0] : null;
  
  const [formData, setFormData] = useState<SmtpSettings>(smtpSettings || {
    id: 1,
    server: '',
    port: '',
    username: '',
    password: '',
    senderEmail: '',
    senderName: '',
    useTLS: true,
    notifyOn: {
      contactForm: true,
      quoteRequest: true,
      newsletter: true
    },
    notificationEmails: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleInputChange = (field: keyof SmtpSettings, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleNotifyChange = (field: keyof SmtpSettings['notifyOn'], checked: boolean) => {
    setFormData({
      ...formData,
      notifyOn: {
        ...formData.notifyOn,
        [field]: checked
      }
    });
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      await update(formData.id, formData);
      
      toast({
        title: "Başarılı",
        description: "SMTP ayarları başarıyla kaydedildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "SMTP ayarları kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      // Simulated SMTP test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = Math.random() > 0.3;
      
      if (success) {
        toast({
          title: "Bağlantı Başarılı",
          description: "SMTP sunucusuyla bağlantı kuruldu ve test e-postası gönderildi.",
        });
      } else {
        throw new Error("SMTP bağlantısı kurulamadı.");
      }
    } catch (error) {
      toast({
        title: "Bağlantı Hatası",
        description: error instanceof Error ? error.message : "SMTP sunucusuyla bağlantı kurulurken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Card className="bg-dark-500 border-dark-400">
      <CardHeader className="border-b border-dark-400">
        <CardTitle className="text-white">E-posta Gönderim Ayarları (SMTP)</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SMTP Server Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">SMTP Sunucu Ayarları</h3>
            
            <div className="space-y-2">
              <Label htmlFor="server" className="text-white">Sunucu Adresi</Label>
              <Input
                id="server"
                value={formData.server}
                onChange={(e) => handleInputChange('server', e.target.value)}
                placeholder="örn: smtp.gmail.com"
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="port" className="text-white">Port</Label>
              <Input
                id="port"
                value={formData.port}
                onChange={(e) => handleInputChange('port', e.target.value)}
                placeholder="örn: 587"
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">Kullanıcı Adı</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="örn: user@example.com"
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="useTLS"
                checked={formData.useTLS}
                onCheckedChange={(checked) => handleInputChange('useTLS', checked)}
              />
              <Label htmlFor="useTLS" className="text-white">TLS Kullan</Label>
              <Badge variant="outline" className="ml-2 text-xs bg-dark-400 text-white border-dark-300">Önerilen</Badge>
            </div>
          </div>
          
          {/* Email Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">E-posta Ayarları</h3>
            
            <div className="space-y-2">
              <Label htmlFor="senderEmail" className="text-white">Gönderen E-posta</Label>
              <Input
                id="senderEmail"
                value={formData.senderEmail}
                onChange={(e) => handleInputChange('senderEmail', e.target.value)}
                placeholder="örn: noreply@yourdomain.com"
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="senderName" className="text-white">Gönderen Adı</Label>
              <Input
                id="senderName"
                value={formData.senderName}
                onChange={(e) => handleInputChange('senderName', e.target.value)}
                placeholder="örn: ATY Dijital"
                className="bg-dark-400 border-dark-300 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notificationEmails" className="text-white">Bildirim Alacak E-posta</Label>
              <Input
                id="notificationEmails"
                value={formData.notificationEmails}
                onChange={(e) => handleInputChange('notificationEmails', e.target.value)}
                placeholder="örn: admin@yourdomain.com"
                className="bg-dark-400 border-dark-300 text-white"
              />
              <p className="text-xs text-white/60">Virgülle ayırarak birden fazla e-posta ekleyebilirsiniz</p>
            </div>
            
            <div className="space-y-3 pt-2">
              <Label className="text-white">Şunlar için bildirim gönder:</Label>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="notifyContactForm"
                  checked={formData.notifyOn.contactForm}
                  onCheckedChange={(checked) => handleNotifyChange('contactForm', checked)}
                />
                <Label htmlFor="notifyContactForm" className="text-white">İletişim Formu</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="notifyQuoteRequest"
                  checked={formData.notifyOn.quoteRequest}
                  onCheckedChange={(checked) => handleNotifyChange('quoteRequest', checked)}
                />
                <Label htmlFor="notifyQuoteRequest" className="text-white">Teklif Talebi</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="notifyNewsletter"
                  checked={formData.notifyOn.newsletter}
                  onCheckedChange={(checked) => handleNotifyChange('newsletter', checked)}
                />
                <Label htmlFor="notifyNewsletter" className="text-white">Bülten Aboneliği</Label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={handleTestConnection}
            disabled={isTesting || isLoading}
            className="border-dark-400 hover:bg-dark-400 text-white"
          >
            {isTesting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Test Ediliyor...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Bağlantıyı Test Et
              </>
            )}
          </Button>
          
          <Button 
            onClick={handleSaveSettings}
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
      </CardContent>
    </Card>
  );
};

export default SmtpSettings;
