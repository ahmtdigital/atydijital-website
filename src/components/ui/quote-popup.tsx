
import { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface QuotePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuotePopup = ({ open, onOpenChange }: QuotePopupProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Form gönderimi simülasyonu
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Başarılı",
        description: "Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      });
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-dark-500 border-dark-400 p-0 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-ignite/5 via-transparent to-transparent" />
          <DialogHeader className="bg-dark-600 border-b border-dark-400 p-6">
            <DialogTitle className="text-2xl font-bold text-white flex items-center">
              Ücretsiz Teklif Alın
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Hizmetlerimiz hakkında detaylı bilgi ve fiyat teklifi almak için formu doldurun.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Ad Soyad *</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Adınız ve soyadınız"
                  required
                  className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">E-posta Adresi *</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-posta adresiniz"
                  required
                  className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Telefon Numarası</label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefon numaranız"
                  className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="company" className="block text-sm font-medium text-gray-300">Firma Adı</label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Firma adınız"
                  className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="service" className="block text-sm font-medium text-gray-300">İlgilendiğiniz Hizmet *</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-dark-400 border border-dark-300 focus:border-ignite text-white"
              >
                <option value="">Hizmet seçin</option>
                <option value="Dijital Pazarlama">Dijital Pazarlama</option>
                <option value="SEO">SEO Optimizasyonu</option>
                <option value="Sosyal Medya">Sosyal Medya Yönetimi</option>
                <option value="İçerik Üretimi">İçerik Üretimi</option>
                <option value="Web Geliştirme">Web Geliştirme</option>
                <option value="Mobil Uygulama">Mobil Uygulama Geliştirme</option>
                <option value="Grafik Tasarım">Grafik Tasarım</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Mesajınız *</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Projeniz hakkında kısa bir bilgi verin..."
                rows={4}
                required
                className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-dark-300 hover:bg-dark-400"
              >
                <X className="h-4 w-4 mr-2" />
                İptal
              </Button>
              <Button
                type="submit"
                className="bg-ignite hover:bg-ignite-700 text-white"
                disabled={loading}
              >
                {loading ? 'Gönderiliyor...' : 'Teklif İsteyin'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuotePopup;
