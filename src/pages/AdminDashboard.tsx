import React from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useShopContext } from '../context/ShopContext';
import { UserRole } from '../types';
import { Package, Users, ShoppingBag, LogOut, BarChart3, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useShopContext();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (user?.role !== UserRole.ADMIN) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user || user.role !== UserRole.ADMIN) return null;

  const isActive = (path: string) => location.pathname === path || (path === '/admin' && location.pathname === '/admin');

  return (
    <div className="min-h-screen bg-gray-50 flex pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full left-0 bottom-0 top-20 z-40 hidden md:block">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-10">
            <img src={user.avatar} className="w-10 h-10 rounded-full" alt="Admin" />
            <div>
              <p className="text-sm font-black uppercase tracking-tight">{user.name}</p>
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Online</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            <Link to="/admin">
              <div 
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${isActive('/admin') ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <BarChart3 size={16} /> Overview
              </div>
            </Link>
            <Link to="/admin/products">
              <div 
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${isActive('/admin/products') ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <Package size={16} /> Inventory
              </div>
            </Link>
            <Link to="/admin/orders">
              <div 
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${isActive('/admin/orders') ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <ShoppingBag size={16} /> Orders
              </div>
            </Link>
            <Link to="/admin/users">
              <div className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${isActive('/admin/users') ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                <Users size={16} /> Customers
              </div>
            </Link>
            <Link to="/admin/settings">
              <div className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${isActive('/admin/settings') ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                <Settings size={16} /> Settings
              </div>
            </Link>
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
