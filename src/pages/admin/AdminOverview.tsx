import React from 'react';
import { useShopContext } from '../../context/ShopContext';

export const AdminOverview: React.FC = () => {
  const { products } = useShopContext();

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase">Dashboard Overview</h2>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{new Date().toLocaleDateString()}</span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow-sm border border-gray-100">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Products</span>
          <p className="text-3xl font-black mt-2">{products.length}</p>
          <span className="text-xs text-green-600 font-bold mt-2 inline-block">Active Inventory</span>
        </div>
        <div className="bg-white p-6 shadow-sm border border-gray-100">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Pending Orders</span>
          <p className="text-3xl font-black mt-2">5</p>
          <span className="text-xs text-orange-500 font-bold mt-2 inline-block">Needs Action</span>
        </div>
        <div className="bg-white p-6 shadow-sm border border-gray-100">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Customers</span>
          <p className="text-3xl font-black mt-2">124</p>
          <span className="text-xs text-green-600 font-bold mt-2 inline-block">Growing</span>
        </div>
      </div>
      
      <div className="bg-white p-8 shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">
        Analytics Visualization Coming Soon
      </div>
    </div>
  );
};
