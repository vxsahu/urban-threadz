"use client";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { X, ShoppingCart, Trash2, Minus, Plus, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'
import { getCart, updateCartItemQuantity, removeFromCart as removeFromCartService, CartItem, generateCartWhatsAppMessage, openWhatsAppChat } from '@/utils/cartService'

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount and when cart changes
  useEffect(() => {
    const loadCart = () => {
      setCartItems(getCart());
    };

    loadCart();
    
    // Listen for storage changes (when cart is updated from other components)
    const handleStorageChange = () => {
      loadCart();
    };

    // Listen for custom cart update events
    const handleCartUpdate = (event: CustomEvent) => {
      setCartItems(event.detail);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate as EventListener);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
    };
  }, []);

  const handleQuantityChange = (productId: string, delta: number) => {
    const item = cartItems.find(i => i.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity < 1 || newQuantity > 10) {
      toast.error('Quantity must be between 1 and 10');
      return;
    }

    const updatedCart = updateCartItemQuantity(productId, newQuantity, item.size);
    setCartItems(updatedCart);
    toast.success(`Updated quantity to ${newQuantity}`);
  };

  const removeFromCart = (productId: string) => {
    const item = cartItems.find(i => i.id === productId);
    if (!item) return;
    
    const updatedCart = removeFromCartService(productId, item.size);
    setCartItems(updatedCart);
    toast.success('Item removed from cart');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discountedPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    // For a static site, we can redirect to a checkout page or show a message
    toast.info('Checkout functionality would be implemented here');
    onClose();
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    const message = generateCartWhatsAppMessage();
    openWhatsAppChat(message);
    toast.success('Opening WhatsApp chat for order!');
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-[var(--background)] shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-[var(--foreground)]">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-[var(--secondary)] hover:text-[var(--foreground)]"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16">
                              <ShoppingCart className="h-16 w-16 text-[var(--secondary)] mb-4" />
                              <p className="text-[var(--secondary)] text-lg mb-8">Your cart is empty</p>
                              <button
                                onClick={onClose}
                                className="inline-flex items-center px-4 py-2 border border-[var(--foreground)] text-sm font-medium rounded-md text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
                              >
                                Continue Shopping
                              </button>
                            </div>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-[var(--border)]">
                              {cartItems.map((item) => (
                                <li key={`${item.id}-${item.size}`} className="flex py-6">
                                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-[var(--border)]">
                                    <Image
                                      src={item.images[0].url}
                                      alt={item.name}
                                      fill
                                      className="object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-[var(--foreground)]">
                                        <h3>{item.name}</h3>
                                        <p className="ml-4">₹{item.discountedPrice || item.price}</p>
                                      </div>
                                      {item.size && (
                                        <p className="text-sm text-[var(--secondary)] mt-1">Size: {item.size}</p>
                                      )}
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center space-x-3">
                                        <button
                                          onClick={() => handleQuantityChange(item.id, -1)}
                                          disabled={item.quantity === 1}
                                          className="p-1 rounded-full hover:bg-[var(--neutral)] disabled:opacity-50 text-[var(--foreground)]"
                                        >
                                          <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="font-medium text-[var(--foreground)]">{item.quantity}</span>
                                        <button
                                          onClick={() => handleQuantityChange(item.id, 1)}
                                          disabled={item.quantity === 10}
                                          className="p-1 rounded-full hover:bg-[var(--neutral)] disabled:opacity-50 text-[var(--foreground)]"
                                        >
                                          <Plus className="h-4 w-4" />
                                        </button>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => removeFromCart(item.id)}
                                        className="font-medium text-red-600 hover:text-red-500"
                                      >
                                        <Trash2 className="h-5 w-5" />
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {cartItems.length > 0 && (
                      <div className="border-t border-[var(--border)] px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-[var(--foreground)]">
                          <p>Subtotal</p>
                          <p>₹{calculateSubtotal().toLocaleString('en-IN')}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-[var(--secondary)]">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6 space-y-3">
                          <button
                            type="button"
                            onClick={handleCheckout}
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-[var(--primary)] px-6 py-3 text-base font-medium text-[var(--primary-foreground)] shadow-sm hover:opacity-90"
                          >
                            Checkout
                          </button>
                          <button
                            type="button"
                            onClick={handleWhatsAppCheckout}
                            className="w-full flex items-center justify-center gap-2 rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                          >
                            <MessageCircle className="w-5 h-5" />
                            Order via WhatsApp
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-[var(--secondary)]">
                          <p>
                            or{' '}
                            <button
                              type="button"
                              className="font-medium text-[var(--foreground)] hover:opacity-80"
                              onClick={onClose}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Cart
