
import React from 'react';
import { GradientButton } from './ui/gradient-button';
import { Page } from '../types';
import { Check, X, Quote } from 'lucide-react';

interface StoryPageProps {
  onNavigate: (page: Page) => void;
}

const StoryPage: React.FC<StoryPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-brand-navy min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                The Kitchen <span className="text-brand-cyan">Secret</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                "I realized the gym wasn't my problem. The kitchen was the solution."
            </p>
        </div>
      </section>

      {/* NEW: About Arshad Section */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-brand-dark rounded-[2.5rem] border border-gray-800 p-8 md:p-12 shadow-2xl overflow-hidden relative">
            
            {/* Background Texture */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" 
                 style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>

            <div className="flex flex-col lg:flex-row gap-16 relative z-10">
              
              {/* Left Column: Image */}
              <div className="w-full lg:w-5/12">
                <div className="relative rounded-2xl overflow-hidden border border-brand-cyan/20 shadow-lg group">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent z-10"></div>
                  <img 
                    src="/assets/story/founder-arshad.jpg" 
                    alt="Arshad - The Discipline Built Man" 
                    className="w-full h-[500px] md:h-[600px] object-cover object-center transition-all duration-700 hover:scale-105"
                    loading="lazy"
                    style={{
                      objectPosition: '50% 20%' // Focus on upper portion of image
                    }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face';
                    }}
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="text-brand-cyan font-mono text-sm tracking-widest uppercase mb-1">Founder</div>
                    <h3 className="text-3xl font-heading font-bold text-white">Arshad</h3>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative */}
              <div className="w-full lg:w-7/12 space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-red">Discipline</span> Built Man
                  </h2>
                  <div className="h-1 w-24 bg-brand-cyan rounded-full"></div>
                </div>

                <div className="prose prose-invert prose-lg text-gray-300 leading-relaxed space-y-6">
                  <p className="font-medium text-white italic text-xl border-l-4 border-brand-cyan pl-4">
                    Arshad’s journey is not a fitness story. It’s a story of identity, discipline, and rebuilding a human from the inside out.
                  </p>

                  <p>
                    In January 2025, he stood at <span className="text-white font-bold">145 kilograms</span> — physically heavy, mentally tired, and carrying years of neglect, doubt, and emotional weight. There was no shortcut, no miracle, no secret formula. Just one decision:
                  </p>

                  <div className="bg-brand-navy p-6 rounded-xl border border-gray-700 text-center">
                    <Quote className="w-8 h-8 text-brand-orange mx-auto mb-2 opacity-50" />
                    <p className="text-2xl font-heading font-bold text-white">"I refuse to stay the same."</p>
                  </div>

                  <p>
                    What started with 2,000 steps a day slowly became 5,000… then 10,000… then 20,000. Workouts were not always exciting. Meals were not always enjoyable. Motivation was not always there. <strong className="text-brand-cyan">But discipline was.</strong>
                  </p>

                  <p>
                    Over the next year, Arshad transformed his body from <span className="text-brand-red font-bold">145 kg</span> to <span className="text-brand-green font-bold">70 kg</span> — naturally, through calorie control, walking, strength training, and relentless consistency. No extreme methods. No unhealthy shortcuts. Just daily action, repeated even when he didn’t feel like it.
                  </p>

                  <p>
                    But the real transformation was not physical. He built mental control over cravings, emotional stability under pressure, and a warrior mindset rooted in faith and responsibility.
                  </p>

                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">His Mission</h3>
                    <p>
                      To become the strongest, calmest version of himself and to show others that change is earned, not wished for. This is not the end of his journey. It is only the foundation.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <div onClick={() => onNavigate('waitlist')}>
                        <GradientButton variant="variant">Train With Arshad</GradientButton>
                    </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-brand-dark">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-12 text-center">The Journey Timeline</h2>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {[
                    { month: "Month 0", weight: "155kg", title: "The Breaking Point", desc: "Sedentary, health-conscious but lost. Expensive gyms and crash diets failed. Realized I needed a sustainable change." },
                    { month: "Month 3", weight: "140kg", title: "First Milestone", desc: "Lost 15kg. Jeans fit differently. Started cooking at home and controlling portions. Realized home food is cheaper AND healthier." },
                    { month: "Month 6", weight: "112kg", title: "Halfway There", desc: "Running without stopping. Discovered Indian superfoods like Makhana and Jowar. Family started copying my meals." },
                    { month: "Month 12", weight: "70kg", title: "Transformation Complete", desc: "Total 85kg lost. Cooking became meditation. BP normal, energy peak. Decided to build LEVEL UP to help others." }
                ].map((item, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-brand-cyan text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <div className="w-3 h-3 bg-brand-navy rounded-full"></div>
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-brand-navy p-4 rounded-xl border border-gray-800 shadow-lg">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-white">{item.title}</span>
                                <time className="font-mono text-xs text-brand-cyan">{item.month}</time>
                            </div>
                            <div className="text-brand-orange text-sm font-bold mb-2">{item.weight}</div>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Why Conventional Methods Failed</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Gym Membership", cost: "₹5,000/mo", verdict: "Unsustainable", icon: <X className="text-red-500" />, desc: "Went 3 times, quit. No nutrition guidance." },
                    { title: "Crash Diets", cost: "₹1,000", verdict: "Unsustainable", icon: <X className="text-red-500" />, desc: "Boring, no local foods. Lasted 1 week." },
                    { title: "Nutritionist", cost: "₹2,000/session", verdict: "Unsustainable", icon: <X className="text-red-500" />, desc: "Generic advice. Recommendations weren't affordable." },
                    { title: "Home Cooking", cost: "₹200/day", verdict: "SUSTAINABLE", icon: <Check className="text-green-500" />, desc: "Worked perfectly. Family-friendly & scalable.", highlight: true }
                ].map((card, idx) => (
                    <div key={idx} className={`p-6 rounded-2xl border ${card.highlight ? 'bg-brand-dark border-brand-green' : 'bg-brand-navy border-gray-800'} relative`}>
                        {card.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-green text-black text-xs font-bold px-3 py-1 rounded-full">WINNER</div>}
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-lg">{card.title}</h3>
                            {card.icon}
                        </div>
                        <div className="text-2xl font-bold mb-2">{card.cost}</div>
                        <div className={`text-sm font-bold uppercase mb-4 ${card.highlight ? 'text-brand-green' : 'text-red-400'}`}>{card.verdict}</div>
                        <p className="text-sm text-gray-400">{card.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Your kitchen is your gym.</h2>
          <div className="flex justify-center gap-4">
              <div onClick={() => onNavigate('waitlist')}>
                <GradientButton variant="variant">Join The Movement</GradientButton>
              </div>
          </div>
      </section>
    </div>
  );
};

export default StoryPage;
