import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  TestTube2, 
  Pill, 
  Home, 
  Sparkles, 
  Heart, 
  Baby, 
  Microscope,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Truck,
  Undo2
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProductCard from '../components/product/ProductCard';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '@/data/mockData';

const CATEGORIES = [
  { name: 'Medicines', icon: <Pill className="text-blue-500" />, color: 'bg-blue-50', link: '/medicines' },
  { name: 'Lab Tests', icon: <TestTube2 className="text-purple-500" />, color: 'bg-purple-50', link: '/lab-tests' },
  { name: 'Consult', icon: <Stethoscope className="text-teal-500" />, color: 'bg-teal-50', link: '/consult' },
  { name: 'Devices', icon: <Microscope className="text-orange-500" />, color: 'bg-orange-50', link: '/medicines?cat=devices' },
  { name: 'Vitamins', icon: <Sparkles className="text-yellow-500" />, color: 'bg-yellow-50', link: '/medicines?cat=vitamins' },
  { name: 'Skincare', icon: <Heart className="text-pink-500" />, color: 'bg-pink-50', link: '/medicines?cat=skincare' },
  { name: 'Baby Care', icon: <Baby className="text-cyan-500" />, color: 'bg-cyan-50', link: '/medicines?cat=baby' },
  { name: 'Home Care', icon: <Home className="text-indigo-500" />, color: 'bg-indigo-50', link: '/medicines?cat=home' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-12 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <Badge className="bg-blue-500 hover:bg-blue-600 mb-6 px-4 py-1 text-sm border-none">
              India's Most Trusted Healthcare App
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Medicines, Lab Tests & <span className="text-blue-300 underline decoration-wavy">Expert Consultations</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl">
              Get medicines delivered within 2 hours, book lab tests for home collection, and consult India's top doctors online.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 font-bold px-8">
                Explore Medicines
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 font-bold px-8">
                Book a Lab Test
              </Button>
            </div>
          </div>
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-blue-600/20 translate-x-1/2 blur-3xl rounded-full" />
        <div className="absolute left-1/4 top-1/4 w-32 h-32 bg-indigo-500/20 blur-2xl rounded-full" />
      </section>

      {/* Trust Badges */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 border-r-0 md:border-r border-slate-100 last:border-0 p-2">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">100% Genuine</h4>
              <p className="text-xs text-slate-500">Quality assured products</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-r-0 md:border-r border-slate-100 last:border-0 p-2">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <Truck size={28} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Fast Delivery</h4>
              <p className="text-xs text-slate-500">Free delivery on ₹499+</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-r-0 md:border-r border-slate-100 last:border-0 p-2">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
              <Undo2 size={28} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Easy Returns</h4>
              <p className="text-xs text-slate-500">7-day return policy</p>
            </div>
          </div>
          <div className="flex items-center gap-4 last:border-0 p-2">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
              <TrendingUp size={28} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Best Prices</h4>
              <p className="text-xs text-slate-500">Huge savings every day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Health Categories</h2>
          <Button variant="ghost" className="text-blue-600 font-bold gap-1">
            View All <ArrowRight size={16} />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.name} 
              to={cat.link}
              className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group"
            >
              <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <span className="text-sm font-bold text-slate-700 text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Trending Now</h2>
            <p className="text-slate-500">Popular products being bought right now</p>
          </div>
          <Link to="/medicines">
            <Button variant="outline" className="border-blue-600 text-blue-600 font-bold hover:bg-blue-50">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Lab Tests Promo */}
      <section className="container mx-auto px-4">
        <div className="bg-slate-900 rounded-3xl overflow-hidden relative min-h-[300px] flex items-center">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1579154235602-44363f9e319b?w=800&h=600&fit=crop" 
              className="object-cover w-full h-full opacity-60"
              alt="Lab Test"
            />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent" />
          </div>
          <div className="p-8 md:p-16 relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Complete Body Checkup at <span className="text-blue-400">Just ₹999</span>
            </h2>
            <ul className="text-slate-300 mb-8 space-y-2">
              <li className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-green-500" /> 80+ Parameters Included
              </li>
              <li className="flex items-center gap-2">
                <Truck size={18} className="text-blue-500" /> Free Home Sample Collection
              </li>
              <li className="flex items-center gap-2">
                <Undo2 size={18} className="text-purple-500" /> Digital Report in 24 Hours
              </li>
            </ul>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 font-bold px-10 rounded-full h-14 text-lg">
              Book Now
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4">
        <div className="bg-blue-50 rounded-2xl p-12 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Subscribe for Healthy Tips</h3>
            <p className="text-slate-600">Get weekly health tips, medicine reminders, and exclusive offers delivered to your inbox.</p>
          </div>
          <div className="flex w-full max-w-sm gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow bg-white border-2 border-transparent focus:border-blue-600 outline-none rounded-xl px-4 py-3 text-slate-900 transition-all"
            />
            <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-xl px-6">
              Join
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
