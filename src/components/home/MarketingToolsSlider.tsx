
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { MarketingIconCarousel } from "@/components/ui/carousel-with-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MarketingToolsSlider = () => {
  // Marketing tools icons (mapped to the existing carousel-with-icons component)
  const marketingIcons = [
    'google-analytics',
    'meta-ads',
    'tiktok-ads',
    'google-ads',
    'linkedin-ads',
    'twitter-ads',
    'youtube-ads',
    'instagram-ads'
  ];

  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className="py-20 bg-dark-700 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-64 bg-ignite/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-ignite/10 blur-3xl rounded-full"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dijital Pazarlama <span className="text-ignite">Araçlarımız</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Markanızın dijital varlığını güçlendirmek için kullandığımız endüstri lideri pazarlama araçları ve teknolojileri
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto relative"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {marketingIcons.map((icon, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <div className="rounded-xl overflow-hidden bg-dark-500/50 border border-dark-400/50 p-6 text-center hover:scale-105 transition-transform duration-300">
                      <div className="flex justify-center items-center h-20">
                        <img 
                          src={`/icons/${icon}.svg`} 
                          alt={icon} 
                          className="h-12 w-12 object-contain opacity-80 hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <p className="mt-4 text-sm font-medium capitalize">{icon.replace('-', ' ')}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 md:-left-2 bg-dark-600 border-dark-400 text-white hover:bg-ignite-600 hover:text-white" />
            <CarouselNext className="right-1 md:-right-2 bg-dark-600 border-dark-400 text-white hover:bg-ignite-600 hover:text-white" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketingToolsSlider;
