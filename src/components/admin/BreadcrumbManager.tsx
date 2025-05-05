
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Save, Trash2, Plus, Menu, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { v4 as uuidv4 } from 'uuid';

interface BreadcrumbPage {
  id: string;
  title: string;
  path: string;
  parentPath: string;
  showInBreadcrumb: boolean;
}

const BreadcrumbManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('pages');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { 
    items: breadcrumbPages, 
    update: updateBreadcrumb,
    add: addBreadcrumb,
    remove: removeBreadcrumb,
    isLoading 
  } = useDataService<BreadcrumbPage>('breadcrumbPages', [
    {
      id: uuidv4(),
      title: 'Ana Sayfa',
      path: '/',
      parentPath: '',
      showInBreadcrumb: true
    },
    {
      id: uuidv4(),
      title: 'Hizmetlerimiz',
      path: '/services',
      parentPath: '/',
      showInBreadcrumb: true
    },
    {
      id: uuidv4(),
      title: 'Hakkımızda',
      path: '/about',
      parentPath: '/',
      showInBreadcrumb: true
    },
    {
      id: uuidv4(),
      title: 'Portfolyo',
      path: '/portfolio',
      parentPath: '/',
      showInBreadcrumb: true
    },
    {
      id: uuidv4(),
      title: 'Blog',
      path: '/blog',
      parentPath: '/',
      showInBreadcrumb: true
    },
    {
      id: uuidv4(),
      title: 'İletişim',
      path: '/contact',
      parentPath: '/',
      showInBreadcrumb: true
    }
  ]);

  const [newPage, setNewPage] = useState<Omit<BreadcrumbPage, 'id'>>({
    title: '',
    path: '',
    parentPath: '/',
    showInBreadcrumb: true
  });

  const [editMode, setEditMode] = useState<{ isActive: boolean, pageId: string | null }>({
    isActive: false,
    pageId: null
  });

  const [editedPage, setEditedPage] = useState<BreadcrumbPage>({
    id: '',
    title: '',
    path: '',
    parentPath: '',
    showInBreadcrumb: true
  });

  // Filter available parent paths (exclude the current page's path when editing)
  const getAvailableParentPaths = () => {
    if (editMode.isActive) {
      return breadcrumbPages.filter(page => page.id !== editMode.pageId);
    }
    return breadcrumbPages;
  };

  const handleSaveAll = () => {
    try {
      toast({
        title: "Başarılı",
        description: "Breadcrumb ayarları kaydedildi.",
      });
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ayarlar kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleAddPage = () => {
    try {
      if (!newPage.title || !newPage.path) {
        toast({
          title: "Hata",
          description: "Sayfa başlığı ve yolu gereklidir.",
          variant: "destructive",
        });
        return;
      }

      const pageId = uuidv4();
      addBreadcrumb({
        id: pageId,
        ...newPage
      });

      setNewPage({
        title: '',
        path: '',
        parentPath: '/',
        showInBreadcrumb: true
      });

      setIsDialogOpen(false);
      toast({
        title: "Başarılı",
        description: "Yeni sayfa eklendi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Sayfa eklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleRemovePage = (id: string) => {
    try {
      removeBreadcrumb(id);
      toast({
        title: "Başarılı",
        description: "Sayfa silindi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Sayfa silinirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleEditPage = (page: BreadcrumbPage) => {
    setEditMode({
      isActive: true,
      pageId: page.id
    });
    setEditedPage({ ...page });
  };

  const handleSaveEdit = () => {
    try {
      if (!editedPage.title || !editedPage.path) {
        toast({
          title: "Hata",
          description: "Sayfa başlığı ve yolu gereklidir.",
          variant: "destructive",
        });
        return;
      }

      updateBreadcrumb(editedPage.id, editedPage);
      
      setEditMode({
        isActive: false,
        pageId: null
      });
      
      toast({
        title: "Başarılı",
        description: "Sayfa bilgileri güncellendi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Sayfa güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditMode({
      isActive: false,
      pageId: null
    });
  };

  const renderPagePath = (page: BreadcrumbPage) => {
    if (!page.parentPath || page.parentPath === '/') {
      return page.path;
    }
    
    const parentPage = breadcrumbPages.find(p => p.path === page.parentPath);
    return parentPage ? `${parentPage.title} / ${page.title}` : page.path;
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
          <h2 className="text-2xl font-bold">Breadcrumb Yönetimi</h2>
          <p className="text-sm text-white/60 mt-1">
            Sayfa yollarını ve breadcrumb görünümünü düzenleyin
          </p>
        </div>
        
        <Button 
          onClick={handleSaveAll} 
          className={`relative overflow-hidden ${isSaved ? 'bg-green-600 hover:bg-green-700' : 'bg-ignite hover:bg-ignite-700'}`}
          disabled={isLoading}
        >
          {isSaved ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Kaydedildi
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Kaydediliyor...' : 'Tüm Değişiklikleri Kaydet'}
            </>
          )}
        </Button>
      </div>

      <Card className="bg-dark-500 border-dark-400 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-ignite/5 via-transparent to-transparent opacity-40 z-0" />
        <CardHeader className="relative z-10">
          <CardTitle>Sayfa ve Breadcrumb Ayarları</CardTitle>
          <CardDescription>
            Sayfaların breadcrumb'larda nasıl göründüğünü ayarlayın
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-dark-600 mb-6">
              <TabsTrigger value="pages" className="data-[state=active]:bg-ignite data-[state=active]:text-white">Sayfalar</TabsTrigger>
              <TabsTrigger value="preview" className="data-[state=active]:bg-ignite data-[state=active]:text-white">Önizleme</TabsTrigger>
            </TabsList>

            <TabsContent value="pages" className="space-y-6 mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Menu className="h-5 w-5 mr-2 text-ignite" />
                  Sayfa Listesi
                </h3>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-ignite hover:bg-ignite-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Sayfa Ekle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-dark-600 border-dark-400">
                    <DialogHeader>
                      <DialogTitle>Yeni Sayfa Ekle</DialogTitle>
                      <DialogDescription>
                        Yeni bir sayfa ve breadcrumb bilgisini ekleyin
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-sm text-right">Sayfa Başlığı</label>
                        <Input 
                          value={newPage.title}
                          onChange={(e) => setNewPage({...newPage, title: e.target.value})}
                          placeholder="Örn: Hakkımızda"
                          className="col-span-3 bg-dark-500 border-dark-300"
                        />
                      </div>
                      
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-sm text-right">Sayfa Yolu</label>
                        <Input 
                          value={newPage.path}
                          onChange={(e) => setNewPage({...newPage, path: e.target.value})}
                          placeholder="Örn: /about"
                          className="col-span-3 bg-dark-500 border-dark-300"
                        />
                      </div>
                      
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-sm text-right">Üst Sayfa</label>
                        <select
                          value={newPage.parentPath}
                          onChange={(e) => setNewPage({...newPage, parentPath: e.target.value})}
                          className="col-span-3 bg-dark-500 border-dark-300 rounded-md p-2"
                        >
                          <option value="/">Ana Sayfa</option>
                          {breadcrumbPages.map((page) => (
                            <option key={page.id} value={page.path}>{page.title}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-sm text-right">Breadcrumb'da Göster</label>
                        <div className="col-span-3 flex items-center">
                          <Switch 
                            checked={newPage.showInBreadcrumb}
                            onCheckedChange={(checked) => setNewPage({...newPage, showInBreadcrumb: checked})}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>İptal</Button>
                      <Button className="bg-ignite hover:bg-ignite-700" onClick={handleAddPage}>Ekle</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Yol</TableHead>
                    <TableHead>Breadcrumb Yolu</TableHead>
                    <TableHead>Görünür</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {breadcrumbPages.map((page) => (
                    <TableRow key={page.id} className={editMode.isActive && editMode.pageId === page.id ? 'bg-dark-400/30' : ''}>
                      {editMode.isActive && editMode.pageId === page.id ? (
                        <>
                          <TableCell>
                            <Input 
                              value={editedPage.title}
                              onChange={(e) => setEditedPage({...editedPage, title: e.target.value})}
                              className="bg-dark-400 border-dark-300"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              value={editedPage.path}
                              onChange={(e) => setEditedPage({...editedPage, path: e.target.value})}
                              className="bg-dark-400 border-dark-300"
                            />
                          </TableCell>
                          <TableCell>
                            <select
                              value={editedPage.parentPath}
                              onChange={(e) => setEditedPage({...editedPage, parentPath: e.target.value})}
                              className="bg-dark-400 border-dark-300 rounded-md p-2 w-full"
                            >
                              <option value="/">Ana Sayfa</option>
                              {getAvailableParentPaths().map((p) => (
                                <option key={p.id} value={p.path}>{p.title}</option>
                              ))}
                            </select>
                          </TableCell>
                          <TableCell>
                            <Switch 
                              checked={editedPage.showInBreadcrumb}
                              onCheckedChange={(checked) => setEditedPage({...editedPage, showInBreadcrumb: checked})}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={handleSaveEdit}>
                              <Check className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{page.title}</TableCell>
                          <TableCell>{page.path}</TableCell>
                          <TableCell>{renderPagePath(page)}</TableCell>
                          <TableCell>{page.showInBreadcrumb ? 'Evet' : 'Hayır'}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleEditPage(page)}>
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleRemovePage(page.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="preview" className="space-y-6 mt-4">
              <Card className="bg-dark-600/50 rounded-lg p-4 border border-dark-400">
                <h3 className="text-lg font-medium mb-4">Breadcrumb Önizleme</h3>
                
                <div className="bg-dark-700 p-4 rounded-md mb-4">
                  <h4 className="text-sm text-white/60 mb-2">Ana Sayfa</h4>
                  <div className="flex items-center text-sm">
                    <span className="text-ignite">Ana Sayfa</span>
                  </div>
                </div>
                
                {breadcrumbPages
                  .filter(page => page.path !== '/')
                  .map((page) => (
                    <div key={page.id} className="bg-dark-700 p-4 rounded-md mb-4">
                      <h4 className="text-sm text-white/60 mb-2">{page.title}</h4>
                      <div className="flex items-center text-sm">
                        <span className="text-white/60">Ana Sayfa</span>
                        <ChevronRight className="h-3 w-3 mx-2 text-white/40" />
                        <span className="text-ignite">{page.title}</span>
                      </div>
                    </div>
                  ))}
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BreadcrumbManager;
