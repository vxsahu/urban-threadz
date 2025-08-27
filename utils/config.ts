// Configuration file for the application
export const config = {
  // Site configuration
  siteUrl: 'https://next-threadz.vercel.app', // Replace with your actual domain
  
  // WhatsApp configuration
  whatsapp: {
    phoneNumber: '918502913816', // Replace with your actual WhatsApp number
    defaultMessage: 'Hi! I have a question about your products.',
  },
  
  // Store information
  store: {
    name: 'Next Threadz',
    website: 'https://next-threadz.com',
    email: 'info@next-threadz.com',
  },
  
  // Social media links
  social: {
    instagram: 'https://www.instagram.com/next__threadz__/',
    facebook: 'https://facebook.com/nextthreadz',
    twitter: 'https://twitter.com/nextthreadz',
  },
  
  // Payment methods
  paymentMethods: [
    'UPI',
    'Credit/Debit Card',
    'Net Banking',
    'Cash on Delivery',
  ],
  
  // Shipping information
  shipping: {
    freeShippingThreshold: 999, // Free shipping above ₹999
    standardDelivery: '3-5 business days',
    expressDelivery: '1-2 business days',
  },
  
  // Return policy
  returns: {
    returnWindow: '7 days',
    exchangeWindow: '15 days',
    conditions: [
      'Product must be unused and in original packaging',
      'Tags must be intact',
      'No damage or stains',
    ],
  },
};

export default config;

