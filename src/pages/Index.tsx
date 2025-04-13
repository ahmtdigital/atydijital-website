
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
import { useToast } from '@/hooks/use-toast';
import { MotionConfig } from 'framer-motion';

const animations = {
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  },
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        duration: 0.8,
      }
    },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.9 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.8,
      }
    },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        duration: 0.8,
      }
    },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        duration: 0.8,
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
    }, 1500);
    
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
      <Layout>
        <motion.div
          variants={animations.staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={animations.fadeIn}>
            <HeroSection />
          </motion.div>
          
          <motion.div 
            variants={animations.scaleUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ServicesSection />
          </motion.div>
          
          <motion.div 
            variants={animations.slideInLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <MarketingToolsSlider />
          </motion.div>
          
          <motion.div 
            variants={animations.slideInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <CaseStudiesSlider />
          </motion.div>
          
          <motion.div 
            variants={animations.fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <PortfolioSection />
          </motion.div>
          
          <motion.div 
            variants={animations.scaleUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <StatsSection />
          </motion.div>
          
          <motion.div 
            variants={animations.slideInLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <TestimonialsSection />
          </motion.div>
          
          <motion.div 
            variants={animations.fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ContactSection />
          </motion.div>
        </motion.div>
      </Layout>
    </MotionConfig>
  );
};

export default Index;
