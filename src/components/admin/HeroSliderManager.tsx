
import { useState, useEffect } from 'react';
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
import { ArrowDown, ArrowUp, Eye, Plus, Save, Trash2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useDataService } from '@/lib/db';
import { motion, AnimatePresence } from 'framer-motion';

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  isActive: boolean;
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Ignite Your Brand's Digital Presence",
    subtitle: "We combine creativity, data, and technology to craft digital experiences that transform businesses and drive exceptional results.",
    buttonText: "Explore Our Services",
    buttonLink: "/services",
    backgroundImage: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2070",
    isActive: true
  }
];

const HeroSliderManager = () => {
  const { toast } = useToast();
  const { 
    items: slides, 
    add: addSlide, 
    update: updateSlide, 
    remove: removeSlide,
    isLoading
  } = useDataService<HeroSlide>('heroSlides', defaultSlides);

  const [newSlide, setNewSlide] = useState<Omit<HeroSlide, 'id'>>({
    title: '',
    subtitle: '',
    buttonText: 'Explore Our Services',
    buttonLink: '/services',
    backgroundImage: '',
    isActive: true
  });
  
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddSlide = () => {
    if (!newSlide.title || !newSlide.subtitle) {
      toast({
        title: "Eksik Bilgi",
        description: "Başlık ve alt başlık alanları zorunludur.",
        variant: "destructive"
      });
      return;
    }
    
    addSlide(newSlide);
    setNewSlide({
      title: '',
      subtitle: '',
      buttonText: 'Explore Our Services',
      buttonLink: '/services',
      backgroundImage: '',
      isActive: true
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Slayt Eklendi",
      description: "Yeni hero slaytı başarıyla eklendi."
    });
  };
  
  const handleUpdateSlide = () => {
    if (!editingSlide || !editingSlide.title || !editingSlide.subtitle) {
      toast({
        title: "Eksik Bilgi",
        description: "Başlık ve alt başlık alanları zorunludur.",
        variant: "destructive"
      });
      return;
    }
    
    updateSlide(editingSlide.id, editingSlide);
    setEditingSlide(null);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Slayt Güncellendi",
      description: "Hero slaytı başarıyla güncellendi."
    });
  };
  
  const handleDeleteSlide = (id: number) => {
    if (slides.length <= 1) {
      toast({
        title: "İşlem Reddedildi",
        description: "En az bir adet hero slaytı bulunmalıdır.",
        variant: "destructive"
      });
      return;
    }
    
    removeSlide(id);
    
    toast({
      title: "Slayt Silindi",
      description: "Hero slaytı başarıyla silindi."
    });
  };
  
  const moveSlide = (id: number, direction: 'up' | 'down') => {
    const currentIndex = slides.findIndex(slide => slide.id === id);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === slides.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newSlides = [...slides];
    const [movedSlide] = newSlides.splice(currentIndex, 1);
    newSlides.splice(newIndex, 0, movedSlide);
    
    // Update all slides with new order
    newSlides.forEach((slide, index) => {
      updateSlide(slide.id, { ...slide, order: index });
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hero Slaytları</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ignite hover:bg-ignite-700">
              <Plus className="h-4 w-4 mr-2" /> Yeni Slayt Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-500 border-dark-400 text-white">
            <DialogHeader>
              <DialogTitle>Yeni Hero Slaytı Ekle</DialogTitle>
              <DialogDescription className="text-gray-400">
                Slayt bilgilerini doldurun ve kaydedin.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Başlık</label>
                <Input 
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({...newSlide, title: e.target.value})}
                  placeholder="Ana başlık"
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Alt Başlık</label>
                <Textarea 
                  value={newSlide.subtitle}
                  onChange={(e) => setNewSlide({...newSlide, subtitle: e.target.value})}
                  placeholder="Alt başlık metni"
                  className="bg-dark-400 border-dark-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Buton Metni</label>
                  <Input 
                    value={newSlide.buttonText}
                    onChange={(e) => setNewSlide({...newSlide, buttonText: e.target.value})}
                    placeholder="Buton metni"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Buton Linki</label>
                  <Input 
                    value={newSlide.buttonLink}
                    onChange={(e) => setNewSlide({...newSlide, buttonLink: e.target.value})}
                    placeholder="/services"
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Arkaplan Görseli URL</label>
                <Input 
                  value={newSlide.backgroundImage}
                  onChange={(e) => setNewSlide({...newSlide, backgroundImage: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                  className="bg-dark-400 border-dark-300"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                İptal
              </Button>
              <Button 
                className="bg-ignite hover:bg-ignite-700"
                onClick={handleAddSlide}
                disabled={isLoading}
              >
                {isLoading ? 'Ekleniyor...' : 'Slayt Ekle'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4 mt-6">
        <AnimatePresence>
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-dark-500 border-dark-400">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Slayt {index + 1}</CardTitle>
                      <CardDescription>{slide.title}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => moveSlide(slide.id, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => moveSlide(slide.id, 'down')}
                        disabled={index === slides.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => {
                          setEditingSlide(slide);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleDeleteSlide(slide.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p><strong>Alt Başlık:</strong> {slide.subtitle.substring(0, 60)}...</p>
                    <p><strong>Buton:</strong> {slide.buttonText} → {slide.buttonLink}</p>
                    {slide.backgroundImage && (
                      <div className="mt-2">
                        <img 
                          src={slide.backgroundImage} 
                          alt="Slayt önizleme" 
                          className="w-full h-32 object-cover rounded-md opacity-75"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-dark-500 border-dark-400 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Slayt Düzenle</DialogTitle>
            <DialogDescription className="text-gray-400">
              Slayt bilgilerini güncelleyin.
            </DialogDescription>
          </DialogHeader>
          {editingSlide && (
            <>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Başlık</label>
                  <Input 
                    value={editingSlide.title}
                    onChange={(e) => setEditingSlide({...editingSlide, title: e.target.value})}
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Alt Başlık</label>
                  <Textarea 
                    value={editingSlide.subtitle}
                    onChange={(e) => setEditingSlide({...editingSlide, subtitle: e.target.value})}
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Buton Metni</label>
                    <Input 
                      value={editingSlide.buttonText}
                      onChange={(e) => setEditingSlide({...editingSlide, buttonText: e.target.value})}
                      className="bg-dark-400 border-dark-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Buton Linki</label>
                    <Input 
                      value={editingSlide.buttonLink}
                      onChange={(e) => setEditingSlide({...editingSlide, buttonLink: e.target.value})}
                      className="bg-dark-400 border-dark-300"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Arkaplan Görseli URL</label>
                  <Input 
                    value={editingSlide.backgroundImage}
                    onChange={(e) => setEditingSlide({...editingSlide, backgroundImage: e.target.value})}
                    className="bg-dark-400 border-dark-300"
                  />
                </div>
                {editingSlide.backgroundImage && (
                  <div className="mt-2">
                    <img 
                      src={editingSlide.backgroundImage} 
                      alt="Slayt önizleme" 
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  İptal
                </Button>
                <Button 
                  className="bg-ignite hover:bg-ignite-700"
                  onClick={handleUpdateSlide}
                  disabled={isLoading}
                >
                  {isLoading ? 'Güncelleniyor...' : 'Güncelle'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroSliderManager;
