import React from 'react';
import type { Product } from '../types';
import { FORUM_CATEGORIES } from '../constants';

interface FooterProps {
    categories: string[];
    products: Product[];
}

const Footer: React.FC<FooterProps> = ({ categories, products }) => {
    const trendingProducts = [...products]
        .sort((a, b) => b.upvotes - a.upvotes)
        .slice(0, 5);

    const topForumThreads = FORUM_CATEGORIES.flatMap(cat => cat.topics).slice(0, 5);
    
    const topCategories = categories.slice(0, 5);
    
    const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    return (
        <footer className="bg-brand-blue text-white">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    
                    {/* Column 1: Categories */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Top Categories</h3>
                        <ul className="mt-4 space-y-3">
                            {topCategories.map(category => (
                                <li key={category}>
                                    <a href={`#/products#${slugify(category)}`} className="text-base text-gray-400 hover:text-white transition-colors">
                                        {category}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href="#/products" className="text-base font-semibold text-gray-300 hover:text-white transition-colors">
                                    See All &raquo;
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Trending Products */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Trending</h3>
                        <ul className="mt-4 space-y-3">
                            {trendingProducts.map(product => (
                                <li key={product.id}>
                                    <a href={`#/product/${product.id}`} className="text-base text-gray-400 hover:text-white transition-colors">
                                        {product.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Column 3: Community */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Community</h3>
                        <ul className="mt-4 space-y-3">
                            {topForumThreads.map(thread => (
                                <li key={thread.id}>
                                    <a href="#/forums" className="text-base text-gray-400 hover:text-white transition-colors truncate" title={thread.title}>
                                        {thread.title}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href="#/forums" className="text-base font-semibold text-gray-300 hover:text-white transition-colors">
                                    Join Discussion &raquo;
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#/about" className="text-base text-gray-400 hover:text-white transition-colors">About</a></li>
                            <li><a href="#/news" className="text-base text-gray-400 hover:text-white transition-colors">News</a></li>
                            <li><a href="#/contact" className="text-base text-gray-400 hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#/terms" className="text-base text-gray-400 hover:text-white transition-colors">Terms</a></li>
                            <li><a href="#/privacy" className="text-base text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                        </ul>
                    </div>
                </div>
                
                {/* Bottom Bar */}
                <div className="mt-12 border-t border-gray-700 pt-8">
                  <h3 className="text-lg font-bold">Realpick</h3>
                  <p className="mt-2 text-sm text-gray-400">Authentic software discovery for builders, by builders.</p>
                  <p className="mt-4 text-sm text-gray-400">&copy; {new Date().getFullYear()} Realpick. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;