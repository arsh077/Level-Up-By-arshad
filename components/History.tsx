
import React from 'react';
import { getDailyLogs } from '../lib/db';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const History: React.FC = () => {
  const logs = getDailyLogs();
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Generate calendar grid
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-brand-navy p-6 pb-24">
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">History</h1>
            <div className="flex items-center gap-4 bg-brand-dark px-4 py-2 rounded-full border border-gray-800">
                <ChevronLeft className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-white font-mono">{currentMonth}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
        </header>

        <div className="grid grid-cols-7 gap-2 mb-8">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                <div key={d} className="text-center text-xs text-gray-500 font-bold mb-2">{d}</div>
            ))}
            {days.map(day => {
                const dateKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const hasLog = logs[dateKey];
                // Simple status logic
                let statusColor = 'bg-gray-800';
                if (hasLog) {
                    const cals = Object.values(hasLog.meals).flat().reduce((a, b) => a + b.calories, 0);
                    if (cals > 0) statusColor = 'bg-green-500'; // Simply green if tracked for now
                }

                return (
                    <div key={day} className="aspect-square flex flex-col items-center justify-center relative rounded-lg hover:bg-white/5 cursor-pointer">
                        <span className={`text-sm ${hasLog ? 'text-white' : 'text-gray-600'}`}>{day}</span>
                        <div className={`w-1.5 h-1.5 rounded-full mt-1 ${statusColor}`}></div>
                    </div>
                )
            })}
        </div>

        <div className="bg-brand-dark rounded-2xl p-6 border border-gray-800">
            <h3 className="text-white font-bold mb-4">Today's Detail</h3>
            <p className="text-gray-400 text-sm">Select a date above to view details.</p>
        </div>
    </div>
  );
};

export default History;
