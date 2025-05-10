
import { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    github?: string;
    showInHeader?: boolean;
    showInFooter?: boolean;
  } | null;
}

const Layout = ({ children, socialMedia }: LayoutProps) => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Reveal animation on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const reveal = () => {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', reveal);
    // Initial check
    reveal();
    
    return () => {
      window.removeEventListener('scroll', reveal);
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar socialMedia={socialMedia} />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer socialMedia={socialMedia} />
    </div>
  );
};

export default Layout;
