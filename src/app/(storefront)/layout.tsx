import Link from 'next/link'
import { ShoppingCart, Heart, Search, Phone, Mail, MapPin } from 'lucide-react'

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Utility Bar */}
      <div style={{
        backgroundColor: 'var(--gray-900)',
        color: 'var(--gray-300)',
        fontSize: '0.75rem',
        padding: '0.5rem 0',
        borderBottom: '1px solid var(--border)',
        zIndex: 60
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Phone size={12} /> +62 812-3456-7890
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Mail size={12} /> cs@tokokita.com
            </span>
          </div>
          <div>
            <span>⚡ Jaminan 100% Original & Garansi Uang Kembali</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Header */}
      <header className="glass" style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '0.85rem 0',
        boxShadow: 'var(--shadow-sm)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          {/* Logo */}
          <Link href="/" style={{ 
            fontSize: '1.5rem', 
            fontWeight: 800, 
            letterSpacing: '-0.03em', 
            color: 'var(--foreground)',
            display: 'flex',
            alignItems: 'center'
          }}>
            TOKO<span style={{ color: 'var(--primary)' }}>KITA</span>
          </Link>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link href="/" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--foreground)' }} className="hover-text-primary">
              Beranda
            </Link>
            <Link href="/katalog" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--foreground)' }}>
              Katalog
            </Link>
            <Link href="/#promo" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--foreground)' }}>
              Promo
            </Link>
            <Link href="/#testimonials" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--foreground)' }}>
              Ulasan
            </Link>
          </nav>

          {/* Action Icons */}
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', color: 'var(--foreground)' }}>
            <Link href="/katalog" aria-label="Cari Produk" style={{ color: 'inherit' }}>
              <Search size={22} style={{ cursor: 'pointer' }} />
            </Link>
            <Link href="#" aria-label="Favorit" style={{ color: 'inherit', display: 'none' }}>
              <Heart size={22} style={{ cursor: 'pointer' }} />
            </Link>
            <Link href="#" aria-label="Keranjang" style={{ 
              color: 'inherit',
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center'
            }}>
              <ShoppingCart size={22} />
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                backgroundColor: 'var(--danger)',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: 700,
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 0 2px var(--background)'
              }}>
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, minHeight: 'calc(100vh - 180px)' }}>
        {children}
      </main>

      {/* Footer Premium Multi-Kolom */}
      <footer style={{
        backgroundColor: 'var(--gray-50)',
        borderTop: '1px solid var(--border)',
        padding: '4rem 0 2rem',
        color: 'var(--foreground)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}>
            {/* Column 1: Brand Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                TOKO<span style={{ color: 'var(--primary)' }}>KITA</span>
              </Link>
              <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: '1.6' }}>
                Destinasi belanja dropship terpercaya di Indonesia. Kami menghadirkan produk kurasi terbaik langsung ke depan pintu rumah Anda dengan harga terjangkau dan jaminan kualitas nomor satu.
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram TokoKita" style={{
                  color: 'var(--gray-500)',
                  backgroundColor: 'var(--gray-100)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-fast)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp TokoKita" style={{
                  color: 'var(--gray-500)',
                  backgroundColor: 'var(--gray-100)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-fast)'
                }}>
                  <Phone size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>Tautan Cepat</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <li><Link href="/" style={{ color: 'var(--gray-500)' }}>Beranda</Link></li>
                <li><Link href="/katalog" style={{ color: 'var(--gray-500)' }}>Katalog Produk</Link></li>
                <li><Link href="/#promo" style={{ color: 'var(--gray-500)' }}>Promo Menarik</Link></li>
                <li><Link href="/#testimonials" style={{ color: 'var(--gray-500)' }}>Ulasan Pelanggan</Link></li>
              </ul>
            </div>

            {/* Column 3: Services & Trust */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>Kebijakan Toko</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <li style={{ color: 'var(--gray-500)' }}>✓ Garansi Uang Kembali 100%</li>
                <li style={{ color: 'var(--gray-500)' }}>✓ Bebas Retur 7 Hari</li>
                <li style={{ color: 'var(--gray-500)' }}>✓ Bayar di Tempat (COD)</li>
                <li style={{ color: 'var(--gray-500)' }}>✓ Layanan Pelanggan Responsif</li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem', letterSpacing: '-0.01em' }}>Hubungi CS Resmi</h3>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: 'var(--gray-500)' }}>
                <MapPin size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Rukan Sentra Bisnis, Jl. Jend. Sudirman Kav. 21, Jakarta Selatan, DKI Jakarta 12920</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--gray-500)' }}>
                <Phone size={18} style={{ flexShrink: 0 }} />
                <span>+62 812-3456-7890 (WhatsApp)</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--gray-500)' }}>
                <Mail size={18} style={{ flexShrink: 0 }} />
                <span>cs@tokokita.com</span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Area */}
          <div style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: 'var(--gray-500)'
          }}>
            <p>&copy; {new Date().getFullYear()} TokoKita. Hak Cipta Dilindungi Undang-Undang.</p>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <Link href="/admin/login" style={{ color: 'var(--gray-300)', transition: 'var(--transition-fast)' }}>
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
