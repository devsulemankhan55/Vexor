import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Heart, User as UserIcon, Menu, X, Search, 
  Instagram, Facebook, Twitter 
} from 'lucide-react';
import { useShopContext } from '../../context/ShopContext';
import { UserRole } from '../../types';
import { Logo } from '../ui/Logo';

export const Header: React.FC = () => {
  const { cart, wishlist, user } = useShopContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-5' : 'bg-transparent py-5'}`}>
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
            <Logo />
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
              <Logo />
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

