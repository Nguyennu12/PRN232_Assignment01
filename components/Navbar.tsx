"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-3xl font-black text-indigo-600 tracking-tight">
                            ClothStore
                        </Link>
                    </div>
                    <div className="flex space-x-8">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/products/create"
                            className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium transition-colors"
                        >
                            Add Product
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
