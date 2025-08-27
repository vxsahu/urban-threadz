# Urban Threadz - E-commerce Website

A modern, responsive e-commerce website built with Next.js, TypeScript, and Tailwind CSS. Features a WhatsApp integration for seamless customer communication and ordering.

## Features

### 🛒 Shopping Cart System

- **Add to Cart**: Add products to cart with size selection
- **Cart Management**: Update quantities, remove items, view cart total
- **Persistent Storage**: Cart data saved in localStorage
- **Real-time Updates**: Cart count updates across all components

### 📱 WhatsApp Integration

- **Quick Order**: Order products directly via WhatsApp
- **Cart Checkout**: Send entire cart contents via WhatsApp
- **Floating Button**: Easy access to WhatsApp support on all pages
- **Smart Messages**: Pre-filled messages with product details and pricing

### 🎨 Modern UI/UX

- **Responsive Design**: Works on all devices
- **Dark/Light Theme**: Toggle between themes
- **Smooth Animations**: Framer Motion animations
- **Product Cards**: Hover effects with quick actions

## WhatsApp Features

### Product Pages

- **Order via WhatsApp**: Button on product details page
- **Size Selection**: Includes selected size in WhatsApp message
- **Quantity**: Includes selected quantity in message
- **Product Details**: Automatically includes product name, price, and URL

### Cart Integration

- **Cart Checkout**: Send entire cart contents via WhatsApp
- **Item Details**: Includes all items with sizes, quantities, and prices
- **Total Calculation**: Shows cart total in message

### Floating Support Button

- **Quick Order**: General order inquiry
- **Support**: Help with existing orders
- **Size Guide**: Size-related questions
- **Expandable Menu**: Multiple quick actions

## Configuration

### WhatsApp Settings

Update the WhatsApp phone number in `utils/config.ts`:

```typescript
export const config = {
  whatsapp: {
    phoneNumber: '918502913816', // Replace with your actual WhatsApp number
    defaultMessage: 'Hi! I have a question about your products.',
  },
  // ... other config
};
```

### Store Information

Customize store details in the same config file:

```typescript
store: {
  name: 'Urban Threadz',
  website: 'https://urban-threadz.com',
  email: 'info@urban-threadz.com',
},
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd urban-threadz
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
bun install
```

3. Update the WhatsApp phone number in `utils/config.ts`

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### For Customers

1. **Browse Products**: Navigate through product categories
2. **Add to Cart**: Click "Add to Cart" on product cards or details page
3. **Select Size**: Choose appropriate size if required
4. **View Cart**: Click cart icon in navbar to view cart
5. **Order via WhatsApp**: Use WhatsApp buttons for quick ordering

### For Store Owners

1. **Update WhatsApp Number**: Change phone number in config file
2. **Customize Messages**: Modify default messages in config
3. **Monitor Orders**: Receive orders directly on WhatsApp
4. **Manage Inventory**: Update product stock in products.json

## File Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # UI components
│   │   ├── Cards.tsx     # Product cards with WhatsApp integration
│   │   ├── WhatsAppButton.tsx # Floating WhatsApp button
│   │   └── ...
│   ├── cart.tsx          # Cart sidebar with WhatsApp checkout
│   ├── ProductDetailsClient.tsx # Product details with WhatsApp order
│   └── ...
├── utils/                # Utility functions
│   ├── cartService.ts    # Cart management and WhatsApp functions
│   ├── config.ts         # Configuration settings
│   └── ...
└── data/                 # Product data
    └── products.json     # Product information
```

## Technologies Used

- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Lucide React**: Icons
- **Sonner**: Toast notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact us via:

- Email: <info@urban-threadz.com>
- WhatsApp: Use the floating button on the website
- Instagram: [@urban__threadz__](https://www.instagram.com/urban__threadz__/)
