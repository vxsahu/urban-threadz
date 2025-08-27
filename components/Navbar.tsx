"use client";

import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Instagram,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import Cart from './cart';

// Types
interface Category {
  id: number;
  name: string;
  subcategories: string[];
  path: string;
}

interface NavbarProps {
  className?: string;
}

// Constants
const CATEGORIES: Category[] = [
  { 
    id: 1, 
    name: 'New Arrivals', 
    subcategories: ['This Week', 'This Month', 'Trending'], 
    path: '/new-arrivals' 
  },
  { 
    id: 2, 
    name: 'Collections', 
    subcategories: ['Graphic Tees', 'Minimalist', 'Vintage', 'Limited Edition'], 
    path: '/collections' 
  },
  { 
    id: 3, 
    name: 'Shop By', 
    subcategories: ['Men', 'Women', 'Unisex'], 
    path: '/shop-by' 
  },
  { 
    id: 4, 
    name: 'Sale', 
    subcategories: ['Clearance', 'Bundle Deals'], 
    path: '/sale' 
  },
];

// Custom Hooks
const useScrollEffect = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolled;
};

const useCartCount = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const count = cart.reduce((total: number, item: any) => total + (item.quantity || 0), 0);
        setCartItemCount(count);
      } catch (error) {
        console.error('Error reading cart from localStorage:', error);
        setCartItemCount(0);
      }
    };

    updateCartCount();
    
    // Listen for both storage events and custom cart events
    const handleCartUpdate = () => updateCartCount();
    const handleCustomCartUpdate = (event: CustomEvent) => {
      const cart = event.detail;
      const count = cart.reduce((total: number, item: any) => total + (item.quantity || 0), 0);
      setCartItemCount(count);
    };

    window.addEventListener('storage', handleCartUpdate);
    window.addEventListener('cartUpdated', handleCustomCartUpdate as EventListener);
    return () => {
      window.removeEventListener('storage', handleCartUpdate);
      window.removeEventListener('cartUpdated', handleCustomCartUpdate as EventListener);
    };
  }, []);

  return cartItemCount;
};

// Components
const Logo = () => (
  <Link href="/" className="flex items-center gap-2 group">
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative"
    >
      <svg 
        width="24" 
        height="32" 
        viewBox="0 0 20 26" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-300 group-hover:fill-[var(--primary)]"
      >
        <path 
          d="M12.584 5.50586C16.8543 6.64495 19.9999 10.5388 20 15.168C19.9999 20.6906 15.5227 25.1678 10 25.168C4.47737 25.1678 0.000104118 20.6906 0 15.168C5.26341e-05 10.6937 2.93879 6.90497 6.99121 5.62793V17.4795C6.99124 19.0238 8.24283 20.2753 9.78711 20.2754C11.3315 20.2754 12.584 19.0239 12.584 17.4795V5.50586ZM19 0.5C19.5523 0.5 20 0.947715 20 1.5V9.37793C18.0781 5.82756 14.3207 3.41602 10 3.41602C5.67932 3.41602 1.92191 5.82756 0 9.37793V1.5C0 0.947715 0.447715 0.5 1 0.5H19Z" 
          fill="currentColor"
        />
      </svg>
    </motion.div>
    <span className="text-xl font-bold bg-gradient-to-r from-[var(--foreground)] to-[var(--primary)] bg-clip-text text-transparent">
      NextThreadz
    </span>
  </Link>
);

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log('Searching for:', searchQuery);
    }
  }, [searchQuery]);

  return (
    <motion.form 
      onSubmit={handleSearch}
      className="relative"
      initial={false}
    >
      <motion.div
        className="flex items-center"
        animate={{ width: isExpanded ? 280 : 40 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors rounded-full hover:bg-[var(--neutral)]"
        >
          <Search size={18} />
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.input
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="ml-2 bg-transparent border-b border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-sm py-1 text-[var(--foreground)] placeholder:text-[var(--secondary)]"
              autoFocus
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.form>
  );
};

const CategoryDropdown = ({ category, isActive, onToggle }: {
  category: Category;
  isActive: boolean;
  onToggle: () => void;
}) => (
  <div className="relative group">
    <button
      onClick={onToggle}
      className="flex items-center gap-1 text-sm font-medium text-[var(--neutral-foreground)] hover:text-[var(--foreground)] transition-colors uppercase tracking-wide py-2"
    >
      {category.name}
      <motion.div
        animate={{ rotate: isActive ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown size={14} />
      </motion.div>
    </button>
    
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 w-48 bg-[var(--card)] shadow-xl rounded-lg py-2 mt-1 z-50 border border-[var(--border)] backdrop-blur-xl"
        >
          <Link
            href={category.path}
            className="block px-4 py-2 text-sm text-[var(--card-foreground)] hover:bg-[var(--neutral)] hover:text-[var(--foreground)] transition-colors font-medium"
            onClick={onToggle}
          >
            All {category.name}
          </Link>
          {category.subcategories.map((subcategory, idx) => {
            const subcategoryPath = subcategory.toLowerCase().replace(/\s+/g, '-');
            const href = category.path === '/sale' 
              ? `${category.path}?subcategory=${subcategoryPath}`
              : `${category.path}?subcategory=${subcategoryPath}`;
            
            return (
              <Link
                key={idx}
                href={href}
                className="block px-4 py-2 text-sm text-[var(--card-foreground)] hover:bg-[var(--neutral)] hover:text-[var(--foreground)] transition-colors"
                onClick={onToggle}
              >
                {subcategory}
              </Link>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ActionButton = ({ 
  icon: Icon, 
  onClick, 
  badge, 
  href,
  label 
}: {
  icon: any;
  onClick?: () => void;
  badge?: number;
  href?: string;
  label?: string;
}) => {
  const content = (
    <motion.button
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative p-2 text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors rounded-full hover:bg-[var(--neutral)]"
      aria-label={label}
    >
      <Icon size={20} />
      {badge && badge > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-[var(--primary)] text-[var(--primary-foreground)] text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
        >
          {badge}
        </motion.span>
      )}
    </motion.button>
  );

  return href ? (
    <Link href={href} className="block">
      {content}
    </Link>
  ) : content;
};

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  categories, 
  activeCategory, 
  setActiveCategory 
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  activeCategory: number | null;
  setActiveCategory: (id: number | null) => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden absolute top-full left-0 right-0 bg-[var(--background)] border-t border-[var(--border)] shadow-xl backdrop-blur-xl"
      >
        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-[var(--secondary)]" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-[var(--border)] rounded-lg bg-transparent text-[var(--foreground)] placeholder:text-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* Categories */}
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id}>
                <button
                  onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                  className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-[var(--neutral-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--neutral)] rounded-lg transition-colors"
                >
                  {category.name}
                  <motion.div
                    animate={{ rotate: activeCategory === category.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {activeCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 space-y-1"
                    >
                      <Link
                        href={category.path}
                        className="block p-2 text-sm text-[var(--foreground)] hover:text-[var(--foreground)] hover:bg-[var(--neutral)] rounded transition-colors font-medium"
                        onClick={onClose}
                      >
                        All {category.name}
                      </Link>
                      {category.subcategories.map((subcategory, idx) => {
                        const subcategoryPath = subcategory.toLowerCase().replace(/\s+/g, '-');
                        const href = `${category.path}?subcategory=${subcategoryPath}`;
                        
                        return (
                          <Link
                            key={idx}
                            href={href}
                            className="block p-2 text-sm text-[var(--secondary)] hover:text-[var(--foreground)] hover:bg-[var(--neutral)] rounded transition-colors"
                            onClick={onClose}
                          >
                            {subcategory}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Main Component
export default function Navbar({ className = "" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const isScrolled = useScrollEffect();
  const cartItemCount = useCartCount();
  const { theme, toggleTheme } = useTheme();

  // Memoized values
  const navbarClasses = useMemo(() => {
    const baseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300";
    const scrolledClasses = isScrolled 
      ? "bg-background backdrop-blur-xl border-b border-zinc-50 shadow-lg" 
      : "bg-background/95";
    return `${baseClasses} ${scrolledClasses} ${className}`;
  }, [isScrolled, className]);

  // Event handlers
  const handleCategoryToggle = useCallback((categoryId: number) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  }, [activeCategory]);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const handleCartToggle = useCallback(() => {
    setIsCartOpen(!isCartOpen);
  }, [isCartOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveCategory(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className={navbarClasses}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {CATEGORIES.map((category) => (
              <CategoryDropdown
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onToggle={() => handleCategoryToggle(category.id)}
              />
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <SearchBar />
            
            <ActionButton
              icon={theme === 'light' ? Moon : Sun}
              onClick={toggleTheme}
              label="Toggle theme"
            />

            <ActionButton
              icon={Instagram}
              href="https://www.instagram.com/urban__threadz__/"
              label="Instagram"
            />
            
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={handleCartToggle}
              className="relative p-2 text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors rounded-full hover:bg-[var(--neutral)]"
              aria-label="Cart"
            >
              {/* Flipkart-style shopping cart icon */}
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transition-colors duration-200"
              >
                <path 
                  d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#2874f0] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-sm"
                  style={{ fontSize: '10px' }}
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <ActionButton
              icon={isMobileMenuOpen ? X : Menu}
              onClick={handleMobileMenuToggle}
              label="Toggle menu"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          categories={CATEGORIES}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}