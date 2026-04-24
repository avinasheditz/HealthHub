import { useState } from 'react';
import { 
  Stethoscope, 
  Star, 
  MessageSquare, 
  Clock, 
  Filter,
  CheckCircle2,
  Calendar,
  Search
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Doctor } from '../types';
import { MOCK_DOCTORS } from '@/data/mockData';

export default function DoctorListingPage() {
  const [filter, setFilter] = useState('All');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white mb-12 shadow-xl overflow-hidden relative">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Consult Top Doctors <span className="text-teal-200 underline decoration-wavy">Online</span></h1>
          <p className="text-teal-50 text-lg mb-8">Secure, private, and professional consultations from the comfort of your home. Get a digital prescription in 15 minutes.</p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-teal-300" />
              <span className="font-medium">Verified Doctors</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-teal-300" />
              <span className="font-medium">100% Private</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-teal-300" />
              <span className="font-medium">Digital Prescription</span>
            </div>
          </div>
        </div>
        <Stethoscope className="absolute right-0 bottom-0 text-white/10 w-96 h-96 -mr-20 -mb-20" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm sticky top-24">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Filter size={18} /> Filters
            </h3>

            <div className="space-y-6">
              <div>
                <Label className="font-bold text-sm mb-3 block">SPECIALIZATION</Label>
                <div className="space-y-2">
                  {['General Physician', 'Dermatologist', 'Cardiologist', 'Pediatrician', 'Gynecologist'].map(s => (
                    <Button key={s} variant="ghost" className="w-full justify-start text-sm hover:bg-teal-50 hover:text-teal-700 h-9 font-normal">
                      {s}
                    </Button>
                  ))}
                </div>
              </div>

              <hr />

              <div>
                <Label className="font-bold text-sm mb-3 block">AVAILABILITY</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="today" className="rounded" />
                    <label htmlFor="today" className="text-sm">Available Today</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="online" className="rounded" />
                    <label htmlFor="online" className="text-sm">Online Now</label>
                  </div>
                </div>
              </div>

              <hr />

              <div>
                <Label className="font-bold text-sm mb-3 block">GENDER</Label>
                <div className="space-y-2">
                   <div className="flex items-center gap-2">
                    <input type="checkbox" id="male" className="rounded" />
                    <label htmlFor="male" className="text-sm">Male Doctor</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="female" className="rounded" />
                    <label htmlFor="female" className="text-sm">Female Doctor</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Listing */}
        <main className="flex-grow">
          {/* Controls */}
          <div className="bg-white border rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input placeholder="Search doctor by name or symptom..." className="pl-10 h-11 bg-slate-50 border-none" />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-sm font-medium whitespace-nowrap">Sort:</span>
              <Select defaultValue="top-rated">
                <SelectTrigger className="w-full md:w-[180px] h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-rated">Top Rated</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                  <SelectItem value="price-low">Fee: Low to High</SelectItem>
                  <SelectItem value="price-high">Fee: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="space-y-6">
            {MOCK_DOCTORS.map(doc => (
              <div key={doc.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative fle-shrink-0">
                    <Avatar className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-2 border-white shadow-md">
                      <AvatarImage src={doc.image} alt={doc.name} className="object-cover" />
                      <AvatarFallback>{doc.name[0]}</AvatarFallback>
                    </Avatar>
                    {doc.status === 'online' && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
                         <div className="w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{doc.name}</h3>
                        <p className="text-teal-600 font-bold text-sm tracking-tight">{doc.specialization} • {doc.degree}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center sm:justify-end gap-1 mb-1">
                          <Star className="text-yellow-500 fill-current" size={16} />
                          <span className="font-bold text-slate-900">{doc.rating.average}</span>
                          <span className="text-xs text-slate-400">({doc.rating.count} reviews)</span>
                        </div>
                        <p className="text-xs text-slate-500">{doc.patientCount}+ happy patients</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={16} className="text-teal-600" />
                        <span>{doc.experience} years experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MessageSquare size={16} className="text-teal-600" />
                        <span>{doc.languages.join(', ')}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">CONSULTATION FEE</p>
                          <p className="text-xl font-bold text-slate-900">₹{doc.fee}</p>
                        </div>
                        <div className="h-8 w-px bg-slate-200" />
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">AVAILABLE</p>
                          <p className="text-sm font-bold text-teal-600 flex items-center gap-1">
                            <Calendar size={14} /> {doc.availability[0]}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 w-full sm:w-auto">
                        <Button variant="outline" className="flex-grow sm:flex-grow-0 h-11 px-8 rounded-xl border-slate-200">
                          View Profile
                        </Button>
                        <Button className="flex-grow sm:flex-grow-0 h-11 px-8 rounded-xl bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-100">
                          Book Consultation
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
