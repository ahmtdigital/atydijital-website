import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { 
  Settings, 
  Save, 
  AlertCircle, 
  Pencil, 
  Upload, 
  ExternalLink, 
  Code, 
  ImageIcon, 
  Tag, 
  Calendar, 
  Clock, 
  Link, 
  Mail, 
  FileText, 
  Layers 
} from 'lucide-react';

const SiteSettingsManager = () => {
  const [siteName, setSiteName] = useState('Ignite Marketing');
  const [siteDescription, setSiteDescription] = useState('Markanızı dijital dünyada parlatacak stratejiler ve çözümler sunan pazarlama ajansı.');
  const [keywords, setKeywords] = useState('dijital pazarlama, SEO, sosyal medya, web tasarım, içerik üretimi');
  const [primaryColor, setPrimaryColor] = useState('#ff6b00');
  const [secondaryColor, setSecondaryColor] = useState('#1e293b');
  const [logoUrl, setLogoUrl] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('info@ignitemarketing.com');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 123-4567');
  const [address, setAddress] = useState('123 Marketing St, Digital City, 10001');
  const [openingHours, setOpeningHours] = useState('Mon-Fri: 9am - 6pm');
  const [googleMapsLink, setGoogleMapsLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');
  const [customCss, setCustomCss] = useState('');
  const [customJs, setCustomJs] = useState('');
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading settings from a database or API
    setIsLoading(true);
    setTimeout(() => {
      // Update state with loaded settings
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSaveSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Site Ayarları Kaydedildi",
        description: "Web sitesi ayarları başarıyla güncellendi.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Simulate uploading the logo and getting a URL
      setTimeout(() => {
        setLogoUrl('https://via.placeholder.com/150');
        toast({
          title: "Logo Yüklendi",
          description: `${file.name} başarıyla yüklendi.`,
        });
      }, 500);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Simulate uploading the favicon and getting a URL
      setTimeout(() => {
        setFaviconUrl('https://via.placeholder.com/32');
        toast({
          title: "Favicon Yüklendi",
          description: `${file.name} başarıyla yüklendi.`,
        });
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Site Ayarları</h2>
        <Button 
          onClick={handleSaveSettings}
          className="bg-ignite hover:bg-ignite-700"
          disabled={isLoading}
        >
          {isLoading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </Button>
      </div>
      
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-ignite" />
            Genel Ayarlar
          </CardTitle>
          <CardDescription>
            Web sitenizin temel ayarlarını yapılandırın
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Site Adı</Label>
              <Input 
                id="site-name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="Site adı"
                className="bg-dark-400 border-dark-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="site-description">Site Açıklaması</Label>
              <Textarea 
                id="site-description"
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                placeholder="Site açıklaması"
                className="bg-dark-400 border-dark-300 min-h-20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="site-keywords">Anahtar Kelimeler</Label>
              <Input 
                id="site-keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Anahtar kelimeler (virgülle ayrılmış)"
                className="bg-dark-400 border-dark-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-ignite" />
            Görsel Ayarları
          </CardTitle>
          <CardDescription>
            Logo, favicon ve renk paleti gibi görsel öğeleri yapılandırın
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logo-upload" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Logo Yükle
              </Label>
              <Input 
                type="file"
                id="logo-upload"
                className="hidden"
                onChange={handleLogoUpload}
              />
              <Label htmlFor="logo-upload" className="bg-dark-400 border-dark-300 rounded-md py-2 px-3 text-sm cursor-pointer hover:bg-dark-300 transition-colors">
                {logoUrl ? 'Logoyu Değiştir' : 'Logo Seç'}
              </Label>
              {logoUrl && (
                <div className="mt-2">
                  <img src={logoUrl} alt="Logo Preview" className="max-h-20 rounded-md" />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="favicon-upload" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Favicon Yükle
              </Label>
              <Input 
                type="file"
                id="favicon-upload"
                className="hidden"
                onChange={handleFaviconUpload}
              />
              <Label htmlFor="favicon-upload" className="bg-dark-400 border-dark-300 rounded-md py-2 px-3 text-sm cursor-pointer hover:bg-dark-300 transition-colors">
                {faviconUrl ? 'Faviconu Değiştir' : 'Favicon Seç'}
              </Label>
              {faviconUrl && (
                <div className="mt-2">
                  <img src={faviconUrl} alt="Favicon Preview" className="max-h-8 rounded-md" />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Birincil Renk</Label>
                <Input 
                  type="color"
                  id="primary-color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-10 bg-dark-400 border-dark-300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondary-color">İkincil Renk</Label>
                <Input 
                  type="color"
                  id="secondary-color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="h-10 bg-dark-400 border-dark-300"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-ignite" />
            İletişim Bilgileri
          </CardTitle>
          <CardDescription>
            İletişim bilgilerinizi ve adresinizi güncelleyin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-email">E-posta Adresi</Label>
              <Input 
                id="contact-email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="E-posta adresi"
                className="bg-dark-400 border-dark-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone-number">Telefon Numarası</Label>
              <Input 
                id="phone-number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Telefon numarası"
                className="bg-dark-400 border-dark-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Adres</Label>
              <Textarea 
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Adres"
                className="bg-dark-400 border-dark-300 min-h-20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="opening-hours">Çalışma Saatleri</Label>
              <Input 
                id="opening-hours"
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                placeholder="Çalışma saatleri"
                className="bg-dark-400 border-dark-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="google-maps-link">Google Maps Bağlantısı</Label>
              <Input 
                id="google-maps-link"
                type="url"
                value={googleMapsLink}
                onChange={(e) => setGoogleMapsLink(e.target.value)}
                placeholder="Google Maps bağlantısı"
                className="bg-dark-400 border-dark-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share className="h-5 w-5 text-ignite" />
            Sosyal Medya Bağlantıları
          </CardTitle>
          <CardDescription>
            Sosyal medya profillerinize bağlantılar ekleyin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebook-link">Facebook</Label>
              <Input 
                id="facebook-link"
                type="url"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                placeholder="Facebook profil bağlantısı"
                className="bg-dark-400 border-dark-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="twitter-link">Twitter</Label>
              <Input 
                id="twitter-link"
                type="url"
                value={twitterLink}
                onChange={(e) => setTwitterLink(e.target.value)}
                placeholder="Twitter profil bağlantısı"
                className="bg-dark-400 border-dark-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instagram-link">Instagram</Label>
              <Input 
                id="instagram-link"
                type="url"
                value={instagramLink}
                onChange={(e) => setInstagramLink(e.target.value)}
                placeholder="Instagram profil bağlantısı"
                className="bg-dark-400 border-dark-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin-link">LinkedIn</Label>
              <Input 
                id="linkedin-link"
                type="url"
                value={linkedinLink}
                onChange={(e) => setLinkedinLink(e.target.value)}
                placeholder="LinkedIn profil bağlantısı"
                className="bg-dark-400 border-dark-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-ignite" />
            Özel Kodlar
          </CardTitle>
          <CardDescription>
            Özel CSS ve JavaScript kodları ekleyin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-css">Özel CSS</Label>
              <Textarea 
                id="custom-css"
                value={customCss}
                onChange={(e) => setCustomCss(e.target.value)}
                placeholder="Özel CSS kodları"
                className="bg-dark-400 border-dark-300 font-mono min-h-32"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="custom-js">Özel JavaScript</Label>
              <Textarea 
                id="custom-js"
                value={customJs}
                onChange={(e) => setCustomJs(e.target.value)}
                placeholder="Özel JavaScript kodları"
                className="bg-dark-400 border-dark-300 font-mono min-h-32"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-ignite" />
            Bakım Modu
          </CardTitle>
          <CardDescription>
            Web sitenizi bakım moduna alın
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch id="maintenance-mode" checked={isMaintenanceMode} onCheckedChange={setIsMaintenanceMode} />
            <Label htmlFor="maintenance-mode">Bakım Modunu Etkinleştir</Label>
          </div>
          
          {isMaintenanceMode && (
            <Alert variant="destructive" className="bg-orange-900/20 border-orange-900/50 text-orange-400">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Web siteniz bakım modunda. Yalnızca yöneticiler tarafından erişilebilir.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettingsManager;

// Dummy Share icon
const Share = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-share"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </svg>
);
