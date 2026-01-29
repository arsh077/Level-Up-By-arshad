
import React, { useState } from 'react';
import { GradientButton } from './ui/gradient-button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { UserProfile, Gender, ActivityLevel } from '../types';
import { calculateMacros, saveUserProfile } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: 'Guest',
    age: 25,
    gender: Gender.MALE,
    height: 170, // cm
    weight: 75, // kg
    targetWeight: 70,
    activity: ActivityLevel.SEDENTARY,
    dietType: [],
    region: 'North',
    spiceLevel: 2,
    cookingStyle: [],
    shortGoal: ''
  });

  const updateData = (key: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleFinish = () => {
    // 1. Calculate BMR/TDEE
    const tempProfile = { ...formData } as UserProfile;
    const stats = calculateMacros(tempProfile);
    
    // 2. Create Full Profile
    const finalProfile: UserProfile = {
      ...tempProfile,
      id: 'user_' + Date.now(),
      ...stats,
      onboardingComplete: true,
      createdAt: new Date().toISOString()
    };

    // 3. Save
    saveUserProfile(finalProfile);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-brand-navy flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
            <div 
                className="h-full bg-brand-cyan transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
            ></div>
        </div>

        <div className="w-full max-w-md animate-fade-in">
            {/* SCREEN 1: WELCOME */}
            {step === 1 && (
                <div className="text-center space-y-8">
                    <div className="text-3xl font-heading font-extrabold text-white">
                        LEVEL <span className="text-brand-cyan">UP</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white leading-tight">
                        Body develops in the <span className="gradient-text">kitchen.</span>
                    </h1>
                    
                    <div className="space-y-4 text-left bg-brand-dark p-6 rounded-2xl border border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="p-1 bg-brand-green/20 rounded-full"><Check className="w-4 h-4 text-brand-green" /></div>
                            <span className="text-gray-300">Personalized Indian nutrition plan</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-1 bg-brand-green/20 rounded-full"><Check className="w-4 h-4 text-brand-green" /></div>
                            <span className="text-gray-300">AI Food Tracking (Roti, Dal, etc.)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-1 bg-brand-green/20 rounded-full"><Check className="w-4 h-4 text-brand-green" /></div>
                            <span className="text-gray-300">Daily habit accountability</span>
                        </div>
                    </div>

                    <div onClick={handleNext}>
                        <GradientButton variant="variant" className="w-full py-4 text-lg">Get Started</GradientButton>
                    </div>
                    <button className="text-gray-500 text-sm hover:text-white">Continue as Guest</button>
                </div>
            )}

            {/* SCREEN 2: BASIC INFO */}
            {step === 2 && (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white">Basic Details</h2>
                        <p className="text-gray-400">Let's calculate your metabolic baseline.</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-500 uppercase font-bold">Your Name</label>
                            <input 
                                type="text" 
                                value={formData.name} 
                                onChange={e => updateData('name', e.target.value)}
                                className="w-full bg-brand-dark border border-gray-700 rounded-xl p-3 text-white focus:border-brand-cyan outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold">Age</label>
                                <input 
                                    type="number" 
                                    value={formData.age} 
                                    onChange={e => updateData('age', Number(e.target.value))}
                                    className="w-full bg-brand-dark border border-gray-700 rounded-xl p-3 text-white focus:border-brand-cyan outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold">Gender</label>
                                <select 
                                    value={formData.gender}
                                    onChange={e => updateData('gender', e.target.value)}
                                    className="w-full bg-brand-dark border border-gray-700 rounded-xl p-3 text-white focus:border-brand-cyan outline-none"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 uppercase font-bold">Height (cm)</label>
                            <input 
                                type="number" 
                                value={formData.height} 
                                onChange={e => updateData('height', Number(e.target.value))}
                                className="w-full bg-brand-dark border border-gray-700 rounded-xl p-3 text-white focus:border-brand-cyan outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 uppercase font-bold">Current Weight (kg)</label>
                            <input 
                                type="number" 
                                value={formData.weight} 
                                onChange={e => updateData('weight', Number(e.target.value))}
                                className="w-full bg-brand-dark border border-gray-700 rounded-xl p-3 text-white focus:border-brand-cyan outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button onClick={handleBack} className="flex-1 py-3 rounded-xl bg-gray-800 text-gray-300">Back</button>
                        <button onClick={handleNext} className="flex-1 py-3 rounded-xl bg-brand-cyan text-brand-navy font-bold">Next</button>
                    </div>
                </div>
            )}

            {/* SCREEN 3: GOAL & ACTIVITY */}
            {step === 3 && (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white">Goals & Activity</h2>
                        <p className="text-gray-400">Define your target.</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-500 uppercase font-bold">Target Weight (kg)</label>
                            <input 
                                type="number" 
                                value={formData.targetWeight} 
                                onChange={e => updateData('targetWeight', Number(e.target.value))}
                                className="w-full bg-brand-dark border border-gray-700 rounded-xl p-3 text-white focus:border-brand-cyan outline-none"
                            />
                        </div>

                         <div>
                            <label className="text-xs text-gray-500 uppercase font-bold">Activity Level</label>
                            <div className="space-y-2 mt-1">
                                {[
                                    { val: 'sedentary', label: 'Sedentary', sub: 'Office job, no exercise' },
                                    { val: 'light', label: 'Lightly Active', sub: '1-2 workouts/week' },
                                    { val: 'moderate', label: 'Moderate', sub: '3-5 workouts/week' },
                                    { val: 'very_active', label: 'Very Active', sub: '6-7 workouts/week' }
                                ].map(opt => (
                                    <div 
                                        key={opt.val}
                                        onClick={() => updateData('activity', opt.val)}
                                        className={`p-3 rounded-xl border cursor-pointer transition-all ${formData.activity === opt.val ? 'bg-brand-cyan/20 border-brand-cyan' : 'bg-brand-dark border-gray-800 hover:border-gray-600'}`}
                                    >
                                        <div className="font-bold text-white">{opt.label}</div>
                                        <div className="text-xs text-gray-400">{opt.sub}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Projection Banner */}
                        <div className="bg-brand-navy p-4 rounded-xl border border-dashed border-gray-700">
                             <div className="text-xs text-gray-400 mb-1">PROJECTION</div>
                             <div className="flex justify-between items-center">
                                 <span className="text-white font-bold">
                                     To lose {formData.weight! - formData.targetWeight!}kg
                                 </span>
                                 <span className="px-2 py-0.5 bg-brand-green/20 text-brand-green text-xs rounded font-bold">
                                     SAFE PACE
                                 </span>
                             </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button onClick={handleBack} className="flex-1 py-3 rounded-xl bg-gray-800 text-gray-300">Back</button>
                        <button onClick={handleNext} className="flex-1 py-3 rounded-xl bg-brand-cyan text-brand-navy font-bold">Next</button>
                    </div>
                </div>
            )}

            {/* SCREEN 4: PREFERENCES */}
            {step === 4 && (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white">Food Preferences</h2>
                        <p className="text-gray-400">Tailoring for Indian kitchens.</p>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Region</label>
                            <div className="flex flex-wrap gap-2">
                                {['North', 'South', 'East', 'West', 'Mixed'].map(region => (
                                    <button
                                        key={region}
                                        onClick={() => updateData('region', region)}
                                        className={`px-4 py-2 rounded-full text-sm border ${formData.region === region ? 'bg-brand-orange text-white border-brand-orange' : 'bg-brand-dark border-gray-700 text-gray-400'}`}
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>
                        </div>

                         <div>
                            <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Diet Type (Multi-select)</label>
                            <div className="flex flex-wrap gap-2">
                                {['Veg', 'Non-Veg', 'Eggetarian', 'Vegan', 'Jain'].map(diet => (
                                    <button
                                        key={diet}
                                        onClick={() => {
                                            const current = formData.dietType || [];
                                            const updated = current.includes(diet) 
                                                ? current.filter(d => d !== diet)
                                                : [...current, diet];
                                            updateData('dietType', updated);
                                        }}
                                        className={`px-4 py-2 rounded-full text-sm border ${formData.dietType?.includes(diet) ? 'bg-brand-cyan text-brand-navy border-brand-cyan' : 'bg-brand-dark border-gray-700 text-gray-400'}`}
                                    >
                                        {diet}
                                    </button>
                                ))}
                            </div>
                        </div>

                         <div>
                            <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Short Goal</label>
                            <textarea 
                                value={formData.shortGoal}
                                onChange={e => updateData('shortGoal', e.target.value)}
                                placeholder="E.g., Fit into my wedding suit by December"
                                className="w-full bg-brand-dark border border-gray-700 rounded-xl p-3 text-white text-sm focus:border-brand-cyan outline-none h-24 resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button onClick={handleBack} className="flex-1 py-3 rounded-xl bg-gray-800 text-gray-300">Back</button>
                        <button onClick={handleFinish} className="flex-1 py-3 rounded-xl bg-brand-cyan text-brand-navy font-bold">Finish Setup</button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default Onboarding;
