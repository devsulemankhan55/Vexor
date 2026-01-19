
import { Product, UserRole, User } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Onyx Black Silk Shirt',
    price: 3499,
    originalPrice: 4999,
    category: 'Shirts',
    images: ['https://picsum.photos/id/237/600/800', 'https://picsum.photos/id/238/600/800'],
    description: 'Elevate your evening look with our Onyx Black Silk Shirt. Crafted from premium 100% mulberry silk for a luxurious sheen and unparalleled comfort.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 12,
    isNew: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Midnight Navy Co-ord Set',
    price: 5999,
    category: 'Co-ords',
    images: ['https://picsum.photos/id/1/600/800', 'https://picsum.photos/id/2/600/800'],
    description: 'The ultimate urban uniform. This navy co-ord set features a structured overshirt and matching tailored trousers.',
    sizes: ['M', 'L', 'XL'],
    stock: 5,
    isNew: false,
    rating: 4.5,
    reviews: 89
  },
  {
    id: '3',
    name: 'Crimson Edge Tech Tee',
    price: 1499,
    originalPrice: 1999,
    category: 'T-shirts',
    images: ['https://picsum.photos/id/3/600/800', 'https://picsum.photos/id/4/600/800'],
    description: 'Performance meets style. Minimalist branding with sharp red accent stitching at the sleeves.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 45,
    isSale: true,
    rating: 4.9,
    reviews: 210
  },
  {
    id: '4',
    name: 'Urban Cargo Trousers',
    price: 2999,
    category: 'Trousers',
    images: ['https://picsum.photos/id/5/600/800', 'https://picsum.photos/id/6/600/800'],
    description: 'Functional yet fashionable. Multi-pocket cargo pants with a tapered fit and water-resistant finish.',
    sizes: ['30', '32', '34', '36'],
    stock: 18,
    rating: 4.2,
    reviews: 56
  },
  {
    id: '5',
    name: 'Shadow Grey Bomber Jacket',
    price: 4499,
    category: 'Jackets',
    images: ['https://picsum.photos/id/7/600/800', 'https://picsum.photos/id/8/600/800'],
    description: 'A contemporary take on a classic. Padded for warmth with a matte finish and premium hardware.',
    sizes: ['M', 'L', 'XL'],
    stock: 0,
    rating: 4.7,
    reviews: 142
  },
  {
    id: '6',
    name: 'Royal Heritage Kurta',
    price: 3999,
    category: 'Festive',
    images: ['https://picsum.photos/id/9/600/800', 'https://picsum.photos/id/10/600/800'],
    description: 'Celebrate in style. Rich textured fabric with delicate hand-embroidery on the collar.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 22,
    isNew: true,
    rating: 4.6,
    reviews: 67
  },
  {
    id: '7',
    name: 'Ivory Linen Summer Shirt',
    price: 2299,
    category: 'Shirts',
    images: ['https://picsum.photos/id/11/600/800', 'https://picsum.photos/id/12/600/800'],
    description: 'Breathable European linen. Perfect for destination weddings or tropical escapes.',
    sizes: ['M', 'L', 'XL'],
    stock: 30,
    rating: 4.4,
    reviews: 34
  },
  {
    id: '8',
    name: 'Obsidian Moto Jacket',
    price: 8999,
    category: 'Jackets',
    images: ['https://picsum.photos/id/13/600/800', 'https://picsum.photos/id/14/600/800'],
    description: 'The statement piece. Handcrafted leather with quilted details and reinforced stitching.',
    sizes: ['M', 'L', 'XL'],
    stock: 3,
    isNew: true,
    rating: 5.0,
    reviews: 12
  }
];

export const CATEGORIES = ['All', 'Shirts', 'T-shirts', 'Trousers', 'Jackets', 'Co-ords', 'Festive'];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Arjun Mehra',
  email: 'arjun.mehra@example.com',
  role: UserRole.CUSTOMER,
  avatar: 'https://i.pravatar.cc/150?u=arjun'
};

export const MOCK_ADMIN: User = {
  id: 'a1',
  name: 'Admin Vexor',
  email: 'admin@vexor.in',
  role: UserRole.ADMIN,
  avatar: 'https://i.pravatar.cc/150?u=admin'
};
