import React from 'react';
import type { Product } from '../types';
import Badge from './Badge';

interface ProductCardProps {
  product: Product;
  onUpvote: (productId: string) => void;
  className?: string;
  isFeatured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onUpvote, className = '', isFeatured = false }) => {
  const handleUpvoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onUpvote(product.id);
  };

  return (
    <a 
      href={`#/product/${product.id}`} 
      className={`
        block bg-white rounded-2xl shadow-sm border border-gray-100 
        hover:shadow-xl hover:-translate-y-1 hover:border-brand-teal/30 
        transition-all duration-300 flex flex-col h-full group relative overflow-hidden
        ${isFeatured ? 'ring-2 ring-brand-accent/20' : ''}
        ${className}
      `}
    >
      {isFeatured && (
        <div className="absolute top-0 right-0 bg-brand-accent text-brand-blue text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
          Featured
        </div>
      )}
      
      <div className="p-6 flex-grow">
        <div className="flex items-start space-x-5">
            <div className="relative">
              <img 
                className="w-16 h-16 rounded-xl object-cover shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300" 
                src={product.logoUrl} 
                alt={`${product.name} logo`} 
              />
            </div>
            <div className="flex-1 min-w-0">
                 <h3 className="text-xl text-gray-900 font-bold group-hover:text-brand-teal transition-colors flex items-center truncate">
                    {product.name}
                    {product.madeIn === 'India' && <span className="ml-2 text-lg" aria-label="Made in India" title="Made in India">🇮🇳</span>}
                 </h3>
                 <p className="mt-1 text-base text-gray-500 line-clamp-2 leading-relaxed">{product.tagline}</p>
            </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
            {product.categories.slice(0, 3).map(category => (
              <Badge key={category} variant="secondary" className="bg-gray-50 text-gray-600 border-gray-100 group-hover:bg-teal-50 group-hover:text-brand-teal transition-colors">
                {category}
              </Badge>
            ))}
        </div>
      </div>
      
      <div className="border-t border-gray-50 p-4 flex justify-between items-center bg-gray-50/50 rounded-b-2xl group-hover:bg-white transition-colors">
        <div className="flex items-center text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
              <path d="M15 7v2a2 2 0 012 2v5a2 2 0 01-2 2h-1v-2a5 5 0 00-5-5H7V7a3 3 0 013-3h4a1 1 0 011 1z"/>
            </svg>
            {product.reviewCount}
        </div>
        <button 
            onClick={handleUpvoteClick}
            className="flex items-center space-x-2 border border-gray-200 bg-white rounded-lg px-4 py-2 hover:border-brand-accent hover:bg-orange-50 hover:text-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-opacity-50 transition-all shadow-sm group-hover:shadow"
            aria-label={`Upvote ${product.name}`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-brand-accent transition-colors" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M10 9a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-gray-700 group-hover:text-brand-accent transition-colors">{product.upvotes}</span>
        </button>
      </div>
    </a>
  );
};

export default ProductCard;