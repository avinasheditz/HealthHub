import { useState } from 'react';
import { 
  Filter, 
  ChevronDown, 
  LayoutGrid, 
  List, 
  Search,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import ProductCard from '../components/product/ProductCard';
import { Product } from '../types';

import { MOCK_PRODUCTS } from '@/data/mockData';

export default function MedicineListingPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs & Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <span>Home</span>
          <span>/</span>
          <span className="text-slate-900 font-medium">Medicines & Healthcare</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Medicines & Health Products</h1>
        <p className="text-slate-500 mt-1">Showing all medicines, wellness products and medical supplies</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-24 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <SlidersHorizontal size={18} /> Filters
              </h3>
              <button className="text-xs text-blue-600 font-bold hover:underline">Clear All</button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h4 className="font-bold text-sm mb-4">CATEGORIES</h4>
              <div className="space-y-3">
                {['Medicines', 'Vitamins & Supplements', 'Devices', 'Wellness', 'Skincare', 'Baby Care'].map(cat => (
                  <div key={cat} className="flex items-center gap-3">
                    <Checkbox id={cat} />
                    <label htmlFor={cat} className="text-sm text-slate-700 cursor-pointer">{cat}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h4 className="font-bold text-sm mb-4">PRICE RANGE</h4>
              <div className="space-y-3">
                {['Below ₹100', '₹100 - ₹500', '₹500 - ₹1000', 'Above ₹1000'].map(range => (
                  <div key={range} className="flex items-center gap-3">
                    <Checkbox id={range} />
                    <label htmlFor={range} className="text-sm text-slate-700 cursor-pointer">{range}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-8">
              <h4 className="font-bold text-sm mb-4">POPULAR BRANDS</h4>
              <div className="space-y-3">
                {['Tata 1mg', 'Himalaya', 'Cipla', 'Dabur', 'Abbott', 'Sun Pharma'].map(brand => (
                  <div key={brand} className="flex items-center gap-3">
                    <Checkbox id={brand} />
                    <label htmlFor={brand} className="text-sm text-slate-700 cursor-pointer">{brand}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <h4 className="font-bold text-sm mb-4">RATINGS</h4>
              <div className="space-y-3">
                {[4, 3, 2].map(star => (
                  <div key={star} className="flex items-center gap-3">
                    <Checkbox id={`star-${star}`} />
                    <label htmlFor={`star-${star}`} className="text-sm text-slate-700 cursor-pointer">{star}★ & Above</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid & Controls */}
        <main className="flex-grow">
          {/* Controls Bar */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search in these results..." 
                  className="pl-9 pr-4 py-2 border rounded-xl text-sm w-full outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex border rounded-xl overflow-hidden shrink-0">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-none border-r ${viewMode === 'grid' ? 'bg-slate-100' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid size={18} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-none ${viewMode === 'list' ? 'bg-slate-100' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Sort By:</span>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-full sm:w-[180px] rounded-xl">
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="discount">Biggest Discount</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-600">Showing <span className="font-bold text-slate-900">124</span> products for medicines</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100">
                Medicines <button className="ml-1 font-bold">×</button>
              </Badge>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {MOCK_PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              {[1, 2, 3, '...', 12].map((page, i) => (
                <Button 
                  key={i} 
                  variant={page === 1 ? 'default' : 'outline'}
                  className={page === 1 ? 'bg-blue-600 hover:bg-blue-700' : ''}
                >
                  {page}
                </Button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
