"use client";

import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <AdminShell title="New Product">
      <Link
        href="/admin"
        className="inline-block text-sm text-gray-400 hover:text-white mb-8 transition-colors"
      >
        ← Back to Products
      </Link>
      <ProductForm />
    </AdminShell>
  );
}
