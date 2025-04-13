import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <section className="py-20 bg-dark relative">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-ignite"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-dark-500 rounded-2xl p-8 md:p-12 shadow-lg border border-dark-400 reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-ignite font-semibold mb-3">GET IN TOUCH</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ignite Your Digital Success?</h2>
              <p className="text-gray-300 mb-8">
                Tell us about your project and goals. We'll get back to you with a tailored solution that meets your business needs.
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
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
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
                    Email
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
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={4}
                    required
                    className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-ignite hover:bg-ignite-700 text-white"
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
  );
};

export default ContactSection;
