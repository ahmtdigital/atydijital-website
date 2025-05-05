
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Globe, TrendingUp, PenTool, Smartphone, Code, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -5,
      boxShadow: "0 10px 30px rgba(255, 107, 0, 0.2)",
      borderColor: "rgba(255, 107, 0, 0.5)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      color: "rgba(255, 107, 0, 1)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section className="py-20 bg-dark-600">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p 
            className="text-ignite font-semibold mb-3 reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            HİZMETLERİMİZ
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 reveal text-white" /* Text color updated to white */
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Kapsamlı Dijital Çözümler
          </motion.h2>
          <motion.p 
            className="text-gray-200 reveal" /* Text color updated to lighter gray for better visibility */
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            İşletmenizin dijital dünyada büyümesi ve gelişmesi için eksiksiz dijital pazarlama hizmetleri sunuyoruz.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className="bg-dark-500 border-dark-400 h-full transition-all duration-300 overflow-hidden">
                <CardHeader>
                  <motion.div 
                    className="mb-4" 
                    variants={iconVariants}
                    animate={hoveredIndex === index ? "hover" : "visible"}
                  >
                    {service.icon}
                  </motion.div>
                  <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle> {/* Text color updated to white */}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-200"> {/* Text color updated to lighter gray for better visibility */}
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link 
                    to={service.link} 
                    className="text-ignite hover:text-ignite-400 font-medium flex items-center gap-2 transition-colors group"
                  >
                    <span>Daha Fazla Bilgi</span>
                    <motion.span
                      initial={{ x: 0 }}
                      animate={{ x: hoveredIndex === index ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg" 
            className="bg-ignite hover:bg-ignite-700 text-white relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              <span>Tüm Hizmetleri Görüntüle</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="h-4 w-4 ml-2" />
              </motion.span>
            </span>
            <motion.span 
              className="absolute inset-0 bg-ignite-700"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
