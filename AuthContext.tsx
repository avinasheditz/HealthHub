import { Link } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from '../store/useStore';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const subtotal = getTotal();
  const deliveryFee = subtotal > 499 ? 0 : 49;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 max-w-xs">Looks like you haven't added any products to your cart yet.</p>
        <Link to="/medicines">
          <Button className="bg-blue-600 hover:bg-blue-700 px-10 h-12 rounded-full font-bold">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">My Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-grow">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Order Details ({items.length} items)</h3>
            </div>

            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="p-6 flex gap-6 animate-in fade-in slide-in-from-bottom-2">
                  <div className="w-24 h-24 flex-shrink-0 bg-slate-50 rounded-lg p-2 flex items-center justify-center">
                    <img src={item.images[0]} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500">{item.brand} | {item.category}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-400 hover:text-red-500"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-3 border rounded-lg p-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-slate-100"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="font-bold w-6 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-slate-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-900">₹{item.price * item.quantity}</p>
                        <p className="text-xs text-slate-400">₹{item.price} per unit</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex items-center gap-4 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
            <Truck className="text-blue-600" size={24} />
            <p className="text-sm text-blue-800">
              {subtotal > 499 
                ? "Yay! You've unlocked FREE delivery on this order." 
                : `Add ₹${499 - subtotal} more to your cart for FREE delivery.`}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <aside className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal (MRP)</span>
                <span>₹{items.reduce((acc, item) => acc + item.mrp * item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Total Discount</span>
                <span>-₹{items.reduce((acc, item) => acc + (item.mrp - item.price) * item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charges</span>
                <span className={deliveryFee === 0 ? "text-green-600 font-bold" : ""}>
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold text-slate-900">
                <span>Amount to Pay</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Link to="/checkout">
              <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 font-bold text-lg rounded-xl gap-2 shadow-lg shadow-blue-200">
                Proceed to Checkout <ArrowRight size={20} />
              </Button>
            </Link>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <ShieldCheck className="text-green-500" size={18} />
                <span>100% Secure Payments</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Truck className="text-blue-500" size={18} />
                <span>Easy Returns & Cancellations</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
