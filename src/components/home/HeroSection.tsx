
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, TrendingUp, BarChart4, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDataService } from '@/lib/db';
import { HeroSlide } from '@/types/HeroSlideTypes';

const defaultSlides = [
  {
    id: 1,
    title: "Dijital Dönüşümünüzün Mimarı",
    subtitle: "Yaratıcılık, veri ve teknolojiyi harmanlayarak işletmenizi bir üst seviyeye taşıyoruz.",
    buttonText: "Hizmetlerimizi Keşfedin",
    buttonLink: "/services",
    backgroundImage: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2070",
    isActive: true,
    animation: "fade",
    textColor: "white",
    overlayOpacity: 60
  },
  {
    id: 2,
    title: "Modern Çözümler, Gerçek Sonuçlar",
    subtitle: "Dijital pazarlama stratejilerimizle markanızı zirveye taşıyoruz.",
    buttonText: "Portfolyomuzu İnceleyin",
    buttonLink: "/portfolio",
    backgroundImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070",
    isActive: false,
    animation: "slide",
    textColor: "white",
    overlayOpacity: 65
  },
  {
    id: 3,
    title: "SEO ve Performans Odaklı Yaklaşım",
    subtitle: "Veriye dayalı kararlar ve optimize edilmiş stratejilerle organik trafiğinizi artırıyoruz.",
    buttonText: "SEO Hizmetlerimiz",
    buttonLink: "/services/seo",
    backgroundImage: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=2070",
    isActive: false,
    animation: "zoom",
    textColor: "white",
    overlayOpacity: 70
  }
];

interface SliderSettings {
  autoplay: boolean;
  autoplaySpeed: number;
  effect: string;
  animationSpeed: number;
  arrows: boolean;
  dots: boolean;
  infinite: boolean;
}

const defaultSettings: SliderSettings = {
  autoplay: true,
  autoplaySpeed: 5000,
  effect: 'fade',
  animationSpeed: 500,
  arrows: true,
  dots: true,
  infinite: true
};

const HeroSection = () => {
  // Get the slider items from local storage or default values
  const [sliderItems, setSliderItems] = useState<any[]>([]);
  const [sliderSettings, setSliderSettings] = useState<SliderSettings>(defaultSettings);
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

  useEffect(() => {
    // Load slider items from local storage
    const storedSliderItems = localStorage.getItem('sliderItems');
    if (storedSliderItems) {
      setSliderItems(JSON.parse(storedSliderItems));
    } else {
      setSliderItems(defaultSlides);
    }

    // Load slider settings from local storage
    const storedSliderSettings = localStorage.getItem('sliderSettings');
    if (storedSliderSettings) {
      setSliderSettings(JSON.parse(storedSliderSettings));
      setAutoplay(JSON.parse(storedSliderSettings).autoplay);
    }
  }, []);
  
  const goToNextSlide = () => {
    if (sliderSettings.infinite || currentSlide < sliderItems.length - 1) {
      setCurrentSlide((prev) => (prev === sliderItems.length - 1 ? 0 : prev + 1));
    }
    setAutoplay(false); // Pause autoplay when manually navigating
    setTimeout(() => setAutoplay(true), 5000); // Resume after 5 seconds
  };
  
  const goToPrevSlide = () => {
    if (sliderSettings.infinite || currentSlide > 0) {
      setCurrentSlide((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
    }
    setAutoplay(false); // Pause autoplay when manually navigating
    setTimeout(() => setAutoplay(true), 5000); // Resume after 5 seconds
  };
  
  useEffect(() => {
    // Auto-advance slides if autoplay is enabled
    let interval: NodeJS.Timeout;
    
    if (autoplay && sliderSettings.autoplay && sliderItems.length > 1) {
      interval = setInterval(() => {
        if (sliderSettings.infinite || currentSlide < sliderItems.length - 1) {
          setCurrentSlide((prev) => (prev === sliderItems.length - 1 ? 0 : prev + 1));
        } else {
          setCurrentSlide(0); // Reset to beginning if infinite is off and we're at the end
        }
      }, sliderSettings.autoplaySpeed);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, sliderItems.length, currentSlide, sliderSettings]);

  // Helper function to get animation variants based on slide animation type
  const getAnimationVariants = (animation: string = 'fade') => {
    switch(animation) {
      case 'slide':
        return {
          initial: { opacity: 0, x: 100 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -100 }
        };
      case 'zoom':
        return {
          initial: { opacity: 0, scale: 1.2 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 }
        };
      case 'flip':
        return {
          initial: { opacity: 0, rotateY: 90 },
          animate: { opacity: 1, rotateY: 0 },
          exit: { opacity: 0, rotateY: -90 }
        };
      default: // fade
        return {
          initial: { opacity: 0, scale: 1.05 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 }
        };
    }
  };

  // Animasyonlu yüzen iconlar
  const FloatingIcons = () => (
    <>
      <motion.div
        className="absolute top-1/3 left-1/5 text-ignite opacity-20 z-10"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <TrendingUp size={80} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/4 right-1/6 text-ignite opacity-20 z-10"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <BarChart4 size={60} />
      </motion.div>
      
      <motion.div
        className="absolute top-2/3 left-1/3 text-ignite opacity-20 z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Zap size={50} />
      </motion.div>
      
      <motion.div
        className="absolute top-1/4 right-1/3 text-ignite opacity-20 z-10"
        animate={{ 
          scale: [1, 1.1, 1],
          y: [0, -15, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      >
        <Target size={70} />
      </motion.div>
    </>
  );

  // Handle empty slider items case
  if (sliderItems.length === 0) {
    return (
      <section className="relative min-h-[90vh] flex items-center bg-dark overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Henüz Slider Eklenmemiş</h1>
          <p className="text-xl text-gray-300 mb-8">Admin panelinden slider ekleyebilirsiniz.</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative min-h-[90vh] flex items-center bg-dark overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Gradient overlay line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ignite via-ignite-400 to-ignite-600 z-10"></div>
      
      {/* Floating animated icons */}
      <FloatingIcons />
      
      {/* Navigation arrows with updated design */}
      {sliderSettings.arrows && sliderItems.length > 1 && (
        <>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrevSlide}
            className="absolute left-4 md:left-8 z-20 bg-black/20 hover:bg-ignite/80 text-white rounded-full p-3 backdrop-blur-lg transition-colors duration-300"
            aria-label="Önceki slayt"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNextSlide}
            className="absolute right-4 md:right-8 z-20 bg-black/20 hover:bg-ignite/80 text-white rounded-full p-3 backdrop-blur-lg transition-colors duration-300"
            aria-label="Sonraki slayt"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </>
      )}
      
      {/* Slides with enhanced animations */}
      <AnimatePresence mode="wait">
        {sliderItems.map((slide, index) => (
          index === currentSlide && (
            <motion.div 
              key={slide.id}
              className="absolute inset-0 z-0"
              initial={getAnimationVariants(slide.animation).initial}
              animate={getAnimationVariants(slide.animation).animate}
              exit={getAnimationVariants(slide.animation).exit}
              transition={{ duration: sliderSettings.animationSpeed / 1000, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              {/* Background image with enhanced overlay */}
              <div className="absolute inset-0">
                {slide.backgroundImage && (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-r from-dark/${Math.min(90, slide.overlayOpacity || 60)} via-dark/${Math.max(1, (slide.overlayOpacity || 60) - 20)} to-dark/${Math.min(90, slide.overlayOpacity || 60)} z-10`}></div>
                    <motion.img 
                      src={slide.backgroundImage} 
                      alt="Arkaplan" 
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 10 }}
                    />
                  </>
                )}
              </div>
              
              {/* Content with enhanced animations */}
              <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                <div className="max-w-3xl">
                  <motion.p 
                    className="text-ignite font-semibold mb-4 tracking-wider"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    DİJİTAL PAZARLAMA AJANSI
                  </motion.p>
                  
                  <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{ color: slide.textColor === 'ignite' ? 'var(--ignite)' : slide.textColor }}
                  >
                    {slide.title.split(' ').map((word: string, i: number, arr: string[]) => (
                      <span key={i} className={i === arr.length - 1 ? 'text-gradient-orange' : ''}>
                        {word}{' '}
                      </span>
                    ))}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-xl text-gray-300 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    style={{ color: slide.textColor === 'ignite' ? 'var(--ignite)' : slide.textColor === 'black' ? '#000' : 'rgba(255,255,255,0.8)' }}
                  >
                    {slide.description || slide.subtitle}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-ignite hover:bg-ignite-700 text-white group relative overflow-hidden"
                    >
                      <Link to={slide.buttonLink || slide.link} className="flex items-center">
                        {slide.buttonText || "Daha Fazla"} 
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-ignite text-ignite hover:bg-ignite/10 relative overflow-hidden"
                    >
                      <Link to="/contact">İletişime Geçin</Link>
                      <motion.div
                        className="absolute inset-0 bg-ignite/5"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
      {/* Enhanced slide indicators */}
      {sliderSettings.dots && sliderItems.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
          {sliderItems.map((_, index) => (
            <motion.button
              key={index}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-ignite w-10' 
                  : 'bg-white/30 w-3 hover:bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`${index + 1} numaralı slayta git`}
            />
          ))}
        </div>
      )}
      
      {/* Enhanced decorative elements */}
      <motion.div 
        className="absolute bottom-0 right-0 w-1/3 h-64 bg-gradient-to-t from-ignite/20 to-transparent blur-3xl rounded-full"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 5, 0]
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
          x: [0, 50, 0],
          y: [0, -30, 0]
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
