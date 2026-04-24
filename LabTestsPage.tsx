import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">H</div>
              <span className="text-xl font-bold text-white tracking-tight">HealthHub India</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Your trusted partner for healthcare. Medicines, lab tests, and doctor consultations—delivered with care to your doorstep.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/medicines" className="hover:text-white transition-colors">Medicines</Link></li>
              <li><Link to="/lab-tests" className="hover:text-white transition-colors">Lab Tests</Link></li>
              <li><Link to="/consult" className="hover:text-white transition-colors">Consult Doctors</Link></li>
              <li><Link to="/articles" className="hover:text-white transition-colors">Health Articles</Link></li>
              <li><Link to="/care-plus" className="hover:text-white transition-colors">Care Plus Membership</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white font-bold mb-6">Customer Service</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 text-blue-500" size={18} />
                <span>123 Health Ave, Okhla Phase III, New Delhi - 110020</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-blue-500" size={18} />
                <span>1800-HEALTH-HUB (24/7)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-blue-500" size={18} />
                <span>support@healthhub.in</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-slate-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 HealthHub India Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6 grayscale opacity-60">
            <span className="font-mono">FSSAI: 12345678901234</span>
            <span className="font-mono">LICENSE: DL-2022-X</span>
          </div>
        </div>
        <p className="text-[10px] text-center mt-6 opacity-40">
          *HealthHub is a facilitator and does not independently sell medicines or provide medical services.
        </p>
      </div>
    </footer>
  );
}
