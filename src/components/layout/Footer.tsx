import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    github?: string;
    showInHeader?: boolean;
    showInFooter?: boolean;
  } | null;
}

const Footer = ({ socialMedia }: FooterProps) => {
  return (
    <footer className="bg-dark-700 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ignite Dijital</h4>
            <p className="text-gray-400">
              Ignite Dijital, işletmenizin dijital dünyada başarılı olması için yenilikçi çözümler sunar. SEO, web tasarım, sosyal medya yönetimi ve daha fazlası.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialMedia?.facebook && socialMedia?.showInFooter && (
                <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-ignite">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {socialMedia?.twitter && socialMedia?.showInFooter && (
                <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-ignite">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {socialMedia?.instagram && socialMedia?.showInFooter && (
                <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ignite">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socialMedia?.linkedin && socialMedia?.showInFooter && (
                <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ignite">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {socialMedia?.youtube && socialMedia?.showInFooter && (
                <a href={socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-ignite">
                  <Youtube className="h-5 w-5" />
                </a>
              )}
              {socialMedia?.github && socialMedia?.showInFooter && (
                <a href={socialMedia.github} target="_blank" rel="noopener noreferrer" className="hover:text-ignite">
                  <Github className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hizmetler</h4>
            <ul>
              <li className="mb-2">
                <Link to="/seo" className="hover:text-ignite">SEO Optimizasyonu</Link>
              </li>
              <li className="mb-2">
                <Link to="/web-tasarim" className="hover:text-ignite">Web Tasarımı</Link>
              </li>
              <li className="mb-2">
                <Link to="/sosyal-medya" className="hover:text-ignite">Sosyal Medya Yönetimi</Link>
              </li>
              <li className="mb-2">
                <Link to="/icerik-pazarlama" className="hover:text-ignite">İçerik Pazarlama</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h4>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:text-ignite">Anasayfa</Link>
              </li>
              <li className="mb-2">
                <Link to="/hakkimizda" className="hover:text-ignite">Hakkımızda</Link>
              </li>
              <li className="mb-2">
                <Link to="/portfolio" className="hover:text-ignite">Portfolyo</Link>
              </li>
              <li className="mb-2">
                <Link to="/iletisim" className="hover:text-ignite">İletişim</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">İletişim</h4>
            <ul className="text-gray-400">
              <li className="flex items-center mb-2">
                <MapPin className="h-4 w-4 mr-2 text-ignite" />
                <a href="https://maps.app.goo.gl/jB6rmE9mTuxEkxKz9" target="_blank" rel="noopener noreferrer">
                  Merkezefendi, 2. Sk. No:10, 20010 Denizli
                </a>
              </li>
              <li className="flex items-center mb-2">
                <Phone className="h-4 w-4 mr-2 text-ignite" />
                <a href="tel:+905551234567" className="hover:text-ignite">+90 555 123 45 67</a>
              </li>
              <li className="flex items-center mb-2">
                <Mail className="h-4 w-4 mr-2 text-ignite" />
                <a href="mailto:info@ignitedijital.com" className="hover:text-ignite">info@ignitedijital.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center border-t border-dark-500 pt-6">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Ignite Dijital. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
