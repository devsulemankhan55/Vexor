import React from 'react';
import { ShoppingBag } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  return (
    <div>
      <header className="mb-8">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase">Order Management</h2>
      </header>
      <div className="bg-white p-12 text-center text-gray-400 font-bold uppercase tracking-widest border border-gray-100">
         <ShoppingBag className="mx-auto mb-4 opacity-50" size={48} />
         No active orders found in the system.
       </div>
    </div>
  );
};
