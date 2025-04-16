
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MarketingIcon from '@/components/ui/marketing-icon';

// Define props interface
interface CaseStudiesSliderProps {
  animationType?: string;
  autoplay?: boolean;
  interval?: number;
}

const caseStudies = [
  {
    id: 1,
    title: 'E-Ticaret Marka Yenileme',
    client: 'FashionTurk',
    description: 'FashionTurk markası için kapsamlı marka yenileme projesi ile satışlarında %150 artış sağladık.',
    tools: ['meta-ads', 'google-ads', 'google-analytics'],
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070',
    link: '/portfolio/ecommerce-rebranding',
    color: 'from-pink-500/20 to-purple-500/20'
  },
  {
    id: 2,
    title: 'SEO Optimizasyon Kampanyası',
    client: 'TeknoMarket',
    description: 'TeknoMarket için geliştirdiğimiz SEO stratejileri ile organik trafikte %210 artış elde ettik.',
    tools: ['google-analytics', 'google-ads'],
    image: 'https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?q=80&w=2070',
    link: '/portfolio/seo-kampanyasi',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 3,
    title: 'Sosyal Medya Büyüme',
    client: 'CafeRoast',
    description: 'CafeRoast için hazırladığımız sosyal medya stratejisi ile Instagram takipçilerinde %180 artış sağladık.',
    tools: ['instagram-ads', 'facebook-ads', 'tiktok-ads'],
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2070',
    link: '/portfolio/sosyal-medya-kampanyasi',
    color: 'from-amber-500/20 to-red-500/20'
  }
];

const CaseStudiesSlider = ({ animationType = 'fade', autoplay = true, interval = 5000 }: CaseStudiesSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides if autoplay is enabled
  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoplay, interval, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };

  // Define animation variants based on animationType
  const getAnimationVariants = () => {
    switch (animationType) {
      case 'slide':
        return {
          initial: { x: 200, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -200, opacity: 0 }
        };
      case 'zoom':
        return {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.8, opacity: 0 }
        };
      case 'flip':
        return {
          initial: { rotateY: 90, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
          exit: { rotateY: -90, opacity: 0 }
        };
      case 'fade':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  return (
    <section className="py-20 bg-dark-600 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-ignite font-semibold mb-3 reveal">BAŞARI HİKAYELERİMİZ</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal">Öne Çıkan Vaka Çalışmalarımız</h2>
          <p className="text-gray-400 reveal">
            Başarılı projelerimiz ve elde ettiğimiz sonuçlar ile müşterilerimize nasıl değer kattığımızı keşfedin.
          </p>
        </div>
        
        <div className="relative rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={getAnimationVariants().initial}
              animate={getAnimationVariants().animate}
              exit={getAnimationVariants().exit}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${caseStudies[currentSlide].color} mix-blend-overlay z-0`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent z-10"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                <div className="relative z-20 p-12 flex flex-col justify-center">
                  <div className="flex space-x-2 mb-6">
                    {caseStudies[currentSlide].tools.map((tool, index) => (
                      <div key={index} className="bg-dark-400/50 backdrop-blur-sm p-2 rounded-full h-10 w-10">
                        <MarketingIcon name={tool} />
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold mb-3">{caseStudies[currentSlide].title}</h3>
                  <p className="text-lg text-ignite mb-6">Müşteri: {caseStudies[currentSlide].client}</p>
                  <p className="text-gray-300 text-lg mb-8">{caseStudies[currentSlide].description}</p>
                  
                  <div>
                    <Button className="bg-ignite hover:bg-ignite-700 text-white mr-4">
                      <Link to={caseStudies[currentSlide].link} className="flex items-center">
                        Vaka Çalışmasını İncele <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="relative h-[400px] lg:h-auto">
                  <img
                    src={caseStudies[currentSlide].image}
                    alt={caseStudies[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 z-30 flex space-x-2">
                <Button 
                  onClick={prevSlide} 
                  className="h-12 w-12 rounded-full bg-dark-500/70 backdrop-blur-sm hover:bg-ignite"
                  aria-label="Previous case study"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                
                <Button 
                  onClick={nextSlide} 
                  className="h-12 w-12 rounded-full bg-dark-500/70 backdrop-blur-sm hover:bg-ignite"
                  aria-label="Next case study"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="absolute bottom-6 left-6 z-30 flex space-x-2">
                {caseStudies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${currentSlide === index ? 'w-8 bg-ignite' : 'w-2 bg-white/50'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSlider;
