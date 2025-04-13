
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart, Globe, TrendingUp, PenTool, Smartphone, Code, LineChart, Users, Target, Search, Monitor, Briefcase } from 'lucide-react';

const services = [
  {
    title: 'Digital Marketing',
    description: 'Strategic campaigns that deliver measurable results through multiple digital channels. We create customized marketing plans that connect with your target audience and drive conversions.',
    icon: <BarChart className="h-12 w-12 text-ignite" />,
    link: '/services/digital-marketing'
  },
  {
    title: 'SEO Optimization',
    description: 'Boost your visibility with data-driven SEO strategies that improve rankings and drive traffic. Our technical and content optimization approaches help you rank higher on search engines.',
    icon: <Globe className="h-12 w-12 text-ignite" />,
    link: '/services/seo'
  },
  {
    title: 'Social Media Management',
    description: 'Engaging social strategies that build communities and strengthen your brand presence. We manage your social profiles, create content, and engage with your audience.',
    icon: <TrendingUp className="h-12 w-12 text-ignite" />,
    link: '/services/social-media'
  },
  {
    title: 'Content Creation',
    description: 'Compelling content that tells your brand story and connects with your target audience. From blog posts to videos, we create content that resonates and converts.',
    icon: <PenTool className="h-12 w-12 text-ignite" />,
    link: '/services/content'
  },
  {
    title: 'Mobile Marketing',
    description: 'Reach customers on the go with targeted mobile marketing and app promotion strategies. Our mobile-first approach ensures your brand connects with users wherever they are.',
    icon: <Smartphone className="h-12 w-12 text-ignite" />,
    link: '/services/mobile-marketing'
  },
  {
    title: 'Web Development',
    description: 'Custom, responsive websites and applications built to convert visitors into customers. We create digital experiences that align with your brand and business goals.',
    icon: <Code className="h-12 w-12 text-ignite" />,
    link: '/services/web-development'
  },
  {
    title: 'Analytics & Reporting',
    description: 'Comprehensive data analysis and regular reporting to track performance and optimize your digital marketing strategies for maximum ROI.',
    icon: <LineChart className="h-12 w-12 text-ignite" />,
    link: '/services/analytics'
  },
  {
    title: 'Influencer Marketing',
    description: 'Connect with relevant influencers to expand your reach and build credibility with new audiences through authentic partnerships.',
    icon: <Users className="h-12 w-12 text-ignite" />,
    link: '/services/influencer-marketing'
  },
  {
    title: 'PPC Advertising',
    description: 'Targeted pay-per-click campaigns across search engines and social platforms to drive immediate traffic and conversions with measurable results.',
    icon: <Target className="h-12 w-12 text-ignite" />,
    link: '/services/ppc'
  },
  {
    title: 'Local SEO',
    description: 'Specialized optimization strategies to improve your visibility in local search results and attract nearby customers to your business.',
    icon: <Search className="h-12 w-12 text-ignite" />,
    link: '/services/local-seo'
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design services that create intuitive, engaging interfaces for websites and applications to enhance user experience and conversion rates.',
    icon: <Monitor className="h-12 w-12 text-ignite" />,
    link: '/services/ui-ux-design'
  },
  {
    title: 'Brand Strategy',
    description: 'Comprehensive brand development services including positioning, messaging, visual identity, and guidelines to build a cohesive and memorable brand.',
    icon: <Briefcase className="h-12 w-12 text-ignite" />,
    link: '/services/brand-strategy'
  }
];

const Services = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'Our Services | Ignite Marketing';
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our comprehensive digital marketing services including SEO, social media management, content creation, web development, and more.');
    }
  }, []);

  return (
    <Layout>
      {/* Header */}
      <section className="py-24 bg-dark-600 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ignite-500 to-ignite"></div>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-ignite font-semibold mb-4 animate-fade-in">OUR EXPERTISE</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Comprehensive Digital Marketing Services
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
            From SEO to social media, content creation to web development, we offer end-to-end solutions to grow your brand online.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-dark-500 border-dark-400 hover:border-ignite/50 transition-all duration-300 card-hover reveal">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link to={service.link} className="text-ignite hover:text-ignite-400 font-medium flex items-center gap-2 transition-colors">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-dark-600">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-gradient-to-r from-dark-500 to-dark-400 rounded-2xl p-8 md:p-12 shadow-lg border border-dark-300 reveal">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Grow Your Business?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Let's discuss how our services can help you achieve your business goals and drive measurable results.
              </p>
              <Button size="lg" className="bg-ignite hover:bg-ignite-700 text-white">
                <Link to="/contact">Get a Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
