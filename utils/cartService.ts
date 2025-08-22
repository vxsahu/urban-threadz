import { Product } from './productService';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  images: { url: string }[];
  quantity: number;
  size?: string;
}

const CART_STORAGE_KEY = 'cart';

// Get cart from localStorage
export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
export const saveCart = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Dispatch custom event to notify components about cart changes
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Add item to cart
export const addToCart = (product: Product, quantity: number = 1, size?: string): CartItem[] => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => 
    item.id === product.id && item.size === size
  );

  if (existingItemIndex >= 0) {
    // Update existing item quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.realPrice,
      discountedPrice: product.discountedPrice,
      images: product.images,
      quantity,
      size
    };
    cart.push(cartItem);
  }

  saveCart(cart);
  return cart;
};

// Update item quantity
export const updateCartItemQuantity = (itemId: string, quantity: number, size?: string): CartItem[] => {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => 
    item.id === itemId && item.size === size
  );

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart[itemIndex].quantity = quantity;
    }
    saveCart(cart);
  }

  return cart;
};

// Remove item from cart
export const removeFromCart = (itemId: string, size?: string): CartItem[] => {
  const cart = getCart();
  const filteredCart = cart.filter(item => 
    !(item.id === itemId && item.size === size)
  );
  
  saveCart(filteredCart);
  return filteredCart;
};

// Clear cart
export const clearCart = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_STORAGE_KEY);
};

// Get cart total
export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const price = item.discountedPrice || item.price;
    return total + (price * item.quantity);
  }, 0);
};

// Get cart item count
export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Check if item is in cart
export const isItemInCart = (productId: string, size?: string): boolean => {
  const cart = getCart();
  return cart.some(item => item.id === productId && item.size === size);
};
