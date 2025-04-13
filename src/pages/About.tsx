import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle2, Award, Target, Users } from 'lucide-react';

// Team members data
const teamMembers = [
  {
    name: 'Alex Johnson',
    title: 'CEO & Founder',
    bio: 'Digital marketing veteran with 15+ years of experience in building successful campaigns for global brands.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Sarah Chen',
    title: 'Creative Director',
    bio: 'Award-winning creative professional specializing in brand development and visual storytelling.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'Marcus Williams',
    title: 'SEO Specialist',
    bio: 'Search engine optimization expert with a track record of achieving top rankings for competitive keywords.',
    image: 'https://randomuser.me/api/portraits/men/68.jpg'
  },
  {
    name: 'Olivia Rodriguez',
    title: 'Social Media Manager',
    bio: 'Social media strategist who has grown brand accounts from zero to millions of engaged followers.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  {
    name: 'David Kim',
    title: 'Web Developer',
    bio: 'Full-stack developer with expertise in creating responsive, user-friendly websites and applications.',
    image: 'https://randomuser.me/api/portraits/men/94.jpg'
  },
  {
    name: 'Emma Wilson',
    title: 'Content Strategist',
    bio: 'Content specialist with a background in journalism and a passion for storytelling across all platforms.',
    image: 'https://randomuser.me/api/portraits/women/22.jpg'
  }
];

// Values data
const values = [
  {
    icon: <Target className="h-10 w-10 text-ignite" />,
    title: 'Results-Driven',
    description: 'We focus on delivering measurable results that directly impact your business growth and ROI.'
  },
  {
    icon: <Users className="h-10 w-10 text-ignite" />,
    title: 'Client-Centric',
    description: 'Your success is our priority. We build long-term partnerships based on trust and transparency.'
  },
  {
    icon: <Award className="h-10 w-10 text-ignite" />,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from strategy development to execution and reporting.'
  },
  {
    icon: <CheckCircle2 className="h-10 w-10 text-ignite" />,
    title: 'Innovation',
    description: 'We stay ahead of digital trends to bring innovative solutions that give our clients a competitive edge.'
  }
];

const About = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'About Us | Ignite Marketing';
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Ignite Marketing, our experienced team, company values, and our mission to deliver exceptional digital marketing solutions.');
    }
  }, []);

  return (
    <Layout>
      {/* Header */}
      <section className="py-24 bg-dark-600 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-ignite"></div>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-ignite font-semibold mb-4 animate-fade-in">WHO WE ARE</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            About Ignite Marketing
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
            We're a team of digital marketing experts passionate about helping businesses achieve exceptional growth through innovative strategies.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <p className="text-ignite font-semibold mb-3">OUR STORY</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Turning Digital Vision Into Reality</h2>
              <p className="text-gray-300 mb-6">
                Founded in 2015, Ignite Marketing began with a simple mission: to help businesses of all sizes harness the power of digital marketing to achieve their goals.
              </p>
              <p className="text-gray-300 mb-6">
                What started as a small team of passionate marketers has grown into a full-service digital agency with expertise across all aspects of online marketing – from SEO and social media to content creation and web development.
              </p>
              <p className="text-gray-300 mb-6">
                We've helped hundreds of clients across diverse industries transform their digital presence and achieve remarkable growth. Our data-driven approach combined with creative excellence has established us as a trusted partner for businesses looking to thrive in the digital landscape.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="text-ignite mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-300">7+ years of industry experience</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-ignite mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-300">Team of 25+ digital marketing specialists</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-ignite mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-300">500+ successful projects delivered</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-ignite mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-300">Clients across 15+ industries</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden reveal">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=1000&q=80" 
                alt="Ignite Marketing Team" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-60"></div>
              <div className="absolute bottom-8 left-8 max-w-xs">
                <blockquote className="text-white text-lg italic">
                  "Our goal is to ignite growth for our clients through innovative digital strategies that deliver real results."
                </blockquote>
                <p className="text-ignite font-semibold mt-4">- Alex Johnson, Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-dark-600">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-ignite font-semibold mb-3 reveal">OUR VALUES</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal">The Principles That Guide Us</h2>
            <p className="text-gray-300 reveal">
              These core values shape our approach to every project and client relationship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-dark-500 p-8 rounded-xl border border-dark-400 reveal card-hover">
                <div className="mb-5">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-ignite font-semibold mb-3 reveal">OUR TEAM</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal">Meet The Experts</h2>
            <p className="text-gray-300 reveal">
              Our talented team of digital marketing specialists brings diverse expertise and a passion for delivering exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-dark-500 rounded-xl overflow-hidden border border-dark-400 group reveal card-hover">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-ignite font-medium mb-4">{member.title}</p>
                  <p className="text-gray-400">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-dark-600">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-gradient-to-r from-dark-500 to-dark-400 rounded-2xl p-8 md:p-12 shadow-lg border border-dark-300 reveal">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work With Us?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Let's discuss how our team can help you achieve your business goals through innovative digital marketing strategies.
              </p>
              <Button size="lg" className="bg-ignite hover:bg-ignite-700 text-white">
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
