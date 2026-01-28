import prisma from "@/lib/prisma";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

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

      <ProductGrid initialProducts={products} />
    </div>
  );
}
