"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  createdAt: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setError(null);
      const res = await fetch("/api/products");
      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setError(data.error || "Failed to load products");
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("An unexpected error occurred");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Featured Products</h1>
        <Link
          href="/products/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add New Product
        </Link>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}. Please make sure your database is connected and migrated.
        </div>
      )}

      {products.length === 0 && !error ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border">
          <p className="text-gray-500 text-lg">No products found. Start by adding some!</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1 truncate">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                  {product.description}
                </p>
                <p className="text-xl font-bold text-indigo-600 mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex space-x-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 text-center bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="bg-white text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium border border-indigo-100"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium border border-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
