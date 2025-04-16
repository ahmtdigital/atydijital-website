
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string;
  className?: string;
}

const PageHeader = ({
  title,
  description,
  breadcrumbs,
  backgroundImage = "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2070",
  className = ""
}: PageHeaderProps) => {
  return (
    <section className={`relative py-24 overflow-hidden ${className}`}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Arkaplan"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/90 to-dark/95"></div>
      </div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-ignite/10 to-transparent opacity-70 z-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center text-sm text-white/60 mb-6 flex-wrap">
            <Link to="/" className="hover:text-ignite transition-colors">
              Ana Sayfa
            </Link>
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-2" />
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-ignite">{item.name}</span>
                ) : (
                  <Link to={item.href} className="hover:text-ignite transition-colors">
                    {item.name}
                  </Link>
                )}
              </span>
            ))}
          </div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl"
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-ignite via-ignite-400 to-ignite-600"></div>
    </section>
  );
};

export default PageHeader;
