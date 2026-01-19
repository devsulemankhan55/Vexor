import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, UserRole } from '../types';
import { MOCK_USER, MOCK_PRODUCTS } from '../constants';

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQty: (productId: string, size: string, delta: number) => void;
  toggleWishlist: (productId: string) => void;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  login: (email: string) => void;
  logout: () => void;
  clearCart: () => void;
  // Admin functions
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShopContext must be used within ShopProvider');
  return context;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
  };

  const updateCartQty = (productId: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const clearCart = () => setCart([]);

  const login = (email: string) => {
    // Mock login logic
    if (email === 'admin@vexor.in') {
      setUser({
        id: 'admin',
        name: 'Vexor Admin',
        email: 'admin@vexor.in',
        role: UserRole.ADMIN,
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=000&color=fff'
      });
    } else {
      setUser({
        id: 'customer',
        name: 'Valued Customer',
        email,
        role: UserRole.CUSTOMER,
        avatar: `https://ui-avatars.com/api/?name=${email.substring(0, 2)}&background=random`
      });
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };


  return (
    <ShopContext.Provider value={{
      cart, wishlist, user, addToCart, removeFromCart, updateCartQty, toggleWishlist, setUser,
      isLoading, setIsLoading, login, logout, clearCart,
      products, addProduct, updateProduct, deleteProduct
    }}>
      {children}
    </ShopContext.Provider>
  );
};
