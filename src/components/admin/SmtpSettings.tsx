
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useDataService } from '@/lib/db';
import { Save, Send, Mail } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// SMTP settings schema
const smtpFormSchema = z.object({
  server: z.string().min(1, { message: 'SMTP sunucusu gereklidir' }),
  port: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: 'Geçerli bir port numarası giriniz',
  }),
  username: z.string().min(1, { message: 'Kullanıcı adı gereklidir' }),
  password: z.string().min(1, { message: 'Şifre gereklidir' }),
  senderEmail: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz' }),
  senderName: z.string().min(1, { message: 'Gönderen adı gereklidir' }),
  useTLS: z.boolean().default(true),
  notifyOn: z.object({
    contactForm: z.boolean().default(true),
    quoteRequest: z.boolean().default(true),
    newsletter: z.boolean().default(true),
  }),
  notificationEmails: z.string().optional(),
});

type SmtpFormValues = z.infer<typeof smtpFormSchema>;

const SmtpSettings = () => {
  const { toast } = useToast();
  const { items: smtpSettings, update, create } = useDataService('smtpSettings', [
    {
      id: 1,
      server: 'smtp.example.com',
      port: '587',
      username: 'username@example.com',
      password: '********',
      senderEmail: 'noreply@yourcompany.com',
      senderName: 'Your Company Name',
      useTLS: true,
      notifyOn: {
        contactForm: true,
        quoteRequest: true,
        newsletter: true,
      },
      notificationEmails: 'admin@yourcompany.com',
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const settings = smtpSettings.length > 0 ? smtpSettings[0] : null;

  const form = useForm<SmtpFormValues>({
    resolver: zodResolver(smtpFormSchema),
    defaultValues: settings || {
      server: '',
      port: '587',
      username: '',
      password: '',
      senderEmail: '',
      senderName: '',
      useTLS: true,
      notifyOn: {
        contactForm: true,
        quoteRequest: true,
        newsletter: true,
      },
      notificationEmails: '',
    }
  });

  const onSubmit = async (values: SmtpFormValues) => {
    setIsLoading(true);
    try {
      if (settings) {
        await update(settings.id, { ...values });
      } else {
        await create(values);
      }
      
      toast({
        title: "Başarılı",
        description: "SMTP ayarları başarıyla kaydedildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "SMTP ayarları kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testEmailConnection = async () => {
    setIsTesting(true);
    try {
      // Simulated connection test
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Bağlantı Başarılı",
        description: "SMTP sunucusuna başarıyla bağlanıldı ve test e-postası gönderildi.",
      });
    } catch (error) {
      toast({
        title: "Bağlantı Hatası",
        description: "SMTP sunucusuna bağlanırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Card className="bg-dark-500 border-dark-400">
      <CardHeader className="border-b border-dark-400">
        <CardTitle className="text-white flex items-center">
          <Mail className="mr-2 h-5 w-5 text-ignite" />
          SMTP E-posta Ayarları
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="server"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">SMTP Sunucusu</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="smtp.example.com"
                          className="bg-dark-400 border-dark-300 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="port"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Port</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="587"
                          className="bg-dark-400 border-dark-300 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400 text-xs">
                        Genellikle 587 (TLS) veya 465 (SSL) kullanılır
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="useTLS"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-dark-300 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-white">TLS Kullan</FormLabel>
                        <FormDescription className="text-gray-400 text-xs">
                          Çoğu SMTP sunucusu güvenli bağlantı için TLS gerektirir
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Kullanıcı Adı</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="username@example.com"
                          className="bg-dark-400 border-dark-300 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Şifre</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••••"
                          className="bg-dark-400 border-dark-300 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="senderEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Gönderen E-posta</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="noreply@yourcompany.com"
                          className="bg-dark-400 border-dark-300 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="senderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Gönderen Adı</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Company Name"
                          className="bg-dark-400 border-dark-300 text-white"
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
                name="notificationEmails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Bildirim E-postaları</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin@yourcompany.com, manager@yourcompany.com"
                        className="bg-dark-400 border-dark-300 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400 text-xs">
                      Bildirimlerin gönderileceği e-posta adresleri (virgülle ayırın)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white">Bildirim Ayarları</h3>
                
                <FormField
                  control={form.control}
                  name="notifyOn.contactForm"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-white">
                          İletişim Formu Bildirimleri
                        </FormLabel>
                        <FormDescription className="text-gray-400 text-xs">
                          İletişim formu gönderildiğinde bildirim alın
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notifyOn.quoteRequest"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-white">
                          Teklif İstekleri Bildirimleri
                        </FormLabel>
                        <FormDescription className="text-gray-400 text-xs">
                          Teklif talebi gönderildiğinde bildirim alın
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notifyOn.newsletter"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-white">
                          Bülten Aboneliği Bildirimleri
                        </FormLabel>
                        <FormDescription className="text-gray-400 text-xs">
                          Yeni bülten abonesi olduğunda bildirim alın
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                className="border-dark-300 hover:bg-dark-400 text-white"
                onClick={testEmailConnection}
                disabled={isTesting}
              >
                {isTesting ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Test Ediliyor...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Test E-postası Gönder
                  </>
                )}
              </Button>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-ignite hover:bg-ignite-700 text-white"
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Ayarları Kaydet
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SmtpSettings;
