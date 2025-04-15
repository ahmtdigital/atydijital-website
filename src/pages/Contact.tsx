
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, ArrowRight, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

// SSS Verileri
const faqs = [
  {
    question: 'Ignite Marketing hangi hizmetleri sunuyor?',
    answer: 'SEO, sosyal medya yönetimi, içerik oluşturma, web geliştirme, PPC reklamcılık, e-posta pazarlama, analitik ve daha fazlasını içeren kapsamlı bir dijital pazarlama hizmetleri yelpazesi sunuyoruz.'
  },
  {
    question: 'Hizmetlerinizin maliyeti nedir?',
    answer: 'Fiyatlandırmamız, belirli ihtiyaçlarınıza ve hedeflerinize göre özelleştirilmiştir. Farklı paketler sunuyoruz ve bütçenize uygun özel bir çözüm yaratabiliriz. Ücretsiz danışmanlık ve fiyat teklifi için bizimle iletişime geçin.'
  },
  {
    question: 'Sonuçları görmek ne kadar sürer?',
    answer: "Sonuçlar, hizmete ve başlangıç noktanıza bağlı olarak değişir. SEO genellikle önemli sonuçlar göstermek için 3-6 ay sürer, PPC ve sosyal medya reklamcılığı anında trafik oluşturabilir. Danışmanlık sırasında, belirli hedefleriniz için gerçekçi zaman çizelgeleri sunacağız."
  },
  {
    question: 'Uluslararası müşterilerle çalışıyor musunuz?',
    answer: 'Evet, global olarak müşterilerle çalışıyoruz. Ekibimiz, çeşitli pazarlar için dijital pazarlama stratejileri oluşturma konusunda deneyimlidir ve yaklaşımımızı, konumundan bağımsız olarak hedef kitlenize uyacak şekilde uyarlayabiliriz.'
  },
  {
    question: 'Belirli bir projeye yardımcı olabilir misiniz yoksa yalnızca devam eden hizmetler mi sunuyorsunuz?',
    answer: 'Hem proje bazlı çalışma hem de devam eden hizmetler sunuyoruz. İster bir web sitesi yenileme, tek seferlik bir kampanya veya sürekli pazarlama desteği ihtiyacınız olsun, ihtiyaçlarınızı karşılayabiliriz.'
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
    // SEO için sayfa başlığı ve meta açıklamasını güncelle
    document.title = 'İletişim | Ignite Marketing';
    
    // Meta açıklama ekle
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Tüm dijital pazarlama ihtiyaçlarınız için Ignite Marketing ile iletişime geçin. Ücretsiz danışmanlık ve fiyat teklifi için bugün bize ulaşın.');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Form gönderimi simülasyonu
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Mesaj Gönderildi!",
        description: "Bizimle iletişime geçtiğiniz için teşekkürler. 24 saat içinde sorunuza cevap vereceğiz.",
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
          <p className="text-ignite font-semibold mb-4 animate-fade-in">BİZE ULAŞIN</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            İletişim
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
            Sorunuz mu var veya bir sonraki projenize başlamaya hazır mısınız? Ücretsiz danışmanlık için ekibimizle iletişime geçin.
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
                <h2 className="text-2xl font-bold mb-6">İletişim Bilgileri</h2>
                <p className="text-gray-300 mb-8">
                  Formu doldurun veya aşağıdaki bilgileri kullanarak doğrudan bizimle iletişime geçin.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 bg-ignite/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-ignite" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">E-posta</h4>
                      <p className="text-gray-400">info@ignitemarketing.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 bg-ignite/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-ignite" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Telefon</h4>
                      <p className="text-gray-400">+90 (555) 123 4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 bg-ignite/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-ignite" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Ofis</h4>
                      <p className="text-gray-400">Dijital Pazarlama Caddesi No:123, İstanbul, 34000</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 bg-ignite/10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-ignite" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Çalışma Saatleri</h4>
                      <p className="text-gray-400">Pazartesi - Cuma: 09:00 - 18:00</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-dark-300">
                  <h4 className="font-semibold text-white mb-4">Bizi Takip Edin</h4>
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
                <h2 className="text-2xl font-bold mb-6">Bize Mesaj Gönderin</h2>
                <p className="text-gray-300 mb-8">
                  Projeniz ve hedefleriniz hakkında bilgi verin. Size özel bir çözümle geri dönüş yapacağız.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Ad Soyad *
                      </label>
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
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        E-posta Adresi *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e-posta@adresiniz.com"
                        required
                        className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                        Telefon Numarası
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Telefon numaranız"
                        className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                        Firma Adı
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Firmanızın adı"
                        className="bg-dark-400 border-dark-300 focus:border-ignite text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
                      İlgilendiğiniz Hizmet *
                    </label>
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
                      <option value="PPC">PPC Reklamcılık</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Mesajınız *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Projeniz ve hedefleriniz hakkında bilgi verin..."
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
                    {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
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
            <p className="text-ignite font-semibold mb-3 reveal">SSS</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal">Sıkça Sorulan Sorular</h2>
            <p className="text-gray-300 reveal">
              Hizmetlerimiz hakkında en sık sorulan soruların cevaplarını bulun.
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
                Aradığınız cevabı bulamadınız mı?
              </p>
              <Button className="bg-ignite hover:bg-ignite-700 text-white">
                <Link to="/contact" className="flex items-center">
                  Ekibimizle İletişime Geçin <ArrowRight className="ml-2 h-4 w-4" />
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
