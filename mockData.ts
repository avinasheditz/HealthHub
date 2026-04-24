import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  Undo2, 
  Minus, 
  Plus, 
  Share2, 
  Heart,
  ChevronRight,
  Stethoscope,
  Info
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from '../store/useStore';
import { toast } from 'sonner';
import { MOCK_PRODUCTS } from '@/data/mockData';

// Mock function to find a product
const getProductBySlug = (slug: string) => {
  return MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug || '');
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const { items, addItem, updateQuantity, removeItem } = useCartStore();
  const cartItem = items.find(item => item.id === product.id);

  const handleAddToCart = () => {
    addItem(product);
    toast.success('Product added to cart!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-8 overflow-hidden whitespace-nowrap">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight size={12} />
        <Link to="/medicines" className="hover:text-blue-600">Medicines</Link>
        <ChevronRight size={12} />
        <span className="text-slate-900 font-medium truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Gallery */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-slate-100 p-8 flex items-center justify-center aspect-square mb-6 overflow-hidden shadow-sm relative group">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                src={activeImage} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain" 
              />
            </AnimatePresence>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImage(img)}
                className={`aspect-square bg-white border-2 rounded-xl p-2 cursor-pointer transition-all overflow-hidden ${
                  activeImage === img ? 'border-blue-500 shadow-md ring-2 ring-blue-100' : 'border-slate-100 hover:border-blue-300'
                }`}
              >
                <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Details & Actions */}
        <div className="lg:col-span-7">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 font-bold">{product.brand}</Badge>
              {product.rxRequired && <Badge variant="destructive" className="font-bold">Rx REQUIRED</Badge>}
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
            <p className="text-slate-500 font-medium mb-4">{product.composition}</p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
                <Star size={18} fill="currentColor" />
                <span className="font-bold text-slate-900 ml-1">{product.rating.average}</span>
              </div>
              <p className="text-sm text-slate-500 underline underline-offset-4 cursor-pointer">{product.rating.count} Ratings & 450 Reviews</p>
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Pricing Box */}
          <div className="bg-white rounded-3xl border border-blue-100 p-8 mb-8 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4">
               <div className="flex gap-2">
                 <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-red-500">
                   <Heart size={20} />
                 </Button>
                 <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-blue-500">
                   <Share2 size={20} />
                 </Button>
               </div>
             </div>

             <div className="flex flex-col gap-1 mb-6">
               <div className="flex items-center gap-3">
                 <span className="text-4xl font-bold text-slate-900">₹{product.price}</span>
                 <span className="text-xl text-slate-400 line-through">₹{product.mrp}</span>
                 <Badge className="bg-green-600 h-6 px-2">{product.discount}% OFF</Badge>
               </div>
               <p className="text-xs text-slate-500 underline cursor-pointer">Inclusive of all taxes</p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
               <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                 <Truck className="text-blue-600" size={24} />
                 <div>
                   <p className="text-xs font-bold text-blue-900">FREE DELIVERY</p>
                   <p className="text-sm text-blue-700">on orders above ₹499</p>
                 </div>
               </div>
               <div className="bg-teal-50 rounded-xl p-4 flex items-center gap-3">
                 <Stethoscope className="text-teal-600" size={24} />
                 <div>
                   <p className="text-xs font-bold text-teal-900">CONSULT DOCTOR</p>
                   <p className="text-sm text-teal-700">Get Rx in 15 mins</p>
                 </div>
               </div>
             </div>

             {cartItem ? (
               <div className="flex gap-4">
                 <div className="flex items-center justify-between bg-blue-600 rounded-2xl h-14 w-40 px-3 text-white">
                    <Button variant="ghost" size="icon" className="hover:bg-blue-700 text-white" onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}><Minus /></Button>
                    <span className="font-bold text-xl">{cartItem.quantity}</span>
                    <Button variant="ghost" size="icon" className="hover:bg-blue-700 text-white" onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}><Plus /></Button>
                 </div>
                 <Link to="/cart" className="flex-grow">
                   <Button className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg rounded-2xl">
                     Go to Cart
                   </Button>
                 </Link>
               </div>
             ) : (
               <div className="flex gap-4">
                  <Button onClick={handleAddToCart} className="flex-grow h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl gap-2 shadow-xl shadow-blue-100">
                    <Plus size={24} /> Add to Cart
                  </Button>
               </div>
             )}
          </div>

          {/* Offers */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
            <h4 className="font-bold text-orange-900 mb-4 flex items-center gap-2">
              <Badge className="bg-orange-500 h-5 px-1.5 py-0 text-[10px]">OFFER</Badge> Extra 5% with Care+
            </h4>
            <div className="flex justify-between items-center">
              <p className="text-sm text-orange-850">Save ₹50 more with our premium membership plan.</p>
              <Button variant="link" className="text-orange-950 font-bold">Know More</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Tabs */}
      <Tabs defaultValue="overview" className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
        <TabsList className="grid w-full lg:w-[600px] grid-cols-4 mb-8 bg-slate-50 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="uses">Uses</TabsTrigger>
          <TabsTrigger value="sideeffects">Side Effects</TabsTrigger>
          <TabsTrigger value="dosage">Dosage</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="animate-in fade-in slide-in-from-bottom-2">
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold mb-4">Product Details</h3>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                 <h4 className="font-bold text-slate-800 mb-2">Key Ingredients</h4>
                 <p className="text-sm text-slate-600">{product.composition}</p>
              </div>
              <div>
                 <h4 className="font-bold text-slate-800 mb-2">Manufacturer</h4>
                 <p className="text-sm text-slate-600">{product.manufacturer}</p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="uses">
          <h3 className="text-xl font-bold mb-4">Benefits & Uses</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>Supports overall immunity and vital organ health</li>
            <li>Contains essential minerals for bone strength</li>
            <li>Added probiotics for gut health improvement</li>
            <li>Ginseng extracts help reduce stress and fatigue</li>
          </ul>
        </TabsContent>
        <TabsContent value="sideeffects">
          <div className="flex gap-4 items-start bg-red-50 p-4 rounded-xl border border-red-100">
            <Info className="text-red-500 mt-1" size={20} />
            <p className="text-slate-700">{product.sideEffects}</p>
          </div>
        </TabsContent>
        <TabsContent value="dosage">
           <h3 className="text-xl font-bold mb-4">Dosage Directions</h3>
           <p className="text-slate-600">{product.dosage}</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
