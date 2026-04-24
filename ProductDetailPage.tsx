import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  MapPin, 
  Upload, 
  Menu, 
  X,
  Bell,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  LogOut,
  Settings,
  Package
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from '../../store/useStore';
import { useAuth } from '../../store/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Badge } from "@/components/ui/badge";
import SearchBar from './SearchBar';
import PrescriptionModal from './PrescriptionModal';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const { user, profile } = useAuth();
  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo & Location */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">H</div>
            <span className="text-xl font-bold text-slate-900 hidden sm:inline-block">HealthHub</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-1 text-slate-600 hover:text-blue-600 cursor-pointer text-sm">
            <MapPin size={16} />
            <span className="font-medium">New Delhi</span>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <PrescriptionModal>
            <Button variant="ghost" size="sm" className="hidden xl:flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all rounded-xl px-4 py-5">
              <Upload size={18} />
              <span className="font-bold">Upload Rx</span>
            </Button>
          </PrescriptionModal>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                nativeButton={false}
                render={
                  <div className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-slate-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <User size={18} />
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-xs font-bold text-slate-900 leading-tight">{profile?.name || user.displayName || 'User'}</p>
                      <p className="text-[10px] text-slate-500">View Profile</p>
                    </div>
                  </div>
                }
              />
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    <Package className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/prescriptions')}>
                    <Upload className="mr-2 h-4 w-4" />
                    <span>My Prescriptions</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth" className="text-slate-700 hover:text-blue-600 transition-colors">
              <User size={24} />
            </Link>
          )}

          {/* Cart Drawer */}
          <Sheet>
            <SheetTrigger
              nativeButton={false}
              render={
                <div className="relative text-slate-700 hover:text-blue-600 transition-colors cursor-pointer">
                  <ShoppingCart size={24} />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center bg-red-500 rounded-full text-white text-[10px] font-bold border-2 border-white">
                      {cartItemsCount}
                    </Badge>
                  )}
                </div>
              }
            />
            <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
              <SheetHeader className="p-6 border-b">
                <SheetTitle className="flex items-center gap-2">
                  <ShoppingCart size={20} /> My Cart ({cartItemsCount})
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="flex-grow p-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                     <ShoppingBag className="text-slate-200 mb-4" size={64} />
                     <p className="text-slate-500 font-medium">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-lg bg-slate-50 p-1 flex-shrink-0">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-slate-500 mb-2">₹{item.price}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border rounded-lg">
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={12} /></Button>
                              <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={12} /></Button>
                            </div>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-500" onClick={() => removeItem(item.id)}><Trash2 size={14} /></Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              {items.length > 0 && (
                <SheetFooter className="p-6 border-t flex flex-col gap-4">
                  <div className="flex justify-between items-center w-full mb-2">
                    <span className="font-medium text-slate-500">Subtotal</span>
                    <span className="text-xl font-bold">₹{getTotal()}</span>
                  </div>
                  <Button onClick={() => navigate('/checkout')} className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-bold text-lg rounded-xl">
                    Checkout
                  </Button>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Menu Trigger */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 absolute top-16 left-0 right-0 shadow-lg animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            <Link to="/medicines" onClick={() => setIsMenuOpen(false)} className="py-2 font-medium">Medicines</Link>
            <Link to="/lab-tests" onClick={() => setIsMenuOpen(false)} className="py-2 font-medium">Lab Tests</Link>
            <Link to="/consult" onClick={() => setIsMenuOpen(false)} className="py-2 font-medium">Consult Doctors</Link>
            <Link to="/articles" onClick={() => setIsMenuOpen(false)} className="py-2 font-medium">Health Blog</Link>
            <PrescriptionModal>
              <button onClick={() => setIsMenuOpen(false)} className="py-2 font-bold text-blue-600 flex items-center gap-2">
                <Upload size={20} /> Upload Prescription
              </button>
            </PrescriptionModal>
            <hr />
            {user ? (
              <>
                <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="py-2 font-medium flex items-center gap-2">
                  <Package size={20} /> My Orders
                </Link>
                <button onClick={handleSignOut} className="py-2 font-medium flex items-center gap-2 text-red-500 w-full text-left">
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="py-2 font-medium flex items-center gap-2">
                <User size={20} /> Login / Signup
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
