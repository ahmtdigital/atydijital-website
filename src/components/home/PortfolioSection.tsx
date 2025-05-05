
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define the props interface with site settings parameters
interface PortfolioSectionProps {
  projectsPerRow?: number;
  imageHeight?: number;
  showTags?: boolean;
  showCategories?: boolean;
  hoverEffect?: string;
}

// Default portfolio project data
const portfolioProjects = [
  {
    id: 1,
    title: 'E-Ticaret SEO Optimizasyonu',
    description: 'Türkiye\'nin önde gelen e-ticaret platformları için SEO stratejileri ve organik trafik artışı sağladık.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'SEO',
    tags: ['E-Ticaret', 'SEO', 'İçerik Stratejisi', 'Analytics'],
    slug: 'e-ticaret-seo'
  },
  {
    id: 2,
    title: 'Sosyal Medya Kampanyası',
    description: 'Instagram ve Facebook üzerinde etkili reklam kampanyaları ile marka bilinirliğini artırdık.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    category: 'Sosyal Medya',
    tags: ['Instagram', 'Facebook', 'İçerik Üretimi', 'Reklam'],
    slug: 'sosyal-medya-kampanyasi'
  },
  {
    id: 3,
    title: 'Web Sitesi Yenileme Projesi',
    description: 'Modern teknolojiler kullanarak yüksek performanslı kurumsal web sitesi tasarımı ve geliştirmesi.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    category: 'Web Geliştirme',
    tags: ['UX/UI', 'React', 'Responsive Tasarım', 'Performans'],
    slug: 'web-sitesi-yenileme'
  },
  {
    id: 4,
    title: 'İçerik Pazarlama Stratejisi',
    description: 'Finans sektörüne özel içerik stratejisi ve blog yönetimi ile organik trafik artışı.',
    image: 'https://images.unsplash.com/photo-1553484771-898ed465e931?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'İçerik Pazarlaması',
    tags: ['Blog', 'SEO İçeriği', 'Finans', 'İçerik Takvimi'],
    slug: 'icreik-pazarlama'
  }
];

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  projectsPerRow = 2,
  imageHeight = 400,
  showTags = true,
  showCategories = true,
  hoverEffect = 'scale'
}) => {
  // Calculate grid columns based on projectsPerRow
  const gridCols = () => {
    switch (projectsPerRow) {
      case 1: return 'grid-cols-1';
      case 3: return 'grid-cols-1 md:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2';
    }
  };

  // Define hover effect class based on the hoverEffect prop
  const getHoverEffectClass = (effect: string) => {
    switch (effect) {
      case 'scale': return 'hover:scale-105 transition-transform duration-300';
      case 'slide': return 'group-hover:translate-y-[-10px] transition-transform duration-300';
      case 'fade': return 'group-hover:opacity-80 transition-opacity duration-300';
      default: return '';
    }
  };

  return (
    <section className="py-24 bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Başarı Hikayelerimiz</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            İşletmelerin dijital dünyada büyümesine nasıl yardımcı olduğumuzu gösteren çalışmalarımızdan bazıları.
          </p>
        </motion.div>

        <div className={`grid ${gridCols()} gap-8`}>
          {portfolioProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/portfolio/${project.slug}`} className="block group">
                <Card className="bg-dark-500 border-dark-400 overflow-hidden h-full hover:border-ignite/50 transition-colors duration-300">
                  <div 
                    className="relative overflow-hidden"
                    style={{ height: `${imageHeight}px` }}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className={`w-full h-full object-cover ${getHoverEffectClass(hoverEffect)}`}
                    />
                    {showCategories && (
                      <Badge className="absolute top-4 right-4 bg-ignite text-white border-none">
                        {project.category}
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl group-hover:text-ignite transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <CardDescription className="text-white/70">
                      {project.description}
                    </CardDescription>
                    {showTags && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="border-ignite/30 text-ignite/90">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="text-ignite p-0 hover:text-ignite hover:bg-transparent">
                      Detayları Gör <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-ignite hover:bg-ignite-700">
            <Link to="/portfolio" className="flex items-center">
              Tüm Projelerimizi İnceleyin <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
