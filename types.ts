// FIX: Removed a self-import of the 'User' type that was causing a name conflict.

export interface User {
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface Review {
  id: number;
  author: string;
  avatarUrl: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  isVerified: boolean;
}

export interface Deal {
  title:string;
  description: string;
  discount: string;
  code: string;
  expiry: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  categories: string[];
  reviews: Review[];
  rating: number;
  reviewCount: number;
  upvotes: number;
  deal?: Deal;
  gallery: string[];
  status?: 'pending' | 'approved' | 'rejected';
  vendorId?: string;
  madeIn?: string;
  launchDate?: string;
}

export interface Subscription {
  subscriptionId: string;
  userId: string; // Corresponds to user.email
  productId: string; // Corresponds to product.id
  purchaseDate: string; // ISO date string
  expiryDate: string; // ISO date string
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
}

export interface ForumTopic {
  id: number;
  title: string;
  author: string;
  posts: number;
  lastPost: string;
}

export interface ForumCategory {
  id: number;
  name: string;
  description: string;
  icon: string; // SVG path
  topics: ForumTopic[];
}