import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Activity, Calculator as CalcIcon, CheckCircle, ChevronRight, RefreshCw } from 'lucide-react';
import { UserMetrics, Gender, ActivityLevel, Goal, CalculatorResult } from '../types';
import { ACTIVITY_MULTIPLIERS, GOAL_MODIFIERS, ACTIVITY_LABELS, GOAL_LABELS } from '../constants';
import { GradientButton } from './ui/gradient-button';

const Calculator: React.FC = () => {
  const [metrics, setMetrics] = useState<UserMetrics>({
    gender: Gender.MALE,
    age: 25,
    height: 170,
    weight: 70,
    activity: ActivityLevel.SEDENTARY,
    goal: Goal.LOSE_WEIGHT
  });

  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = () => {
    // Mifflin-St Jeor Equation
    let bmr = (10 * metrics.weight) + (6.25 * metrics.height) - (5 * metrics.age);
    
    if (metrics.gender === Gender.MALE) {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[metrics.activity]);
    const targetCalories = Math.round(tdee + GOAL_MODIFIERS[metrics.goal]);

    // Simple macro split logic (can be refined)
    // Protein: ~2g per kg of weight (good for Indian diet focus on protein)
    // Fat: ~0.8g per kg
    // Carbs: Remainder
    
    let protein = Math.round(metrics.weight * 2.2); // ~1g per lb or 2.2g per kg (high protein)
    if (metrics.goal === Goal.LOSE_WEIGHT) protein = Math.round(metrics.weight * 2.0);
    
    // Ensure protein isn't impossibly high for lower calorie diets
    const proteinCals = protein * 4;
    
    let fats = Math.round((targetCalories * 0.25) / 9); // 25% fats
    const fatsCals = fats * 9;
    
    let carbs = Math.round((targetCalories - proteinCals - fatsCals) / 4);
    
    // Fallback if calculations go weird (negative carbs etc)
    if (carbs < 50) {
        carbs = 50;
        fats = Math.round((targetCalories - proteinCals - (carbs * 4)) / 9);
    }

    setResult({
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      macros: {
        protein,
        fats,
        carbs
      }
    });
  };

  const handleInputChange = (field: keyof UserMetrics, value: any) => {
    setMetrics(prev => ({ ...prev, [field]: value }));
  };

  const chartData = useMemo(() => {
    if (!result) return [];
    return [
      { name: 'Protein', value: result.macros.protein, color: '#00BCD4' }, // Cyan
      { name: 'Carbs', value: result.macros.carbs, color: '#FF9800' }, // Orange
      { name: 'Fats', value: result.macros.fats, color: '#4CAF50' }, // Green
    ];
  }, [result]);

  return (
    <div id="calculator" className="bg-brand-navy border border-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Input Section */}
        <div className="flex-1 space-y-6">
            <div>
                <h2 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-2">
                    <CalcIcon className="text-brand-cyan" /> Metabolic Calculator
                </h2>
                <p className="text-gray-400">Calculate your precise calorie needs based on science.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-mono">GENDER</label>
                    <div className="flex bg-brand-dark rounded-xl p-1 border border-gray-700">
                        <button 
                            onClick={() => handleInputChange('gender', Gender.MALE)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${metrics.gender === Gender.MALE ? 'bg-brand-cyan text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Male
                        </button>
                        <button 
                            onClick={() => handleInputChange('gender', Gender.FEMALE)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${metrics.gender === Gender.FEMALE ? 'bg-brand-cyan text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Female
                        </button>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-mono">AGE (years)</label>
                    <input 
                        type="number" 
                        value={metrics.age}
                        onChange={(e) => handleInputChange('age', Number(e.target.value))}
                        className="w-full bg-brand-dark border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan font-mono"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-mono">HEIGHT (cm)</label>
                    <input 
                        type="number" 
                        value={metrics.height}
                        onChange={(e) => handleInputChange('height', Number(e.target.value))}
                        className="w-full bg-brand-dark border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan font-mono"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-mono">WEIGHT (kg)</label>
                    <input 
                        type="number" 
                        value={metrics.weight}
                        onChange={(e) => handleInputChange('weight', Number(e.target.value))}
                        className="w-full bg-brand-dark border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan font-mono"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-400 font-mono">ACTIVITY LEVEL</label>
                <select 
                    value={metrics.activity}
                    onChange={(e) => handleInputChange('activity', e.target.value)}
                    className="w-full bg-brand-dark border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-brand-cyan font-sans"
                >
                    {Object.entries(ACTIVITY_LABELS).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-400 font-mono">YOUR GOAL</label>
                <div className="grid grid-cols-3 gap-2">
                    {Object.entries(GOAL_LABELS).map(([key, label]) => (
                         <button 
                         key={key}
                         onClick={() => handleInputChange('goal', key)}
                         className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-medium border transition-all ${metrics.goal === key ? 'bg-brand-orange/20 border-brand-orange text-brand-orange' : 'bg-brand-dark border-gray-700 text-gray-400 hover:border-gray-500'}`}
                     >
                         {label}
                     </button>
                    ))}
                </div>
            </div>

            <GradientButton 
                onClick={calculate}
                variant="variant"
                className="w-full flex items-center justify-center gap-2"
            >
                <Activity className="w-5 h-5" /> Calculate My Plan
            </GradientButton>
        </div>

        {/* Results Section */}
        <div className="flex-1 bg-brand-dark rounded-2xl border border-gray-800 p-6 flex flex-col justify-center relative">
            {!result ? (
                <div className="text-center text-gray-500 py-10">
                    <RefreshCw className="w-12 h-12 mx-auto mb-4 opacity-50 animate-spin-slow" />
                    <p>Enter your details to generate your metabolic profile.</p>
                </div>
            ) : (
                <div className="animate-fade-in space-y-6">
                     <div className="text-center">
                        <h3 className="text-gray-400 text-sm font-mono tracking-wider mb-1">DAILY CALORIE TARGET</h3>
                        <div className="text-5xl font-heading font-bold text-white mb-2">
                            {result.targetCalories} <span className="text-lg text-brand-cyan font-normal">kcal</span>
                        </div>
                        <div className="flex justify-center gap-4 text-xs text-gray-400">
                            <span className="px-3 py-1 bg-gray-800 rounded-full">BMR: {result.bmr}</span>
                            <span className="px-3 py-1 bg-gray-800 rounded-full">TDEE: {result.tdee}</span>
                        </div>
                    </div>

                    <div className="h-48 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0D1B2A', borderColor: '#334155', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <span className="block text-xs text-gray-500">MACROS</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-brand-navy p-3 rounded-lg border-l-4 border-brand-cyan">
                            <div className="text-xs text-gray-400 mb-1">Protein</div>
                            <div className="font-mono font-bold text-lg">{result.macros.protein}g</div>
                        </div>
                        <div className="bg-brand-navy p-3 rounded-lg border-l-4 border-brand-orange">
                            <div className="text-xs text-gray-400 mb-1">Carbs</div>
                            <div className="font-mono font-bold text-lg">{result.macros.carbs}g</div>
                        </div>
                        <div className="bg-brand-navy p-3 rounded-lg border-l-4 border-brand-green">
                            <div className="text-xs text-gray-400 mb-1">Fats</div>
                            <div className="font-mono font-bold text-lg">{result.macros.fats}g</div>
                        </div>
                    </div>

                    <div className="bg-brand-cyan/10 border border-brand-cyan/20 p-4 rounded-xl flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-brand-cyan mb-1">Coach's Tip</h4>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                To hit {result.macros.protein}g protein on an Indian diet, include a scoop of whey, 200g paneer/chicken, or extra dal/soya chunks daily.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;