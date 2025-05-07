import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Plus, Edit, Trash2, Search, Download, Send, Users, RefreshCw, Archive } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NewsletterSubscriber {
  id: number;
  email: string;
  name?: string;
  status: 'active' | 'unsubscribed';
  joinDate: string;
  tags?: string[];
}

interface NewsletterCampaign {
  id: number;
  title: string;
  subject: string;
  content: string;
  status: 'draft' | 'scheduled' | 'sent';
  sendDate?: string;
  openRate?: number;
  clickRate?: number;
  recipients?: number;
}

interface NewsletterTemplate {
  id: number;
  name: string;
  subject: string;
  content: string;
  createdAt: string;
}

const NewsletterManager = () => {
  const [activeTab, setActiveTab] = useState('subscribers');
  const [searchTerm, setSearchTerm] = useState('');
  const [openSubscriberDialog, setOpenSubscriberDialog] = useState(false);
  const [openCampaignDialog, setOpenCampaignDialog] = useState(false);
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentSubscriber, setCurrentSubscriber] = useState<Partial<NewsletterSubscriber>>({});
  const [currentCampaign, setCurrentCampaign] = useState<Partial<NewsletterCampaign>>({});
  const [currentTemplate, setCurrentTemplate] = useState<Partial<NewsletterTemplate>>({});
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Abone verileri
  const {
    items: subscribers,
    add: addSubscriber,
    update: updateSubscriber,
    remove: removeSubscriber,
    isLoading: subscribersLoading
  } = useDataService<NewsletterSubscriber>('newsletter-subscribers', [
    {
      id: 1,
      email: 'ornek@atydigital.com',
      name: 'Ahmet Yılmaz',
      status: 'active',
      joinDate: '2023-08-10T10:30:00',
      tags: ['müşteri', 'web-tasarım']
    },
    {
      id: 2,
      email: 'info@firmaabc.com',
      name: 'Firma ABC',
      status: 'active',
      joinDate: '2023-09-15T14:45:00',
      tags: ['potansiyel', 'e-ticaret']
    },
    {
      id: 3,
      email: 'test@mail.com',
      status: 'unsubscribed',
      joinDate: '2023-07-22T09:15:00'
    }
  ]);

  // Kampanya verileri
  const {
    items: campaigns,
    add: addCampaign,
    update: updateCampaign,
    remove: removeCampaign,
    isLoading: campaignsLoading
  } = useDataService<NewsletterCampaign>('newsletter-campaigns', [
    {
      id: 1,
      title: 'Mayıs Ayı Bülteni',
      subject: 'ATY Dijital - Mayıs Ayı Gelişmeleri',
      content: '<h1>Mayıs Ayı Gelişmeleri</h1><p>ATY Dijital olarak bu ay gerçekleştirdiğimiz projeler ve yeniliklerle ilgili bilgilere göz atın.</p>',
      status: 'sent',
      sendDate: '2023-05-10T10:00:00',
      openRate: 45.5,
      clickRate: 12.3,
      recipients: 120
    },
    {
      id: 2,
      title: 'Yeni Web Hizmetleri',
      subject: 'ATY Dijital - Yeni Web Hizmetlerimizi Keşfedin',
      content: '<h1>Yeni Web Hizmetlerimiz</h1><p>Firmanızın online varlığını güçlendirecek yeni hizmetlerimizle tanışın.</p>',
      status: 'draft'
    }
  ]);

  // Şablon verileri
  const {
    items: templates,
    add: addTemplate,
    update: updateTemplate,
    remove: removeTemplate,
    isLoading: templatesLoading
  } = useDataService<NewsletterTemplate>('newsletter-templates', [
    {
      id: 1,
      name: 'Standart Bülten',
      subject: '{{firma_adı}} - Aylık Bülten',
      content: '<h1>{{bülten_başlığı}}</h1><p>{{içerik}}</p><footer>{{iletişim_bilgileri}}</footer>',
      createdAt: '2023-04-05T10:30:00'
    },
    {
      id: 2,
      name: 'Promosyon Duyurusu',
      subject: 'Özel Teklif - {{kampanya_adı}}',
      content: '<h1>{{kampanya_adı}}</h1><p>{{kampanya_açıklaması}}</p><button>{{çağrı_butonu}}</button><footer>{{iletişim_bilgileri}}</footer>',
      createdAt: '2023-06-12T14:45:00'
    }
  ]);

  // Arama ve filtreleme fonksiyonları
  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (subscriber.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesFilter = filterStatus === 'all' || subscriber.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredCampaigns = campaigns.filter(campaign => {
    return campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredTemplates = templates.filter(template => {
    return template.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Abone dialog işlemleri
  const handleOpenSubscriberDialog = (subscriber?: NewsletterSubscriber) => {
    if (subscriber) {
      setCurrentSubscriber(subscriber);
      setIsEditing(true);
    } else {
      setCurrentSubscriber({ status: 'active' });
      setIsEditing(false);
    }
    setOpenSubscriberDialog(true);
  };

  const handleSaveSubscriber = () => {
    try {
      if (!currentSubscriber.email) {
        toast({
          title: "Hata",
          description: "E-posta adresi zorunludur.",
          variant: "destructive",
        });
        return;
      }
      
      const now = new Date().toISOString();
      const subscriber = {
        ...currentSubscriber,
        joinDate: currentSubscriber.joinDate || now
      };
      
      if (isEditing && currentSubscriber.id) {
        updateSubscriber(currentSubscriber.id, subscriber as NewsletterSubscriber);
        toast({
          title: "Başarılı",
          description: "Abone bilgileri güncellendi.",
        });
      } else {
        addSubscriber(subscriber as NewsletterSubscriber);
        toast({
          title: "Başarılı",
          description: "Yeni abone eklendi.",
        });
      }
      setOpenSubscriberDialog(false);
      setCurrentSubscriber({});
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  // Kampanya dialog işlemleri
  const handleOpenCampaignDialog = (campaign?: NewsletterCampaign) => {
    if (campaign) {
      setCurrentCampaign(campaign);
      setIsEditing(true);
    } else {
      setCurrentCampaign({ status: 'draft' });
      setIsEditing(false);
    }
    setOpenCampaignDialog(true);
  };

  const handleSaveCampaign = () => {
    try {
      if (!currentCampaign.title || !currentCampaign.subject) {
        toast({
          title: "Hata",
          description: "Başlık ve konu alanları zorunludur.",
          variant: "destructive",
        });
        return;
      }
      
      if (isEditing && currentCampaign.id) {
        updateCampaign(currentCampaign.id, currentCampaign as NewsletterCampaign);
        toast({
          title: "Başarılı",
          description: "Kampanya güncellendi.",
        });
      } else {
        addCampaign(currentCampaign as NewsletterCampaign);
        toast({
          title: "Başarılı",
          description: "Yeni kampanya oluşturuldu.",
        });
      }
      setOpenCampaignDialog(false);
      setCurrentCampaign({});
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  // Şablon dialog işlemleri
  const handleOpenTemplateDialog = (template?: NewsletterTemplate) => {
    if (template) {
      setCurrentTemplate(template);
      setIsEditing(true);
    } else {
      setCurrentTemplate({});
      setIsEditing(false);
    }
    setOpenTemplateDialog(true);
  };

  const handleSaveTemplate = () => {
    try {
      if (!currentTemplate.name || !currentTemplate.subject) {
        toast({
          title: "Hata",
          description: "Şablon adı ve konu alanları zorunludur.",
          variant: "destructive",
        });
        return;
      }
      
      const now = new Date().toISOString();
      const template = {
        ...currentTemplate,
        createdAt: currentTemplate.createdAt || now
      };
      
      if (isEditing && currentTemplate.id) {
        updateTemplate(currentTemplate.id, template as NewsletterTemplate);
        toast({
          title: "Başarılı",
          description: "Şablon güncellendi.",
        });
      } else {
        addTemplate(template as NewsletterTemplate);
        toast({
          title: "Başarılı",
          description: "Yeni şablon oluşturuldu.",
        });
      }
      setOpenTemplateDialog(false);
      setCurrentTemplate({});
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  // Silme işlemleri
  const handleDeleteSubscriber = (id: number) => {
    if (confirm('Bu aboneyi silmek istediğinize emin misiniz?')) {
      removeSubscriber(id);
      toast({
        title: "Başarılı",
        description: "Abone silindi.",
      });
    }
  };

  const handleDeleteCampaign = (id: number) => {
    if (confirm('Bu kampanyayı silmek istediğinize emin misiniz?')) {
      removeCampaign(id);
      toast({
        title: "Başarılı",
        description: "Kampanya silindi.",
      });
    }
  };

  const handleDeleteTemplate = (id: number) => {
    if (confirm('Bu şablonu silmek istediğinize emin misiniz?')) {
      removeTemplate(id);
      toast({
        title: "Başarılı",
        description: "Şablon silindi.",
      });
    }
  };

  // Tarih biçimlendirme
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Etiketleri işleme
  const handleTagChange = (tagsString: string) => {
    const tagArray = tagsString.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    setCurrentSubscriber({
      ...currentSubscriber,
      tags: tagArray.length > 0 ? tagArray : undefined
    });
  };

  // Kampanya gönderimi simülasyonu
  const handleSendCampaign = (id: number) => {
    const campaign = campaigns.find(c => c.id === id);
    if (campaign && campaign.status === 'draft') {
      const now = new Date().toISOString();
      updateCampaign(id, {
        ...campaign,
        status: 'sent',
        sendDate: now,
        openRate: Math.floor(Math.random() * 50) + 20,
        clickRate: Math.floor(Math.random() * 30) + 5,
        recipients: subscribers.filter(s => s.status === 'active').length
      });
      
      toast({
        title: "Kampanya Gönderildi",
        description: `"${campaign.title}" kampanyası başarıyla gönderildi.`,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center text-white">
            <Mail className="mr-2 h-6 w-6 text-ignite" />
            E-Bülten Yönetimi
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Aboneleri yönetin, kampanya oluşturun ve e-bülten şablonlarınızı düzenleyin
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-dark-600">
          <TabsTrigger value="subscribers" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white">
            <Users className="h-4 w-4 mr-2" /> Aboneler
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white">
            <Send className="h-4 w-4 mr-2" /> Kampanyalar
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white">
            <Mail className="h-4 w-4 mr-2" /> Şablonlar
          </TabsTrigger>
        </TabsList>

        {/* ABONELER SEKME İÇERİĞİ */}
        <TabsContent value="subscribers" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <Input
                placeholder="Abone ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-dark-400 border-dark-300 text-white"
              />
            </div>
            
            <div className="flex gap-2">
              <Select 
                value={filterStatus} 
                onValueChange={setFilterStatus}
              >
                <SelectTrigger className="bg-dark-400 border-dark-300 text-white w-auto min-w-[180px]">
                  <SelectValue placeholder="Tüm Aboneler" />
                </SelectTrigger>
                <SelectContent className="bg-dark-500 border-dark-400">
                  <SelectItem value="all">Tüm Aboneler</SelectItem>
                  <SelectItem value="active">Aktif Aboneler</SelectItem>
                  <SelectItem value="unsubscribed">Aboneliği İptal Edenler</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={() => handleOpenSubscriberDialog()} 
                className="bg-ignite hover:bg-ignite-700 whitespace-nowrap"
              >
                <Plus className="h-4 w-4 mr-2" /> Yeni Abone
              </Button>
              
              <Button 
                variant="outline" 
                className="border-dark-300 hover:bg-dark-400 text-white"
                title="Abone Listesini İndir"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-dark-600 text-white/80">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold">E-posta</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">İsim</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Durum</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Kayıt Tarihi</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Etiketler</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody className="text-white/80 divide-y divide-dark-400">
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-dark-500/50">
                    <td className="py-3 px-4 text-white">{subscriber.email}</td>
                    <td className="py-3 px-4">{subscriber.name || '-'}</td>
                    <td className="py-3 px-4">
                      <Badge className={subscriber.status === 'active' ? 'bg-emerald-600/30 text-emerald-400' : 'bg-amber-600/30 text-amber-400'}>
                        {subscriber.status === 'active' ? 'Aktif' : 'İptal Edildi'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{formatDate(subscriber.joinDate)}</td>
                    <td className="py-3 px-4">
                      {subscriber.tags?.map((tag) => (
                        <Badge key={tag} className="mr-1 mb-1 bg-dark-400 text-white/70">
                          {tag}
                        </Badge>
                      ))}
                    </td>
                    <td className="py-2 px-4 text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-dark-400"
                        onClick={() => handleOpenSubscriberDialog(subscriber)}
                      >
                        <Edit className="h-4 w-4 text-blue-400" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-dark-400"
                        onClick={() => handleDeleteSubscriber(subscriber.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredSubscribers.length === 0 && (
              <div className="text-center py-12 border border-dashed border-dark-400 rounded-md mt-4">
                <p className="text-white/60">
                  {searchTerm || filterStatus !== 'all' ? 'Arama kriterlerine uygun abone bulunamadı.' : 'Henüz abone bulunmuyor.'}
                </p>
                {!searchTerm && filterStatus === 'all' && (
                  <Button 
                    onClick={() => handleOpenSubscriberDialog()} 
                    className="mt-4 bg-ignite hover:bg-ignite-700"
                  >
                    <Plus className="h-4 w-4 mr-2" /> İlk Aboneyi Ekle
                  </Button>
                )}
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center pt-2 text-sm text-white/60">
            <div>
              Toplam {filteredSubscribers.length} abone gösteriliyor
            </div>
          </div>
        </TabsContent>

        {/* KAMPANYALAR SEKME İÇERİĞİ */}
        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <Input
                placeholder="Kampanya ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-dark-400 border-dark-300 text-white"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => handleOpenCampaignDialog()} 
                className="bg-ignite hover:bg-ignite-700 whitespace-nowrap"
              >
                <Plus className="h-4 w-4 mr-2" /> Yeni Kampanya
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-dark-500 border-dark-400">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white flex items-center">
                        {campaign.title}
                        <Badge className={`ml-3 ${
                          campaign.status === 'sent' ? 'bg-emerald-600/30 text-emerald-400' : 
                          campaign.status === 'scheduled' ? 'bg-blue-600/30 text-blue-400' : 
                          'bg-amber-600/30 text-amber-400'
                        }`}>
                          {campaign.status === 'sent' ? 'Gönderildi' : 
                           campaign.status === 'scheduled' ? 'Zamanlandı' : 
                           'Taslak'}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-white/60 mt-1">
                        Konu: {campaign.subject}
                      </CardDescription>
                    </div>
                    <div className="flex">
                      {campaign.status === 'draft' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-dark-300 hover:bg-dark-400 text-white"
                          onClick={() => handleSendCampaign(campaign.id)}
                          title="Kampanyayı Gönder"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-dark-400 ml-2"
                        onClick={() => handleOpenCampaignDialog(campaign)}
                      >
                        <Edit className="h-4 w-4 text-blue-400" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-dark-400 ml-2"
                        onClick={() => handleDeleteCampaign(campaign.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  {campaign.status === 'sent' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-dark-600 p-3 rounded-md mb-3">
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-white/60">Gönderim Tarihi</span>
                        <span className="text-white">{formatDate(campaign.sendDate || '')}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-white/60">Açılma Oranı</span>
                        <span className="text-white">{campaign.openRate}%</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-white/60">Tıklanma Oranı</span>
                        <span className="text-white">{campaign.clickRate}%</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-dark-600 rounded-md p-3 h-24 overflow-y-auto">
                    <div className="text-white/80 text-sm" dangerouslySetInnerHTML={{ __html: campaign.content }}></div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredCampaigns.length === 0 && (
              <div className="text-center py-12 border border-dashed border-dark-400 rounded-md">
                <p className="text-white/60">
                  {searchTerm ? 'Arama kriterlerine uygun kampanya bulunamadı.' : 'Henüz kampanya bulunmuyor.'}
                </p>
                {!searchTerm && (
                  <Button 
                    onClick={() => handleOpenCampaignDialog()} 
                    className="mt-4 bg-ignite hover:bg-ignite-700"
                  >
                    <Plus className="h-4 w-4 mr-2" /> İlk Kampanyayı Oluştur
                  </Button>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        {/* ŞABLONLAR SEKME İÇERİĞİ */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <Input
                placeholder="Şablon ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-dark-400 border-dark-300 text-white"
              />
            </div>
            
            <Button 
              onClick={() => handleOpenTemplateDialog()} 
              className="bg-ignite hover:bg-ignite-700 whitespace-nowrap"
            >
              <Plus className="h-4 w-4 mr-2" /> Yeni Şablon
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="bg-dark-500 border-dark-400">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white">{template.name}</CardTitle>
                    <div className="flex">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-dark-400"
                        onClick={() => handleOpenTemplateDialog(template)}
                      >
                        <Edit className="h-4 w-4 text-blue-400" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-dark-400 ml-2"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-white/60">
                    Konu: {template.subject}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="bg-dark-600 rounded-md p-3 h-24 overflow-y-auto">
                    <div className="text-white/80 text-sm" dangerouslySetInnerHTML={{ __html: template.content }}></div>
                  </div>
                  <div className="text-xs text-white/50 mt-2">
                    Oluşturma: {formatDate(template.createdAt)}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredTemplates.length === 0 && (
              <div className="text-center py-12 border border-dashed border-dark-400 rounded-md col-span-2">
                <p className="text-white/60">
                  {searchTerm ? 'Arama kriterlerine uygun şablon bulunamadı.' : 'Henüz şablon bulunmuyor.'}
                </p>
                {!searchTerm && (
                  <Button 
                    onClick={() => handleOpenTemplateDialog()} 
                    className="mt-4 bg-ignite hover:bg-ignite-700"
                  >
                    <Plus className="h-4 w-4 mr-2" /> İlk Şablonu Oluştur
                  </Button>
                )}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* ABONE DIALOG */}
      <Dialog open={openSubscriberDialog} onOpenChange={setOpenSubscriberDialog}>
        <DialogContent className="bg-dark-500 border-dark-400 text-white">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Abone Düzenle' : 'Yeni Abone Ekle'}</DialogTitle>
            <DialogDescription className="text-white/60">
              Abone bilgilerini düzenleyebilirsiniz.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">E-posta</label>
              <Input 
                value={currentSubscriber.email || ''} 
                onChange={(e) => setCurrentSubscriber({...currentSubscriber, email: e.target.value})}
                className="bg-dark-400 border-dark-300 text-white"
                placeholder="ornek@firma.com"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">İsim (Opsiyonel)</label>
              <Input 
                value={currentSubscriber.name || ''} 
                onChange={(e) => setCurrentSubscriber({...currentSubscriber, name: e.target.value})}
                className="bg-dark-400 border-dark-300 text-white"
                placeholder="Ad Soyad veya Firma Adı"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Durum</label>
              <Select 
                value={currentSubscriber.status}
                onValueChange={(value: 'active' | 'unsubscribed') => setCurrentSubscriber({...currentSubscriber, status: value})}
              >
                <SelectTrigger className="bg-dark-400 border-dark-300 text-white">
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent className="bg-dark-500 border-dark-400">
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="unsubscribed">Aboneliği İptal Edildi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Etiketler (virgülle ayırın)</label>
              <Input 
                value={currentSubscriber.tags?.join(', ') || ''} 
                onChange={(e) => handleTagChange(e.target.value)}
                className="bg-dark-400 border-dark-300 text-white"
                placeholder="müşteri, web-tasarım"
              />
              <p className="text-xs text-white/50">Etiketler aboneleri kategorilere ayırmak için kullanılabilir.</p>
            </div>
          </div>
          
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpenSubscriberDialog(false)} className="border-dark-300 hover:bg-dark-400 text-white">
              İptal
            </Button>
            <Button onClick={handleSaveSubscriber} className="bg-ignite hover:bg-ignite-700">
              {isEditing ? 'Güncelle' : '
