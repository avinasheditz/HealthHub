import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function VerifyOTP() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const role = searchParams.get('role');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const int = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(int);
  }, []);

  const handleChange = (val: string, index: number) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    if (val && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 6) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: id, role, otp: code })
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Verification successful!');
        navigate('/');
      } else {
        toast.error(result.message);
      }
    } catch (e) {
      toast.error('Verification failed');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-6">
      <div className="w-full max-w-[480px]">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors">
          <ArrowLeft size={18} />
          <span className="font-bold text-sm">Back</span>
        </button>

        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100 text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <ShieldCheck size={40} />
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Verify account</h2>
          <p className="text-slate-500 font-medium mb-12">
            Enter the 6-digit code sent to <br />
            <span className="font-bold text-slate-900">{id}</span>
          </p>

          <div className="flex gap-2 sm:gap-3 justify-center mb-10">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => { inputs.current[idx] = el; }}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-11 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl transition-all outline-none"
              />
            ))}
          </div>

          <Button 
            onClick={handleVerify}
            disabled={otp.some(d => !d) || isLoading}
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold text-lg mb-6 shadow-xl shadow-blue-100"
          >
            {isLoading ? 'Verifying...' : 'Verify & Continue'}
          </Button>

          <div className="flex flex-col items-center gap-4">
            <div className="text-sm font-medium text-slate-400">
              {timer > 0 ? (
                <span>Resend OTP in <span className="text-blue-600 font-bold">{Math.floor(timer/60)}:{String(timer%60).padStart(2, '0')}</span></span>
              ) : (
                <button className="text-blue-600 font-bold hover:underline flex items-center gap-2">
                  <RefreshCw size={16} /> Resend code
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
