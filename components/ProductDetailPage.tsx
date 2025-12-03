import React from 'react';
import type { Product, Review, User } from '../types';
import Badge from './Badge';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';

interface ProductDetailPageProps {
  product: Product;
  currentUser: User | null;
  onReviewSubmit: (productId: string, reviewData: { rating: number; title: string; comment: string; }) => void;
}

const VerifiedIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
    </svg>
);


const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="flex items-start space-x-4">
            <img className="w-12 h-12 rounded-full object-cover" src={review.avatarUrl} alt={`${review.author}'s avatar`} />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-brand-blue">{review.author}</p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex items-center">
                        <StarRating rating={review.rating} />
                        {review.isVerified && <VerifiedIcon />}
                    </div>
                </div>
                <h4 className="font-semibold mt-2">{review.title}</h4>
                <p className="mt-1 text-gray-600">{review.comment}</p>
            </div>
        </div>
    </div>
);

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, currentUser, onReviewSubmit }) => {

  const handleReviewSubmit = (reviewData: { rating: number; title: string; comment: string; }) => {
    onReviewSubmit(product.id, reviewData);
  }

  return (
    <div>
      <a href="#/" className="mb-6 inline-flex items-center text-brand-blue font-semibold hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to all products
      </a>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
          <img className="w-24 h-24 rounded-xl object-cover mb-4 md:mb-0" src={product.logoUrl} alt={`${product.name} logo`} />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-brand-blue flex items-center">
                {product.name}
                {product.madeIn === 'India' && <span className="ml-3 text-3xl" aria-label="Made in India">🇮🇳</span>}
            </h1>
            <p className="mt-2 text-xl text-gray-600">{product.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.categories.map(category => <Badge key={category}>{category}</Badge>)}
            </div>
            <div className="mt-4 flex items-center space-x-4">
                <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-brand-blue text-white font-semibold py-2 px-5 rounded-lg hover:bg-opacity-90 transition-all">
                    Visit Website
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
                <div className="flex items-center">
                    <StarRating rating={product.rating} />
                    <span className="ml-2 text-md text-gray-600 font-medium">{product.rating.toFixed(1)}</span>
                    <span className="ml-2 text-md text-gray-500">({product.reviewCount} reviews)</span>
                </div>
            </div>
          </div>
        </div>

        {/* Gallery and Deal Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Gallery</h2>
            <div className="rounded-lg overflow-hidden shadow-md">
                <img src={product.gallery[0]} alt="Product screenshot" className="w-full object-cover" />
            </div>
          </div>
          {product.deal && (
            <div>
                <h2 className="text-2xl font-bold text-brand-blue mb-4">Exclusive Deal</h2>
                <div className="bg-yellow-50 border-2 border-dashed border-brand-accent rounded-lg p-6 text-center">
                    <p className="text-lg font-semibold text-brand-blue">{product.deal.title}</p>
                    <p className="text-4xl font-bold text-brand-accent my-3">{product.deal.discount}</p>
                    <p className="text-gray-600 mb-4">{product.deal.description}</p>
                    <div className="bg-brand-accent bg-opacity-20 border border-brand-accent text-brand-blue font-mono font-bold py-2 px-4 rounded-md mb-2">{product.deal.code}</div>
                    <p className="text-sm text-gray-500">{product.deal.expiry}</p>
                </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-brand-blue mb-4">About {product.name}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-brand-blue mb-6">Reviews ({product.reviewCount})</h2>
          
          <div className="mb-8">
            {currentUser ? (
              <ReviewForm onSubmit={handleReviewSubmit} user={currentUser} />
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">Please <a href="#/login" className="font-semibold text-brand-blue hover:underline">log in</a> to leave a review.</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {product.reviews.map(review => <ReviewCard key={review.id} review={review} />)}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;