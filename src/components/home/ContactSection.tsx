import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ContactSectionProps {
  content?: any;
}

const ContactSection = ({ content }: ContactSectionProps) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Mesajınız Gönderildi!",
        description: "En kısa sürede size dönüş yapacağız.",
      });

      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast({
        title: "Bir Hata Oluştu",
        description: "Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-dark-700">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-4 reveal"
        >
          Bize Ulaşın
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/60 mb-8 reveal"
        >
          Sorularınız mı var? Projeleriniz hakkında konuşmak ister misiniz? Bizimle iletişime geçin!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center justify-center bg-dark-600 rounded-lg p-6 text-white reveal"
          >
            <MapPin className="h-6 w-6 mb-2 text-ignite" />
            <h3 className="font-semibold text-lg mb-1">Adres</h3>
            <p className="text-white/60">Örnek Mah. Örnek Sok. No:42</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col items-center justify-center bg-dark-600 rounded-lg p-6 text-white reveal"
          >
            <Phone className="h-6 w-6 mb-2 text-ignite" />
            <h3 className="font-semibold text-lg mb-1">Telefon</h3>
            <p className="text-white/60">+90 555 555 55 55</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col items-center justify-center bg-dark-600 rounded-lg p-6 text-white reveal"
          >
            <Mail className="h-6 w-6 mb-2 text-ignite" />
            <h3 className="font-semibold text-lg mb-1">E-posta</h3>
            <p className="text-white/60">info@example.com</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex flex-col items-center justify-center bg-dark-600 rounded-lg p-6 text-white reveal"
          >
            <Clock className="h-6 w-6 mb-2 text-ignite" />
            <h3 className="font-semibold text-lg mb-1">Çalışma Saatleri</h3>
            <p className="text-white/60">Pzt-Cum: 09:00 - 18:00</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="max-w-xl mx-auto mt-12 reveal"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Adınız Soyadınız"
                className="w-full bg-dark-500 border-dark-400 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="E-posta Adresiniz"
                className="w-full bg-dark-500 border-dark-400 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Mesajınız"
                className="w-full bg-dark-500 border-dark-400 text-white min-h-[100px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div>
              <Button
                className="w-full bg-ignite hover:bg-ignite-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Mesaj Gönder
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
