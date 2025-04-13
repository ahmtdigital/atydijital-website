
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample portfolio items in Turkish
const portfolioItems = [
  {
    id: 1,
    title: 'E-ticaret Marka Yenileme',
    category: 'Markalaşma',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    link: '/portfolio/ecommerce-rebranding'
  },
  {
    id: 2,
    title: 'Teknoloji Girişimi SEO',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    link: '/portfolio/tech-startup-seo'
  },
  {
    id: 3,
    title: 'Restoran Sosyal Medya Kampanyası',
    category: 'Sosyal Medya',
    image: 'https://images.unsplash.com/photo-1498083882188-ba262fbe1e61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    link: '/portfolio/restaurant-social'
  },
  {
    id: 4,
    title: 'Fitness Uygulaması Pazarlaması',
    category: 'Mobil',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    link: '/portfolio/fitness-app'
  }
];

const PortfolioSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p 
            className="text-ignite font-semibold mb-3 reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            ÖNE ÇIKAN ÇALIŞMALAR
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Başarı Hikayelerimiz
          </motion.h2>
          <motion.p 
            className="text-gray-400 reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            En etkileyici projelerimizden bazılarına göz atın ve işletmelerin hedeflerine ulaşmalarına nasıl yardımcı olduğumuzu görün.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="reveal"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02 }}
            >
              <Link 
                to={item.link}
                className="group overflow-hidden rounded-lg relative block"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    animate={{ 
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-dark-900 to-dark-900/0"
                  animate={{ 
                    opacity: hoveredIndex === index ? 0.9 : 0.7
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <motion.span 
                    className="text-ignite text-sm font-medium mb-2 block"
                    animate={{ 
                      y: hoveredIndex === index ? -5 : 0,
                      opacity: hoveredIndex === index ? 1 : 0.9
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.category}
                  </motion.span>
                  <motion.h3 
                    className="text-xl md:text-2xl font-bold text-white mb-2"
                    animate={{ 
                      y: hoveredIndex === index ? -5 : 0,
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.div 
                    className="flex items-center gap-2 text-white font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 20
                    }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Eye className="h-5 w-5 mr-2" />
                    Projeyi İncele <ArrowRight className="h-4 w-4 ml-1" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg" 
            className="bg-ignite hover:bg-ignite-700 text-white group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              <span>Tüm Projeleri Görüntüle</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="h-4 w-4 ml-2" />
              </motion.span>
            </span>
            <motion.span 
              className="absolute inset-0 bg-ignite-700"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
