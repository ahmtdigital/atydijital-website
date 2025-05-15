
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, Tag } from 'lucide-react';
import { useDataService } from '@/lib/db';

// Define BlogPost interface to match the admin component's structure
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

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  
  // Get blog posts from the data service
  const { items: blogPosts } = useDataService<BlogPost>('blogPosts', []);
  
  // Extract unique categories for filtering
  const categories = ['All', ...Array.from(new Set(blogPosts.filter(post => post.status === 'published').map(post => post.category)))].filter(Boolean);

  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'Blog | ATY Dijital';
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ATY Dijital blog yazılarını keşfedin. SEO, dijital pazarlama, içerik stratejileri ve daha fazlası hakkında bilgi edinin.');
    }
    
    // Filter posts based on category, search term, and status
    let results = blogPosts.filter(post => post.status === 'published');
    
    if (activeCategory !== 'All') {
      results = results.filter(post => post.category === activeCategory);
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchLower) || 
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.category.toLowerCase().includes(searchLower) ||
        post.author.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredPosts(results);
  }, [activeCategory, searchTerm, blogPosts]);

  // Format date string for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-24 bg-dark-600 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ignite-500 to-ignite"></div>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-ignite font-semibold mb-4 animate-fade-in">BİLGİ VE TREND</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in text-white" style={{animationDelay: '0.2s'}}>
            Blog
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
            Ekibimizin dijital pazarlama trendleri, stratejileri ve öngörüleriyle ilgili en son bilgileri keşfedin.
          </p>
        </div>
      </section>

      {/* Blog Filter and Search */}
      <section className="py-12 bg-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={
                    activeCategory === category 
                      ? "bg-ignite hover:bg-ignite-700 text-white" 
                      : "border-dark-300 text-gray-300 hover:border-ignite hover:text-ignite"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="w-full md:w-auto min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <Input
                  placeholder="Yazı ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-dark-500 border-dark-400 pl-10 focus:border-ignite text-white"
                />
              </div>
            </div>
          </div>
          
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Link 
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-dark-500 rounded-xl overflow-hidden border border-dark-400 group hover:border-ignite/50 transition-all duration-300 card-hover reveal"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image || 'https://via.placeholder.com/800x500?text=No+Image'} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x500?text=No+Image'
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-ignite text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-ignite transition-colors text-white">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <span className="text-ignite font-medium">Devamını Oku →</span>
                </div>
              </Link>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">Herhangi bir yazı bulunamadı. Farklı bir arama veya kategori deneyin.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-dark-600">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-gradient-to-r from-dark-500 to-dark-400 rounded-2xl p-8 md:p-12 shadow-lg border border-dark-300 reveal">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Bültenimize Abone Olun</h2>
              <p className="text-gray-300 mb-8">
                En son dijital pazarlama bilgilerini, ipuçlarını ve trendleri doğrudan gelen kutunuza alın.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="E-posta adresiniz"
                  type="email"
                  className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                />
                <Button className="bg-ignite hover:bg-ignite-700 text-white">
                  Abone Ol
                </Button>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                Gizliliğinize saygı duyuyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
