
import React from 'react';
import { Instagram, Twitter, Youtube, Lock } from 'lucide-react';
import { GradientButton } from './ui/gradient-button';
import { Page } from '../types';

interface FooterProps {
  onNavigate?: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black border-t border-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-heading font-bold text-white mb-4">LEVEL UP</h3>
            <p className="text-gray-500 text-sm mb-6">
              Transforming India's health, one home-cooked meal at a time.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><button onClick={() => onNavigate?.('calculator')} className="hover:text-brand-cyan">Calculator</button></li>
              <li><button onClick={() => onNavigate?.('features')} className="hover:text-brand-cyan">Food Tracker</button></li>
              <li><button onClick={() => onNavigate?.('story')} className="hover:text-brand-cyan">Success Stories</button></li>
              <li><button onClick={() => onNavigate?.('waitlist')} className="hover:text-brand-cyan">Pricing</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><button onClick={() => onNavigate?.('waitlist')} className="hover:text-brand-cyan">Arshad's Blog</button></li>
              <li><button onClick={() => onNavigate?.('features')} className="hover:text-brand-cyan">Indian Diet Guide</button></li>
              <li><button onClick={() => onNavigate?.('waitlist')} className="hover:text-brand-cyan">Community Guidelines</button></li>
              <li><button onClick={() => onNavigate?.('admin')} className="hover:text-brand-cyan flex items-center gap-1"><Lock className="w-3 h-3" /> Admin Portal</button></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-4">Join the Movement</h4>
             <p className="text-gray-500 text-xs mb-4">Get the latest nutrition hacks and updates.</p>
             <div className="flex gap-2">
                 <input type="email" placeholder="Your email" className="bg-gray-900 border border-gray-800 text-white text-sm px-4 py-2 rounded-lg flex-1 focus:outline-none focus:border-brand-cyan" />
                 <div onClick={() => onNavigate?.('waitlist')}>
                    <GradientButton variant="variant" className="px-4 py-2 min-w-[80px]">Join</GradientButton>
                 </div>
             </div>
          </div>
        </div>
        
        <div className="border-t border-gray-900 pt-8 text-center text-gray-600 text-xs flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 Level Up Nutrition Technologies. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed for Impact.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
