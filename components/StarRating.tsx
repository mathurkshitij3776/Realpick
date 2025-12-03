
import React from 'react';

interface StarRatingProps {
  rating: number;
  className?: string;
}

const Star: React.FC<{ fill: string }> = ({ fill }) => (
  <svg className="w-4 h-4" viewBox="0 0 20 20" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M10 15L3.39 18.39L4.5 11.5L0 6.61L6.91 5.5L10 0L13.09 5.5L20 6.61L15.5 11.5L16.61 18.39L10 15Z"/>
  </svg>
);

const StarRating: React.FC<StarRatingProps> = ({ rating, className = '' }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let fill = 'none';
    if (rating >= i) {
      fill = 'currentColor';
    } else if (rating > i - 1 && rating < i) {
      // Not handling half-stars for this simple implementation
      fill = 'currentColor';
    }
    stars.push(<Star key={i} fill={ i <= rating ? 'currentColor' : 'lightgray'}/>);
  }
  return <div className={`flex items-center text-brand-accent ${className}`}>{stars}</div>;
};

export default StarRating;
