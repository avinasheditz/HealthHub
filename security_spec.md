import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'motion/react';
import { Stethoscope, CheckCircle2, ChevronRight, ChevronLeft, Upload, User, Mail, Phone, MapPin, Award, Clock } from 'lucide-react';
import { doctorStep1Schema, doctorStep2Schema, type LoginForm } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function DoctorAuth() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const step1Form = useForm({ resolver: zodResolver(doctorStep1Schema) });
  const step2Form = useForm({ resolver: zodResolver(doctorStep2Schema) });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmitRegistration = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setStep(4); // Success step
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-50 via-[#F0FDF4] to-[#F0FDF4]">
      <div className="w-full max-w-[540px]">
        
        {/* Header */}
        <div className="text-center mb-8">
           <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <Stethoscope size={24} />
            </div>
            <span className="text-xl font-bold text-slate-900">HealthCard Doctor</span>
          </div>
          <p className="text-emerald-700 font-bold text-xs uppercase tracking-widest">Verified Healthcare Professionals</p>
        </div>

        <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl shadow-emerald-200/50 border border-emerald-100">
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            <button 
              onClick={() => { setActiveTab('login'); setStep(1); }}
              className={`flex-1 py-4 font-bold text-sm transition-all relative ${activeTab === 'login' ? 'text-emerald-600 bg-white' : 'text-slate-400'}`}
            >
              Login
              {activeTab === 'login' && <div className="absolute top-0 inset-x-0 h-1 bg-emerald-600" />}
            </button>
            <button 
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-4 font-bold text-sm transition-all relative ${activeTab === 'register' ? 'text-emerald-600 bg-white' : 'text-slate-400'}`}
            >
              Join Platform
              {activeTab === 'register' && <div className="absolute top-0 inset-x-0 h-1 bg-emerald-600" />}
            </button>
          </div>

          <div className="p-8 md:p-10">
            {activeTab === 'login' ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold">Registration Email</Label>
                  <Input placeholder="doctor@healthcard.com" className="h-12 border-slate-200 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-700 font-bold">Password</Label>
                    <button className="text-xs text-emerald-600 font-bold">Forgot Password?</button>
                  </div>
                  <Input type="password" placeholder="••••••••" className="h-12 border-slate-200 rounded-xl" />
                </div>
                <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold shadow-lg shadow-emerald-100">
                  Access Portal
                </Button>
                <p className="text-center text-xs text-slate-400">
                  🔐 Access is restricted to verified accounts. <br />
                  Registration takes 24-48 hours for review.
                </p>
              </div>
            ) : (
              <div>
                {/* Step Indicator */}
                {step < 4 && (
                  <div className="flex items-center justify-between mb-10 px-4">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                          {step > s ? <CheckCircle2 size={16} /> : s}
                        </div>
                        {s < 3 && <div className={`w-12 sm:w-20 h-1 mx-2 rounded-full ${step > s ? 'bg-emerald-600' : 'bg-slate-100'}`} />}
                      </div>
                    ))}
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-bold">Full Name (per License)</Label>
                          <Input {...step1Form.register('fullName')} placeholder="Dr. Sameer Malhotra" className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-bold">Email</Label>
                          <Input {...step1Form.register('email')} placeholder="sameer@doctor.com" className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-bold">Mobile Number</Label>
                          <Input {...step1Form.register('mobile')} placeholder="9876543210" className="h-12 rounded-xl" />
                        </div>
                      </div>
                      <Button onClick={nextStep} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold flex items-center justify-center gap-2">
                        Next: Credentials <ChevronRight size={18} />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-bold">MCI / State Council Reg No.</Label>
                        <Input placeholder="MCI-12345-REG" className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-bold">Registration Certificate</Label>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors bg-slate-50 cursor-pointer">
                          <Upload className="mx-auto text-emerald-500 mb-2" size={24} />
                          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Drag or Click to Upload PDF</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-bold">Experience (Yrs)</Label>
                          <Input type="number" placeholder="10" className="h-12 rounded-xl" />
                        </div>
                         <div className="space-y-2">
                          <Label className="text-slate-700 font-bold">Specialization</Label>
                          <Input placeholder="Cardiology" className="h-12 rounded-xl" />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button variant="outline" onClick={prevStep} className="flex-1 h-12 rounded-xl border-slate-200 font-bold">
                          Back
                        </Button>
                        <Button onClick={nextStep} className="flex-[2] h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold">
                          Next: Practice Setup
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-bold">Consultation Fee (₹)</Label>
                        <Input placeholder="500" className="h-12 rounded-xl text-lg font-bold text-emerald-600" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-bold">Professional Bio</Label>
                        <textarea className="w-full h-24 p-3 rounded-xl border-slate-200 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" placeholder="Briefly describe your expertise..."></textarea>
                      </div>
                      <div className="space-y-4">
                        <Label className="text-slate-700 font-bold">Availability</Label>
                        <div className="grid grid-cols-4 gap-2">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <button key={day} className="h-8 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-bold uppercase transition-all hover:bg-emerald-50 hover:border-emerald-200">{day}</button>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button variant="outline" onClick={prevStep} className="flex-1 h-12 rounded-xl border-slate-200 font-bold">
                          Back
                        </Button>
                        <Button onClick={handleSubmitRegistration} disabled={isLoading} className="flex-[2] h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold">
                          {isLoading ? 'Submitting...' : 'Complete Registration'}
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                      <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={56} />
                      </div>
                      <h3 className="text-3xl font-extrabold text-slate-900 mb-2">Application Received!</h3>
                      <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                        Our medical council will verify your credentials within 24-48 hours. You'll receive a confirmation email shortly.
                      </p>
                      <Button onClick={() => navigate('/auth/select')} className="px-10 h-12 bg-slate-900 hover:bg-slate-800 rounded-xl font-bold">
                        Return to Home
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
