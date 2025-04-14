
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Plus, Edit, Trash2, Image, Save, X, Calendar, Clock, Tag, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  publishDate: string;
  featured: boolean;
  metaTitle: string;
  metaDescription: string;
  readTime: number;
}

const defaultBlogPost: Omit<BlogPost, 'id'> = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '/placeholder.svg',
  author: 'Admin',
  category: 'pazarlama',
  tags: [],
  publishDate: format(new Date(), 'yyyy-MM-dd'),
  featured: false,
  metaTitle: '',
  metaDescription: '',
  readTime: 3
};

const categories = [
  { value: 'pazarlama', label: 'Dijital Pazarlama' },
  { value: 'tasarim', label: 'Web Tasarım' },
  { value: 'sosyal-medya', label: 'Sosyal Medya' },
  { value: 'seo', label: 'SEO' },
  { value: 'teknoloji', label: 'Teknoloji Trendleri' }
];

const BlogManager = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>(defaultBlogPost);
  const [isEditing, setIsEditing] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const { toast } = useToast();
  
  const {
    items: blogPosts,
    add: addBlogPost,
    update: updateBlogPost,
    remove: removeBlogPost,
    isLoading
  } = useDataService<BlogPost>('blog-posts', [
    {
      id: 1,
      title: 'Dijital Pazarlamada Son Trendler',
      slug: 'dijital-pazarlamada-son-trendler',
      excerpt: '2023 yılında dijital pazarlama stratejilerinizi geliştirecek en yeni trendler',
      content: '<p>Dijital pazarlama dünyası sürekli olarak gelişmekte ve değişmektedir. Bu yazıda, 2023 yılının öne çıkan dijital pazarlama trendlerini inceliyoruz.</p>',
      image: '/placeholder.svg',
      author: 'Ali Yılmaz',
      category: 'pazarlama',
      tags: ['dijital pazarlama', 'trendler', 'e-ticaret'],
      publishDate: '2023-08-15',
      featured: true,
      metaTitle: 'Dijital Pazarlamada Son Trendler (2023) | Ignite Blog',
      metaDescription: '2023 yılında dijital pazarlama stratejilerinizi geliştirecek en yeni trendleri keşfedin.',
      readTime: 5
    },
    {
      id: 2,
      title: 'SEO Stratejinizi Nasıl Geliştirebilirsiniz?',
      slug: 'seo-stratejinizi-nasil-gelistirebilirsiniz',
      excerpt: 'Arama motorlarında üst sıralarda yer almanızı sağlayacak güncel SEO teknikleri',
      content: '<p>SEO, dijital varlığınızı geliştirmek için kritik öneme sahiptir. Bu makalede, SEO stratejinizi nasıl geliştirebileceğinizi adım adım anlatıyoruz.</p>',
      image: '/placeholder.svg',
      author: 'Ayşe Demir',
      category: 'seo',
      tags: ['seo', 'arama motoru optimizasyonu', 'içerik pazarlama'],
      publishDate: '2023-09-20',
      featured: true,
      metaTitle: 'SEO Stratejinizi Nasıl Geliştirebilirsiniz? | Ignite Blog',
      metaDescription: 'Arama motorlarında üst sıralarda yer almanızı sağlayacak güncel SEO tekniklerini öğrenin.',
      readTime: 7
    }
  ]);

  const handleOpenDialog = (post?: BlogPost) => {
    if (post) {
      setCurrentPost(post);
      setIsEditing(true);
    } else {
      setCurrentPost(defaultBlogPost);
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPost(defaultBlogPost);
    setIsEditing(false);
    setTagInput('');
  };

  const handleSavePost = () => {
    try {
      if (isEditing && currentPost.id) {
        updateBlogPost(currentPost.id, currentPost as BlogPost);
        toast({
          title: "Başarılı",
          description: "Blog yazısı güncellendi.",
        });
      } else {
        addBlogPost(currentPost as Omit<BlogPost, 'id'>);
        toast({
          title: "Başarılı",
          description: "Yeni blog yazısı eklendi.",
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

  const handleDeletePost = (id: number) => {
    if (confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) {
      removeBlogPost(id);
      toast({
        title: "Başarılı",
        description: "Blog yazısı silindi.",
      });
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !currentPost.tags?.includes(tagInput.trim())) {
      setCurrentPost({
        ...currentPost,
        tags: [...(currentPost.tags || []), tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setCurrentPost({
      ...currentPost,
      tags: currentPost.tags?.filter(t => t !== tag) || []
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy');
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
            <PenTool className="mr-2 h-6 w-6 text-ignite" />
            Blog Yazılarını Yönet
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Blog bölümünde yayınlanacak yazıları buradan düzenleyebilirsiniz
          </p>
        </div>
        <Button 
          onClick={() => handleOpenDialog()} 
          className="bg-ignite hover:bg-ignite-700"
        >
          <Plus className="h-4 w-4 mr-2" /> Yeni Blog Yazısı Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {blogPosts.map((post) => (
          <Card key={post.id} className="bg-dark-500 border-dark-400 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4 bg-dark-600 p-4 flex items-center justify-center h-48 md:h-auto">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image className="h-16 w-16 text-white/20" />
                  {post.featured && (
                    <Badge className="absolute top-0 right-0 bg-ignite text-white">
                      Öne Çıkan
                    </Badge>
                  )}
                </div>
              </div>
              <div className="w-full md:w-3/4 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{post.title}</h3>
                    <div className="flex flex-wrap items-center mt-1 gap-3 text-sm text-white/60">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" /> {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> {formatDate(post.publishDate)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {post.readTime} dk okuma
                      </div>
                      <Badge className="bg-dark-400 text-white/70">
                        {categories.find(c => c.value === post.category)?.label || post.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/70 mt-2">{post.excerpt}</p>
                    <div className="flex flex-wrap mt-3 gap-1">
                      {post.tags.map((tag, index) => (
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
                      onClick={() => handleOpenDialog(post)}
                    >
                      <Edit className="h-4 w-4 text-blue-400" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-dark-400"
                      onClick={() => handleDeletePost(post.id)}
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
        <DialogContent className="bg-dark-500 border-dark-400 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı Ekle'}</DialogTitle>
            <DialogDescription>
              Blog yazısı bilgilerini aşağıdaki formdan düzenleyebilirsiniz.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Başlık</label>
              <Input 
                value={currentPost.title} 
                onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                className="bg-dark-400 border-dark-300"
                placeholder="Blog yazısı başlığı"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">URL (Slug)</label>
              <div className="flex items-center">
                <span className="bg-dark-600 border border-dark-300 border-r-0 rounded-l-md px-3 py-2 text-white/60">/blog/</span>
                <Input 
                  value={currentPost.slug} 
                  onChange={(e) => setCurrentPost({...currentPost, slug: e.target.value})}
                  className="bg-dark-400 border-dark-300 rounded-l-none"
                  placeholder="blog-yazisi-slug"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Yazar</label>
              <Input 
                value={currentPost.author} 
                onChange={(e) => setCurrentPost({...currentPost, author: e.target.value})}
                className="bg-dark-400 border-dark-300"
                placeholder="Yazar adı"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori</label>
              <Select 
                value={currentPost.category}
                onValueChange={(value) => setCurrentPost({...currentPost, category: value})}
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
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Yayın Tarihi</label>
              <Input 
                type="date"
                value={currentPost.publishDate} 
                onChange={(e) => setCurrentPost({...currentPost, publishDate: e.target.value})}
                className="bg-dark-400 border-dark-300"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Okuma Süresi (dk)</label>
              <Input 
                type="number"
                min="1"
                value={currentPost.readTime} 
                onChange={(e) => setCurrentPost({...currentPost, readTime: parseInt(e.target.value) || 1})}
                className="bg-dark-400 border-dark-300"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Özet</label>
              <Textarea 
                value={currentPost.excerpt} 
                onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                className="bg-dark-400 border-dark-300 resize-none"
                placeholder="Blog yazısının kısa özeti"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Öne Çıkan</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  checked={currentPost.featured}
                  onChange={(e) => setCurrentPost({...currentPost, featured: e.target.checked})}
                  className="w-4 h-4 accent-ignite"
                />
                <span className="text-sm text-white/70">Blog ana sayfasında öne çıkar</span>
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Etiketler</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {currentPost.tags?.map((tag, index) => (
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
                value={currentPost.content} 
                onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                className="bg-dark-400 border-dark-300 resize-none"
                placeholder="Blog yazısının içeriği. HTML içerebilir."
                rows={10}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Başlık (SEO)</label>
              <Input 
                value={currentPost.metaTitle} 
                onChange={(e) => setCurrentPost({...currentPost, metaTitle: e.target.value})}
                className="bg-dark-400 border-dark-300"
                placeholder="SEO için başlık"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Açıklama (SEO)</label>
              <Input 
                value={currentPost.metaDescription} 
                onChange={(e) => setCurrentPost({...currentPost, metaDescription: e.target.value})}
                className="bg-dark-400 border-dark-300"
                placeholder="SEO için açıklama"
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-end gap-2">
            <Button variant="outline" onClick={handleCloseDialog} className="border-dark-300 hover:bg-dark-400">
              <X className="h-4 w-4 mr-2" /> İptal
            </Button>
            <Button onClick={handleSavePost} className="bg-ignite hover:bg-ignite-700">
              <Save className="h-4 w-4 mr-2" /> Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default BlogManager;
