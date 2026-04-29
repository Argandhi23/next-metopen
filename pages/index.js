import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Products | MetopenStore</title>
        <meta name="description" content="Browse our collection of products" />
      </Head>

      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                <div className="relative w-full h-48 bg-gray-100">
                  <Image
                    src={product.image || "https://via.placeholder.com/400x300"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{product.category}</p>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h2>
                  <div className="mt-auto">
                    <p className="text-xl font-bold text-blue-600">${product.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch('https://api.npoint.io/746b547559a8be2ca7fa/products');
    
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const products = await res.json();
    
    return {
      props: {
        products: products.slice(0, 50),
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}
