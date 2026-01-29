import React, { useState } from 'react';
import { Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { GradientButton } from './ui/gradient-button';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate credentials as per user request
    if (email === 'arshed.anwar.1997@gmail.com' && password === 'Khurshid@1997') {
      onLogin();
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-brand-dark p-8 rounded-3xl border border-gray-800 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-cyan">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-gray-400 text-sm">Secure access for Level Up administrators</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 mb-6 flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 uppercase">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-navy border border-gray-700 rounded-xl p-3 text-white focus:border-brand-cyan focus:outline-none"
              placeholder="admin@levelup.in"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 uppercase">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-navy border border-gray-700 rounded-xl p-3 text-white focus:border-brand-cyan focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="pt-4">
            <GradientButton variant="variant" className="w-full">
              Login to Dashboard
            </GradientButton>
          </div>
        </form>

        <div className="mt-8 text-center">
            <a href="/" className="text-gray-500 text-sm hover:text-white flex items-center justify-center gap-2">
                <ArrowLeft className="w-3 h-3" /> Back to Website
            </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;