import { getProductById, getRelatedProducts } from '@/lib/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import ClientAddToCart from './ClientAddToCart';
import { Star, Truck, Shield, RotateCcw } from 'lucide-react';

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const product = await getProductById(Number(params.id));
  if (!product) return { title: 'Produk Tidak Ditemukan' };
  
  return {
    title: `${product.name} - Toko Online`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `/products/${product.id}`,
    }
  };
}

export default async function ProductDetail(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await getProductById(Number(params.id));
  
  if (!product) notFound();

  const related = await getRelatedProducts(product.category, product.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'IDR',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/?category=${product.category}`} className="hover:text-indigo-600 transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-10">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50">
            <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          
          <div className="flex flex-col">
            <div className="text-indigo-600 font-semibold tracking-wider uppercase text-sm mb-2">{product.category}</div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-amber-700">{product.rating}</span>
              </div>
              <div className="text-sm text-gray-500 border-l border-gray-200 pl-4">
                Stok: <span className="font-medium text-gray-900">{product.stock}</span>
              </div>
            </div>

            <div className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              Rp {product.price.toLocaleString('id-ID')}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            <ClientAddToCart product={product} />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 text-gray-600">
                <Truck className="w-6 h-6 text-indigo-500" />
                <span className="text-sm font-medium">Gratis Ongkir</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-6 h-6 text-indigo-500" />
                <span className="text-sm font-medium">Garansi Resmi</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <RotateCcw className="w-6 h-6 text-indigo-500" />
                <span className="text-sm font-medium">Retur 7 Hari</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Produk Terkait</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
