import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import StatsSection from '@/components/home/StatsSection';
import ContactSection from '@/components/home/ContactSection';
import MarketingToolsSlider from '@/components/home/MarketingToolsSlider';
import CaseStudiesSlider from '@/components/home/CaseStudiesSlider';
import Preloader from '@/components/ui/preloader';
import { useToast } from '@/components/ui/use-toast';
import { MotionConfig } from 'framer-motion';
import { useDataService } from '@/lib/db';
import { SectionContent, PortfolioSectionProps } from '@/types/HeroSlideTypes';

// Animations definition
const animations = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
      }
    },
  },
};

const Index = () => {
  const { toast } = useToast();
  const { items: siteSettings } = useDataService('siteSettings', [{
    darkMode: true,
    glassmorphism: true,
    animationsEnabled: true,
    projectsPerRow: 2,
    projectImageHeight: 400,
    projectHoverEffect: 'scale',
    showProjectTags: true,
    showProjectCategory: true,
    showCaseStudies: true,
    caseStudiesAnimationType: 'fade',
    caseStudiesAutoplay: true,
    caseStudiesInterval: 5000,
    siteTitle: 'Ignite Dijital Pazarlama',
    siteDescription: 'SEO ve Dijital Pazarlama Çözümleri',
    primaryColor: '#FF6B00',
    secondaryColor: '#FFA133',
    accentColor: '#FF8A00',
    textColor: '#FFFFFF',
  }]);

  const { items: sectionContent } = useDataService('sectionContent', []);
  const { items: socialMedia } = useDataService('socialMedia', []);
  const { items: seoSettings } = useDataService('seoSettings', []);
  const { items: liveChat } = useDataService('liveChat', []);

  const settings = siteSettings[0] || {
    darkMode: true,
    glassmorphism: true,
    animationsEnabled: true,
    projectsPerRow: 2,
    projectImageHeight: 400,
    projectHoverEffect: 'scale',
    showProjectTags: true,
    showProjectCategory: true,
    showCaseStudies: true,
    caseStudiesAnimationType: 'fade',
    caseStudiesAutoplay: true,
    caseStudiesInterval: 5000,
    siteTitle: 'Ignite Dijital Pazarlama',
    siteDescription: 'SEO ve Dijital Pazarlama Çözümleri',
    primaryColor: '#FF6B00',
    secondaryColor: '#FFA133',
    accentColor: '#FF8A00',
    textColor: '#FFFFFF',
  };

  const content = sectionContent[0] || null;
  const socialMediaData = socialMedia[0] || null;
  const seo = seoSettings[0] || null;
  const chatSettings = liveChat[0] || null;
  
  const [isChatVisible, setIsChatVisible] = useState(false);

  useEffect(() => {
    // SEO için sayfa başlığını güncelle
    document.title = seo?.siteTitle || settings.siteTitle || 'Ignite Dijital Pazarlama | Web Geliştirme, SEO ve Dijital Pazarlama Ajansı';
    
    // Update CSS variables for dynamic colors
    document.documentElement.style.setProperty('--gradient-color-1', settings.primaryColor || '#FF6B00');
    document.documentElement.style.setProperty('--gradient-color-2', settings.secondaryColor || '#FFA133');
    document.documentElement.style.setProperty('--ignite', settings.primaryColor || '#FF6B00');
    document.documentElement.style.setProperty('--text-color', settings.textColor || '#FFFFFF');
    
    // Karşılama bildirimi
    setTimeout(() => {
      toast({
        title: "Hoş Geldiniz!",
        description: settings.siteDescription || "Ignite Dijital Pazarlama web sitesine hoş geldiniz.",
      });
    }, 2000);
    
    // Meta açıklama ekle
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo?.metaDescription || settings.siteDescription || 'Ignite Dijital Pazarlama, işletmenizi büyütmek için SEO, sosyal medya, içerik pazarlaması ve web geliştirme hizmetleri sunan lider dijital pazarlama ajansıdır.');
    
    // Add keyword meta tag if present
    if (seo?.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', seo.keywords);
    }

    // Add canonical URL if present
    if (seo?.canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', seo.canonicalUrl);
    }
    
    // Add robots meta tag
    if (seo?.enableIndexing !== undefined) {
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', seo.enableIndexing ? 'index,follow' : 'noindex,nofollow');
    }
    
    // Analytics izleme
    if (seo?.analyticsActive && seo?.googleAnalyticsId) {
      const analyticsScript = document.createElement('script');
      analyticsScript.innerHTML = `
        // Google Analytics
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${seo.googleAnalyticsId}');
      `;
      document.head.appendChild(analyticsScript);
      
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${seo.googleAnalyticsId}`;
      document.head.appendChild(gaScript);
      
      return () => {
        document.head.removeChild(analyticsScript);
        document.head.removeChild(gaScript);
      };
    }
    
    // Animasyon görünürlüğü
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
      observer.observe(element);
    });
    
    // Add live chat if enabled
    if (chatSettings?.enabled) {
      setTimeout(() => {
        const chatButton = document.createElement('div');
        chatButton.className = 'fixed z-50 cursor-pointer rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110';
        chatButton.style.backgroundColor = chatSettings.primaryColor || '#FF6B00';
        
        // Set position based on settings
        if (chatSettings.position === 'bottom-right') {
          chatButton.style.bottom = '20px';
          chatButton.style.right = '20px';
        } else if (chatSettings.position === 'bottom-left') {
          chatButton.style.bottom = '20px';
          chatButton.style.left = '20px';
        } else if (chatSettings.position === 'top-right') {
          chatButton.style.top = '20px';
          chatButton.style.right = '20px';
        } else if (chatSettings.position === 'top-left') {
          chatButton.style.top = '20px';
          chatButton.style.left = '20px';
        }
        
        chatButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        `;
        
        chatButton.addEventListener('click', () => {
          setIsChatVisible(true);
        });
        
        document.body.appendChild(chatButton);
        
        return () => {
          document.body.removeChild(chatButton);
        };
      }, 3000);
    }
    
    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [toast, settings, seo, chatSettings]);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <Layout socialMedia={socialMediaData}>
        <HeroSection content={content} />
        <ServicesSection content={content} />
        <MarketingToolsSlider />
        {settings.showCaseStudies && (
          <CaseStudiesSlider 
            animationType={settings.caseStudiesAnimationType}
            autoplay={settings.caseStudiesAutoplay}
            interval={settings.caseStudiesInterval}
          />
        )}
        <PortfolioSection 
          content={content}
          projectsPerRow={settings.projectsPerRow}
          imageHeight={settings.projectImageHeight}
          showTags={settings.showProjectTags}
          showCategories={settings.showProjectCategory}
          hoverEffect={settings.projectHoverEffect}
        />
        <StatsSection />
        <ContactSection content={content} />
        
        {isChatVisible && chatSettings?.enabled && (
          <div className="fixed bottom-20 right-5 z-50 bg-dark-500 border border-dark-400 rounded-lg shadow-lg w-80 overflow-hidden">
            <div className="p-3 flex justify-between items-center" style={{ backgroundColor: chatSettings.primaryColor }}>
              <div className="flex items-center">
                {chatSettings.agentAvatar && (
                  <img src={chatSettings.agentAvatar} alt="Agent" className="w-8 h-8 rounded-full mr-2" />
                )}
                <div>
                  <h3 className="text-white text-sm font-medium">{chatSettings.agentName || 'Destek Ekibi'}</h3>
                  <p className="text-white/70 text-xs">{chatSettings.agentTitle || 'Müşteri Temsilcisi'}</p>
                </div>
              </div>
              <button 
                className="text-white hover:bg-white/10 rounded p-1"
                onClick={() => setIsChatVisible(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="p-4 h-64 overflow-y-auto">
              <div className="mb-3">
                <div className="bg-dark-400 rounded-tl-lg rounded-tr-lg rounded-br-lg p-3 text-white inline-block">
                  {chatSettings.welcomeMessage || 'Hoş geldiniz! Size nasıl yardımcı olabilirim?'}
                </div>
              </div>
            </div>
            <div className="p-2 border-t border-dark-400">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Mesajınızı yazın..." 
                  className="flex-1 bg-dark-400 border-none rounded p-2 text-white text-sm focus:ring-1 focus:ring-ignite"
                />
                <button 
                  className="p-2 rounded"
                  style={{ backgroundColor: chatSettings.primaryColor }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-white">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </MotionConfig>
  );
};

export default Index;
