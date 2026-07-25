import { Suspense } from "react";
import ProductsClient from "@/components/products/ProductsClient";

export const metadata = {
  title: "Products | Mercury Zimbabwe",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <section className="bg-mercuryDark min-h-screen flex items-center justify-center">
          <div className="inline-block w-10 h-10 border-2 border-white/20 border-t-mercurySilver rounded-full animate-spin-slow" />
        </section>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
