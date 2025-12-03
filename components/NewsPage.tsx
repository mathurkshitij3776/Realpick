import React from 'react';
import { ARTICLES } from '../constants';
import type { Article } from '../types';
import Badge from './Badge';

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row group hover:shadow-md hover:border-brand-teal transition-all duration-300">
        <div className="md:w-1/3">
            <img src={article.imageUrl} alt={article.title} className="w-full h-48 md:h-full object-cover" />
        </div>
        <div className="p-6 flex flex-col justify-between md:w-2/3">
            <div>
                <Badge className="mb-2">{article.category}</Badge>
                <h3 className="text-2xl font-bold text-brand-blue group-hover:text-brand-teal transition-colors">{article.title}</h3>
                <p className="mt-2 text-gray-600 leading-relaxed line-clamp-3">{article.excerpt}</p>
            </div>
            <div className="mt-4 text-sm text-gray-500">
                <span>By {article.author}</span> &middot; <span>{article.date}</span>
            </div>
        </div>
    </div>
);


const NewsPage: React.FC = () => {
    return (
        <div className="space-y-12">
            <header className="text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-brand-blue">Indie Software News</h1>
                <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">The latest stories, trends, and tips from the world of independent software.</p>
            </header>
            
            <section className="space-y-8 max-w-4xl mx-auto">
                {ARTICLES.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </section>
        </div>
    );
};

export default NewsPage;
