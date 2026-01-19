
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Star } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { useShopContext } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const { toggleWishlist, wishlist } = useShopContext();

  const results = query.length > 2 
    ? MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="relative">
          <input 
            autoFocus
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search our collections..." 
            className="w-full bg-transparent border-b-4 border-black pb-4 text-4xl md:text-6xl font-black italic tracking-tighter uppercase focus:outline-none focus:border-rose-600 transition-colors placeholder:text-gray-100"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
              <X size={32} />
            </button>
          )}
        </div>

        {query.length > 0 && query.length < 3 && (
          <p className="text-xs font-black tracking-widest uppercase text-gray-400">Keep typing to find what you're looking for...</p>
        )}

        {query.length >= 3 && (
          <div className="space-y-10">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-xs font-black tracking-widest uppercase text-gray-400">{results.length} results for "{query}"</h3>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {results.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-full mx-auto">
                  <Search size={32} className="text-gray-200" />
                </div>
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">No matches found.</h3>
                <p className="text-gray-400 font-medium max-w-xs mx-auto">We couldn't find anything for that search. Try something else like "Shirts" or "Co-ords".</p>
              </div>
            )}
          </div>
        )}

        {!query && (
          <div className="space-y-8 animate-fade-in">
            <h3 className="text-xs font-black tracking-widest uppercase text-gray-400">Popular Categories</h3>
            <div className="flex flex-wrap gap-4">
              {['Shirts', 'Co-ords', 'Festive', 'New Arrivals'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setQuery(cat)}
                  className="px-8 py-3 border border-gray-100 font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white hover:border-black transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="pt-10">
               <h3 className="text-xs font-black tracking-widest uppercase text-gray-400 mb-6">Trending Now</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {MOCK_PRODUCTS.slice(0, 4).map(p => (
                   <Link key={p.id} to={`/product/${p.id}`} className="flex items-center gap-4 group">
                     <div className="w-16 h-16 bg-gray-50 flex-shrink-0">
                       <img src={p.images[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-tight line-clamp-2 italic">{p.name}</span>
                   </Link>
                 ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
