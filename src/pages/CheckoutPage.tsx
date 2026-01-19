
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Truck, MapPin, CheckCircle2 } from 'lucide-react';
import { useShopContext } from '../context/ShopContext';

const CheckoutPage: React.FC = () => {
  const { cart, setIsLoading, clearCart } = useShopContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + Math.round(subtotal * 0.12);

  const handlePlaceOrder = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      clearCart();
      setStep(3);
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center gap-8">
        <div className="w-32 h-32 bg-green-50 text-green-600 flex items-center justify-center rounded-full">
          <CheckCircle2 size={64} />
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl font-black italic tracking-tighter uppercase">Order Confirmed!</h2>
          <p className="text-gray-500 font-medium max-w-sm mx-auto">Your VEXOR pieces are being prepared for dispatch. Expect delivery within 2-4 business days.</p>
          <p className="text-xs font-black tracking-[0.3em] uppercase text-gray-400">Order ID: VEX-90283411</p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="bg-black text-white px-12 py-5 font-black text-sm tracking-widest uppercase hover:bg-rose-600 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
      <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-12">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          {/* Shipping Info */}
          <section className="space-y-8">
            <div className="flex items-center gap-4 text-xl font-black italic tracking-tight uppercase">
              <span className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-xs font-bold not-italic">1</span>
              Shipping Address
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Full Name</label>
                <input type="text" className="w-full border-2 border-gray-100 p-4 focus:outline-none focus:border-black font-bold" placeholder="Enter name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Phone Number</label>
                <input type="text" className="w-full border-2 border-gray-100 p-4 focus:outline-none focus:border-black font-bold" placeholder="+91" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Full Address</label>
                <textarea rows={3} className="w-full border-2 border-gray-100 p-4 focus:outline-none focus:border-black font-bold" placeholder="House/Flat No, Building, Street, Area"></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Pin Code</label>
                <input type="text" className="w-full border-2 border-gray-100 p-4 focus:outline-none focus:border-black font-bold" placeholder="000000" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">City</label>
                <input type="text" className="w-full border-2 border-gray-100 p-4 focus:outline-none focus:border-black font-bold" placeholder="Select City" />
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="space-y-8 opacity-50 pointer-events-none">
            <div className="flex items-center gap-4 text-xl font-black italic tracking-tight uppercase">
              <span className="w-8 h-8 bg-gray-200 text-gray-400 flex items-center justify-center rounded-full text-xs font-bold not-italic">2</span>
              Payment Method
            </div>
            <div className="flex flex-col gap-4">
              <div className="border-2 border-gray-100 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                   <div className="flex items-center gap-3">
                      <CreditCard className="text-gray-400" />
                      <span className="text-sm font-black uppercase tracking-widest">Credit / Debit Card</span>
                   </div>
                </div>
              </div>
              <div className="border-2 border-rose-600 bg-rose-50/50 p-6 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-6 h-6 border-[6px] border-rose-600 rounded-full" />
                    <div className="flex items-center gap-3">
                       <MapPin className="text-rose-600" />
                       <span className="text-sm font-black uppercase tracking-widest">Cash on Delivery</span>
                    </div>
                 </div>
                 <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Selected</span>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 h-fit sticky top-24">
          <div className="bg-gray-50 p-8 space-y-8">
            <h3 className="text-xl font-black italic tracking-tighter uppercase border-b border-gray-200 pb-4">Order Review</h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-4 scrollbar-hide">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                  <div className="w-12 h-16 flex-shrink-0 bg-white">
                    <img src={item.images[0]} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[10px] font-black uppercase tracking-tight line-clamp-1 italic">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                    <p className="text-[11px] font-black mt-1">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 border-t border-gray-200 pt-6">
               <div className="flex justify-between text-xs font-black uppercase tracking-widest text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-xs font-black uppercase tracking-widest text-gray-400">
                  <span>GST (12%)</span>
                  <span>₹{(Math.round(subtotal * 0.12)).toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-lg font-black italic tracking-tighter uppercase">
                  <span>Total</span>
                  <span className="text-rose-600">₹{total.toLocaleString()}</span>
               </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              className="w-full bg-black text-white py-5 font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-rose-600 transition-colors"
            >
              Confirm Order <ShieldCheck size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
