import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Github, 
  Chrome,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from 'sonner';
import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  GithubAuthProvider
} from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back to HealthHub!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Signed in with Google!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Google sign-in failed');
    }
  };

  const handleGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Signed in with GitHub!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'GitHub sign-in failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Left Side: Illustration & Trust */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-blue-600 text-white relative">
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 mb-12">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold">H</div>
              <span className="text-xl font-bold tracking-tight">HealthHub India</span>
            </Link>
            
            <h1 className="text-4xl font-bold mb-6 leading-tight">Your Health, <br />Our Priority.</h1>
            <p className="text-blue-100 text-lg mb-12 max-w-xs">Join over 10 million users who trust us for their healthcare needs.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                <CheckCircle2 className="text-blue-300" />
                <p className="text-sm font-medium">Safe & Secure Transactions</p>
              </div>
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                <ShieldCheck className="text-blue-300" />
                <p className="text-sm font-medium">Prescription-only Medicines</p>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-blue-200 mt-12">© 2026 HealthHub. Licensed under Drugs & Cosmetics Act, 1940.</p>
          
          {/* Decorative Circles */}
          <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-[200px] h-[200px] bg-blue-500/30 rounded-full blur-2xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Login</h2>
            <p className="text-slate-500 mb-10">Welcome back! Please enter your details.</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10 h-12 rounded-xl focus-visible:ring-blue-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs font-bold text-blue-600 hover:underline underline-offset-4">Forgot Password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-12 rounded-xl focus-visible:ring-blue-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-lg shadow-lg shadow-blue-100"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <ArrowRight className="ml-2" size={18} />}
              </Button>
            </form>

            <div className="relative my-10">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 rounded-xl border-slate-200" onClick={handleGoogleLogin}>
                <Chrome size={18} className="mr-2" /> Google
              </Button>
              <Button variant="outline" className="h-12 rounded-xl border-slate-200" onClick={handleGithubLogin}>
                <Github size={18} className="mr-2" /> GitHub
              </Button>
            </div>

            <p className="mt-10 text-center text-sm text-slate-500">
              Don't have an account? <Link to="/auth/signup" className="text-blue-600 font-bold hover:underline">Sign up for free</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
