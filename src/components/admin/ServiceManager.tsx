
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ListTodo, Edit, Trash2, Plus, Image, Save, X, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  featured: boolean;
  content: string;
  metaTitle: string;
  metaDescription: string;
  scope: string[];
  detailedDescription: string;
}

const defaultService: Omit<Service, 'id'> = {
  title: '',
  slug: '',
  description: '',
  icon: 'ListTodo',
  image: '/placeholder.svg',
  featured: false,
  content: '',
  metaTitle: '',
  metaDescription: '',
  scope: [],
  detailedDescription: '',
};

const ServiceManager = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>(defaultService);
  const [isEditing, setIsEditing] = useState(false);
  const [scopeInput, setScopeInput] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();
  
  const {
    items: services,
    add: addService,
    update: updateService,
    remove: removeService,
    isLoading
  } = useDataService<Service>('services', [
    {
      id: 1,
      title: 'Dijital Pazarlama',
      slug: 'dijital-pazarlama',
      description: 'Markanızı dijital dünyada öne çıkaracak stratejiler',
      icon: 'LineChart',
      image: '/placeholder.svg',
      featured: true,
      content: '<p>Dijital pazarlama hizmetlerimizle işletmenizi büyütün.</p>',
      metaTitle: 'Dijital Pazarlama Hizmetleri | Ignite',
      metaDescription: 'Markanızı dijital dünyada öne çıkaracak stratejiler ve çözümler.',
      scope: ['SEO Optimizasyonu', 'İçerik Pazarlaması', 'Sosyal Medya Yönetimi'],
      detailedDescription: 'Dijital pazarlama hizmetlerimiz, işletmenizin online görünürlüğünü artırmak için özel stratejiler içerir.'
    },
    {
      id: 2,
      title: 'Web Tasarım',
      slug: 'web-tasarim',
      description: 'Modern ve etkileyici web siteleri',
      icon: 'Code',
      image: '/placeholder.svg',
      featured: true,
      content: '<p>Profesyonel web tasarım hizmetleri.</p>',
      metaTitle: 'Web Tasarım Hizmetleri | Ignite',
      metaDescription: 'Modern ve etkileyici web siteleri ile online varlığınızı güçlendirin.',
      scope: ['Responsive Tasarım', 'UI/UX Tasarımı', 'E-Ticaret Çözümleri'],
      detailedDescription: 'Web tasarım ekibimiz, modern ve kullanıcı dostu arayüzler geliştirerek markanızı en iyi şekilde temsil eder.'
    }
  ]);

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setCurrentService(service);
      setIsEditing(true);
    } else {
      setCurrentService(defaultService);
      setIsEditing(false);
    }
    setOpenDialog(true);
    setPreviewMode(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentService(defaultService);
    setIsEditing(false);
    setPreviewMode(false);
  };

  const handleSaveService = () => {
    try {
      if (isEditing && currentService.id) {
        updateService(currentService.id, currentService as Service);
        toast({
          title: "Başarılı",
          description: "Hizmet güncellendi.",
        });
      } else {
        addService(currentService as Omit<Service, 'id'>);
        toast({
          title: "Başarılı",
          description: "Yeni hizmet eklendi.",
        });
      }
      handleCloseDialog();
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteService = (id: number) => {
    if (confirm('Bu hizmeti silmek istediğinize emin misiniz?')) {
      removeService(id);
      toast({
        title: "Başarılı",
        description: "Hizmet silindi.",
      });
    }
  };

  const handleAddScope = () => {
    if (scopeInput.trim()) {
      const newScope = [...(currentService.scope || []), scopeInput.trim()];
      setCurrentService({...currentService, scope: newScope});
      setScopeInput('');
    }
  };

  const handleRemoveScope = (index: number) => {
    const newScope = [...(currentService.scope || [])];
    newScope.splice(index, 1);
    setCurrentService({...currentService, scope: newScope});
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would upload this file to a server
      // For now, we'll just create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setCurrentService({...currentService, image: imageUrl});
      
      toast({
        title: "Resim Yüklendi",
        description: "Resim başarıyla yüklendi.",
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
            <ListTodo className="mr-2 h-6 w-6 text-ignite" />
            Hizmetleri Yönet
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Müşterilere sunduğunuz hizmetleri buradan düzenleyebilirsiniz
          </p>
        </div>
        <Button 
          onClick={() => handleOpenDialog()} 
          className="bg-ignite hover:bg-ignite-700"
        >
          <Plus className="h-4 w-4 mr-2" /> Yeni Hizmet Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <Card key={service.id} className="bg-dark-500 border-dark-400 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4 bg-dark-600 p-4 flex items-center justify-center">
                {service.image && service.image !== '/placeholder.svg' ? (
                  <div className="w-full h-32 overflow-hidden rounded-md">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-ignite/20 rounded-full flex items-center justify-center">
                    <Image className="h-8 w-8 text-ignite" />
                  </div>
                )}
              </div>
              <div className="w-full md:w-3/4 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-white">{service.title}</h3>
                    <p className="text-sm text-white/60 mt-1">{service.description}</p>
                    
                    {service.scope && service.scope.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-white/40 mb-1">Hizmet Kapsamı:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {service.scope.map((item, index) => (
                            <Badge key={index} className="bg-ignite/10 text-ignite text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center mt-2 space-x-2">
                      <Badge className="bg-dark-400 text-white/70">/{service.slug}</Badge>
                      {service.featured && <Badge className="bg-ignite/20 text-ignite">Öne Çıkan</Badge>}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-dark-400"
                      onClick={() => handleOpenDialog(service)}
                    >
                      <Edit className="h-4 w-4 text-blue-400" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-dark-400"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-dark-500 border-dark-400 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}</DialogTitle>
            <DialogDescription>
              Hizmet bilgilerini aşağıdaki formdan düzenleyebilirsiniz.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex space-x-2 mb-4">
            <Button 
              variant={!previewMode ? "secondary" : "outline"} 
              onClick={() => setPreviewMode(false)}
              className="flex-1"
            >
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
            <Button 
              variant={previewMode ? "secondary" : "outline"} 
              onClick={() => setPreviewMode(true)}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-2" />
              Önizle
            </Button>
          </div>
          
          {!previewMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Hizmet Adı</label>
                <Input 
                  value={currentService.title || ''} 
                  onChange={(e) => setCurrentService({...currentService, title: e.target.value})}
                  className="bg-dark-400 border-dark-300"
                  placeholder="Örn: Dijital Pazarlama"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Hizmet URL (Slug)</label>
                <div className="flex items-center">
                  <span className="bg-dark-600 border border-dark-300 border-r-0 rounded-l-md px-3 py-2 text-white/60">/</span>
                  <Input 
                    value={currentService.slug || ''} 
                    onChange={(e) => setCurrentService({...currentService, slug: e.target.value})}
                    className="bg-dark-400 border-dark-300 rounded-l-none"
                    placeholder="dijital-pazarlama"
                  />
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Kısa Açıklama</label>
                <Textarea 
                  value={currentService.description || ''} 
                  onChange={(e) => setCurrentService({...currentService, description: e.target.value})}
                  className="bg-dark-400 border-dark-300 resize-none"
                  placeholder="Hizmetin kısa açıklaması"
                  rows={2}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Detaylı Açıklama</label>
                <Textarea 
                  value={currentService.detailedDescription || ''} 
                  onChange={(e) => setCurrentService({...currentService, detailedDescription: e.target.value})}
                  className="bg-dark-400 border-dark-300 resize-none"
                  placeholder="Hizmetin detaylı açıklaması"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">İkon</label>
                <Input 
                  value={currentService.icon || ''} 
                  onChange={(e) => setCurrentService({...currentService, icon: e.target.value})}
                  className="bg-dark-400 border-dark-300"
                  placeholder="ListTodo"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Öne Çıkan</label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={currentService.featured || false}
                    onCheckedChange={(checked) => setCurrentService({...currentService, featured: checked})}
                    className="data-[state=checked]:bg-ignite"
                  />
                  <span className="text-sm text-white/70">Hizmeti ana sayfada göster</span>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Hizmet Görseli</label>
                <div className="flex flex-col space-y-2">
                  {currentService.image && (
                    <div className="w-full h-40 rounded-md overflow-hidden bg-dark-600 mb-2">
                      <img 
                        src={currentService.image} 
                        alt={currentService.title} 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                  )}
                  <Input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="bg-dark-400 border-dark-300"
                  />
                  <p className="text-xs text-white/40">
                    Tavsiye edilen boyutlar: 800x600px, Maksimum boyut: 2MB
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Hizmet Kapsamı</label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {currentService.scope && currentService.scope.map((item, index) => (
                    <Badge 
                      key={index} 
                      className="bg-ignite/10 text-ignite flex items-center gap-1 px-3 py-1"
                    >
                      {item}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-white" 
                        onClick={() => handleRemoveScope(index)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={scopeInput}
                    onChange={(e) => setScopeInput(e.target.value)}
                    placeholder="Hizmet kapsamını girin"
                    className="bg-dark-400 border-dark-300 flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddScope()}
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddScope}
                    className="bg-ignite hover:bg-ignite-700"
                  >
                    Ekle
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">İçerik</label>
                <Textarea 
                  value={currentService.content || ''} 
                  onChange={(e) => setCurrentService({...currentService, content: e.target.value})}
                  className="bg-dark-400 border-dark-300 resize-none"
                  placeholder="Hizmetin detaylı açıklaması. HTML içerebilir."
                  rows={5}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Meta Başlık (SEO)</label>
                <Input 
                  value={currentService.metaTitle || ''} 
                  onChange={(e) => setCurrentService({...currentService, metaTitle: e.target.value})}
                  className="bg-dark-400 border-dark-300"
                  placeholder="SEO için başlık"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Meta Açıklama (SEO)</label>
                <Input 
                  value={currentService.metaDescription || ''} 
                  onChange={(e) => setCurrentService({...currentService, metaDescription: e.target.value})}
                  className="bg-dark-400 border-dark-300"
                  placeholder="SEO için açıklama"
                />
              </div>
            </div>
          ) : (
            <div className="py-4 px-2 space-y-6 bg-dark-600 rounded-md">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">{currentService.title || 'Hizmet Başlığı'}</h3>
                <p className="text-white/70 mt-2">{currentService.description || 'Hizmet açıklaması burada görünecek.'}</p>
              </div>
              
              {currentService.image && (
                <div className="w-full h-60 rounded-md overflow-hidden bg-dark-700">
                  <img 
                    src={currentService.image} 
                    alt={currentService.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-ignite">Hizmet Kapsamı</h4>
                  {currentService.scope && currentService.scope.length > 0 ? (
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {currentService.scope.map((item, index) => (
                        <li key={index} className="text-white/80">{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-white/50 text-sm italic">Henüz bir hizmet kapsamı girilmemiş.</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-ignite">Detaylı Açıklama</h4>
                  <p className="text-white/80 mt-2">{currentService.detailedDescription || 'Detaylı açıklama burada görünecek.'}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-ignite">İçerik</h4>
                  <div 
                    className="text-white/80 mt-2 p-3 bg-dark-500 rounded-md"
                    dangerouslySetInnerHTML={{__html: currentService.content || '<p>İçerik burada görünecek.</p>'}}
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between sm:justify-end gap-2">
            <Button variant="outline" onClick={handleCloseDialog} className="border-dark-300 hover:bg-dark-400">
              <X className="h-4 w-4 mr-2" /> İptal
            </Button>
            <Button onClick={handleSaveService} className="bg-ignite hover:bg-ignite-700">
              <Save className="h-4 w-4 mr-2" /> Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ServiceManager;
