
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactSectionProps {
  content?: {
    contactTitle?: string;
    contactSubtitle?: string;
    contactDescription?: string;
  } | null;
}

const ContactSection = ({ content }: ContactSectionProps) => {
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
        title: "Mesaj Gönderildi!",
        description: "En kısa sürede size geri dönüş yapacağız.",
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
      <div className="absolute bottom-0 left-0 w-full h-1 bg-ignite"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-dark-500 rounded-2xl p-8 md:p-12 shadow-lg border border-dark-400 reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-ignite font-semibold mb-3">{content?.contactTitle || 'İLETİŞİME GEÇİN'}</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{content?.contactSubtitle || 'Dijital Başarı Yolculuğunuza Hazır Mısınız?'}</h2>
              <p className="text-gray-300 mb-8">
                {content?.contactDescription || 'Projelerinizi ve hedeflerinizi bizimle paylaşın. Size özel çözümlerle işletmenizi büyütmeye hazırız.'}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 bg-ignite/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-ignite" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">E-posta</h4>
                    <p className="text-gray-400">info@atydigital.com.tr</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 bg-ignite/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-ignite" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Telefon</h4>
                    <p className="text-gray-400">+90 (212) 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 bg-ignite/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-ignite" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Ofis</h4>
                    <p className="text-gray-400">Barbaros Bulvarı No:123, Beşiktaş, İstanbul</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    İsim
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adınız"
                    required
                    className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    E-posta
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@sirketiniz.com"
                    required
                    className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                    Şirket
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Şirketinizin adı"
                    className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Mesaj
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Projenizle ilgili bilgileri paylaşın..."
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
                  {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
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
