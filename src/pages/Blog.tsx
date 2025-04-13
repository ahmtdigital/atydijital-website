
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, Tag } from 'lucide-react';

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: 'How to Create an Effective SEO Strategy in 2023',
    excerpt: 'Learn the latest SEO techniques to improve your rankings and drive more organic traffic to your website.',
    category: 'SEO',
    author: 'Alex Johnson',
    date: 'June 15, 2023',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    link: '/blog/effective-seo-strategy-2023'
  },
  {
    id: 2,
    title: "Social Media Trends You Can't Ignore This Year",
    excerpt: 'Stay ahead of the curve with these emerging social media trends that are reshaping digital marketing.',
    category: 'Social Media',
    author: 'Sarah Chen',
    date: 'May 22, 2023',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    link: '/blog/social-media-trends'
  },
  {
    id: 3,
    title: 'The Ultimate Guide to Content Marketing for B2B Companies',
    excerpt: 'Discover proven content marketing strategies that generate leads and build authority for B2B businesses.',
    category: 'Content',
    author: 'Emma Wilson',
    date: 'April 10, 2023',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    link: '/blog/b2b-content-marketing-guide'
  },
  {
    id: 4,
    title: 'Mobile-First Indexing: What You Need to Know',
    excerpt: 'Is your website optimized for mobile-first indexing? Learn how to prepare your site for this critical SEO factor.',
    category: 'SEO',
    author: 'Marcus Williams',
    date: 'March 5, 2023',
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    link: '/blog/mobile-first-indexing'
  },
  {
    id: 5,
    title: 'How to Measure ROI on Your Digital Marketing Campaigns',
    excerpt: 'Track the success of your marketing efforts with these essential metrics and reporting strategies.',
    category: 'Analytics',
    author: 'Alex Johnson',
    date: 'February 18, 2023',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    link: '/blog/measuring-digital-marketing-roi'
  },
  {
    id: 6,
    title: 'Building a Winning Email Marketing Strategy',
    excerpt: 'Learn how to create email campaigns that engage subscribers and drive conversions for your business.',
    category: 'Email Marketing',
    author: 'Olivia Rodriguez',
    date: 'January 30, 2023',
    image: 'https://images.unsplash.com/photo-1526307616774-60d0098f7642?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    link: '/blog/email-marketing-strategy'
  }
];

// Categories for filtering
const categories = [
  'All',
  'SEO',
  'Social Media',
  'Content',
  'Analytics',
  'Email Marketing'
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'Blog | Ignite Marketing';
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore digital marketing insights, trends, and strategies on the Ignite Marketing blog. Learn about SEO, social media, content marketing, and more.');
    }
    
    // Filter posts based on category and search term
    let results = blogPosts;
    
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
  }, [activeCategory, searchTerm]);

  return (
    <Layout>
      {/* Header */}
      <section className="py-24 bg-dark-600 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ignite-500 to-ignite"></div>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-ignite font-semibold mb-4 animate-fade-in">INSIGHTS & TRENDS</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Our Blog
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
            Stay updated with the latest digital marketing trends, strategies, and insights from our expert team.
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
                  placeholder="Search articles..."
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
                to={post.link}
                className="bg-dark-500 rounded-xl overflow-hidden border border-dark-400 group hover:border-ignite/50 transition-all duration-300 card-hover reveal"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-ignite transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <span className="text-ignite font-medium">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">No articles found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-dark-600">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-gradient-to-r from-dark-500 to-dark-400 rounded-2xl p-8 md:p-12 shadow-lg border border-dark-300 reveal">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
              <p className="text-gray-300 mb-8">
                Get the latest digital marketing insights, tips, and trends delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Your email address"
                  type="email"
                  className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                />
                <Button className="bg-ignite hover:bg-ignite-700 text-white">
                  Subscribe
                </Button>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
