import React, { useState } from 'react';
import { GradientButton } from './ui/gradient-button';
import { Check, Star, Loader2 } from 'lucide-react';
import { saveUser } from '../lib/db';

const WaitlistPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: 'Lose Weight'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Save to DB (Simulated Backend)
    const success = await saveUser({
        ...formData,
        date: new Date().toISOString()
    });

    setLoading(false);
    if (success) {
        setSubmitted(true);
    }
  };

  if (submitted) {
    return (
        <div className="min-h-screen bg-brand-navy flex items-center justify-center p-6">
            <div className="max-w-lg w-full bg-brand-dark p-8 rounded-3xl border border-brand-cyan/30 text-center shadow-2xl relative overflow-hidden animate-fade-in">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-cyan to-brand-green"></div>
                <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-brand-green" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">YOU'RE IN! 🎉</h2>
                <p className="text-gray-300 mb-8">
                    Your spot is reserved. We'll email you at <strong>{formData.email}</strong>.
                </p>
                <div className="bg-brand-navy p-4 rounded-xl mb-6 text-left">
                    <div className="text-xs text-gray-500 uppercase font-bold mb-2">Waitlist Status</div>
                    <div className="flex justify-between items-end">
                        <span className="text-2xl font-mono text-white">#724</span>
                        <span className="text-sm text-brand-cyan">~180 ahead of you</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2">
                        <div className="bg-brand-cyan h-1.5 rounded-full w-2/3"></div>
                    </div>
                </div>
                <button 
                    onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', goal: 'Lose Weight' });
                    }} 
                    className="text-sm text-gray-500 hover:text-white underline"
                >
                    Back to form
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-brand-navy min-h-screen pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div>
                <div className="inline-block bg-brand-orange/20 text-brand-orange px-4 py-1 rounded-full text-xs font-bold mb-6 border border-brand-orange/20">
                    LIMITED SPOTS AVAILABLE
                </div>
                <h1 className="text-5xl font-heading font-bold mb-6">
                    Get Early Access to <span className="gradient-text">LEVEL UP</span>
                </h1>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                    Be the first to experience the revolution. Founding members get lifetime benefits and direct access to the team.
                </p>
                
                <div className="space-y-6 mb-12">
                    {[
                        "3 months premium free (Worth ₹1,500)",
                        "Exclusive founding member badge",
                        "Lifetime 50% discount on future plans",
                        "Direct access to Arshad for Q&A"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0">
                                <Check className="w-4 h-4 text-brand-green" />
                            </div>
                            <span className="text-gray-200">{item}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-brand-dark p-6 rounded-2xl border border-gray-800">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                                <img key={i} src={`https://picsum.photos/40/40?random=${i+10}`} className="w-10 h-10 rounded-full border-2 border-brand-dark" alt="" />
                            ))}
                        </div>
                        <div>
                            <div className="text-white font-bold">950+ People waiting</div>
                            <div className="text-xs text-gray-500">Joined in last 24h</div>
                        </div>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-cyan to-brand-green h-full w-[85%]"></div>
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="bg-brand-dark p-8 md:p-10 rounded-3xl border border-gray-800 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Secure Your Spot</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-mono text-gray-400">FIRST NAME</label>
                            <input 
                                required 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Aditya" 
                                className="w-full bg-brand-navy border border-gray-700 rounded-xl p-3 text-white focus:border-brand-cyan focus:outline-none" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-mono text-gray-400">PHONE (Optional)</label>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91" 
                                className="w-full bg-brand-navy border border-gray-700 rounded-xl p-3 text-white focus:border-brand-cyan focus:outline-none" 
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-mono text-gray-400">EMAIL ADDRESS</label>
                        <input 
                            required 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="aditya@example.com" 
                            className="w-full bg-brand-navy border border-gray-700 rounded-xl p-3 text-white focus:border-brand-cyan focus:outline-none" 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-mono text-gray-400">MAIN GOAL</label>
                        <select 
                            name="goal"
                            value={formData.goal}
                            onChange={handleChange}
                            className="w-full bg-brand-navy border border-gray-700 rounded-xl p-3 text-white focus:border-brand-cyan focus:outline-none"
                        >
                            <option>Lose Weight</option>
                            <option>Gain Muscle</option>
                            <option>Improve Health</option>
                            <option>Build Habits</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        <GradientButton variant="variant" className="w-full py-4 text-lg" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : '✨ SAVE MY SPOT'}
                        </GradientButton>
                    </div>

                    <p className="text-xs text-center text-gray-500 mt-4">
                        By joining, you agree to receive updates. <br/> We respect your privacy.
                    </p>
                </form>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-24">
            <h2 className="text-2xl font-bold text-center mb-10">Common Questions</h2>
            <div className="space-y-4">
                {[
                    { q: "When will LEVEL UP launch?", a: "Target March 2026. Waitlist members get 2 weeks early access." },
                    { q: "Is it free or paid?", a: "Free tier for life. Premium at ₹4.99/month (3 months free for you)." },
                    { q: "Do I need technical knowledge?", a: "No. App is designed for everyone. Just tap, snap, done." }
                ].map((item, i) => (
                    <div key={i} className="bg-brand-dark p-6 rounded-xl border border-gray-800">
                        <h3 className="font-bold text-white mb-2">{item.q}</h3>
                        <p className="text-gray-400 text-sm">{item.a}</p>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default WaitlistPage;