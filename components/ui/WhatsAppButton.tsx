"use client";
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  openWhatsAppChat, 
  generateQuickOrderMessage, 
  generateSupportMessage, 
  generateSizeGuideMessage 
} from '@/utils/cartService';
import { config } from '@/utils/config';

export default function WhatsAppButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    const message = generateQuickOrderMessage();
    openWhatsAppChat(message);
  };

  const handleQuickOrder = () => {
    const message = generateQuickOrderMessage();
    openWhatsAppChat(message);
    setIsExpanded(false);
  };

  const handleSupport = () => {
    const message = generateSupportMessage();
    openWhatsAppChat(message);
    setIsExpanded(false);
  };

  const handleSizeGuide = () => {
    const message = generateSizeGuideMessage();
    openWhatsAppChat(message);
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[200px]"
          >
            <div className="space-y-2">
              <button
                onClick={handleQuickOrder}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                🛒 Quick Order
              </button>
              <button
                onClick={handleSupport}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                🆘 Need Help?
              </button>
              <button
                onClick={handleSizeGuide}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                📏 Size Guide
              </button>
            </div>
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-end space-y-3">
        {/* Main WhatsApp Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors duration-200"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>

        {/* Expand Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
            isExpanded 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
          aria-label={isExpanded ? "Close menu" : "Open menu"}
        >
          <X className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-45' : 'rotate-0'}`} />
        </motion.button>
      </div>
    </div>
  );
}
