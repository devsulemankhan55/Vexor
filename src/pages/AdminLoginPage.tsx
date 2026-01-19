import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShopContext } from '../context/ShopContext';
import { UserRole } from '../types';
import { Lock } from 'lucide-react';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@vexor.in');
  const [password, setPassword] = useState('admin123');
  const { login, user } = useShopContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user?.role === UserRole.ADMIN) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock simple validation
    if (password === 'admin123') {
      login(email);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <div className="bg-white p-10 w-full max-w-md shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-full mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">Admin Portal</h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Authorized Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Email ID</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-100 p-4 focus:outline-none focus:border-black font-bold text-sm" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-100 p-4 focus:outline-none focus:border-black font-bold text-sm" 
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-black text-white py-4 font-black text-xs tracking-widest uppercase hover:bg-rose-600 transition-colors"
          >
            Authenticate
          </button>
        </form>
        
        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
             <p className="text-[10px] text-gray-400">Demo Credentials:</p>
             <p className="text-[10px] font-bold mt-1">admin@vexor.in / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
