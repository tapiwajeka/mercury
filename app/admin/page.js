"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { fetchAllProducts, deleteProduct } from "@/lib/adminProducts";
import { productImageUrl } from "@/lib/products";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const load = () => {
    setLoading(true);
    fetchAllProducts()
      .then(setProducts)
      .catch((e) => setError(e.message || "Failed to load products"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`))
      return;
    setDeletingId(product.id);
    try {
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (e) {
      alert(e.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminShell title="Products">
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-400 text-sm">
          {loading ? "Loading…" : `${products.length} product(s)`}
        </p>
        <Link href="/admin/products/new" className="btn-premium btn-primary">
          New Product
        </Link>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 mb-6">
          {error}
        </p>
      )}

      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-10 h-10 border-2 border-white/20 border-t-mercurySilver rounded-full animate-spin-slow" />
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-gray-400 mb-6">No products yet.</p>
          <Link href="/admin/products/new" className="btn-premium btn-outline">
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-white/10">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                          {p.images?.[0] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={productImageUrl(p.images[0], "thumb")}
                              alt=""
                              className="w-full h-full object-contain p-1"
                            />
                          ) : (
                            <span className="text-gray-300 text-xs">—</span>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{p.name}</p>
                          <p className="text-gray-500 text-xs">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300 capitalize">
                      {p.category}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          p.published
                            ? "bg-green-500/15 text-green-400"
                            : "bg-gray-500/15 text-gray-400"
                        }`}
                      >
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${p.slug}/edit`}
                          className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-200 hover:bg-white/10 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(p)}
                          disabled={deletingId === p.id}
                          className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        >
                          {deletingId === p.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
