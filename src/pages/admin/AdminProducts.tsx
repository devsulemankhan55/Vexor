import React, { useState } from 'react';
import { useShopContext } from '../../context/ShopContext';
import { Product } from '../../types';
import { toast } from 'sonner';

export const AdminProducts: React.FC = () => {
  const { products, deleteProduct, addProduct, updateProduct } = useShopContext();
  
  // Product Form State
  const [isEditing, setIsEditing] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

  const openProductForm = (product?: Product) => {
    if (product) {
      setCurrentProduct(product);
      setIsEditing(true);
    } else {
      setCurrentProduct({
        id: `p${Date.now()}`,
        name: '',
        price: 0,
        category: 'T-Shirts',
        images: ['https://via.placeholder.com/400'],
        description: '',
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 0,
        rating: 0,
        reviews: 0,
        isNew: true
      });
      setIsEditing(false);
    }
    setShowProductForm(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && currentProduct.id) {
      updateProduct(currentProduct.id, currentProduct);
      toast.success('Product updated!');
    } else {
      addProduct(currentProduct as Product);
      toast.success('Product added!');
    }
    setShowProductForm(false);
  };
  
  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast.success('Product deleted.');
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase">Product Management</h2>
        <button onClick={() => openProductForm()} className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-rose-600 transition-colors">
          + Add New Product
        </button>
      </header>
      
      <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Product</th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Category</th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Price</th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Stock</th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={product.images[0]} className="w-10 h-10 object-cover bg-gray-100" />
                    <div>
                      <span className="text-xs font-bold uppercase block">{product.name}</span>
                      <span className="text-[10px] text-gray-400">ID: {product.id}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-xs font-medium">{product.category}</td>
                <td className="p-4 text-xs font-bold">₹{product.price.toLocaleString()}</td>
                <td className="p-4 text-xs font-bold">{product.stock}</td>
                <td className="p-4 flex gap-3">
                  <button onClick={() => openProductForm(product)} className="text-xs font-bold text-gray-500 hover:text-black uppercase">Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="text-xs font-bold text-gray-400 hover:text-rose-600 uppercase">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Modal */}
      {showProductForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
             <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-6">
               {isEditing ? 'Edit Product' : 'New Product'}
             </h3>
             <form onSubmit={handleSaveProduct} className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Name</label>
                   <input required type="text" value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} className="w-full border p-2 text-sm font-bold" />
                 </div>
                 <div>
                   <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Price</label>
                   <input required type="number" value={currentProduct.price} onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})} className="w-full border p-2 text-sm font-bold" />
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Category</label>
                   <select value={currentProduct.category} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})} className="w-full border p-2 text-sm font-bold">
                     <option>T-Shirts</option>
                     <option>Drop Shoulder</option>
                     <option>Half Sleeves</option>
                     <option>Gym T-Shirt</option>
                     <option>Sandos</option>
                     <option>Night Pant</option>
                     <option>Shirts</option>
                     <option>Co-ords</option>
                     <option>Jackets</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Stock</label>
                   <input required type="number" value={currentProduct.stock} onChange={e => setCurrentProduct({...currentProduct, stock: Number(e.target.value)})} className="w-full border p-2 text-sm font-bold" />
                 </div>
               </div>
               <div>
                 <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Image URL</label>
                 <input type="text" value={currentProduct.images?.[0] || ''} onChange={e => setCurrentProduct({...currentProduct, images: [e.target.value]})} className="w-full border p-2 text-sm font-bold" />
               </div>
               <div>
                 <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Description</label>
                 <textarea value={currentProduct.description} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} className="w-full border p-2 text-sm font-bold h-24" />
               </div>
               
               <div className="flex gap-4 pt-4">
                 <button type="button" onClick={() => setShowProductForm(false)} className="flex-1 border border-gray-200 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-50">Cancel</button>
                 <button type="submit" className="flex-1 bg-black text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-green-600 transition-colors">Save Product</button>
               </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};
