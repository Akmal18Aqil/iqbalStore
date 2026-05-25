import { createClient } from "@/lib/supabase/server";
import { Package, Activity } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  const { count: productCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: activeProductCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  return (
    <div className="admin-animate-fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 700, marginBottom: "0.5rem" }}>Dashboard Overview</h1>
        <p style={{ color: "var(--admin-text-muted)" }}>Selamat datang di panel admin TokoKita.</p>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        
        <div className="admin-card admin-metric-card">
          <div className="admin-metric-header">
            <h3 className="admin-metric-title">Total Produk</h3>
            <div className="admin-metric-icon">
              <Package size={20} />
            </div>
          </div>
          <div style={{ marginTop: "auto" }}>
            <p className="admin-metric-value">{productCount || 0}</p>
            <p style={{ fontSize: "0.875rem", color: "var(--admin-text-muted)", marginTop: "0.5rem" }}>
              Total produk di database
            </p>
          </div>
        </div>
        
        <div className="admin-card admin-metric-card">
          <div className="admin-metric-header">
            <h3 className="admin-metric-title">Produk Aktif</h3>
            <div className="admin-metric-icon" style={{ color: "#059669", backgroundColor: "#d1fae5" }}>
              <Activity size={20} />
            </div>
          </div>
          <div style={{ marginTop: "auto" }}>
            <p className="admin-metric-value">{activeProductCount || 0}</p>
            <p style={{ fontSize: "0.875rem", color: "var(--admin-text-muted)", marginTop: "0.5rem" }}>
              Tampil di katalog toko
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
