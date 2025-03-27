
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Stats', href: '#stats' },
    { name: 'Members', href: '#members' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Join Us', href: '#recruitment' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-clan-dark/95 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold gold-gradient-text">RN:W</span>
            <span className="hidden sm:inline-block text-sm text-white/70">Rejuve NationWarriors</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-white/80 hover:text-clan-gold transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#recruitment"
              className="px-4 py-2 rounded-md bg-gradient-gold text-clan-dark font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.6)]"
            >
              Join Clan
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-1 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden glass-card mt-3 mx-4 p-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-clan-gold p-2 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#recruitment"
              className="px-4 py-2 rounded-md bg-gradient-gold text-clan-dark font-semibold text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.6)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join Clan
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
