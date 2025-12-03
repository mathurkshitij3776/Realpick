import React, { useState, useEffect } from 'react';
import type { User } from '../types';

interface HeaderProps {
    categories: string[];
    user: User | null;
    onLogout: () => void;
    path: string;
    filterControls: {
        searchQuery: string;
        selectedCategory: string;
        selectedDateFilter: string;
    };
    onFilterChange: (filters: { searchQuery?: string; selectedCategory?: string; selectedDateFilter?: string; }) => void;
}

const Logo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-accent">
      <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span className="font-bold text-2xl text-brand-blue">Realpick</span>
  </div>
);

const FilterSelect: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode; className?: string }> = ({ value, onChange, children, className = '' }) => (
    <div className={`relative ${className}`}>
        <select
            value={value}
            onChange={onChange}
            className="w-full appearance-none border-gray-300 rounded-lg shadow-sm pl-3 pr-8 py-2 text-sm text-left focus:ring-brand-teal focus:border-brand-teal bg-white"
        >
            {children}
        </select>
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </div>
    </div>
);


const Header: React.FC<HeaderProps> = ({ categories, user, onLogout, path, filterControls, onFilterChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsSubmenuOpen, setIsProductsSubmenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  const isHomePage = path === '/' || path === '';

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);


  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsProductsSubmenuOpen(false);
  }

  const handleNavClick = (hash: string) => {
    window.location.hash = hash;
    window.scrollTo(0, 0);
    closeMenu();
  }
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = isHomePage ? filterControls.searchQuery : localSearchQuery;
    if (query.trim()) {
        handleNavClick(`/search/${encodeURIComponent(query.trim())}`);
        if (!isHomePage) {
            setLocalSearchQuery('');
        }
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <a href="#/" aria-label="Back to homepage" className="flex-shrink-0" onClick={() => handleNavClick('/')}>
              <Logo />
            </a>
            <nav className="hidden md:flex items-center space-x-6">
              <div className="relative group">
                <a href="#/products" className="text-gray-600 hover:text-brand-blue font-semibold transition-colors flex items-center">
                  Products
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                <div className="absolute top-full left-0 pt-2 w-56 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible z-30">
                  <div className="bg-white rounded-md shadow-lg">
                    <div className="py-2">
                      <a href="#/products" className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-brand-blue">
                        All Products
                      </a>
                      <div className="border-t my-1 mx-2 border-gray-100"></div>
                      {categories.map(category => (
                        <a key={category} href={`#/products#${category.toLowerCase().replace(/\s+/g, '-')}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-blue">
                          {category}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
               <a href="#/news" className="text-gray-600 hover:text-brand-blue font-semibold transition-colors">News</a>
               <a href="#/forums" className="text-gray-600 hover:text-brand-blue font-semibold transition-colors">Forums</a>
              {user?.isAdmin && (
                <a href="#/admin" className="text-red-600 hover:text-red-800 font-semibold transition-colors flex items-center">
                  Admin
                </a>
              )}
            </nav>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:flex md:items-center space-x-4">
               <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
                  <input 
                      type="search" 
                      placeholder={isHomePage ? "Filter products..." : "Search products..."}
                      value={isHomePage ? filterControls.searchQuery : localSearchQuery}
                      onChange={(e) => {
                          if (isHomePage) {
                              onFilterChange({ searchQuery: e.target.value });
                          } else {
                              setLocalSearchQuery(e.target.value);
                          }
                      }}
                      className="w-48 border-gray-300 rounded-lg shadow-sm text-sm focus:ring-brand-teal focus:border-brand-teal bg-gray-50 placeholder-gray-400"
                  />
                  {isHomePage && (
                    <>
                        <FilterSelect 
                          value={filterControls.selectedCategory} 
                          onChange={(e) => onFilterChange({ selectedCategory: e.target.value })}
                          className="w-40"
                        >
                            <option value="All">All Categories</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </FilterSelect>
                        <FilterSelect 
                            value={filterControls.selectedDateFilter}
                            onChange={(e) => onFilterChange({ selectedDateFilter: e.target.value })}
                            className="w-36"
                        >
                            <option value="All">All Time</option>
                            <option value="Today">Today</option>
                            <option value="Yesterday">Yesterday</option>
                            <option value="This Week">This Week</option>
                        </FilterSelect>
                    </>
                  )}
              </form>
              <div className="h-6 w-px bg-gray-200 mx-2"></div>
              {user ? (
                <>
                  <a href="#/my-submissions" onClick={() => handleNavClick('/my-submissions')} className="text-sm text-gray-500 hover:text-brand-blue font-semibold">My Submissions</a>
                  <button onClick={onLogout} className="text-sm text-gray-500 hover:text-brand-blue font-semibold">Logout</button>
                  <a href="#/submit-product" onClick={() => handleNavClick('/submit-product')} className="bg-brand-accent text-brand-blue font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-all text-sm">
                    Submit Product
                  </a>
                </>
              ) : (
                <>
                  <a href="#/login" onClick={() => handleNavClick('/login')} className="text-gray-600 hover:text-brand-blue font-semibold transition-colors text-sm">Log In</a>
                  <a href="#/signup" onClick={() => handleNavClick('/signup')} className="bg-brand-accent text-brand-blue font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-all text-sm">
                    Sign Up
                  </a>
                </>
              )}
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-brand-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-accent" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMenu}></div>
          
          {/* Menu Panel */}
          <div className={`fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                  <a href="#/" onClick={() => handleNavClick('/')}><Logo /></a>
                  <button onClick={closeMenu} className="p-2">
                      <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                  </button>
              </div>

              <div className="p-4 space-y-4">
                 {user ? (
                    <div className="space-y-2">
                      <div className="text-center mb-2">
                          <span className="font-medium text-brand-blue">Welcome, {user.name}!</span>
                      </div>
                      {!user.isAdmin && <a href="#/dashboard" onClick={() => handleNavClick('/dashboard')} className="w-full text-center block bg-gray-100 text-gray-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-all">My Dashboard</a>}
                      <a href="#/my-submissions" onClick={() => handleNavClick('/my-submissions')} className="w-full text-center block bg-gray-100 text-gray-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-all">
                          My Submissions
                      </a>
                      <a href="#/submit-product" onClick={() => handleNavClick('/submit-product')} className="w-full text-center block bg-brand-accent text-brand-blue font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-all">
                          Submit Product
                      </a>
                       <button onClick={() => { onLogout(); closeMenu(); }} className="w-full text-center block bg-gray-100 text-gray-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-all">
                          Logout
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <a href="#/login" onClick={() => handleNavClick('/login')} className="w-full text-center block bg-gray-100 text-gray-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-all">
                          Log In
                      </a>
                      <a href="#/signup" onClick={() => handleNavClick('/signup')} className="w-full text-center block bg-brand-accent text-brand-blue font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-all">
                          Sign Up
                      </a>
                    </div>
                  )}
              </div>

              <div className="p-4 border-t space-y-3">
                  <form onSubmit={handleSearchSubmit} className="relative">
                      <input 
                        type="search" 
                        placeholder={isHomePage ? "Filter products..." : "Search products..."}
                        value={isHomePage ? filterControls.searchQuery : localSearchQuery}
                        onChange={(e) => {
                          if (isHomePage) {
                            onFilterChange({ searchQuery: e.target.value });
                          } else {
                            setLocalSearchQuery(e.target.value);
                          }
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 focus:ring-brand-teal focus:border-brand-teal" 
                       />
                      <button type="submit" className="absolute inset-y-0 left-0 flex items-center pl-3" aria-label="Search">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                      </button>
                  </form>
                   {isHomePage && (
                    <div className="grid grid-cols-2 gap-2">
                        <FilterSelect 
                          value={filterControls.selectedCategory} 
                          onChange={(e) => onFilterChange({ selectedCategory: e.target.value })}
                        >
                            <option value="All">All Categories</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </FilterSelect>
                        <FilterSelect 
                            value={filterControls.selectedDateFilter}
                            onChange={(e) => onFilterChange({ selectedDateFilter: e.target.value })}
                        >
                            <option value="All">All Time</option>
                            <option value="Today">Today</option>
                            <option value="Yesterday">Yesterday</option>
                            <option value="This Week">This Week</option>
                        </FilterSelect>
                    </div>
                  )}
              </div>

              <nav className="flex-grow p-4 overflow-y-auto">
                  <ul>
                      {user?.isAdmin && (
                        <li>
                          <a href="#/admin" onClick={() => handleNavClick('/admin')} className="w-full flex items-center justify-between text-left py-2 px-2 rounded-lg hover:bg-gray-100 font-semibold text-lg text-red-600">
                            Admin Panel
                          </a>
                        </li>
                      )}
                      <li>
                          <button onClick={() => setIsProductsSubmenuOpen(!isProductsSubmenuOpen)} className="w-full flex items-center justify-between text-left py-2 px-2 rounded-lg hover:bg-gray-100 font-semibold text-lg text-brand-blue">
                              Products
                              <svg className={`h-5 w-5 transition-transform ${isProductsSubmenuOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                          </button>
                          {isProductsSubmenuOpen && (
                              <ul className="pl-4 mt-2 space-y-2">
                                  <li><a href="#/products" onClick={() => handleNavClick('/products')} className="block py-1 text-gray-600 hover:text-brand-blue">All Products</a></li>
                                  {categories.map(category => (
                                    <li key={category}><a href={`#/products#${category.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => handleNavClick(`/products#${category.toLowerCase().replace(/\s+/g, '-')}`)} className="block py-1 text-gray-600 hover:text-brand-blue">{category}</a></li>
                                  ))}
                              </ul>
                          )}
                      </li>
                      <li>
                          <a href="#/news" onClick={() => handleNavClick('/news')} className="w-full flex items-center justify-between text-left py-2 px-2 rounded-lg hover:bg-gray-100 font-semibold text-lg text-brand-blue">
                            News
                          </a>
                      </li>
                       <li>
                          <a href="#/forums" onClick={() => handleNavClick('/forums')} className="w-full flex items-center justify-between text-left py-2 px-2 rounded-lg hover:bg-gray-100 font-semibold text-lg text-brand-blue">
                            Forums
                          </a>
                      </li>
                  </ul>
              </nav>
            </div>
          </div>
      </div>
    </header>
  );
};

export default Header;