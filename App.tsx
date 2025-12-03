import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductDetailPage from './components/ProductDetailPage';
import ProductsPage from './components/ProductsPage';
import SubmitProductPage from './components/SubmitProductPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminPage from './components/AdminPage';
import ProfilePage from './components/ProfilePage';
import BuyerDashboardPage from './components/BuyerDashboardPage';
import NewsPage from './components/NewsPage';
import ForumsPage from './components/ForumsPage';
import SearchPage from './components/SearchPage';
import ComingSoonPage from './components/ComingSoonPage';
import ErrorBoundary from './components/ErrorBoundary';
import { PRODUCTS, SUBSCRIPTIONS } from './constants';
import type { Product, User, Review, Subscription } from './types';

// Helper to generate a URL-friendly slug
const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');


const App: React.FC = () => {
  const [hash, setHash] = useState(window.location.hash || '#/');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(SUBSCRIPTIONS);
  const [filterControls, setFilterControls] = useState({
    searchQuery: '',
    selectedCategory: 'All',
    selectedDateFilter: 'All',
  });

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash || '#/';
      setHash(newHash);
      const newPath = newHash.split('?')[0].substring(1);
      // Reset filters when navigating away from the homepage
      if (newPath !== '/' && newPath !== '') {
        setFilterControls({
          searchQuery: '',
          selectedCategory: 'All',
          selectedDateFilter: 'All',
        });
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    
    // After login, check for a redirect path in the hash query params
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const redirectPath = params.get('redirect');

    if (redirectPath) {
        window.location.hash = `#${decodeURIComponent(redirectPath)}`;
    } else {
        // Default redirect to homepage
        window.location.hash = '#/';
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    window.location.hash = '#/';
  };
  
  const handleProfileUpdate = (updatedData: User) => {
    setCurrentUser(updatedData);
  };

  const handleFilterChange = (filters: Partial<typeof filterControls>) => {
    setFilterControls(prev => ({ ...prev, ...filters }));
  };

  const handleUpvote = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, upvotes: p.upvotes + 1 } : p
      )
    );
  };

  const handleReviewSubmit = (productId: string, reviewData: { rating: number; title: string; comment: string; }) => {
    if (!currentUser) return;

    setProducts(prevProducts => 
      prevProducts.map(p => {
        if (p.id === productId) {
          const newReview: Review = {
            id: Date.now(),
            author: currentUser.name,
            avatarUrl: `https://i.pravatar.cc/48?u=${currentUser.email}`, // Use a consistent avatar for the user
            rating: reviewData.rating,
            title: reviewData.title,
            comment: reviewData.comment,
            date: 'Just now',
            isVerified: false, 
          };

          const updatedReviews = [newReview, ...p.reviews];
          const newReviewCount = updatedReviews.length;
          const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
          const newAverageRating = totalRating / newReviewCount;

          return {
            ...p,
            reviews: updatedReviews,
            reviewCount: newReviewCount,
            rating: newAverageRating,
          };
        }
        return p;
      })
    );
  };

  const handleProductSubmit = (productData: Omit<Product, 'id' | 'reviews' | 'rating' | 'reviewCount' | 'upvotes' | 'status' | 'vendorId'>) => {
    if (!currentUser) return;
    
    const newProduct: Product = {
      ...productData,
      id: slugify(productData.name),
      reviews: [],
      rating: 0,
      reviewCount: 0,
      upvotes: 0,
      status: 'pending',
      vendorId: currentUser.email,
      gallery: productData.gallery || [],
    };

    setProducts(prevProducts => [newProduct, ...prevProducts]);
    alert('Thank you for your submission! Our team will review your product shortly.');
    window.location.hash = '#/';
  };

  const handleApproveProduct = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, status: 'approved' } : p
      )
    );
  };

  const handleRejectProduct = (productId: string) => {
     setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, status: 'rejected' } : p
      )
    );
  };
  
  // Helper to handle redirects for protected routes
  // FIX: Changed return type from JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  const redirectToLogin = (fromPath: string): React.ReactElement => {
      window.location.hash = `#/login?redirect=${encodeURIComponent(fromPath)}`;
      return <LoginPage onLogin={handleLogin} />;
  };

  const path = hash.split('?')[0].substring(1); // remove leading # and query params

  const approvedProducts = products.filter(p => p.status === 'approved');
  const allCategories = [...new Set(approvedProducts.flatMap(p => p.categories))].sort();

  let content;

  if (path.startsWith('/product/')) {
    const productId = path.split('/')[2];
    const product = products.find(p => p.id === productId);
    if (product) {
      content = <ProductDetailPage product={product} currentUser={currentUser} onReviewSubmit={handleReviewSubmit} />;
    } else {
      content = <HomePage products={approvedProducts} onUpvote={handleUpvote} filterControls={filterControls} />;
    }
  } else if (path.startsWith('/search/')) {
      const query = decodeURIComponent(path.split('/')[2] || '');
      content = <SearchPage query={query} products={approvedProducts} onUpvote={handleUpvote} />;
  } else if (path === '/products') {
    content = <ProductsPage products={approvedProducts} onUpvote={handleUpvote} />;
  } else if (path === '/news') {
    content = <NewsPage />;
  } else if (path === '/forums') {
    content = <ForumsPage />;
  } else if (path === '/submit-product') {
    if (currentUser) {
      content = <SubmitProductPage onSubmit={handleProductSubmit} />;
    } else {
      content = redirectToLogin('/submit-product');
    }
  } else if (path === '/my-submissions') {
    if (currentUser) {
      content = <ProfilePage user={currentUser} products={products} onUpdateProfile={handleProfileUpdate} />;
    } else {
      content = redirectToLogin('/my-submissions');
    }
  } else if (path === '/dashboard') {
      if (currentUser && !currentUser.isAdmin) {
        content = <BuyerDashboardPage user={currentUser} products={products} subscriptions={subscriptions} />;
      } else if (currentUser?.isAdmin) {
        // Admins don't have a buyer dashboard, send them home.
        window.location.hash = '#/';
        content = <HomePage products={approvedProducts} onUpvote={handleUpvote} filterControls={filterControls}/>;
      }
      else {
        content = redirectToLogin('/dashboard');
      }
  } else if (path === '/admin') {
      if (currentUser?.isAdmin) {
          const pendingProducts = products.filter(p => p.status === 'pending');
          content = <AdminPage 
            pendingProducts={pendingProducts} 
            onApprove={handleApproveProduct}
            onReject={handleRejectProduct}
          />;
      } else {
          window.location.hash = '#/';
          content = <HomePage products={approvedProducts} onUpvote={handleUpvote} filterControls={filterControls} />;
      }
  } else if (path === '/login') {
    content = <LoginPage onLogin={handleLogin} />;
  } else if (path === '/signup') {
    content = <SignupPage onSignup={handleLogin} />;
  } else if (path === '/about' || path === '/terms' || path === '/privacy' || path === '/contact') {
      content = <ComingSoonPage />;
  } else if (path === '/' || path === '') {
      content = <HomePage products={approvedProducts} onUpvote={handleUpvote} filterControls={filterControls} />;
  } else {
      content = <ComingSoonPage />;
  }


  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        categories={allCategories} 
        user={currentUser}
        onLogout={handleLogout}
        path={path}
        filterControls={filterControls}
        onFilterChange={handleFilterChange}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorBoundary>
          {content}
        </ErrorBoundary>
      </main>
      <Footer 
        categories={allCategories}
        products={approvedProducts}
      />
    </div>
  );
};

export default App;