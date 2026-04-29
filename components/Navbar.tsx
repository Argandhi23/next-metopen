'use client';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartProvider';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-indigo-500 text-2xl font-bold tracking-tighter">
            TokoOnline
          </Link>
          <Link href="/cart" className="relative p-2 text-gray-600 hover:text-indigo-500 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {mounted && totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
