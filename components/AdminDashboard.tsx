import React, { useEffect, useState } from 'react';
import { LogOut, Users, Download, Trash2, RefreshCw } from 'lucide-react';
import { getWaitlist, clearWaitlist } from '../lib/db';
import { WaitlistEntry } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [users, setUsers] = useState<WaitlistEntry[]>([]);
  
  useEffect(() => {
    // Load initial data
    setUsers(getWaitlist());

    // Setup a polling interval to simulate "Real-time" updates 
    // In a real Firebase app, this would be onSnapshot()
    const interval = setInterval(() => {
      setUsers(getWaitlist());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Name,Email,Phone,Goal,Date\n"
        + users.map(u => `${u.name},${u.email},${u.phone || ''},${u.goal},${new Date(u.date).toLocaleDateString()}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "levelup_waitlist.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to delete all data?")) {
        clearWaitlist();
        setUsers([]);
    }
  }

  return (
    <div className="min-h-screen bg-brand-navy">
      {/* Admin Header */}
      <header className="bg-brand-dark border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-cyan rounded-lg flex items-center justify-center font-bold text-brand-navy">
                AD
            </div>
            <div>
                <h1 className="text-white font-bold leading-tight">Admin Dashboard</h1>
                <p className="text-xs text-brand-cyan">Real-time Data View</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-brand-dark p-6 rounded-2xl border border-gray-800">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-brand-cyan/20 text-brand-cyan rounded-xl">
                        <Users className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-green-500 font-bold bg-green-500/10 px-2 py-1 rounded">+12% this week</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">{users.length}</div>
                <div className="text-sm text-gray-500">Total Waitlist Signups</div>
            </div>
            {/* Can add more stats here */}
        </div>

        {/* Data Table */}
        <div className="bg-brand-dark rounded-2xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Recent Signups <span className="text-xs font-normal text-gray-500 bg-gray-800 px-2 py-1 rounded-full">{users.length}</span>
                </h2>
                <div className="flex gap-2">
                    <button onClick={() => setUsers(getWaitlist())} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <button onClick={handleClear} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-sm transition-colors border border-red-500/20">
                        <Trash2 className="w-4 h-4" /> Clear
                    </button>
                    <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-brand-navy hover:bg-gray-800 border border-gray-700 rounded-lg text-sm text-white transition-colors">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-brand-navy text-xs font-mono text-gray-400 uppercase">
                            <th className="p-4 border-b border-gray-800">Name</th>
                            <th className="p-4 border-b border-gray-800">Email</th>
                            <th className="p-4 border-b border-gray-800">Phone</th>
                            <th className="p-4 border-b border-gray-800">Goal</th>
                            <th className="p-4 border-b border-gray-800">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">No signups yet.</td>
                            </tr>
                        ) : (
                            users.slice().reverse().map((user, i) => (
                                <tr key={i} className="hover:bg-brand-navy/50 transition-colors border-b border-gray-800 last:border-0">
                                    <td className="p-4 font-medium text-white">{user.name}</td>
                                    <td className="p-4 text-gray-300">{user.email}</td>
                                    <td className="p-4 text-gray-400">{user.phone || '-'}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded text-xs font-bold bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                                            {user.goal}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500 text-xs font-mono">
                                        {new Date(user.date).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;