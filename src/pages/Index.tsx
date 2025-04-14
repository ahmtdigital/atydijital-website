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

  useEffect(() => {
    // Update page title for SEO
    document.title = 'Ignite Dijital Pazarlama | Web Geliştirme, SEO ve Dijital Pazarlama Ajansı';
    
    // Welcome toast notification
    setTimeout(() => {
      toast({
        title: "Hoş Geldiniz!",
        description: "Ignite Dijital Pazarlama web sitesine hoş geldiniz.",
      });
    }, 2000);
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Ignite Dijital Pazarlama, işletmenizi büyütmek için SEO, sosyal medya, içerik pazarlaması ve web geliştirme hizmetleri sunan lider dijital pazarlama ajansıdır.');
    }
    
    // Analytics script for tracking
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
    
    // Reveal animations
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
        <CaseStudiesSlider />
        <PortfolioSection />
        <StatsSection />
        <TestimonialsSection />
        <ContactSection />
      </Layout>
    </MotionConfig>
  );
};

export default Index;
