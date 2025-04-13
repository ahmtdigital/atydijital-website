
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Sample portfolio items
const portfolioItems = [
  {
    id: 1,
    title: 'E-commerce Rebranding',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    link: '/portfolio/ecommerce-rebranding'
  },
  {
    id: 2,
    title: 'Tech Startup SEO',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    link: '/portfolio/tech-startup-seo'
  },
  {
    id: 3,
    title: 'Restaurant Social Campaign',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1498083882188-ba262fbe1e61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    link: '/portfolio/restaurant-social'
  },
  {
    id: 4,
    title: 'Fitness App Marketing',
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    link: '/portfolio/fitness-app'
  }
];

const PortfolioSection = () => {
  return (
    <section className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-ignite font-semibold mb-3 reveal">FEATURED WORK</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal">Our Success Stories</h2>
          <p className="text-gray-400 reveal">
            Browse through some of our most impactful projects and see how we've helped businesses achieve their goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {portfolioItems.map((item, index) => (
            <Link 
              key={item.id}
              to={item.link}
              className="group overflow-hidden rounded-lg relative reveal"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="aspect-[4/3] overflow-hidden">
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
        
        <div className="text-center reveal">
          <Button size="lg" className="bg-ignite hover:bg-ignite-700 text-white">
            <Link to="/portfolio">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
