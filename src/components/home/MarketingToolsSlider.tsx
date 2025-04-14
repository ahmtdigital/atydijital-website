
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MarketingIcon from "../ui/marketing-icon";

// Define marketing tools with icons and names
const marketingTools = [
  { id: 'google-analytics', name: 'Google Analytics', description: 'Web sitenizin performansını analiz edin, kullanıcı davranışlarını anlayın ve veri odaklı kararlar verin.' },
  { id: 'meta-ads', name: 'Meta Ads', description: 'Facebook ve Instagram platformlarında hedef kitlenize ulaşın ve satışlarınızı artırın.' },
  { id: 'instagram-ads', name: 'Instagram Ads', description: 'Görsel odaklı içeriklerle Instagram kullanıcılarına ulaşın ve etkileşim yaratın.' },
  { id: 'twitter-ads', name: 'X Ads', description: 'X platformunda gündem konuları ile ilgili reklam kampanyaları oluşturun.' },
  { id: 'linkedin-ads', name: 'LinkedIn Ads', description: 'B2B pazarda profesyonellere ulaşın, potansiyel müşterilerinizi hedefleyin.' },
  { id: 'youtube-ads', name: 'YouTube Ads', description: 'Dünyanın en büyük video platformunda markanızı tanıtın ve izleyicilerle etkileşime geçin.' },
  { id: 'tiktok-ads', name: 'TikTok Ads', description: 'Kısa formatlı videolar ile Z kuşağına ulaşın ve marka bilinirliğinizi artırın.' },
  { id: 'google-ads', name: 'Google Ads', description: 'Arama ağında ve görüntülü reklamlarda markanızı öne çıkarın, dönüşüm oranlarınızı artırın.' },
];

const MarketingToolsSlider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToolClick = (index: number) => {
    setActiveIndex(index);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span>Dijital Pazarlama</span>{" "}
            <span className="text-ignite">Araçlarımız</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Markanızın dijital varlığını güçlendirmek için kullandığımız endüstri lideri pazarlama araçları ve teknolojileri
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={scrollLeft}
              className="p-2 rounded-full bg-dark-600 border border-dark-400 text-white hover:bg-ignite hover:text-white transition-colors duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-2 rounded-full bg-dark-600 border border-dark-400 text-white hover:bg-ignite hover:text-white transition-colors duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <div 
            className="overflow-x-auto hide-scrollbar" 
            ref={scrollRef}
          >
            <div className="flex gap-4 py-2 min-w-min">
              {marketingTools.map((tool, index) => (
                <div 
                  key={tool.id}
                  className={`p-6 min-w-[180px] rounded-xl ${
                    activeIndex === index 
                      ? 'bg-ignite/20 border border-ignite/60' 
                      : 'bg-dark-500/50 border border-dark-400/50'
                  } text-center cursor-pointer transition-all duration-300 hover:border-ignite hover:shadow-lg hover:shadow-ignite/10`}
                  onClick={() => handleToolClick(index)}
                >
                  <div className="flex justify-center items-center h-16 mb-3">
                    <div className={`${activeIndex === index ? 'text-ignite' : 'text-gray-400'} transition-colors duration-300 w-10 h-10`}>
                      <MarketingIcon name={tool.id} />
                    </div>
                  </div>
                  <p className={`${activeIndex === index ? 'text-white' : 'text-gray-300'} font-medium transition-colors`}>
                    {tool.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 bg-dark-500 p-6 rounded-lg border border-dark-400 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="text-ignite opacity-90 hidden sm:block w-12 h-12">
                <MarketingIcon name={marketingTools[activeIndex].id} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{marketingTools[activeIndex].name}</h3>
                <p className="text-gray-400">{marketingTools[activeIndex].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingToolsSlider;
