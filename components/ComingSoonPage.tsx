import React from 'react';

const ComingSoonPage: React.FC = () => {
  return (
    <div className="text-center py-16 bg-gray-50 rounded-lg">
      <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="mt-4 text-3xl font-bold text-brand-blue">Coming Soon!</h1>
      <p className="mt-2 text-lg text-gray-600">We're working hard to bring you this feature. Please check back later.</p>
      <a href="#/" className="mt-6 inline-block bg-brand-accent text-brand-blue font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-all text-sm">
        Go to Homepage
      </a>
    </div>
  );
};

export default ComingSoonPage;
