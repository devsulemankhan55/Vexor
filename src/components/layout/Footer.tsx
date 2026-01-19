import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  /* Removed secret click handler */


  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        <div className="space-y-6">
          <div className="inline-block select-none">
             <Logo variant="light" />
          </div>
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
            <li className="hover:text-white cursor-pointer transition-colors"><Link to="/admin/login">Admin Login</Link></li>
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
