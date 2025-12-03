import React, { useState } from 'react';
import type { User, Product } from '../types';
import StatusBadge from './StatusBadge';

interface ProfilePageProps {
    user: User;
    products: Product[];
    onUpdateProfile: (updatedData: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, products, onUpdateProfile }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [isEditing, setIsEditing] = useState(false);

    const userSubmissions = products.filter(p => p.vendorId === user.email);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateProfile({ ...user, name, email });
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Profile Info */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                    <h1 className="text-3xl font-bold text-brand-blue mb-6">Account Info</h1>
                    {!isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Name</label>
                                <p className="text-lg text-gray-800">{user.name}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="text-lg text-gray-800">{user.email}</p>
                            </div>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full mt-4 bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-brand-teal focus:border-brand-teal block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-brand-teal focus:border-brand-teal block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="flex space-x-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => { setIsEditing(false); setName(user.name); setEmail(user.email); }}
                                    className="w-full bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-full bg-brand-accent text-brand-blue font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-all"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* Right Column: Submissions */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-3xl font-bold text-brand-blue mb-6">My Submissions ({userSubmissions.length})</h2>
                    {userSubmissions.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {userSubmissions.map(product => (
                                <li key={product.id} className="py-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <img src={product.logoUrl} alt={product.name} className="w-12 h-12 rounded-lg" />
                                        <div>
                                            <a href={`#/product/${product.id}`} className="font-semibold text-brand-blue hover:underline">{product.name}</a>
                                            <p className="text-sm text-gray-500">{product.tagline}</p>
                                        </div>
                                    </div>
                                    <StatusBadge status={product.status} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-10 border-2 border-dashed rounded-lg">
                            <p className="text-gray-500">You haven't submitted any products yet.</p>
                            <a href="#/submit-product" className="mt-4 inline-block bg-brand-accent text-brand-blue font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-all text-sm">
                                Submit Your First Product
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;