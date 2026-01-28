"use client";

import { useState } from "react";
import Link from "next/link";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | null;
    createdAt: Date;
}

export default function ProductGrid({ initialProducts }: { initialProducts: Product[] }) {
    const [products, setProducts] = useState(initialProducts);

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

    if (products.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border">
                <p className="text-gray-500 text-lg">No products found. Start by adding some!</p>
            </div>
        );
    }

    return (
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
    );
}
