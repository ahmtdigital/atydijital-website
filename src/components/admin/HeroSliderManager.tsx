
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, ImageIcon, Link as LucideLink, MoveUp, MoveDown, ArrowUpDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { HeroSlide } from '@/types/HeroSlideTypes';

interface SliderItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  order: number;
  animation?: string;
  textColor?: string;
  buttonText?: string;
  buttonLink?: string;
  overlayOpacity?: number;
}

const HeroSliderManager = () => {
  const [sliderItems, setSliderItems] = useState<SliderItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSliderItem, setNewSliderItem] = useState<Omit<SliderItem, 'id' | 'order'>>({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    animation: 'fade',
    textColor: 'white',
    buttonText: 'Daha Fazla',
    buttonLink: '/',
    overlayOpacity: 60
  });
  const [editingItem, setEditingItem] = useState<SliderItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedSliderItem, setEditedSliderItem] = useState<SliderItem>({
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    order: 0,
    animation: 'fade',
    textColor: 'white',
    buttonText: 'Daha Fazla',
    buttonLink: '/',
    overlayOpacity: 60
  });
  const [activeTab, setActiveTab] = useState('content');
  const [sliderSettings, setSliderSettings] = useState({
    autoplay: true,
    autoplaySpeed: 5000,
    effect: 'fade',
    animationSpeed: 500,
    arrows: true,
    dots: true,
    infinite: true
  });

  useEffect(() => {
    // Load slider items from local storage or default values
    const storedSliderItems = localStorage.getItem('sliderItems');
    if (storedSliderItems) {
      setSliderItems(JSON.parse(storedSliderItems));
    } else {
      // Initialize with some default slider items
      setSliderItems([
        {
          id: uuidv4(),
          title: 'Ignite Your Brand',
          description: 'Reach new heights with our digital marketing strategies.',
          imageUrl: 'https://images.unsplash.com/photo-1606761940304-1293a7c2d135?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          link: '/',
          order: 1,
          animation: 'fade',
          textColor: 'white',
          buttonText: 'Hizmetlerimizi Keşfedin',
          buttonLink: '/services',
          overlayOpacity: 60
        },
        {
          id: uuidv4(),
          title: 'Data-Driven Results',
          description: 'We turn data into actionable insights for your business.',
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          link: '/services',
          order: 2,
          animation: 'slide',
          textColor: 'white',
          buttonText: 'Portfolyomuzu İnceleyin',
          buttonLink: '/portfolio',
          overlayOpacity: 65
        },
        {
          id: uuidv4(),
          title: 'SEO Çözümleri',
          description: 'Arama motorlarında üst sıralarda yer alarak hedef kitlenize ulaşın.',
          imageUrl: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=2070',
          link: '/services/seo',
          order: 3,
          animation: 'zoom',
          textColor: 'white',
          buttonText: 'SEO Hizmetlerimiz',
          buttonLink: '/services/seo',
          overlayOpacity: 70
        },
      ]);
    }

    // Load slider settings
    const storedSliderSettings = localStorage.getItem('sliderSettings');
    if (storedSliderSettings) {
      setSliderSettings(JSON.parse(storedSliderSettings));
    }
  }, []);

  useEffect(() => {
    // Save slider items to local storage whenever they change
    localStorage.setItem('sliderItems', JSON.stringify(sliderItems));
  }, [sliderItems]);

  useEffect(() => {
    // Save slider settings to local storage whenever they change
    localStorage.setItem('sliderSettings', JSON.stringify(sliderSettings));
  }, [sliderSettings]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewSliderItem({
      title: '',
      description: '',
      imageUrl: '',
      link: '',
      animation: 'fade',
      textColor: 'white',
      buttonText: 'Daha Fazla',
      buttonLink: '/',
      overlayOpacity: 60
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSliderItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewSliderItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setNewSliderItem(prevState => ({
      ...prevState,
      [name]: value[0],
    }));
  };

  const handleAddSliderItem = () => {
    const newItem: SliderItem = {
      id: uuidv4(),
      title: newSliderItem.title,
      description: newSliderItem.description,
      imageUrl: newSliderItem.imageUrl,
      link: newSliderItem.link,
      order: sliderItems.length + 1,
      animation: newSliderItem.animation,
      textColor: newSliderItem.textColor,
      buttonText: newSliderItem.buttonText,
      buttonLink: newSliderItem.buttonLink,
      overlayOpacity: newSliderItem.overlayOpacity
    };

    setSliderItems(prevItems => [...prevItems, newItem]);
    handleCloseDialog();
    toast({
      title: "Slider Eklendi",
      description: "Yeni slider başarıyla eklendi.",
    });
  };

  const handleDeleteSliderItem = (id: string) => {
    setSliderItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "Slider Silindi",
      description: "Slider başarıyla silindi.",
    });
  };

  const handleEditSliderItem = (item: SliderItem) => {
    setEditingItem(item);
    setEditedSliderItem(item);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingItem(null);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedSliderItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSelectChange = (name: string, value: string) => {
    setEditedSliderItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSliderChange = (name: string, value: number[]) => {
    setEditedSliderItem(prevState => ({
      ...prevState,
      [name]: value[0],
    }));
  };

  const handleUpdateSliderItem = () => {
    if (!editingItem) return;

    setSliderItems(prevItems =>
      prevItems.map(item =>
        item.id === editingItem.id ? editedSliderItem : item
      )
    );
    handleCloseEditDialog();
    toast({
      title: "Slider Güncellendi",
      description: "Slider başarıyla güncellendi.",
    });
  };

  const handleMoveUp = (id: string) => {
    setSliderItems(prevItems => {
      const items = [...prevItems];
      const index = items.findIndex(item => item.id === id);
      if (index > 0) {
        // Swap items and update order
        [items[index - 1], items[index]] = [items[index], items[index - 1]];
        items[index - 1].order = index;
        items[index].order = index + 1;
      }
      return items;
    });
  };

  const handleMoveDown = (id: string) => {
    setSliderItems(prevItems => {
      const items = [...prevItems];
      const index = items.findIndex(item => item.id === id);
      if (index < items.length - 1) {
        // Swap items and update order
        [items[index], items[index + 1]] = [items[index + 1], items[index]];
        items[index].order = index + 1;
        items[index + 1].order = index + 2;
      }
      return items;
    });
  };

  const handleSliderSettingChange = (
    setting: keyof typeof sliderSettings,
    value: typeof sliderSettings[keyof typeof sliderSettings]
  ) => {
    setSliderSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Hero Slider Yönetimi</h2>
          <p className="text-sm text-white/60 mt-1">Ana sayfa slider içeriklerini ve görünümünü yönetin</p>
        </div>
        <Button onClick={handleOpenDialog} className="bg-ignite hover:bg-ignite-700">
          <Plus className="h-4 w-4 mr-2" /> Yeni Slider Ekle
        </Button>
      </div>

      <Tabs defaultValue="slides" className="w-full">
        <TabsList className="bg-dark-600 mb-6">
          <TabsTrigger value="slides">Sliderlar</TabsTrigger>
          <TabsTrigger value="settings">Slider Ayarları</TabsTrigger>
          <TabsTrigger value="preview">Önizleme</TabsTrigger>
        </TabsList>

        <TabsContent value="slides">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle>Slider Öğeleri</CardTitle>
              <CardDescription>Slider öğelerini yönetin, düzenleyin veya silin</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Sıra</TableHead>
                    <TableHead className="w-[200px]">Başlık</TableHead>
                    <TableHead>Açıklama</TableHead>
                    <TableHead>Görsel</TableHead>
                    <TableHead>Animasyon</TableHead>
                    <TableHead className="text-right">Eylemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sliderItems.sort((a, b) => a.order - b.order).map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col items-center">
                          <span className="font-bold">{index + 1}</span>
                          <div className="flex mt-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleMoveUp(item.id)}
                              disabled={index === 0}
                              className="h-6 w-6"
                            >
                              <MoveUp className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleMoveDown(item.id)}
                              disabled={index === sliderItems.length - 1}
                              className="h-6 w-6"
                            >
                              <MoveDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        <a href={item.imageUrl} target="_blank" rel="noopener noreferrer" className="text-ignite hover:text-ignite-400 underline">
                          <div className="w-24 h-16 relative overflow-hidden rounded-md">
                            <AspectRatio ratio={16 / 9}>
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="object-cover w-full h-full"
                              />
                            </AspectRatio>
                          </div>
                        </a>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-dark-600 rounded-full text-xs">
                          {item.animation || 'fade'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditSliderItem(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteSliderItem(item.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle>Slider Görünüm Ayarları</CardTitle>
              <CardDescription>Animasyonları ve slider davranışını özelleştirin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Genel Ayarlar</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Otomatik Oynat</Label>
                      <p className="text-sm text-white/60">Sliderlerin otomatik olarak değişmesi</p>
                    </div>
                    <Switch 
                      checked={sliderSettings.autoplay}
                      onCheckedChange={(value) => handleSliderSettingChange('autoplay', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Okları Göster</Label>
                      <p className="text-sm text-white/60">Gezinme oklarını göster</p>
                    </div>
                    <Switch 
                      checked={sliderSettings.arrows}
                      onCheckedChange={(value) => handleSliderSettingChange('arrows', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Noktaları Göster</Label>
                      <p className="text-sm text-white/60">Slider noktalarını göster</p>
                    </div>
                    <Switch 
                      checked={sliderSettings.dots}
                      onCheckedChange={(value) => handleSliderSettingChange('dots', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Sonsuz Döngü</Label>
                      <p className="text-sm text-white/60">Son sliderdan sonra başa dön</p>
                    </div>
                    <Switch 
                      checked={sliderSettings.infinite}
                      onCheckedChange={(value) => handleSliderSettingChange('infinite', value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Animasyon Ayarları</h3>

                  <div className="space-y-2">
                    <Label>Varsayılan Animasyon Efekti</Label>
                    <Select 
                      value={sliderSettings.effect}
                      onValueChange={(value) => handleSliderSettingChange('effect', value)}
                    >
                      <SelectTrigger className="bg-dark-400 border-dark-300">
                        <SelectValue placeholder="Animasyon Efekti" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fade">Solma Efekti</SelectItem>
                        <SelectItem value="slide">Kayma Efekti</SelectItem>
                        <SelectItem value="zoom">Yakınlaştırma Efekti</SelectItem>
                        <SelectItem value="flip">Çevirme Efekti</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Otomatik Oynatma Hızı (ms)</Label>
                    <div className="flex items-center space-x-4">
                      <Slider 
                        value={[sliderSettings.autoplaySpeed]} 
                        min={2000}
                        max={10000}
                        step={500}
                        onValueChange={(value) => handleSliderSettingChange('autoplaySpeed', value[0])}
                        className="flex-1"
                      />
                      <span>{sliderSettings.autoplaySpeed}ms</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Animasyon Süresi (ms)</Label>
                    <div className="flex items-center space-x-4">
                      <Slider 
                        value={[sliderSettings.animationSpeed]} 
                        min={100}
                        max={2000}
                        step={100}
                        onValueChange={(value) => handleSliderSettingChange('animationSpeed', value[0])}
                        className="flex-1"
                      />
                      <span>{sliderSettings.animationSpeed}ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card className="bg-dark-500 border-dark-400">
            <CardHeader>
              <CardTitle>Slider Önizleme</CardTitle>
              <CardDescription>Sliderların nasıl görüneceğini önizleyin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-dark-400 rounded-md overflow-hidden">
                <div className="relative h-[400px] bg-dark-600">
                  {sliderItems.length > 0 ? (
                    <div className="absolute inset-0">
                      <img 
                        src={sliderItems[0].imageUrl} 
                        alt={sliderItems[0].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/40"></div>
                      
                      <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-6">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">{sliderItems[0].title}</h2>
                          <p className="text-lg mb-6 max-w-lg">{sliderItems[0].description}</p>
                          <div className="flex flex-wrap gap-3">
                            <Button className="bg-ignite hover:bg-ignite-600">
                              {sliderItems[0].buttonText || "Daha Fazla"}
                            </Button>
                            <Button variant="outline" className="border-white/30">
                              İletişime Geçin
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-white/60">Henüz slider eklenmemiş</p>
                    </div>
                  )}
                </div>
                
                {sliderItems.length > 0 && (
                  <div className="py-4 px-6 bg-dark-600 flex justify-center gap-2">
                    {sliderItems.map((_, index) => (
                      <div 
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-ignite' : 'bg-white/20'}`}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-6 text-center text-sm text-white/60">
                Bu önizleme gerçek slider işlevselliğini içermez.<br />
                Sliderların gerçek görünümünü görmek için ana sayfayı görüntüleyin.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Slider Item Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-dark-600 border-dark-400">
          <DialogHeader>
            <DialogTitle>Yeni Slider Ekle</DialogTitle>
            <DialogDescription>
              Slider içeriğini ve görselini ayarlayın
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-dark-500 w-full">
              <TabsTrigger value="content">İçerik</TabsTrigger>
              <TabsTrigger value="styling">Görünüm</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Başlık
                </Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={newSliderItem.title}
                  onChange={handleInputChange}
                  className="col-span-3 bg-dark-500 border-dark-300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Açıklama
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newSliderItem.description}
                  onChange={handleInputChange}
                  className="col-span-3 bg-dark-500 border-dark-300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Görsel URL
                </Label>
                <Input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={newSliderItem.imageUrl}
                  onChange={handleInputChange}
                  className="col-span-3 bg-dark-500 border-dark-300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link" className="text-right">
                  Link
                </Label>
                <Input
                  type="text"
                  id="link"
                  name="link"
                  value={newSliderItem.link}
                  onChange={handleInputChange}
                  className="col-span-3 bg-dark-500 border-dark-300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="buttonText" className="text-right">
                  Buton Metni
                </Label>
                <Input
                  type="text"
                  id="buttonText"
                  name="buttonText"
                  value={newSliderItem.buttonText}
                  onChange={handleInputChange}
                  className="col-span-3 bg-dark-500 border-dark-300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="buttonLink" className="text-right">
                  Buton Linki
                </Label>
                <Input
                  type="text"
                  id="buttonLink"
                  name="buttonLink"
                  value={newSliderItem.buttonLink}
                  onChange={handleInputChange}
                  className="col-span-3 bg-dark-500 border-dark-300"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="styling" className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="animation" className="text-right">
                  Animasyon
                </Label>
                <Select
                  value={newSliderItem.animation}
                  onValueChange={(value) => handleSelectChange('animation', value)}
                >
                  <SelectTrigger className="col-span-3 bg-dark-500 border-dark-300">
                    <SelectValue placeholder="Animasyon seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fade">Solma Efekti</SelectItem>
                    <SelectItem value="slide">Kayma Efekti</SelectItem>
                    <SelectItem value="zoom">Yakınlaştırma Efekti</SelectItem>
                    <SelectItem value="flip">Çevirme Efekti</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="textColor" className="text-right">
                  Metin Rengi
                </Label>
                <Select
                  value={newSliderItem.textColor}
                  onValueChange={(value) => handleSelectChange('textColor', value)}
                >
                  <SelectTrigger className="col-span-3 bg-dark-500 border-dark-300">
                    <SelectValue placeholder="Renk seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white">Beyaz</SelectItem>
                    <SelectItem value="black">Siyah</SelectItem>
                    <SelectItem value="ignite">Ignite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="overlayOpacity" className="text-right">
                  Kaplama Opaklığı
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">0%</span>
                    <Slider 
                      value={[newSliderItem.overlayOpacity || 60]} 
                      min={0}
                      max={90}
                      step={5}
                      onValueChange={(value) => handleSliderChange('overlayOpacity', value)}
                      className="flex-1"
                    />
                    <span className="text-sm">{newSliderItem.overlayOpacity || 60}%</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleCloseDialog}>
              İptal
            </Button>
            <Button type="submit" onClick={handleAddSliderItem} className="bg-ignite hover:bg-ignite-700">
              Ekle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Slider Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-dark-600 border-dark-400">
          <DialogHeader>
            <DialogTitle>Slider Düzenle</DialogTitle>
            <DialogDescription>
              Slider içeriğini ve görselini düzenleyin
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-dark-500 w-full">
              <TabsTrigger value="content">İçerik</TabsTrigger>
              <TabsTrigger value="styling">Görünüm</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Başlık
                </Label>
                <Input
                  type="text"
                  id="edit-title"
                  name="title"
                  value={editedSliderItem.title}
                  onChange={handleEditInputChange}
                  className="col-span-3 bg-dark-500 border-dark-300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Açıklama
                </Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={editedSliderItem.description}
                  onChange={handleEditInputChange}
                  className="col-span-3 bg-dark-500 border-dark-300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-imageUrl" className="text-right">
                  Görsel URL
                </Label>
                <Input
                  type="text"
                  id="edit-imageUrl"
                  name="imageUrl"
                  value={editedSliderItem.imageUrl}
                  onChange={handleEditInputChange}
                  className="col-span-3 bg-dark-500 border-dark-300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-link" className="text-right">
                  Link
                </Label>
                <Input
                  type="text"
                  id="edit-link"
                  name="link"
                  value={editedSliderItem.link}
                  onChange={handleEditInputChange}
                  className="col-span-3 bg-dark-500 border-dark-300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-buttonText" className="text-right">
                  Buton Metni
                </Label>
                <Input
                  type="text"
                  id="edit-buttonText"
                  name="buttonText"
                  value={editedSliderItem.buttonText}
                  onChange={handleEditInputChange}
                  className="col-span-3 bg-dark-500 border-dark-300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-buttonLink" className="text-right">
                  Buton Linki
                </Label>
                <Input
                  type="text"
                  id="edit-buttonLink"
                  name="buttonLink"
                  value={editedSliderItem.buttonLink}
                  onChange={handleEditInputChange}
                  className="col-span-3 bg-dark-500 border-dark-300"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="styling" className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-animation" className="text-right">
                  Animasyon
                </Label>
                <Select
                  value={editedSliderItem.animation}
                  onValueChange={(value) => handleEditSelectChange('animation', value)}
                >
                  <SelectTrigger className="col-span-3 bg-dark-500 border-dark-300">
                    <SelectValue placeholder="Animasyon seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fade">Solma Efekti</SelectItem>
                    <SelectItem value="slide">Kayma Efekti</SelectItem>
                    <SelectItem value="zoom">Yakınlaştırma Efekti</SelectItem>
                    <SelectItem value="flip">Çevirme Efekti</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-textColor" className="text-right">
                  Metin Rengi
                </Label>
                <Select
                  value={editedSliderItem.textColor}
                  onValueChange={(value) => handleEditSelectChange('textColor', value)}
                >
                  <SelectTrigger className="col-span-3 bg-dark-500 border-dark-300">
                    <SelectValue placeholder="Renk seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white">Beyaz</SelectItem>
                    <SelectItem value="black">Siyah</SelectItem>
                    <SelectItem value="ignite">Ignite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-overlayOpacity" className="text-right">
                  Kaplama Opaklığı
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">0%</span>
                    <Slider 
                      value={[editedSliderItem.overlayOpacity || 60]} 
                      min={0}
                      max={90}
                      step={5}
                      onValueChange={(value) => handleEditSliderChange('overlayOpacity', value)}
                      className="flex-1"
                    />
                    <span className="text-sm">{editedSliderItem.overlayOpacity || 60}%</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleCloseEditDialog}>
              İptal
            </Button>
            <Button type="submit" onClick={handleUpdateSliderItem} className="bg-ignite hover:bg-ignite-700">
              Güncelle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroSliderManager;
