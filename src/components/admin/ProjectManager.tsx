
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
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Calendar, 
  Clock, 
  Check, 
  X,
  ArrowRight,
  ExternalLink,
  FileText,
  Search,
  Filter,
  Upload,
  Save,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface Project {
  id: number;
  title: string;
  client: string;
  image: string;
  description: string;
  services: string[];
  results: ProjectResult[];
  duration: string;
  startDate: string;
  status: 'completed' | 'in-progress' | 'planned';
  testimonial?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  galleryImages?: string[];
  featured: boolean;
}

interface ProjectResult {
  id: number;
  metric: string;
  value: string;
  improvement: string;
}

const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'E-Ticaret Marka Yenileme',
    client: 'FashionTurk',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070',
    description: 'FashionTurk için kapsamlı marka yenilemesi ve dijital pazarlama stratejisi.',
    services: ['Sosyal Medya Yönetimi', 'SEO Optimizasyonu', 'İçerik Üretimi'],
    results: [
      { id: 1, metric: 'Organik Trafik', value: '+150%', improvement: 'Artış' },
      { id: 2, metric: 'Dönüşüm Oranı', value: '+35%', improvement: 'Artış' },
      { id: 3, metric: 'Sosyal Medya Takipçileri', value: '+12,000', improvement: 'Yeni Takipçi' }
    ],
    duration: '3 ay',
    startDate: '2023-04-15',
    status: 'completed',
    testimonial: 'Ignite Marketing ile çalışmak markanızı gerçekten bir sonraki seviyeye taşıyor. Sonuçlardan çok memnunuz!',
    testimonialAuthor: 'Ahmet Yılmaz',
    testimonialRole: 'FashionTurk, Pazarlama Direktörü',
    featured: true
  },
  {
    id: 2,
    title: 'SEO Optimizasyon Kampanyası',
    client: 'TeknoMarket',
    image: 'https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?q=80&w=2070',
    description: 'TeknoMarket için arama motoru optimizasyonu ve içerik stratejisi.',
    services: ['SEO Optimizasyonu', 'Anahtar Kelime Araştırması', 'Teknik SEO Denetimi'],
    results: [
      { id: 1, metric: 'Google Sıralaması', value: 'İlk 3', improvement: 'Ana Anahtar Kelimelerde' },
      { id: 2, metric: 'Organik Trafik', value: '+85%', improvement: 'Artış' }
    ],
    duration: '6 ay',
    startDate: '2023-01-10',
    status: 'completed',
    featured: false
  },
  {
    id: 3,
    title: 'Sosyal Medya Büyüme Kampanyası',
    client: 'CafeRoast',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2070',
    description: 'CafeRoast markası için sosyal medya stratejisi ve içerik üretimi.',
    services: ['Sosyal Medya Yönetimi', 'İçerik Üretimi', 'Influencer Marketing'],
    results: [
      { id: 1, metric: 'Instagram Takipçileri', value: '+20,000', improvement: 'Yeni Takipçi' },
      { id: 2, metric: 'Etkileşim Oranı', value: '+45%', improvement: 'Artış' }
    ],
    duration: '4 ay',
    startDate: '2023-05-20',
    status: 'in-progress',
    featured: true
  }
];

const availableServices = [
  'Dijital Pazarlama',
  'SEO Optimizasyonu',
  'Sosyal Medya Yönetimi',
  'İçerik Üretimi',
  'Web Tasarımı',
  'E-posta Pazarlaması',
  'Google Ads Yönetimi',
  'Facebook/Instagram Ads',
  'Influencer Marketing',
  'Marka Stratejisi',
  'Anahtar Kelime Araştırması',
  'Dönüşüm Optimizasyonu',
  'Teknik SEO Denetimi',
  'Rakip Analizi'
];

const ProjectManager = () => {
  const { toast } = useToast();
  const { 
    items: projects, 
    add: addProject, 
    update: updateProject, 
    remove: removeProject,
    isLoading
  } = useDataService<Project>('projects', defaultProjects);

  const [editMode, setEditMode] = useState<'create' | 'edit' | null>(null);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // For the Results section
  const [newResult, setNewResult] = useState({ metric: '', value: '', improvement: '' });
  
  // For service selection
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceInput, setServiceInput] = useState('');
  
  // For gallery images
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    let filtered = [...projects];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }
    
    setFilteredProjects(filtered);
  }, [projects, searchTerm, statusFilter]);

  const resetForm = () => {
    setCurrentProject(null);
    setEditMode(null);
    setActiveTab('details');
    setSelectedServices([]);
    setServiceInput('');
    setNewImageUrl('');
    setNewResult({ metric: '', value: '', improvement: '' });
  };

  const handleCreateProject = () => {
    setCurrentProject({
      title: '',
      client: '',
      image: '',
      description: '',
      services: [],
      results: [],
      duration: '',
      startDate: new Date().toISOString().split('T')[0],
      status: 'planned',
      featured: false,
      galleryImages: []
    });
    setSelectedServices([]);
    setEditMode('create');
    setIsDialogOpen(true);
    setActiveTab('details');
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject({...project});
    setSelectedServices(project.services || []);
    setEditMode('edit');
    setIsDialogOpen(true);
    setActiveTab('details');
  };

  const handleSaveProject = () => {
    if (!currentProject || !currentProject.title || !currentProject.client) {
      toast({
        title: 'Eksik Bilgi',
        description: 'Lütfen en az başlık ve müşteri alanlarını doldurun.',
        variant: 'destructive'
      });
      return;
    }
    
    // Make sure services are updated from selected services
    const projectToSave = {
      ...currentProject,
      services: selectedServices
    };
    
    if (editMode === 'create') {
      addProject(projectToSave as Omit<Project, 'id'>);
      toast({
        title: 'Proje Eklendi',
        description: 'Yeni proje başarıyla eklendi.'
      });
    } else {
      updateProject(projectToSave.id!, projectToSave);
      toast({
        title: 'Proje Güncellendi',
        description: 'Proje bilgileri başarıyla güncellendi.'
      });
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleDeleteProject = (id: number) => {
    removeProject(id);
    toast({
      title: 'Proje Silindi',
      description: 'Proje başarıyla silindi.'
    });
  };
  
  const handleAddResult = () => {
    if (!newResult.metric || !newResult.value) {
      toast({
        title: 'Eksik Bilgi',
        description: 'Metrik ve değer alanları zorunludur.',
        variant: 'destructive'
      });
      return;
    }
    
    const newResults = [
      ...(currentProject?.results || []),
      {
        id: Date.now(),
        metric: newResult.metric,
        value: newResult.value,
        improvement: newResult.improvement
      }
    ];
    
    setCurrentProject({
      ...currentProject,
      results: newResults
    });
    
    setNewResult({ metric: '', value: '', improvement: '' });
    
    toast({
      title: 'Sonuç Eklendi',
      description: 'Yeni proje sonucu başarıyla eklendi.'
    });
  };
  
  const handleRemoveResult = (id: number) => {
    const newResults = currentProject?.results?.filter(result => result.id !== id) || [];
    
    setCurrentProject({
      ...currentProject,
      results: newResults
    });
    
    toast({
      title: 'Sonuç Silindi',
      description: 'Proje sonucu başarıyla silindi.'
    });
  };
  
  const handleAddService = () => {
    if (!serviceInput && !selectedServices.includes(serviceInput)) {
      return;
    }
    
    setSelectedServices([...selectedServices, serviceInput]);
    setServiceInput('');
  };
  
  const handleRemoveService = (service: string) => {
    setSelectedServices(selectedServices.filter(s => s !== service));
  };
  
  const handleAddGalleryImage = () => {
    if (!newImageUrl) {
      toast({
        title: 'Eksik Bilgi',
        description: 'Lütfen bir görsel URL\'si girin.',
        variant: 'destructive'
      });
      return;
    }
    
    const newGallery = [
      ...(currentProject?.galleryImages || []),
      newImageUrl
    ];
    
    setCurrentProject({
      ...currentProject,
      galleryImages: newGallery
    });
    
    setNewImageUrl('');
    
    toast({
      title: 'Görsel Eklendi',
      description: 'Galeri görseli başarıyla eklendi.'
    });
  };
  
  const handleRemoveGalleryImage = (url: string) => {
    const newGallery = currentProject?.galleryImages?.filter(img => img !== url) || [];
    
    setCurrentProject({
      ...currentProject,
      galleryImages: newGallery
    });
    
    toast({
      title: 'Görsel Silindi',
      description: 'Galeri görseli başarıyla silindi.'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">Proje Yönetimi</h2>
          <p className="text-gray-400">Portföy projelerinizi yönetin ve düzenleyin</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Button onClick={handleCreateProject} className="bg-ignite hover:bg-ignite-700">
            <Plus className="h-4 w-4 mr-2" /> Yeni Proje
          </Button>
        </div>
      </div>
      
      <div className="bg-dark-500 p-4 rounded-lg space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Projelerde ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-dark-400 border-dark-300"
            />
          </div>
          
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full md:w-40 bg-dark-400 border-dark-300">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Durum" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-dark-400 border-dark-300">
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="completed">Tamamlanan</SelectItem>
              <SelectItem value="in-progress">Devam Eden</SelectItem>
              <SelectItem value="planned">Planlanan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="overflow-x-auto">
          <Table className="border border-dark-400 rounded-md">
            <TableHeader className="bg-dark-600">
              <TableRow>
                <TableHead className="text-white w-10">ID</TableHead>
                <TableHead className="text-white">Proje</TableHead>
                <TableHead className="text-white">Müşteri</TableHead>
                <TableHead className="text-white">Durum</TableHead>
                <TableHead className="text-white hidden md:table-cell">Hizmetler</TableHead>
                <TableHead className="text-white hidden md:table-cell">Süre</TableHead>
                <TableHead className="text-white text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                    {searchTerm || statusFilter !== 'all' ? 
                      "Arama kriterlerinize uygun proje bulunamadı." :
                      "Henüz hiç proje eklenmemiş."
                    }
                  </TableCell>
                </TableRow>
              ) : (
                filteredProjects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-dark-400">
                    <TableCell className="font-medium">{project.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {project.image && (
                          <div className="w-10 h-10 rounded-md overflow-hidden border border-dark-300">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          {project.title}
                          {project.featured && (
                            <span className="ml-2">
                              <Badge className="bg-amber-500 text-white">Öne Çıkan</Badge>
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>
                      <Badge className={
                        project.status === 'completed' ? 'bg-green-600' : 
                        project.status === 'in-progress' ? 'bg-blue-600' : 
                        'bg-gray-600'
                      }>
                        {project.status === 'completed' ? 'Tamamlandı' : 
                         project.status === 'in-progress' ? 'Devam Ediyor' : 
                         'Planlanıyor'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.services && project.services.length > 0 ? (
                          project.services.slice(0, 2).map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">Belirtilmemiş</span>
                        )}
                        {project.services && project.services.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.services.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{project.duration}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => handleEditProject(project)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20" 
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="bg-dark-500 border-dark-400 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editMode === 'create' ? 'Yeni Proje Ekle' : 'Projeyi Düzenle'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editMode === 'create' 
                ? 'Yeni bir proje oluşturmak için aşağıdaki bilgileri doldurun.' 
                : 'Proje bilgilerini güncellemek için değişikliklerinizi yapın.'}
            </DialogDescription>
          </DialogHeader>
          
          {currentProject && (
            <div className="mt-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-dark-400 border-dark-300">
                  <TabsTrigger value="details" className="data-[state=active]:bg-ignite">
                    Temel Bilgiler
                  </TabsTrigger>
                  <TabsTrigger value="services" className="data-[state=active]:bg-ignite">
                    Kullanılan Hizmetler
                  </TabsTrigger>
                  <TabsTrigger value="results" className="data-[state=active]:bg-ignite">
                    Sonuçlar
                  </TabsTrigger>
                  <TabsTrigger value="gallery" className="data-[state=active]:bg-ignite">
                    Galeri
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Proje Başlığı *</Label>
                      <Input 
                        id="title"
                        value={currentProject.title}
                        onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                        placeholder="Proje başlığını girin"
                        className="bg-dark-400 border-dark-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="client">Müşteri / Marka *</Label>
                      <Input 
                        id="client"
                        value={currentProject.client}
                        onChange={(e) => setCurrentProject({...currentProject, client: e.target.value})}
                        placeholder="Müşteri adını girin"
                        className="bg-dark-400 border-dark-300"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Proje Açıklaması</Label>
                    <Textarea 
                      id="description"
                      value={currentProject.description}
                      onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
                      placeholder="Proje hakkında detaylı açıklama girin"
                      className="bg-dark-400 border-dark-300 min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Ana Görsel URL</Label>
                    <Input 
                      id="image"
                      value={currentProject.image}
                      onChange={(e) => setCurrentProject({...currentProject, image: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                      className="bg-dark-400 border-dark-300"
                    />
                    {currentProject.image && (
                      <div className="mt-2 border border-dark-300 rounded-md overflow-hidden">
                        <img 
                          src={currentProject.image} 
                          alt="Proje görseli önizleme" 
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Durum</Label>
                      <Select
                        value={currentProject.status}
                        onValueChange={(value: 'completed' | 'in-progress' | 'planned') => 
                          setCurrentProject({...currentProject, status: value})
                        }
                      >
                        <SelectTrigger id="status" className="bg-dark-400 border-dark-300">
                          <SelectValue placeholder="Durum seçin" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-400 border-dark-300">
                          <SelectItem value="completed">Tamamlandı</SelectItem>
                          <SelectItem value="in-progress">Devam Ediyor</SelectItem>
                          <SelectItem value="planned">Planlanıyor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Başlangıç Tarihi</Label>
                      <Input 
                        id="startDate"
                        type="date"
                        value={currentProject.startDate}
                        onChange={(e) => setCurrentProject({...currentProject, startDate: e.target.value})}
                        className="bg-dark-400 border-dark-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Proje Süresi</Label>
                      <Input 
                        id="duration"
                        value={currentProject.duration}
                        onChange={(e) => setCurrentProject({...currentProject, duration: e.target.value})}
                        placeholder="örn: 3 ay"
                        className="bg-dark-400 border-dark-300"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <input 
                      type="checkbox" 
                      id="featured"
                      checked={currentProject.featured}
                      onChange={(e) => setCurrentProject({...currentProject, featured: e.target.checked})}
                      className="form-checkbox h-5 w-5 text-ignite bg-dark-400 border-dark-300 rounded"
                    />
                    <Label htmlFor="featured">Öne Çıkan Proje olarak göster</Label>
                  </div>
                  
                  <div className="space-y-2 border-t border-dark-400 pt-4 mt-4">
                    <h3 className="font-medium">Testimonial</h3>
                    <div className="space-y-2">
                      <Label htmlFor="testimonial">Müşteri Yorumu</Label>
                      <Textarea 
                        id="testimonial"
                        value={currentProject.testimonial || ''}
                        onChange={(e) => setCurrentProject({...currentProject, testimonial: e.target.value})}
                        placeholder="Müşteri yorumunu girin"
                        className="bg-dark-400 border-dark-300"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="testimonialAuthor">Yorum Sahibi</Label>
                        <Input 
                          id="testimonialAuthor"
                          value={currentProject.testimonialAuthor || ''}
                          onChange={(e) => setCurrentProject({...currentProject, testimonialAuthor: e.target.value})}
                          placeholder="Örn: Ahmet Yılmaz"
                          className="bg-dark-400 border-dark-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="testimonialRole">Pozisyon/Ünvan</Label>
                        <Input 
                          id="testimonialRole"
                          value={currentProject.testimonialRole || ''}
                          onChange={(e) => setCurrentProject({...currentProject, testimonialRole: e.target.value})}
                          placeholder="Örn: Pazarlama Direktörü"
                          className="bg-dark-400 border-dark-300"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="services" className="space-y-4 mt-4">
                  <div className="bg-dark-600 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Projede Kullanılan Hizmetler</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Bu projede sağladığınız hizmetleri seçin veya yeni bir hizmet ekleyin.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedServices.map((service, index) => (
                        <Badge 
                          key={index} 
                          className="bg-ignite/20 text-ignite border-ignite/30 px-3 py-1"
                        >
                          {service}
                          <button 
                            onClick={() => handleRemoveService(service)}
                            className="ml-2 hover:text-white"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      
                      {selectedServices.length === 0 && (
                        <p className="text-gray-400 text-sm">Henüz hiç hizmet seçilmedi.</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="services">Hizmet Ekle</Label>
                      <div className="flex flex-col gap-2">
                        <Select
                          value={serviceInput}
                          onValueChange={setServiceInput}
                        >
                          <SelectTrigger id="service" className="bg-dark-400 border-dark-300">
                            <SelectValue placeholder="Hizmet seçin" />
                          </SelectTrigger>
                          <SelectContent className="bg-dark-400 border-dark-300 max-h-60">
                            {availableServices.map((service) => (
                              <SelectItem key={service} value={service}>{service}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Button 
                          onClick={handleAddService}
                          className="w-full bg-ignite hover:bg-ignite-700"
                          disabled={!serviceInput || selectedServices.includes(serviceInput)}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Hizmet Ekle
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="results" className="space-y-4 mt-4">
                  <div className="bg-dark-600 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Proje Sonuçları</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Bu projede elde ettiğiniz sonuçları ve metrikleri ekleyin.
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      {currentProject.results && currentProject.results.length > 0 ? (
                        currentProject.results.map((result) => (
                          <div key={result.id} className="flex items-center justify-between p-3 bg-dark-500 rounded-md">
                            <div>
                              <h4 className="font-medium">{result.metric}</h4>
                              <div className="flex items-center text-sm">
                                <span className="text-ignite font-bold mr-2">{result.value}</span>
                                {result.improvement && (
                                  <span className="text-gray-400">{result.improvement}</span>
                                )}
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20" 
                              onClick={() => handleRemoveResult(result.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-sm">Henüz sonuç eklenmemiş.</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="metric">Metrik Adı</Label>
                        <Input 
                          id="metric"
                          value={newResult.metric}
                          onChange={(e) => setNewResult({...newResult, metric: e.target.value})}
                          placeholder="Örn: Organik Trafik"
                          className="bg-dark-400 border-dark-300"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="value">Değer</Label>
                        <Input 
                          id="value"
                          value={newResult.value}
                          onChange={(e) => setNewResult({...newResult, value: e.target.value})}
                          placeholder="Örn: +150%"
                          className="bg-dark-400 border-dark-300"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="improvement">Değişim Açıklaması</Label>
                        <Input 
                          id="improvement"
                          value={newResult.improvement}
                          onChange={(e) => setNewResult({...newResult, improvement: e.target.value})}
                          placeholder="Örn: Artış"
                          className="bg-dark-400 border-dark-300"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleAddResult}
                      className="w-full mt-4 bg-ignite hover:bg-ignite-700"
                      disabled={!newResult.metric || !newResult.value}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Sonuç Ekle
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="gallery" className="space-y-4 mt-4">
                  <div className="bg-dark-600 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Proje Galerisi</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Proje ile ilgili ek görseller ekleyin.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {currentProject.galleryImages && currentProject.galleryImages.length > 0 ? (
                        currentProject.galleryImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={image} 
                              alt={`Galeri görseli ${index + 1}`} 
                              className="w-full h-32 object-cover rounded-md border border-dark-300"
                            />
                            <div className="absolute inset-0 bg-dark-800/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                              <Button 
                                variant="destructive" 
                                size="icon" 
                                className="h-8 w-8" 
                                onClick={() => handleRemoveGalleryImage(image)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-3">
                          <p className="text-gray-400 text-sm">Henüz galeri görseli eklenmemiş.</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input 
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="Görsel URL'sini girin"
                        className="bg-dark-400 border-dark-300"
                      />
                      <Button 
                        onClick={handleAddGalleryImage}
                        className="bg-ignite hover:bg-ignite-700"
                        disabled={!newImageUrl}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Ekle
                      </Button>
                    </div>
                    
                    <div className="mt-4 p-3 bg-dark-500 rounded-md border border-dark-400">
                      <div className="flex items-center">
                        <Upload className="h-5 w-5 mr-2 text-gray-400" />
                        <p className="text-sm">
                          <span className="text-ignite font-medium">Görsel Yükleme</span> özelliği yakında eklenecektir. Şimdilik görsel URL'si kullanabilirsiniz.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => {
              setIsDialogOpen(false);
              resetForm();
            }}>
              İptal
            </Button>
            <Button 
              className="bg-ignite hover:bg-ignite-700"
              onClick={handleSaveProject}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editMode === 'create' ? 'Ekleniyor...' : 'Güncelleniyor...'}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {editMode === 'create' ? 'Projeyi Ekle' : 'Projeyi Güncelle'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManager;
