# AUREL Product Management Guide

Welcome to the product management documentation for the AUREL Next.js E-Commerce platform. 

Currently, your products are managed directly within the application's source code as a static data array. This document will guide you through the process of adding new products, editing existing products, and removing products.

## Location of Product Data

All product data is stored in a single unified file:
**Path:** `src/data/products.ts`

## Product Data Structure

Products are written in TypeScript and must conform to the `Product` interface defined in `src/types/index.ts`. Below is the required structure for a single product object:

```typescript
{
  id: 'unique-id-string',                 // Must be unique (e.g., '1', '105')
  slug: 'url-friendly-dash-separated',    // Used for URLs: /product/tailored-blazer
  name: 'Product Name',                   // Display name of the product
  price: 24000,                           // Current selling price (in LKR)
  originalPrice: 32000,                   // Optional: Original price (for showing discounts)
  description: 'A detailed description...',// Displayed on the product detail page
  details: [                              // Array of bullet point details
    '100% Cotton',
    'Hand wash cold'
  ],
  materials: 'Detailed material info...', // Expanded materials section text
  care: [                                 // Array of care instructions
    'Do not bleach',
    'Dry flat'
  ],
  category: 'men',                        // Must be: 'men', 'women', or 'accessories'
  subcategory: 'Outerwear',               // Text label (e.g., 'Outerwear', 'Jewelry')
  sizes: [                                // Array of available sizes
    { label: 'S', available: true },
    { label: 'M', available: false },     // Setting available to false will gray it out
    { label: 'L', available: true }
  ],
  colors: [                               // Array of available colors (used for swatch indicators)
    { name: 'Navy', hex: '#1B263B' },
    { name: 'Charcoal', hex: '#36454F' }
  ],
  reviews: 142,                           // Number of reviews
  rating: 4.8,                            // Star rating (1 to 5)
  badge: 'new'                            // Optional: 'new', 'sale', 'bestseller'
}
```

## How to Add a New Product

1. Open `src/data/products.ts` in your code editor.
2. Locate the `export const products: Product[] = [` array declaration near the top of the file.
3. Scroll to the end of the array, right before the closing `];` bracket.
4. Copy the JSON-like structure above and paste it.
5. Fill out all the fields with your new product's specific details. Ensure you:
   - Provide a highly unique `id`.
   - Provide an exact `slug` matching your product name using lowercase letters and hyphens (e.g., `linen-summer-shirt`). No spaces allowed.
   - Choose an exact category string: `'men'`, `'women'`, or `'accessories'`.

## How to Edit an Existing Product

1. Open `src/data/products.ts`.
2. Use the "Find" feature in your code editor (`Ctrl + F` or `Cmd + F`) to search for the product's `name` or `id`.
3. Modify the attribute you want to change:
   - **Changing Prices:** Locate the `price` property and update the integer. Add/modify `originalPrice` if you wish to apply artificial discounts.
   - **Managing Inventory:** Find the `sizes` array and toggle `available: true` or `available: false` based on stock.
   - **Adding Promotions (Badges):** You can add or modify the `badge` property to either `'new'`, `'sale'`, or `'bestseller'`. Setting it triggers the visual UI tags.

## Image Placeholders

Currently, the web platform dynamically generates geometric color-block placeholders for product images using the product's first `colors` hex value and its initials. 
*When you choose to integrate real images in the future, you will replace these static colored `div` blocks with HTML `<img>` or Next.js `<Image>` tags pointing to your image hosting URLs.*

## Applying the Changes

Whenever you modify and save `src/data/products.ts`:
- If the development server (`npm run dev`) is running, the site will **hot-reload** and update automatically within milliseconds.
- If you are deploying to production, execute a new standard build (`npm run build`) to reflect the newly updated product array.
