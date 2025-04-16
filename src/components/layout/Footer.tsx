
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-600 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              <span className="text-white">Ignite</span>
              <span className="text-ignite">Marketing</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Markanızı bir üst seviyeye taşıyacak güçlü dijital deneyimler yaratıyoruz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-ignite transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-ignite transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-ignite transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-ignite transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Hızlı Bağlantılar</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-ignite transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-400 hover:text-ignite transition-colors">
                  Portfolyo
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-ignite transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-ignite transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-ignite transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Hizmetler</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services/digital-marketing" className="text-gray-400 hover:text-ignite transition-colors">
                  Dijital Pazarlama
                </Link>
              </li>
              <li>
                <Link to="/services/seo" className="text-gray-400 hover:text-ignite transition-colors">
                  SEO Optimizasyonu
                </Link>
              </li>
              <li>
                <Link to="/services/social-media" className="text-gray-400 hover:text-ignite transition-colors">
                  Sosyal Medya Yönetimi
                </Link>
              </li>
              <li>
                <Link to="/services/content" className="text-gray-400 hover:text-ignite transition-colors">
                  İçerik Üretimi
                </Link>
              </li>
              <li>
                <Link to="/services/web-development" className="text-gray-400 hover:text-ignite transition-colors">
                  Web Geliştirme
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-ignite mr-3 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400">Dijital Cadde No: 123, İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-ignite mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">+90 (212) 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-ignite mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">info@ignitemarketing.com.tr</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Ignite Marketing. Tüm hakları saklıdır.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-ignite mr-6 transition-colors">
              Gizlilik Politikası
            </Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-ignite transition-colors">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
