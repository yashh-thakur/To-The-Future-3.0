import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';

const Navbar = ({ onOpenConsultation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/85 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-lg shadow-cyan-950/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-400/50 transition-shadow">
              <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center">
                TO THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 ml-1.5">FUTURE</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase -mt-1 font-semibold">
                ENTERPRISE IT & AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('services')}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('tech-stack')}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Tech Stack
            </button>
            <button
              onClick={() => handleNavClick('estimator')}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>Cost Estimator</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                NEW
              </span>
            </button>
            <Link
              to="/portfolio"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/portfolio' ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              Case Studies
            </Link>
            <button
              onClick={() => handleNavClick('why-ttf')}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Why TTF
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={() => onOpenConsultation()}
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-full group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#030712] group-hover:bg-opacity-80 transition-all text-xs sm:text-sm font-semibold text-white">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Book Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-cyan-500/20 px-6 py-6 space-y-4">
          <button
            onClick={() => handleNavClick('services')}
            className="block w-full text-left text-base font-medium text-gray-300 hover:text-cyan-400 py-2"
          >
            Services & Solutions
          </button>
          <button
            onClick={() => handleNavClick('tech-stack')}
            className="block w-full text-left text-base font-medium text-gray-300 hover:text-cyan-400 py-2"
          >
            Technology Stack
          </button>
          <button
            onClick={() => handleNavClick('estimator')}
            className="block w-full text-left text-base font-medium text-cyan-400 py-2"
          >
            Interactive Cost Estimator
          </button>
          <Link
            to="/portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left text-base font-medium text-gray-300 hover:text-cyan-400 py-2"
          >
            Portfolio & Case Studies
          </Link>
          <button
            onClick={() => handleNavClick('why-ttf')}
            className="block w-full text-left text-base font-medium text-gray-300 hover:text-cyan-400 py-2"
          >
            Why Choose TTF
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left text-base font-medium text-gray-300 hover:text-cyan-400 py-2"
          >
            Contact & Global Hubs
          </button>
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25"
            >
              <span>Book Strategy Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
