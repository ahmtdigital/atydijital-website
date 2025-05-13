
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart, Globe, TrendingUp, PenTool, Smartphone, Code, LineChart, Users, Target, Search, Monitor, Briefcase } from 'lucide-react';

const services = [
  {
    title: 'Performans Pazarlama',
    description: 'Birden çok dijital kanal aracılığıyla ölçülebilir sonuçlar veren stratejik kampanyalar. Hedef kitlenizle bağlantı kuran ve dönüşümleri artıran özelleştirilmiş pazarlama planları oluşturuyoruz.',
    icon: <BarChart className="h-12 w-12 text-ignite" />,
    link: '/services/performans-pazarlama'
  },
  {
    title: 'SEO Optimizasyonu',
    description: 'Görünürlüğünüzü artıran, sıralamaları iyileştiren ve trafiği artıran veri odaklı SEO stratejileri. Teknik ve içerik optimizasyon yaklaşımlarımız arama motorlarında daha üst sıralarda yer almanıza yardımcı olur.',
    icon: <Globe className="h-12 w-12 text-ignite" />,
    link: '/services/seo'
  },
  {
    title: 'Sosyal Medya Yönetimi',
    description: 'Topluluklar oluşturan ve marka varlığınızı güçlendiren ilgi çekici sosyal stratejiler. Sosyal profillerinizi yönetiyor, içerik oluşturuyor ve kitlenizle etkileşim kuruyoruz.',
    icon: <TrendingUp className="h-12 w-12 text-ignite" />,
    link: '/services/sosyal-medya'
  },
  {
    title: 'İçerik Oluşturma',
    description: 'Marka hikayenizi anlatan ve hedef kitlenizle bağlantı kuran ilgi çekici içerikler. Blog yazılarından videolara, rezonans uyandıran ve dönüşüm sağlayan içerikler oluşturuyoruz.',
    icon: <PenTool className="h-12 w-12 text-ignite" />,
    link: '/services/icerik'
  },
  {
    title: 'Mobil Pazarlama',
    description: 'Hedefli mobil pazarlama ve uygulama tanıtım stratejileriyle müşterilere her yerde ulaşın. Mobil öncelikli yaklaşımımız, markanızın kullanıcılarla her nerede olurlarsa olsunlar bağlantı kurmasını sağlar.',
    icon: <Smartphone className="h-12 w-12 text-ignite" />,
    link: '/services/mobil-pazarlama'
  },
  {
    title: 'Web Geliştirme',
    description: 'Ziyaretçileri müşterilere dönüştürmek için özel, duyarlı web siteleri ve uygulamalar. Markanız ve işletme hedeflerinizle uyumlu dijital deneyimler yaratıyoruz.',
    icon: <Code className="h-12 w-12 text-ignite" />,
    link: '/services/web-gelistirme'
  },
  {
    title: 'Analitik ve Raporlama',
    description: 'Performansı takip etmek ve dijital pazarlama stratejilerinizi maksimum ROI için optimize etmek amacıyla kapsamlı veri analizi ve düzenli raporlama.',
    icon: <LineChart className="h-12 w-12 text-ignite" />,
    link: '/services/analitik-raporlama'
  },
  {
    title: 'Influencer Pazarlama',
    description: 'Erişiminizi genişletmek ve yeni kitlelerle otantik ortaklıklar yoluyla güvenilirlik oluşturmak için ilgili etkileyicilerle bağlantı kurun.',
    icon: <Users className="h-12 w-12 text-ignite" />,
    link: '/services/influencer-pazarlama'
  },
  {
    title: 'Google Ads & PPC',
    description: 'Ölçülebilir sonuçlarla anında trafik ve dönüşüm sağlamak için arama motorları ve sosyal platformlarda hedefli tıklama başına ödeme kampanyaları.',
    icon: <Target className="h-12 w-12 text-ignite" />,
    link: '/services/google-ads-ppc'
  },
  {
    title: 'Yerel SEO',
    description: 'Yerel arama sonuçlarında görünürlüğünüzü artırmak ve yakındaki müşterileri işletmenize çekmek için özel optimizasyon stratejileri.',
    icon: <Search className="h-12 w-12 text-ignite" />,
    link: '/services/yerel-seo'
  },
  {
    title: 'UI/UX Tasarım',
    description: 'Kullanıcı deneyimini ve dönüşüm oranlarını artırmak için web siteleri ve uygulamalar için sezgisel, ilgi çekici arayüzler oluşturan kullanıcı merkezli tasarım hizmetleri.',
    icon: <Monitor className="h-12 w-12 text-ignite" />,
    link: '/services/ui-ux-tasarim'
  },
  {
    title: 'Marka Stratejisi',
    description: 'Tutarlı ve akılda kalıcı bir marka oluşturmak için konumlandırma, mesajlaşma, görsel kimlik ve yönergeler dahil olmak üzere kapsamlı marka geliştirme hizmetleri.',
    icon: <Briefcase className="h-12 w-12 text-ignite" />,
    link: '/services/marka-stratejisi'
  }
];

const Services = () => {
  useEffect(() => {
    // SEO için sayfa başlığı ve meta açıklamasını güncelle
    document.title = 'Hizmetlerimiz | ATY Digital';
    
    // Meta açıklama ekle
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'SEO, sosyal medya yönetimi, içerik oluşturma, web geliştirme ve daha fazlası dahil olmak üzere kapsamlı performans pazarlama hizmetlerimizi keşfedin.');
    }
  }, []);

  return (
    <Layout>
      {/* Header */}
      <section className="py-24 bg-dark-600 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ignite-500 to-ignite"></div>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-ignite font-semibold mb-4 animate-fade-in">UZMANLIĞIMIZ</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in text-white" style={{animationDelay: '0.2s'}}>
            Kapsamlı Performans Pazarlama Hizmetleri
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
            SEO'dan sosyal medyaya, içerik oluşturmadan web geliştirmeye kadar markanızı çevrimiçi büyütmek için uçtan uca çözümler sunuyoruz.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-dark-500 border-dark-400 hover:border-ignite/50 transition-all duration-300 card-hover reveal">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-2xl font-bold text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-200">
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
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-dark-600">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-gradient-to-r from-dark-500 to-dark-400 rounded-2xl p-8 md:p-12 shadow-lg border border-dark-300 reveal">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">İşletmenizi Büyütmeye Hazır mısınız?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Hizmetlerimizin işletme hedeflerinize ulaşmanıza ve ölçülebilir sonuçlar elde etmenize nasıl yardımcı olabileceğini tartışalım.
              </p>
              <Button size="lg" className="bg-ignite hover:bg-ignite-700 text-white">
                <Link to="/contact">Ücretsiz Danışmanlık Alın</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
