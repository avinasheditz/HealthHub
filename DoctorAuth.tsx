import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Github, 
  Chrome,
  User,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from 'sonner';
import { auth, db } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: name });
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        name,
        email,
        role: 'customer',
        createdAt: serverTimestamp()
      });
      
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (providerType: 'google' | 'github') => {
    try {
      const provider = providerType === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user exists in Firestore, if not create
      // For simplicity, we just setDoc here as well, it will overwrite or we can use merge
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        name: user.displayName || 'User',
        email: user.email || '',
        role: 'customer',
        createdAt: serverTimestamp()
      }, { merge: true });
      
      toast.success(`Signed in with ${providerType === 'google' ? 'Google' : 'GitHub'}!`);
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Social login failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-blue-600 text-white relative">
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 mb-12">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold">H</div>
              <span className="text-xl font-bold tracking-tight">HealthHub India</span>
            </Link>
            
            <h1 className="text-4xl font-bold mb-6 leading-tight">Start Your <br />Health Journey.</h1>
            <p className="text-blue-100 text-lg mb-12 max-w-xs">One account for all your healthcare needs - and it's free forever.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                <CheckCircle2 className="text-blue-300" />
                <p className="text-sm font-medium">Free Doctor Consultation Vouchers</p>
              </div>
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                <ShieldCheck className="text-blue-300" />
                <p className="text-sm font-medium">Up to 25% Off on Medicines</p>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-blue-200 mt-12">By signing up, you agree to our Terms of Service and Privacy Policy.</p>
          
          <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500 mb-10">Join HealthHub and get ₹100 worth of Credits.</p>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="pl-10 h-12 rounded-xl focus-visible:ring-blue-600"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Min. 8 characters" 
                    className="pl-10 h-12 rounded-xl focus-visible:ring-blue-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-lg shadow-lg shadow-blue-100 mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
                {!isLoading && <ArrowRight className="ml-2" size={18} />}
              </Button>
            </form>

            <div className="relative my-8">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or sign up with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 rounded-xl border-slate-200" onClick={() => handleSocialLogin('google')}>
                <Chrome size={18} className="mr-2" /> Google
              </Button>
              <Button variant="outline" className="h-12 rounded-xl border-slate-200" onClick={() => handleSocialLogin('github')}>
                <Github size={18} className="mr-2" /> GitHub
              </Button>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account? <Link to="/auth/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
