"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchProductBySlug, productImageUrl } from "@/lib/products";
import { company } from "@/lib/siteConfig";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchProductBySlug(slug)
      .then((data) => {
        if (!active) return;
        if (!data) setNotFound(true);
        else setProduct(data);
      })
      .catch((e) => {
        console.error(e);
        if (active) setNotFound(true);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [slug]);

  const keySpecs = useMemo(() => {
    if (!product) return [];
    return [
      ["Processor", product.cpu],
      ["Memory", product.ram],
      ["Storage", product.storage],
      ["Display", product.display],
    ].filter(([, v]) => v);
  }, [product]);

  const quoteHref = useMemo(() => {
    if (!product) return "#";
    const subject = `Quote Request: ${product.name}${
      qty > 1 ? ` (Qty: ${qty})` : ""
    }`;
    const specLines = keySpecs.map(([k, v]) => `- ${k}: ${v}`);
    const extraSpecs = Object.entries(product.specs || {}).map(
      ([k, v]) => `- ${k}: ${v}`
    );
    const body = [
      `I'm interested in the ${product.name}.`,
      "",
      `Quantity: ${qty}`,
      "",
      "Key Specifications:",
      ...specLines,
      ...extraSpecs,
    ].join("\n");
    return `mailto:${company.emails.sales}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [product, qty, keySpecs]);

  if (loading) {
    return (
      <section className="bg-mercuryDark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-10 h-10 border-2 border-white/20 border-t-mercurySilver rounded-full animate-spin-slow" />
          <p className="text-gray-400 mt-4">Loading product...</p>
        </div>
      </section>
    );
  }

  if (notFound || !product) {
    return (
      <section className="bg-mercuryDark min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-white mb-4">
            Product not found
          </h1>
          <p className="text-gray-400 mb-8">
            The product you&apos;re looking for doesn&apos;t exist or is no
            longer available.
          </p>
          <Link href="/products" className="btn-premium btn-primary">
            Browse All Products
          </Link>
        </div>
      </section>
    );
  }

  const images = product.images?.length ? product.images : [null];
  const mainImg = productImageUrl(images[activeImage]);

  return (
    <section className="bg-mercuryDark min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <div className="bg-white rounded-2xl aspect-square flex items-center justify-center overflow-hidden mb-4">
              {mainImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mainImg}
                  alt={product.name}
                  className="w-full h-full object-contain p-10"
                />
              ) : (
                <span className="text-gray-300">No image</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((im, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-lg bg-white overflow-hidden border-2 transition-colors ${
                      i === activeImage
                        ? "border-mercurySilver"
                        : "border-transparent"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={productImageUrl(im, "thumb")}
                      alt=""
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-mercurySilver">
              {product.category}
              {product.series ? ` · ${product.series}` : ""}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
              {product.name}
            </h1>

            {keySpecs.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {keySpecs.map(([k, v]) => (
                  <div
                    key={k}
                    className="bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                      {k}
                    </p>
                    <p className="text-white text-sm font-medium">{v}</p>
                  </div>
                ))}
              </div>
            )}

            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-white mb-3">
                  Specifications
                </h2>
                <dl className="divide-y divide-white/10">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-3 text-sm">
                      <dt className="text-gray-400 capitalize">{k}</dt>
                      <dd className="text-white font-medium text-right">
                        {String(v)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Quantity + quote */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-lg">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-gray-300 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 py-3 text-white min-w-[3rem] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-3 text-gray-300 hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <a href={quoteHref} className="btn-premium btn-primary flex-1 text-center">
                Request a Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
