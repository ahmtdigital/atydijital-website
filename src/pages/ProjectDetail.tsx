
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ChevronRight, Clock, User, ArrowRight } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext 
} from '@/components/ui/carousel-with-icons';

// Project data
const projectData = {
  'ecommerce-rebranding': {
    id: 'ecommerce-rebranding',
    title: 'E-Ticaret Marka Yenileme',
    client: 'FashionTurk',
    category: 'E-Ticaret',
    date: 'Kasım 2023',
    duration: '3 ay',
    description: 'FashionTurk e-ticaret markası için kapsamlı bir marka yenileme ve dijital pazarlama kampanyası.',
    longDescription: "FashionTurk, Türkiye'nin önde gelen moda e-ticaret platformlarından biridir. Artan rekabet ortamında markalarını yenilemek ve dijital pazarlama stratejilerini güçlendirmek için ajansımızla çalışmaya başladılar. Kapsamlı bir marka yenileme süreci, SEO optimizasyonu ve sosyal medya kampanyaları ile satışlarını %150 artırmalarına yardımcı olduk.",
    challenge: 'Yoğun rekabet ortamında marka kimliğini güçlendirerek ve dijital pazarlama stratejilerini optimize ederek e-ticaret satışlarını artırmak.',
    solution: 'Marka kimliğini yenileyerek daha modern bir görünüm kazandırdık. SEO stratejilerini optimize ederek organik trafiği artırdık. Hedefli sosyal medya kampanyaları ile yeni müşteriler kazandırdık ve dönüşüm oranlarını iyileştirdik.',
    results: [
      'Organik trafik %80 arttı',
      'Sosyal medya takipçileri %120 büyüdü',
      'Dönüşüm oranları %35 iyileşti',
      'Toplam satışlar %150 artış gösterdi',
      'Marka bilinirliği %70 yükseldi'
    ],
    services: ['SEO Optimizasyonu', 'Sosyal Medya Yönetimi', 'İçerik Üretimi', 'Web Geliştirme', 'Marka Stratejisi'],
    testimonial: {
      text: "Ignite Dijital Pazarlama ekibi ile çalışmak, markamızı dönüştürmek için attığımız en önemli adımlardan biriydi. Profesyonel yaklaşımları, stratejik düşünce tarzları ve yaratıcı çözümleri ile beklentilerimizin ötesine geçtiler. Satışlarımızdaki artış, yatırımımızın değerini açıkça ortaya koyuyor.",
      author: 'Ayşe Yılmaz',
      position: 'FashionTurk Pazarlama Direktörü'
    },
    images: [
      'https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070',
      'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070',
      'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2070',
      'https://images.unsplash.com/photo-1607083208577-17fea9ee2a0d?q=80&w=2070'
    ]
  },
  'seo-kampanyasi': {
    id: 'seo-kampanyasi',
    title: 'SEO Optimizasyon Kampanyası',
    client: 'TeknoMarket',
    category: 'SEO',
    date: 'Eylül 2023',
    duration: '6 ay',
    description: 'TeknoMarket için arama motorlarında üst sıralarda yer almayı hedefleyen kapsamlı bir SEO stratejisi.',
    longDescription: "TeknoMarket, Türkiye'nin önde gelen elektronik perakende zincirlerinden biridir. Dijital varlıklarını güçlendirmek ve web sitelerinin arama motorlarında daha üst sıralarda yer almasını sağlamak için kapsamlı bir SEO stratejisi geliştirdik. Teknik SEO iyileştirmeleri, içerik stratejisi ve bağlantı kurma çalışmalarıyla organik trafiklerini önemli ölçüde artırdık.",
    challenge: 'Yüksek rekabetli elektronik perakende sektöründe web sitesinin arama motorlarında görünürlüğünü artırmak ve nitelikli trafik çekmek.',
    solution: 'Kapsamlı bir teknik SEO analizi gerçekleştirerek site yapısını optimize ettik. Anahtar kelime araştırması ile hedef kitlenin arama alışkanlıklarını belirledik. İçerik stratejisi geliştirerek bilgilendirici ve değerli içerikler ürettik. Kaliteli backlink kazanım stratejileri ile site otoritesini güçlendirdik.',
    results: [
      'Organik trafik %210 arttı',
      'Anahtar kelimelerde birinci sayfada sıralama oranı %75 yükseldi',
      'Site yükleme hızı %40 iyileşti',
      'Organik trafikten gelen dönüşüm oranları %45 artış gösterdi',
      'Arama motoru sıralamaları ortalama 15 pozisyon yükseldi'
    ],
    services: ['Teknik SEO', 'İçerik Stratejisi', 'Anahtar Kelime Araştırması', 'Backlink Stratejisi', 'SEO Analitik'],
    testimonial: {
      text: "Ignite Dijital ekibi ile yaptığımız SEO çalışmaları sayesinde web sitemiz artık arama motorlarında çok daha üst sıralarda yer alıyor. Organik trafiğimizdeki artış, doğrudan satışlarımıza da olumlu yansıdı. Teknik bilgileri çok iyi bir şekilde anlayıp, işimize özel stratejiler geliştirmeleri bizi çok etkiledi.",
      author: 'Mehmet Kaya',
      position: 'TeknoMarket Dijital Pazarlama Yöneticisi'
    },
    images: [
      'https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?q=80&w=2070',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070',
      'https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070'
    ]
  },
  'sosyal-medya-kampanyasi': {
    id: 'sosyal-medya-kampanyasi',
    title: 'Sosyal Medya Büyüme Kampanyası',
    client: 'CafeRoast',
    category: 'Sosyal Medya',
    date: 'Aralık 2023',
    duration: '4 ay',
    description: 'CafeRoast kahve markası için sosyal medya varlığını güçlendiren bütünleşik bir dijital kampanya.',
    longDescription: "CafeRoast, Türkiye'nin yükselen özel kahve markalarından biridir. Sosyal medya varlıklarını güçlendirmek, topluluk oluşturmak ve marka bilinirliğini artırmak için kapsamlı bir sosyal medya stratejisi geliştirdik. Instagram, Facebook ve TikTok platformlarında gerçekleştirdiğimiz kampanyalarla hem takipçi sayısını hem de etkileşim oranlarını önemli ölçüde artırdık.",
    challenge: 'Rekabetçi kahve sektöründe markayı öne çıkarmak, sosyal medyada güçlü bir topluluk oluşturmak ve online satışları artırmak.',
    solution: 'Platform bazlı içerik stratejileri geliştirerek her platforma özel içerikler ürettik. Influencer işbirlikleri ile erişimi genişlettik. Kullanıcı içeriği oluşturma kampanyaları ile topluluk etkileşimini artırdık. Hedefli sosyal medya reklamları ile yeni müşteriler kazandık.',
    results: [
      'Instagram takipçileri %180 arttı',
      'Etkileşim oranları %75 yükseldi',
      'Sosyal medyadan gelen web sitesi trafiği %120 arttı',
      'Online satışlar %90 büyüdü',
      'Marka etiketlemeleri %200 artış gösterdi'
    ],
    services: ['Sosyal Medya Stratejisi', 'İçerik Üretimi', 'Topluluk Yönetimi', 'Influencer Pazarlaması', 'Sosyal Medya Reklamları'],
    testimonial: {
      text: "Ignite Dijital'in sosyal medya ekibi, markamızı tamamen dönüştürdü. Sadece takipçi sayımız artmakla kalmadı, gerçekten etkileşimli ve tutkulu bir topluluk oluşturduk. Yaratıcı içerik stratejileri ve veri odaklı yaklaşımlarıyla her platformda başarılı sonuçlar elde ettik. Satışlarımızdaki artış, sosyal medya yatırımımızın somut bir göstergesi oldu.",
      author: 'Deniz Akar',
      position: 'CafeRoast Kurucu Ortağı'
    },
    images: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2070',
      'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=2069',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070',
      'https://images.unsplash.com/photo-1442975631115-c4f7b05b6fad?q=80&w=2070'
    ]
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectData[id as keyof typeof projectData] : null;

  useEffect(() => {
    // Update page title and meta description for SEO
    if (project) {
      document.title = `${project.title} | Ignite Pazarlama`;
      
      // Add meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', project.description);
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
  }, [project]);

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Proje bulunamadı</h1>
          <p className="text-gray-400 mb-8">Aradığınız proje mevcut değil veya kaldırılmış olabilir.</p>
          <Button className="bg-ignite hover:bg-ignite-700 text-white">
            <Link to="/portfolio">Tüm Projelere Dön</Link>
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
          src={project.images[0]} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center text-sm text-gray-300 mb-4">
                <Link to="/" className="hover:text-ignite transition-colors">Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <Link to="/portfolio" className="hover:text-ignite transition-colors">Portföy</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-ignite">{project.title}</span>
              </div>
              <div className="inline-block bg-ignite/20 px-3 py-1 rounded-full text-ignite text-sm font-medium mb-4">
                {project.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                {project.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Müşteri</p>
                  <p className="font-medium">{project.client}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Kategori</p>
                  <p className="font-medium">{project.category}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Tarih</p>
                  <p className="font-medium">{project.date}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Süre</p>
                  <p className="font-medium">{project.duration}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4 mb-16">
          <div className="relative reveal">
            <Carousel className="w-full">
              <CarouselContent>
                {project.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 h-[500px]">
                      <img 
                        src={image} 
                        alt={`${project.title} - Görsel ${index + 1}`}
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

      {/* Project Overview */}
      <section className="py-20 bg-dark-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="reveal">
              <h2 className="text-3xl font-bold mb-6">Proje Özeti</h2>
              <p className="text-gray-300 mb-8">{project.longDescription}</p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Zorluk</h3>
                <p className="text-gray-300">{project.challenge}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Çözüm</h3>
                <p className="text-gray-300">{project.solution}</p>
              </div>
              
              <div className="bg-dark-500 p-8 rounded-lg border border-dark-400 reveal">
                <h3 className="text-xl font-semibold mb-4">Müşteri Yorumu</h3>
                <blockquote className="text-gray-300 italic mb-6">
                  "{project.testimonial.text}"
                </blockquote>
                <div className="flex items-center">
                  <div className="bg-ignite/20 p-3 rounded-full mr-4">
                    <User className="h-6 w-6 text-ignite" />
                  </div>
                  <div>
                    <p className="font-semibold">{project.testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{project.testimonial.position}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8 reveal" style={{animationDelay: '0.2s'}}>
              <div className="bg-dark-500 p-8 rounded-lg border border-dark-400">
                <h3 className="text-xl font-semibold mb-6">Sonuçlar</h3>
                <ul className="space-y-4">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-center bg-dark-400 p-4 rounded-lg">
                      <div className="bg-ignite/20 p-2 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-ignite">
                          <path d="m5 12 5 5L20 7"/>
                        </svg>
                      </div>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-dark-500 p-8 rounded-lg border border-dark-400">
                <h3 className="text-xl font-semibold mb-6">Kullanılan Hizmetler</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.services.map((service, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <div className="h-2 w-2 bg-ignite rounded-full mr-3"></div>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-dark-500 p-8 rounded-lg border border-dark-400">
                <h3 className="text-xl font-semibold mb-6">Proje Süresi</h3>
                <div className="flex items-center text-gray-300 mb-4">
                  <Clock className="h-5 w-5 text-ignite mr-3" />
                  <span>Toplam Süre: <span className="font-medium text-white">{project.duration}</span></span>
                </div>
                <div className="w-full bg-dark-400 h-2 rounded-full mt-4">
                  <div className="bg-gradient-to-r from-ignite to-ignite-400 h-2 rounded-full w-full"></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <span>Başlangıç</span>
                  <span>Tamamlandı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-gradient-to-r from-dark-500 to-dark-400 rounded-2xl p-8 md:p-12 shadow-lg border border-dark-300 reveal">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Markanız İçin Benzer Sonuçlar İster misiniz?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Uzman ekibimizle işbirliği yaparak markanızı büyütün ve hedeflerinize ulaşın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-ignite hover:bg-ignite-700 text-white">
                  <Link to="/contact" className="flex items-center">
                    Şimdi İletişime Geçin <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-ignite text-ignite hover:bg-ignite/10">
                  <Link to="/portfolio">Diğer Projelerimizi İnceleyin</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
