
import React from 'react';
import { Camera, Smartphone, Utensils, Users, BarChart3, Video, Check, X, ArrowLeft } from 'lucide-react';
import { GradientButton } from './ui/gradient-button';
import { Page } from '../types';

interface FeaturesPageProps {
  onNavigate: (page: Page) => void;
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-brand-navy min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center text-gray-400 hover:text-brand-cyan mb-8 transition-colors"
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </button>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            What Makes <span className="text-brand-cyan">LEVEL UP</span> Different?
          </h1>
          <p className="text-xl text-gray-300">
             Not another generic fitness app. Built for Indians. By Indians.
          </p>
        </div>

        <div className="grid gap-20">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 order-2 md:order-1">
                    <div className="bg-brand-dark p-2 rounded-2xl border border-gray-800 shadow-2xl">
                         <img src="https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Camera AI" className="rounded-xl w-full h-[300px] object-cover opacity-80" />
                         <div className="p-4">
                             <div className="flex justify-between items-center text-sm font-mono text-gray-400 mb-2">
                                 <span>DETECTED: Aloo Paratha</span>
                                 <span className="text-brand-green">98% Match</span>
                             </div>
                             <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                 <div className="h-full bg-brand-cyan w-[98%]"></div>
                             </div>
                         </div>
                    </div>
                </div>
                <div className="flex-1 order-1 md:order-2">
                    <div className="w-12 h-12 bg-brand-cyan/20 rounded-xl flex items-center justify-center mb-6 text-brand-cyan">
                        <Camera className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Smart Camera Logger</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        Point. Snap. Know Everything. Our AI identifies food items, estimates portion sizes, and calculates macros instantly. 
                        Works with home-cooked Indian meals like Dal, Roti, and Sabzi.
                    </p>
                    <ul className="space-y-3 mb-8">
                        {['5 seconds per meal', 'More accurate than guessing', 'Recognizes Indian cuisines'].map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-300">
                                <Check className="w-4 h-4 text-brand-green mr-3" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                    <div className="w-12 h-12 bg-brand-orange/20 rounded-xl flex items-center justify-center mb-6 text-brand-orange">
                        <Utensils className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Largest Indian Food DB</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        We indexed nutrition for staple grains, proteins, regional dishes, and even street food. No need to search for "Bread" when you ate "Roti".
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-brand-dark p-4 rounded-lg border border-gray-800">
                            <div className="text-white font-bold">Roti (Medium)</div>
                            <div className="text-xs text-gray-500">120 kcal • 18g Carbs</div>
                        </div>
                        <div className="bg-brand-dark p-4 rounded-lg border border-gray-800">
                            <div className="text-white font-bold">Moong Dal</div>
                            <div className="text-xs text-gray-500">210 kcal • 15g Protein</div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://images.unsplash.com/photo-1606491956689-2ea28c674675?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Indian Food 1" className="rounded-2xl h-48 w-full object-cover" />
                        <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Indian Food 2" className="rounded-2xl h-48 w-full object-cover mt-8" />
                    </div>
                </div>
            </div>

            {/* Feature 3: Community */}
            <div className="bg-brand-dark rounded-3xl p-8 md:p-12 border border-gray-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[100px]"></div>
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                     <Users className="w-12 h-12 text-brand-green mx-auto mb-6" />
                     <h3 className="text-3xl font-bold text-white mb-4">Grow With Your Community</h3>
                     <p className="text-gray-400 mb-8">
                         Join weekly nutrition challenges, find accountability buddies, and share your wins. Friendly competition that actually helps you stick to your goals.
                     </p>
                     <div className="flex flex-wrap justify-center gap-4">
                         <div className="bg-brand-navy px-6 py-3 rounded-full border border-gray-700 text-sm">
                             🎯 30-Day Consistency Challenge
                         </div>
                         <div className="bg-brand-navy px-6 py-3 rounded-full border border-gray-700 text-sm">
                             🏆 High Protein March
                         </div>
                     </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="py-10">
                <h3 className="text-2xl font-bold text-center mb-10">How LEVEL UP Compares</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-sm">
                                <th className="p-4">Feature</th>
                                <th className="p-4 text-brand-cyan text-lg">LEVEL UP</th>
                                <th className="p-4">MyFitnessPal</th>
                                <th className="p-4">Fittr</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            {[
                                { feat: "Camera Food Logger", us: true, others: [false, false] },
                                { feat: "Indian Food Database", us: true, others: ["Limited", "Limited"] },
                                { feat: "Price", us: "₹4.99/mo", others: ["₹999/mo", "₹299/mo"] },
                                { feat: "Founder Story", us: true, others: [false, false] },
                                { feat: "Community", us: true, others: ["Limited", "Limited"] }
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-gray-800 hover:bg-white/5">
                                    <td className="p-4 font-medium">{row.feat}</td>
                                    <td className="p-4 font-bold text-brand-cyan">
                                        {row.us === true ? <Check className="w-5 h-5" /> : row.us}
                                    </td>
                                    <td className="p-4 opacity-50">
                                        {row.others[0] === false ? <X className="w-5 h-5" /> : row.others[0]}
                                    </td>
                                    <td className="p-4 opacity-50">
                                        {row.others[1] === false ? <X className="w-5 h-5" /> : row.others[1]}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="text-center mt-20">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform?</h2>
            <div onClick={() => onNavigate('waitlist')}>
                <GradientButton variant="variant">Start Free Trial</GradientButton>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
