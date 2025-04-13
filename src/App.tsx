
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Schema.org structured data for the organization
const structuredDataScript = {
  __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ignite Pazarlama",
    "url": "https://ignitepazarlama.com",
    "logo": "https://ignitepazarlama.com/images/logo.png",
    "description": "Markanızı dijital dünyada parlatacak stratejiler ve çözümler sunan pazarlama ajansı.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Istanbul",
      "addressRegion": "Istanbul",
      "addressCountry": "TR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-555-123-4567",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.facebook.com/ignitepazarlama",
      "https://www.twitter.com/ignitepazarlama",
      "https://www.instagram.com/ignitepazarlama",
      "https://www.linkedin.com/company/ignitepazarlama"
    ]
  })
};

const App = () => {
  useEffect(() => {
    // Initialize any global scripts or analytics here
    
    // Add animation CSS classes
    document.documentElement.classList.add('js-enabled');
    
    // Detect touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.documentElement.classList.add('is-touch-device');
    }
    
    return () => {
      document.documentElement.classList.remove('js-enabled');
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Add structured data for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={structuredDataScript} />
        
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
