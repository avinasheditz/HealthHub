import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from './store/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import MedicineListingPage from './pages/MedicineListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LabTestsPage from './pages/LabTestsPage';
import DoctorListingPage from './pages/DoctorListingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyOrdersPage from './pages/MyOrdersPage';

import RoleSelection from './pages/auth/RoleSelection';
import CustomerAuth from './pages/auth/CustomerAuth';
import DoctorAuth from './pages/auth/DoctorAuth';
import AdminAuth from './pages/auth/AdminAuth';
import VerifyOTP from './pages/auth/VerifyOTP';
import { useLocation } from 'react-router-dom';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');

  if (isAuthPage) return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <main className="flex-grow pt-16 pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <TooltipProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/medicines" element={<MedicineListingPage />} />
              <Route path="/medicines/:slug" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/lab-tests" element={<LabTestsPage />} />
              <Route path="/consult" element={<DoctorListingPage />} />
              <Route path="/auth" element={<RoleSelection />} />
              <Route path="/auth/select" element={<RoleSelection />} />
              <Route path="/auth/customer" element={<CustomerAuth />} />
              <Route path="/auth/doctor" element={<DoctorAuth />} />
              <Route path="/auth/admin" element={<AdminAuth />} />
              <Route path="/auth/verify" element={<VerifyOTP />} />
              <Route path="/orders" element={<MyOrdersPage />} />
            </Routes>
          </Layout>
          <Toaster position="top-center" expand={true} />
        </Router>
      </AuthProvider>
    </TooltipProvider>
  );
}
