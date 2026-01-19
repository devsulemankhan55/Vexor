
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShopContext } from '../context/ShopContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQty } = useShopContext();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.12); // 12% GST
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center gap-8">
        <div className="w-32 h-32 bg-gray-50 flex items-center justify-center rounded-full animate-pulse">
          <ShoppingBag size={48} className="text-gray-300" />
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl font-black italic tracking-tighter uppercase">Your bag is empty.</h2>
          <p className="text-gray-500 font-medium max-w-sm mx-auto">Fill it with premium essentials and define your style today.</p>
        </div>
        <Link to="/shop" className="bg-black text-white px-12 py-5 font-black text-sm tracking-widest uppercase hover:bg-rose-600 transition-colors transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-black/10">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-12">Your Bag ({cart.length})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Items */}
        <div className="lg:col-span-8 space-y-10">
          {cart.map((item, idx) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex flex-col md:flex-row gap-8 pb-10 border-b border-gray-100 last:border-0">
              <div className="w-full md:w-48 aspect-[3/4] bg-gray-50 overflow-hidden">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black italic uppercase tracking-tight">{item.name}</h3>
                    <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mt-1">{item.category}</p>
                  </div>
                  <span className="text-xl font-black">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-10">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black tracking-widest uppercase text-gray-500">Size</span>
                    <div className="w-10 h-10 border-2 border-black flex items-center justify-center font-black text-sm">{item.selectedSize}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[9px] font-black tracking-widest uppercase text-gray-500">Quantity</span>
                    <div className="flex items-center border-2 border-gray-100">
                      <button onClick={() => updateCartQty(item.id, item.selectedSize, -1)} className="p-3 hover:bg-gray-50"><Minus size={14} /></button>
                      <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                      <button onClick={() => updateCartQty(item.id, item.selectedSize, 1)} className="p-3 hover:bg-gray-50"><Plus size={14} /></button>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="mt-6 md:mt-0 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-rose-600 hover:text-rose-700"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-4 h-fit">
          <div className="bg-gray-50 p-8 space-y-8">
            <h3 className="text-xl font-black italic tracking-tighter uppercase border-b border-gray-200 pb-4">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                <span className="text-gray-500">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                <span className="text-gray-500">Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                <span className="text-gray-500">Estimated Tax (12% GST)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div className="h-px bg-gray-200 my-4" />
              <div className="flex justify-between text-xl font-black uppercase tracking-tighter italic">
                <span>Total</span>
                <span className="text-rose-600">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-black text-white py-5 font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-rose-600 transition-colors"
            >
              Checkout <ArrowRight size={18} />
            </button>

            <div className="pt-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-gray-500">
                <ShieldCheck size={20} className="text-green-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure Payment Guarantee</span>
              </div>
              <p className="text-[9px] text-gray-400 font-medium leading-relaxed">
                Free shipping on orders over ₹1,999. Easy 7-day returns on all products except accessories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
