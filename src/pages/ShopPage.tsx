
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
// Added missing icon Search to the imports
import { SlidersHorizontal, ChevronDown, Grid, List, Star, Search } from 'lucide-react';
import { CATEGORIES, CATEGORY_HIERARCHY } from '../constants';
import { useShopContext } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleWishlist, wishlist, products } = useShopContext();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'All');
  const [sortBy, setSortBy] = useState('Newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'New') return p.isNew;
    
    // Check if selectedCategory is a parent category (e.g. T-Shirts)
    // @ts-ignore
    const subCategories = CATEGORY_HIERARCHY[selectedCategory];
    if (subCategories && subCategories.length > 0) {
      return subCategories.includes(p.category);
    }

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
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
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
