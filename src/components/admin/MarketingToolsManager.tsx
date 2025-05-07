
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Edit, Plus, Save, Trash2, X, Link, Image } from 'lucide-react';

interface MarketingTool {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

const MarketingToolsManager = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTool, setCurrentTool] = useState<Partial<MarketingTool>>({});
  const { toast } = useToast();
  
  const {
    items: marketingTools,
    add: addTool,
    update: updateTool,
    remove: removeTool,
    isLoading
  } = useDataService<MarketingTool>('marketingTools', [
    {
      id: 1,
      name: "Google Analytics",
      description: "Web sitenizin trafik ve performans verilerini analiz etmenizi sağlayan güçlü bir analitik platformu.",
      image: "/placeholder.svg",
      category: "Analitik",
      link: "https://analytics.google.com"
    },
    {
      id: 2,
      name: "Mailchimp",
      description: "E-posta pazarlama kampanyalarını yönetmek ve otomatikleştirmek için kullanılan popüler bir platform.",
      image: "/placeholder.svg",
      category: "E-posta Pazarlama",
      link: "https://mailchimp.com"
    },
    {
      id: 3,
      name: "HubSpot",
      description: "Müşteri ilişkileri yönetimi, pazarlama otomasyonu ve satış araçları sunan kapsamlı bir CRM platformu.",
      image: "/placeholder.svg",
      category: "CRM",
      link: "https://hubspot.com"
    }
  ]);

  const categories = [
    "Analitik",
    "SEO",
    "E-posta Pazarlama",
    "Sosyal Medya",
    "CRM",
    "İçerik Pazarlama",
    "Reklam",
    "Diğer"
  ];

  const handleOpenDialog = (tool?: MarketingTool) => {
    if (tool) {
      setCurrentTool({...tool});
    } else {
      setCurrentTool({
        name: '',
        description: '',
        image: '/placeholder.svg',
        category: categories[0],
        link: ''
      });
    }
    setOpenDialog(true);
  };

  const handleSaveTool = () => {
    try {
      if (!currentTool.name || !currentTool.description) {
        toast({
          title: "Hata",
          description: "Tüm gerekli alanları doldurun.",
          variant: "destructive",
        });
        return;
      }

      if (currentTool.id) {
        updateTool(currentTool.id, currentTool as MarketingTool);
        toast({
          title: "Başarılı",
          description: "Pazarlama aracı güncellendi.",
        });
      } else {
        addTool(currentTool as Omit<MarketingTool, 'id'>);
        toast({
          title: "Başarılı",
          description: "Yeni pazarlama aracı eklendi.",
        });
      }
      setOpenDialog(false);
      setCurrentTool({});
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTool = (id: number) => {
    if (confirm('Bu pazarlama aracını silmek istediğinize emin misiniz?')) {
      removeTool(id);
      toast({
        title: "Başarılı",
        description: "Pazarlama aracı silindi.",
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
          <h2 className="text-2xl font-bold text-white">Pazarlama Araçları</h2>
          <p className="text-sm text-white/60 mt-1">
            Web sitenizde gösterilen pazarlama araçlarını yönetin
          </p>
        </div>
        <Button 
          onClick={() => handleOpenDialog()} 
          className="bg-ignite hover:bg-ignite-700"
        >
          <Plus className="h-4 w-4 mr-2" /> Yeni Araç Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marketingTools.map((tool) => (
          <Card key={tool.id} className="bg-dark-500 border-dark-400">
            <CardHeader className="pb-2 flex justify-between items-start">
              <div>
                <CardTitle className="text-lg flex items-center text-white">
                  {tool.name}
                </CardTitle>
                <p className="text-sm text-ignite mt-1">{tool.category}</p>
              </div>
              <div className="flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-dark-400"
                  onClick={() => handleOpenDialog(tool)}
                >
                  <Edit className="h-4 w-4 text-blue-400" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-dark-400"
                  onClick={() => handleDeleteTool(tool.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-center py-2">
                <img src={tool.image} alt={tool.name} className="h-16 w-16 object-contain" />
              </div>
              <p className="text-sm text-white/70">{tool.description}</p>
              <div className="pt-2">
                <a 
                  href={tool.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs flex items-center text-blue-400 hover:underline"
                >
                  <Link className="h-3 w-3 mr-1" />
                  Web Sitesi
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {marketingTools.length === 0 && (
        <div className="text-center py-12 border border-dashed border-dark-400 rounded-lg">
          <p className="text-white/60">Henüz pazarlama aracı eklenmemiş</p>
          <Button 
            onClick={() => handleOpenDialog()} 
            className="mt-4 bg-ignite hover:bg-ignite-700"
          >
            <Plus className="h-4 w-4 mr-2" /> İlk Aracı Ekle
          </Button>
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-dark-500 border-dark-400 text-white">
          <DialogHeader>
            <DialogTitle>{currentTool.id ? 'Pazarlama Aracı Düzenle' : 'Yeni Pazarlama Aracı Ekle'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Araç Adı</label>
              <Input 
                value={currentTool.name || ''}
                onChange={(e) => setCurrentTool({...currentTool, name: e.target.value})}
                className="bg-dark-400 border-dark-300 text-white"
                placeholder="Araç adı"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Kategori</label>
              <select
                value={currentTool.category}
                onChange={(e) => setCurrentTool({...currentTool, category: e.target.value})}
                className="w-full rounded-md bg-dark-400 border-dark-300 text-white p-2"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Açıklama</label>
              <Textarea 
                value={currentTool.description || ''}
                onChange={(e) => setCurrentTool({...currentTool, description: e.target.value})}
                className="bg-dark-400 border-dark-300 text-white"
                placeholder="Araç hakkında kısa açıklama"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white flex items-center">
                <Image className="h-4 w-4 mr-2" /> Görsel URL
              </label>
              <Input 
                value={currentTool.image || ''}
                onChange={(e) => setCurrentTool({...currentTool, image: e.target.value})}
                className="bg-dark-400 border-dark-300 text-white"
                placeholder="/images/tool.png"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white flex items-center">
                <Link className="h-4 w-4 mr-2" /> Web Sitesi Link
              </label>
              <Input 
                value={currentTool.link || ''}
                onChange={(e) => setCurrentTool({...currentTool, link: e.target.value})}
                className="bg-dark-400 border-dark-300 text-white"
                placeholder="https://example.com"
              />
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)} className="border-dark-300 text-white">
              <X className="h-4 w-4 mr-2" /> İptal
            </Button>
            <Button onClick={handleSaveTool} className="bg-ignite hover:bg-ignite-700">
              <Save className="h-4 w-4 mr-2" /> Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default MarketingToolsManager;
