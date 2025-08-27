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
    </div>
  );
}
