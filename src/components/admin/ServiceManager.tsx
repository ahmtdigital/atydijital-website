
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
  metaDescription: ''
};

const ServiceManager = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>(defaultService);
  const [isEditing, setIsEditing] = useState(false);
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
      metaDescription: 'Markanızı dijital dünyada öne çıkaracak stratejiler ve çözümler.'
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
      metaDescription: 'Modern ve etkileyici web siteleri ile online varlığınızı güçlendirin.'
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
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentService(defaultService);
    setIsEditing(false);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
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
                <div className="w-16 h-16 bg-ignite/20 rounded-full flex items-center justify-center">
                  <Image className="h-8 w-8 text-ignite" />
                </div>
              </div>
              <div className="w-full md:w-3/4 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{service.title}</h3>
                    <p className="text-sm text-white/60 mt-1">{service.description}</p>
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
        <DialogContent className="bg-dark-500 border-dark-400 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}</DialogTitle>
            <DialogDescription>
              Hizmet bilgilerini aşağıdaki formdan düzenleyebilirsiniz.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Hizmet Adı</label>
              <Input 
                value={currentService.title} 
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
                  value={currentService.slug} 
                  onChange={(e) => setCurrentService({...currentService, slug: e.target.value})}
                  className="bg-dark-400 border-dark-300 rounded-l-none"
                  placeholder="dijital-pazarlama"
                />
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Kısa Açıklama</label>
              <Textarea 
                value={currentService.description} 
                onChange={(e) => setCurrentService({...currentService, description: e.target.value})}
                className="bg-dark-400 border-dark-300 resize-none"
                placeholder="Hizmetin kısa açıklaması"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">İkon</label>
              <Input 
                value={currentService.icon} 
                onChange={(e) => setCurrentService({...currentService, icon: e.target.value})}
                className="bg-dark-400 border-dark-300"
                placeholder="ListTodo"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Öne Çıkan</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  checked={currentService.featured}
                  onChange={(e) => setCurrentService({...currentService, featured: e.target.checked})}
                  className="w-4 h-4 accent-ignite"
                />
                <span className="text-sm text-white/70">Hizmeti ana sayfada göster</span>
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">İçerik</label>
              <Textarea 
                value={currentService.content} 
                onChange={(e) => setCurrentService({...currentService, content: e.target.value})}
                className="bg-dark-400 border-dark-300 resize-none"
                placeholder="Hizmetin detaylı açıklaması. HTML içerebilir."
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Başlık (SEO)</label>
              <Input 
                value={currentService.metaTitle} 
                onChange={(e) => setCurrentService({...currentService, metaTitle: e.target.value})}
                className="bg-dark-400 border-dark-300"
                placeholder="SEO için başlık"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Açıklama (SEO)</label>
              <Input 
                value={currentService.metaDescription} 
                onChange={(e) => setCurrentService({...currentService, metaDescription: e.target.value})}
                className="bg-dark-400 border-dark-300"
                placeholder="SEO için açıklama"
              />
            </div>
          </div>
          
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
