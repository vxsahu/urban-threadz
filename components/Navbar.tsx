"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Sun,
  Moon,
  Instagram,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import Cart from "./cart";

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
    name: "New Arrivals",
    subcategories: ["This Week", "This Month", "Trending"],
    path: "/new-arrivals",
  },
  {
    id: 2,
    name: "Collections",
    subcategories: [
      "Graphic Tees",
      "Minimalist",
      "Vintage",
      "Limited Edition",
    ],
    path: "/collections",
  },
  {
    id: 3,
    name: "Shop By",
    subcategories: ["Men", "Women", "Unisex"],
    path: "/shop-by",
  },
  {
    id: 4,
    name: "Sale",
    subcategories: ["Clearance", "Bundle Deals"],
    path: "/sale",
  },
];

// Custom Hooks
const useScrollEffect = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
};

const useCartCount = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const count = cart.reduce(
          (total: number, item: any) => total + (item.quantity || 0),
          0
        );
        setCartItemCount(count);
      } catch {
        setCartItemCount(0);
      }
    };

    updateCartCount();

    const handleCartUpdate = () => updateCartCount();
    const handleCustomCartUpdate = (event: CustomEvent) => {
      const cart = event.detail;
      const count = cart.reduce(
        (total: number, item: any) => total + (item.quantity || 0),
        0
      );
      setCartItemCount(count);
    };

    window.addEventListener("storage", handleCartUpdate);
    window.addEventListener(
      "cartUpdated",
      handleCustomCartUpdate as EventListener
    );
    return () => {
      window.removeEventListener("storage", handleCartUpdate);
      window.removeEventListener(
        "cartUpdated",
        handleCustomCartUpdate as EventListener
      );
    };
  }, []);

  return cartItemCount;
};

// Components
const Logo = () => (
  <Link href="/" className="flex items-center gap-2 group">
    <motion.div whileHover={{ scale: 1.08 }} className="relative">
      <svg
        width="28"
        height="28"
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
    <span className="text-2xl font-bold font-sans tracking-tight text-[var(--primary)] drop-shadow-sm">
      Next Threadz
    </span>
  </Link>
);

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        // You can replace this with router.push(`/search?q=${searchQuery}`)
        window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <motion.form
      onSubmit={handleSearch}
      className="relative"
      initial={false}
      aria-label="Search"
    >
      <motion.div
        className="flex items-center"
        animate={{ width: isExpanded ? 260 : 40 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button
          type="button"
          onClick={() => setIsExpanded((v) => !v)}
          className="p-2 text-[var(--secondary)] hover:text-[var(--primary)] transition-colors rounded-full hover:bg-[var(--neutral)]"
          aria-label="Expand search"
        >
          <Search size={18} />
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.input
              ref={inputRef}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="ml-2 bg-transparent border-b border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-sm py-1 text-[var(--foreground)] placeholder:text-[var(--secondary)]"
              autoFocus
              aria-label="Search input"
              onBlur={() => setIsExpanded(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.form>
  );
};

const CategoryDropdown = ({
  category,
  isActive,
  onToggle,
}: {
  category: Category;
  isActive: boolean;
  onToggle: () => void;
}) => {
  // Prevent closing dropdown when clicking inside
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onToggle();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
    // eslint-disable-next-line
  }, [isActive]);

  return (
    <div className="relative group" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`flex items-center gap-1 text-sm font-semibold text-[var(--neutral-foreground)] hover:text-[var(--primary)] transition-colors uppercase tracking-wide py-2 px-2 rounded-md ${
          isActive ? "bg-[var(--neutral)]" : ""
        }`}
        aria-haspopup="true"
        aria-expanded={isActive}
      >
        {category.name}
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={15} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 w-52 bg-[var(--card)] shadow-2xl rounded-xl py-2 mt-2 z-50 border border-[var(--border)] backdrop-blur-xl"
          >
            <Link
              href={category.path}
              className="block px-4 py-2 text-sm text-[var(--card-foreground)] hover:bg-[var(--primary)/10] hover:text-[var(--primary)] transition-colors font-semibold rounded"
              onClick={onToggle}
            >
              All {category.name}
            </Link>
            {category.subcategories.map((subcategory, idx) => {
              const subcategoryPath = subcategory
                .toLowerCase()
                .replace(/\s+/g, "-");
              const href = `${category.path}?subcategory=${subcategoryPath}`;
              return (
                <Link
                  key={idx}
                  href={href}
                  className="block px-4 py-2 text-sm text-[var(--card-foreground)] hover:bg-[var(--primary)/10] hover:text-[var(--primary)] transition-colors rounded"
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
};

const ActionButton = ({
  icon: Icon,
  onClick,
  badge,
  href,
  label,
}: {
  icon: any;
  onClick?: () => void;
  badge?: number;
  href?: string;
  label?: string;
}) => {
  const content = (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="relative p-2 text-[var(--secondary)] hover:text-[var(--primary)] transition-colors rounded-full hover:bg-[var(--neutral)]"
      aria-label={label}
      type="button"
    >
      <Icon size={22} />
      {badge && badge > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-[var(--primary)] text-[var(--primary-foreground)] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow"
        >
          {badge > 99 ? "99+" : badge}
        </motion.span>
      )}
    </motion.button>
  );

  return href ? (
    <Link href={href} className="block" target="_blank" rel="noopener noreferrer">
      {content}
    </Link>
  ) : (
    content
  );
};

const MobileMenu = ({
  isOpen,
  onClose,
  categories,
  activeCategory,
  setActiveCategory,
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  activeCategory: number | null;
  setActiveCategory: (id: number | null) => void;
}) => {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="lg:hidden fixed top-16 left-0 right-0 bg-[var(--background)] border-t border-[var(--border)] shadow-2xl backdrop-blur-xl z-40"
        >
          <div className="p-4 space-y-4">
            {/* Search */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (search.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(
                    search
                  )}`;
                  onClose();
                }
              }}
              className="relative"
            >
              <Search
                size={18}
                className="absolute left-3 top-3 text-[var(--secondary)]"
              />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-[var(--border)] rounded-lg bg-transparent text-[var(--foreground)] placeholder:text-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                aria-label="Search products"
              />
            </form>

            {/* Categories */}
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === category.id ? null : category.id
                      )
                    }
                    className={`w-full flex items-center justify-between p-3 text-left text-base font-semibold text-[var(--neutral-foreground)] hover:text-[var(--primary)] hover:bg-[var(--neutral)] rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? "bg-[var(--neutral)]"
                        : ""
                    }`}
                    aria-expanded={activeCategory === category.id}
                  >
                    {category.name}
                    <motion.div
                      animate={{
                        rotate: activeCategory === category.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeCategory === category.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="ml-4 space-y-1"
                      >
                        <Link
                          href={category.path}
                          className="block p-2 text-base text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--neutral)] rounded transition-colors font-semibold"
                          onClick={onClose}
                        >
                          All {category.name}
                        </Link>
                        {category.subcategories.map((subcategory, idx) => {
                          const subcategoryPath = subcategory
                            .toLowerCase()
                            .replace(/\s+/g, "-");
                          const href = `${category.path}?subcategory=${subcategoryPath}`;

                          return (
                            <Link
                              key={idx}
                              href={href}
                              className="block p-2 text-base text-[var(--secondary)] hover:text-[var(--primary)] hover:bg-[var(--neutral)] rounded transition-colors"
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
};

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
    const baseClasses =
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300";
    const scrolledClasses = isScrolled
      ? "bg-background backdrop-blur-xl border-b border-zinc-50 shadow"
      : "bg-background/80";
    return `${baseClasses} ${scrolledClasses} ${className}`;
  }, [isScrolled, className]);

  // Event handlers
  const handleCategoryToggle = useCallback(
    (categoryId: number) => {
      setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
    },
    []
  );

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((v) => !v);
  }, []);

  const handleCartToggle = useCallback(() => {
    setIsCartOpen((v) => !v);
  }, []);

  // Close dropdowns when clicking outside (desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleClickOutside = (e: MouseEvent) => {
      // Only close if not mobile menu open
      if (!isMobileMenuOpen) setActiveCategory(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu or cart is open
  useEffect(() => {
    if (isMobileMenuOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isCartOpen]);

  return (
    <nav className={navbarClasses}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
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
              icon={theme === "light" ? Moon : Sun}
              onClick={toggleTheme}
              label="Toggle theme"
            />

            <ActionButton
              icon={Instagram}
              href="https://www.instagram.com/next__threadz__/"
              label="Instagram"
            />

            <ActionButton
              icon={ShoppingCart}
              onClick={handleCartToggle}
              badge={cartItemCount}
              label="Cart"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ActionButton
              icon={isMobileMenuOpen ? X : Menu}
              onClick={handleMobileMenuToggle}
              label="Toggle menu"
            />
            <ActionButton
              icon={ShoppingCart}
              onClick={handleCartToggle}
              badge={cartItemCount}
              label="Cart"
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