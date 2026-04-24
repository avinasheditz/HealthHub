import { useState } from 'react';
import { 
  FlaskConical, 
  Search, 
  MapPin, 
  CheckCircle2, 
  TrendingUp,
  Clock,
  Home,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MOCK_PACKAGES } from '@/data/mockData';

export default function LabTestsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search & Location Hero */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white mb-16 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Accurate Lab Tests from the <span className="text-blue-400">Comfort of Your Home</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10">Choose from 500+ diagnostic tests and health checkup packages. FREE home sample collection across 50+ cities.</p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <Input 
                placeholder="Search for a test or package (e.g. CBC, Diabetes)..." 
                className="h-14 bg-white text-slate-900 border-none pl-12 rounded-2xl text-lg shadow-lg"
              />
            </div>
            <Button size="lg" className="h-14 bg-blue-600 hover:bg-blue-700 px-10 rounded-2xl font-bold text-lg">
              Find Tests
            </Button>
          </div>

          <div className="flex flex-wrap gap-8 mt-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Home size={20} />
              </div>
              <span className="font-bold text-sm">FREE Home Sample Collection</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Clock size={20} />
              </div>
              <span className="font-bold text-sm">On-time Digital Reports</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <CheckCircle2 size={20} />
              </div>
              <span className="font-bold text-sm">Certified Lab Partners</span>
            </div>
          </div>
        </div>
        
        {/* Background Graphic */}
        <FlaskConical className="absolute right-0 bottom-0 text-white opacity-5 w-96 h-96 -mb-20 -mr-20" />
      </div>

      {/* Featured Packages */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Featured Health Packages</h2>
          <Button variant="ghost" className="text-blue-600 font-bold gap-1 text-lg">
            Compare All <ChevronRight size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PACKAGES.map(pkg => (
            <Card key={pkg.id} className="rounded-3xl border-slate-100 shadow-sm relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {pkg.popular && (
                <div className="absolute top-4 right-4 animate-pulse">
                  <Badge className="bg-orange-500 hover:bg-orange-600 font-bold px-3 py-1">MOST POPULAR</Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {pkg.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold rounded-md">
                    {pkg.parameters} Parameters
                  </Badge>
                  <span className="text-xs font-bold text-slate-400">• By {pkg.lab}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="space-y-3 mb-6">
                  {pkg.includes.slice(0, 4).map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={16} className="text-green-500" /> {item}
                    </div>
                  ))}
                  <button className="text-blue-600 text-xs font-bold hover:underline">+ {pkg.includes.length - 4} more tests included</button>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 bg-slate-50 p-2 rounded-xl">
                  <Clock size={16} /> Reports in {pkg.reportTime}
                </div>

                <Separator className="mb-6" />

                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold text-slate-900">₹{pkg.price}</span>
                  <span className="text-lg text-slate-400 line-through mb-1">₹{pkg.mrp}</span>
                  <Badge className="bg-green-600 mb-1">{pkg.discount}% OFF</Badge>
                </div>
              </CardContent>
              <CardFooter className="pb-8">
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-bold rounded-xl shadow-lg shadow-blue-50">
                  Book Appointment
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Category Icons */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Tests by Organ / Concern</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'Heart', color: 'bg-red-50 text-red-600' },
            { name: 'Liver', color: 'bg-orange-50 text-orange-600' },
            { name: 'Kidney', color: 'bg-blue-50 text-blue-600' },
            { name: 'Diabetes', color: 'bg-teal-50 text-teal-600' },
            { name: 'Thyroid', color: 'bg-purple-50 text-purple-600' },
            { name: 'Full Body', color: 'bg-indigo-50 text-indigo-600' },
          ].map(concern => (
            <div key={concern.name} className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group">
              <div className={`w-12 h-12 rounded-full ${concern.color} flex items-center justify-center mb-3 font-bold group-hover:scale-110 transition-transform`}>
                {concern.name[0]}
              </div>
              <span className="text-sm font-bold text-slate-700">{concern.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ / Trust Content */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl border border-slate-100 p-8 md:p-16">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Why Book with HealthHub?</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Filter size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Filtered Partners</h4>
                <p className="text-slate-500">We only partner with NABL and ISO certified laboratories to ensure the highest accuracy.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Verified Phlebotomists</h4>
                <p className="text-slate-500">Our health experts follow strict hygiene protocols for safe and painless home collection.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0">
                <TrendingUp size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Historical Tracking</h4>
                <p className="text-slate-500">Track your biomarkers over time with our intuitive smart reports and analytics.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-8">
           <h4 className="font-bold text-slate-800 mb-6">Need Help with Booking?</h4>
           <p className="text-slate-500 mb-8">Our health experts are available to help you choose the right test package based on your symptoms.</p>
           <Button className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl mb-4">
             Request Callback
           </Button>
           <Button variant="outline" className="w-full h-12 font-bold rounded-xl border-slate-200">
             Chat with Expert
           </Button>
        </div>
      </section>
    </div>
  );
}
