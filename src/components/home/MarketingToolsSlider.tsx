
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, BarChart4, Instagram, Facebook, Twitter, Linkedin, Youtube, TrendingUp, Search, Globe } from "lucide-react";
import { gsap } from "gsap";
import { useToast } from "@/hooks/use-toast";

// Define marketing tools with icons and names
const marketingTools = [
  { id: 'analytics', name: 'Google Analytics', icon: <BarChart4 className="h-8 w-8" /> },
  { id: 'meta-ads', name: 'Meta Ads', icon: <Facebook className="h-8 w-8" /> },
  { id: 'instagram-ads', name: 'Instagram Ads', icon: <Instagram className="h-8 w-8" /> },
  { id: 'twitter-ads', name: 'Twitter Ads', icon: <Twitter className="h-8 w-8" /> },
  { id: 'linkedin-ads', name: 'LinkedIn Ads', icon: <Linkedin className="h-8 w-8" /> },
  { id: 'youtube-ads', name: 'YouTube Ads', icon: <Youtube className="h-8 w-8" /> },
  { id: 'seo', name: 'SEO Optimizasyonu', icon: <Search className="h-8 w-8" /> },
  { id: 'google-ads', name: 'Google Ads', icon: <Globe className="h-8 w-8" /> },
  { id: 'growth-hacking', name: 'Growth Hacking', icon: <TrendingUp className="h-8 w-8" /> },
];

const MarketingToolsSlider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    setIsMounted(true);
    
    // Initialize GSAP animations
    if (containerRef.current) {
      gsap.fromTo(
        ".tool-icon", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  const handleToolClick = (toolName: string) => {
    toast({
      title: `${toolName} Seçildi`,
      description: `${toolName} ile ilgili daha fazla bilgi almak için bize ulaşın.`,
    });
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  if (!isMounted) {
    return null;
  }

  return (
    <section className="py-20 bg-dark-700 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-64 bg-ignite/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-ignite/10 blur-3xl rounded-full"></div>
      
      <div className="container mx-auto px-4" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Dijital Pazarlama
            </motion.span>{" "}
            <motion.span 
              className="text-ignite"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Araçlarımız
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Markanızın dijital varlığını güçlendirmek için kullandığımız endüstri lideri pazarlama araçları ve teknolojileri
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-5xl mx-auto relative"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onSelect={(index) => setActiveIndex(index)}
          >
            <CarouselContent>
              {marketingTools.map((tool, index) => (
                <CarouselItem key={tool.id} className="md:basis-1/3 lg:basis-1/4">
                  <motion.div 
                    className="p-1 tool-icon"
                    custom={index}
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div 
                      className="rounded-xl overflow-hidden bg-dark-500/50 border border-dark-400/50 p-6 text-center transition-all duration-300 hover:border-ignite hover:shadow-lg hover:shadow-ignite/10"
                      onClick={() => handleToolClick(tool.name)}
                    >
                      <div className="flex justify-center items-center h-20">
                        <motion.div
                          className="text-ignite opacity-80 hover:opacity-100 transition-opacity"
                          whileHover={{ 
                            scale: 1.1, 
                            rotate: [0, -5, 5, -5, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          {tool.icon}
                        </motion.div>
                      </div>
                      <p className="mt-4 text-sm font-medium">{tool.name}</p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 md:-left-10 bg-dark-600 border-dark-400 text-white hover:bg-ignite hover:text-white transition-colors duration-300" />
            <CarouselNext className="right-1 md:-right-10 bg-dark-600 border-dark-400 text-white hover:bg-ignite hover:text-white transition-colors duration-300" />
          </Carousel>
          
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {marketingTools.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1.5 rounded-full ${activeIndex === index ? 'w-6 bg-ignite' : 'w-1.5 bg-dark-400'}`}
                  animate={{
                    width: activeIndex === index ? 24 : 6,
                    backgroundColor: activeIndex === index ? '#ff6b00' : '#333',
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketingToolsSlider;
