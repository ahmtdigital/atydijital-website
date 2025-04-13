import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, ImageIcon, Link as LucideLink } from 'lucide-react';
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
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

interface SliderItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  order: number;
}

const HeroSliderManager = () => {
  const [sliderItems, setSliderItems] = useState<SliderItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSliderItem, setNewSliderItem] = useState<Omit<SliderItem, 'id' | 'order'>>({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
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
        },
        {
          id: uuidv4(),
          title: 'Data-Driven Results',
          description: 'We turn data into actionable insights for your business.',
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          link: '/services',
          order: 2,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    // Save slider items to local storage whenever they change
    localStorage.setItem('sliderItems', JSON.stringify(sliderItems));
  }, [sliderItems]);

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
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSliderItem(prevState => ({
      ...prevState,
      [name]: value,
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hero Slider Yönetimi</h2>
        <Button onClick={handleOpenDialog} className="bg-ignite hover:bg-ignite-700">
          <Plus className="h-4 w-4 mr-2" /> Yeni Slider Ekle
        </Button>
      </div>

      <Card className="bg-dark-500 border-dark-400">
        <CardHeader>
          <CardTitle>Slider Öğeleri</CardTitle>
          <CardDescription>Slider öğelerini yönetin, düzenleyin veya silin</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Başlık</TableHead>
                <TableHead>Açıklama</TableHead>
                <TableHead>Görsel</TableHead>
                <TableHead>Link</TableHead>
                <TableHead className="text-right">Eylemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sliderItems.map((item) => (
                <TableRow key={item.id}>
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
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-ignite hover:text-ignite-400 underline">
                      {item.link}
                    </a>
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

      {/* Add Slider Item Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Yeni Slider Ekle</Button>
        </DialogTrigger>
        <DialogContent className="bg-dark-600 border-dark-400">
          <DialogHeader>
            <DialogTitle>Yeni Slider Ekle</DialogTitle>
            <DialogDescription>
              Slider içeriğini ve görselini ayarlayın
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
          </div>
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Başlık
              </Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={editedSliderItem.title}
                onChange={handleEditInputChange}
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
                value={editedSliderItem.description}
                onChange={handleEditInputChange}
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
                value={editedSliderItem.imageUrl}
                onChange={handleEditInputChange}
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
                value={editedSliderItem.link}
                onChange={handleEditInputChange}
                className="col-span-3 bg-dark-500 border-dark-300"
              />
            </div>
          </div>
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
