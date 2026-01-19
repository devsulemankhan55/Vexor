
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { useAppContext } from '../App';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useAppContext();
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [showError, setShowError] = useState(false);

  if (!product) return <div>Product not found</div>;

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }
    addToCart(product, selectedSize);
    setShowError(false);
    // Notification logic would go here
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-8">
        <Link to="/" className="hover:text-black">Home</Link>
        <ChevronRight size={10} />
        <Link to="/shop" className="hover:text-black">Shop</Link>
        <ChevronRight size={10} />
        <span className="text-black">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Image Gallery */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.images.map((img, idx) => (
            <div key={idx} className="bg-gray-50 overflow-hidden cursor-zoom-in">
              <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
          {/* Mock additional images */}
          <div className="bg-gray-50 overflow-hidden cursor-zoom-in">
             <img src="https://picsum.photos/id/105/600/800" alt="Detail 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="bg-gray-50 overflow-hidden cursor-zoom-in">
             <img src="https://picsum.photos/id/106/600/800" alt="Detail 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

        {/* Info Section */}
        <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-24 h-fit">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-rose-600 bg-rose-50 px-2 py-1">Best Seller</span>
              <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                <Star size={12} className="fill-rose-500 text-rose-500" />
                <span>{product.rating}</span>
                <span className="text-gray-300">|</span>
                <span>{product.reviews} Reviews</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">{product.name}</h1>
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-black">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through font-bold">₹{product.originalPrice.toLocaleString()}</span>
              )}
              {product.originalPrice && (
                <span className="text-rose-600 text-sm font-black uppercase tracking-widest">({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)</span>
              )}
            </div>
            <p className="text-gray-500 leading-relaxed font-medium">Inclusive of all taxes</p>
          </div>

          {/* Size Selector */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black tracking-widest uppercase">Select Size</h3>
              <button className="text-xs font-black tracking-widest uppercase text-rose-600 border-b-2 border-rose-600 pb-0.5">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setShowError(false);
                  }}
                  className={`w-14 h-14 flex items-center justify-center font-black transition-all border-2 ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-100 hover:border-gray-300'}`}
                >
                  {size}
                </button>
              ))}
            </div>
            {showError && (
              <p className="text-rose-600 text-[10px] font-bold uppercase tracking-widest animate-pulse">Please select a size to proceed</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-black text-white py-5 font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-rose-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed group"
            >
              <ShoppingBag size={20} className="group-hover:animate-bounce" />
              {product.stock === 0 ? 'Sold Out' : 'Add to Bag'}
            </button>
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={`p-5 border-2 transition-colors ${isWishlisted ? 'bg-rose-50 border-rose-600 text-rose-600' : 'bg-white border-gray-100 hover:border-gray-300'}`}
            >
              <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-3 gap-4 pt-10 border-t border-gray-100">
            <div className="flex flex-col items-center text-center gap-3">
              <Truck size={24} strokeWidth={1.5} />
              <span className="text-[9px] font-bold tracking-widest uppercase leading-tight">Free Express <br /> Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <RotateCcw size={24} strokeWidth={1.5} />
              <span className="text-[9px] font-bold tracking-widest uppercase leading-tight">7 Day Easy <br /> Returns</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <ShieldCheck size={24} strokeWidth={1.5} />
              <span className="text-[9px] font-bold tracking-widest uppercase leading-tight">Secure <br /> Checkout</span>
            </div>
          </div>

          {/* Description Tabs */}
          <div className="space-y-6 pt-10 border-t border-gray-100">
            <div>
              <h3 className="text-xs font-black tracking-widest uppercase mb-4">Product Story</h3>
              <p className="text-sm text-gray-500 leading-loose font-medium">{product.description}</p>
            </div>
            <div>
              <h3 className="text-xs font-black tracking-widest uppercase mb-4">Material & Care</h3>
              <ul className="text-sm text-gray-500 space-y-2 font-medium list-disc pl-4">
                <li>100% Premium Material</li>
                <li>Machine wash cold, inside out</li>
                <li>Tumble dry low or hang dry</li>
                <li>Iron on low heat if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <section className="mt-24 pt-24 border-t border-gray-100">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-12">Complete the Look</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_PRODUCTS.slice(0, 4).map(p => (
            <Link key={p.id} to={`/product/${p.id}`} className="group space-y-4">
              <div className="aspect-[3/4] overflow-hidden bg-gray-50">
                <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.name} />
              </div>
              <div className="flex flex-col gap-1">
                 <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400">{p.category}</h4>
                 <p className="text-sm font-bold uppercase italic line-clamp-1">{p.name}</p>
                 <span className="text-sm font-black">₹{p.price.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
