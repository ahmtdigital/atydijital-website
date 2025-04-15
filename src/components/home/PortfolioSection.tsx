
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye } from 'lucide-react';
import { useDataService } from '@/lib/db';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  featured: boolean;
}

const PortfolioSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  const {
    items: projects,
    isLoading
  } = useDataService<Project>('projects', []);

  const featuredProjects = projects.filter(project => project.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-ignite/5 via-transparent to-transparent" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-ignite font-semibold mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            ÖNE ÇIKAN ÇALIŞMALAR
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Başarı Hikayelerimiz
          </motion.h2>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            En etkileyici projelerimizden bazılarına göz atın ve işletmelerin hedeflerine ulaşmalarına nasıl yardımcı olduğumuzu görün.
          </motion.p>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="bg-dark-500/50 animate-pulse h-[400px] rounded-lg" />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {featuredProjects.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative overflow-hidden rounded-lg bg-dark-500/20 backdrop-blur-sm border border-dark-400/30"
              >
                <Link to={item.link} className="block">
                  <motion.div 
                    className="relative h-[400px] overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ 
                        scale: hoveredIndex === index ? 1.15 : 1.1,
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent"
                      initial={{ opacity: 0.7 }}
                      animate={{ 
                        opacity: hoveredIndex === index ? 0.85 : 0.7
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <span className="text-ignite text-sm font-medium mb-2 block">
                          {item.category}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                          {item.title}
                        </h3>
                        <p className="text-white/70 mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="bg-dark-600/50 text-white/80 text-sm px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <motion.div 
                          className="flex items-center gap-2 text-white font-medium"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: hoveredIndex === index ? 1 : 0,
                            y: hoveredIndex === index ? 0 : 20
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Eye className="h-5 w-5 mr-2" />
                          Projeyi İncele <ArrowRight className="h-4 w-4 ml-1" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg" 
            className="bg-ignite hover:bg-ignite-700 text-white group relative overflow-hidden"
          >
            <Link to="/portfolio" className="flex items-center">
              <span className="relative z-10">Tüm Projeleri Görüntüle</span>
              <motion.span
                className="relative z-10"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="h-4 w-4 ml-2" />
              </motion.span>
            </Link>
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
