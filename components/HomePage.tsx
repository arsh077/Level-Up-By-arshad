
import React from 'react';
import Hero from './Hero';
import Calculator from './Calculator';
import Features from './Features';
import StoryTimeline from './StoryTimeline';
import { GradientButton } from './ui/gradient-button';
import { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <>
      <div className="relative">
        {/* Pass navigation function to Hero if needed for buttons inside Hero */}
        <div onClick={(e) => {
            // Very rudimentary delegation to catch clicks on specific elements if strictly needed,
            // but ideally Hero should accept onNavigate. For now, we wrap Hero content or keep it simple.
        }}>
            <Hero onNavigate={onNavigate} />
        </div>
      </div>
      
      {/* Calculator Section Wrapper */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
             <h2 className="text-3xl font-heading font-bold mb-4">Try The Calculator</h2>
             <p className="text-gray-400">Get a sneak peek of your metabolic numbers.</p>
          </div>
          <Calculator />
          <div className="text-center mt-8">
             <button onClick={() => onNavigate('calculator')} className="text-brand-cyan hover:underline">
                 View Full Calculator Details →
             </button>
          </div>
        </div>
      </section>

      <div onClick={() => onNavigate('story')} className="cursor-pointer transition-opacity hover:opacity-90">
        <StoryTimeline />
      </div>
      
      <div onClick={() => onNavigate('features')}>
        <Features />
      </div>
      
      {/* Call to Action Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-cyan/10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
            Ready to <span className="text-brand-cyan">Level Up</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join 10,000+ Indians who are changing their relationship with food. No starvation. Just science.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="px-6 py-4 rounded-xl bg-brand-dark border border-gray-600 text-white w-full sm:w-80 focus:outline-none focus:border-brand-cyan"
            />
            <div onClick={() => onNavigate('waitlist')}>
                <GradientButton variant="variant">
                Start Transformation
                </GradientButton>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">Limited spots available for Beta Phase.</p>
        </div>
      </section>
    </>
  );
};

export default HomePage;
