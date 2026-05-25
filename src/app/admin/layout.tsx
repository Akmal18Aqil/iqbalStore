import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";
import { LayoutDashboard, Package, Store } from "lucide-react";
import "./admin.css";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          TOKO<span>KITA</span>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          <Link href="/admin" className="admin-nav-item">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/admin/produk" className="admin-nav-item">
            <Package size={18} />
            Produk
          </Link>
          <div style={{ margin: "2rem 0", height: "1px", backgroundColor: "var(--admin-sidebar-active)" }}></div>
          <Link href="/" target="_blank" className="admin-nav-item" style={{ color: "var(--admin-primary)" }}>
            <Store size={18} />
            Lihat Toko
          </Link>
        </nav>
        
        <div style={{ marginTop: "auto", borderTop: "1px solid var(--admin-sidebar-active)", paddingTop: "1.5rem" }}>
          <p style={{ fontSize: "0.875rem", color: "var(--admin-sidebar-text)", marginBottom: "1rem", paddingLeft: "1rem" }}>
            {user?.email}
          </p>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
