import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { 
  Settings, 
  ExternalLink, 
  Check, 
  AlertCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Edit,
  Save,
  Clock,
  Calendar,
  User,
  Menu,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Info
} from 'lucide-react';

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
}

const SocialMediaSettings = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [newLink, setNewLink] = useState({ name: '', url: '' });
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [editedLink, setEditedLink] = useState({ name: '', url: '' });
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // Load social links from local storage or default values
    const storedLinks = localStorage.getItem('socialLinks');
    if (storedLinks) {
      setSocialLinks(JSON.parse(storedLinks));
    } else {
      // Initialize with some default social links
      setSocialLinks([
        { id: 'facebook', name: 'Facebook', url: 'https://facebook.com/ignite', icon: <Facebook className="h-5 w-5" /> },
        { id: 'twitter', name: 'Twitter', url: 'https://twitter.com/ignite', icon: <Twitter className="h-5 w-5" /> },
        { id: 'instagram', name: 'Instagram', url: 'https://instagram.com/ignite', icon: <Instagram className="h-5 w-5" /> },
        { id: 'linkedin', name: 'LinkedIn', url: 'https://linkedin.com/company/ignite', icon: <Linkedin className="h-5 w-5" /> },
        { id: 'youtube', name: 'YouTube', url: 'https://youtube.com/ignite', icon: <Youtube className="h-5 w-5" /> },
      ]);
    }
  }, []);
  
  useEffect(() => {
    // Save social links to local storage whenever they change
    localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
  }, [socialLinks]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLink(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleAddLink = () => {
    if (newLink.name && newLink.url) {
      const newId = newLink.name.toLowerCase().replace(/\s+/g, '-');
      const newSocialLink: SocialLink = {
        id: newId,
        name: newLink.name,
        url: newLink.url,
        icon: getIconForSocialMedia(newLink.name),
      };
      setSocialLinks(prevLinks => [...prevLinks, newSocialLink]);
      setNewLink({ name: '', url: '' });
      toast({
        title: "Sosyal Medya Linki Eklendi",
        description: `${newLink.name} linki başarıyla eklendi.`,
      });
    } else {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen link adı ve URL'sini girin.",
        variant: "destructive",
      });
    }
  };
  
  const handleEditLink = (link: SocialLink) => {
    setEditingLinkId(link.id);
    setEditedLink({ name: link.name, url: link.url });
  };
  
  const handleCancelEdit = () => {
    setEditingLinkId(null);
    setEditedLink({ name: '', url: '' });
  };
  
  const handleUpdateLink = () => {
    if (editingLinkId && editedLink.name && editedLink.url) {
      setSocialLinks(prevLinks =>
        prevLinks.map(link =>
          link.id === editingLinkId
            ? { ...link, name: editedLink.name, url: editedLink.url, icon: getIconForSocialMedia(editedLink.name) }
            : link
        )
      );
      setEditingLinkId(null);
      setEditedLink({ name: '', url: '' });
      toast({
        title: "Sosyal Medya Linki Güncellendi",
        description: `${editedLink.name} linki başarıyla güncellendi.`,
      });
    } else {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen link adı ve URL'sini girin.",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteLink = (id: string) => {
    setSocialLinks(prevLinks => prevLinks.filter(link => link.id !== id));
    toast({
      title: "Sosyal Medya Linki Silindi",
      description: "Sosyal medya linki başarıyla silindi.",
    });
  };
  
  const getIconForSocialMedia = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('facebook')) return <Facebook className="h-5 w-5" />;
    if (lowerName.includes('twitter')) return <Twitter className="h-5 w-5" />;
    if (lowerName.includes('instagram')) return <Instagram className="h-5 w-5" />;
    if (lowerName.includes('linkedin')) return <Linkedin className="h-5 w-5" />;
    if (lowerName.includes('youtube')) return <Youtube className="h-5 w-5" />;
    return <ExternalLink className="h-5 w-5" />;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Sosyal Medya Linkleri</h3>
        <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              Gizle <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Düzenle <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Input
              type="text"
              name="name"
              value={newLink.name}
              onChange={handleInputChange}
              placeholder="Link Adı"
              className="bg-dark-500 border-dark-300"
            />
            <Input
              type="url"
              name="url"
              value={newLink.url}
              onChange={handleInputChange}
              placeholder="Link URL"
              className="bg-dark-500 border-dark-300"
            />
            <Button onClick={handleAddLink} className="bg-ignite hover:bg-ignite-700">
              <Plus className="mr-2 h-4 w-4" />
              Link Ekle
            </Button>
          </div>
          
          <ul className="space-y-2">
            {socialLinks.map(link => (
              <li key={link.id} className="flex items-center justify-between bg-dark-600 p-3 rounded-md border border-dark-400">
                <div className="flex items-center gap-2">
                  {link.icon}
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {link.name}
                  </a>
                </div>
                <div>
                  {editingLinkId === link.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={editedLink.name}
                        onChange={(e) => setEditedLink({ ...editedLink, name: e.target.value })}
                        placeholder="Link Adı"
                        className="bg-dark-500 border-dark-300"
                      />
                      <Input
                        type="url"
                        value={editedLink.url}
                        onChange={(e) => setEditedLink({ ...editedLink, url: e.target.value })}
                        placeholder="Link URL"
                        className="bg-dark-500 border-dark-300"
                      />
                      <Button variant="ghost" size="icon" onClick={handleUpdateLink}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditLink(link)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteLink(link.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const ContactSettings = () => {
  const [contactInfo, setContactInfo] = useState({
    address: '',
    phone: '',
    email: '',
    mapUrl: '',
  });
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // Load contact info from local storage or default values
    const storedContactInfo = localStorage.getItem('contactInfo');
    if (storedContactInfo) {
      setContactInfo(JSON.parse(storedContactInfo));
    } else {
      // Initialize with some default contact info
      setContactInfo({
        address: 'Örnek Mah. Örnek Sok. No:123 Daire:45\nŞehir, Ülke',
        phone: '+90 555 123 45 67',
        email: 'info@ignitepazarlama.com',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d29.00!3d41.00!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzAwLjAiTiAyOcKwMDAnMDAuMCJF!5e0!3m2!1str!2str!4v1600000000000!5m2!1str!2str',
      });
    }
  }, []);
  
  useEffect(() => {
    // Save contact info to local storage whenever it changes
    localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
  }, [contactInfo]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactInfo(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleUpdateContactInfo = () => {
    localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
    toast({
      title: "İletişim Bilgileri Güncellendi",
      description: "İletişim bilgileriniz başarıyla güncellendi.",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">İletişim Bilgileri</h3>
        <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              Gizle <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Düzenle <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Adres</Label>
            <Textarea
              id="address"
              name="address"
              value={contactInfo.address}
              onChange={handleInputChange}
              placeholder="Adresinizi girin"
              className="bg-dark-500 border-dark-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={contactInfo.phone}
              onChange={handleInputChange}
              placeholder="Telefon numaranızı girin"
              className="bg-dark-500 border-dark-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={contactInfo.email}
              onChange={handleInputChange}
              placeholder="E-posta adresinizi girin"
              className="bg-dark-500 border-dark-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mapUrl">Google Harita URL</Label>
            <Input
              type="url"
              id="mapUrl"
              name="mapUrl"
              value={contactInfo.mapUrl}
              onChange={handleInputChange}
              placeholder="Google Harita URL'sini girin"
              className="bg-dark-500 border-dark-300"
            />
          </div>
          
          <Button onClick={handleUpdateContactInfo} className="bg-ignite hover:bg-ignite-700">
            <Save className="mr-2 h-4 w-4" />
            İletişim Bilgilerini Kaydet
          </Button>
        </div>
      )}
    </div>
  );
};

const SeoSettings = () => {
  const [seoData, setSeoData] = useState({
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    author: '',
  });
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // Load SEO data from local storage or default values
    const storedSeoData = localStorage.getItem('seoData');
    if (storedSeoData) {
      setSeoData(JSON.parse(storedSeoData));
    } else {
      // Initialize with some default SEO data
      setSeoData({
        metaTitle: 'Ignite Pazarlama - Dijital Pazarlama Ajansı',
        metaDescription: 'Ignite Pazarlama, markanızın dijital dünyada büyümesine yardımcı olan bir dijital pazarlama ajansıdır.',
        keywords: 'dijital pazarlama, seo, sosyal medya, reklam, web tasarım',
        author: 'Ignite Pazarlama',
      });
    }
  }, []);
  
  useEffect(() => {
    // Save SEO data to local storage whenever it changes
    localStorage.setItem('seoData', JSON.stringify(seoData));
  }, [seoData]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSeoData(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleUpdateSeoData = () => {
    localStorage.setItem('seoData', JSON.stringify(seoData));
    toast({
      title: "SEO Bilgileri Güncellendi",
      description: "SEO bilgileriniz başarıyla güncellendi.",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">SEO Ayarları</h3>
        <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              Gizle <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Düzenle <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Başlığı</Label>
            <Input
              type="text"
              id="metaTitle"
              name="metaTitle"
              value={seoData.metaTitle}
              onChange={handleInputChange}
              placeholder="Meta başlığını girin"
              className="bg-dark-500 border-dark-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Açıklaması</Label>
            <Textarea
              id="metaDescription"
              name="metaDescription"
              value={seoData.metaDescription}
              onChange={handleInputChange}
              placeholder="Meta açıklamasını girin"
              className="bg-dark-500 border-dark-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="keywords">Anahtar Kelimeler</Label>
            <Input
              type="text"
              id="keywords"
              name="keywords"
              value={seoData.keywords}
              onChange={handleInputChange}
              placeholder="Anahtar kelimeleri girin (virgülle ayırın)"
              className="bg-dark-500 border-dark-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Yazar</Label>
            <Input
              type="text"
              id="author"
              name="author"
              value={seoData.author}
              onChange={handleInputChange}
              placeholder="Yazarı girin"
              className="bg-dark-500 border-dark-300"
            />
          </div>
          
          <Button onClick={handleUpdateSeoData} className="bg-ignite hover:bg-ignite-700">
            <Save className="mr-2 h-4 w-4" />
            SEO Bilgilerini Kaydet
          </Button>
        </div>
      )}
    </div>
  );
};

const MaintenanceSettings = () => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    'Web sitemiz şu anda bakım modundadır. Kısa süre içinde hizmetinizdeyiz.'
  );
  const [estimatedTime, setEstimatedTime] = useState('');
  
  useEffect(() => {
    // Load maintenance settings from localStorage
    const storedMaintenanceMode = localStorage.getItem('maintenanceMode');
    if (storedMaintenanceMode) {
      setIsMaintenanceMode(JSON.parse(storedMaintenanceMode));
    }
    
    const storedMaintenanceMessage = localStorage.getItem('maintenanceMessage');
    if (storedMaintenanceMessage) {
      setMaintenanceMessage(storedMaintenanceMessage);
    }
    
    const storedEstimatedTime = localStorage.getItem('estimatedMaintenanceTime');
    if (storedEstimatedTime) {
      setEstimatedTime(storedEstimatedTime);
    }
  }, []);
  
  const handleToggleMaintenanceMode = () => {
    const newValue = !isMaintenanceMode;
    setIsMaintenanceMode(newValue);
    localStorage.setItem('maintenanceMode', JSON.stringify(newValue));
    
    toast({
      title: newValue ? "Bakım Modu Aktif" : "Bakım Modu Kapalı",
      description: newValue 
        ? "Web siteniz şu anda bakım modunda ve yalnızca yöneticiler tarafından görüntülenebilir." 
        : "Web siteniz normal modda ve herkes tarafından görüntülenebilir.",
    });
  };
  
  const handleUpdateMaintenanceSettings = () => {
    localStorage.setItem('maintenanceMessage', maintenanceMessage);
    localStorage.setItem('estimatedMaintenanceTime', estimatedTime);
    
    toast({
      title: "Bakım Ayarları Güncellendi",
      description: "Bakım modu ayarları başarıyla güncellendi.",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Bakım Modu</h3>
          <p className="text-sm text-gray-400">
            Web sitenizi bakım moduna alarak ziyaretçileri bilgilendirebilirsiniz
          </p>
        </div>
        <Switch
          checked={isMaintenanceMode}
          onCheckedChange={handleToggleMaintenanceMode}
        />
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="maintenance-message">Bakım Mesajı</Label>
          <Textarea
            id="maintenance-message"
            value={maintenanceMessage}
            onChange={(e) => setMaintenanceMessage(e.target.value)}
            placeholder="Bakım modu mesajını girin"
            className="bg-dark-500 border-dark-300"
            disabled={!isMaintenanceMode}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="estimated-time">Tahmini Tamamlanma Zamanı</Label>
          <Input
            id="estimated-time"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            placeholder="Örn: 2 saat içinde, 26 Nisan 15:00"
            className="bg-dark-500 border-dark-300"
            disabled={!isMaintenanceMode}
          />
        </div>
      </div>
      
      {isMaintenanceMode && (
        <Alert variant="destructive" className="bg-orange-900/20 border-orange-900/50 text-orange-400">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Web siteniz bakım modunda. Yalnızca yöneticiler tarafından erişilebilir.
          </AlertDescription>
        </Alert>
      )}
      
      <Button
        onClick={handleUpdateMaintenanceSettings}
        className="bg-ignite hover:bg-ignite-700"
        disabled={!isMaintenanceMode}
      >
        <Save className="mr-2 h-4 w-4" />
        Bakım Ayarlarını Kaydet
      </Button>
    </div>
  );
};

const GeneralSettings = () => {
  const [siteName, setSiteName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // Load general settings from local storage or default values
    const storedGeneralSettings = localStorage.getItem('generalSettings');
    if (storedGeneralSettings) {
      const settings = JSON.parse(storedGeneralSettings);
      setSiteName(settings.siteName || '');
      setLogoUrl(settings.logoUrl || '');
      setFaviconUrl(settings.faviconUrl || '');
    } else {
      // Initialize with some default general settings
      setSiteName('Ignite Pazarlama');
      setLogoUrl('/logo.svg');
      setFaviconUrl('/favicon.ico');
    }
  }, []);
  
  useEffect(() => {
    // Save general settings to local storage whenever they change
    localStorage.setItem('generalSettings', JSON.stringify({ siteName, logoUrl, faviconUrl }));
  }, [siteName, logoUrl, faviconUrl]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'siteName') setSiteName(value);
    if (name === 'logoUrl') setLogoUrl(value);
    if (name === 'faviconUrl') setFaviconUrl(value);
  };
  
  const handleUpdateGeneralSettings = () => {
    localStorage.setItem('generalSettings', JSON.stringify({ siteName, logoUrl, faviconUrl }));
    toast({
      title: "Genel Ayarlar Güncellendi",
      description: "Genel ayarlarınız başarıyla güncellendi.",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Genel Ayarlar</h3>
        <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              Gizle <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Düzenle <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Adı</Label>
            <Input
              type="text"
              id="siteName"
              name="siteName"
              value={siteName}
              onChange={handleInputChange}
              placeholder="Site adını girin"
              className="bg-dark-500 border-dark-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="logoUrl">Logo URL</Label>
            <Input
              type="text"
              id="logoUrl"
              name="logoUrl"
              value={logoUrl}
              onChange={handleInputChange}
              placeholder="Logo URL'sini girin"
              className="bg-dark-500 border-dark-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="faviconUrl">Favicon URL</Label>
            <Input
              type="text"
              id="faviconUrl"
              name="faviconUrl"
              value={faviconUrl}
              onChange={handleInputChange}
              placeholder="Favicon URL'sini girin"
              className="bg-dark-500 border-dark-300"
            />
          </div>
          
          <Button onClick={handleUpdateGeneralSettings} className="bg-ignite hover:bg-ignite-700">
            <Save className="mr-2 h-4 w-4" />
            Genel Ayarları Kaydet
          </Button>
        </div>
      )}
    </div>
  );
};

const CookieSettings = () => {
  const [cookieConsentMessage, setCookieConsentMessage] = useState('');
  const [isCookieConsentEnabled, setIsCookieConsentEnabled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // Load cookie settings from local storage or default values
    const storedCookieSettings = localStorage.getItem('cookieSettings');
    if (storedCookieSettings) {
      const settings = JSON.parse(storedCookieSettings);
      setCookieConsentMessage(settings.cookieConsentMessage || '');
      setIsCookieConsentEnabled(settings.isCookieConsentEnabled || false);
    } else {
      // Initialize with some default cookie settings
      setCookieConsentMessage('SitemizdeCookieler kullanılmaktadır. Daha fazla bilgi için Gizlilik Politikamızı inceleyebilirsiniz.');
      setIsCookieConsentEnabled(true);
    }
  }, []);
  
  useEffect(() => {
    // Save cookie settings to local storage whenever they change
    localStorage.setItem('cookieSettings', JSON.stringify({ cookieConsentMessage, isCookieConsentEnabled }));
  }, [cookieConsentMessage, isCookieConsentEnabled]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCookieConsentMessage(e.target.value);
  };
  
  const handleToggleCookieConsent = () => {
    setIsCookieConsentEnabled(!isCookieConsentEnabled);
  };
  
  const handleUpdateCookieSettings = () => {
    localStorage.setItem('cookieSettings', JSON.stringify({ cookieConsentMessage, isCookieConsentEnabled }));
    toast({
      title: "Çerez Ayarları Güncellendi",
      description: "Çerez ayarlarınız başarıyla güncellendi.",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Çerez Ayarları</h3>
        <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              Gizle <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Düzenle <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="cookieConsentEnabled">Çerez İzni Etkin</Label>
              <p className="text-sm text-gray-400">
                Çerez izni mesajını etkinleştir veya devre dışı bırak
              </p>
            </div>
            <Switch
              id="cookieConsentEnabled"
              checked={isCookieConsentEnabled}
              onCheckedChange={handleToggleCookieConsent}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cookieConsentMessage">Çerez İzni Mesajı</Label>
            <Textarea
              id="cookieConsentMessage"
              value={cookieConsentMessage}
              onChange={handleInputChange}
              placeholder="Çerez izni mesajını girin"
              className="bg-dark-500 border-dark-300"
            />
          </div>
          
          <Button onClick={handleUpdateCookieSettings} className="bg-ignite hover:bg-ignite-700">
            <Save className="mr-2 h-4 w-4" />
            Çerez Ayarlarını Kaydet
          </Button>
        </div>
      )}
    </div>
  );
};

const SiteSettingsManager = () => {
  const [activeSection, setActiveSection] = useState<
    'general' | 'social' | 'contact' | 'seo' | 'maintenance' | 'cookie'
  >('general');
  
  return (
    <div className="space-y-6">
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader>
          <CardTitle>Site Ayarları</CardTitle>
          <CardDescription>
            Web sitenizin genel ayarlarını yönetin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Button
              variant="outline"
              onClick={() => setActiveSection('general')}
              className={`w-full md:w-auto justify-start gap-2 ${
                activeSection === 'general' ? 'bg-dark-400 hover:bg-dark-300' : ''
              }`}
            >
              <Settings className="h-4 w-4" />
              Genel
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveSection('social')}
              className={`w-full md:w-auto justify-start gap-2 ${
                activeSection === 'social' ? 'bg-dark-400 hover:bg-dark-300' : ''
              }`}
            >
              <UserPlus className="h-4 w-4" />
              Sosyal Medya
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveSection('contact')}
              className={`w-full md:w-auto justify-start gap-2 ${
                activeSection === 'contact' ? 'bg-dark-400 hover:bg-dark-300' : ''
              }`}
            >
              <Mail className="h-4 w-4" />
              İletişim
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveSection('seo')}
              className={`w-full md:w-auto justify-start gap-2 ${
                activeSection === 'seo' ? 'bg-dark-400 hover:bg-dark-300' : ''
              }`}
            >
              <Search className="h-4 w-4" />
              SEO
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveSection('maintenance')}
              className={`w-full md:w-auto justify-start gap-2 ${
                activeSection === 'maintenance' ? 'bg-dark-400 hover:bg-dark-300' : ''
              }`}
            >
              <AlertCircle className="h-4 w-4"
