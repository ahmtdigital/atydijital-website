
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight, CheckCircle, Users, BarChart, Clock } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, MarketingIconCarousel } from '@/components/ui/carousel-with-icons';
import MarketingIcon from '@/components/ui/marketing-icon';

// Hizmet verileri
const serviceData = {
  'dijital-pazarlama': {
    id: 'dijital-pazarlama',
    title: 'Dijital Pazarlama',
    description: 'Çok kanallı dijital pazarlama stratejileri ile markanızı büyütün ve hedef kitlenize ulaşın.',
    longDescription: "Günümüz rekabet ortamında dijital pazarlama, işletmelerin başarısı için kritik öneme sahiptir. Ignite Dijital olarak, markanızı hedef kitlenize ulaştırmak için kapsamlı ve entegre bir dijital pazarlama yaklaşımı sunuyoruz. Stratejik planlama, veri analizi ve yaratıcı içerik üretimi ile işletmenizin online varlığını güçlendirerek daha fazla müşteri edinmenize ve satışlarınızı artırmanıza yardımcı oluyoruz.",
    features: [
      'Pazarlama Stratejisi Geliştirme',
      'Dijital Reklamlar (PPC, Display)',
      'Sosyal Medya Pazarlaması',
      'İçerik Pazarlaması',
      'E-posta Pazarlaması',
      'Arama Motoru Optimizasyonu (SEO)',
      'Kampanya Yönetimi ve Analizi'
    ],
    benefits: [
      'Hedef kitleye daha odaklı erişim',
      'Daha düşük maliyet, daha yüksek ROI',
      'Ölçülebilir sonuçlar ve kampanya optimizasyonu',
      'Marka bilinirliğinde artış',
      'Müşteri sadakatinde gelişme'
    ],
    process: [
      { title: 'Pazar Analizi', description: 'Sektör, rakip ve hedef kitle analizi ile pazarı anlamak' },
      { title: 'Strateji Geliştirme', description: 'İşletme hedeflerinize uygun kapsamlı dijital pazarlama stratejisi oluşturma' },
      { title: 'Kampanya Uygulama', description: 'Çoklu kanallarda dijital pazarlama kampanyalarının hayata geçirilmesi' },
      { title: 'Optimizasyon', description: 'Veri analizine dayalı sürekli kampanya optimizasyonu' },
      { title: 'Raporlama', description: 'Kampanya performansı ve ROI hakkında kapsamlı raporlar ve analiz' }
    ],
    platforms: [
      'google-analytics', 'google-ads', 'meta-ads', 'linkedin-ads', 'tiktok-ads', 'twitter-ads', 'instagram-ads', 'youtube-ads'
    ],
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2031',
      'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2066',
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2068'
    ],
    stats: [
      { label: 'Müşteri Memnuniyeti', value: '98%' },
      { label: 'Ortalama ROI', value: '320%' },
      { label: 'Tamamlanan Proje', value: '145+' }
    ]
  },
  'seo': {
    id: 'seo',
    title: 'SEO Optimizasyonu',
    description: 'Arama motorlarında üst sıralarda yer alın, organik trafiğinizi artırın ve potansiyel müşterilere ulaşın.',
    longDescription: "SEO (Arama Motoru Optimizasyonu), web sitenizin arama motorlarında daha üst sıralarda görünmesini sağlayan bir dijital pazarlama stratejisidir. Ignite Dijital olarak, teknik SEO, içerik optimizasyonu ve bağlantı kurma çalışmalarını içeren kapsamlı bir yaklaşımla web sitenizin arama sonuçlarındaki görünürlüğünü artırıyoruz. Bu sayede daha fazla organik trafik elde ediyor, potansiyel müşterilere ulaşıyor ve dönüşüm oranlarınızı iyileştiriyoruz.",
    features: [
      'Teknik SEO Optimizasyonu',
      'İçerik Stratejisi ve Optimizasyonu',
      'Anahtar Kelime Araştırması',
      'Rakip Analizi',
      'Yerel SEO',
      'Bağlantı Kurma Stratejileri',
      'SEO Uyumlu İçerik Üretimi'
    ],
    benefits: [
      'Organik trafikte artış',
      'Arama motorlarında üst sıralarda yer alma',
      'Marka bilinirliği ve güvenilirliğinde artış',
      'Uzun vadeli ve sürdürülebilir sonuçlar',
      'Ücretli reklamlara göre daha düşük maliyet'
    ],
    process: [
      { title: 'Teknik Analiz', description: 'Web sitenizin teknik yapısının kapsamlı analizi' },
      { title: 'Anahtar Kelime Araştırması', description: 'Sektörünüz ve hedef kitleniz için en etkili anahtar kelimelerin belirlenmesi' },
      { title: 'İçerik Stratejisi', description: 'SEO odaklı içerik planı geliştirme' },
      { title: 'Optimizasyon', description: 'Teknik SEO iyileştirmeleri ve içerik optimizasyonu' },
      { title: 'Takip ve Raporlama', description: 'Sonuçların düzenli takibi ve performans raporlaması' }
    ],
    platforms: [
      'google-analytics', 'google-ads'
    ],
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076',
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2074'
    ],
    stats: [
      { label: 'Ortalama Trafik Artışı', value: '210%' },
      { label: 'İlk Sayfada Sıralama', value: '85%' },
      { label: 'Konversiyon Artışı', value: '75%' }
    ]
  },
  'sosyal-medya': {
    id: 'sosyal-medya',
    title: 'Sosyal Medya Yönetimi',
    description: 'Güçlü bir sosyal medya varlığı oluşturun, hedef kitlenizle etkileşim kurun ve marka bilinirliğinizi artırın.',
    longDescription: "Sosyal medya yönetimi, markanızın çeşitli sosyal platformlarda etkin bir şekilde temsil edilmesini sağlayan stratejik bir yaklaşımdır. Ignite Dijital olarak, her platform için özelleştirilmiş içerik stratejileri geliştiriyor, topluluk yönetimi sağlıyor ve ücretli sosyal medya kampanyaları ile hedef kitlenize ulaşmanıza yardımcı oluyoruz. Bu sayede markanızı güçlendiriyor, müşteri bağlılığını artırıyor ve satışlarınızı destekliyoruz.",
    features: [
      'Sosyal Medya Stratejisi',
      'İçerik Üretimi ve Planlama',
      'Topluluk Yönetimi',
      'Ücretli Sosyal Medya Reklamları',
      'Etkileyici Pazarlaması',
      'Sosyal Medya Analizi',
      'Kriz Yönetimi'
    ],
    benefits: [
      'Marka bilinirliğinde artış',
      'Müşteri sadakati ve bağlılığında gelişme',
      'Hedefli ücretli kampanyalarla yeni müşteri kazanımı',
      'Marka kişiliğinin güçlendirilmesi',
      'Müşteri hizmetleri kanalı olarak kullanım'
    ],
    process: [
      { title: 'Marka ve Rakip Analizi', description: 'Markanızın ve rakiplerinizin sosyal medya varlığının incelenmesi' },
      { title: 'Strateji Geliştirme', description: 'Hedeflerinize uygun sosyal medya stratejisi oluşturma' },
      { title: 'İçerik Planı', description: 'Her platform için özelleştirilmiş içerik takvimi hazırlama' },
      { title: 'Uygulama ve Yönetim', description: 'İçerik paylaşımı, etkileşim yönetimi ve topluluk moderasyonu' },
      { title: 'Analiz ve Raporlama', description: 'Performans takibi ve düzenli raporlama' }
    ],
    platforms: [
      'meta-ads', 'instagram-ads', 'tiktok-ads', 'linkedin-ads', 'twitter-ads'
    ],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2074',
      'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=2074',
      'https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=2074'
    ],
    stats: [
      { label: 'Etkileşim Artışı', value: '175%' },
      { label: 'Takipçi Büyümesi', value: '245%' },
      { label: 'Sosyal Medyadan Satış', value: '68%' }
    ]
  },
  'icerik-uretimi': {
    id: 'icerik-uretimi',
    title: 'İçerik Üretimi',
    description: 'Markanızı güçlendiren, hedef kitlenizle bağlantı kuran ve dönüşüm sağlayan kaliteli içerikler üretin.',
    longDescription: "İçerik üretimi, markanızın hikayesini anlatmanın, değer sunmanın ve hedef kitlenizle bağlantı kurmanın en etkili yollarından biridir. Ignite Dijital olarak, markanızın sesini ve mesajını yansıtan, hedef kitlenize hitap eden ve arama motorlarında üst sıralarda yer almanızı sağlayan kaliteli içerikler üretiyoruz. Blog yazıları, sosyal medya içerikleri, videolar, infografikler ve daha fazlasını kapsayan içerik stratejileri ile markanızı güçlendiriyor ve dönüşüm oranlarınızı artırıyoruz.",
    features: [
      'İçerik Stratejisi Geliştirme',
      'Blog Yazıları',
      'Web Sitesi İçeriği',
      'Sosyal Medya İçerikleri',
      'E-posta Pazarlama İçerikleri',
      'Video İçerikler',
      'İnfografikler ve Görsel İçerikler'
    ],
    benefits: [
      'Arama motorlarında daha iyi sıralama',
      'Marka otoritesinin güçlendirilmesi',
      'Hedef kitle ile daha güçlü bağlantı',
      'Daha yüksek etkileşim oranları',
      'Dönüşüm oranlarında artış'
    ],
    process: [
      { title: 'İçerik Denetimi', description: 'Mevcut içeriklerin analizi ve içerik boşluklarının belirlenmesi' },
      { title: 'Strateji Geliştirme', description: 'Hedeflerinize uygun içerik stratejisi oluşturma' },
      { title: 'İçerik Planı', description: 'İçerik takvimi ve yayın planı hazırlama' },
      { title: 'İçerik Üretimi', description: 'Yüksek kaliteli ve SEO uyumlu içeriklerin hazırlanması' },
      { title: 'Dağıtım ve Promosyon', description: 'İçeriklerin çeşitli kanallarda yayınlanması ve tanıtılması' }
    ],
    platforms: [
      'google-analytics', 'instagram-ads', 'meta-ads'
    ],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070',
      'https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2074'
    ],
    stats: [
      { label: 'İçerik Etkileşim Oranı', value: '67%' },
      { label: 'Organik Trafik Artışı', value: '125%' },
      { label: 'İçerik Dönüşüm Oranı', value: '18%' }
    ]
  }
};

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const service = id ? serviceData[id as keyof typeof serviceData] : null;

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Ignite Dijital Pazarlama`;
      
      // Add meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', service.description);
      }
    }
    
    // Reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [service]);

  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Hizmet bulunamadı</h1>
          <p className="text-gray-400 mb-8">Aradığınız hizmet mevcut değil veya kaldırılmış olabilir.</p>
          <Button className="bg-ignite hover:bg-ignite-700 text-white">
            <Link to="/services">Tüm Hizmetlere Dön</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 to-dark/90 z-10"></div>
        <img 
          src={service.image} 
          alt={service.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center text-sm text-gray-300 mb-4">
                <Link to="/" className="hover:text-ignite transition-colors">Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <Link to="/services" className="hover:text-ignite transition-colors">Hizmetler</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-ignite">{service.title}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                {service.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
                {service.description}
              </p>
              <Button className="bg-ignite hover:bg-ignite-700 text-white animate-fade-in" style={{animationDelay: '0.4s'}}>
                <Link to="/contact" className="flex items-center">
                  Ücretsiz Danışmanlık Alın <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8 reveal">
              <h2 className="text-3xl font-bold">Hizmet Detayları</h2>
              <p className="text-gray-300">{service.longDescription}</p>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Hizmet Kapsamı</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ignite shrink-0 mt-0.5 mr-3" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Faydalar</h3>
                <div className="grid grid-cols-1 gap-3">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ignite shrink-0 mt-0.5 mr-3" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-dark-500 rounded-xl p-8 border border-dark-400 reveal" style={{animationDelay: '0.2s'}}>
                <h3 className="text-xl font-bold mb-6">Çalışma Süreci</h3>
                <div className="space-y-6">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-ignite text-white">
                          {index + 1}
                        </div>
                        {index < service.process.length - 1 && (
                          <div className="w-0.5 h-full ml-4 bg-dark-400"></div>
                        )}
                      </div>
                      <div className="pb-6">
                        <h4 className="font-bold mb-1">{step.title}</h4>
                        <p className="text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal" style={{animationDelay: '0.3s'}}>
                {service.stats.map((stat, index) => (
                  <div key={index} className="bg-dark-500 rounded-xl p-6 border border-dark-400 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-ignite/10 text-ignite mb-4">
                      {index === 0 && <Users className="h-6 w-6" />}
                      {index === 1 && <BarChart className="h-6 w-6" />}
                      {index === 2 && <Clock className="h-6 w-6" />}
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <p className="text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Platforms Section */}
      <section className="py-20 bg-dark-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 reveal">
            <h2 className="text-3xl font-bold mb-4">Kullandığımız Platformlar</h2>
            <p className="text-gray-300">
              İşinizi büyütmek için sektördeki en son teknolojileri ve platformları kullanıyoruz.
            </p>
          </div>
          
          <div className="reveal" style={{animationDelay: '0.2s'}}>
            <MarketingIconCarousel icons={service.platforms} />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 reveal">
            <h2 className="text-3xl font-bold mb-4">Çalışmalarımızdan Örnekler</h2>
            <p className="text-gray-300">
              Başarıyla tamamladığımız projelerden bazı örnekler.
            </p>
          </div>
          
          <div className="reveal" style={{animationDelay: '0.2s'}}>
            <Carousel className="w-full">
              <CarouselContent>
                {service.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 h-[500px]">
                      <img 
                        src={image} 
                        alt={`${service.title} - Örnek ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 md:-left-12" />
              <CarouselNext className="-right-4 md:-right-12" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dark-600">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-gradient-to-r from-dark-500 to-dark-400 rounded-2xl p-8 md:p-12 shadow-lg border border-dark-300 reveal">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">İşletmenizi Büyütmeye Hazır mısınız?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Uzman ekibimizle çalışarak dijital varlığınızı güçlendirin ve hedeflerinize ulaşın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-ignite hover:bg-ignite-700 text-white">
                  <Link to="/contact" className="flex items-center">
                    Hemen İletişime Geçin <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-ignite text-ignite hover:bg-ignite/10">
                  <Link to="/portfolio">Projelerimizi İnceleyin</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
