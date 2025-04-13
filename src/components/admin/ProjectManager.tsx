
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, ImageIcon, Save, EyeOff, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { v4 as uuidv4 } from 'uuid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  date: string;
  duration: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  services: string[];
  tools?: string[];
  testimonial: {
    text: string;
    author: string;
    position: string;
  };
  images: string[];
  order: number;
}

const ProjectManager = () => {
  const [projectItems, setProjectItems] = useState<ProjectItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProjectItem, setNewProjectItem] = useState<Partial<ProjectItem>>({
    title: '',
    category: '',
    client: '',
    date: '',
    duration: '',
    description: '',
    longDescription: '',
    challenge: '',
    solution: '',
    results: [''],
    services: [''],
    tools: [''],
    testimonial: {
      text: '',
      author: '',
      position: ''
    },
    images: [''],
  });
  
  const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedProjectItem, setEditedProjectItem] = useState<ProjectItem | null>(null);
  const [expandedResults, setExpandedResults] = useState<boolean>(false);
  const [expandedServices, setExpandedServices] = useState<boolean>(false);
  const [expandedTools, setExpandedTools] = useState<boolean>(false);
  const [expandedImages, setExpandedImages] = useState<boolean>(false);
  
  const { toast } = useToast();

  useEffect(() => {
    // Load project items from local storage or default values
    const storedProjectItems = localStorage.getItem('projectItems');
    if (storedProjectItems) {
      setProjectItems(JSON.parse(storedProjectItems));
    } else {
      // Initialize with some default project items from the data structure in ProjectDetail.tsx
      setProjectItems([
        {
          id: uuidv4(),
          title: 'E-Ticaret Marka Yenileme',
          category: 'E-Ticaret',
          client: 'FashionTurk',
          date: 'Kasım 2023',
          duration: '3 ay',
          description: 'FashionTurk e-ticaret markası için kapsamlı bir marka yenileme ve dijital pazarlama kampanyası.',
          longDescription: "FashionTurk, Türkiye'nin önde gelen moda e-ticaret platformlarından biridir. Artan rekabet ortamında markalarını yenilemek ve dijital pazarlama stratejilerini güçlendirmek için ajansımızla çalışmaya başladılar.",
          challenge: 'Yoğun rekabet ortamında marka kimliğini güçlendirerek ve dijital pazarlama stratejilerini optimize ederek e-ticaret satışlarını artırmak.',
          solution: 'Marka kimliğini yenileyerek daha modern bir görünüm kazandırdık. SEO stratejilerini optimize ederek organik trafiği artırdık.',
          results: [
            'Organik trafik %80 arttı',
            'Sosyal medya takipçileri %120 büyüdü'
          ],
          services: ['SEO Optimizasyonu', 'Sosyal Medya Yönetimi'],
          tools: ['Google Analytics', 'Meta Ads'],
          testimonial: {
            text: "Ignite Dijital Pazarlama ekibi ile çalışmak, markamızı dönüştürmek için attığımız en önemli adımlardan biriydi.",
            author: 'Ayşe Yılmaz',
            position: 'FashionTurk Pazarlama Direktörü'
          },
          images: [
            'https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070'
          ],
          order: 1
        },
        {
          id: uuidv4(),
          title: 'Teknoloji Girişimi SEO',
          category: 'SEO',
          client: 'TeknoMarket',
          date: 'Eylül 2023',
          duration: '6 ay',
          description: 'TeknoMarket için arama motorlarında üst sıralarda yer almayı hedefleyen kapsamlı bir SEO stratejisi.',
          longDescription: "TeknoMarket, Türkiye'nin önde gelen elektronik perakende zincirlerinden biridir. Dijital varlıklarını güçlendirmek ve web sitelerinin arama motorlarında daha üst sıralarda yer almasını sağlamak için kapsamlı bir SEO stratejisi geliştirdik.",
          challenge: 'Yüksek rekabetli elektronik perakende sektöründe web sitesinin arama motorlarında görünürlüğünü artırmak ve nitelikli trafik çekmek.',
          solution: 'Kapsamlı bir teknik SEO analizi gerçekleştirerek site yapısını optimize ettik. Anahtar kelime araştırması ile hedef kitlenin arama alışkanlıklarını belirledik.',
          results: [
            'Organik trafik %210 arttı',
            'Anahtar kelimelerde birinci sayfada sıralama oranı %75 yükseldi'
          ],
          services: ['Teknik SEO', 'İçerik Stratejisi'],
          tools: ['Google Search Console', 'SEMrush'],
          testimonial: {
            text: "Ignite Dijital ekibi ile yaptığımız SEO çalışmaları sayesinde web sitemiz artık arama motorlarında çok daha üst sıralarda yer alıyor.",
            author: 'Mehmet Kaya',
            position: 'TeknoMarket Dijital Pazarlama Yöneticisi'
          },
          images: [
            'https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?q=80&w=2070'
          ],
          order: 2
        }
      ]);
    }
  }, []);

  useEffect(() => {
    // Save project items to local storage whenever they change
    localStorage.setItem('projectItems', JSON.stringify(projectItems));
  }, [projectItems]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewProjectItem({
      title: '',
      category: '',
      client: '',
      date: '',
      duration: '',
      description: '',
      longDescription: '',
      challenge: '',
      solution: '',
      results: [''],
      services: [''],
      tools: [''],
      testimonial: {
        text: '',
        author: '',
        position: ''
      },
      images: [''],
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProjectItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNestedInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('testimonial.')) {
      const testimonialField = name.split('.')[1];
      setNewProjectItem(prevState => ({
        ...prevState,
        testimonial: {
          ...prevState.testimonial!,
          [testimonialField]: value
        }
      }));
    }
  };

  const handleArrayInputChange = (index: number, field: 'results' | 'services' | 'tools' | 'images', value: string) => {
    setNewProjectItem(prevState => {
      const newArray = [...(prevState[field] || [])];
      newArray[index] = value;
      return {
        ...prevState,
        [field]: newArray
      };
    });
  };

  const handleAddArrayItem = (field: 'results' | 'services' | 'tools' | 'images') => {
    setNewProjectItem(prevState => ({
      ...prevState,
      [field]: [...(prevState[field] || []), '']
    }));
  };

  const handleRemoveArrayItem = (index: number, field: 'results' | 'services' | 'tools' | 'images') => {
    setNewProjectItem(prevState => {
      const newArray = [...(prevState[field] || [])];
      newArray.splice(index, 1);
      return {
        ...prevState,
        [field]: newArray
      };
    });
  };

  const handleAddProjectItem = () => {
    // Filter out empty items from arrays
    const filteredResults = newProjectItem.results?.filter(item => item.trim() !== '') || [];
    const filteredServices = newProjectItem.services?.filter(item => item.trim() !== '') || [];
    const filteredTools = newProjectItem.tools?.filter(item => item.trim() !== '') || [];
    const filteredImages = newProjectItem.images?.filter(item => item.trim() !== '') || [];
    
    if (!newProjectItem.title || !newProjectItem.category || filteredImages.length === 0) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen en az başlık, kategori ve bir resim URL'si ekleyin.",
        variant: "destructive"
      });
      return;
    }

    const newItem: ProjectItem = {
      id: uuidv4(),
      title: newProjectItem.title || '',
      category: newProjectItem.category || '',
      client: newProjectItem.client || '',
      date: newProjectItem.date || '',
      duration: newProjectItem.duration || '',
      description: newProjectItem.description || '',
      longDescription: newProjectItem.longDescription || '',
      challenge: newProjectItem.challenge || '',
      solution: newProjectItem.solution || '',
      results: filteredResults,
      services: filteredServices,
      tools: filteredTools,
      testimonial: {
        text: newProjectItem.testimonial?.text || '',
        author: newProjectItem.testimonial?.author || '',
        position: newProjectItem.testimonial?.position || ''
      },
      images: filteredImages,
      order: projectItems.length + 1
    };

    setProjectItems(prevItems => [...prevItems, newItem]);
    handleCloseDialog();
    toast({
      title: "Proje Eklendi",
      description: "Yeni proje başarıyla eklendi."
    });
  };

  const handleDeleteProjectItem = (id: string) => {
    setProjectItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "Proje Silindi",
      description: "Proje başarıyla silindi."
    });
  };

  const handleEditProjectItem = (item: ProjectItem) => {
    setEditingItem(item);
    setEditedProjectItem({...item});
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingItem(null);
    setEditedProjectItem(null);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editedProjectItem) return;
    
    const { name, value } = e.target;
    setEditedProjectItem(prevState => ({
      ...prevState!,
      [name]: value
    }));
  };

  const handleEditNestedInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editedProjectItem) return;
    
    const { name, value } = e.target;
    
    if (name.startsWith('testimonial.')) {
      const testimonialField = name.split('.')[1];
      setEditedProjectItem(prevState => ({
        ...prevState!,
        testimonial: {
          ...prevState!.testimonial,
          [testimonialField]: value
        }
      }));
    }
  };

  const handleEditArrayInputChange = (index: number, field: 'results' | 'services' | 'tools' | 'images', value: string) => {
    if (!editedProjectItem) return;
    
    setEditedProjectItem(prevState => {
      const newArray = [...(prevState![field] || [])];
      newArray[index] = value;
      return {
        ...prevState!,
        [field]: newArray
      };
    });
  };

  const handleAddEditArrayItem = (field: 'results' | 'services' | 'tools' | 'images') => {
    if (!editedProjectItem) return;
    
    setEditedProjectItem(prevState => ({
      ...prevState!,
      [field]: [...(prevState![field] || []), '']
    }));
  };

  const handleRemoveEditArrayItem = (index: number, field: 'results' | 'services' | 'tools' | 'images') => {
    if (!editedProjectItem) return;
    
    setEditedProjectItem(prevState => {
      const newArray = [...(prevState![field] || [])];
      newArray.splice(index, 1);
      return {
        ...prevState!,
        [field]: newArray
      };
    });
  };

  const handleUpdateProjectItem = () => {
    if (!editingItem || !editedProjectItem) return;
    
    // Filter out empty items from arrays
    const filteredResults = editedProjectItem.results.filter(item => item.trim() !== '');
    const filteredServices = editedProjectItem.services.filter(item => item.trim() !== '');
    const filteredTools = editedProjectItem.tools?.filter(item => item.trim() !== '') || [];
    const filteredImages = editedProjectItem.images.filter(item => item.trim() !== '');
    
    if (!editedProjectItem.title || !editedProjectItem.category || filteredImages.length === 0) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen en az başlık, kategori ve bir resim URL'si ekleyin.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedItem: ProjectItem = {
      ...editedProjectItem,
      results: filteredResults,
      services: filteredServices,
      tools: filteredTools,
      images: filteredImages
    };
    
    setProjectItems(prevItems => 
      prevItems.map(item => item.id === editingItem.id ? updatedItem : item)
    );
    
    handleCloseEditDialog();
    toast({
      title: "Proje Güncellendi",
      description: "Proje başarıyla güncellendi."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projeleri Yönet</h2>
        <Button className="bg-ignite hover:bg-ignite-700" onClick={handleOpenDialog}>
          <Plus className="h-4 w-4 mr-2" /> Yeni Proje Ekle
        </Button>
      </div>
      
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader>
          <CardTitle>Projeler</CardTitle>
          <CardDescription>Portföy projelerini yönetin, düzenleyin veya silin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Müşteri</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Önizleme</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.client}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      {item.images && item.images.length > 0 && (
                        <div className="relative w-16 h-16">
                          <AspectRatio ratio={1 / 1}>
                            <img 
                              src={item.images[0]} 
                              alt={item.title} 
                              className="object-cover rounded-md"
                            />
                          </AspectRatio>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1 hover:bg-ignite/20 hover:text-ignite"
                          onClick={() => handleEditProjectItem(item)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:inline-block">Düzenle</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1 hover:bg-red-700/20 hover:text-red-700"
                          onClick={() => handleDeleteProjectItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:inline-block">Sil</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Add New Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-500 border-dark-400">
          <DialogHeader>
            <DialogTitle>Yeni Proje Ekle</DialogTitle>
            <DialogDescription>Portföyünüze yeni bir proje ekleyin. Tüm gerekli alanları doldurun.</DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[65vh] pr-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
              <div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Proje Başlığı *</Label>
                    <Input 
                      id="title" 
                      name="title"
                      value={newProjectItem.title}
                      onChange={handleInputChange}
                      placeholder="Projenin adını girin"
                      className="bg-dark-400 border-dark-300 mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Kategori *</Label>
                    <Input 
                      id="category" 
                      name="category"
                      value={newProjectItem.category}
                      onChange={handleInputChange}
                      placeholder="Proje kategorisini girin (SEO, Sosyal Medya, vb.)"
                      className="bg-dark-400 border-dark-300 mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="client">Müşteri</Label>
                    <Input 
                      id="client" 
                      name="client"
                      value={newProjectItem.client}
                      onChange={handleInputChange}
                      placeholder="Müşteri adını girin"
                      className="bg-dark-400 border-dark-300 mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Tarih</Label>
                      <Input 
                        id="date" 
                        name="date"
                        value={newProjectItem.date}
                        onChange={handleInputChange}
                        placeholder="Ağustos 2023"
                        className="bg-dark-400 border-dark-300 mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="duration">Süre</Label>
                      <Input 
                        id="duration" 
                        name="duration"
                        value={newProjectItem.duration}
                        onChange={handleInputChange}
                        placeholder="3 ay"
                        className="bg-dark-400 border-dark-300 mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Kısa Açıklama</Label>
                    <Textarea 
                      id="description" 
                      name="description"
                      value={newProjectItem.description}
                      onChange={handleInputChange}
                      placeholder="Kısa proje açıklaması..."
                      className="bg-dark-400 border-dark-300 mt-1 resize-none"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="longDescription">Uzun Açıklama</Label>
                    <Textarea 
                      id="longDescription" 
                      name="longDescription"
                      value={newProjectItem.longDescription}
                      onChange={handleInputChange}
                      placeholder="Detaylı proje açıklaması..."
                      className="bg-dark-400 border-dark-300 mt-1 resize-none"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="challenge">Zorluk</Label>
                  <Textarea 
                    id="challenge" 
                    name="challenge"
                    value={newProjectItem.challenge}
                    onChange={handleInputChange}
                    placeholder="Projede karşılaşılan zorluklar..."
                    className="bg-dark-400 border-dark-300 mt-1 resize-none"
                    rows={2}
                  />
                </div>
                
                <div>
                  <Label htmlFor="solution">Çözüm</Label>
                  <Textarea 
                    id="solution" 
                    name="solution"
                    value={newProjectItem.solution}
                    onChange={handleInputChange}
                    placeholder="Sunulan çözüm..."
                    className="bg-dark-400 border-dark-300 mt-1 resize-none"
                    rows={2}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <Label>Sonuçlar</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setExpandedResults(!expandedResults)}
                      className="h-7 px-2"
                    >
                      {expandedResults ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  {(expandedResults || newProjectItem.results?.length === 1) && (
                    <div className="space-y-2 mt-2">
                      {newProjectItem.results?.map((result, index) => (
                        <div key={index} className="flex gap-2">
                          <Input 
                            value={result}
                            onChange={(e) => handleArrayInputChange(index, 'results', e.target.value)}
                            placeholder={`Sonuç ${index + 1}`}
                            className="bg-dark-400 border-dark-300 flex-grow"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleRemoveArrayItem(index, 'results')}
                            className="shrink-0"
                            disabled={newProjectItem.results?.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => handleAddArrayItem('results')}
                        className="w-full mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Sonuç Ekle
                      </Button>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <Label>Hizmetler</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setExpandedServices(!expandedServices)}
                      className="h-7 px-2"
                    >
                      {expandedServices ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  {(expandedServices || newProjectItem.services?.length === 1) && (
                    <div className="space-y-2 mt-2">
                      {newProjectItem.services?.map((service, index) => (
                        <div key={index} className="flex gap-2">
                          <Input 
                            value={service}
                            onChange={(e) => handleArrayInputChange(index, 'services', e.target.value)}
                            placeholder={`Hizmet ${index + 1}`}
                            className="bg-dark-400 border-dark-300 flex-grow"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleRemoveArrayItem(index, 'services')}
                            className="shrink-0"
                            disabled={newProjectItem.services?.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => handleAddArrayItem('services')}
                        className="w-full mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Hizmet Ekle
                      </Button>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <Label>Araçlar</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setExpandedTools(!expandedTools)}
                      className="h-7 px-2"
                    >
                      {expandedTools ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  {(expandedTools || newProjectItem.tools?.length === 1) && (
                    <div className="space-y-2 mt-2">
                      {newProjectItem.tools?.map((tool, index) => (
                        <div key={index} className="flex gap-2">
                          <Input 
                            value={tool}
                            onChange={(e) => handleArrayInputChange(index, 'tools', e.target.value)}
                            placeholder={`Araç ${index + 1}`}
                            className="bg-dark-400 border-dark-300 flex-grow"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleRemoveArrayItem(index, 'tools')}
                            className="shrink-0"
                            disabled={newProjectItem.tools?.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => handleAddArrayItem('tools')}
                        className="w-full mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Araç Ekle
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mt-6">
              <div>
                <Label>Referans Yorumu</Label>
                <div className="space-y-3 mt-2">
                  <Textarea 
                    name="testimonial.text"
                    value={newProjectItem.testimonial?.text || ''}
                    onChange={handleNestedInputChange}
                    placeholder="Referans yorumu..."
                    className="bg-dark-400 border-dark-300 resize-none"
                    rows={3}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input 
                        name="testimonial.author"
                        value={newProjectItem.testimonial?.author || ''}
                        onChange={handleNestedInputChange}
                        placeholder="Yorum Sahibi"
                        className="bg-dark-400 border-dark-300"
                      />
                    </div>
                    <div>
                      <Input 
                        name="testimonial.position"
                        value={newProjectItem.testimonial?.position || ''}
                        onChange={handleNestedInputChange}
                        placeholder="Pozisyon"
                        className="bg-dark-400 border-dark-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <Label>Proje Görselleri *</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setExpandedImages(!expandedImages)}
                    className="h-7 px-2"
                  >
                    {expandedImages ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
                
                {(expandedImages || newProjectItem.images?.length === 1) && (
                  <div className="space-y-2 mt-2">
                    {newProjectItem.images?.map((image, index) => (
                      <div key={index} className="flex gap-2">
                        <Input 
                          value={image}
                          onChange={(e) => handleArrayInputChange(index, 'images', e.target.value)}
                          placeholder="Görsel URL'si"
                          className="bg-dark-400 border-dark-300 flex-grow"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleRemoveArrayItem(index, 'images')}
                          className="shrink-0"
                          disabled={newProjectItem.images?.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => handleAddArrayItem('images')}
                      className="w-full mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Görsel Ekle
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>İptal</Button>
            <Button className="bg-ignite hover:bg-ignite-700" onClick={handleAddProjectItem}>
              <Save className="h-4 w-4 mr-2" /> Projeyi Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-500 border-dark-400">
          <DialogHeader>
            <DialogTitle>Projeyi Düzenle</DialogTitle>
            <DialogDescription>Proje bilgilerini güncelleyin.</DialogDescription>
          </DialogHeader>
          
          {editedProjectItem && (
            <ScrollArea className="h-[65vh] pr-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                <div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-title">Proje Başlığı *</Label>
                      <Input 
                        id="edit-title" 
                        name="title"
                        value={editedProjectItem.title}
                        onChange={handleEditInputChange}
                        placeholder="Projenin adını girin"
                        className="bg-dark-400 border-dark-300 mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="edit-category">Kategori *</Label>
                      <Input 
                        id="edit-category" 
                        name="category"
                        value={editedProjectItem.category}
                        onChange={handleEditInputChange}
                        placeholder="Proje kategorisini girin (SEO, Sosyal Medya, vb.)"
                        className="bg-dark-400 border-dark-300 mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="edit-client">Müşteri</Label>
                      <Input 
                        id="edit-client" 
                        name="client"
                        value={editedProjectItem.client}
                        onChange={handleEditInputChange}
                        placeholder="Müşteri adını girin"
                        className="bg-dark-400 border-dark-300 mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-date">Tarih</Label>
                        <Input 
                          id="edit-date" 
                          name="date"
                          value={editedProjectItem.date}
                          onChange={handleEditInputChange}
                          placeholder="Ağustos 2023"
                          className="bg-dark-400 border-dark-300 mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="edit-duration">Süre</Label>
                        <Input 
                          id="edit-duration" 
                          name="duration"
                          value={editedProjectItem.duration}
                          onChange={handleEditInputChange}
                          placeholder="3 ay"
                          className="bg-dark-400 border-dark-300 mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="edit-description">Kısa Açıklama</Label>
                      <Textarea 
                        id="edit-description" 
                        name="description"
                        value={editedProjectItem.description}
                        onChange={handleEditInputChange}
                        placeholder="Kısa proje açıklaması..."
                        className="bg-dark-400 border-dark-300 mt-1 resize-none"
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="edit-longDescription">Uzun Açıklama</Label>
                      <Textarea 
                        id="edit-longDescription" 
                        name="longDescription"
                        value={editedProjectItem.longDescription}
                        onChange={handleEditInputChange}
                        placeholder="Detaylı proje açıklaması..."
                        className="bg-dark-400 border-dark-300 mt-1 resize-none"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-challenge">Zorluk</Label>
                    <Textarea 
                      id="edit-challenge" 
                      name="challenge"
                      value={editedProjectItem.challenge}
                      onChange={handleEditInputChange}
                      placeholder="Projede karşılaşılan zorluklar..."
                      className="bg-dark-400 border-dark-300 mt-1 resize-none"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-solution">Çözüm</Label>
                    <Textarea 
                      id="edit-solution" 
                      name="solution"
                      value={editedProjectItem.solution}
                      onChange={handleEditInputChange}
                      placeholder="Sunulan çözüm..."
                      className="bg-dark-400 border-dark-300 mt-1 resize-none"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <Label>Sonuçlar</Label>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setExpandedResults(!expandedResults)}
                        className="h-7 px-2"
                      >
                        {expandedResults ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                    
                    {(expandedResults || editedProjectItem.results.length === 1) && (
                      <div className="space-y-2 mt-2">
                        {editedProjectItem.results.map((result, index) => (
                          <div key={index} className="flex gap-2">
                            <Input 
                              value={result}
                              onChange={(e) => handleEditArrayInputChange(index, 'results', e.target.value)}
                              placeholder={`Sonuç ${index + 1}`}
                              className="bg-dark-400 border-dark-300 flex-grow"
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleRemoveEditArrayItem(index, 'results')}
                              className="shrink-0"
                              disabled={editedProjectItem.results.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => handleAddEditArrayItem('results')}
                          className="w-full mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" /> Sonuç Ekle
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <Label>Hizmetler</Label>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setExpandedServices(!expandedServices)}
                        className="h-7 px-2"
                      >
                        {expandedServices ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                    
                    {(expandedServices || editedProjectItem.services.length === 1) && (
                      <div className="space-y-2 mt-2">
                        {editedProjectItem.services.map((service, index) => (
                          <div key={index} className="flex gap-2">
                            <Input 
                              value={service}
                              onChange={(e) => handleEditArrayInputChange(index, 'services', e.target.value)}
                              placeholder={`Hizmet ${index + 1}`}
                              className="bg-dark-400 border-dark-300 flex-grow"
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleRemoveEditArrayItem(index, 'services')}
                              className="shrink-0"
                              disabled={editedProjectItem.services.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => handleAddEditArrayItem('services')}
                          className="w-full mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" /> Hizmet Ekle
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <Label>Araçlar</Label>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setExpandedTools(!expandedTools)}
                        className="h-7 px-2"
                      >
                        {expandedTools ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                    
                    {(expandedTools || (editedProjectItem.tools && editedProjectItem.tools.length === 1)) && (
                      <div className="space-y-2 mt-2">
                        {editedProjectItem.tools?.map((tool, index) => (
                          <div key={index} className="flex gap-2">
                            <Input 
                              value={tool}
                              onChange={(e) => handleEditArrayInputChange(index, 'tools', e.target.value)}
                              placeholder={`Araç ${index + 1}`}
                              className="bg-dark-400 border-dark-300 flex-grow"
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleRemoveEditArrayItem(index, 'tools')}
                              className="shrink-0"
                              disabled={(editedProjectItem.tools?.length || 0) <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => handleAddEditArrayItem('tools')}
                          className="w-full mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" /> Araç Ekle
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <div>
                  <Label>Referans Yorumu</Label>
                  <div className="space-y-3 mt-2">
                    <Textarea 
                      name="testimonial.text"
                      value={editedProjectItem.testimonial.text}
                      onChange={handleEditNestedInputChange}
                      placeholder="Referans yorumu..."
                      className="bg-dark-400 border-dark-300 resize-none"
                      rows={3}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input 
                          name="testimonial.author"
                          value={editedProjectItem.testimonial.author}
                          onChange={handleEditNestedInputChange}
                          placeholder="Yorum Sahibi"
                          className="bg-dark-400 border-dark-300"
                        />
                      </div>
                      <div>
                        <Input 
                          name="testimonial.position"
                          value={editedProjectItem.testimonial.position}
                          onChange={handleEditNestedInputChange}
                          placeholder="Pozisyon"
                          className="bg-dark-400 border-dark-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <Label>Proje Görselleri *</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setExpandedImages(!expandedImages)}
                      className="h-7 px-2"
                    >
                      {expandedImages ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  {(expandedImages || editedProjectItem.images.length === 1) && (
                    <div className="space-y-2 mt-2">
                      {editedProjectItem.images.map((image, index) => (
                        <div key={index} className="flex gap-2">
                          <Input 
                            value={image}
                            onChange={(e) => handleEditArrayInputChange(index, 'images', e.target.value)}
                            placeholder="Görsel URL'si"
                            className="bg-dark-400 border-dark-300 flex-grow"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleRemoveEditArrayItem(index, 'images')}
                            className="shrink-0"
                            disabled={editedProjectItem.images.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => handleAddEditArrayItem('images')}
                        className="w-full mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Görsel Ekle
                      </Button>
                    </div>
                  )}
                  
                  {editedProjectItem.images.length > 0 && (
                    <div className="mt-4">
                      <Label>Önizleme</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {editedProjectItem.images.map((image, index) => (
                          <div key={index} className="relative h-24 bg-dark-400 rounded-md overflow-hidden">
                            {image ? (
                              <img 
                                src={image} 
                                alt={`Önizleme ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full">
                                <ImageIcon className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseEditDialog}>İptal</Button>
            <Button className="bg-ignite hover:bg-ignite-700" onClick={handleUpdateProjectItem}>
              <Save className="h-4 w-4 mr-2" /> Güncelle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManager;
