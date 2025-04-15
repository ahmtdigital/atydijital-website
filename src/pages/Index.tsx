
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactSection from '@/components/home/ContactSection';
import MarketingToolsSlider from '@/components/home/MarketingToolsSlider';
import CaseStudiesSlider from '@/components/home/CaseStudiesSlider';
import Preloader from '@/components/ui/preloader';
import { useToast } from '@/hooks/use-toast';
import { MotionConfig } from 'framer-motion';
import { useDataService } from '@/lib/db';

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
  }]);

  const settings = siteSettings[0] || {};

  useEffect(() => {
    // SEO için sayfa başlığını güncelle
    document.title = 'Ignite Dijital Pazarlama | Web Geliştirme, SEO ve Dijital Pazarlama Ajansı';
    
    // Karşılama bildirimi
    setTimeout(() => {
      toast({
        title: "Hoş Geldiniz!",
        description: "Ignite Dijital Pazarlama web sitesine hoş geldiniz.",
      });
    }, 2000);
    
    // Meta açıklama ekle
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Ignite Dijital Pazarlama, işletmenizi büyütmek için SEO, sosyal medya, içerik pazarlaması ve web geliştirme hizmetleri sunan lider dijital pazarlama ajansıdır.');
    }
    
    // Analytics izleme
    const analyticsScript = document.createElement('script');
    analyticsScript.innerHTML = `
      // Analytics placeholder
      console.log('Analytics loaded');
      window.trackPageView = function(page) {
        console.log('Page view tracked:', page);
      }
      
      // Track page view
      window.trackPageView('home');
    `;
    document.head.appendChild(analyticsScript);
    
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
    
    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
      document.head.removeChild(analyticsScript);
    };
  }, [toast]);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <Layout>
        <HeroSection />
        <ServicesSection />
        <MarketingToolsSlider />
        {settings.showCaseStudies && <CaseStudiesSlider 
          animationType={settings.caseStudiesAnimationType}
          autoplay={settings.caseStudiesAutoplay}
          interval={settings.caseStudiesInterval}
        />}
        <StatsSection />
        <TestimonialsSection />
        <ContactSection />
      </Layout>
    </MotionConfig>
  );
};

export default Index;
