
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image, Link, UploadCloud, Star, Save, Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

interface FooterSettings {
  copyright: string;
  showServices: boolean;
  showQuickLinks: boolean;
  showContact: boolean;
  socialLinks: SocialLink[];
}

interface HeaderSettings {
  logoUrl: string;
  logoAlt: string;
  transparentHeader: boolean;
  sticky: boolean;
  navItems: { label: string; url: string; }[];
}

interface SiteInfo {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
}

const SiteSettingsManager = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('header');
  
  // Get initial settings from localStorage or use defaults
  const [headerSettings, setHeaderSettings] = useState<HeaderSettings>(() => {
    const saved = localStorage.getItem('ignite_headerSettings');
    return saved ? JSON.parse(saved) : {
      logoUrl: 'https://via.placeholder.com/150x50',
      logoAlt: 'Ignite Marketing',
      transparentHeader: true,
      sticky: true,
      navItems: [
        { label: 'Ana Sayfa', url: '/' },
        { label: 'Hizmetler', url: '/services' },
        { label: 'Portfolyo', url: '/portfolio' },
        { label: 'Hakkımızda', url: '/about' },
        { label: 'Blog', url: '/blog' },
        { label: 'İletişim', url: '/contact' }
      ]
    };
  });
  
  const [footerSettings, setFooterSettings] = useState<FooterSettings>(() => {
    const saved = localStorage.getItem('ignite_footerSettings');
    return saved ? JSON.parse(saved) : {
      copyright: '© 2025 Ignite Marketing. Tüm hakları saklıdır.',
      showServices: true,
      showQuickLinks: true,
      showContact: true,
      socialLinks: [
        { id: 1, platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
        { id: 2, platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
        { id: 3, platform: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
        { id: 4, platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' }
      ]
    };
  });
  
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(() => {
    const saved = localStorage.getItem('ignite_siteInfo');
    return saved ? JSON.parse(saved) : {
      siteName: 'Ignite Marketing',
      tagline: 'Digital Marketing Agency',
      email: 'info@ignitemarketing.com',
      phone: '+1 (555) 123-4567',
      address: '123 Marketing St, Digital City, 10001'
    };
  });
  
  const [newNavItem, setNewNavItem] = useState({ label: '', url: '' });
  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '', icon: '' });

  const saveSettings = (type: 'header' | 'footer' | 'siteInfo') => {
    setIsLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      try {
        if (type === 'header') {
          localStorage.setItem('ignite_headerSettings', JSON.stringify(headerSettings));
        } else if (type === 'footer') {
          localStorage.setItem('ignite_footerSettings', JSON.stringify(footerSettings));
        } else if (type === 'siteInfo') {
          localStorage.setItem('ignite_siteInfo', JSON.stringify(siteInfo));
        }
        
        toast({
          title: 'Ayarlar Kaydedildi',
          description: 'Site ayarları başarıyla güncellendi.',
        });
      } catch (error) {
        toast({
          title: 'Hata!',
          description: 'Ayarlar kaydedilirken bir hata oluştu.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };
  
  const addNavItem = () => {
    if (!newNavItem.label || !newNavItem.url) {
      toast({
        title: 'Eksik Bilgi',
        description: 'Navigasyon öğesi için etiket ve URL gereklidir.',
        variant: 'destructive'
      });
      return;
    }
    
    setHeaderSettings({
      ...headerSettings, 
      navItems: [...headerSettings.navItems, newNavItem]
    });
    
    setNewNavItem({ label: '', url: '' });
    
    toast({
      title: 'Navigasyon Öğesi Eklendi',
      description: 'Yeni navigasyon öğesi başarıyla eklendi.'
    });
  };
  
  const removeNavItem = (index: number) => {
    const updatedNavItems = [...headerSettings.navItems];
    updatedNavItems.splice(index, 1);
    setHeaderSettings({...headerSettings, navItems: updatedNavItems});
    
    toast({
      title: 'Navigasyon Öğesi Silindi',
      description: 'Navigasyon öğesi başarıyla silindi.'
    });
  };
  
  const addSocialLink = () => {
    if (!newSocialLink.platform || !newSocialLink.url) {
      toast({
        title: 'Eksik Bilgi',
        description: 'Sosyal medya linki için platform ve URL gereklidir.',
        variant: 'destructive'
      });
      return;
    }
    
    const icon = newSocialLink.platform.toLowerCase();
    const newId = Math.max(0, ...footerSettings.socialLinks.map(link => link.id)) + 1;
    
    setFooterSettings({
      ...footerSettings, 
      socialLinks: [
        ...footerSettings.socialLinks, 
        { ...newSocialLink, icon, id: newId }
      ]
    });
    
    setNewSocialLink({ platform: '', url: '', icon: '' });
    
    toast({
      title: 'Sosyal Medya Linki Eklendi',
      description: 'Yeni sosyal medya linki başarıyla eklendi.'
    });
  };
  
  const removeSocialLink = (id: number) => {
    const updatedLinks = footerSettings.socialLinks.filter(link => link.id !== id);
    setFooterSettings({...footerSettings, socialLinks: updatedLinks});
    
    toast({
      title: 'Sosyal Medya Linki Silindi',
      description: 'Sosyal medya linki başarıyla silindi.'
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Site Ayarları</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-dark-400 border-dark-300">
          <TabsTrigger value="header" className="data-[state=active]:bg-ignite">
            Header
          </TabsTrigger>
          <TabsTrigger value="footer" className="data-[state=active]:bg-ignite">
            Footer
          </TabsTrigger>
          <TabsTrigger value="logo" className="data-[state=active]:bg-ignite">
            Logo ve Marka
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="header" className="space-y-6 mt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle>Header Ayarları</CardTitle>
              <CardDescription>
                Web sitenizin üst kısmında görünen header bileşenini özelleştirin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input 
                  id="logoUrl"
                  value={headerSettings.logoUrl}
                  onChange={(e) => setHeaderSettings({...headerSettings, logoUrl: e.target.value})}
                  placeholder="https://example.com/logo.png"
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logoAlt">Logo Alt Metni</Label>
                <Input 
                  id="logoAlt"
                  value={headerSettings.logoAlt}
                  onChange={(e) => setHeaderSettings({...headerSettings, logoAlt: e.target.value})}
                  placeholder="Logo açıklaması"
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              
              <div className="flex items-center justify-between space-x-4">
                <div className="space-y-0.5">
                  <Label htmlFor="transparentHeader">Transparan Header</Label>
                  <p className="text-sm text-gray-400">
                    Header arka planını transparan yapın
                  </p>
                </div>
                <Switch 
                  id="transparentHeader"
                  checked={headerSettings.transparentHeader}
                  onCheckedChange={(checked) => setHeaderSettings({...headerSettings, transparentHeader: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-4">
                <div className="space-y-0.5">
                  <Label htmlFor="stickyHeader">Yapışkan Header</Label>
                  <p className="text-sm text-gray-400">
                    Header'ın sayfa kaydırılırken üstte kalmasını sağlayın
                  </p>
                </div>
                <Switch 
                  id="stickyHeader"
                  checked={headerSettings.sticky}
                  onCheckedChange={(checked) => setHeaderSettings({...headerSettings, sticky: checked})}
                />
              </div>
              
              <div className="space-y-4 mt-6">
                <Label>Navigasyon Öğeleri</Label>
                
                <div className="space-y-2">
                  {headerSettings.navItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 rounded-md bg-dark-400">
                      <span className="flex-1">{item.label}</span>
                      <span className="text-gray-400 text-sm">{item.url}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeNavItem(index)}
                        className="h-8 hover:bg-red-900/20 hover:text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-end space-x-2">
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="navLabel">Etiket</Label>
                    <Input 
                      id="navLabel"
                      value={newNavItem.label}
                      onChange={(e) => setNewNavItem({...newNavItem, label: e.target.value})}
                      placeholder="Ana Sayfa"
                      className="bg-dark-400 border-dark-300"
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="navUrl">URL</Label>
                    <Input 
                      id="navUrl"
                      value={newNavItem.url}
                      onChange={(e) => setNewNavItem({...newNavItem, url: e.target.value})}
                      placeholder="/home"
                      className="bg-dark-400 border-dark-300"
                    />
                  </div>
                  <Button onClick={addNavItem}>Ekle</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-ignite hover:bg-ignite-700 ml-auto"
                onClick={() => saveSettings('header')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kaydediliyor
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Kaydet
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="footer" className="space-y-6 mt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle>Footer Ayarları</CardTitle>
              <CardDescription>
                Web sitenizin alt kısmında görünen footer bileşenini özelleştirin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="copyright">Telif Hakkı Metni</Label>
                <Input 
                  id="copyright"
                  value={footerSettings.copyright}
                  onChange={(e) => setFooterSettings({...footerSettings, copyright: e.target.value})}
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between space-x-4">
                  <Label htmlFor="showServices">Hizmetleri Göster</Label>
                  <Switch 
                    id="showServices"
                    checked={footerSettings.showServices}
                    onCheckedChange={(checked) => setFooterSettings({...footerSettings, showServices: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-4">
                  <Label htmlFor="showQuickLinks">Hızlı Bağlantıları Göster</Label>
                  <Switch 
                    id="showQuickLinks"
                    checked={footerSettings.showQuickLinks}
                    onCheckedChange={(checked) => setFooterSettings({...footerSettings, showQuickLinks: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-4">
                  <Label htmlFor="showContact">İletişim Bilgilerini Göster</Label>
                  <Switch 
                    id="showContact"
                    checked={footerSettings.showContact}
                    onCheckedChange={(checked) => setFooterSettings({...footerSettings, showContact: checked})}
                  />
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <Label>Sosyal Medya Linkleri</Label>
                
                <div className="space-y-2">
                  {footerSettings.socialLinks.map((link) => (
                    <div key={link.id} className="flex items-center space-x-2 p-2 rounded-md bg-dark-400">
                      <span className="flex-1">{link.platform}</span>
                      <span className="text-gray-400 text-sm">{link.url}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeSocialLink(link.id)}
                        className="h-8 hover:bg-red-900/20 hover:text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-end space-x-2">
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="socialPlatform">Platform</Label>
                    <Input 
                      id="socialPlatform"
                      value={newSocialLink.platform}
                      onChange={(e) => setNewSocialLink({...newSocialLink, platform: e.target.value})}
                      placeholder="Instagram"
                      className="bg-dark-400 border-dark-300"
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="socialUrl">URL</Label>
                    <Input 
                      id="socialUrl"
                      value={newSocialLink.url}
                      onChange={(e) => setNewSocialLink({...newSocialLink, url: e.target.value})}
                      placeholder="https://instagram.com/ignitemarketing"
                      className="bg-dark-400 border-dark-300"
                    />
                  </div>
                  <Button onClick={addSocialLink}>Ekle</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-ignite hover:bg-ignite-700 ml-auto"
                onClick={() => saveSettings('footer')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kaydediliyor
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Kaydet
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="logo" className="space-y-6 mt-6">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle>Logo ve Marka Ayarları</CardTitle>
              <CardDescription>
                Web sitenizin marka kimliğini ve genel bilgilerini özelleştirin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Adı</Label>
                <Input 
                  id="siteName"
                  value={siteInfo.siteName}
                  onChange={(e) => setSiteInfo({...siteInfo, siteName: e.target.value})}
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tagline">Slogan</Label>
                <Input 
                  id="tagline"
                  value={siteInfo.tagline}
                  onChange={(e) => setSiteInfo({...siteInfo, tagline: e.target.value})}
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="uploadLogo">Logo Yükle</Label>
                <div className="border-2 border-dashed border-dark-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-dark-400/50 transition-colors">
                  <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400 text-center">
                    Logo dosyasını yüklemek için tıklayın veya buraya sürükleyin
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG or SVG (max 1MB)
                  </p>
                  <input id="uploadLogo" type="file" className="hidden" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">E-posta Adresi</Label>
                  <Input 
                    id="email"
                    value={siteInfo.email}
                    onChange={(e) => setSiteInfo({...siteInfo, email: e.target.value})}
                    className="bg-dark-400 border-dark-300 mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefon Numarası</Label>
                  <Input 
                    id="phone"
                    value={siteInfo.phone}
                    onChange={(e) => setSiteInfo({...siteInfo, phone: e.target.value})}
                    className="bg-dark-400 border-dark-300 mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Adres</Label>
                  <Textarea 
                    id="address"
                    value={siteInfo.address}
                    onChange={(e) => setSiteInfo({...siteInfo, address: e.target.value})}
                    className="bg-dark-400 border-dark-300 mt-1"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-ignite hover:bg-ignite-700 ml-auto"
                onClick={() => saveSettings('siteInfo')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kaydediliyor
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Kaydet
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettingsManager;
