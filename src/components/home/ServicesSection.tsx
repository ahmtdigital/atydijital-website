import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MonitorSmartphone, Layers, BarChart3, PenTool, GraduationCap, ArrowRightCircle } from 'lucide-react';

interface ServicesSectionProps {
  content?: any;
}

const ServicesSection = ({ content }: ServicesSectionProps) => {
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Web Tasarımı ve Geliştirme',
      description: 'Modern ve kullanıcı dostu web siteleri tasarlıyor ve geliştiriyoruz. İşletmenizin dijital yüzünü en iyi şekilde yansıtıyoruz.',
      icon: MonitorSmartphone,
      delay: 0.1,
    },
    {
      id: 2,
      title: 'SEO (Arama Motoru Optimizasyonu)',
      description: 'Web sitenizin arama motorlarında üst sıralarda yer alması için kapsamlı SEO hizmetleri sunuyoruz. Organik trafikle büyüyün.',
      icon: BarChart3,
      delay: 0.2,
    },
    {
      id: 3,
      title: 'Sosyal Medya Yönetimi',
      description: 'Sosyal medya hesaplarınızı yöneterek marka bilinirliğinizi artırıyor ve hedef kitlenizle etkileşim kurmanızı sağlıyoruz.',
      icon: Layers,
      delay: 0.3,
    },
    {
      id: 4,
      title: 'İçerik Pazarlaması',
      description: 'Hedef kitlenizin ilgisini çekecek kaliteli ve özgün içerikler üretiyoruz. Blog yazıları, makaleler, infografikler ve daha fazlası.',
      icon: PenTool,
      delay: 0.4,
    },
    {
      id: 5,
      title: 'Eğitim ve Danışmanlık',
      description: 'Dijital pazarlama konusunda eğitimler ve danışmanlık hizmetleri sunuyoruz. Ekibinizi geliştirin ve stratejilerinizi optimize edin.',
      icon: GraduationCap,
      delay: 0.5,
    },
  ]);

  useEffect(() => {
    if (content && content.services) {
      setServices(content.services);
    }
  }, [content]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section id="services" className="py-20 bg-dark-500">
      <div className="container mx-auto text-center">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-6 reveal"
        >
          Hizmetlerimiz
        </motion.h2>
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 mb-12 reveal"
        >
          İşletmenizin dijital dünyadaki başarısı için sunduğumuz çeşitli hizmetlerle yanınızdayız.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.3 + service.delay }}
              className="bg-dark-400 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 reveal"
            >
              <div className="text-ignite text-4xl mb-4">
                <service.icon />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-white/60">{service.description}</p>
              <ArrowRightCircle className="text-ignite mt-4 h-6 w-6 mx-auto" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
