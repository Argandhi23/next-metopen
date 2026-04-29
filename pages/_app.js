import '../styles/globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Component {...pageProps} />
        </main>
      </div>
    </CartProvider>
  );
}
