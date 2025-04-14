
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

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
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-dark", 
        loading ? "opacity-100" : "opacity-0 pointer-events-none transition-opacity duration-500", 
        className
      )}
    >
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-4 border-dark-300 border-t-ignite animate-spin"></div>
        <div className="mt-8 text-center">
          <span className="text-lg font-medium text-ignite">Yükleniyor</span>
          <span className="dots-animation">...</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
