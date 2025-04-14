
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PreloaderProps {
  className?: string;
}

const Preloader = ({ className }: PreloaderProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-dark", 
        loading ? "opacity-100" : "opacity-0 pointer-events-none", 
        className
      )}
    >
      <div className="relative flex flex-col items-center">
        <div className="h-24 w-24 rounded-full border-4 border-dark-300 border-t-ignite animate-spin"></div>
        <div className="mt-8 text-center">
          <span className="text-lg font-medium text-ignite">Yükleniyor</span>
          <span className="dots-animation">...</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
