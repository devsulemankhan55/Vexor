import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../../types';
import { useShopContext } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, wishlist } = useShopContext();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative bg-white animate-fade-in">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          {product.images[1] && (
            <img 
              src={product.images[1]} 
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" 
            />
          )}
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-black text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase">New</span>
          )}
          {product.isSale && (
            <span className="bg-rose-600 text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase">Sale</span>
          )}
        </div>

        {/* Quick Actions */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${isWishlisted ? 'bg-rose-600 text-white' : 'bg-white/80 backdrop-blur-md text-black hover:bg-white'}`}
        >
          <Star size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-sm">
           <Link to={`/product/${product.id}`} className="block w-full text-center bg-black text-white py-2.5 text-[11px] font-bold tracking-widest uppercase hover:bg-rose-600 transition-colors">
            Quick View
           </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1 px-1">
        <h3 className="text-xs font-bold tracking-wide uppercase text-gray-500">{product.category}</h3>
        <Link to={`/product/${product.id}`} className="text-sm font-semibold hover:text-rose-600 transition-colors line-clamp-1">{product.name}</Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-bold">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through font-medium">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};
