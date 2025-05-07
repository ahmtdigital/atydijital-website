
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { 
  FileText, Plus, Edit, Trash, Search, Calendar, User, Tag, 
  EyeOff, Eye, Save, X, ExternalLink, Image, Link, Globe 
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  image: string;
  status: 'published' | 'draft';
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
    twitterCard: string;
  };
}

const defaultBlogPost: BlogPost = {
  id: '',
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: '',
  tags: [],
  author: '',
  date: new Date().toISOString().split('T')[0],
  image: '',
  status: 'draft',
  seo: {
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogImage: '',
    twitterCard: 'summary_large_image'
  }
};

const BlogManagerEnhanced = () => {
  const { toast } = useToast();
  const { items: blogPosts, add: addBlogPost, update: updateBlogPost, remove: removeBlogPost } = useDataService<BlogPost>('blogPosts', [
    {
      id: '1',
      title: 'How to Create an Effective SEO Strategy in 2023',
      slug: 'effective-seo-strategy-2023',
      excerpt: 'Learn the latest SEO techniques to improve your rankings and drive more organic traffic to your website.',
      content: `<h2>Introduction</h2><p>Search Engine Optimization (SEO) is constantly evolving, and staying updated with the latest trends is crucial for your digital marketing success. In this article, we'll explore the most effective SEO strategies for 2023 that will help improve your website's ranking and drive more organic traffic.</p><h2>Key SEO Strategies for 2023</h2><ol><li><strong>Focus on User Experience</strong>: Google's algorithms now prioritize websites that offer excellent user experiences. This includes factors like page load speed, mobile-friendliness, and intuitive navigation.</li><li><strong>Create High-Quality Content</strong>: Content remains king in SEO. Create comprehensive, original, and valuable content that addresses your audience's needs and questions.</li><li><strong>Optimize for Voice Search</strong>: With the increasing use of voice assistants, optimizing for voice search has become essential. Focus on conversational keywords and question-based queries.</li><li><strong>Leverage AI and Machine Learning</strong>: Utilize AI tools to analyze data, identify trends, and optimize your content accordingly.</li><li><strong>Implement Schema Markup</strong>: Schema markup helps search engines understand your content better, potentially improving your visibility in search results.</li></ol><h2>Conclusion</h2><p>Implementing these SEO strategies can significantly improve your website's ranking in 2023. Remember, SEO is a long-term investment, and consistency is key to achieving sustainable results.</p>`,
      category: 'SEO',
      tags: ['SEO', 'Digital Marketing', 'Content Marketing'],
      author: 'Alex Johnson',
      date: '2023-06-15',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
      status: 'published',
      seo: {
        metaTitle: 'Effective SEO Strategy for 2023 - Complete Guide',
        metaDescription: 'Discover the most effective SEO strategies for 2023 to boost your website rankings and increase organic traffic with our comprehensive guide.',
        keywords: 'SEO strategy, SEO 2023, search engine optimization, digital marketing, SEO techniques',
        ogImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=630&q=80',
        twitterCard: 'summary_large_image'
      }
    },
    {
      id: '2',
      title: "Social Media Trends You Can't Ignore This Year",
      slug: 'social-media-trends',
      excerpt: 'Stay ahead of the curve with these emerging social media trends that are reshaping digital marketing.',
      content: `<h2>Introduction to Social Media Trends</h2><p>Social media platforms continue to evolve rapidly, introducing new features and capabilities that create new opportunities for marketers. Staying updated with the latest trends is crucial for maintaining an effective social media strategy.</p><h2>Top Social Media Trends</h2><ol><li><strong>Short-form Video Content</strong>: Platforms like TikTok and Instagram Reels have popularized short-form videos, making them a must-have in your content strategy.</li><li><strong>Social Commerce</strong>: The integration of shopping features within social media platforms is transforming how consumers discover and purchase products online.</li><li><strong>Augmented Reality</strong>: AR filters and effects are becoming more sophisticated, offering brands creative ways to engage with their audience.</li><li><strong>Influencer Marketing</strong>: Collaborating with influencers remains effective, with a shift toward micro and nano influencers who offer higher engagement rates.</li><li><strong>Social Responsibility</strong>: Consumers expect brands to take stands on social and environmental issues, making purpose-driven marketing essential.</li></ol><h2>How to Adapt</h2><p>To leverage these trends effectively, start by evaluating your current social media strategy. Identify areas for improvement and allocate resources accordingly. Remember, it's better to excel on a few platforms than to spread yourself too thin.</p>`,
      category: 'Social Media',
      tags: ['Social Media', 'Digital Marketing', 'Trends'],
      author: 'Sarah Chen',
      date: '2023-05-22',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
      status: 'published',
      seo: {
        metaTitle: 'Essential Social Media Trends for Marketers in 2023',
        metaDescription: 'Discover the must-know social media trends that are reshaping digital marketing in 2023 and learn how to leverage them for your brand.',
        keywords: 'social media trends, digital marketing, social commerce, influencer marketing, short-form videos',
        ogImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=630&q=80',
        twitterCard: 'summary_large_image'
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost>({...defaultBlogPost});
  const [isEditing, setIsEditing] = useState(false);
  const [currentTab, setCurrentTab] = useState('content');
  const [newTag, setNewTag] = useState('');

  // Get all unique categories
  const categories = ['all', ...new Set(blogPosts.map(post => post.category))].filter(Boolean);

  // Filter posts based on search term, category and status
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Generate a slug from the title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };

  // Handle title change and update slug
  const handleTitleChange = (value: string) => {
    setCurrentPost({
      ...currentPost,
      title: value,
      slug: generateSlug(value),
      seo: {
        ...currentPost.seo,
        metaTitle: value // Also update the SEO title
      }
    });
  };

  // Handle input change
  const handleInputChange = (field: keyof BlogPost, value: any) => {
    setCurrentPost({
      ...currentPost,
      [field]: value
    });
  };

  // Handle SEO input change
  const handleSeoChange = (field: keyof BlogPost['seo'], value: string) => {
    setCurrentPost({
      ...currentPost,
      seo: {
        ...currentPost.seo,
        [field]: value
      }
    });
  };

  // Add a new tag
  const handleAddTag = () => {
    if (newTag && !currentPost.tags.includes(newTag)) {
      setCurrentPost({
        ...currentPost,
        tags: [...currentPost.tags, newTag]
      });
      setNewTag('');
    }
  };

  // Remove a tag
  const handleRemoveTag = (tag: string) => {
    setCurrentPost({
      ...currentPost,
      tags: currentPost.tags.filter(t => t !== tag)
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Ensure we have required fields
      if (!currentPost.title || !currentPost.content) {
        toast({
          title: "Eksik Bilgi",
          description: "Lütfen başlık ve içerik alanlarını doldurun.",
          variant: "destructive"
        });
        return;
      }

      // If editing an existing post
      if (isEditing) {
        await updateBlogPost(currentPost.id, currentPost);
        toast({
          title: "Başarılı",
          description: "Blog yazısı güncellendi."
        });
      } else {
        // If creating a new post
        const newPost = {
          ...currentPost,
          id: Date.now().toString(),
          date: currentPost.date || new Date().toISOString().split('T')[0]
        };
        await addBlogPost(newPost);
        toast({
          title: "Başarılı",
          description: "Yeni blog yazısı eklendi."
        });
      }
      
      setPostDialogOpen(false);
      setCurrentPost({...defaultBlogPost});
      setIsEditing(false);
      setCurrentTab('content');
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem sırasında bir hata oluştu.",
        variant: "destructive"
      });
      console.error("Error saving blog post:", error);
    }
  };

  // Handle post editing
  const handleEditPost = (post: BlogPost) => {
    setCurrentPost({...post});
    setIsEditing(true);
    setPostDialogOpen(true);
    setCurrentTab('content');
  };

  // Handle post deletion
  const handleDeletePost = async (id: string) => {
    try {
      await removeBlogPost(id);
      toast({
        title: "Başarılı",
        description: "Blog yazısı silindi."
      });
      setDeleteConfirmOpen(false);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Silme işlemi sırasında bir hata oluştu.",
        variant: "destructive"
      });
      console.error("Error deleting blog post:", error);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle new post creation
  const handleNewPost = () => {
    setCurrentPost({
      ...defaultBlogPost,
      date: new Date().toISOString().split('T')[0]
    });
    setIsEditing(false);
    setPostDialogOpen(true);
    setCurrentTab('content');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <FileText className="mr-2 h-6 w-6 text-ignite" />
            Blog Yönetimi
          </h1>
          <p className="text-white/70 mt-1">
            Blog yazılarını ekle, düzenle ve yönet. SEO ayarlarını optimize et.
          </p>
        </div>
        <Button
          onClick={handleNewPost}
          className="bg-ignite hover:bg-ignite-700 shrink-0"
        >
          <Plus className="mr-2 h-4 w-4" /> Yeni Blog Yazısı
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white">Blog Yazılarını Filtrele</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Blog yazısı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-dark-400 border-dark-300 pl-10 text-white"
              />
            </div>
            <Select
              value={filterCategory}
              onValueChange={(value) => setFilterCategory(value)}
            >
              <SelectTrigger className="w-full bg-dark-400 border-dark-300 text-white">
                <SelectValue placeholder="Kategori Seçin" />
              </SelectTrigger>
              <SelectContent className="bg-dark-600 border-dark-300 text-white">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-white hover:bg-dark-500">
                    {category === 'all' ? 'Tüm Kategoriler' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filterStatus}
              onValueChange={(value) => setFilterStatus(value)}
            >
              <SelectTrigger className="w-full bg-dark-400 border-dark-300 text-white">
                <SelectValue placeholder="Durum Seçin" />
              </SelectTrigger>
              <SelectContent className="bg-dark-600 border-dark-300 text-white">
                <SelectItem value="all" className="text-white hover:bg-dark-500">Tüm Durumlar</SelectItem>
                <SelectItem value="published" className="text-white hover:bg-dark-500">Yayınlanmış</SelectItem>
                <SelectItem value="draft" className="text-white hover:bg-dark-500">Taslak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts List */}
      <Card className="bg-dark-500 border-dark-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white">Blog Yazıları ({filteredPosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-dark-600 border-dark-400 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/4 h-48 md:h-auto">
                        <div className="h-full relative">
                          <img
                            src={post.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              post.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {post.status === 'published' ? 'Yayında' : 'Taslak'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-3/4 p-4">
                        <div className="mb-2 flex items-center text-sm text-white/60">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="mr-4">{formatDate(post.date)}</span>
                          <User className="h-4 w-4 mr-1" />
                          <span className="mr-4">{post.author}</span>
                          <Tag className="h-4 w-4 mr-1" />
                          <span>{post.category}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">{post.title}</h3>
                        <p className="text-white/70 mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="px-2 py-1 bg-ignite/20 text-ignite rounded-md text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPost(post)}
                            className="border-dark-300 text-white hover:bg-dark-400"
                          >
                            <Edit className="h-4 w-4 mr-1" /> Düzenle
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-dark-300 text-white hover:bg-dark-400"
                            onClick={() => {
                              setCurrentPost(post);
                              setDeleteConfirmOpen(true);
                            }}
                          >
                            <Trash className="h-4 w-4 mr-1" /> Sil
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-dark-300 text-white hover:bg-dark-400"
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" /> Önizle
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-white/60">Hiç blog yazısı bulunamadı. Yeni bir yazı eklemek için "Yeni Blog Yazısı" butonuna tıklayın.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Blog Post Dialog */}
      <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
        <DialogContent className="bg-dark-500 border-dark-400 max-w-4xl text-white p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl text-white">
              {isEditing ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Tüm blog bilgilerini doldurun ve SEO ayarlarını optimize edin.
            </DialogDescription>
          </DialogHeader>

          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <div className="px-6 overflow-x-auto">
              <TabsList className="bg-dark-600 w-full grid grid-cols-4">
                <TabsTrigger value="content" className="text-white">İçerik</TabsTrigger>
                <TabsTrigger value="metadata" className="text-white">Meta Bilgileri</TabsTrigger>
                <TabsTrigger value="seo" className="text-white">SEO Ayarları</TabsTrigger>
                <TabsTrigger value="preview" className="text-white">Önizleme</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="px-6 pt-4 pb-6">
              {/* Content Tab */}
              <TabsContent value="content" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Başlık*</label>
                  <Input
                    placeholder="Blog yazısı başlığı"
                    value={currentPost.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">URL Slug*</label>
                  <Input
                    placeholder="blog-yazisiniz-url-slug"
                    value={currentPost.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Özet</label>
                  <Textarea
                    placeholder="Blog yazısının kısa özeti (160-170 karakter önerilir)"
                    value={currentPost.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    className="bg-dark-400 border-dark-300 text-white min-h-[80px]"
                    maxLength={170}
                  />
                  <div className="text-right text-xs text-white/60">
                    {currentPost.excerpt.length}/170
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">İçerik*</label>
                  <Textarea
                    placeholder="Blog içeriği (HTML desteklenir)"
                    value={currentPost.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    className="bg-dark-400 border-dark-300 text-white min-h-[300px]"
                  />
                </div>
              </TabsContent>

              {/* Metadata Tab */}
              <TabsContent value="metadata" className="space-y-4 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Kategori*</label>
                    <Input
                      placeholder="Blog yazısı kategorisi"
                      value={currentPost.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="bg-dark-400 border-dark-300 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Yazar</label>
                    <Input
                      placeholder="Yazarın adı"
                      value={currentPost.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      className="bg-dark-400 border-dark-300 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Yayın Tarihi</label>
                    <Input
                      type="date"
                      value={currentPost.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="bg-dark-400 border-dark-300 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Durum</label>
                    <Select
                      value={currentPost.status}
                      onValueChange={(value: 'published' | 'draft') => handleInputChange('status', value)}
                    >
                      <SelectTrigger className="w-full bg-dark-400 border-dark-300 text-white">
                        <SelectValue placeholder="Durum Seçin" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-600 border-dark-300 text-white">
                        <SelectItem value="published" className="text-white hover:bg-dark-500">Yayınlanmış</SelectItem>
                        <SelectItem value="draft" className="text-white hover:bg-dark-500">Taslak</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Kapak Görseli URL</label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={currentPost.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                  {currentPost.image && (
                    <div className="mt-2 h-40 w-full rounded overflow-hidden">
                      <img
                        src={currentPost.image}
                        alt="Kapak Görseli"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Görsel+Yüklenemedi';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Etiketler</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Yeni etiket ekle"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="bg-dark-400 border-dark-300 text-white flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                    <Button
                      onClick={handleAddTag}
                      className="bg-ignite hover:bg-ignite-700"
                      type="button"
                      disabled={!newTag}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-ignite/20 text-ignite rounded-md text-sm flex items-center"
                      >
                        {tag}
                        <button 
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-ignite/70 hover:text-ignite"
                          type="button"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* SEO Tab */}
              <TabsContent value="seo" className="space-y-4 mt-0">
                <div className="p-4 bg-dark-600 rounded-md mb-4">
                  <h3 className="text-sm font-medium mb-2 flex items-center text-white">
                    <Globe className="h-4 w-4 mr-2 text-ignite" /> SEO Optimizasyon
                  </h3>
                  <p className="text-xs text-white/70">
                    Arama motorlarında daha iyi sıralamalar elde etmek için aşağıdaki SEO ayarlarını optimize edin.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex justify-between text-white">
                    <span>Meta Başlık</span>
                    <span className="text-xs text-white/60">{currentPost.seo.metaTitle.length}/60</span>
                  </label>
                  <Input
                    placeholder="SEO için optimize edilmiş başlık"
                    value={currentPost.seo.metaTitle}
                    onChange={(e) => handleSeoChange('metaTitle', e.target.value)}
                    className="bg-dark-400 border-dark-300 text-white"
                    maxLength={60}
                  />
                  <p className="text-xs text-white/60">
                    Meta başlık, arama sonuçlarında görünen başlıktır. 60 karakterden kısa olması önerilir.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex justify-between text-white">
                    <span>Meta Açıklama</span>
                    <span className="text-xs text-white/60">{currentPost.seo.metaDescription.length}/160</span>
                  </label>
                  <Textarea
                    placeholder="SEO için optimize edilmiş açıklama"
                    value={currentPost.seo.metaDescription}
                    onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
                    className="bg-dark-400 border-dark-300 text-white h-20"
                    maxLength={160}
                  />
                  <p className="text-xs text-white/60">
                    Meta açıklama, arama sonuçlarında başlığın altında görünür. 160 karakterden kısa olması önerilir.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Anahtar Kelimeler</label>
                  <Input
                    placeholder="anahtar kelime1, anahtar kelime2, anahtar kelime3"
                    value={currentPost.seo.keywords}
                    onChange={(e) => handleSeoChange('keywords', e.target.value)}
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                  <p className="text-xs text-white/60">
                    Virgülle ayrılmış anahtar kelimeler. 5-10 anahtar kelime kullanmak önerilir.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Sosyal Medya (OG) Görseli</label>
                  <Input
                    placeholder="https://example.com/og-image.jpg"
                    value={currentPost.seo.ogImage}
                    onChange={(e) => handleSeoChange('ogImage', e.target.value)}
                    className="bg-dark-400 border-dark-300 text-white"
                  />
                  <p className="text-xs text-white/60">
                    Sosyal medyada paylaşıldığında görünecek görsel. İdeal boyut: 1200x630 piksel.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Twitter Kart Tipi</label>
                  <Select
                    value={currentPost.seo.twitterCard}
                    onValueChange={(value) => handleSeoChange('twitterCard', value)}
                  >
                    <SelectTrigger className="w-full bg-dark-400 border-dark-300 text-white">
                      <SelectValue placeholder="Twitter Kart Tipi Seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-600 border-dark-300 text-white">
                      <SelectItem value="summary" className="text-white hover:bg-dark-500">Summary</SelectItem>
                      <SelectItem value="summary_large_image" className="text-white hover:bg-dark-500">Summary Large Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              {/* Preview Tab */}
              <TabsContent value="preview" className="mt-0">
                <div className="bg-white text-black overflow-hidden rounded-md">
                  <div className="p-4 bg-gray-100 border-b border-gray-300">
                    <h3 className="text-lg font-semibold text-gray-800">Arama Motoru Önizlemesi</h3>
                    <p className="text-xs text-gray-600">Google'da nasıl görüneceğini önizleyin</p>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 text-blue-600 text-xl hover:underline cursor-pointer truncate">
                      {currentPost.seo.metaTitle || currentPost.title}
                    </div>
                    <div className="text-green-600 text-sm truncate">
                      www.yourdomain.com/blog/{currentPost.slug}
                    </div>
                    <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {currentPost.seo.metaDescription || currentPost.excerpt}
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-white text-black overflow-hidden rounded-md">
                  <div className="p-4 bg-blue-100 border-b border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-800">Facebook Önizlemesi</h3>
                    <p className="text-xs text-blue-600">Facebook'ta paylaşıldığında nasıl görüneceğini önizleyin</p>
                  </div>
                  <div className="p-4">
                    <div className="border border-gray-300 rounded-md overflow-hidden">
                      <div className="h-40 bg-gray-200 relative">
                        {(currentPost.seo.ogImage || currentPost.image) ? (
                          <img
                            src={currentPost.seo.ogImage || currentPost.image}
                            alt="OG Önizlemesi"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            <Image className="h-10 w-10" />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="text-gray-500 text-xs">yourdomain.com</div>
                        <div className="text-gray-900 font-medium mt-1">
                          {currentPost.seo.metaTitle || currentPost.title}
                        </div>
                        <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {currentPost.seo.metaDescription || currentPost.excerpt}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-dark-600 text-white p-4 rounded-md text-sm">
                  <h3 className="font-medium mb-2">SEO İpuçları:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-white/70">
                    <li>Başlıkta ve ilk paragrafta anahtar kelimeleri kullanın.</li>
                    <li>Alt başlıkları (H2, H3) anahtar kelimelerle optimize edin.</li>
                    <li>İlgili içeriklere iç bağlantılar ekleyin.</li>
                    <li>Görsellerinize açıklayıcı "alt" metinleri ekleyin.</li>
                    <li>İçeriğinizde doğal akışı bozmadan anahtar kelimeleri kullanın.</li>
                  </ul>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <DialogFooter className="bg-dark-600 p-4 border-t border-dark-400">
            <div className="flex justify-between w-full">
              <Button
                variant="outline"
                onClick={() => setPostDialogOpen(false)}
                className="border-dark-300 text-white"
              >
                <X className="mr-2 h-4 w-4" /> İptal
              </Button>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleInputChange('status', 'draft')}
                  className="border-dark-300 text-white"
                >
                  <EyeOff className="mr-2 h-4 w-4" /> Taslak Olarak Kaydet
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-ignite hover:bg-ignite-700"
                >
                  <Save className="mr-2 h-4 w-4" /> {isEditing ? 'Güncelle' : 'Yayınla'}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="bg-dark-500 border-dark-400 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Blog Yazısını Sil</DialogTitle>
            <DialogDescription className="text-white">
              Bu blog yazısını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-dark-600 p-3 rounded-md my-4">
            <h3 className="font-medium text-white">{currentPost.title}</h3>
            <p className="text-sm text-white/70 mt-1">{formatDate(currentPost.date)} - {currentPost.author}</p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
              className="border-dark-300 text-white"
            >
              İptal
            </Button>
            <Button
              onClick={() => handleDeletePost(currentPost.id)}
              className="bg-red-500 hover:bg-red-600"
            >
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManagerEnhanced;
