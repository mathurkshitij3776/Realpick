import React from 'react';
import type { Product } from '../types';

interface AdminPageProps {
  pendingProducts: Product[];
  onApprove: (productId: string) => void;
  onReject: (productId: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ pendingProducts, onApprove, onReject }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-brand-blue">Admin Curation Queue</h1>
        <p className="mt-2 text-lg text-gray-600">Review and approve new product submissions.</p>
      </header>
      
      {pendingProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">All clear!</h3>
          <p className="mt-1 text-sm text-gray-500">There are no pending submissions to review.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={product.logoUrl} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.tagline}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.vendorId || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button onClick={() => onApprove(product.id)} className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-xs font-semibold">
                      Approve
                    </button>
                    <button onClick={() => onReject(product.id)} className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-xs font-semibold">
                      Reject
                    </button>
                    <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                      Visit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;