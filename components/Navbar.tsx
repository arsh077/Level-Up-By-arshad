
import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, Sun, Moon } from 'lucide-react';
import { GradientButton } from './ui/gradient-button';
import { Page } from '../types';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Initialize theme based on HTML class
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  const handleNav = (page: Page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  const linkClass = (page: Page) => 
    `text-sm font-medium transition-colors cursor-pointer ${
      currentPage === page ? 'text-brand-cyan' : 'text-gray-300 hover:text-brand-cyan'
    }`;

  return (
    <nav className="fixed w-full top-0 z-50 bg-brand-navy/80 backdrop-blur-lg border-b border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="text-2xl font-heading font-extrabold text-white tracking-tight cursor-pointer"
          onClick={() => handleNav('home')}
        >
          LEVEL <span className="text-brand-cyan">UP</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => handleNav('story')} className={linkClass('story')}>The Story</button>
          <button onClick={() => handleNav('calculator')} className={linkClass('calculator')}>Calculator</button>
          <button onClick={() => handleNav('features')} className={linkClass('features')}>Features</button>
          <button onClick={() => handleNav('waitlist')} className={linkClass('waitlist')}>Community</button>
          
          <div className="h-6 w-px bg-gray-700 mx-2"></div>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-all"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Admin Button */}
          <button 
            onClick={() => handleNav('admin')} 
            className={`p-2 rounded-full hover:bg-brand-red/10 transition-all ${currentPage === 'admin' ? 'text-brand-red' : 'text-gray-400 hover:text-brand-red'}`}
            title="Admin Login"
          >
            <Lock className="w-5 h-5" />
          </button>

          <div onClick={() => handleNav('waitlist')}>
            <GradientButton variant="variant" className="h-10 px-5 min-w-[auto] rounded-full">
              Join Waitlist
            </GradientButton>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
             <button onClick={toggleTheme} className="text-gray-300">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
            <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-navy border-b border-gray-800 py-4 px-6 flex flex-col gap-4 shadow-xl absolute w-full transition-colors duration-300">
          <button className="text-gray-300 block py-2 text-left hover:text-brand-cyan" onClick={() => handleNav('story')}>The Story</button>
          <button className="text-gray-300 block py-2 text-left hover:text-brand-cyan" onClick={() => handleNav('calculator')}>Calculator</button>
          <button className="text-gray-300 block py-2 text-left hover:text-brand-cyan" onClick={() => handleNav('features')}>Features</button>
          
          <div className="border-t border-gray-700 pt-4 flex items-center justify-between">
            <button 
                onClick={() => handleNav('admin')}
                className="flex items-center gap-2 text-gray-300 hover:text-brand-red"
            >
                <Lock className="w-4 h-4" /> Admin Login
            </button>
          </div>

          <div onClick={() => handleNav('waitlist')} className="w-full mt-2">
            <GradientButton variant="variant" className="w-full">Join Waitlist</GradientButton>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
