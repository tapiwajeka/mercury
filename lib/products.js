import { supabase } from "./supabase";

export const PRODUCT_BUCKET = "product-images";

const FALLBACK_PRODUCTS = [
  {
    id: "fallback-mercury-laptop-i7",
    slug: "mercury-laptop-intel-core-i7-1255u",
    name: "Mercury Laptop",
    category: "Laptops",
    series: "Performance",
    cpu: "Intel Core i7, 1255U Processors",
    ram: "16GB LPDDR5",
    storage: "1TB PCIE3.0 SSD",
    display: "",
    images: ["/assets/laptop-mock.webp"],
    published: true,
    specs: {
      connectivity: "Bluetooth 5.2, WiFi 802.11 a/b/g/n/ac/ax",
    },
  },
  {
    id: "fallback-mercury-laptop-i5",
    slug: "mercury-laptop-intel-core-i5-1235u",
    name: "Mercury Laptop",
    category: "Laptops",
    series: "Balanced",
    cpu: "Intel Core i5, 1235U Processors",
    ram: "16GB LPDDR5",
    storage: "512GB PCIE3.0 SSD",
    display: "",
    images: ["/assets/laptop-mock.webp"],
    published: true,
    specs: {
      connectivity: "Bluetooth 5.2, WiFi 802.11 a/b/g/n/ac/ax",
    },
  },
];

// Resolve a stored image reference to a public URL, matching the live site:
// absolute URLs / root paths pass through; bare names resolve to webp in the
// product-images storage bucket (optionally the "-thumb" variant).
export function productImageUrl(path, variant = "full") {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("/")
  ) {
    return path;
  }
  if (!supabase) return "";
  const file = variant === "thumb" ? `${path}-thumb.webp` : `${path}.webp`;
  const { data } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(file);
  return data?.publicUrl || "";
}

function mapProduct(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    series: row.series ?? undefined,
    cpu: row.cpu ?? "",
    ram: row.ram ?? "",
    storage: row.storage ?? "",
    display: row.display ?? "",
    images: row.images ?? [],
    published: row.published ?? true,
    specs: row.specs ?? {},
    createdAt: row.created_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  };
}

export async function fetchProducts() {
  if (!supabase) return FALLBACK_PRODUCTS.map(mapProduct);
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("published", true)
    .order("category", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw error;
  const products = (data ?? []).map(mapProduct);
  return products.length > 0 ? products : FALLBACK_PRODUCTS.map(mapProduct);
}

export async function fetchProductBySlug(slug) {
  if (!supabase) {
    const fallback = FALLBACK_PRODUCTS.find((product) => product.slug === slug);
    return fallback ? mapProduct(fallback) : null;
  }
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProduct(data) : null;
}
