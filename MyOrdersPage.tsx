import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  MapPin, 
  ShieldCheck,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCartStore } from '../store/useStore';
import { toast } from 'sonner';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CheckoutPage() {
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [orderId, setOrderId] = useState<string>('');
  const { items, clearCart, getTotal } = useCartStore();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!auth.currentUser) {
      toast.error('Please login to place an order');
      navigate('/auth/login');
      return;
    }

    const orderData = {
      userId: auth.currentUser.uid,
      items: items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: getTotal() + (getTotal() > 499 ? 0 : 49),
      status: 'pending',
      createdAt: serverTimestamp(),
      paymentMethod: 'UPI' // Mocked for now
    };

    try {
      toast.loading('Processing your order...');
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      setOrderId(docRef.id);
      setStep('success');
      clearCart();
      toast.dismiss();
      toast.success('Order placed successfully!');
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || 'Failed to place order');
    }
  };

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8 animate-bounce">
          <CheckCircle2 size={56} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Order Confirmed!</h1>
        <p className="text-xl text-slate-600 mb-8 max-w-lg">
          Thank you for your order. We've received it and our pharmacists are verifying your prescription (if required).
        </p>
        <div className="bg-slate-50 rounded-2xl p-6 mb-8 w-full max-w-md border border-slate-100">
          <div className="flex justify-between mb-2">
            <span className="text-slate-500">Order ID:</span>
            <span className="font-bold">#{orderId.slice(0, 8).toUpperCase()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-slate-500">Estimated Delivery:</span>
            <span className="font-bold text-blue-600">Today, by 8:00 PM</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/')} variant="outline" className="h-12 px-8 font-bold">
            Back to Home
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8 font-bold">
            Track Order
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Tracker */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className={`flex items-center gap-2 ${step === 'address' ? 'text-blue-600' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 'address' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>1</div>
            <span className="font-bold hidden sm:inline">Address</span>
          </div>
          <div className="w-12 h-px bg-slate-200"></div>
          <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-blue-600' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 'payment' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>2</div>
            <span className="font-bold hidden sm:inline">Payment</span>
          </div>
          <div className="w-12 h-px bg-slate-200"></div>
          <div className={`flex items-center gap-2 text-slate-400`}>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-sm">3</div>
            <span className="font-bold hidden sm:inline">Confirm</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Main Content */}
          <div className="space-y-8">
            {step === 'address' ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <MapPin className="text-blue-600" /> Shipping Address
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 border-2 border-blue-600 bg-blue-50 rounded-xl relative">
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-blue-600">DEFAULT</Badge>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">Avinash Pandit (Home)</h4>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
                      Flat No. 402, Sunshine Residency, Okhla Phase III, New Delhi, Delhi - 110020
                    </p>
                    <p className="text-sm font-bold mt-4">+91 98765 43210</p>
                  </div>
                  
                  <Button variant="outline" className="w-full h-14 border-dashed border-2 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-600">
                    + Add New Address
                  </Button>
                </div>

                <Button 
                  onClick={() => setStep('payment')} 
                  className="w-full mt-8 h-14 bg-blue-600 hover:bg-blue-700 font-bold rounded-xl text-lg"
                >
                  Continue to Payment
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 animate-in slide-in-from-right-4">
                <button onClick={() => setStep('address')} className="text-blue-600 flex items-center gap-1 text-sm font-bold mb-6 hover:underline">
                  <ArrowLeft size={16} /> Change Address
                </button>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <CreditCard className="text-blue-600" /> Payment Method
                </h2>

                <RadioGroup defaultValue="upi" className="space-y-4">
                  <div className="flex items-center space-x-4 border rounded-xl p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-grow cursor-pointer font-bold flex justify-between items-center">
                      <span>UPI (Google Pay, PhonePe, Paytm)</span>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" className="h-4" alt="UPI" />
                    </Label>
                  </div>
                  <div className="flex items-center space-x-4 border rounded-xl p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-grow cursor-pointer font-bold">
                      Debit / Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-4 border rounded-xl p-4 cursor-pointer hover:bg-slate-50 transition-colors opacity-50 bg-slate-50">
                    <RadioGroupItem value="cod" id="cod" disabled />
                    <Label htmlFor="cod" className="flex-grow cursor-not-allowed font-bold flex flex-col">
                      <span>Cash on Delivery</span>
                      <span className="text-[10px] text-red-500">Not available for prescription medicines</span>
                    </Label>
                  </div>
                </RadioGroup>

                <Button 
                  onClick={handlePlaceOrder} 
                  className="w-full mt-8 h-14 bg-blue-600 hover:bg-blue-700 font-bold rounded-xl text-lg gap-2 shadow-xl shadow-blue-200"
                >
                  <ShieldCheck size={20} />
                  Pay ₹{getTotal() + (getTotal() > 499 ? 0 : 49)} & Place Order
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 overflow-hidden">
              <h3 className="font-bold text-lg mb-6">Order Summary</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-50 p-1 flex items-center justify-center flex-shrink-0">
                      <img src={item.images[0]} className="max-w-full max-h-full object-contain" alt={item.name} />
                    </div>
                    <div className="flex-grow">
                      <h5 className="text-sm font-bold line-clamp-1">{item.name}</h5>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                        <span className="text-sm font-bold">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-6" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Item Total</span>
                  <span className="font-bold">₹{getTotal()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Delivery Fee</span>
                  <span className={`font-bold ${getTotal() > 499 ? 'text-green-600' : ''}`}>
                    {getTotal() > 499 ? 'FREE' : '₹49'}
                  </span>
                </div>
                <div className="flex justify-between pt-4 text-xl font-bold border-t mt-4">
                  <span>To Pay</span>
                  <span>₹{getTotal() + (getTotal() > 499 ? 0 : 49)}</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-orange-900 text-sm">Prescription Policy</h4>
                  <p className="text-xs text-orange-800 leading-relaxed mt-1">
                    Your order contains items that require a valid prescription. You will need to upload it after payment for our pharmacist to verify.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
