import React from 'react';
import { FORUM_CATEGORIES } from '../constants';

const ForumsPage: React.FC = () => {
    return (
        <div className="space-y-12">
            <header className="text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-brand-blue">Community Forums</h1>
                <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">Connect with other builders, share feedback, and discuss the latest in indie software.</p>
            </header>

            <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
                <ul className="divide-y divide-gray-200">
                    {FORUM_CATEGORIES.map(category => (
                        <li key={category.id} className="py-6 flex items-start space-x-6">
                            <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-brand-teal bg-opacity-10">
                                    <svg className="h-6 w-6 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <g dangerouslySetInnerHTML={{ __html: category.icon }} />
                                    </svg>
                                </span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-brand-blue">{category.name}</h3>
                                <p className="mt-1 text-gray-500">{category.description}</p>
                            </div>
                             <div className="text-right text-sm text-gray-500">
                                <p>{category.topics.length} topics</p>
                                <p>{category.topics.reduce((acc, t) => acc + t.posts, 0)} posts</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default ForumsPage;
