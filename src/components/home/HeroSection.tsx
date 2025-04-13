
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDataService } from '@/lib/db';
import { HeroSlide } from '@/components/admin/HeroSliderManager';

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Ignite Your Brand's Digital Presence",
    subtitle: "We combine creativity, data, and technology to craft digital experiences that transform businesses and drive exceptional results.",
    buttonText: "Explore Our Services",
    buttonLink: "/services",
    backgroundImage: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2070",
    isActive: true
  }
];

const HeroSection = () => {
  const { items: slides } = useDataService<HeroSlide>('heroSlides', defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // For handling touch swipes
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToNextSlide();
    } else if (touchStart - touchEnd < -50) {
      // Swipe right
      goToPrevSlide();
    }
  };
  
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setAutoplay(false); // Pause autoplay when manually navigating
    setTimeout(() => setAutoplay(true), 5000); // Resume after 5 seconds
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setAutoplay(false); // Pause autoplay when manually navigating
    setTimeout(() => setAutoplay(true), 5000); // Resume after 5 seconds
  };
  
  useEffect(() => {
    // Auto-advance slides every 5 seconds if autoplay is true
    let interval: NodeJS.Timeout;
    
    if (autoplay && slides.length > 1) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, slides.length]);

  return (
    <section 
      className="relative min-h-[90vh] flex items-center bg-dark overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Orange accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ignite to-ignite-500 z-10"></div>
      
      {/* Slider navigation arrows */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={goToPrevSlide}
            className="absolute left-4 md:left-8 z-20 bg-dark/50 hover:bg-dark/80 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={goToNextSlide}
            className="absolute right-4 md:right-8 z-20 bg-dark/50 hover:bg-dark/80 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      
      {/* Slides */}
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div 
              key={slide.id}
              className="absolute inset-0 z-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              {/* Background image with overlay */}
              <div className="absolute inset-0">
                {slide.backgroundImage ? (
                  <div className="absolute inset-0 bg-dark/70 z-10"></div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-dark to-dark-600 opacity-80 z-0"></div>
                )}
                
                {slide.backgroundImage && (
                  <img 
                    src={slide.backgroundImage} 
                    alt="Background" 
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                )}
              </div>
              
              {/* Content */}
              <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                <div className="max-w-3xl">
                  <motion.p 
                    className="text-ignite font-semibold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    DIGITAL MARKETING AGENCY
                  </motion.p>
                  
                  <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {slide.title.split(' ').map((word, i, arr) => 
                      i === arr.length - 1 ? (
                        <span key={i} className="text-gradient-orange">{word} </span>
                      ) : (
                        <span key={i}>{word} </span>
                      )
                    )}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-xl text-gray-300 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Button size="lg" className="bg-ignite hover:bg-ignite-700 text-white group">
                      <Link to={slide.buttonLink} className="flex items-center">
                        {slide.buttonText} 
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-ignite text-ignite hover:bg-ignite/10">
                      <Link to="/contact">Get a Free Consultation</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-ignite w-10' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Decorative elements with animation */}
      <motion.div 
        className="absolute bottom-0 right-0 w-1/3 h-64 bg-ignite/5 blur-3xl rounded-full"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 10,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-ignite/10 blur-3xl rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 15,
          ease: "easeInOut"
        }}
      />
    </section>
  );
};

export default HeroSection;
