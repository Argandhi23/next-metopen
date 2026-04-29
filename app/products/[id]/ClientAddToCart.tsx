'use client';
import { useCart } from '@/components/CartProvider';
import { Product } from '@/lib/products';
import { useRouter } from 'next/navigation';

export default function ClientAddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <div className="flex gap-4 mt-auto">
      <button 
        onClick={() => { addToCart(product); alert('Ditambahkan ke keranjang'); }}
        className="flex-1 bg-indigo-50 text-indigo-700 py-4 px-6 rounded-xl font-bold text-lg hover:bg-indigo-100 transition-colors duration-200"
      >
        Tambah ke Keranjang
      </button>
      <button 
        onClick={() => { addToCart(product); router.push('/checkout'); }}
        className="flex-1 bg-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-indigo-700 hover:shadow-lg transition-all duration-200"
      >
        Beli Sekarang
      </button>
    </div>
  );
}
