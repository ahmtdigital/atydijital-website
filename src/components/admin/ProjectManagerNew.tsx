
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Edit, Trash2, Image, Save, X, Link, Tag, Category } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Project {
  id: number;
  title: string;
  slug: string;
  client: string;
  category: string;
  description: string;
  image: string;
  featuredImage: string;
  gallery: string[];
  tags: string[];
  featured: boolean;
  content: string;
  services: string[];
  metaTitle: string;
  metaDescription: string;
  completionDate: string;
}

const defaultProject: Omit<Project, 'id'> = {
  title: '',
  slug: '',
  client: '',
  category: 'web-tasarim',
  description: '',
  image: '/placeholder.svg',
  featuredImage: '/placeholder.svg',
  gallery: [],
  tags: [],
  featured: false,
  content: '',
  services: [],
  metaTitle: '',
  metaDescription: '',
  completionDate: ''
};

const categories = [
  { value: 'web-tasarim', label: 'Web Tasarım' },
  { value: 'dijital-pazarlama', label: 'Dijital Pazarlama' },
  { value: 'sosyal-medya', label: 'Sosyal Medya' },
  { value: 'kurumsal-kimlik', label: 'Kurumsal Kimlik' },
  { value: 'mobil-uygulama', label: 'Mobil Uygulama' }
];

const ProjectManagerNew = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>(defaultProject);
  const [isEditing, setIsEditing] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const { toast } = useToast();
  
  const {
    items: projects,
    add: addProject,
    update: updateProject,
    remove: removeProject,
    isLoading
  } = useDataService<Project>('projects', [
    {
      id: 1,
      title: 'E-Ticaret Marka Yenileme',
      slug: 'e-ticaret-marka-yenileme',
      client: 'TrendModa',
      category: 'web-tasarim',
      description: 'Online moda mağazası için kapsamlı marka yenileme projesi',
      image: '/placeholder.svg',
      featuredImage: '/placeholder.svg',
      gallery: ['/placeholder.svg', '/placeholder.svg'],
      tags: ['e-ticaret', 'ux tasarım', 'mobil uyumluluk'],
      featured: true,
      content: '<p>Bu projede, TrendModa için kapsamlı bir marka yenileme çalışması gerçekleştirdik.</p>',
      services: ['web-tasarim', 'dijital-pazarlama'],
      metaTitle: 'E-Ticaret Marka Yenileme Projesi | Ignite',
      metaDescription: 'TrendModa için gerçekleştirdiğimiz e-ticaret marka yenileme projesi.',
      completionDate: '2023-08-15'
    },
    {
      id: 2,
      title: 'Kurumsal Kimlik Tasarımı',
      slug: 'kurumsal-kimlik-tasarimi',
      client: 'FinTech Solutions',
      category: 'kurumsal-kimlik',
      description: 'Finans teknolojileri şirketi için kurumsal kimlik tasarımı',
      image: '/placeholder.svg',
      featuredImage: '/placeholder.svg',
      gallery: ['/placeholder.svg'],
      tags: ['logo tasarım', 'kurumsal kimlik', 'marka stratejisi'],
      featured: true,
      content: '<p>FinTech Solutions için yaptığımız kurumsal kimlik çalışması.</p>',
      services: ['kurumsal-kimlik'],
      metaTitle: 'FinTech Solutions Kurumsal Kimlik | Ignite',
      metaDescription: 'FinTech Solutions için gerçekleştirdiğimiz kurumsal kimlik projesi.',
      completionDate: '2023-06-10'
    }
  ]);

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setCurrentProject(project);
      setIsEditing(true);
    } else {
      setCurrentProject(defaultProject);
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProject(defaultProject);
    setIsEditing(false);
    setTagInput('');
  };

  const handleSaveProject = () => {
    try {
      if (isEditing && currentProject.id) {
        updateProject(currentProject.id, currentProject as Project);
        toast({
          title: "Başarılı",
          description: "Proje güncellendi.",
        });
      } else {
        addProject(currentProject as Omit<Project, 'id'>);
        toast({
          title: "Başarılı",
          description: "Yeni proje eklendi.",
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

  const handleDeleteProject = (id: number) => {
    if (confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      removeProject(id);
      toast({
        title: "Başarılı",
        description: "Proje silindi.",
      });
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !currentProject.tags?.includes(tagInput.trim())) {
      setCurrentProject({
        ...currentProject,
        tags: [...(currentProject.tags || []), tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setCurrentProject({
      ...currentProject,
      tags: currentProject.tags?.filter(t => t !== tag) || []
    });
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
            <Briefcase className="mr-2 h-6 w-6 text-ignite" />
            Projeleri Yönet
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Portfolyo bölümünde görüntülenecek projeleri buradan düzenleyebilirsiniz
          </p>
        </div>
        <Button 
          onClick={() => handleOpenDialog()} 
          className="bg-ignite hover:bg-ignite-700"
        >
          <Plus className="h-4 w-4 mr-2" /> Yeni Proje Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-dark-500 border-dark-400 overflow-hidden">
            <div className="h-40 bg-dark-600 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image className="h-10 w-10 text-white/20" />
              </div>
              {project.featured && (
                <Badge className="absolute top-2 right-2 bg-ignite text-white">
                  Öne Çıkan
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{project.title}</h3>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-dark-400 text-white/70 mr-2">{project.client}</Badge>
                    <Badge className="bg-dark-400 text-white/70">
                      {categories.find(c => c.value === project.category)?.label || project.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-white/60 mt-2">{project.description}</p>
                  <div className="flex flex-wrap mt-3 gap-1">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} className="bg-dark-700 text-white/80 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:bg-dark-400"
                    onClick={() => handleOpenDialog(project)}
                  >
                    <Edit className="h-4 w-4 text-blue-400" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:bg-dark-400"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-dark-500 border-dark-400 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}</DialogTitle>
            <DialogDescription>
              Proje bilgilerini aşağıdaki formdan düzenleyebilirsiniz.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Proje Adı</label>
              <Input 
                value={currentProject.title} 
                onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                className="bg-dark-400 border-dark-300"
                placeholder="Örn: E-Ticaret Projesi"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Proje URL (Slug)</label>
              <div className="flex items-center">
                <span className="bg-dark-600 border border-dark-300 border-r-0 rounded-l-md px-3 py-2 text-white/60">/portfolio/</span>
                <Input 
                  value={currentProject.slug} 
                  onChange={(e) => setCurrentProject({...currentProject, slug: e.target.value})}
                  className="bg-dark-400 border-dark-300 rounded-l-none"
                  placeholder="e-ticaret-projesi"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Müşteri</label>
              <Input 
                value={currentProject.client} 
                onChange={(e) => setCurrentProject({...currentProject, client: e.target.value})}
                className="bg-dark-400 border-dark-300"
                placeholder="Müşteri adı"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori</label>
              <Select 
                value={currentProject.category}
                onValueChange={(value) => setCurrentProject({...currentProject, category: value})}
              >
                <SelectTrigger className="bg-dark-400 border-dark-300">
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent className="bg-dark-500 border-dark-400">
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Kısa Açıklama</label>
              <Textarea 
                value={currentProject.description} 
                onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
                className="bg-dark-400 border-dark-300 resize-none"
                placeholder="Projenin kısa açıklaması"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Tamamlanma Tarihi</label>
              <Input 
                type="date"
                value={currentProject.completionDate} 
                onChange={(e) => setCurrentProject({...currentProject, completionDate: e.target.value})}
                className="bg-dark-400 border-dark-300"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Öne Çıkan</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  checked={currentProject.featured}
                  onChange={(e) => setCurrentProject({...currentProject, featured: e.target.checked})}
                  className="w-4 h-4 accent-ignite"
                />
                <span className="text-sm text-white/70">Projeyi ana sayfada göster</span>
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Etiketler</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {currentProject.tags?.map((tag, index) => (
                  <Badge key={index} className="bg-dark-700 text-white flex items-center gap-1">
                    {tag}
                    <button 
                      onClick={() => handleRemoveTag(tag)}
                      className="text-white/70 hover:text-white ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input 
                  value={tagInput} 
                  onChange={(e) => setTagInput(e.target.value)}
                  className="bg-dark-400 border-dark-300"
                  placeholder="Yeni etiket ekle"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button 
                  type="button" 
                  onClick={handleAddTag}
                  className="bg-dark-600 hover:bg-dark-400"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">İçerik</label>
              <Textarea 
                value={currentProject.content} 
                onChange={(e) => setCurrentProject({...currentProject, content: e.target.value})}
                className="bg-dark-400 border-dark-300 resize-none"
                placeholder="Projenin detaylı açıklaması. HTML içerebilir."
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Başlık (SEO)</label>
              <Input 
                value={currentProject.metaTitle} 
                onChange={(e) => setCurrentProject({...currentProject, metaTitle: e.target.value})}
                className="bg-dark-400 border-dark-300"
                placeholder="SEO için başlık"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Açıklama (SEO)</label>
              <Input 
                value={currentProject.metaDescription} 
                onChange={(e) => setCurrentProject({...currentProject, metaDescription: e.target.value})}
                className="bg-dark-400 border-dark-300"
                placeholder="SEO için açıklama"
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-end gap-2">
            <Button variant="outline" onClick={handleCloseDialog} className="border-dark-300 hover:bg-dark-400">
              <X className="h-4 w-4 mr-2" /> İptal
            </Button>
            <Button onClick={handleSaveProject} className="bg-ignite hover:bg-ignite-700">
              <Save className="h-4 w-4 mr-2" /> Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ProjectManagerNew;
