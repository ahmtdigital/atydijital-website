
export interface HeroSlide {
  id: number | string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
  isActive?: boolean;
}

// Add interfaces for the components that are used in Index.tsx
export interface SectionContent {
  // Hero section
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  
  // Services section
  servicesTitle?: string;
  servicesSubtitle?: string;
  servicesDescription?: string;
  
  // Portfolio section
  portfolioTitle?: string;
  portfolioSubtitle?: string;
  portfolioDescription?: string;
  
  // Contact section
  contactTitle?: string;
  contactSubtitle?: string;
  contactDescription?: string;
  
  // Any other fields that might be in the content object
  [key: string]: any;
}

export interface HeroSectionProps {
  content?: SectionContent | null;
}

export interface ServicesSectionProps {
  content?: SectionContent | null;
}

export interface ContactSectionProps {
  content?: SectionContent | null;
}

export interface PortfolioSectionProps {
  content?: SectionContent | null;
  projectsPerRow?: number;
  imageHeight?: number;
  showTags?: boolean;
  showCategories?: boolean;
  hoverEffect?: string;
}

export interface CaseStudiesSliderProps {
  animationType?: string;
  autoplay?: boolean;
  interval?: number;
}

export interface MarketingToolsSliderProps {
  // Define props if needed
}
