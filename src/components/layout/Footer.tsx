
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
              Creating powerful digital experiences that elevate brands and drive results.
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
            <h4 className="text-white text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-ignite transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-400 hover:text-ignite transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-ignite transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-ignite transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-ignite transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services/digital-marketing" className="text-gray-400 hover:text-ignite transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="/services/seo" className="text-gray-400 hover:text-ignite transition-colors">
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link to="/services/social-media" className="text-gray-400 hover:text-ignite transition-colors">
                  Social Media Management
                </Link>
              </li>
              <li>
                <Link to="/services/content" className="text-gray-400 hover:text-ignite transition-colors">
                  Content Creation
                </Link>
              </li>
              <li>
                <Link to="/services/web-development" className="text-gray-400 hover:text-ignite transition-colors">
                  Web Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-ignite mr-3 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400">123 Marketing St, Digital City, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-ignite mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-ignite mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">info@ignitemarketing.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Ignite Marketing. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-ignite mr-6 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-ignite transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
