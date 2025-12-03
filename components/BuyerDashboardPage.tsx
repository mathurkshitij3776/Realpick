import React from 'react';
import type { User, Product, Subscription } from '../types';
import TimeLeftBadge from './TimeLeftBadge';

interface BuyerDashboardPageProps {
    user: User;
    products: Product[];
    subscriptions: Subscription[];
}

const BuyerDashboardPage: React.FC<BuyerDashboardPageProps> = ({ user, products, subscriptions }) => {
    
    const userSubscriptions = subscriptions
        .filter(sub => sub.userId === user.email)
        .map(sub => {
            const product = products.find(p => p.id === sub.productId);
            return { ...sub, product };
        })
        .filter(sub => sub.product); // Ensure product exists

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-brand-blue">My Dashboard</h1>
                <p className="mt-2 text-lg text-gray-600">Welcome, {user.name}! Here you can manage your purchased products.</p>
            </header>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-3xl font-bold text-brand-blue mb-6">My Subscriptions ({userSubscriptions.length})</h2>
                {userSubscriptions.length > 0 ? (
                     <div className="space-y-4">
                        {userSubscriptions.map(({ subscriptionId, expiryDate, product }) => (
                            <div key={subscriptionId} className="p-4 border rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <img src={product!.logoUrl} alt={product!.name} className="w-12 h-12 rounded-lg flex-shrink-0" />
                                    <div>
                                        <a href={`#/product/${product!.id}`} className="font-semibold text-lg text-brand-blue hover:underline">{product!.name}</a>
                                        <p className="text-sm text-gray-500">{product!.tagline}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <TimeLeftBadge expiryDate={expiryDate} />
                                     <a 
                                        href={product!.websiteUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="bg-brand-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all text-sm whitespace-nowrap"
                                     >
                                        Visit Website
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                     <div className="text-center py-10 border-2 border-dashed rounded-lg">
                        <p className="text-gray-500">You haven't subscribed to any products yet.</p>
                        <a href="#/products" className="mt-4 inline-block bg-brand-accent text-brand-blue font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-all text-sm">
                            Discover Products
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuyerDashboardPage;
