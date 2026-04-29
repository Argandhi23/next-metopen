import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          MetopenStore
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-blue-500 font-medium">
            Products
          </Link>
          <Link href="/cart" className="hover:text-blue-500 font-medium flex items-center gap-1">
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
