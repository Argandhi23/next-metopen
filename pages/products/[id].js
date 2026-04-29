import Head from 'next/head';
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useRouter } from 'next/router';

export default function ProductDetail({ product }) {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-500">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <>
      <Head>
        <title>{product.name} | MetopenStore</title>
        <meta name="description" content={product.description || `Buy ${product.name} at MetopenStore`} />
      </Head>

      <div className="py-8 max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium"
        >
          &larr; Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-gray-100">
          <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[400px] bg-gray-100">
            <Image
              src={product.image || "https://via.placeholder.com/800x800"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          
          <div className="p-8 w-full md:w-1/2 flex flex-col">
            <div className="mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase tracking-wider font-semibold">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-blue-600 mb-6">${product.price}</p>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || "No description available for this product."}
              </p>
            </div>
            
            <div className="mt-auto">
              <p className="text-sm text-gray-500 mb-4">Stock available: <span className="font-semibold text-gray-800">{product.stock}</span></p>
              <button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-colors duration-200 ${
                  product.stock > 0 
                    ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`https://api.npoint.io/746b547559a8be2ca7fa/products/${params.id}`);
    
    if (!res.ok) {
      if (res.status === 404) {
        return { notFound: true };
      }
      throw new Error('Failed to fetch product data');
    }
    
    const product = await res.json();
    
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error(`Error fetching product ${params.id}:`, error);
    return {
      props: {
        product: null,
      },
    };
  }
}
