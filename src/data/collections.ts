import { Collection } from '@/types';

export const collections: Collection[] = [
  {
    id: '1',
    slug: 'mens-collection',
    name: "Men's Collection",
    description: 'Refined essentials and statement pieces for the modern gentleman. From tailored blazers to premium knitwear.',
    image: '/images/collections/mens.jpg',
    productCount: 8
  },
  {
    id: '2',
    slug: 'womens-collection',
    name: "Women's Collection",
    description: 'Sophisticated silhouettes and luxurious fabrics for the contemporary woman. Effortless elegance for every occasion.',
    image: '/images/collections/womens.jpg',
    productCount: 7
  },
  {
    id: '3',
    slug: 'accessories-collection',
    name: 'Accessories',
    description: 'Curated accessories that elevate every outfit. Handcrafted leather goods, timepieces, and finishing touches.',
    image: '/images/collections/accessories.jpg',
    productCount: 5
  },
  {
    id: '4',
    slug: 'new-arrivals',
    name: 'New Arrivals',
    description: 'The latest additions to our collection. Discover fresh styles that define the season.',
    image: '/images/collections/new-arrivals.jpg',
    productCount: 5
  },
  {
    id: '5',
    slug: 'bestsellers',
    name: 'Bestsellers',
    description: 'Our most coveted pieces chosen by you. Timeless designs that continue to captivate.',
    image: '/images/collections/bestsellers.jpg',
    productCount: 4
  }
];
