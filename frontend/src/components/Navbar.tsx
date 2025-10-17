import { Menu, X, User } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'About', page: 'home', scrollTo: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-white">ॐ</span>
            </div>
            <div className="hidden sm:block">
              <h3 className="text-primary">Adi Goud Brahmin Mahasabha</h3>
            </div>
            <div className="block sm:hidden">
              <h3 className="text-primary">AGBM</h3>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page)}
                className={`transition-colors ${
                  currentPage === link.page ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
                {link.name}
              </button>
            ))}
            <Button onClick={() => handleNavClick('login')} variant="default" className="gap-2">
              <User className="w-4 h-4" />
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page)}
                className={`block w-full text-left py-2 px-4 rounded-lg transition-colors ${
                  currentPage === link.page ? 'bg-secondary text-primary' : 'text-foreground hover:bg-secondary'
                }`}
              >
                {link.name}
              </button>
            ))}
            <Button onClick={() => handleNavClick('login')} variant="default" className="w-full gap-2">
              <User className="w-4 h-4" />
              Login
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
