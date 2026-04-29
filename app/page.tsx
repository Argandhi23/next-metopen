import { getAllProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Toko Online - Semua Produk',
  description: 'Temukan berbagai produk elektronik, pakaian, makanan, dan lainnya.',
  alternates: {
    canonical: '/',
  }
};

export default async function Home(props: { searchParams?: Promise<{ category?: string }> }) {
  const searchParams = await props.searchParams;
  const category = searchParams?.category;
  const allProducts = await getAllProducts();
  const products = category ? allProducts.filter(p => p.category === category) : allProducts;
  
  const categories = ["Semua", "Elektronik", "Pakaian", "Makanan", "Olahraga", "Rumah Tangga"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Semua Produk</h1>
      
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map(c => (
          <Link 
            key={c} 
            href={c === 'Semua' ? '/' : `/?category=${c}`}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              (category === c) || (!category && c === 'Semua') 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, idx) => (
          <ProductCard key={product.id} product={product} priority={idx < 4} />
        ))}
      </div>
    </div>
  );
}
