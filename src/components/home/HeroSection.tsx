import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  content?: any;
}

const HeroSection = ({ content }: HeroSectionProps) => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const reveal = () => {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', reveal);
    // Initial check
    reveal();
    
    return () => {
      window.removeEventListener('scroll', reveal);
    };
  }, []);

  return (
    <section className="py-24 bg-dark-500">
      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 reveal"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
            >
              {content?.heroTitle || "Profesyonel Dijital Pazarlama Çözümleri"}
            </motion.h1>
            <motion.p
              className="text-lg text-white/80 mb-8 reveal"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.5 }}
            >
              {content?.heroDescription || "İşletmenizin dijital dünyadaki potansiyelini keşfedin. Web tasarım, SEO, sosyal medya yönetimi ve daha fazlası."}
            </motion.p>
            <motion.div
              className="space-x-4 reveal"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.75 }}
            >
              <Button size="lg" className="bg-ignite hover:bg-ignite-700 text-white">
                Projelerimiz
              </Button>
              <Button variant="outline" size="lg" className="text-white border-dark-400 hover:bg-dark-400">
                Hizmetlerimiz
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="relative reveal"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 1 }}
          >
            <img
              src={content?.heroImage || "/images/hero-image.png"}
              alt="Dijital Pazarlama Çözümleri"
              className="rounded-lg shadow-xl w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
