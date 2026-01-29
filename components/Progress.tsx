
import React from 'react';
import { UserProfile } from '../types';
import { TrendingUp, Award, Calendar, Flame } from 'lucide-react';

interface ProgressProps {
    user: UserProfile;
}

const Progress: React.FC<ProgressProps> = ({ user }) => {
  return (
    <div className="min-h-screen bg-brand-navy p-6 pb-24">
        <h1 className="text-2xl font-bold text-white mb-6">Your Progress</h1>

        {/* Weight Card */}
        <div className="bg-brand-dark p-6 rounded-2xl border border-gray-800 mb-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="text-xs text-gray-400 uppercase font-bold">Current Weight</div>
                    <div className="text-4xl font-heading font-bold text-white">{user.weight} <span className="text-lg text-gray-500 font-normal">kg</span></div>
                </div>
                <div className="text-right">
                     <div className="text-xs text-gray-400 uppercase font-bold">Goal</div>
                     <div className="text-xl font-bold text-brand-cyan">{user.targetWeight} kg</div>
                </div>
            </div>
            <div className="w-full h-32 bg-brand-navy rounded-xl border border-gray-800 flex items-center justify-center relative overflow-hidden">
                {/* Mock Chart */}
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end px-4 pb-4 gap-2">
                    {[60, 62, 58, 65, 63, 70, 72].map((h, i) => (
                        <div key={i} className="flex-1 bg-brand-cyan/20 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                </div>
                <span className="text-xs text-gray-500 relative z-10 bg-brand-navy px-2 py-1 rounded">Chart needs more data</span>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-brand-navy p-4 rounded-xl border border-gray-800">
                <Flame className="w-6 h-6 text-brand-orange mb-2" />
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-xs text-gray-400">Day Streak</div>
            </div>
            <div className="bg-brand-navy p-4 rounded-xl border border-gray-800">
                <TrendingUp className="w-6 h-6 text-brand-green mb-2" />
                <div className="text-2xl font-bold text-white">-0.6</div>
                <div className="text-xs text-gray-400">kg / week avg</div>
            </div>
        </div>

        {/* Badges */}
        <h3 className="text-white font-bold mb-4">Badges</h3>
        <div className="grid grid-cols-3 gap-3">
            <div className="bg-brand-dark border border-brand-orange/50 p-3 rounded-xl flex flex-col items-center text-center">
                <Award className="w-8 h-8 text-brand-orange mb-2" />
                <div className="text-xs font-bold text-white">7 Day Streak</div>
            </div>
            <div className="bg-brand-dark border border-gray-800 p-3 rounded-xl flex flex-col items-center text-center opacity-50 grayscale">
                <Award className="w-8 h-8 text-gray-400 mb-2" />
                <div className="text-xs font-bold text-gray-400">Month God</div>
            </div>
            <div className="bg-brand-dark border border-gray-800 p-3 rounded-xl flex flex-col items-center text-center opacity-50 grayscale">
                <Award className="w-8 h-8 text-gray-400 mb-2" />
                <div className="text-xs font-bold text-gray-400">Protein Pro</div>
            </div>
        </div>
    </div>
  );
};

export default Progress;
