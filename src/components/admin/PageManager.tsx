
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Edit, Trash2, Save, X, Eye, Layout, Layers, Settings, Link, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  template: string;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
  headerImage: string;
  lastModified: string;
  sections: PageSection[];
  keywords: string;
  canonicalUrl: string;
  customCss: string;
  customJs: string;
  excludeFromSitemap: boolean;
}

interface PageSection {
  id: string;
  type: string;
  title: string;
  content: string;
  order: number;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
}

const defaultPage: Omit<Page, 'id'> = {
  title: '',
  slug: '',
  content: '',
  template: 'default',
  metaTitle: '',
  metaDescription: '',
  published: false,
  headerImage: '/placeholder.svg',
  lastModified: new Date().toISOString(),
  sections: [],
  keywords: '',
  canonicalUrl: '',
  customCss: '',
  customJs: '',
  excludeFromSitemap: false
};

const templates = [
  { value: 'default', label: 'Standart Sayfa' },
  { value: 'landing', label: 'İniş Sayfası' },
  { value: 'contact', label: 'İletişim Sayfası' },
  { value: 'about', label: 'Hakkımızda Sayfası' },
  { value: 'services', label: 'Hizmetler Sayfası' },
  { value: 'portfolio', label: 'Portföy Sayfası' },
  { value: 'blog', label: 'Blog Sayfası' }
];

const sectionTypes = [
  { value: 'text', label: 'Metin Bloğu' },
  { value: 'hero', label: 'Hero Bölümü' },
  { value: 'features', label: 'Özellikler' },
  { value: 'testimonials', label: 'Müşteri Yorumları' },
  { value: 'cta', label: 'Aksiyon Çağrısı' },
  { value: 'gallery', label: 'Galeri' },
  { value: 'video', label: 'Video' },
  { value: 'team', label: 'Ekip Üyeleri' },
  { value: 'pricing', label: 'Fiyatlandırma' },
  { value: 'contact', label: 'İletişim Formu' }
];

const PageManager = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState<Partial<Page>>(defaultPage);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTemplate, setFilterTemplate] = useState<string | null>(null);
  const { toast } = useToast();
  
  const {
    items: pages,
    add: addPage,
    update: updatePage,
    remove: removePage,
    isLoading
  } = useDataService<Page>('pages', [
    {
      id: 1,
      title: 'Hakkımızda',
      slug: 'about',
      content: '<p>Biz, dijital dünyada markaların başarıya ulaşmasına yardımcı olan bir ajansız.</p>',
      template: 'about',
      metaTitle: 'Hakkımızda | Ignite Pazarlama',
      metaDescription: 'Ignite Pazarlama olarak kim olduğumuzu ve neler yaptığımızı keşfedin.',
      published: true,
      headerImage: '/placeholder.svg',
      lastModified: '2023-08-10T10:30:00',
      sections: [
        {
          id: 'section-1',
          type: 'hero',
          title: 'Hikayemiz',
          content: 'Ignite Pazarlama 2018 yılında kuruldu.',
          order: 1
        },
        {
          id: 'section-2',
          type: 'text',
          title: 'Misyonumuz',
          content: 'Müşterilerimizin dijital başarısı için çalışıyoruz.',
          order: 2
        }
      ],
      keywords: 'hakkımızda, ajans, pazarlama',
      canonicalUrl: '',
      customCss: '',
      customJs: '',
      excludeFromSitemap: false
    },
    {
      id: 2,
      title: 'Hizmetlerimiz',
      slug: 'services',
      content: '<p>Sunduğumuz hizmetler hakkında bilgi edinebilirsiniz.</p>',
      template: 'services',
      metaTitle: 'Hizmetlerimiz | Ignite Pazarlama',
      metaDescription: 'Ignite Pazarlama\'nın sunduğu dijital pazarlama hizmetlerini keşfedin.',
      published: true,
      headerImage: '/placeholder.svg',
      lastModified: '2023-09-15T14:45:00',
      sections: [
        {
          id: 'section-1',
          type: 'hero',
          title: 'Hizmetlerimiz',
          content: 'Markanızı büyütmek için ihtiyacınız olan tüm hizmetler.',
          order: 1
        },
        {
          id: 'section-2',
          type: 'features',
          title: 'Öne Çıkan Hizmetler',
          content: 'Dijital pazarlama, web tasarım, sosyal medya yönetimi',
          order: 2
        }
      ],
      keywords: 'hizmetler, dijital pazarlama, web tasarım',
      canonicalUrl: '',
      customCss: '',
      customJs: '',
      excludeFromSitemap: false
    }
  ]);

  // Filter pages based on search term and template
  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTemplate = !filterTemplate || page.template === filterTemplate;
    return matchesSearch && matchesTemplate;
  });

  const handleOpenDialog = (page?: Page) => {
    if (page) {
      setCurrentPage(page);
      setIsEditing(true);
    } else {
      setCurrentPage(defaultPage);
      setIsEditing(false);
    }
    setActiveTab('general');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPage(defaultPage);
    setIsEditing(false);
  };

  const handleSavePage = () => {
    try {
      if (!currentPage.title || !currentPage.slug) {
        toast({
          title: "Hata",
          description: "Başlık ve URL (Slug) alanları zorunludur.",
          variant: "destructive",
        });
        return;
      }
      
      const now = new Date().toISOString();
      const updatedPage = {
        ...currentPage,
        lastModified: now
      };
      
      if (isEditing && currentPage.id) {
        updatePage(currentPage.id, updatedPage as Page);
        toast({
          title: "Başarılı",
          description: "Sayfa güncellendi.",
        });
      } else {
        addPage(updatedPage as Omit<Page, 'id'>);
        toast({
          title: "Başarılı",
          description: "Yeni sayfa eklendi.",
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

  const handleDeletePage = (id: number) => {
    if (confirm('Bu sayfayı silmek istediğinize emin misiniz?')) {
      removePage(id);
      toast({
        title: "Başarılı",
        description: "Sayfa silindi.",
      });
    }
  };

  const handleAddSection = () => {
    const newSection: PageSection = {
      id: `section-${Date.now()}`,
      type: 'text',
      title: 'Yeni Bölüm',
      content: '',
      order: currentPage.sections ? currentPage.sections.length + 1 : 1
    };
    
    setCurrentPage({
      ...currentPage,
      sections: [...(currentPage.sections || []), newSection]
    });
  };

  const handleUpdateSection = (sectionId: string, updates: Partial<PageSection>) => {
    setCurrentPage({
      ...currentPage,
      sections: currentPage.sections?.map(section => 
        section.id === sectionId ? { ...section, ...updates } : section
      )
    });
  };

  const handleDeleteSection = (sectionId: string) => {
    setCurrentPage({
      ...currentPage,
      sections: currentPage.sections?.filter(section => section.id !== sectionId)
    });
  };

  const handleMoveSectionUp = (sectionId: string) => {
    const sections = [...(currentPage.sections || [])];
    const index = sections.findIndex(s => s.id === sectionId);
    
    if (index > 0) {
      // Swap with previous section
      const temp = sections[index];
      sections[index] = { ...sections[index - 1], order: index + 1 };
      sections[index - 1] = { ...temp, order: index };
      
      setCurrentPage({
        ...currentPage,
        sections
      });
    }
  };

  const handleMoveSectionDown = (sectionId: string) => {
    const sections = [...(currentPage.sections || [])];
    const index = sections.findIndex(s => s.id === sectionId);
    
    if (index < sections.length - 1) {
      // Swap with next section
      const temp = sections[index];
      sections[index] = { ...sections[index + 1], order: index + 1 };
      sections[index + 1] = { ...temp, order: index + 2 };
      
      setCurrentPage({
        ...currentPage,
        sections
      });
    }
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/--+/g, '-') // Replace multiple - with single -
      .trim();
  };
  
  // Handle title change and auto-generate slug if it's a new page
  const handleTitleChange = (title: string) => {
    setCurrentPage({
      ...currentPage,
      title,
      slug: isEditing ? currentPage.slug : generateSlug(title)
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
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
            <FileText className="mr-2 h-6 w-6 text-ignite" />
            Sayfaları Yönet
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Web sitenizdeki sayfaları oluşturun, düzenleyin ve yönetin
          </p>
        </div>
        <Button 
          onClick={() => handleOpenDialog()} 
          className="bg-ignite hover:bg-ignite-700"
        >
          <Plus className="h-4 w-4 mr-2" /> Yeni Sayfa Ekle
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
          <Input
            placeholder="Sayfa ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-dark-400 border-dark-300 text-white"
          />
        </div>
        <Select 
          value={filterTemplate || ""} 
          onValueChange={(value) => setFilterTemplate(value || null)}
        >
          <SelectTrigger className="bg-dark-400 border-dark-300 text-white w-auto min-w-[180px]">
            <SelectValue placeholder="Tüm Şablonlar" />
          </SelectTrigger>
          <SelectContent className="bg-dark-500 border-dark-400">
            <SelectItem value="">Tüm Şablonlar</SelectItem>
            {templates.map(template => (
              <SelectItem key={template.value} value={template.value}>{template.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredPages.map((page) => (
          <Card key={page.id} className="bg-dark-500 border-dark-400 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4 bg-dark-600 p-4 flex flex-col items-start justify-center">
                <Badge className={`mb-2 ${page.published ? 'bg-emerald-600/30 text-emerald-400' : 'bg-amber-600/30 text-amber-400'}`}>
                  {page.published ? 'Yayında' : 'Taslak'}
                </Badge>
                <h3 className="text-lg font-medium text-white">{page.title}</h3>
                <p className="text-sm text-white/70 mt-1">/{page.slug}</p>
                <Badge className="mt-3 bg-dark-400 text-white/70">
                  {templates.find(t => t.value === page.template)?.label || page.template}
                </Badge>
              </div>
              <div className="w-full md:w-3/4 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center text-sm text-white/60 mt-1">
                      <Layers className="h-3 w-3 mr-1" /> {page.sections?.length || 0} bölüm
                    </div>
                    <p className="text-sm text-white/70 mt-2">
                      Son güncelleme: {formatDate(page.lastModified)}
                    </p>
                    <div className="mt-3">
                      <p className="text-sm text-white/70">
                        <span className="font-medium text-white">Meta Başlık:</span> {page.metaTitle || page.title}
                      </p>
                      <p className="text-sm text-white/70 truncate max-w-md">
                        <span className="font-medium text-white">Meta Açıklama:</span> {page.metaDescription || 'Tanımlanmamış'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-dark-400"
                      onClick={() => handleOpenDialog(page)}
                    >
                      <Edit className="h-4 w-4 text-blue-400" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-dark-400"
                      onClick={() => handleDeletePage(page.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredPages.length === 0 && (
          <div className="text-center py-12 border border-dashed border-dark-400 rounded-md">
            <p className="text-white/60">
              {searchTerm || filterTemplate ? 'Arama kriterlerine uygun sayfa bulunamadı.' : 'Henüz sayfa eklenmemiş.'}
            </p>
            {!searchTerm && !filterTemplate && (
              <Button 
                onClick={() => handleOpenDialog()} 
                className="mt-4 bg-ignite hover:bg-ignite-700"
              >
                <Plus className="h-4 w-4 mr-2" /> İlk Sayfayı Ekle
              </Button>
            )}
          </div>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-dark-500 border-dark-400 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Sayfayı Düzenle' : 'Yeni Sayfa Ekle'}</DialogTitle>
            <DialogDescription className="text-white/60">
              Sayfa bilgilerini aşağıdaki formdan düzenleyebilirsiniz.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid grid-cols-4 bg-dark-600">
              <TabsTrigger value="general" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white">
                <Settings className="h-4 w-4 mr-2" /> Genel
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white">
                <Layout className="h-4 w-4 mr-2" /> İçerik
              </TabsTrigger>
              <TabsTrigger value="seo" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white">
                <Link className="h-4 w-4 mr-2" /> SEO
              </TabsTrigger>
              <TabsTrigger value="advanced" className="data-[state=active]:bg-ignite data-[state=active]:text-white text-white">
                <Settings className="h-4 w-4 mr-2" /> Gelişmiş
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Sayfa Başlığı</label>
                <Input 
                  value={currentPage.title} 
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="bg-dark-400 border-dark-300 text-white"
                  placeholder="Sayfa başlığı"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">URL (Slug)</label>
                <div className="flex items-center">
                  <span className="bg-dark-600 border border-dark-300 border-r-0 rounded-l-md px-3 py-2 text-white/60">/</span>
                  <Input 
                    value={currentPage.slug} 
                    onChange={(e) => setCurrentPage({...currentPage, slug: e.target.value})}
                    className="bg-dark-400 border-dark-300 rounded-l-none text-white"
                    placeholder="sayfa-url"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Şablon</label>
                <Select 
                  value={currentPage.template}
                  onValueChange={(value) => setCurrentPage({...currentPage, template: value})}
                >
                  <SelectTrigger className="bg-dark-400 border-dark-300 text-white">
                    <SelectValue placeholder="Şablon seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-500 border-dark-400">
                    {templates.map((template) => (
                      <SelectItem key={template.value} value={template.value}>
                        {template.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Durum</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox"
                    checked={currentPage.published}
                    onChange={(e) => setCurrentPage({...currentPage, published: e.target.checked})}
                    className="w-4 h-4 accent-ignite"
                  />
                  <span className="text-sm text-white">Sayfayı yayınla</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Header Görseli</label>
                <Input 
                  value={currentPage.headerImage} 
                  onChange={(e) => setCurrentPage({...currentPage, headerImage: e.target.value})}
                  className="bg-dark-400 border-dark-300 text-white"
                  placeholder="/images/header.jpg"
                />
                {currentPage.headerImage && (
                  <div className="mt-2 p-2 bg-dark-600 rounded-md">
                    <img 
                      src={currentPage.headerImage} 
                      alt="Header Önizleme" 
                      className="h-32 w-full object-cover rounded-md opacity-80"
                      onError={(e) => (e.target as HTMLImageElement).src = '/placeholder.svg'}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="py-4 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Ana İçerik</label>
                <Textarea 
                  value={currentPage.content} 
                  onChange={(e) => setCurrentPage({...currentPage, content: e.target.value})}
                  className="bg-dark-400 border-dark-300 resize-none text-white"
                  placeholder="Sayfanın ana içeriği. HTML içerebilir."
                  rows={5}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-medium text-white">Sayfa Bölümleri</h3>
                  <Button 
                    onClick={handleAddSection} 
                    className="bg-ignite hover:bg-ignite-700"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Bölüm Ekle
                  </Button>
                </div>
                
                {currentPage.sections?.map((section, index) => (
                  <Card key={section.id} className="bg-dark-600 border-dark-400">
                    <CardHeader className="py-3 px-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium text-white">
                          {index + 1}. {section.title || 'Bölüm'}
                        </CardTitle>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-dark-400"
                            onClick={() => handleMoveSectionUp(section.id)}
                            disabled={index === 0}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m18 15-6-6-6 6"/>
                            </svg>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-dark-400"
                            onClick={() => handleMoveSectionDown(section.id)}
                            disabled={index === (currentPage.sections?.length || 0) - 1}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m6 9 6 6 6-6"/>
                            </svg>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-dark-400"
                            onClick={() => handleDeleteSection(section.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-3 px-4 border-t border-dark-400">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">Bölüm Başlığı</label>
                          <Input 
                            value={section.title} 
                            onChange={(e) => handleUpdateSection(section.id, { title: e.target.value })}
                            className="bg-dark-400 border-dark-300 text-white"
                            placeholder="Bölüm başlığı"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">Bölüm Tipi</label>
                          <Select 
                            value={section.type}
                            onValueChange={(value) => handleUpdateSection(section.id, { type: value })}
                          >
                            <SelectTrigger className="bg-dark-400 border-dark-300 text-white">
                              <SelectValue placeholder="Tip seçin" />
                            </SelectTrigger>
                            <SelectContent className="bg-dark-500 border-dark-400">
                              {sectionTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-white">Bölüm İçeriği</label>
                          <Textarea 
                            value={section.content} 
                            onChange={(e) => handleUpdateSection(section.id, { content: e.target.value })}
                            className="bg-dark-400 border-dark-300 resize-none text-white"
                            placeholder="Bölüm içeriği"
                            rows={3}
                          />
                        </div>

                        {/* Ekstra alanlar bölüm tipine göre gösterilir */}
                        {(section.type === 'hero' || section.type === 'gallery' || section.type === 'features') && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Görsel URL</label>
                            <Input 
                              value={section.imageUrl || ''} 
                              onChange={(e) => handleUpdateSection(section.id, { imageUrl: e.target.value })}
                              className="bg-dark-400 border-dark-300 text-white"
                              placeholder="/images/section.jpg"
                            />
                          </div>
                        )}

                        {(section.type === 'cta' || section.type === 'hero') && (
                          <>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-white">Buton Metni</label>
                              <Input 
                                value={section.buttonText || ''} 
                                onChange={(e) => handleUpdateSection(section.id, { buttonText: e.target.value })}
                                className="bg-dark-400 border-dark-300 text-white"
                                placeholder="Daha Fazla"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-white">Buton URL</label>
                              <Input 
                                value={section.buttonUrl || ''} 
                                onChange={(e) => handleUpdateSection(section.id, { buttonUrl: e.target.value })}
                                className="bg-dark-400 border-dark-300 text-white"
                                placeholder="/iletisim"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {(!currentPage.sections || currentPage.sections.length === 0) && (
                  <div className="text-center py-8 border border-dashed border-dark-400 rounded-md">
                    <p className="text-white/50">Henüz bölüm eklenmedi</p>
                    <Button 
                      onClick={handleAddSection} 
                      className="mt-2 bg-ignite hover:bg-ignite-700"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" /> İlk Bölümü Ekle
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="seo" className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Meta Başlık</label>
                <Input 
                  value={currentPage.metaTitle} 
                  onChange={(e) => setCurrentPage({...currentPage, metaTitle: e.target.value})}
                  className="bg-dark-400 border-dark-300 text-white"
                  placeholder="SEO için başlık"
                />
                <p className="text-xs text-white/50 mt-1">Boş bırakırsanız sayfa başlığı kullanılır.</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Meta Açıklama</label>
                <Textarea 
                  value={currentPage.metaDescription} 
                  onChange={(e) => setCurrentPage({...currentPage, metaDescription: e.target.value})}
                  className="bg-dark-400 border-dark-300 resize-none text-white"
                  placeholder="SEO için açıklama"
                  rows={3}
                />
                <p className="text-xs text-white/50 mt-1">En fazla 160 karakter önerilir.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Anahtar Kelimeler</label>
                <Input 
                  value={currentPage.keywords} 
                  onChange={(e) => setCurrentPage({...currentPage, keywords: e.target.value})}
                  className="bg-dark-400 border-dark-300 text-white"
                  placeholder="anahtar,kelimeler,virgülle,ayırın"
                />
                <p className="text-xs text-white/50 mt-1">Virgülle ayrılmış anahtar kelimeler.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Canonical URL</label>
                <Input 
                  value={currentPage.canonicalUrl} 
                  onChange={(e) => setCurrentPage({...currentPage, canonicalUrl: e.target.value})}
                  className="bg-dark-400 border-dark-300 text-white"
                  placeholder="https://example.com/sayfa"
                />
                <p className="text-xs text-white/50 mt-1">Eğer bu sayfa başka bir sayfanın kopyasıysa, orijinal sayfanın URL'sini girin.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Sitemap Ayarları</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox"
                    checked={currentPage.excludeFromSitemap}
                    onChange={(e) => setCurrentPage({...currentPage, excludeFromSitemap: e.target.checked})}
                    className="w-4 h-4 accent-ignite"
                  />
                  <span className="text-sm text-white">Sitemap'ten hariç tut</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-dark-600 rounded-md border border-dark-400">
                <h4 className="font-medium mb-3 flex items-center text-white">
                  <Eye className="h-4 w-4 mr-2 text-ignite" /> Google Önizleme
                </h4>
                <div className="space-y-1">
                  <p className="text-blue-400 text-lg break-words">{currentPage.metaTitle || currentPage.title || 'Sayfa Başlığı'}</p>
                  <p className="text-green-400 text-sm break-words">https://ignitepazarlama.com/{currentPage.slug || 'sayfa-url'}</p>
                  <p className="text-white/70 text-sm break-words">{currentPage.metaDescription || 'Sayfa açıklaması buraya gelecek...'}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Özel CSS</label>
                <Textarea 
                  value={currentPage.customCss || ''} 
                  onChange={(e) => setCurrentPage({...currentPage, customCss: e.target.value})}
                  className="bg-dark-400 border-dark-300 resize-none text-white font-mono"
                  placeholder="/* Özel CSS kodları buraya */"
                  rows={5}
                />
                <p className="text-xs text-white/50 mt-1">Bu sayfa için özel CSS kodları ekleyin.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Özel JavaScript</label>
                <Textarea 
                  value={currentPage.customJs || ''} 
                  onChange={(e) => setCurrentPage({...currentPage, customJs: e.target.value})}
                  className="bg-dark-400 border-dark-300 resize-none text-white font-mono"
                  placeholder="// Özel JavaScript kodları buraya"
                  rows={5}
                />
                <p className="text-xs text-white/50 mt-1">Bu sayfa için özel JavaScript kodları ekleyin.</p>
              </div>

              <div className="space-y-2 border-t border-dark-400 pt-4 mt-4">
                <h4 className="font-medium mb-2 text-white">Sayfa Oluşturuldu</h4>
                {isEditing && (
                  <p className="text-sm text-white/70">
                    Son Düzenleme: {formatDate(currentPage.lastModified || new Date().toISOString())}
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="flex justify-between sm:justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleCloseDialog} className="border-dark-300 hover:bg-dark-400 text-white">
              <X className="h-4 w-4 mr-2" /> İptal
            </Button>
            <Button onClick={handleSavePage} className="bg-ignite hover:bg-ignite-700">
              <Save className="h-4 w-4 mr-2" /> Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default PageManager;
