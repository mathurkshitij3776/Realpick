import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface SearchPageProps {
  query: string;
  products: Product[];
  onUpvote: (productId: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ query, products, onUpvote }) => {
  const lowercasedQuery = query.toLowerCase();
  const searchResults = query
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(lowercasedQuery) ||
          p.tagline.toLowerCase().includes(lowercasedQuery) ||
          p.description.toLowerCase().includes(lowercasedQuery)
      )
    : [];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-brand-blue">
          Search Results for "{query}"
        </h1>
        <p className="mt-1 text-gray-600">{searchResults.length} product(s) found.</p>
      </header>
      
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map(product => (
            <ProductCard key={product.id} product={product} onUpvote={onUpvote} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
          <p className="mt-1 text-sm text-gray-500">We couldn't find any products matching your search. Try a different keyword.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
