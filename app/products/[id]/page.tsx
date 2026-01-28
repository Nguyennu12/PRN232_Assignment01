import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
        notFound();
    }

    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Link
                href="/"
                className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center mb-8"
            >
                ← Back to Gallery
            </Link>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-8 border-r">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-h-96 object-contain rounded-lg"
                            />
                        ) : (
                            <div className="text-gray-400 text-lg">No image available</div>
                        )}
                    </div>
                    <div className="md:w-1/2 p-10">
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-3xl font-extrabold text-gray-900">
                                {product.name}
                            </h1>
                            <Link
                                href={`/products/${product.id}/edit`}
                                className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium border border-indigo-100 shadow-sm"
                            >
                                Edit Product
                            </Link>
                        </div>
                        <p className="text-2xl font-bold text-indigo-600 mb-8">
                            ${product.price.toFixed(2)}
                        </p>
                        <div className="prose prose-indigo max-w-none mb-10">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                Description
                            </h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                        <div className="pt-8 border-t">
                            <p className="text-xs text-gray-400">
                                Added on: {new Date(product.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
