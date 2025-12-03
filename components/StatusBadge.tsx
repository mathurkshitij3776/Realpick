import React from 'react';

interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected' | undefined;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const statusText = {
    pending: 'Pending Review',
    approved: 'Live',
    rejected: 'Rejected',
  };

  if (!status) return null;

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status]}`}>
      {statusText[status]}
    </span>
  );
};

export default StatusBadge;
