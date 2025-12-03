import React, { useState } from 'react';
import type { User } from '../types';

interface LoginPageProps {
    onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate a successful login and check for admin user
        const isAdmin = email.toLowerCase() === 'admin@realpick.com';
        const mockUser: User = { 
            name: email.split('@')[0], 
            email: email,
            isAdmin: isAdmin
        };
        onLogin(mockUser);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-md mx-auto">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-brand-blue">Welcome Back</h1>
                <p className="mt-2 text-lg text-gray-600">Log in to continue your discovery.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-base font-semibold text-gray-800 mb-2">Email address</label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow-sm focus:ring-2 focus:ring-brand-teal focus:border-brand-teal block w-full text-lg border-gray-300 rounded-lg px-4 py-3"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-base font-semibold text-gray-800 mb-2">Password</label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow-sm focus:ring-2 focus:ring-brand-teal focus:border-brand-teal block w-full text-lg border-gray-300 rounded-lg px-4 py-3"
                        />
                    </div>
                </div>

                <div className="pt-4">
                     <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-brand-blue bg-brand-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-all">
                        Log In
                    </button>
                </div>
                
                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <a href="#/signup" className="font-medium text-brand-blue hover:underline">
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;