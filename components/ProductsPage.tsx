import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

// FIX: Added `onUpvote` to props to allow upvoting from this page.
interface ProductsPageProps {
  products: Product[];
  onUpvote: (productId: string) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, onUpvote }) => {
  const categories = [...new Set(products.flatMap(p => p.categories))].sort();

  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-brand-blue">All Products</h1>
        <p className="mt-2 text-lg text-gray-600">Browse our curated collection of indie software by category.</p>
      </header>
      
      {/* FIX: Add explicit type for 'category' to resolve 'toLowerCase' on 'unknown' type error. */}
      {categories.map((category: string) => {
        const productsInCategory = products.filter(p => p.categories.includes(category));
        return (
          <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-brand-blue">{category}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productsInCategory.map(product => (
                // FIX: Pass the `onUpvote` handler to `ProductCard` to fix missing prop error.
                <ProductCard key={product.id} product={product} onUpvote={onUpvote} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ProductsPage;