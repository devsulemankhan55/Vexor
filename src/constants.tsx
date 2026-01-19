import { Product, UserRole, User } from './types';

// Expanded Image Pool
const IMAGES = {
  // Original
  hero: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/shoip_your_size.jpg?v=1767777997',
  shirt1: 'https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/53ece380-0abd-475a-a657-3ac6e6516612/1767676432.jpeg',
  festive: 'https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/aaef3c11-531f-4996-bfdc-779c33ff0cec/1767699195.jpeg',
  coord: 'https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/4c91b6ae-4117-4aac-a97b-78ef219325ee/1767676323.jpeg',
  jacket1: 'https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/59d59218-a414-4995-94c8-4aa61aae9ae0/1767676344.jpeg',
  
  // Batch 2 (New)
  img01: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mst3287-01_1.jpg?v=1768324504&quality=80',
  img02: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_76dc6c40-75a1-419e-bf66-9b0540d03988.jpg?v=1768410950&quality=80',
  img03: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_da5cf681-536f-44d8-a3cf-38691ee2a71f.jpg?v=1768410952&quality=80',
  img04: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss4682-01_1.jpg?v=1768324447&quality=80',
  img05: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_0bfb838e-54ac-4169-bf8a-e90506af6998.jpg?v=1768410971&quality=80',
  img06: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_b0f4ad47-ce45-4c07-95e8-4688691affb6.jpg?v=1768410973&quality=80',
  img07: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_c965cefd-af58-45c8-81c7-430bff36c905.jpg?v=1768756674&quality=80',
  img08: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_873531ae-0ba1-4fbf-b864-151991929b59.jpg?v=1768756689&quality=80',
  img09: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_3035bdb1-3376-4247-8760-bc497e750e43.jpg?v=1768756638&quality=80',
  img10: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_d48ca4e2-d9fa-41be-a4d4-f010924494fd.jpg?v=1768756681&quality=80',
  img11: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_c7e5668a-5cd1-40c8-9f5b-0e14648417d7.jpg?v=1768756702&quality=80',
  img12: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_6366bc90-320a-480d-a17e-3feab2bfd154.jpg?v=1768756648&quality=80',
  img13: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_404917bf-edf3-4f2b-bb46-06387bdf26b8.jpg?v=1768756649&quality=80',
  img14: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_be5ffc17-3bfd-4a4a-a02a-77cb7e5119a8.jpg?v=1767031286&quality=80',
  img15: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_9c358865-2e43-4693-b529-fa20149b03ef.jpg?v=1767117433&quality=80',
  img16: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_e1b63284-7b27-4a6a-a24a-8f6bfb8dfb9a.jpg?v=1767117439&quality=80',
  img17: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4msk8770-04_1.jpg?v=1767634627&quality=80',
  img18: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_ed8a21a7-e79d-472c-b063-f130f398b851.jpg?v=1767031279&quality=80',
  img19: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_21c88804-6f20-431b-baff-da0527fa9354.jpg?v=1767031284&quality=80',
  img20: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_f54764a2-e9dd-45e2-8a14-2935c1dd3ae3.jpg?v=1767117447&quality=80',
  img21: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4msr5516-01_1.jpg?v=1767808048&quality=80',
  img22: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4msw9135-01_1.jpg?v=1768324479&quality=80',
  img23: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss4546-06_1.jpg?v=1766331919&quality=80',
  img24: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_963dce65-161a-42e7-a6ce-104d23300964.jpg?v=1767031292&quality=80',
  img25: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4sfs023-11_1.jpg?v=1767893725&quality=80',
  img26: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4sfs023-04_1.jpg?v=1766508954&quality=80',
};

export const MOCK_PRODUCTS: Product[] = [
  // --- Original Best Sellers ---
  {
    id: '1',
    name: 'ONYX SILK SHIRT',
    price: 3499,
    originalPrice: 4999,
    category: 'Shirts',
    images: [IMAGES.shirt1, IMAGES.img24],
    description: 'Elevate your evening look with our Onyx Black Silk Shirt. Crafted from premium 100% mulberry silk for a luxurious sheen.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 12,
    isNew: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'MIDNIGHT CO-ORD SET',
    price: 5999,
    category: 'Co-ords',
    images: [IMAGES.coord, IMAGES.img14],
    description: 'The ultimate urban uniform. This navy co-ord set features a structured overshirt and matching tailored trousers.',
    sizes: ['M', 'L', 'XL'],
    stock: 5,
    isNew: false,
    rating: 4.5,
    reviews: 89
  },
  {
    id: '3',
    name: 'ROYAL HERITAGE KURTA',
    price: 3999,
    category: 'Festive',
    images: [IMAGES.festive, IMAGES.img19],
    description: 'Celebrate in style. Rich textured fabric with delicate hand-embroidery on the collar.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 22,
    isNew: true,
    rating: 4.6,
    reviews: 67
  },

  // --- New Arrivals (Batch 2) ---
  {
    id: '101',
    name: 'GRAPHITE STREET SHIRT',
    price: 2499,
    category: 'Shirts',
    images: [IMAGES.img01, IMAGES.img02],
    description: 'A relaxed fit shirt featuring our signature street print. Perfect for layering over a basic tee.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 30,
    isNew: true,
    rating: 4.3,
    reviews: 15
  },
  {
    id: '102',
    name: 'URBAN UTILITY VEST',
    price: 3299,
    category: 'Jackets',
    images: [IMAGES.img03, IMAGES.img04],
    description: 'Functional design meets modern aesthetics. Multi-pocket vest constructed from durable tech fabric.',
    sizes: ['M', 'L'],
    stock: 10,
    rating: 4.7,
    reviews: 8
  },
  {
    id: '103',
    name: 'SLATE GREY OVERSHIRT',
    price: 2899,
    category: 'Shirts',
    images: [IMAGES.img05, IMAGES.img06],
    description: 'The perfect transitional piece. Heavyweight cotton blend with a boxy, contemporary silhouette.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    rating: 4.4,
    reviews: 42
  },
  {
    id: '105',
    name: 'PREMIUM LINEN SHIRT',
    price: 4499,
    category: 'Shirts',
    images: [IMAGES.img07, IMAGES.img08], // Reusing images for now or I should create new ones? The plan said reuse.
    description: 'Experience the breathability of 100% organic linen. A summer essential.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 15,
    isNew: true,
    rating: 4.9,
    reviews: 5
  },
  {
    id: '106',
    name: 'STANDARD COTTON TEE',
    price: 899,
    category: 'Half Sleeves',
    images: [IMAGES.img09, IMAGES.img10],
    description: 'Your everyday hero. Soft, durable, and perfect for any occasion.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 200,
    isNew: true,
    rating: 4.1,
    reviews: 30
  },
// Re-mapped T-Shirts & New Night Pants
  {
    id: '104',
    name: 'NOIR DROP SHOULDER',
    price: 1299,
    category: 'Drop Shoulder',
    images: [IMAGES.img07, IMAGES.img08],
    description: 'Premium heavyweight cotton with a structured fit and dropped shoulders.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 100,
    isSale: true,
    rating: 4.9,
    reviews: 156
  },
  {
    id: '107',
    name: 'SANDSTONE HALF SLEEVE',
    price: 1899,
    category: 'Half Sleeves',
    images: [IMAGES.img13, IMAGES.img14],
    description: 'Refined casual. A knitted polo in an earthy sandstone hue.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 40,
    rating: 4.2,
    reviews: 19
  },
  {
    id: '201',
    name: 'PERFORMANCE GYM TEE',
    price: 999,
    category: 'Gym T-Shirt',
    images: [IMAGES.img22, IMAGES.img23], // Re-using distinct images
    description: 'Moisture-wicking fabric designed for high-intensity training.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
    rating: 4.6,
    reviews: 12
  },
  {
    id: '202',
    name: 'ESSENTIAL SANDO',
    price: 799,
    category: 'Sandos',
    images: [IMAGES.img03, IMAGES.img04], // Using vest-like images
    description: 'Maximum mobility. The essential urban vest.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 60,
    rating: 4.3,
    reviews: 8
  },
  {
    id: '203',
    name: 'MIDNIGHT LOUNGE PANTS',
    price: 1499,
    category: 'Night Paint', // User's requested spelling "Night Paint" (assuming Pants)
    images: [IMAGES.img17, IMAGES.img18], // Using cargo/pant images
    description: 'Ultra-soft cotton blend for supreme comfort at home.',
    sizes: ['M', 'L', 'XL'],
    stock: 35,
    rating: 4.8,
    reviews: 45
  },
];

// Product Categories & Hierarchy
export const CATEGORY_HIERARCHY = {
  'T-Shirts': ['Drop Shoulder', 'Half Sleeves', 'Gym T-Shirt', 'Sandos'],
  'Night Pant': [] // No sub-categories yet
};

// Displayed in helper filters or main navigation
export const CATEGORIES = ['All', 'T-Shirts', 'Night Pant'];

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
