import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/CartProvider";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "Toko Online",
  description: "E-commerce dengan performa terbaik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
