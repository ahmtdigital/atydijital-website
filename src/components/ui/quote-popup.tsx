
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface QuotePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Ad soyad en az 2 karakter olmalıdır' }),
  email: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz' }),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, { message: 'Lütfen bir hizmet seçiniz' }),
  message: z.string().min(10, { message: 'Mesajınız en az 10 karakter olmalıdır' }),
});

type FormValues = z.infer<typeof formSchema>;

const QuotePopup = ({ open, onOpenChange }: QuotePopupProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { items: services } = useDataService('services', []);
  const { items: smtpSettings } = useDataService('smtpSettings', []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
    },
  });

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    
    try {
      // Simulate sending data to the server
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if we have SMTP settings configured
      const hasSmtpConfig = smtpSettings.length > 0;
      
      if (hasSmtpConfig) {
        console.log("Sending quote request via SMTP with settings:", smtpSettings[0]);
        console.log("Form data:", data);
        // In a real app, this would send the form data via an API that uses the SMTP configuration
      } else {
        console.log("No SMTP configuration found. Form data:", data);
        // Form data would be saved to database only in this case
      }
      
      toast({
        title: "Başarılı",
        description: "Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Formunuz gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Ad Soyad *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Adınız ve soyadınız"
                          className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">E-posta Adresi *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="E-posta adresiniz"
                          className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Telefon Numarası</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Telefon numaranız"
                          className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Firma Adı</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Firma adınız"
                          className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">İlgilendiğiniz Hizmet *</FormLabel>
                    <FormControl>
                      <select
                        className="w-full px-4 py-2 rounded-md bg-dark-400 border border-dark-300 focus:border-ignite text-white"
                        {...field}
                      >
                        <option value="">Hizmet seçin</option>
                        {services && services.length > 0 ? (
                          services.map((service: any) => (
                            <option key={service.id} value={service.title || service.name}>
                              {service.title || service.name}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="Dijital Pazarlama">Dijital Pazarlama</option>
                            <option value="SEO">SEO Optimizasyonu</option>
                            <option value="Sosyal Medya">Sosyal Medya Yönetimi</option>
                            <option value="İçerik Üretimi">İçerik Üretimi</option>
                            <option value="Web Geliştirme">Web Geliştirme</option>
                            <option value="Mobil Uygulama">Mobil Uygulama Geliştirme</option>
                            <option value="Grafik Tasarım">Grafik Tasarım</option>
                            <option value="Diğer">Diğer</option>
                          </>
                        )}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Mesajınız *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Projeniz hakkında kısa bir bilgi verin..."
                        rows={4}
                        className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
                  {loading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      Gönderiliyor...
                    </>
                  ) : 'Teklif İsteyin'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuotePopup;
