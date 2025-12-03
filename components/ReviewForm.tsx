import React, { useState } from 'react';
import type { User } from '../types';

interface ReviewFormProps {
  user: User;
  onSubmit: (reviewData: { rating: number; title: string; comment: string }) => void;
}

const StarInput: React.FC<{ rating: number, onRatingChange: (rating: number) => void }> = ({ rating, onRatingChange }) => {
    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onRatingChange(star)}
                    onMouseOver={() => onRatingChange(star)}
                    className="text-gray-300 focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                >
                    <svg className={`w-6 h-6 transition-colors ${star <= rating ? 'text-brand-accent' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 15L3.39 18.39L4.5 11.5L0 6.61L6.91 5.5L10 0L13.09 5.5L20 6.61L15.5 11.5L16.61 18.39L10 15Z"/>
                    </svg>
                </button>
            ))}
        </div>
    );
};


const ReviewForm: React.FC<ReviewFormProps> = ({ user, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim() || !title.trim()) {
        alert('Please provide a rating, title, and comment.');
        return;
    }
    onSubmit({ rating, title, comment });
    // Reset form
    setRating(0);
    setTitle('');
    setComment('');
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
            <img src={`https://i.pravatar.cc/48?u=${user.email}`} alt={user.name} className="w-12 h-12 rounded-full" />
            <div>
                <p className="font-semibold text-brand-blue">{user.name}</p>
                <p className="text-sm text-gray-500">Share your thoughts</p>
            </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Your Rating:</label>
                <StarInput rating={rating} onRatingChange={setRating} />
            </div>
            <div>
                <label htmlFor="review-title" className="sr-only">Review Title</label>
                <input
                    id="review-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title of your review"
                    required
                    className="shadow-sm focus:ring-brand-teal focus:border-brand-teal block w-full sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="review-comment" className="sr-only">Comment</label>
                <textarea
                    id="review-comment"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={`What did you like or dislike about this product?`}
                    required
                    className="shadow-sm focus:ring-brand-teal focus:border-brand-teal block w-full sm:text-sm border-gray-300 rounded-md"
                ></textarea>
            </div>
            <div className="text-right">
                <button
                    type="submit"
                    className="inline-flex items-center bg-brand-blue text-white font-semibold py-2 px-5 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={rating === 0 || !comment.trim() || !title.trim()}
                >
                    Submit Review
                </button>
            </div>
        </form>
    </div>
  );
};

export default ReviewForm;
