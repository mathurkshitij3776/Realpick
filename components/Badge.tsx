
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  return (
    <span className={`inline-block bg-brand-teal bg-opacity-10 text-brand-teal text-xs font-semibold px-2.5 py-1 rounded-full ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
