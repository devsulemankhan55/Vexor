import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Zap, CheckCircle2, Package } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { useShopContext } from '../context/ShopContext';

import bannerImg from '../assets/banner.png';

const HomePage: React.FC = () => {
  const { products } = useShopContext();
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const trending = products.slice(4, 8);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img 
            src={bannerImg} 
            alt="Hero" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-4 h-auto md:h-[800px]">
          {/* Main Large Item - Shirts */}
          <Link to="/shop?cat=Shirts" className="md:col-span-2 md:row-span-2 group relative overflow-hidden bg-black">
            <img src="https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/53ece380-0abd-475a-a657-3ac6e6516612/1767676432.jpeg" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Shirts" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-3xl font-black text-white italic mb-2">SIGNATURE SHIRTS</h3>
              <p className="text-white/70 font-medium mb-6">Italian fabrics, Indian craftsmanship.</p>
              <span className="w-fit bg-white text-black px-6 py-3 text-[10px] font-bold tracking-widest uppercase group-hover:bg-rose-600 group-hover:text-white transition-colors">Explore Now</span>
            </div>
          </Link>

          {/* Top Left - Drop Shoulder */}
          <Link to="/shop?cat=Drop Shoulder" className="md:col-span-2 md:row-span-1 group relative overflow-hidden bg-black">
            <img src="https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_c965cefd-af58-45c8-81c7-430bff36c905.jpg?v=1768756674&quality=80" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Drop Shoulder" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="text-xl font-black text-white italic">DROP SHOULDER</h3>
              <span className="text-[10px] text-white/60 font-bold tracking-widest uppercase mt-2 group-hover:text-rose-400">View Collection</span>
            </div>
          </Link>

          {/* Top Right - Night Paint */}
          <Link to="/shop?cat=Night Paint" className="md:col-span-2 md:row-span-1 group relative overflow-hidden bg-black">
             <img src="https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4msk8770-04_1.jpg?v=1767634627&quality=80" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Night Paint" />
             <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-black text-white italic">NIGHT PANTS</h3>
                <span className="text-[10px] text-white/60 font-bold tracking-widest uppercase mt-2 group-hover:text-rose-400">Shop Comfort</span>
             </div>
          </Link>

          {/* Bottom Left - Gym */}
          <Link to="/shop?cat=Gym T-Shirt" className="md:col-span-2 md:row-span-1 group relative overflow-hidden bg-black">
            <img src="https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4msw9135-01_1.jpg?v=1768324479&quality=80" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Gym" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="text-xl font-black text-white italic">GYM PERFORMANCE</h3>
              <span className="text-[10px] text-white/60 font-bold tracking-widest uppercase mt-2 group-hover:text-rose-400">Train Hard</span>
            </div>
          </Link>

          {/* Bottom Right - Sandos */}
          <Link to="/shop?cat=Sandos" className="md:col-span-2 md:row-span-1 group relative overflow-hidden bg-black">
            <img src="https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_da5cf681-536f-44d8-a3cf-38691ee2a71f.jpg?v=1768410952&quality=80" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Sandos" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="text-xl font-black text-white italic">URBAN VESTS</h3>
              <span className="text-[10px] text-white/60 font-bold tracking-widest uppercase mt-2 group-hover:text-rose-400">Essential</span>
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
