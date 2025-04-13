
import { Link } from 'react-router-dom';
import { BarChart, Globe, TrendingUp, PenTool, Smartphone, Code, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const services = [
  {
    title: 'Dijital Pazarlama',
    description: 'Stratejik kampanyalarla çoklu dijital kanallar üzerinden ölçülebilir sonuçlar elde edin.',
    icon: <BarChart className="h-10 w-10 text-ignite" />,
    link: '/services/dijital-pazarlama'
  },
  {
    title: 'SEO Optimizasyonu',
    description: 'Veri odaklı SEO stratejileriyle görünürlüğünüzü artırın, sıralamaları yükseltin ve trafiği artırın.',
    icon: <Globe className="h-10 w-10 text-ignite" />,
    link: '/services/seo'
  },
  {
    title: 'Sosyal Medya Yönetimi',
    description: 'Topluluklar oluşturan ve marka varlığınızı güçlendiren etkileşimli sosyal medya stratejileri.',
    icon: <TrendingUp className="h-10 w-10 text-ignite" />,
    link: '/services/sosyal-medya'
  },
  {
    title: 'İçerik Üretimi',
    description: 'Marka hikayenizi anlatan ve hedef kitlenizle bağlantı kuran etkileyici içerikler.',
    icon: <PenTool className="h-10 w-10 text-ignite" />,
    link: '/services/icerik-uretimi'
  },
  {
    title: 'Mobil Pazarlama',
    description: 'Hedefli mobil pazarlama ve uygulama tanıtım stratejileriyle müşterilere her yerde ulaşın.',
    icon: <Smartphone className="h-10 w-10 text-ignite" />,
    link: '/services/mobil-pazarlama'
  },
  {
    title: 'Web Geliştirme',
    description: 'Ziyaretçileri müşterilere dönüştürmek için özel, duyarlı web siteleri ve uygulamalar.',
    icon: <Code className="h-10 w-10 text-ignite" />,
    link: '/services/web-gelistirme'
  }
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-dark-600">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-ignite font-semibold mb-3 reveal">HİZMETLERİMİZ</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal">Kapsamlı Dijital Çözümler</h2>
          <p className="text-gray-400 reveal">
            İşletmenizin dijital dünyada büyümesi ve gelişmesi için eksiksiz dijital pazarlama hizmetleri sunuyoruz.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-dark-500 border-dark-400 hover:border-ignite/50 transition-all duration-300 card-hover reveal">
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  {service.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link to={service.link} className="text-ignite hover:text-ignite-400 font-medium flex items-center gap-2 transition-colors">
                  Daha Fazla Bilgi <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center reveal">
          <Button size="lg" className="bg-ignite hover:bg-ignite-700 text-white">
            <Link to="/services">Tüm Hizmetleri Görüntüle</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
