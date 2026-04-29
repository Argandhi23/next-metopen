export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  rating: number;
}

const categories = ["Elektronik", "Pakaian", "Makanan", "Olahraga", "Rumah Tangga"];

export const products: Product[] = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  const categoryIndex = Math.floor(i / 10);
  const category = categories[categoryIndex];
  return {
    id,
    name: `Produk ${category} ${id}`,
    price: (Math.floor(Math.random() * 900) + 100) * 1000,
    image: `https://picsum.photos/seed/${id}/400/400`,
    description: `Ini adalah deskripsi lengkap untuk Produk ${category} ${id}. Produk ini diproduksi dengan standar kualitas terbaik, menawarkan durabilitas dan performa maksimal yang sangat direkomendasikan untuk Anda. Sempurna untuk kebutuhan sehari-hari Anda.`,
    category,
    stock: Math.floor(Math.random() * 100) + 1,
    rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),
  };
});

export const getAllProducts = async (): Promise<Product[]> => {
  return products;
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
  return products.find(p => p.id === id);
};

export const getRelatedProducts = async (category: string, excludeId: number): Promise<Product[]> => {
  return products.filter(p => p.category === category && p.id !== excludeId).slice(0, 4);
};
