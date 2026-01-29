import React from 'react';
import { Calendar, TrendingDown, Target, Heart } from 'lucide-react';

const StoryTimeline: React.FC = () => {
  const events = [
    {
      year: "The Start",
      title: "155kg & Struggling",
      desc: "Tried every fad diet. Gym subscriptions wasted. Energy at an all-time low. Realized traditional fitness advice doesn't work for Indian home food.",
      icon: <TrendingDown className="w-5 h-5 text-brand-red" />
    },
    {
      year: "The Pivot",
      title: "Science meets Kitchen",
      desc: "Stopped crash dieting. Started weighing Roti & Rice. Understood BMR and CICO (Calories In, Calories Out).",
      icon: <Target className="w-5 h-5 text-brand-cyan" />
    },
    {
      year: "The Result",
      title: "70kg Achieved",
      desc: "Maintained for 2 years. Enjoying Biryani and sweets in moderation. No magic pills, just math and consistency.",
      icon: <Heart className="w-5 h-5 text-brand-orange" />
    },
    {
      year: "The Mission",
      title: "LEVEL UP Born",
      desc: "Building the tool I wished I had. Dedicated to helping 10,000 Indians reclaim their health.",
      icon: <Calendar className="w-5 h-5 text-white" />
    }
  ];

  return (
    <section className="py-20 bg-brand-dark border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">The Origin Story</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            This isn't just an app. It's a method proven by experience. Arshad's journey from 155kg to 70kg laid the blueprint.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-12">
            {events.map((event, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Connector Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-brand-navy border-2 border-brand-cyan rounded-full -translate-x-1/2 z-10 hidden md:block"></div>

                {/* Content Box */}
                <div className="w-full md:w-[45%] pl-12 md:pl-0">
                  <div className="bg-brand-navy p-6 rounded-2xl border border-gray-800 hover:border-brand-cyan/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-brand-cyan group-hover:text-black transition-colors">
                            {event.icon}
                        </div>
                        <span className="font-mono text-sm text-brand-cyan">{event.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        {event.desc}
                    </p>
                  </div>
                </div>
                
                {/* Spacer for alternate side */}
                <div className="w-full md:w-[45%] hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryTimeline;