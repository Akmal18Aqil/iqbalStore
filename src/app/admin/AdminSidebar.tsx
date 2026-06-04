"use client"

import Link from "next/link"
import { useState } from "react"
import LogoutButton from "./LogoutButton"
import { LayoutDashboard, Package, Store, Menu, X } from "lucide-react"

export default function AdminSidebar({ email }: { email?: string | null }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="admin-mobile-top">
        <button className="admin-mobile-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <div className="admin-sidebar-brand">TOKO<span>KITA</span></div>
      </header>

      <aside className={`admin-sidebar ${open ? 'mobile-open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-brand">TOKO<span>KITA</span></div>
          <button className="admin-mobile-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={18} /></button>
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
            {email}
          </p>
          <LogoutButton />
        </div>
      </aside>

      {/* Overlay when mobile menu open */}
      {open && <div className="admin-mobile-overlay" onClick={() => setOpen(false)} />}
    </>
  )
}
