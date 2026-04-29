'use client';
import { useCart } from '@/components/CartProvider';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-50 rounded-full mb-6">
          <ShoppingBag className="w-12 h-12 text-indigo-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Keranjang Belanja Kosong</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Anda belum menambahkan produk apapun ke keranjang belanja. Yuk, mulai belanja sekarang!</p>
        <Link href="/" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Keranjang Belanja</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 sm:gap-6 items-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="128px" />
              </div>
              <div className="flex-grow">
                <Link href={`/products/${item.id}`} className="font-bold text-gray-900 text-lg hover:text-indigo-600 line-clamp-1">{item.name}</Link>
                <div className="text-gray-500 text-sm mb-2">{item.category}</div>
                <div className="font-bold text-indigo-600 text-lg">Rp {item.price.toLocaleString('id-ID')}</div>
              </div>
              <div className="flex flex-col items-end gap-4">
                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100"><Minus className="w-4 h-4"/></button>
                  <span className="px-4 py-1 font-medium text-gray-900 border-x border-gray-200 min-w-[3rem] text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100"><Plus className="w-4 h-4"/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Belanja</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Total Harga ({items.reduce((acc, item) => acc + item.quantity, 0)} barang)</span>
                <span className="font-medium">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Diskon</span>
                <span className="font-medium text-green-600">- Rp 0</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Belanja</span>
                <span className="font-bold text-2xl text-indigo-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <Link href="/checkout" className="block w-full text-center bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 hover:shadow-lg transition-all">
              Lanjut ke Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
