
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Sample portfolio items
const portfolioItems = [
  {
    id: 1,
    title: 'E-commerce Rebranding Campaign',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    link: '/portfolio/ecommerce-rebranding'
  },
  {
    id: 2,
    title: 'Tech Startup SEO Strategy',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    link: '/portfolio/tech-startup-seo'
  },
  {
    id: 3,
    title: 'Restaurant Social Media Campaign',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1498083882188-ba262fbe1e61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    link: '/portfolio/restaurant-social'
  },
  {
    id: 4,
    title: 'Fitness App Marketing',
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    link: '/portfolio/fitness-app'
  },
  {
    id: 5,
    title: 'Luxury Brand Website Redesign',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    link: '/portfolio/luxury-brand-website'
  },
  {
    id: 6,
    title: 'Healthcare Content Marketing',
    category: 'Content',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    link: '/portfolio/healthcare-content'
  },
  {
    id: 7,
    title: 'Real Estate Video Campaign',
    category: 'Video',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    link: '/portfolio/real-estate-video'
  },
  {
    id: 8,
    title: 'SaaS Lead Generation Strategy',
    category: 'PPC',
    image: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    link: '/portfolio/saas-lead-generation'
  },
  {
    id: 9,
    title: 'Fashion Brand Influencer Campaign',
    category: 'Influencer',
    image: 'https://images.unsplash.com/photo-1583744946564-b52d01c96e70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
    link: '/portfolio/fashion-influencer'
  }
];

// Categories for filtering
const categories = [
  'All',
  'Branding',
  'SEO',
  'Social Media',
  'Mobile',
  'Web Development',
  'Content',
  'Video',
  'PPC',
  'Influencer'
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState(portfolioItems);

  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'Our Portfolio | Ignite Marketing';
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our portfolio of successful digital marketing projects including SEO, social media campaigns, web development, and content creation.');
    }
    
    // Filter items when category changes
    if (activeCategory === 'All') {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <Layout>
      {/* Header */}
      <section className="py-24 bg-dark-600 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ignite to-ignite-500"></div>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-ignite font-semibold mb-4 animate-fade-in">OUR WORK</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Featured Projects
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
            Browse through our portfolio of successful campaigns and projects that have helped our clients achieve their business goals.
          </p>
        </div>
      </section>

      {/* Portfolio Filter */}
      <section className="py-12 bg-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
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
          
          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <Link 
                key={item.id}
                to={item.link}
                className="group overflow-hidden rounded-lg relative reveal"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-dark-900/0 opacity-70 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-ignite text-sm font-medium mb-2 block">{item.category}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <span className="text-white/0 group-hover:text-white/100 transition-all duration-300 flex items-center gap-2">
                    View Project <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-dark-600">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-gradient-to-r from-dark-500 to-dark-400 rounded-2xl p-8 md:p-12 shadow-lg border border-dark-300 reveal">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Create Your Success Story</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Ready to join our portfolio of successful projects? Contact us today to discuss how we can help your business grow.
              </p>
              <Button size="lg" className="bg-ignite hover:bg-ignite-700 text-white">
                <Link to="/contact">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
