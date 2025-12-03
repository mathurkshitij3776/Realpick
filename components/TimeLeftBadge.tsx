import React from 'react';

interface TimeLeftBadgeProps {
  expiryDate: string;
}

const calculateTimeLeft = (expiry: string): { text: string, color: string } => {
  const now = new Date();
  const expiryDate = new Date(expiry);
  const diffTime = expiryDate.getTime() - now.getTime();

  if (diffTime <= 0) {
    return { text: 'Expired', color: 'bg-red-100 text-red-800' };
  }

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    return { text: 'Expires today', color: 'bg-yellow-100 text-yellow-800' };
  }
  
  if (diffDays <= 7) {
    return { text: `${diffDays} days left`, color: 'bg-yellow-100 text-yellow-800' };
  }

  return { text: `${diffDays} days left`, color: 'bg-green-100 text-green-800' };
};

const TimeLeftBadge: React.FC<TimeLeftBadgeProps> = ({ expiryDate }) => {
  const { text, color } = calculateTimeLeft(expiryDate);

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>
      {text}
    </span>
  );
};

export default TimeLeftBadge;
