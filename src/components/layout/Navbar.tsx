import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CircleUserRound, Menu, X, ChevronDown, Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from 'lucide-react';

interface NavbarProps {
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

const Navbar = ({ socialMedia }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-dark-500/70 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto px-6 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            <Link to="/" className="flex items-center gap-2">
              Ignite
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className={`text-white hover:text-ignite transition-colors duration-200 ${location.pathname === '/' ? 'text-ignite' : ''}`}>
              Anasayfa
            </Link>
            <Link to="/services" className={`text-white hover:text-ignite transition-colors duration-200 ${location.pathname === '/services' ? 'text-ignite' : ''}`}>
              Hizmetler
            </Link>
            <Link to="/portfolio" className={`text-white hover:text-ignite transition-colors duration-200 ${location.pathname === '/portfolio' ? 'text-ignite' : ''}`}>
              Portfolyo
            </Link>
            <Link to="/about" className={`text-white hover:text-ignite transition-colors duration-200 ${location.pathname === '/about' ? 'text-ignite' : ''}`}>
              Hakkımızda
            </Link>
            <Link to="/contact" className={`text-white hover:text-ignite transition-colors duration-200 ${location.pathname === '/contact' ? 'text-ignite' : ''}`}>
              İletişim
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {socialMedia?.showInHeader && (
              <div className="flex items-center space-x-3">
                {socialMedia?.facebook && (
                  <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {socialMedia?.twitter && (
                  <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {socialMedia?.instagram && (
                  <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {socialMedia?.linkedin && (
                  <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {socialMedia?.youtube && (
                  <a href={socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <Youtube className="h-5 w-5" />
                  </a>
                )}
                {socialMedia?.github && (
                  <a href={socialMedia.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}
            <Button variant="secondary">
              <CircleUserRound className="mr-2 h-4 w-4" />
              <Link to="/admin">Admin Paneli</Link>
            </Button>
          </div>

          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-gray-300 focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="lg:hidden fixed top-0 left-0 h-screen w-screen bg-dark-700/90 backdrop-blur-md z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button onClick={closeMenu} className="absolute top-6 right-6 text-white hover:text-gray-300 focus:outline-none">
            <X className="h-6 w-6" />
          </button>

          <div className="flex flex-col items-center space-y-4">
            <Link to="/" className="text-white text-lg" onClick={closeMenu}>
              Anasayfa
            </Link>
            <Link to="/services" className="text-white text-lg" onClick={closeMenu}>
              Hizmetler
            </Link>
            <Link to="/portfolio" className="text-white text-lg" onClick={closeMenu}>
              Portfolyo
            </Link>
            <Link to="/about" className="text-white text-lg" onClick={closeMenu}>
              Hakkımızda
            </Link>
            <Link to="/contact" className="text-white text-lg" onClick={closeMenu}>
              İletişim
            </Link>
            <Button variant="secondary">
              <CircleUserRound className="mr-2 h-4 w-4" />
              <Link to="/admin" onClick={closeMenu}>Admin Paneli</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
