
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, Plus, Trash, Edit, CheckCircle, List, BarChart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define types for service details
interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

interface ServiceStat {
  id: string;
  label: string;
  value: string;
}

interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  features: string[];
  benefits: string[];
  process: ProcessStep[];
  platforms: string[];
  stats: ServiceStat[];
}

const defaultServiceDetail: ServiceDetail = {
  id: '',
  slug: '',
  title: '',
  description: '',
  longDescription: '',
  image: '',
  images: [],
  features: [],
  benefits: [],
  process: [],
  platforms: [],
  stats: []
};

const ServiceDetailManager = () => {
  const { toast } = useToast();
  const { items: serviceItems, update } = useDataService<ServiceDetail>('services', [
    {
      id: 'digital-marketing',
      slug: 'dijital-pazarlama',
      title: 'Dijital Pazarlama',
      description: 'Çok kanallı dijital pazarlama stratejileri ile markanızı büyütün ve hedef kitlenize ulaşın.',
      longDescription: "Günümüz rekabet ortamında dijital pazarlama, işletmelerin başarısı için kritik öneme sahiptir. Ignite Dijital olarak, markanızı hedef kitlenize ulaştırmak için kapsamlı ve entegre bir dijital pazarlama yaklaşımı sunuyoruz. Stratejik planlama, veri analizi ve yaratıcı içerik üretimi ile işletmenizin online varlığını güçlendirerek daha fazla müşteri edinmenize ve satışlarınızı artırmanıza yardımcı oluyoruz.",
      features: [
        'Pazarlama Stratejisi Geliştirme',
        'Dijital Reklamlar (PPC, Display)',
        'Sosyal Medya Pazarlaması',
        'İçerik Pazarlaması',
        'E-posta Pazarlaması',
        'Arama Motoru Optimizasyonu (SEO)',
        'Kampanya Yönetimi ve Analizi'
      ],
      benefits: [
        'Hedef kitleye daha odaklı erişim',
        'Daha düşük maliyet, daha yüksek ROI',
        'Ölçülebilir sonuçlar ve kampanya optimizasyonu',
        'Marka bilinirliğinde artış',
        'Müşteri sadakatinde gelişme'
      ],
      process: [
        { id: '1', title: 'Pazar Analizi', description: 'Sektör, rakip ve hedef kitle analizi ile pazarı anlamak' },
        { id: '2', title: 'Strateji Geliştirme', description: 'İşletme hedeflerinize uygun kapsamlı dijital pazarlama stratejisi oluşturma' },
        { id: '3', title: 'Kampanya Uygulama', description: 'Çoklu kanallarda dijital pazarlama kampanyalarının hayata geçirilmesi' },
        { id: '4', title: 'Optimizasyon', description: 'Veri analizine dayalı sürekli kampanya optimizasyonu' },
        { id: '5', title: 'Raporlama', description: 'Kampanya performansı ve ROI hakkında kapsamlı raporlar ve analiz' }
      ],
      platforms: [
        'google-analytics', 'google-ads', 'meta-ads', 'linkedin-ads', 'tiktok-ads', 'twitter-ads', 'instagram-ads', 'youtube-ads'
      ],
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80',
      images: [
        'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2031',
        'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2066',
        'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2068'
      ],
      stats: [
        { id: '1', label: 'Müşteri Memnuniyeti', value: '98%' },
        { id: '2', label: 'Ortalama ROI', value: '320%' },
        { id: '3', label: 'Tamamlanan Proje', value: '145+' }
      ]
    },
    {
      id: 'seo',
      slug: 'seo',
      title: 'SEO Optimizasyonu',
      description: 'Arama motorlarında üst sıralarda yer alın, organik trafiğinizi artırın ve potansiyel müşterilere ulaşın.',
      longDescription: "SEO (Arama Motoru Optimizasyonu), web sitenizin arama motorlarında daha üst sıralarda görünmesini sağlayan bir dijital pazarlama stratejisidir. Ignite Dijital olarak, teknik SEO, içerik optimizasyonu ve bağlantı kurma çalışmalarını içeren kapsamlı bir yaklaşımla web sitenizin arama sonuçlarındaki görünürlüğünü artırıyoruz. Bu sayede daha fazla organik trafik elde ediyor, potansiyel müşterilere ulaşıyor ve dönüşüm oranlarınızı iyileştiriyoruz.",
      features: [
        'Teknik SEO Optimizasyonu',
        'İçerik Stratejisi ve Optimizasyonu',
        'Anahtar Kelime Araştırması',
        'Rakip Analizi',
        'Yerel SEO',
        'Bağlantı Kurma Stratejileri',
        'SEO Uyumlu İçerik Üretimi'
      ],
      benefits: [
        'Organik trafikte artış',
        'Arama motorlarında üst sıralarda yer alma',
        'Marka bilinirliği ve güvenilirliğinde artış',
        'Uzun vadeli ve sürdürülebilir sonuçlar',
        'Ücretli reklamlara göre daha düşük maliyet'
      ],
      process: [
        { id: '1', title: 'Teknik Analiz', description: 'Web sitenizin teknik yapısının kapsamlı analizi' },
        { id: '2', title: 'Anahtar Kelime Araştırması', description: 'Sektörünüz ve hedef kitleniz için en etkili anahtar kelimelerin belirlenmesi' },
        { id: '3', title: 'İçerik Stratejisi', description: 'SEO odaklı içerik planı geliştirme' },
        { id: '4', title: 'Optimizasyon', description: 'Teknik SEO iyileştirmeleri ve içerik optimizasyonu' },
        { id: '5', title: 'Takip ve Raporlama', description: 'Sonuçların düzenli takibi ve performans raporlaması' }
      ],
      platforms: [
        'google-analytics', 'google-ads'
      ],
      image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80',
      images: [
        'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076',
        'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2074'
      ],
      stats: [
        { id: '1', label: 'Ortalama Trafik Artışı', value: '210%' },
        { id: '2', label: 'İlk Sayfada Sıralama', value: '85%' },
        { id: '3', label: 'Konversiyon Artışı', value: '75%' }
      ]
    }
  ]);

  const [selectedServiceId, setSelectedServiceId] = useState(serviceItems && serviceItems.length > 0 ? serviceItems[0]?.id : 'default-service');
  
  // Güvenli bir şekilde mevcut hizmeti al, yoksa varsayılan değeri kullan
  const currentService = serviceItems && serviceItems.length > 0 
    ? serviceItems.find(s => s.id === selectedServiceId) || serviceItems[0] 
    : defaultServiceDetail;
  
  const [formData, setFormData] = useState<ServiceDetail>(currentService);
  const [activeTab, setActiveTab] = useState('general');
  const [editingProcessIndex, setEditingProcessIndex] = useState<number | null>(null);
  const [editingStatIndex, setEditingStatIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // New process step or stat item templates
  const newProcessTemplate: ProcessStep = {
    id: Date.now().toString(),
    title: 'Yeni Adım',
    description: 'Bu adım hakkında açıklama yazınız.'
  };
  
  const newStatTemplate: ServiceStat = {
    id: Date.now().toString(),
    label: 'Yeni İstatistik',
    value: '0%'
  };

  // Handle service selection change
  const handleServiceChange = (id: string) => {
    if (!id || id === '') {
      id = serviceItems && serviceItems.length > 0 ? serviceItems[0]?.id : 'default-service';
    }
    
    const selectedService = serviceItems && serviceItems.length > 0 
      ? serviceItems.find(s => s.id === id)
      : null;
      
    if (selectedService) {
      setSelectedServiceId(id);
      setFormData(selectedService);
      setEditingProcessIndex(null);
      setEditingStatIndex(null);
    }
  };

  // Handle general input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Handle array-based field updates (features, benefits, platforms, images)
  const handleArrayItemChange = (field: keyof ServiceDetail, index: number, value: string) => {
    if (Array.isArray(formData[field])) {
      const updatedArray = [...(formData[field] as string[])];
      updatedArray[index] = value;
      
      setFormData({
        ...formData,
        [field]: updatedArray
      });
    }
  };

  // Add new item to array field
  const addArrayItem = (field: keyof ServiceDetail, defaultValue: string = '') => {
    if (Array.isArray(formData[field])) {
      const updatedArray = [...(formData[field] as string[]), defaultValue];
      
      setFormData({
        ...formData,
        [field]: updatedArray
      });
      
      toast({
        title: "Yeni Öğe Eklendi",
        description: `${field.charAt(0).toUpperCase() + field.slice(1)} listesine yeni bir öğe eklendi.`,
      });
    }
  };

  // Remove item from array field
  const removeArrayItem = (field: keyof ServiceDetail, index: number) => {
    if (Array.isArray(formData[field])) {
      const updatedArray = [...(formData[field] as string[])];
      updatedArray.splice(index, 1);
      
      setFormData({
        ...formData,
        [field]: updatedArray
      });
      
      toast({
        title: "Öğe Kaldırıldı",
        description: `${field.charAt(0).toUpperCase() + field.slice(1)} listesinden bir öğe kaldırıldı.`,
      });
    }
  };

  // Handle process step changes
  const handleProcessStepChange = (index: number, field: keyof ProcessStep, value: string) => {
    if (Array.isArray(formData.process)) {
      const updatedProcess = [...formData.process];
      updatedProcess[index] = {
        ...updatedProcess[index],
        [field]: value
      };
      
      setFormData({
        ...formData,
        process: updatedProcess
      });
    }
  };

  // Add new process step
  const addProcessStep = () => {
    const updatedProcess = Array.isArray(formData.process) 
      ? [...formData.process, {...newProcessTemplate, id: Date.now().toString()}]
      : [{...newProcessTemplate, id: Date.now().toString()}];
    
    setFormData({
      ...formData,
      process: updatedProcess
    });
    
    setEditingProcessIndex(updatedProcess.length - 1);
    
    toast({
      title: "Yeni Süreç Adımı Eklendi",
      description: "Yeni bir süreç adımı eklendi. Lütfen içeriği düzenleyin.",
    });
  };

  // Remove process step
  const removeProcessStep = (index: number) => {
    if (Array.isArray(formData.process)) {
      const updatedProcess = [...formData.process];
      updatedProcess.splice(index, 1);
      
      setFormData({
        ...formData,
        process: updatedProcess
      });
      
      setEditingProcessIndex(null);
      toast({
        title: "Süreç Adımı Kaldırıldı",
        description: "Süreç adımı başarıyla kaldırıldı.",
      });
    }
  };

  // Handle stat item changes
  const handleStatChange = (index: number, field: keyof ServiceStat, value: string) => {
    if (Array.isArray(formData.stats)) {
      const updatedStats = [...formData.stats];
      updatedStats[index] = {
        ...updatedStats[index],
        [field]: value
      };
      
      setFormData({
        ...formData,
        stats: updatedStats
      });
    }
  };

  // Add new stat item
  const addStat = () => {
    const updatedStats = Array.isArray(formData.stats)
      ? [...formData.stats, {...newStatTemplate, id: Date.now().toString()}]
      : [{...newStatTemplate, id: Date.now().toString()}];
      
    setFormData({
      ...formData,
      stats: updatedStats
    });
    
    setEditingStatIndex(updatedStats.length - 1);
    
    toast({
      title: "Yeni İstatistik Eklendi",
      description: "Yeni bir istatistik eklendi. Lütfen içeriği düzenleyin.",
    });
  };

  // Remove stat item
  const removeStat = (index: number) => {
    if (Array.isArray(formData.stats)) {
      const updatedStats = [...formData.stats];
      updatedStats.splice(index, 1);
      
      setFormData({
        ...formData,
        stats: updatedStats
      });
      
      setEditingStatIndex(null);
      toast({
        title: "İstatistik Kaldırıldı",
        description: "İstatistik başarıyla kaldırıldı.",
      });
    }
  };

  // Save changes
  const saveChanges = async () => {
    setIsLoading(true);
    try {
      await update(formData.id, formData);
      toast({
        title: "Değişiklikler Kaydedildi",
        description: "Hizmet detayları başarıyla güncellendi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "İçerik kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
      console.error("Save error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Güvenli erişim için varsayılan boş diziler oluştur
  const features = formData.features || [];
  const benefits = formData.benefits || [];
  const process = formData.process || [];
  const images = formData.images || [];
  const stats = formData.stats || [];
  const platforms = formData.platforms || [];

  return (
    <div className="space-y-6">
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader>
          <CardTitle className="text-xl text-white">Hizmet Detay Yönetimi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Hizmet Seçin</label>
              <Select 
                value={selectedServiceId || "default-service"}
                onValueChange={handleServiceChange}
              >
                <SelectTrigger className="w-full bg-dark-400 border-dark-300 text-white">
                  <SelectValue placeholder="Bir hizmet seçin" />
                </SelectTrigger>
                <SelectContent className="bg-dark-600 border-dark-300 text-white">
                  {serviceItems && serviceItems.length > 0 ? serviceItems.map((service) => (
                    <SelectItem key={service.id} value={service.id || "default-service"} className="text-white hover:bg-dark-500">
                      {service.title || "İsimsiz Hizmet"}
                    </SelectItem>
                  )) : (
                    <SelectItem value="no-services" className="text-white hover:bg-dark-500">
                      Hizmet bulunamadı
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full bg-dark-600">
                <TabsTrigger value="general" className="flex-1 text-white">Genel Bilgiler</TabsTrigger>
                <TabsTrigger value="features" className="flex-1 text-white">Hizmet Kapsamı</TabsTrigger>
                <TabsTrigger value="benefits" className="flex-1 text-white">Faydalar</TabsTrigger>
                <TabsTrigger value="process" className="flex-1 text-white">Çalışma Süreci</TabsTrigger>
                <TabsTrigger value="visuals" className="flex-1 text-white">Görseller</TabsTrigger>
                <TabsTrigger value="stats" className="flex-1 text-white">İstatistikler</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Başlık</label>
                      <Input 
                        value={formData.title || ''} 
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="bg-dark-400 border-dark-300 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">URL Slug</label>
                      <Input 
                        value={formData.slug || ''} 
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        className="bg-dark-400 border-dark-300 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Kısa Açıklama</label>
                    <Input 
                      value={formData.description || ''} 
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="bg-dark-400 border-dark-300 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Detaylı Açıklama</label>
                    <Textarea 
                      value={formData.longDescription || ''} 
                      onChange={(e) => handleInputChange('longDescription', e.target.value)}
                      className="bg-dark-400 border-dark-300 text-white"
                      rows={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Ana Görsel URL</label>
                    <Input 
                      value={formData.image || ''} 
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      className="bg-dark-400 border-dark-300 text-white"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="pt-4">
                <div className="border border-dark-400 rounded-md">
                  <div className="bg-dark-600 p-3 border-b border-dark-400 flex justify-between items-center">
                    <h3 className="text-sm font-medium flex items-center text-white">
                      <CheckCircle className="h-4 w-4 mr-2 text-ignite" /> Hizmet Kapsamı
                    </h3>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 text-green-400 hover:text-green-300 hover:bg-green-900/20"
                      onClick={() => addArrayItem('features', 'Yeni Hizmet Özelliği')}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Yeni Ekle
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-[300px] p-3">
                    <div className="space-y-2">
                      {features.length > 0 ? features.map((feature, index) => (
                        <div key={index} className="flex gap-2 items-center p-2 bg-dark-600 rounded-md">
                          <Input 
                            value={feature} 
                            onChange={(e) => handleArrayItemChange('features', index, e.target.value)}
                            className="bg-dark-400 border-dark-300 text-white"
                          />
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20 shrink-0"
                            onClick={() => removeArrayItem('features', index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      )) : (
                        <div className="text-center py-8 text-gray-400">Henüz hizmet kapsamı öğesi eklenmemiş. Yeni bir öğe ekleyin.</div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
                <div className="mt-4 text-sm text-white/50">
                  Hizmet kapsamınızdaki öğeleri yönetin. Her bir madde, hizmet detay sayfasında listelenecektir.
                </div>
              </TabsContent>
              
              <TabsContent value="benefits" className="pt-4">
                <div className="border border-dark-400 rounded-md">
                  <div className="bg-dark-600 p-3 border-b border-dark-400 flex justify-between items-center">
                    <h3 className="text-sm font-medium flex items-center text-white">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-400" /> Hizmet Faydaları
                    </h3>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 text-green-400 hover:text-green-300 hover:bg-green-900/20"
                      onClick={() => addArrayItem('benefits', 'Yeni Fayda')}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Yeni Ekle
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-[300px] p-3">
                    <div className="space-y-2">
                      {benefits.length > 0 ? benefits.map((benefit, index) => (
                        <div key={index} className="flex gap-2 items-center p-2 bg-dark-600 rounded-md">
                          <Input 
                            value={benefit} 
                            onChange={(e) => handleArrayItemChange('benefits', index, e.target.value)}
                            className="bg-dark-400 border-dark-300 text-white"
                          />
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20 shrink-0"
                            onClick={() => removeArrayItem('benefits', index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      )) : (
                        <div className="text-center py-8 text-gray-400">Henüz fayda öğesi eklenmemiş. Yeni bir fayda ekleyin.</div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
                <div className="mt-4 text-sm text-white/50">
                  Hizmetinizin müşterilere sağladığı faydaları yönetin. Bu maddeler, potansiyel müşterileri ikna etmek için önemlidir.
                </div>
              </TabsContent>
              
              <TabsContent value="process" className="pt-4">
                <div className="border border-dark-400 rounded-md">
                  <div className="bg-dark-600 p-3 border-b border-dark-400 flex justify-between items-center">
                    <h3 className="text-sm font-medium flex items-center text-white">
                      <List className="h-4 w-4 mr-2 text-blue-400" /> Çalışma Süreci Adımları
                    </h3>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 text-green-400 hover:text-green-300 hover:bg-green-900/20"
                      onClick={addProcessStep}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Yeni Adım Ekle
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-[400px] p-3">
                    <div className="space-y-4">
                      {process.length > 0 ? process.map((step, index) => (
                        <Card key={step.id} className="bg-dark-600 border-dark-400">
                          <CardHeader className="p-3 pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-sm flex items-center text-white">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 mr-2 text-xs">
                                  {index + 1}
                                </span>
                                {step.title}
                              </CardTitle>
                              <div className="flex gap-1">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-7 w-7 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                  onClick={() => setEditingProcessIndex(editingProcessIndex === index ? null : index)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                  onClick={() => removeProcessStep(index)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          {editingProcessIndex === index && (
                            <CardContent className="p-3 pt-2 space-y-3">
                              <div className="space-y-2">
                                <label className="text-xs font-medium text-white">Adım Başlığı</label>
                                <Input 
                                  value={step.title} 
                                  onChange={(e) => handleProcessStepChange(index, 'title', e.target.value)}
                                  className="bg-dark-400 border-dark-300 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-medium text-white">Açıklama</label>
                                <Textarea 
                                  value={step.description} 
                                  onChange={(e) => handleProcessStepChange(index, 'description', e.target.value)}
                                  className="bg-dark-400 border-dark-300 text-white"
                                  rows={2}
                                />
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      )) : (
                        <div className="text-center py-8 text-white/60">Henüz süreç adımı eklenmemiş. Yeni bir adım ekleyin.</div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
              
              <TabsContent value="visuals" className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Ana Görsel URL</label>
                    <Input 
                      value={formData.image || ''} 
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      className="bg-dark-400 border-dark-300 text-white"
                    />
                  </div>
                  
                  <div className="border border-dark-400 rounded-md">
                    <div className="bg-dark-600 p-3 border-b border-dark-400 flex justify-between items-center">
                      <h3 className="text-sm font-medium text-white">Galeri Görselleri</h3>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 text-green-400 hover:text-green-300 hover:bg-green-900/20"
                        onClick={() => addArrayItem('images', 'https://example.com/image.jpg')}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Görsel Ekle
                      </Button>
                    </div>
                    
                    <ScrollArea className="h-[300px] p-3">
                      <div className="space-y-4">
                        {images.length > 0 ? images.map((image, index) => (
                          <div key={index} className="p-2 bg-dark-600 rounded-md">
                            <div className="flex gap-2 items-center mb-2">
                              <Input 
                                value={image} 
                                onChange={(e) => handleArrayItemChange('images', index, e.target.value)}
                                className="bg-dark-400 border-dark-300 text-white"
                              />
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20 shrink-0"
                                onClick={() => removeArrayItem('images', index)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                            {image && (
                              <div className="h-32 w-full bg-dark-800 rounded overflow-hidden">
                                <img 
                                  src={image} 
                                  alt={`Preview ${index}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Görsel+Yüklenemedi';
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        )) : (
                          <div className="text-center py-8 text-gray-400">Henüz görsel eklenmemiş. Yeni bir görsel ekleyin.</div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="stats" className="pt-4">
                <div className="border border-dark-400 rounded-md">
                  <div className="bg-dark-600 p-3 border-b border-dark-400 flex justify-between items-center">
                    <h3 className="text-sm font-medium flex items-center text-white">
                      <BarChart className="h-4 w-4 mr-2 text-purple-400" /> İstatistikler
                    </h3>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 text-green-400 hover:text-green-300 hover:bg-green-900/20"
                      onClick={addStat}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Yeni İstatistik Ekle
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-[300px] p-3">
                    <div className="space-y-4">
                      {stats.length > 0 ? stats.map((stat, index) => (
                        <Card key={stat.id} className="bg-dark-600 border-dark-400">
                          <CardHeader className="p-3 pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-sm text-white">
                                {stat.label}: <span className="font-bold text-ignite">{stat.value}</span>
                              </CardTitle>
                              <div className="flex gap-1">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-7 w-7 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                  onClick={() => setEditingStatIndex(editingStatIndex === index ? null : index)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                  onClick={() => removeStat(index)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          {editingStatIndex === index && (
                            <CardContent className="p-3 pt-2 space-y-3">
                              <div className="space-y-2">
                                <label className="text-xs font-medium text-white">Etiket</label>
                                <Input 
                                  value={stat.label} 
                                  onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                                  className="bg-dark-400 border-dark-300 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-medium text-white">Değer</label>
                                <Input 
                                  value={stat.value} 
                                  onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                                  className="bg-dark-400 border-dark-300 text-white"
                                  placeholder="98%"
                                />
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      )) : (
                        <div className="text-center py-8 text-white/60">Henüz istatistik eklenmemiş. Yeni bir istatistik ekleyin.</div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
                <div className="mt-4 text-sm text-white/50">
                  İstatistikler, sunduğunuz hizmetin başarısını vurgular ve potansiyel müşterileri ikna etmeye yardımcı olur.
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end mt-6">
              <Button 
                className="bg-ignite hover:bg-ignite-700" 
                disabled={isLoading}
                onClick={saveChanges}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Değişiklikleri Kaydet
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceDetailManager;
