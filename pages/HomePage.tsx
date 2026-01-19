
import React from 'react';
import { Link } from 'react-router-dom';
// Added missing icons CheckCircle2 and Package to the imports
import { ArrowRight, Star, ChevronRight, Zap, CheckCircle2, Package } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { useAppContext } from '../App';

const ProductCard: React.FC<{ product: typeof MOCK_PRODUCTS[0] }> = ({ product }) => {
  const { toggleWishlist, wishlist } = useAppContext();
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
          onClick={() => toggleWishlist(product.id)}
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

const HomePage: React.FC = () => {
  const newArrivals = MOCK_PRODUCTS.filter(p => p.isNew).slice(0, 4);
  const trending = MOCK_PRODUCTS.slice(4, 8);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <img 
          src="https://picsum.photos/id/445/1920/1080" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
          <div className="container mx-auto px-4 md:px-12 text-white">
            <div className="max-w-3xl space-y-8">
              <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-0.5 bg-rose-600"></div>
                <span className="text-xs font-bold tracking-[0.4em] uppercase">Autumn / Winter '24</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.9] animate-fade-in" style={{ animationDelay: '0.2s' }}>
                URBAN <br /> <span className="text-rose-600">EVOLUTION.</span>
              </h1>
              <p className="text-lg md:text-xl font-medium text-gray-300 max-w-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
                Experience the next generation of premium streetwear. Minimalist silhouettes meeting extreme craftsmanship.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Link to="/shop" className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-5 font-black text-sm tracking-widest uppercase transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-rose-600/20">
                  Shop Collection
                </Link>
                <Link to="/shop?cat=New" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-5 font-black text-sm tracking-widest uppercase border border-white/20 transition-all transform hover:-translate-y-1 active:scale-95">
                  New Arrivals
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end text-white/50 text-[10px] font-bold tracking-[0.3em] uppercase space-y-2">
          <span>Coordinates: 28.6139° N, 77.2090° E</span>
          <span>Crafted in New Delhi</span>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/shop?cat=Shirts" className="group relative h-[600px] overflow-hidden bg-black">
            <img src="https://picsum.photos/id/101/600/800" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Shirts" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <h3 className="text-3xl font-black text-white italic mb-2">SIGNATURE SHIRTS</h3>
              <p className="text-white/70 font-medium mb-6">Italian fabrics, Indian craftsmanship.</p>
              <span className="w-fit bg-white text-black px-6 py-3 text-[10px] font-bold tracking-widest uppercase group-hover:bg-rose-600 group-hover:text-white transition-colors">Explore Now</span>
            </div>
          </Link>
          <div className="grid grid-rows-2 gap-6">
            <Link to="/shop?cat=Festive" className="group relative overflow-hidden bg-black">
              <img src="https://picsum.photos/id/102/600/400" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Festive" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-black text-white italic">FESTIVE EDIT</h3>
                <span className="text-[10px] text-white/60 font-bold tracking-widest uppercase mt-2 group-hover:text-rose-400">View Lookbook</span>
              </div>
            </Link>
            <Link to="/shop?cat=Co-ords" className="group relative overflow-hidden bg-black">
              <img src="https://picsum.photos/id/103/600/400" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Co-ords" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-black text-white italic">CO-ORD SETS</h3>
                <span className="text-[10px] text-white/60 font-bold tracking-widest uppercase mt-2 group-hover:text-rose-400">View All</span>
              </div>
            </Link>
          </div>
          <Link to="/shop?cat=Jackets" className="group relative h-[600px] overflow-hidden bg-black">
            <img src="https://picsum.photos/id/104/600/800" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Jackets" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <h3 className="text-3xl font-black text-white italic mb-2">OUTERWEAR</h3>
              <p className="text-white/70 font-medium mb-6">Ready for the cold.</p>
              <span className="w-fit bg-white text-black px-6 py-3 text-[10px] font-bold tracking-widest uppercase group-hover:bg-rose-600 group-hover:text-white transition-colors">Explore Now</span>
            </div>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} className="text-rose-600 fill-current" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">Just Landed</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic">THE NEW SEASON.</h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase pb-2 border-b-2 border-transparent hover:border-rose-600 transition-all">
            Browse All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Mid-Banner */}
      <section className="bg-rose-600 text-white py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
          <div className="text-[300px] font-black italic tracking-tighter leading-none select-none">VEXOR</div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none mb-8">
            MADE TO <br /> BE SEEN.
          </h2>
          <p className="max-w-2xl mx-auto text-rose-100 text-lg md:text-xl font-medium mb-12">
            "VEXOR is not just clothing. It's an attitude. A commitment to being bold in a world that tries to make you blend in."
          </p>
          <Link to="/shop" className="inline-block bg-black text-white px-12 py-5 font-black text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all transform hover:scale-105 active:scale-95">
            Join the Movement
          </Link>
        </div>
      </section>

      {/* Why Vexor */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 py-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-full mb-4">
            <ChevronRight className="text-rose-600" size={32} />
          </div>
          <h4 className="text-lg font-black tracking-tighter italic">PREMIUM FABRICS</h4>
          <p className="text-sm text-gray-500 font-medium">Sourced from the finest mills globally to ensure lasting quality and drape.</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-full mb-4">
            <CheckCircle2 className="text-rose-600" size={32} />
          </div>
          <h4 className="text-lg font-black tracking-tighter italic">SHARP TAILORING</h4>
          <p className="text-sm text-gray-500 font-medium">Precision cuts designed specifically for the Indian physique.</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-full mb-4">
            <Package className="text-rose-600" size={32} />
          </div>
          <h4 className="text-lg font-black tracking-tighter italic">EXPRESS DELIVERY</h4>
          <p className="text-sm text-gray-500 font-medium">Next-day shipping to over 20+ major cities across India.</p>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {trending.slice(0, 2).map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="group block relative overflow-hidden bg-gray-50">
              <img src={product.images[0]} className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-1000" alt={product.name} />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-rose-500">Must Have</span>
                <h3 className="text-3xl font-black italic tracking-tighter mt-2">{product.name}</h3>
                <span className="inline-block mt-4 text-xs font-bold tracking-widest uppercase border-b-2 border-rose-600 pb-1">Shop Now</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
