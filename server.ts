import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Fingerprint, Lock, ShieldCheck, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function AdminAuth() {
  const [show2FA, setShow2FA] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [totp, setTotp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInitialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setIsLoading(true);
    // Mimic API latency
    await new Promise(r => setTimeout(r, 1000));
    setShow2FA(true);
    setIsLoading(false);
    toast.success('Credentials verified. Please enter 2FA code.');
  };

  const handle2FAChallenge = async () => {
    const code = totp.join('');
    if (code.length < 6) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: username, password, role: 'admin', totp: code })
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Admin access granted');
        navigate('/');
      } else {
        toast.error(result.message);
      }
    } catch (e) {
      toast.error('System error');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-black">
      <div className="w-full max-w-[440px]">
        
        {/* Security Warning */}
        <div className="mb-10 text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <ShieldAlert size={32} />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">
            Restricted Access
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">Command Center</h1>
          <p className="text-slate-500 text-sm font-medium">Internal authorization required for deployment</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[40px] p-10 shadow-2xl border border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-blue-500 to-purple-500" />
          
          {!show2FA ? (
            <motion.form 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onSubmit={handleInitialLogin}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold uppercase text-[10px] tracking-widest px-1">Admin Identity</Label>
                <div className="relative">
                  <Input 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin_root" 
                    className="h-14 bg-slate-950 border-slate-800 focus:bg-black focus:border-red-500 text-white rounded-2xl pl-12 transition-all" 
                  />
                  <Fingerprint className="absolute left-4 top-4 text-slate-600" size={24} />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 font-bold uppercase text-[10px] tracking-widest px-1">Master Key</Label>
                <div className="relative">
                  <Input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="h-14 bg-slate-950 border-slate-800 focus:bg-black focus:border-red-500 text-white rounded-2xl pl-12 transition-all" 
                  />
                  <Lock className="absolute left-4 top-4 text-slate-600" size={24} />
                </div>
              </div>

              <Button 
                disabled={!username || !password || isLoading}
                className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-red-900/20 group/btn"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Initialize Auth <KeyRound size={18} className="group-hover:rotate-45 transition-transform" />
                  </span>
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Multi-Factor Auth</h2>
                <p className="text-slate-500 text-sm">Enter code from your authenticator app</p>
              </div>

              <div className="flex gap-2 justify-center">
                {totp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newTotp = [...totp];
                      newTotp[idx] = e.target.value;
                      setTotp(newTotp);
                      if (e.target.value && e.target.nextSibling) (e.target.nextSibling as HTMLInputElement).focus();
                    }}
                    className="w-12 h-16 text-center text-xl font-black bg-slate-950 border-2 border-slate-800 text-white focus:border-blue-500 rounded-xl outline-none"
                  />
                ))}
              </div>

              <Button 
                onClick={handle2FAChallenge}
                disabled={totp.some(d => !d) || isLoading}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl"
              >
                {isLoading ? 'Verifying...' : 'Finalize Session'}
              </Button>

              <button onClick={() => setShow2FA(false)} className="w-full text-center text-xs font-bold text-slate-500 hover:text-white transition-colors">
                Back to credentials
              </button>
            </motion.div>
          )}

          <div className="mt-8 pt-8 border-t border-slate-800 text-center">
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest leading-relaxed">
              Cybersecurity Protocol 4.2 <br />
              All actions are logged & encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
