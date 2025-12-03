import React, { useState } from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface HomePageProps {
  products: Product[];
  onUpvote: (productId: string) => void;
  filterControls: {
    searchQuery: string;
    selectedCategory: string;
    selectedDateFilter: string;
  };
}

const HomePage: React.FC<HomePageProps> = ({ products, onUpvote, filterControls }) => {
  const { searchQuery, selectedCategory, selectedDateFilter } = filterControls;
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  
  const approvedProducts = products.filter(p => p.status === 'approved');

  // --- Date constants for filtering ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as start of week

  // Helper to check if a date is today
  const isToday = (dateString?: string) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      window.location.hash = `/search/${encodeURIComponent(localSearchQuery.trim())}`;
      setLocalSearchQuery('');
    }
  };

  const filteredProducts = approvedProducts
    .filter(product => {
      // Category Filter
      const matchesCategory = selectedCategory === 'All' || product.categories.includes(selectedCategory);
      
      // Search Query Filter
      const lowercasedQuery = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' ||
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.tagline.toLowerCase().includes(lowercasedQuery);

      if (!matchesCategory || !matchesSearch) {
        return false;
      }
      
      // Date Filter (Global filter still applies if user selects specific date range)
      if (selectedDateFilter === 'All') return true;

      if (!product.launchDate) return false;
      const launchDate = new Date(product.launchDate);
      launchDate.setHours(0, 0, 0, 0);

      if (selectedDateFilter === 'Today') {
        return launchDate.getTime() === today.getTime();
      }
      if (selectedDateFilter === 'Yesterday') {
        return launchDate.getTime() === yesterday.getTime();
      }
      if (selectedDateFilter === 'This Week') {
        return launchDate >= startOfWeek;
      }
      
      return true;
    })
    .sort((a, b) => new Date(b.launchDate!).getTime() - new Date(a.launchDate!).getTime());

  // Split into Daily Launch (Today) and Recent Launches (Older)
  // Only apply this split if "All" dates are selected. If a specific date filter is active, show a single list.
  const showSplitView = selectedDateFilter === 'All' && searchQuery === '' && selectedCategory === 'All';

  const dailyLaunches = showSplitView ? filteredProducts.filter(p => isToday(p.launchDate)) : [];
  const recentLaunches = showSplitView ? filteredProducts.filter(p => !isToday(p.launchDate)) : filteredProducts;

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Google-style Search Bar */}
      <section className="text-center pt-12 pb-6">
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-brand-teal transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search for products, tools, or software..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-3.5 text-base border-2 border-gray-200 rounded-full shadow-lg hover:shadow-xl focus:shadow-2xl focus:border-brand-teal focus:ring-4 focus:ring-brand-teal focus:ring-opacity-20 transition-all duration-200 outline-none bg-white"
            />
            {localSearchQuery && (
              <button
                type="button"
                onClick={() => setLocalSearchQuery('')}
                className="absolute inset-y-0 right-20 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="absolute inset-y-0 right-2 flex items-center px-5 py-1.5 bg-brand-accent text-brand-blue font-semibold rounded-full hover:opacity-90 transition-all text-sm"
            >
              Search
            </button>
          </div>
        </form>
      </section>

      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-b from-white to-gray-50 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal tracking-tight mb-4">
          Discover Your Next Favorite Tool
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
          The best new software, hand-picked and launched daily.
        </p>
      </section>

      {showSplitView && (
        <section>
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="mr-3 text-4xl">🚀</span> Daily Launch
            </h2>
            <div className="ml-4 h-px bg-gray-200 flex-grow"></div>
            <span className="ml-4 text-sm font-medium text-brand-teal bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              {today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>
          
          {dailyLaunches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dailyLaunches.map(product => (
                <ProductCard key={product.id} product={product} onUpvote={onUpvote} isFeatured={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">No products launched today yet. Be the first!</p>
              <a href="#/submit-product" className="mt-4 inline-block text-brand-blue font-semibold hover:underline">
                Submit your product &rarr;
              </a>
            </div>
          )}
        </section>
      )}

      <section>
         <div className="flex items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              {showSplitView ? 'Recent Launches' : 'Search Results'}
            </h2>
            <div className="ml-4 h-px bg-gray-200 flex-grow"></div>
          </div>

        {recentLaunches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentLaunches.map(product => (
              <ProductCard key={product.id} product={product} onUpvote={onUpvote} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </section>
      
      <section className="py-8">
          <div className="bg-brand-blue rounded-2xl p-10 text-center text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">Built something amazing?</h2>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                  Get your software in front of thousands of creators, builders, and early adopters.
                </p>
                <a href="#/submit-product" className="inline-block bg-brand-accent text-brand-blue font-bold py-4 px-10 rounded-xl text-lg hover:bg-white transition-all transform hover:scale-105 shadow-lg">
                    Launch on Realpick
                </a>
              </div>
          </div>
      </section>
    </div>
  );
};

export default HomePage;