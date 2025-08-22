import productsData from '@/data/products.json';

export interface Product {
  id: string;
  name: string;
  images: {
    url: string;
    alt: string;
    isMain: boolean;
  }[];
  realPrice: number;
  discountedPrice: number;
  description: string;
  shortDescription: string;
  sizes: {
    name: string;
    stock: number;
  }[];
  category: string;
  tags: string[];
  isAvailable: boolean;
  totalStock: number;
  avgRating: number;
  numReviews: number;
  createdAt: string;
  updatedAt: string;
}

export const getAllProducts = (): Product[] => {
  return productsData as Product[];
};

export const getProductById = (id: string): Product | undefined => {
  return productsData.find(product => product.id === id) as Product | undefined;
};

export const getProductsByCategory = (category: string): Product[] => {
  return productsData.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  ) as Product[];
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return productsData.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  ) as Product[];
};

export const getFeaturedProducts = (limit: number = 4): Product[] => {
  // Return products with highest ratings
  return productsData
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, limit) as Product[];
};

export const getNewArrivals = (limit: number = 4): Product[] => {
  // Return most recently created products
  return productsData
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit) as Product[];
};

export const getDiscountedProducts = (limit: number = 4): Product[] => {
  // Return products with discounts
  return productsData
    .filter(product => product.discountedPrice < product.realPrice)
    .sort((a, b) => {
      const discountA = ((a.realPrice - a.discountedPrice) / a.realPrice) * 100;
      const discountB = ((b.realPrice - b.discountedPrice) / b.realPrice) * 100;
      return discountB - discountA;
    })
    .slice(0, limit) as Product[];
};
