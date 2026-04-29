'use client';
import { useCart } from '@/components/CartProvider';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Checkout() {
  const { items, totalPrice, isLoaded } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && items.length === 0) {
      router.push('/cart');
    }
  }, [isLoaded, items.length, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('Pesanan berhasil dibuat!');
      localStorage.removeItem('cart');
      window.location.href = '/';
    }, 1000);
  };

  if (!isLoaded || items.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <form id="checkout-form" onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">Informasi Pengiriman</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" placeholder="Masukkan nama lengkap" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" placeholder="email@contoh.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
                <input required type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" placeholder="08123456789" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <textarea required rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" placeholder="Nama jalan, gedung, no. rumah"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" placeholder="Kota" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" placeholder="12345" />
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Ringkasan Pesanan</h2>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 line-clamp-1">{item.name}</div>
                      <div className="text-gray-500">{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</div>
                    </div>
                  </div>
                  <div className="font-medium text-gray-900">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-100 pt-6 space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Ongkos Kirim</span>
                <span className="font-medium text-gray-900">Gratis</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-gray-900">Total Pembayaran</span>
                <span className="text-2xl font-extrabold text-indigo-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>
            
            <button 
              type="submit" 
              form="checkout-form"
              disabled={loading}
              className="mt-8 w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 hover:shadow-lg transition-all disabled:opacity-50 flex justify-center items-center"
            >
              {loading ? 'Memproses...' : 'Pesan Sekarang'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
