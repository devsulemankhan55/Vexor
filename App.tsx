
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  User as UserIcon, 
  Menu, 
  X, 
  Search, 
  ChevronRight, 
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  Package,
  Home as HomeIcon,
  LayoutDashboard,
  Box,
  Users,
  Settings,
  CreditCard,
  CheckCircle2,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES, MOCK_USER, MOCK_ADMIN } from './constants';
import { Product, CartItem, User, UserRole } from './types';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import AdminDashboard from './pages/AdminDashboard';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';

// Contexts
interface AppContextType {
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

// Layout Components
const Header: React.FC = () => {
  const { cart, wishlist, user } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-1">
              <Menu size={24} />
            </button>
            <nav className="hidden lg:flex items-center gap-8 text-[13px] font-bold tracking-widest uppercase">
              {isAdmin ? (
                <>
                  <Link to="/admin" className="hover:text-rose-600 transition-colors">Dashboard</Link>
                  <Link to="/admin/products" className="hover:text-rose-600 transition-colors">Inventory</Link>
                  <Link to="/admin/orders" className="hover:text-rose-600 transition-colors">Orders</Link>
                </>
              ) : (
                <>
                  <Link to="/shop" className="hover:text-rose-600 transition-colors">Shop</Link>
                  <Link to="/shop?cat=New" className="hover:text-rose-600 transition-colors">New Arrivals</Link>
                  <Link to="/shop?cat=Festive" className="hover:text-rose-600 transition-colors">Festive</Link>
                </>
              )}
            </nav>
          </div>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-black tracking-tighter leading-none italic">VEXOR</span>
            <span className="text-[8px] font-bold tracking-[0.3em] -mt-1 uppercase text-rose-600">Premium Menswear</span>
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/search" className="hidden md:block hover:text-rose-600 transition-colors">
              <Search size={20} strokeWidth={2.5} />
            </Link>
            <Link to="/wishlist" className="relative hover:text-rose-600 transition-colors">
              <Heart size={20} strokeWidth={2.5} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative hover:text-rose-600 transition-colors">
              <ShoppingBag size={20} strokeWidth={2.5} />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
            <Link to={user ? "/profile" : "/profile"} className="hover:text-rose-600 transition-colors">
              <UserIcon size={20} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-10">
              <span className="text-2xl font-black italic">VEXOR</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-xl font-bold tracking-tight">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/shop">All Collections</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/shop?cat=Shirts">Luxury Shirts</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/shop?cat=Festive">Evening & Festive</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/shop?cat=Co-ords">Co-ord Sets</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/shop?cat=New">What's New</Link>
              <div className="h-px bg-gray-100 my-2" />
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/profile" className="text-gray-500">My Account</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/admin" className="text-rose-600">Admin Portal</Link>
            </nav>

            <div className="mt-auto pt-10 border-t border-gray-100">
              <div className="flex gap-4 mb-6">
                <Instagram size={20} />
                <Facebook size={20} />
                <Twitter size={20} />
              </div>
              <p className="text-xs text-gray-400 font-medium tracking-wide">© 2024 VEXOR MENSWEAR INDIA</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        <div className="space-y-6">
          <span className="text-3xl font-black tracking-tighter italic">VEXOR</span>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Premium menswear for the modern Indian man. Crafting confidence through timeless designs and superior materials.
          </p>
          <div className="flex gap-5">
            <Instagram className="hover:text-rose-600 transition-colors cursor-pointer" size={20} />
            <Facebook className="hover:text-rose-600 transition-colors cursor-pointer" size={20} />
            <Twitter className="hover:text-rose-600 transition-colors cursor-pointer" size={20} />
            <Youtube className="hover:text-rose-600 transition-colors cursor-pointer" size={20} />
          </div>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-rose-500">Shop</h4>
          <ul className="space-y-4 text-sm font-medium text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors"><Link to="/shop">New Arrivals</Link></li>
            <li className="hover:text-white cursor-pointer transition-colors"><Link to="/shop?cat=Shirts">Shirts</Link></li>
            <li className="hover:text-white cursor-pointer transition-colors"><Link to="/shop?cat=Festive">Festive Wear</Link></li>
            <li className="hover:text-white cursor-pointer transition-colors"><Link to="/shop?cat=Jackets">Outerwear</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-rose-500">Information</h4>
          <ul className="space-y-4 text-sm font-medium text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors">Our Story</li>
            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
            <li className="hover:text-white cursor-pointer transition-colors">Shipping & Returns</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-rose-500">Newsletter</h4>
          <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-wider">Join the VEXOR Insider list</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-rose-600 transition-colors" 
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-rose-600 font-bold uppercase text-[10px] tracking-widest">Join</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-8 mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">© 2024 VEXOR Limited. Designed in India.</p>
        <div className="flex items-center gap-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Mastercard" />
        </div>
      </div>
    </footer>
  );
};

// Global Loading Spinner
const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="text-4xl font-black italic tracking-tighter mb-4 animate-pulse">VEXOR</div>
      <div className="w-12 h-0.5 bg-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full bg-rose-600 w-1/2 animate-[loading_1.5s_infinite_ease-in-out]" />
      </div>
    </div>
    <style>{`
      @keyframes loading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
      }
    `}</style>
  </div>
);

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const { setIsLoading } = useAppContext();
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [pathname, setIsLoading]);

  return null;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <AppContext.Provider value={{
      cart, wishlist, user, addToCart, removeFromCart, updateCartQty, toggleWishlist, setUser,
      isLoading, setIsLoading
    }}>
      <HashRouter>
        <ScrollToTop />
        {isLoading && <LoadingScreen />}
        <Header />
        <main className="min-h-screen pt-[72px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
