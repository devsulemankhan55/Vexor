
import React from 'react';
import { Package, Heart, MapPin, User as UserIcon, LogOut, ChevronRight } from 'lucide-react';
import { useShopContext } from '../context/ShopContext';

const ProfilePage: React.FC = () => {
  const { user } = useShopContext();

  if (!user) return <div className="p-20 text-center">Please log in.</div>;

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 space-y-12">
           <div className="flex flex-col items-center text-center gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 ring-2 ring-black">
                 <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} />
              </div>
              <div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase">{user.name}</h2>
                <p className="text-xs font-bold tracking-widest uppercase text-gray-400">{user.email}</p>
              </div>
           </div>

           <nav className="flex flex-col gap-2">
             {[
               { name: 'My Orders', icon: Package },
               { name: 'Wishlist', icon: Heart },
               { name: 'Addresses', icon: MapPin },
               { name: 'Account Info', icon: UserIcon },
             ].map(item => (
               <button key={item.name} className="flex items-center justify-between w-full px-4 py-4 text-xs font-black tracking-widest uppercase border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                 <div className="flex items-center gap-4">
                    <item.icon size={18} className="text-gray-400 group-hover:text-black transition-colors" />
                    {item.name}
                 </div>
                 <ChevronRight size={14} className="text-gray-300" />
               </button>
             ))}
             <button className="flex items-center gap-4 w-full px-4 py-4 text-xs font-black tracking-widest uppercase text-rose-600 hover:bg-rose-50 transition-colors mt-4">
                <LogOut size={18} /> Logout
             </button>
           </nav>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-12">
           <section>
              <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-8">Recent Orders</h3>
              <div className="space-y-6">
                {[1, 2].map(i => (
                  <div key={i} className="border-2 border-gray-100 p-8 space-y-6 bg-white animate-fade-in">
                    <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-gray-100">
                      <div>
                        <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">Order ID</p>
                        <p className="text-sm font-black uppercase">VEX-7712399{i}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">Date</p>
                        <p className="text-sm font-black uppercase">Oct 1{i}, 2024</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">Status</p>
                        <span className="text-[10px] font-black px-3 py-1 bg-green-50 text-green-600 uppercase tracking-widest">Delivered</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">Amount</p>
                        <p className="text-sm font-black">₹4,599</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-16 h-20 bg-gray-50 overflow-hidden">
                         <img src={`https://picsum.photos/id/${100 + i}/600/800`} className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-black italic uppercase italic tracking-tight">Onyx Black Silk Shirt</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Size: M | Qty: 1</p>
                        <button className="mt-4 text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] border-b border-rose-600">Track Item</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
           </section>

           <section>
              <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-8">Saved Addresses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-black p-6 space-y-4 relative">
                   <div className="absolute top-6 right-6 px-2 py-1 bg-black text-white text-[8px] font-black uppercase tracking-widest">Primary</div>
                   <h4 className="text-sm font-black italic uppercase tracking-tight">Arjun Mehra (Home)</h4>
                   <p className="text-xs text-gray-500 font-medium leading-relaxed">
                     704, Skyline Towers, Sector 15<br />
                     DLF Phase 2, Gurgaon<br />
                     Haryana, 122002
                   </p>
                   <p className="text-xs font-black tracking-widest">PH: +91 9876543210</p>
                   <div className="flex gap-6 pt-2">
                      <button className="text-[10px] font-black uppercase text-gray-400 hover:text-black">Edit</button>
                      <button className="text-[10px] font-black uppercase text-gray-400 hover:text-rose-600">Remove</button>
                   </div>
                </div>
                <button className="border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center gap-4 text-gray-400 hover:text-black hover:border-black transition-all group">
                   <div className="p-3 bg-gray-50 rounded-full group-hover:bg-gray-100"><LogOut className="rotate-90" size={24} /></div>
                   <span className="text-[10px] font-black uppercase tracking-widest">Add New Address</span>
                </button>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
