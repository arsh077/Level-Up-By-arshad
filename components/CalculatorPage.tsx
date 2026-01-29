
import React from 'react';
import Calculator from './Calculator';
import { CameraModule } from './CameraModule';
import { Page } from '../types';
import { ArrowLeft } from 'lucide-react';

interface CalculatorPageProps {
  onNavigate: (page: Page) => void;
}

const CalculatorPage: React.FC<CalculatorPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-brand-navy min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center text-gray-400 hover:text-brand-cyan mb-8 transition-colors"
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </button>

        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
                System <span className="text-brand-cyan">Tools</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Unlock your personalized nutrition roadmap in 60 seconds. No login needed. Just pure metabolic science.
            </p>
        </div>

        {/* Main Calculator Component */}
        <div className="max-w-5xl mx-auto mb-20">
            <Calculator />
        </div>

        {/* Camera AI Module */}
        <div className="max-w-4xl mx-auto mb-20">
            <CameraModule />
        </div>

        {/* Detailed Explanation Section */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
            <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-brand-cyan">💡</span> The Science Made Simple
                </h3>
                <div className="space-y-6">
                    <div className="bg-brand-dark p-6 rounded-xl border border-gray-800">
                        <h4 className="font-bold text-brand-orange mb-2">BMR (Basal Metabolic Rate)</h4>
                        <p className="text-gray-400 text-sm">
                            This is your baseline. The calories you burn just by existing—breathing, thinking, sleeping. Even if you stay in bed for 24 hours, your body needs this energy.
                        </p>
                    </div>
                    <div className="bg-brand-dark p-6 rounded-xl border border-gray-800">
                        <h4 className="font-bold text-brand-green mb-2">TDEE (Total Daily Energy Expenditure)</h4>
                        <p className="text-gray-400 text-sm">
                            This is your true calorie budget. It combines your BMR with your daily movement and exercise. To lose weight, you simply need to eat slightly less than this number.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-white mb-6">Your Daily Meal Structure</h3>
                <div className="space-y-4">
                    {[
                        { meal: "Breakfast", cals: "500 kcal", options: "Oats + Milk + Banana OR 2 Eggs + 2 Roti" },
                        { meal: "Lunch", cals: "800 kcal", options: "3 Roti + Dal + Sabzi + Ghee OR Rice + Paneer" },
                        { meal: "Dinner", cals: "600 kcal", options: "2 Roti + Dal + Sabzi OR Fish Curry + Rice" },
                        { meal: "Snacks", cals: "400 kcal", options: "Makhana + Peanuts OR Curd + Granola" }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 border-b border-gray-800">
                            <div className="bg-brand-navy p-2 rounded text-brand-cyan font-mono text-sm whitespace-nowrap">
                                {item.cals}
                            </div>
                            <div>
                                <div className="font-bold text-white mb-1">{item.meal}</div>
                                <p className="text-sm text-gray-500">{item.options}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8">
                     <button onClick={() => onNavigate('features')} className="text-brand-cyan hover:underline text-sm">
                         View Full Meal Plans →
                     </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
