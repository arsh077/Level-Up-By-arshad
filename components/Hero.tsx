
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { GradientButton } from './ui/gradient-button';
import { Page } from '../types';

interface HeroProps {
  onNavigate?: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-dark border border-gray-700 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
              <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">Early Access Phase 1</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-heading font-extrabold leading-tight mb-6">
              Body Develops in the <br />
              <span className="gradient-text">Kitchen.</span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Stop guessing. Start transforming. The first nutrition platform built for <strong className="text-white">Indian habits</strong>, powered by metabolic science and AI food logging.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <div onClick={() => onNavigate?.('calculator')}>
                <GradientButton variant="variant" className="flex items-center gap-2">
                  Get Your Diet Plan <ArrowRight className="w-5 h-5" />
                </GradientButton>
              </div>
              <button 
                onClick={() => onNavigate?.('story')}
                className="px-8 py-4 bg-brand-dark hover:bg-gray-800 border border-gray-700 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 h-[53px]"
              >
                <Play className="w-4 h-4 fill-current" /> Watch Arshad's Story
              </button>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                       <img key={i} src={`https://picsum.photos/40/40?random=${i}`} alt="User" className="w-10 h-10 rounded-full border-2 border-brand-navy" />
                   ))}
               </div>
               <div className="text-sm">
                   <span className="block text-white font-bold">500+ Early Adopters</span>
                   <span className="text-gray-500">Joined the waitlist this week</span>
               </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            <div className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-2xl bg-brand-dark/50 backdrop-blur-sm p-4">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-brand-cyan/20 to-brand-orange/20 opacity-30 pointer-events-none"></div>
               {/* Mockup of App Interface */}
               <div className="bg-black rounded-2xl overflow-hidden relative aspect-[9/16] md:aspect-auto md:h-[600px] border border-gray-800">
                   {/* This serves as a placeholder for the hero image showing Arshad or the App */}
                   <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Healthy Indian Food" 
                    className="w-full h-full object-cover opacity-60"
                   />
                   <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-brand-navy via-brand-navy/90 to-transparent p-8">
                        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-4 border border-gray-700 mb-4 transform translate-y-2 hover:translate-y-0 transition-transform">
                             <div className="flex justify-between items-center mb-2">
                                 <span className="text-xs font-mono text-gray-300">TODAY'S LUNCH</span>
                                 <span className="text-brand-green text-xs font-bold">+450 kcal</span>
                             </div>
                             <div className="flex items-center gap-3">
                                 <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden">
                                     <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" alt="Biryani" />
                                 </div>
                                 <div>
                                     <div className="text-white font-bold text-sm">Chicken Biryani</div>
                                     <div className="text-xs text-gray-400">Home cooked • 1 Bowl</div>
                                 </div>
                             </div>
                        </div>
                        <h3 className="text-white font-heading font-bold text-xl">Visual Food Logging</h3>
                        <p className="text-sm text-gray-400 mt-1">Point your camera at your plate. Let AI handle the math.</p>
                   </div>
               </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-brand-navy border border-brand-cyan p-4 rounded-xl shadow-xl hidden md:block animate-bounce-slow">
                <div className="flex items-center gap-3">
                    <div className="bg-brand-cyan/20 p-2 rounded-lg">
                        <ArrowRight className="text-brand-cyan rotate-45" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Founder's Journey</div>
                        <div className="font-bold text-white text-lg">155kg <span className="text-gray-500 mx-1">→</span> 70kg</div>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
