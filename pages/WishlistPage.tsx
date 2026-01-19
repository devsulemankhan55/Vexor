
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { useAppContext } from '../App';

const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist } = useAppContext();
  const wishlistedItems = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id));

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center gap-8">
        <div className="w-32 h-32 bg-gray-50 flex items-center justify-center rounded-full">
          <Heart size={48} className="text-gray-200" />
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl font-black italic tracking-tighter uppercase">Your wishlist is empty.</h2>
          <p className="text-gray-500 font-medium max-w-sm mx-auto">Keep track of the pieces you love and never miss out on your size again.</p>
        </div>
        <Link to="/shop" className="bg-black text-white px-12 py-5 font-black text-sm tracking-widest uppercase hover:bg-rose-600 transition-colors transform hover:-translate-y-1">
          Explore Studio
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <div className="flex items-center gap-4 mb-12">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Wishlist</h1>
        <span className="bg-rose-100 text-rose-600 px-4 py-2 text-xl font-black italic rounded-full leading-none">
          {wishlist.length}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlistedItems.map(product => (
          <div key={product.id} className="group relative bg-white animate-fade-in">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <Link to={`/product/${product.id}`}>
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </Link>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md text-rose-600 rounded-full hover:bg-white transition-all shadow-sm"
              >
                <Trash2 size={16} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-sm">
                <Link to={`/product/${product.id}`} className="block w-full text-center bg-black text-white py-2.5 text-[11px] font-bold tracking-widest uppercase hover:bg-rose-600 transition-colors">
                  Add to Bag
                </Link>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-1 px-1">
              <h3 className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400">{product.category}</h3>
              <Link to={`/product/${product.id}`} className="text-sm font-bold tracking-tight uppercase italic hover:text-rose-600 transition-colors line-clamp-1">{product.name}</Link>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-black">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                   <span className="text-[10px] text-rose-600 font-bold uppercase tracking-widest">({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
