"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ProductForm from "@/components/admin/ProductForm";
import { fetchProductBySlug } from "@/lib/products";

export default function EditProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetchProductBySlug(slug)
      .then((data) => {
        if (!active) return;
        if (!data) setError("Product not found.");
        else setProduct(data);
      })
      .catch((e) => active && setError(e.message || "Failed to load product"))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <AdminShell title="Edit Product">
      <Link
        href="/admin"
        className="inline-block text-sm text-gray-400 hover:text-white mb-8 transition-colors"
      >
        ← Back to Products
      </Link>

      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-10 h-10 border-2 border-white/20 border-t-mercurySilver rounded-full animate-spin-slow" />
        </div>
      ) : error ? (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      ) : (
        <ProductForm product={product} />
      )}
    </AdminShell>
  );
}
