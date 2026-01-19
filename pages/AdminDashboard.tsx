
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Box, 
  ShoppingBag, 
  Users, 
  Settings, 
  BarChart3, 
  TrendingUp, 
  AlertCircle,
  Plus,
  MoreVertical,
  Search,
  Filter,
  LogOut
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MOCK_PRODUCTS } from '../constants';

const SALES_DATA = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 2000, orders: 15 },
  { name: 'Thu', sales: 2780, orders: 20 },
  { name: 'Fri', sales: 1890, orders: 12 },
  { name: 'Sat', sales: 2390, orders: 17 },
  { name: 'Sun', sales: 3490, orders: 22 },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <div className="bg-white p-6 rounded-none border border-gray-100 shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-gray-50 rounded-lg">
          <Icon className="text-rose-600" size={24} />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {change}
        </span>
      </div>
      <div>
        <h4 className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">{title}</h4>
        <p className="text-3xl font-black italic tracking-tighter mt-1">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <span className="text-2xl font-black italic tracking-tighter">VEXOR<span className="text-rose-600">.</span></span>
          <span className="block text-[8px] font-black tracking-[0.3em] uppercase text-gray-400 mt-1">Admin Central</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'Products', icon: Box },
            { name: 'Orders', icon: ShoppingBag },
            { name: 'Customers', icon: Users },
            { name: 'Analytics', icon: BarChart3 },
            { name: 'Settings', icon: Settings },
          ].map(item => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-4 py-3 text-[11px] font-black tracking-widest uppercase transition-all ${activeTab === item.name ? 'bg-black text-white' : 'text-gray-400 hover:text-black hover:bg-gray-50'}`}
            >
              <item.icon size={18} strokeWidth={activeTab === item.name ? 3 : 2} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-[11px] font-black tracking-widest uppercase text-rose-600 hover:bg-rose-50 transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 md:p-10 space-y-10">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">{activeTab}</h1>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-1">Monday, 21 Oct 2024</p>
          </div>
          <div className="flex gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Global search..." className="bg-white border border-gray-100 pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-rose-600 w-64" />
            </div>
            <button className="bg-black text-white px-6 py-2 text-[10px] font-black tracking-widest uppercase flex items-center gap-2 hover:bg-rose-600 transition-colors">
              <Plus size={16} /> New Product
            </button>
          </div>
        </header>

        {activeTab === 'Dashboard' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Revenue" value="₹2,45,900" change="+14%" icon={TrendingUp} trend="up" />
              <StatCard title="Total Orders" value="1,248" change="+8%" icon={ShoppingBag} trend="up" />
              <StatCard title="Active Users" value="8,492" change="+22%" icon={Users} trend="up" />
              <StatCard title="Inventory Low" value="14 Items" change="-2" icon={AlertCircle} trend="down" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xs font-black tracking-widest uppercase mb-8 flex items-center justify-between">
                  Weekly Sales Performance
                  <span className="text-rose-600 cursor-pointer">View Report</span>
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SALES_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip 
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{borderRadius: '0px', border: '1px solid #f1f5f9', fontSize: '12px', fontWeight: 'bold'}}
                      />
                      <Bar dataKey="sales" fill="#111" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xs font-black tracking-widest uppercase mb-8 flex items-center justify-between">
                  New Order Volume
                  <span className="text-rose-600 cursor-pointer">Detailed Stats</span>
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={SALES_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip 
                         contentStyle={{borderRadius: '0px', border: '1px solid #f1f5f9', fontSize: '12px', fontWeight: 'bold'}}
                      />
                      <Line type="monotone" dataKey="orders" stroke="#E11D48" strokeWidth={4} dot={{fill: '#E11D48', r: 4}} activeDot={{r: 6}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h3 className="text-xs font-black tracking-widest uppercase">Recent Inventory Changes</h3>
                <button className="text-[10px] font-black uppercase text-gray-400 hover:text-black">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-8 py-4 text-left text-[10px] font-black tracking-widest uppercase text-gray-400">Product</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black tracking-widest uppercase text-gray-400">SKU</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black tracking-widest uppercase text-gray-400">Stock</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black tracking-widest uppercase text-gray-400">Price</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black tracking-widest uppercase text-gray-400">Status</th>
                      <th className="px-8 py-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {MOCK_PRODUCTS.slice(0, 5).map((p, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-4">
                            <img src={p.images[0]} className="w-10 h-10 object-cover bg-gray-100" />
                            <span className="text-xs font-black italic tracking-tight uppercase">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-4 text-xs font-medium text-gray-400">VEX-{p.id}102</td>
                        <td className="px-8 py-4 text-xs font-black">{p.stock}</td>
                        <td className="px-8 py-4 text-xs font-black">₹{p.price.toLocaleString()}</td>
                        <td className="px-8 py-4">
                          <span className={`text-[9px] font-bold px-2 py-1 uppercase tracking-widest ${p.stock > 10 ? 'bg-green-50 text-green-600' : p.stock > 0 ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'}`}>
                            {p.stock > 10 ? 'In Stock' : p.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <button className="text-gray-400 hover:text-black transition-colors"><MoreVertical size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab !== 'Dashboard' && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Box size={40} className="text-gray-300" />
             </div>
             <h2 className="text-2xl font-black italic tracking-tighter uppercase">{activeTab} Interface Under Construction</h2>
             <p className="text-gray-400 mt-2 font-medium">This module is part of the premium VEXOR upgrade.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
