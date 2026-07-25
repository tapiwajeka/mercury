"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { Search, X, ArrowRight, Cpu, MemoryStick, HardDrive } from "lucide-react";
import { fetchProducts, productImageUrl } from "@/lib/products";
import { isSupabaseConfigured } from "@/lib/supabase";

const EASE = [0.16, 1, 0.3, 1];
const normalize = (s) => (s || "").toLowerCase().replace(/s$/, "");

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchProducts()
      .then((data) => {
        if (!active) return;
        setProducts(data);
        setError(null);
      })
      .catch((e) => {
        if (!active) return;
        setError("Failed to load products");
        console.error(e);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))],
    [products]
  );

  const counts = useMemo(() => {
    const map = { all: products.length };
    for (const p of products) {
      if (!p.category) continue;
      map[p.category] = (map[p.category] || 0) + 1;
    }
    return map;
  }, [products]);

  // Apply the ?category= query param once products (and their categories) load.
  useEffect(() => {
    if (!categoryParam || categories.length === 0) return;
    const match = categories.find(
      (c) => normalize(c) === normalize(categoryParam)
    );
    if (match) setCategory(match);
  }, [categoryParam, categories]);

  const filtered = useMemo(() => {
    let list = products;
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q) ||
          (p.cpu || "").toLowerCase().includes(q) ||
          (p.series && p.series.toLowerCase().includes(q))
      );
    }
    return list;
  }, [products, category, query]);

  const clearFilters = () => {
    setCategory("all");
    setQuery("");
  };

  const hasFilters = category !== "all" || Boolean(query);

  return (
    <section className="relative bg-mercuryDark min-h-screen overflow-hidden">
      <ProductsHero
        total={counts.all}
        categoryCount={categories.length}
        loading={loading}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <FilterBar
          categories={categories}
          counts={counts}
          active={category}
          onSelect={setCategory}
          query={query}
          onQuery={setQuery}
        />

        {/* Result count */}
        {!loading && !error && (
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="text-sm text-mercuryGray">
              <span className="font-semibold text-mercurySilver tabular-nums">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "device" : "devices"}
              {category !== "all" && (
                <span className="capitalize"> in {category}</span>
              )}
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-mercuryGray hover:text-mercuryWhite transition-colors"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* States */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <EmptyState
            title="Something went wrong"
            message={error}
            action={
              <button
                onClick={() => window.location.reload()}
                className="btn-premium btn-outline"
              >
                Try again
              </button>
            }
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            title={hasFilters ? "No matching devices" : "No products yet"}
            message={
              hasFilters
                ? "Try a different category or search term."
                : isSupabaseConfigured
                  ? "Check back soon — our lineup is on its way."
                  : "Products are being loaded. Please check back soon."
            }
            action={
              hasFilters && (
                <button
                  onClick={clearFilters}
                  className="btn-premium btn-outline"
                >
                  Clear filters
                </button>
              )
            }
          />
        ) : (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ---------- Hero ---------- */
function ProductsHero({ total, categoryCount, loading }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden border-b border-white/[0.06]">
      {/* ambient background */}
      <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-60" />
      <div
        aria-hidden="true"
        className={`absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[42rem] rounded-full bg-mercurySilver/[0.07] blur-3xl ${
          reduceMotion ? "" : "animate-blob"
        }`}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mercurySilver/60 to-transparent"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-14 sm:pb-16 text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-mercuryBlack/50 backdrop-blur-md px-3.5 py-1.5">
            <span className="flex gap-0.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-[#009739]" />
              <span className="h-2 w-2 rounded-full bg-[#fdd116]" />
              <span className="h-2 w-2 rounded-full bg-[#ef3340]" />
            </span>
            <span className="text-xs font-semibold tracking-[0.18em] text-mercuryWhite uppercase">
              Locally Assembled
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-5">
            <span className="block text-mercuryWhite">Our Products.</span>
            <span className="block text-metallic">Engineered to perform.</span>
          </h1>

          <p className="text-mercurySilver/90 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Explore our range of locally assembled devices — engineered for
            performance and built to last.
          </p>

          {/* live stats */}
          <div className="mt-8 flex items-center justify-center gap-4 sm:gap-6">
            <Stat value={loading ? "—" : total} label="Devices" />
            <span className="h-8 w-px bg-white/10" aria-hidden="true" />
            <Stat value={loading ? "—" : categoryCount} label="Categories" />
            <span className="h-8 w-px bg-white/10" aria-hidden="true" />
            <Stat value="ZW" label="Assembled" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="text-center">
      <div className="font-display text-2xl sm:text-3xl font-bold text-mercuryWhite tabular-nums">
        {value}
      </div>
      <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-mercuryGray">
        {label}
      </div>
    </div>
  );
}

/* ---------- Filter bar ---------- */
function FilterBar({ categories, counts, active, onSelect, query, onQuery }) {
  const pills = [{ key: "all", label: "All" }].concat(
    categories.map((c) => ({ key: c, label: c }))
  );

  return (
    <div className="sticky top-[7.5rem] z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-4 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 rounded-2xl border border-white/[0.06] bg-mercurySurface/70 backdrop-blur-xl p-3 sm:p-4">
        <div className="flex flex-wrap gap-2">
          {pills.map((pill) => {
            const isActive = active === pill.key;
            const count = counts[pill.key] ?? 0;
            return (
              <button
                key={pill.key}
                onClick={() => onSelect(pill.key)}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercurySilver/60 ${
                  isActive
                    ? "text-mercuryBlack"
                    : "text-mercuryGray hover:text-mercuryWhite"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 rounded-lg bg-gradient-to-b from-mercuryWhite to-mercurySilver shadow-[0_6px_20px_-8px_rgba(199,201,206,0.7)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  {pill.label}
                  <span
                    className={`text-[11px] tabular-nums ${
                      isActive ? "text-mercuryBlack/55" : "text-mercuryGray/70"
                    }`}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72 flex-shrink-0">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mercuryGray"
            strokeWidth={2}
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="input-premium w-full !rounded-lg !py-2.5 pl-9 pr-9 text-sm"
          />
          {query && (
            <button
              onClick={() => onQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-mercuryGray hover:text-mercuryWhite transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Product card ---------- */
const SPEC_META = [
  { key: "cpu", icon: Cpu },
  { key: "ram", icon: MemoryStick },
  { key: "storage", icon: HardDrive },
];

function ProductCard({ product, index }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const img = productImageUrl(product.images?.[0], "thumb");
  const specs = SPEC_META.map((s) => ({
    ...s,
    value: product[s.key],
  })).filter((s) => s.value);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    if (reduceMotion) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -4, ry: px * 4 });
  };
  const reset = () => setTilt({ rx: 0, ry: 0 });

  return (
    <motion.div
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: EASE, delay: Math.min(index * 0.05, 0.3) }}
      style={{ perspective: 1200 }}
    >
      <Link
        ref={ref}
        href={`/products/${product.slug}`}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-mercurySurface transition-[border-color,box-shadow] duration-300 hover:border-white/[0.14] hover:shadow-[0_28px_55px_-26px_rgba(0,0,0,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercurySilver/60 will-change-transform"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        {/* metallic top-edge highlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        />
        {/* pointer-tracking silver spotlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--mx, 50%) var(--my, 0%), rgba(199,201,206,0.14), transparent 60%)",
          }}
        />

        {/* image panel */}
        <div className="relative z-10 m-3 mb-0 overflow-hidden rounded-xl bg-gradient-to-b from-white to-gray-200">
          <div className="aspect-[4/3] flex items-center justify-center">
            {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img}
                alt={product.name}
                loading="lazy"
                className="h-full w-full object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
            ) : (
              <span className="text-sm text-gray-400">No image</span>
            )}
          </div>
          {product.series && (
            <span className="absolute top-3 left-3 rounded-full border border-black/5 bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-mercuryBlack backdrop-blur-sm">
              {product.series}
            </span>
          )}
        </div>

        {/* body */}
        <div className="relative z-10 flex flex-1 flex-col p-5">
          <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-mercurySilver">
            {product.category}
          </span>
          <h3 className="text-lg font-bold text-mercuryWhite mb-3 leading-snug">
            {product.name}
          </h3>

          {specs.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-1.5">
              {specs.map(({ key, icon: Icon, value }) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] font-medium text-mercuryGray"
                >
                  <Icon className="w-3 h-3 text-mercurySilver" strokeWidth={2} aria-hidden="true" />
                  <span className="line-clamp-1 max-w-[9rem]">{value}</span>
                </span>
              ))}
            </div>
          )}

          <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-mercuryWhite">
            <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-mercurySilver/60">
              View details
            </span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ---------- Skeleton + empty ---------- */
function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-mercurySurface">
      <div className="m-3 mb-0 aspect-[4/3] animate-pulse rounded-xl bg-white/[0.06]" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-20 animate-pulse rounded bg-white/[0.06]" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-white/[0.08]" />
        <div className="flex gap-1.5">
          <div className="h-6 w-16 animate-pulse rounded bg-white/[0.05]" />
          <div className="h-6 w-16 animate-pulse rounded bg-white/[0.05]" />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ title, message, action }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-mercurySurface/50 py-20 px-6 text-center">
      <h3 className="text-xl font-bold text-mercuryWhite mb-2">{title}</h3>
      <p className="text-mercuryGray max-w-md mx-auto mb-6">{message}</p>
      {action}
    </div>
  );
}
