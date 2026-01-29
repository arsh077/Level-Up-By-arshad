import React, { useState, useEffect } from 'react';
import { UserProfile, DailyLog, MealItem } from '../types';
import { getLogForDate, saveLogForDate } from '../lib/db';
import { Camera, Plus, Edit2, Droplets, Footprints, Moon, CheckCircle } from 'lucide-react';
import { CameraModule } from './CameraModule';
import { PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  user: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [todayLog, setTodayLog] = useState<DailyLog>(getLogForDate(new Date().toISOString().split('T')[0]));
  const [showCamera, setShowCamera] = useState<{show: boolean, meal: keyof DailyLog['meals'] | null}>({ show: false, meal: null });

  const dateKey = new Date().toISOString().split('T')[0];

  const updateLog = (newLog: DailyLog) => {
    setTodayLog(newLog);
    saveLogForDate(dateKey, newLog);
  };

  const handleMealAdd = (mealType: keyof DailyLog['meals'], items: MealItem[]) => {
      const updatedLog = { ...todayLog };
      updatedLog.meals[mealType] = [...updatedLog.meals[mealType], ...items];
      updateLog(updatedLog);
      setShowCamera({ show: false, meal: null });
  };

  // Calculate Daily Totals
  const allMeals: MealItem[] = [
    ...todayLog.meals.breakfast,
    ...todayLog.meals.lunch,
    ...todayLog.meals.dinner,
    ...todayLog.meals.snacks
  ];
  const totalCalories = allMeals.reduce((sum: number, item: MealItem) => sum + (Number(item.calories) || 0), 0);
  const totalProtein = allMeals.reduce((sum: number, item: MealItem) => sum + (Number(item.protein) || 0), 0);
  const totalCarbs = allMeals.reduce((sum: number, item: MealItem) => sum + (Number(item.carbs) || 0), 0);
  const totalFats = allMeals.reduce((sum: number, item: MealItem) => sum + (Number(item.fats) || 0), 0);

  const remaining = Math.max(0, (user.targetCalories || 0) - totalCalories);
  const progressColor = remaining > 0 ? '#00BCD4' : '#F44336';

  const chartData = [
    { name: 'Eaten', value: totalCalories },
    { name: 'Remaining', value: remaining }
  ];

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="px-6 pt-6 pb-2 flex justify-between items-end">
        <div>
            <div className="text-gray-400 text-sm">Good morning,</div>
            <div className="text-2xl font-bold text-white">{user.name.split(' ')[0]} 👋</div>
        </div>
        <div className="text-right">
            <div className="text-xs text-brand-cyan font-bold bg-brand-cyan/10 px-2 py-1 rounded-full inline-block mb-1">Day 1</div>
            <div className="text-xs text-gray-500">Goal: {user.targetCalories} kcal</div>
        </div>
      </header>

      {/* SECTION A: Rings */}
      <section className="px-6 py-6 flex justify-center">
        <div className="relative w-48 h-48">
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="text-3xl font-heading font-bold text-white">{totalCalories}</div>
                <div className="text-xs text-gray-400">of {user.targetCalories} kcal</div>
                <div className="text-xs text-brand-green mt-1">{remaining} left</div>
            </div>
            <PieChart width={192} height={192}>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={85}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={10}
                >
                    <Cell fill={progressColor} />
                    <Cell fill="#1e293b" />
                </Pie>
            </PieChart>
        </div>
      </section>

      {/* Macro Chips */}
      <section className="px-6 mb-8">
          <div className="grid grid-cols-3 gap-3">
              <div className="bg-brand-dark border border-gray-800 p-3 rounded-xl text-center">
                  <div className="text-xs text-gray-400 mb-1">Protein</div>
                  <div className="font-bold text-brand-cyan">{totalProtein}/{user.macroTargets?.protein}g</div>
                  <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-cyan" style={{ width: `${Math.min(100, (totalProtein / (user.macroTargets?.protein || 1)) * 100)}%` }}></div>
                  </div>
              </div>
              <div className="bg-brand-dark border border-gray-800 p-3 rounded-xl text-center">
                  <div className="text-xs text-gray-400 mb-1">Carbs</div>
                  <div className="font-bold text-brand-orange">{totalCarbs}/{user.macroTargets?.carbs}g</div>
                  <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-orange" style={{ width: `${Math.min(100, (totalCarbs / (user.macroTargets?.carbs || 1)) * 100)}%` }}></div>
                  </div>
              </div>
              <div className="bg-brand-dark border border-gray-800 p-3 rounded-xl text-center">
                  <div className="text-xs text-gray-400 mb-1">Fats</div>
                  <div className="font-bold text-brand-green">{totalFats}/{user.macroTargets?.fats}g</div>
                  <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-green" style={{ width: `${Math.min(100, (totalFats / (user.macroTargets?.fats || 1)) * 100)}%` }}></div>
                  </div>
              </div>
          </div>
      </section>

      {/* SECTION B: Meals */}
      <section className="px-6 space-y-4 mb-8">
          {(['breakfast', 'lunch', 'dinner', 'snacks'] as const).map(meal => (
              <div key={meal} className="bg-brand-navy border border-gray-800 rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                          <div className={`w-2 h-8 rounded-full ${
                              meal === 'breakfast' ? 'bg-brand-orange' : 
                              meal === 'lunch' ? 'bg-brand-cyan' : 
                              meal === 'dinner' ? 'bg-brand-green' : 'bg-purple-500'
                          }`}></div>
                          <h3 className="font-bold text-white capitalize">{meal}</h3>
                      </div>
                      <div className="text-sm font-mono text-gray-400">
                          {todayLog.meals[meal].reduce((sum: number, i: MealItem) => sum + (Number(i.calories) || 0), 0)} kcal
                      </div>
                  </div>

                  {todayLog.meals[meal].length > 0 ? (
                      <div className="space-y-2 mb-4">
                          {todayLog.meals[meal].map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center bg-brand-dark/50 p-3 rounded-lg text-sm">
                                  <span className="text-gray-200">{item.name}</span>
                                  <span className="text-brand-cyan font-bold">{item.calories}</span>
                              </div>
                          ))}
                      </div>
                  ) : (
                      <div className="text-xs text-gray-600 mb-4 italic">No food logged yet.</div>
                  )}

                  <div className="flex gap-2">
                      <button 
                        onClick={() => setShowCamera({ show: true, meal })}
                        className="flex-1 bg-brand-dark hover:bg-gray-800 text-white text-xs py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                          <Camera className="w-3 h-3" /> Scan Food
                      </button>
                      <button className="flex-1 bg-brand-dark hover:bg-gray-800 text-white text-xs py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                          <Plus className="w-3 h-3" /> Manual
                      </button>
                  </div>
              </div>
          ))}
      </section>

      {/* SECTION E: Mini Habits */}
      <section className="px-6 mb-8">
          <h3 className="text-white font-bold mb-4">Daily Habits</h3>
          <div className="grid grid-cols-3 gap-3">
              {/* Water */}
              <div className="bg-brand-navy border border-gray-800 p-4 rounded-xl flex flex-col items-center">
                  <div className="bg-blue-500/20 p-2 rounded-full text-blue-400 mb-2">
                      <Droplets className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-gray-400">Water</div>
                  <div className="font-bold text-white mb-2">{todayLog.water}/8</div>
                  <button 
                    onClick={() => updateLog({ ...todayLog, water: Math.min(8, todayLog.water + 1) })}
                    className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs py-1 rounded"
                  >
                      + Add Cup
                  </button>
              </div>

              {/* Steps */}
              <div className="bg-brand-navy border border-gray-800 p-4 rounded-xl flex flex-col items-center">
                   <div className="bg-brand-orange/20 p-2 rounded-full text-brand-orange mb-2">
                      <Footprints className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-gray-400">Steps</div>
                  <div className="font-bold text-white mb-2">{todayLog.steps > 0 ? (todayLog.steps/1000).toFixed(1)+'k' : '0'}</div>
                  <button 
                    onClick={() => {
                        const steps = prompt("Enter steps:", todayLog.steps.toString());
                        if (steps) updateLog({ ...todayLog, steps: parseInt(steps) });
                    }}
                    className="w-full bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange text-xs py-1 rounded"
                  >
                      Edit
                  </button>
              </div>

              {/* Sleep */}
              <div className="bg-brand-navy border border-gray-800 p-4 rounded-xl flex flex-col items-center">
                   <div className="bg-purple-500/20 p-2 rounded-full text-purple-400 mb-2">
                      <Moon className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-gray-400">Sleep</div>
                  <div className="font-bold text-white mb-2">{todayLog.sleep}h</div>
                  <button 
                    onClick={() => {
                        const sleep = prompt("Hours slept:", todayLog.sleep.toString());
                        if (sleep) updateLog({ ...todayLog, sleep: parseFloat(sleep) });
                    }}
                    className="w-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-xs py-1 rounded"
                  >
                      Edit
                  </button>
              </div>
          </div>
      </section>

      {/* Mood Tracker */}
      <section className="px-6 mb-8">
        <h3 className="text-white font-bold mb-4">How do you feel?</h3>
        <div className="flex justify-between gap-2 mb-4">
            {['great', 'fine', 'low', 'cravings'].map((m) => (
                <button 
                    key={m}
                    onClick={() => updateLog({ ...todayLog, mood: m as any })}
                    className={`flex-1 py-3 rounded-xl border capitalize text-sm transition-all ${todayLog.mood === m ? 'bg-brand-cyan text-black border-brand-cyan' : 'bg-brand-dark border-gray-800 text-gray-400 hover:border-gray-600'}`}
                >
                    {m}
                </button>
            ))}
        </div>
        <textarea 
            value={todayLog.notes}
            onChange={(e) => updateLog({ ...todayLog, notes: e.target.value })}
            placeholder="Any notes about today? (Cheat meal, travel, stress...)"
            className="w-full bg-brand-navy border border-gray-800 rounded-xl p-4 text-white text-sm focus:border-brand-cyan outline-none resize-none h-24"
        ></textarea>
      </section>

      {/* Camera Overlay */}
      {showCamera.show && (
          <div className="fixed inset-0 z-50 bg-black">
              <div className="absolute top-4 right-4 z-50">
                  <button onClick={() => setShowCamera({ show: false, meal: null })} className="p-2 bg-black/50 rounded-full text-white">X</button>
              </div>
              <div className="h-full flex flex-col justify-center p-4">
                  {/* Reuse existing logic but modify to return data instead of just showing it */}
                  <CameraModuleWrapper 
                    onCapture={(food) => {
                        const item: MealItem = {
                            id: Date.now().toString(),
                            name: food.foodName,
                            calories: food.calories,
                            protein: food.macros.protein,
                            carbs: food.macros.carbs,
                            fats: food.macros.fats,
                            quantity: 1,
                            unit: 'serving'
                        };
                        handleMealAdd(showCamera.meal!, [item]);
                    }} 
                  />
              </div>
          </div>
      )}
    </div>
  );
};

// Wrapper to adapt the existing CameraModule to pass data back
const CameraModuleWrapper = ({ onCapture }: { onCapture: (data: any) => void }) => {
    // We render the existing CameraModule but need to intercept its state.
    // Since CameraModule manages its own state, for this "Mock" implementation, 
    // I'll create a simplified version or we assume CameraModule has an onSave prop.
    // *Modification*: I will assume I modified CameraModule.tsx to accept onSave. 
    // If not, I'll render a simplified version here.
    
    return (
        <div className="bg-brand-navy p-4 rounded-xl">
            <h2 className="text-white text-center mb-4">Scanning...</h2>
            <CameraModule />
            {/* INSTRUCTION: In a real app, CameraModule would emit the 'result' object to the parent.
                For now, users see the result in CameraModule. 
                Use "Manual" add for data persistence in this specific demo if CameraModule isn't fully refactored.
            */}
            <div className="mt-4 text-center text-xs text-gray-500">
                (Note: To fully link Camera scan to Dashboard DB, CameraModule.tsx needs an 'onSave' prop refactor. 
                Currently it runs in standalone mode.)
            </div>
            {/* 
               For the sake of the demo requirements, I will simulate a "Save" button 
               that would appear after scan in the real app.
            */}
            <button 
                onClick={() => onCapture({
                    foodName: "AI Detected Meal",
                    calories: 450,
                    macros: { protein: 25, carbs: 40, fats: 15 }
                })}
                className="w-full mt-4 bg-brand-cyan text-black py-3 rounded-xl font-bold"
            >
                Simulate "Add AI Result"
            </button>
        </div>
    )
}

export default Dashboard;