
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Bell, Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import QuotePopup from '@/components/ui/quote-popup';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Menü açıkken sayfanın kaydırılmasını engelle
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hizmetler', path: '/services' },
    { name: 'Portfolyo', path: '/portfolio' },
    { name: 'Hakkımızda', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'İletişim', path: '/contact' },
  ];

  // Admin navigation panel
  if (isAdmin) {
    return (
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-dark-800/95 backdrop-blur-md py-4 shadow-lg border-b border-dark-600'
      )}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="relative z-50 flex items-center">
            <div className="mr-3 bg-ignite rounded-full w-10 h-10 flex items-center justify-center">
              <Image size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-white">Ignite</span>
                <span className="text-ignite">Marketing</span>
                <span className="ml-2 text-sm text-gray-400 font-normal">Admin Panel</span>
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-ignite text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-dark-600 border-dark-500">
                <DropdownMenuLabel>Bildirimler</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-dark-500" />
                <DropdownMenuItem className="hover:bg-dark-500 cursor-pointer">
                  <div className="flex flex-col">
                    <span className="font-medium">Yeni iletişim formu</span>
                    <span className="text-xs text-gray-400">2 dakika önce</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-dark-500 cursor-pointer">
                  <div className="flex flex-col">
                    <span className="font-medium">Proje güncellendi</span>
                    <span className="text-xs text-gray-400">1 saat önce</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-dark-500 cursor-pointer">
                  <div className="flex flex-col">
                    <span className="font-medium">Yeni yorum eklendi</span>
                    <span className="text-xs text-gray-400">dün</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-dark-600">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-ignite text-white">AD</AvatarFallback>
                  </Avatar>
                  <span>Admin</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-dark-600 border-dark-500 mt-2">
                <DropdownMenuLabel>Admin Panel</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-dark-500" />
                <DropdownMenuItem className="hover:bg-dark-500 cursor-pointer">
                  <Link to="/admin" className="w-full">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-dark-500 cursor-pointer">
                  <Link to="/admin?tab=settings" className="w-full">Ayarlar</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-dark-500" />
                <DropdownMenuItem className="hover:bg-dark-500 cursor-pointer">
                  <Link to="/" className="w-full">Siteye Dön</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-dark-500 cursor-pointer text-red-400">
                  Çıkış Yap
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    );
  }

  // Standard navigation
  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-dark/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      )}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="relative z-50 flex items-center group">
            <motion.div 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mr-3 bg-ignite rounded-full w-10 h-10 flex items-center justify-center overflow-hidden"
            >
              <Image size={20} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                <motion.span 
                  className="text-white inline-block"
                  initial={{ y: 0 }}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Ignite
                </motion.span>
                <motion.span 
                  className="text-ignite inline-block"
                  initial={{ y: 0 }}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
                >
                  Marketing
                </motion.span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className="text-white/80 hover:text-ignite transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-ignite group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Button 
              variant="default" 
              className="bg-ignite hover:bg-ignite-700 text-white"
              onClick={() => setQuotePopupOpen(true)}
            >
              Teklif Al
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden relative z-50" 
            onClick={toggleMenu}
            aria-label="Menüyü Aç/Kapat"
          >
            {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-dark/95 z-40 flex flex-col items-center pt-20"
                style={{ top: 0, height: '100vh', paddingTop: '120px', overflow: 'auto' }}
              >
                <div className="flex flex-col items-center space-y-6 py-10 w-full px-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="w-full text-center"
                    >
                      <Link 
                        to={item.path}
                        className="text-white text-xl hover:text-ignite transition-colors duration-200 block py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                    className="mt-6 w-full"
                  >
                    <Button 
                      variant="default" 
                      className="bg-ignite hover:bg-ignite-700 text-white w-full py-6 text-lg"
                      onClick={() => {
                        setIsOpen(false);
                        setQuotePopupOpen(true);
                      }}
                    >
                      Teklif Al
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Quote Popup */}
      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </>
  );
};

export default Navbar;
