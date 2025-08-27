import { Product } from './productService';
import { config } from './config';

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
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: [] }));
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

// WhatsApp integration functions
export const generateWhatsAppMessage = (product: Product, quantity: number = 1, size?: string): string => {
  const price = product.discountedPrice || product.realPrice;
  const totalPrice = price * quantity;
  const discountPercentage = product.discountedPrice < product.realPrice 
    ? Math.round(((product.realPrice - product.discountedPrice) / product.realPrice) * 100)
    : 0;
  
  // Create a concise, effective message
  let message = `🛍️ *Order Request*\n\n`;
  message += `*${product.name}*\n`;
  message += `💰 Price: ₹${price.toLocaleString('en-IN')}`;
  
  if (discountPercentage > 0) {
    message += ` (${discountPercentage}% OFF)\n`;
  } else {
    message += `\n`;
  }
  
  message += `📦 Quantity: ${quantity}\n`;
  
  if (size) {
    message += `📏 Size: ${size}\n`;
  }
  
  message += `💵 Total: ₹${totalPrice.toLocaleString('en-IN')}\n\n`;
  message += `🔗 Product: ${config.siteUrl}/productDetails/${product.id}\n\n`;
  message += `Please confirm availability and provide payment details. Thank you! 🙏`;
  
  return encodeURIComponent(message);
};

export const generateCartWhatsAppMessage = (): string => {
  const cart = getCart();
  if (cart.length === 0) return '';
  
  let message = `🛒 *Cart Order*\n\n`;
  
  cart.forEach((item, index) => {
    const price = item.discountedPrice || item.price;
    const total = price * item.quantity;
    message += `${index + 1}. *${item.name}*\n`;
    message += `   💰 ₹${price.toLocaleString('en-IN')} x ${item.quantity}`;
    if (item.size) {
      message += ` (Size: ${item.size})`;
    }
    message += `\n   💵 ₹${total.toLocaleString('en-IN')}\n\n`;
  });
  
  const cartTotal = getCartTotal();
  message += `*Total: ₹${cartTotal.toLocaleString('en-IN')}*\n\n`;
  message += `Please confirm availability and provide payment details. Thank you! 🙏`;
  
  return encodeURIComponent(message);
};

export const generateQuickOrderMessage = (): string => {
  const message = `🛍️ Hi! I'd like to place a quick order.\n\nCan you help me with:\n• Product availability\n• Size guide\n• Payment options\n• Delivery time\n\nThank you! 🙏`;
  return encodeURIComponent(message);
};

export const generateSupportMessage = (): string => {
  const message = `🆘 Hi! I need help with my order.\n\nCan you assist me with:\n• Order status\n• Return/exchange\n• Size issues\n• Payment problems\n\nThank you! 🙏`;
  return encodeURIComponent(message);
};

export const generateSizeGuideMessage = (): string => {
  const message = `📏 Hi! I need help with size selection.\n\nCan you provide:\n• Size chart\n• Measurement guide\n• Fit recommendations\n• Exchange policy for wrong sizes\n\nThank you! 🙏`;
  return encodeURIComponent(message);
};

export const openWhatsAppChat = (message: string, phoneNumber?: string): void => {
  const whatsappNumber = phoneNumber || config.whatsapp.phoneNumber;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
  
  // Open WhatsApp in a new tab/window
  if (typeof window !== 'undefined') {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }
};

// Quick WhatsApp link generator for direct product ordering
export const generateQuickWhatsAppLink = (product: Product, quantity: number = 1, size?: string): string => {
  const message = generateWhatsAppMessage(product, quantity, size);
  const whatsappNumber = config.whatsapp.phoneNumber;
  return `https://wa.me/${whatsappNumber}?text=${message}`;
};
