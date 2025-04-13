
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, ArrowRight, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

// FAQ data
const faqs = [
  {
    question: 'What services does Ignite Marketing offer?',
    answer: 'We offer a comprehensive range of digital marketing services including SEO, social media management, content creation, web development, PPC advertising, email marketing, analytics, and more.'
  },
  {
    question: 'How much do your services cost?',
    answer: 'Our pricing is customized based on your specific needs and goals. We offer different packages and can create a tailored solution that fits your budget. Contact us for a free consultation and quote.'
  },
  {
    question: 'How long does it take to see results?',
    answer: "Results vary depending on the service and your starting point. SEO typically takes 3-6 months to show significant results, while PPC and social media advertising can generate immediate traffic. During our consultation, we'll provide realistic timelines for your specific goals."
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes, we work with clients globally. Our team is experienced in creating digital marketing strategies for various markets and can adapt our approach to suit your target audience, regardless of location.'
  },
  {
    question: 'Can you help with a specific project or do you only offer ongoing services?',
    answer: 'We offer both project-based work and ongoing services. Whether you need a website redesign, a one-time campaign, or continuous marketing support, we can accommodate your needs.'
  }
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'Contact Us | Ignite Marketing';
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get in touch with Ignite Marketing for all your digital marketing needs. Contact us today for a free consultation and quote.');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll respond to your inquiry within 24 hours.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-24 bg-dark-600 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ignite to-ignite-500"></div>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-ignite font-semibold mb-4 animate-fade-in">GET IN TOUCH</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
            Have a question or ready to start your next project? Reach out to our team for a free consultation.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-dark-500 rounded-xl p-8 border border-dark-400 h-full reveal">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-gray-300 mb-8">
                  Fill out the form or contact us directly using the information below.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 bg-ignite/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-ignite" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <p className="text-gray-400">info@ignitemarketing.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 bg-ignite/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-ignite" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Phone</h4>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 bg-ignite/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-ignite" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Office</h4>
                      <p className="text-gray-400">123 Marketing St, Digital City, 10001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 bg-ignite/10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-ignite" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Business Hours</h4>
                      <p className="text-gray-400">Monday - Friday: 9am - 6pm</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-dark-300">
                  <h4 className="font-semibold text-white mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-dark-400 p-2 rounded-full hover:bg-ignite/20 transition-colors">
                      <Instagram className="h-5 w-5 text-white" />
                    </a>
                    <a href="#" className="bg-dark-400 p-2 rounded-full hover:bg-ignite/20 transition-colors">
                      <Twitter className="h-5 w-5 text-white" />
                    </a>
                    <a href="#" className="bg-dark-400 p-2 rounded-full hover:bg-ignite/20 transition-colors">
                      <Facebook className="h-5 w-5 text-white" />
                    </a>
                    <a href="#" className="bg-dark-400 p-2 rounded-full hover:bg-ignite/20 transition-colors">
                      <Linkedin className="h-5 w-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-dark-500 rounded-xl p-8 border border-dark-400 reveal">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <p className="text-gray-300 mb-8">
                  Tell us about your project and goals. We'll get back to you with a tailored solution.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@company.com"
                        required
                        className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                        Company
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
                      Service You're Interested In *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md bg-dark-400 border border-dark-300 focus:border-ignite text-white"
                    >
                      <option value="">Select a service</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="SEO">SEO Optimization</option>
                      <option value="Social Media">Social Media Management</option>
                      <option value="Content Creation">Content Creation</option>
                      <option value="Web Development">Web Development</option>
                      <option value="PPC">PPC Advertising</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project and goals..."
                      rows={4}
                      required
                      className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto bg-ignite hover:bg-ignite-700 text-white"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-dark-600">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-ignite font-semibold mb-3 reveal">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal">Frequently Asked Questions</h2>
            <p className="text-gray-300 reveal">
              Find answers to some of the most common questions about our services.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-dark-500 rounded-xl p-6 border border-dark-400 reveal">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 reveal">
              <p className="text-gray-300 mb-4">
                Can't find the answer you're looking for?
              </p>
              <Button className="bg-ignite hover:bg-ignite-700 text-white">
                <Link to="/contact" className="flex items-center">
                  Contact Our Team <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
