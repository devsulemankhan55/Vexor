
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
// Added missing icon Search to the imports
import { SlidersHorizontal, ChevronDown, Grid, List, Star, Search } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { useAppContext } from '../App';

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleWishlist, wishlist } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'All');
  const [sortBy, setSortBy] = useState('Newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'New') return p.isNew;
    return p.category === selectedCategory;
  }).sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    return 0; // Newest by default (id)
  });

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSearchParams(cat === 'All' ? {} : { cat });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 min-h-screen">
      {/* Header & Breadcrumb */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-6">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="text-black">Collections</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-4">
          {selectedCategory === 'All' ? 'THE STUDIO' : selectedCategory}
        </h1>
        <p className="text-gray-500 font-medium max-w-2xl">{filteredProducts.length} premium pieces curated for the perfectionist.</p>
      </div>

      {/* Filters & Toolbar */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md py-4 border-y border-gray-100 flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-[11px] font-black tracking-[0.2em] uppercase whitespace-nowrap transition-colors ${selectedCategory === cat ? 'text-rose-600' : 'text-gray-400 hover:text-black'}`}
            >
              {cat}
            </button>
          ))}
          <button
              onClick={() => handleCategoryChange('New')}
              className={`text-[11px] font-black tracking-[0.2em] uppercase whitespace-nowrap transition-colors ${selectedCategory === 'New' ? 'text-rose-600' : 'text-gray-400 hover:text-black'}`}
            >
              New Arrivals
          </button>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="relative group">
            <button className="flex items-center gap-2 text-[11px] font-black tracking-widest uppercase border border-gray-100 px-4 py-2 hover:bg-gray-50">
              Sort: {sortBy} <ChevronDown size={14} />
            </button>
            <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40">
              {['Newest', 'Price: Low to High', 'Price: High to Low'].map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className="w-full text-left px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-gray-50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-2 border border-gray-100 hover:bg-gray-50 lg:hidden"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
        {filteredProducts.map(product => {
          const isWishlisted = wishlist.includes(product.id);
          return (
            <div key={product.id} className="group relative bg-white animate-fade-in">
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
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-black text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase">New</span>
                  )}
                  {product.isSale && (
                    <span className="bg-rose-600 text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase">Sale</span>
                  )}
                  {product.stock === 0 && (
                    <span className="bg-gray-400 text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase">Sold Out</span>
                  )}
                </div>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${isWishlisted ? 'bg-rose-600 text-white' : 'bg-white/80 backdrop-blur-md text-black hover:bg-white'}`}
                >
                  <Star size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-sm">
                   <Link to={`/product/${product.id}`} className="block w-full text-center bg-black text-white py-2.5 text-[11px] font-bold tracking-widest uppercase hover:bg-rose-600 transition-colors">
                    View Details
                   </Link>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-1 px-1">
                <h3 className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400">{product.category}</h3>
                <Link to={`/product/${product.id}`} className="text-sm font-bold tracking-tight hover:text-rose-600 transition-colors line-clamp-1 uppercase italic">{product.name}</Link>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-black">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through font-bold opacity-50">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center flex flex-col items-center gap-6">
          <div className="w-24 h-24 bg-gray-50 flex items-center justify-center rounded-full">
            <Search size={40} className="text-gray-200" />
          </div>
          <h2 className="text-2xl font-black italic tracking-tighter">NO PIECES FOUND.</h2>
          <p className="text-gray-400 max-w-xs mx-auto">Try adjusting your filters or browsing another category.</p>
          <button 
            onClick={() => handleCategoryChange('All')}
            className="bg-black text-white px-8 py-3 font-bold text-[11px] tracking-widest uppercase hover:bg-rose-600 transition-colors"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
