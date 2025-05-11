import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useDataService } from '@/lib/db';

export interface PortfolioSectionProps {
  content?: any;
  projectsPerRow?: number;
  imageHeight?: number;
  showTags?: boolean;
  showCategories?: boolean;
  hoverEffect?: string;
}

const PortfolioSection = ({
  content,
  projectsPerRow = 3,
  imageHeight = 300,
  showTags = true,
  showCategories = true,
  hoverEffect = 'scale'
}: PortfolioSectionProps) => {
  const { items: projects } = useDataService('projects', []);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const projectsToShow = projects.slice(0, visibleProjects);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 200) {
        return;
      }
      setVisibleProjects((prevVisibleProjects) => prevVisibleProjects + 3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getColumnCount = () => {
    if (projectsPerRow === 2) {
      return 'md:grid-cols-2';
    } else if (projectsPerRow === 4) {
      return 'md:grid-cols-2 lg:grid-cols-4';
    }
    return 'md:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <section id="portfolio" className="py-24 bg-dark-700">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-white mb-4 reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {content?.portfolioSectionTitle || 'Projelerimiz'}
        </motion.h2>
        <motion.p
          className="text-white/60 mb-12 reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {content?.portfolioSectionSubtitle || 'Müşterilerimiz için hayata geçirdiğimiz projelerden bazıları'}
        </motion.p>

        <div className={`grid gap-8 ${getColumnCount()} px-6 md:px-0`}>
          {projectsToShow.map((project) => (
            <motion.div
              key={project.id}
              className="relative rounded-md overflow-hidden group reveal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to={`/project/${project.slug}`}>
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full object-cover rounded-md transition-transform duration-300 ${hoverEffect === 'scale' ? 'group-hover:scale-110' : ''}`}
                    style={{ height: imageHeight + 'px' }}
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-dark-500 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  {showCategories && project.category && (
                    <p className="text-sm text-ignite mb-1">{project.category}</p>
                  )}
                  <h3 className="text-lg font-semibold text-white line-clamp-1 group-hover:underline">{project.title}</h3>
                  {showTags && project.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="bg-dark-600 text-white text-xs px-2 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {visibleProjects < projects.length && (
          <Button className="mt-8 bg-ignite hover:bg-ignite-700 text-white">Daha Fazla Yükle</Button>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
