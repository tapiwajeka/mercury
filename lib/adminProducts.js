import { supabase } from "./supabase";
import { PRODUCT_BUCKET } from "./products";

export function slugify(text) {
  return (text || "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Fetch every product (published or not) for the admin list.
export async function fetchAllProducts() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("category", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getProductById(id) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// Upload an image file and return its public URL. Stored as a full URL so the
// public site's image resolver passes it straight through.
export async function uploadProductImage(file) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${slugify(
    file.name.replace(/\.[^.]+$/, "")
  )}.${ext}`;
  const { error } = await supabase.storage
    .from(PRODUCT_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function createProduct(payload) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from("products")
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id, payload) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}
