"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createProduct,
  updateProduct,
  uploadProductImage,
  slugify,
} from "@/lib/adminProducts";
import { productImageUrl } from "@/lib/products";

const CATEGORIES = ["laptop", "desktop", "tablet", "phone"];

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-mercurySilver/50 transition-colors";
const labelClass = "block text-sm font-medium text-gray-300 mb-2";

export default function ProductForm({ product }) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [form, setForm] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    category: product?.category || "laptop",
    series: product?.series || "",
    cpu: product?.cpu || "",
    ram: product?.ram || "",
    storage: product?.storage || "",
    display: product?.display || "",
    published: product?.published ?? true,
  });
  const [images, setImages] = useState(product?.images || []);
  const [specs, setSpecs] = useState(
    Object.entries(product?.specs || {}).map(([key, value]) => ({
      key,
      value: String(value),
    }))
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => {
      const next = { ...f, [field]: value };
      // Auto-fill slug from name until the user edits it manually.
      if (field === "name" && (!f.slug || f.slug === slugify(f.name))) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      const urls = [];
      for (const file of files) {
        urls.push(await uploadProductImage(file));
      }
      setImages((prev) => [...prev, ...urls]);
    } catch (err) {
      setError(err.message || "Image upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (idx) =>
    setImages((prev) => prev.filter((_, i) => i !== idx));

  const updateSpec = (idx, field) => (e) =>
    setSpecs((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: e.target.value } : s))
    );
  const addSpec = () => setSpecs((prev) => [...prev, { key: "", value: "" }]);
  const removeSpec = (idx) =>
    setSpecs((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const specsObject = specs.reduce((acc, { key, value }) => {
        if (key.trim()) acc[key.trim()] = value;
        return acc;
      }, {});
      const payload = {
        name: form.name,
        slug: form.slug || slugify(form.name),
        category: form.category,
        series: form.series || null,
        cpu: form.cpu,
        ram: form.ram,
        storage: form.storage,
        display: form.display,
        images,
        published: form.published,
        specs: specsObject,
      };
      if (isEdit) {
        await updateProduct(product.id, payload);
      } else {
        await createProduct(payload);
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to save product");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {/* Basics */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} htmlFor="name">
              Name
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={update("name")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="slug">
              Slug
            </label>
            <input
              id="slug"
              required
              value={form.slug}
              onChange={update("slug")}
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={form.category}
              onChange={update("category")}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-mercuryDark capitalize">
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="series">
              Series (optional)
            </label>
            <input
              id="series"
              value={form.series}
              onChange={update("series")}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Key specs */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-semibold text-white">Key Specifications</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            ["cpu", "Processor"],
            ["ram", "Memory"],
            ["storage", "Storage"],
            ["display", "Display"],
          ].map(([field, label]) => (
            <div key={field}>
              <label className={labelClass} htmlFor={field}>
                {label}
              </label>
              <input
                id={field}
                value={form[field]}
                onChange={update(field)}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Additional specs */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Additional Specs
          </h2>
          <button
            type="button"
            onClick={addSpec}
            className="text-sm px-3 py-1.5 rounded-lg bg-white/5 text-gray-200 hover:bg-white/10 transition-colors"
          >
            + Add
          </button>
        </div>
        {specs.length === 0 && (
          <p className="text-gray-500 text-sm">No additional specs.</p>
        )}
        {specs.map((spec, idx) => (
          <div key={idx} className="flex gap-3">
            <input
              placeholder="Key (e.g. Battery)"
              value={spec.key}
              onChange={updateSpec(idx, "key")}
              className={inputClass}
            />
            <input
              placeholder="Value (e.g. 8 hours)"
              value={spec.value}
              onChange={updateSpec(idx, "value")}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => removeSpec(idx)}
              className="px-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
              aria-label="Remove spec"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Images */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-semibold text-white">Images</h2>
        {images.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <div className="w-24 h-24 rounded-lg bg-white overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={productImageUrl(img, "thumb")}
                    alt=""
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
                  aria-label="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20 file:cursor-pointer"
          />
          {uploading && (
            <p className="text-gray-400 text-sm mt-2">Uploading…</p>
          )}
        </div>
      </div>

      {/* Publish + submit */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={update("published")}
            className="w-4 h-4 accent-mercurySilver"
          />
          Published
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="btn-premium btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || uploading}
            className="btn-premium btn-primary disabled:opacity-60"
          >
            {saving ? "Saving…" : isEdit ? "Update Product" : "Create Product"}
          </button>
        </div>
      </div>
    </form>
  );
}
