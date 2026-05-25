"use client";

import { useEffect, useState, use } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

export default function ProductFormPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const router = useRouter();
  const supabase = createClient();
  const params = use(searchParams);
  interface Category {
    id: string;
    name: string;
  }

  const isEditing = !!params.id;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    compare_at_price: "",
    image_url: "",
    category_id: "",
    is_active: true,
  });

  useEffect(() => {
    async function fetchData() {
      const { data: cats } = await supabase.from("categories").select("*");
      if (cats) setCategories(cats);

      if (isEditing && params.id) {
        const { data: product } = await supabase.from("products").select("*").eq("id", params.id).single();
        if (product) {
          setFormData({
            title: product.title || "",
            slug: product.slug || "",
            description: product.description || "",
            price: product.price?.toString() || "",
            compare_at_price: product.compare_at_price?.toString() || "",
            image_url: product.image_url || "",
            category_id: product.category_id || "",
            is_active: product.is_active ?? true,
          });
        }
      }
    }
    fetchData();
  }, [isEditing, params.id, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      compare_at_price: formData.compare_at_price ? parseFloat(formData.compare_at_price) : null,
      category_id: formData.category_id || null,
    };

    if (isEditing) {
      await supabase.from("products").update(payload).eq("id", params.id);
    } else {
      await supabase.from("products").insert(payload);
    }

    setLoading(false);
    router.push("/admin/produk");
    router.refresh();
  };

  return (
    <div className="admin-animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <button onClick={() => router.back()} className="admin-btn-icon" style={{ border: "1px solid var(--admin-border)", backgroundColor: "white" }}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>{isEditing ? "Edit Produk" : "Tambah Produk"}</h1>
          <p style={{ color: "var(--admin-text-muted)", fontSize: "0.875rem" }}>Pastikan data produk terisi dengan lengkap dan benar.</p>
        </div>
      </div>
      
      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="admin-input-group">
              <label className="admin-label">Nama Produk <span style={{color: "var(--admin-primary)"}}>*</span></label>
              <input 
                type="text" 
                className="admin-input" 
                required 
                placeholder="Contoh: Sepatu Sneakers Pria"
                value={formData.title}
                onChange={e => {
                  const val = e.target.value;
                  setFormData({ ...formData, title: val, slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-') })
                }}
              />
            </div>

            <div className="admin-input-group">
              <label className="admin-label">Slug (URL) <span style={{color: "var(--admin-primary)"}}>*</span></label>
              <input 
                type="text" 
                className="admin-input" 
                required 
                placeholder="sepatu-sneakers-pria"
                value={formData.slug}
                onChange={e => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label className="admin-label">Kategori</label>
            <select 
              className="admin-input" 
              value={formData.category_id}
              onChange={e => setFormData({ ...formData, category_id: e.target.value })}
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="admin-input-group">
              <label className="admin-label">Harga (Rp) <span style={{color: "var(--admin-primary)"}}>*</span></label>
              <input 
                type="number" 
                className="admin-input" 
                required 
                placeholder="0"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="admin-input-group">
              <label className="admin-label">Harga Coret (Rp) - Opsional</label>
              <input 
                type="number" 
                className="admin-input" 
                placeholder="0"
                value={formData.compare_at_price}
                onChange={e => setFormData({ ...formData, compare_at_price: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label className="admin-label">URL Gambar Banner/Produk</label>
            <input 
              type="url" 
              className="admin-input" 
              placeholder="https://..."
              value={formData.image_url}
              onChange={e => setFormData({ ...formData, image_url: e.target.value })}
            />
          </div>

          <div className="admin-input-group">
            <label className="admin-label">Deskripsi Lengkap</label>
            <textarea 
              className="admin-input" 
              rows={6}
              placeholder="Tuliskan spesifikasi, keunggulan, dll."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ 
            display: "flex", alignItems: "center", gap: "0.75rem", 
            padding: "1rem", backgroundColor: "var(--admin-bg)", borderRadius: "var(--admin-radius-sm)",
            marginBottom: "2rem", border: "1px solid var(--admin-border)"
          }}>
            <input 
              type="checkbox" 
              id="is_active"
              checked={formData.is_active}
              onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
              style={{ width: "1.25rem", height: "1.25rem", accentColor: "var(--admin-primary)", cursor: "pointer" }}
            />
            <label htmlFor="is_active" style={{ cursor: "pointer", fontWeight: 500, userSelect: "none" }}>
              Aktifkan Produk Ini
              <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--admin-text-muted)", fontWeight: 400 }}>
                Jika dicentang, produk akan langsung terlihat di katalog depan toko.
              </p>
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", borderTop: "1px solid var(--admin-border)", paddingTop: "1.5rem" }}>
            <button type="button" onClick={() => router.back()} className="admin-btn" style={{ backgroundColor: "#f8fafc", border: "1px solid var(--admin-border)", color: "var(--admin-text-main)" }}>Batal</button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
              <Save size={18} />
              {loading ? "Menyimpan..." : "Simpan Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
