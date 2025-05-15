
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide } from '@/types/HeroSlideTypes';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface EnhancedHeroSliderProps {
  slides?: HeroSlide[];
}

const defaultSlides = [
  {
    id: '1',
    title: 'Ignite Your Brand',
    description: 'Reach new heights with our digital marketing strategies.',
    imageUrl: 'https://images.unsplash.com/photo-1606761940304-1293a7c2d135?q=80&w=2070',
    link: '/',
    order: 1,
    animation: 'fade',
    textColor: 'white',
    buttonText: 'Hizmetlerimizi Keşfedin',
    buttonLink: '/services',
    overlayOpacity: 60
  },
  {
    id: '2',
    title: 'Data-Driven Results',
    description: 'We turn data into actionable insights for your business.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
    link: '/services',
    order: 2,
    animation: 'slide',
    textColor: 'white',
    buttonText: 'Portfolyomuzu İnceleyin',
    buttonLink: '/portfolio',
    overlayOpacity: 65
  },
  {
    id: '3',
    title: 'SEO Çözümleri',
    description: 'Arama motorlarında üst sıralarda yer alarak hedef kitlenize ulaşın.',
    imageUrl: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=2070',
    link: '/services/seo',
    order: 3,
    animation: 'zoom',
    textColor: 'white',
    buttonText: 'SEO Hizmetlerimiz',
    buttonLink: '/services/seo',
    overlayOpacity: 70
  }
];

const EnhancedHeroSlider: React.FC<EnhancedHeroSliderProps> = ({ slides = defaultSlides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    let intervalId: number | null = null;
    
    if (isAutoPlaying) {
      intervalId = window.setInterval(nextSlide, 5000);
    }
    
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  // Get animation type from slide or default to fade
  const getAnimationVariants = (slide: HeroSlide) => {
    switch(slide.animation) {
      case 'slide':
        return {
          enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
          }),
          center: {
            x: 0,
            opacity: 1
          },
          exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
          })
        };
      case 'zoom':
        return {
          enter: {
            scale: 1.2,
            opacity: 0
          },
          center: {
            scale: 1,
            opacity: 1
          },
          exit: {
            scale: 0.8,
            opacity: 0
          }
        };
      case 'flip':
        return {
          enter: {
            rotateY: 90,
            opacity: 0
          },
          center: {
            rotateY: 0,
            opacity: 1
          },
          exit: {
            rotateY: -90,
            opacity: 0
          }
        };
      case 'fade':
      default:
        return {
          enter: {
            opacity: 0
          },
          center: {
            opacity: 1
          },
          exit: {
            opacity: 0
          }
        };
    }
  };

  const currentSlideData = slides[currentSlide];
  const slideVariants = getAnimationVariants(currentSlideData);
  const [direction, setDirection] = useState<number>(0);

  const handleNext = () => {
    setDirection(1);
    nextSlide();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevSlide();
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div 
          key={currentSlideData.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <img 
              src={currentSlideData.imageUrl} 
              alt={currentSlideData.title}
              className="w-full h-full object-cover"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/40"
              style={{ opacity: currentSlideData.overlayOpacity / 100 }}
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute inset-0 flex items-center"
            >
              <div className="container mx-auto px-6">
                <div className="max-w-2xl">
                  <motion.h2 
                    className="text-4xl md:text-6xl font-bold mb-4 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {currentSlideData.title}
                  </motion.h2>
                  <motion.p 
                    className="text-lg md:text-xl mb-8 text-white/90 max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    {currentSlideData.description}
                  </motion.p>
                  <motion.div 
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <Button 
                      variant="modern" 
                      size="lg" 
                      className="shadow-lg"
                      onClick={() => window.location.href = currentSlideData.buttonLink || '/'}
                    >
                      {currentSlideData.buttonText || "Daha Fazla"}
                    </Button>
                    <Button 
                      variant="glass" 
                      size="lg"
                      onClick={() => window.location.href = '/contact'}
                    >
                      Bizimle İletişime Geçin
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="glass"
          size="icon"
          className="rounded-full ml-4"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="glass"
          size="icon"
          className="rounded-full mr-4"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Dots navigation */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-ignite scale-125' : 'bg-white/40'
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedHeroSlider;
