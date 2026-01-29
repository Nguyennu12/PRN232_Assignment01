import prisma from "@/lib/prisma";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Featured Products</h1>
        </div>

        <ProductGrid initialProducts={products} />
      </div>
    );
  } catch (error) {
    console.error("Database connection error:", error);
    return (
      <div className="text-center py-20 bg-red-50 rounded-xl border border-red-200">
        <h1 className="text-2xl font-bold text-red-700 mb-4">Database Error</h1>
        <p className="text-red-600">
          Could not connect to the database. Please check your DATABASE_URL and IP allowlist.
        </p>
        <p className="text-sm text-red-400 mt-4">
          Error: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }
}
