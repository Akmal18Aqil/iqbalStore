import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Package } from "lucide-react";
import DeleteProductButton from "./DeleteProductButton";

export default async function AdminProdukPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="admin-animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.875rem", fontWeight: 700, marginBottom: "0.25rem" }}>Manajemen Produk</h1>
          <p style={{ color: "var(--admin-text-muted)", fontSize: "0.875rem" }}>Kelola katalog produk, harga, dan ketersediaan.</p>
        </div>
        <Link href="/admin/produk/form" className="admin-btn admin-btn-primary">
          <Plus size={18} /> Tambah Produk
        </Link>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Produk</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ position: "relative", width: "48px", height: "48px", backgroundColor: "#f1f5f9", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--admin-border)", flexShrink: 0 }}>
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--admin-text-muted)", fontSize: "0.625rem" }}>N/A</div>
                        )}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, color: "var(--admin-text-main)", marginBottom: "0.125rem" }}>{product.title}</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--admin-text-muted)" }}>/{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "var(--admin-text-muted)", fontSize: "0.875rem" }}>
                    {product.categories?.name || "-"}
                  </td>
                  <td>
                    <p style={{ fontWeight: 500 }}>Rp {product.price.toLocaleString("id-ID")}</p>
                    {product.compare_at_price && (
                      <p style={{ fontSize: "0.75rem", textDecoration: "line-through", color: "var(--admin-text-muted)" }}>
                        Rp {product.compare_at_price.toLocaleString("id-ID")}
                      </p>
                    )}
                  </td>
                  <td>
                    <span className={`admin-badge ${product.is_active ? "admin-badge-active" : "admin-badge-inactive"}`}>
                      {product.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.25rem" }}>
                      <Link href={`/admin/produk/form?id=${product.id}`} className="admin-btn-icon" title="Edit Produk">
                        <Edit size={18} />
                      </Link>
                      <DeleteProductButton id={product.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--admin-text-muted)" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                    <Package size={48} style={{ opacity: 0.2 }} />
                    <p>Belum ada produk. Silakan tambahkan produk pertama Anda.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
