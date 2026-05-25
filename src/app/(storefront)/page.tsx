import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Truck, ShieldCheck, MessageCircle, Coins, ArrowRight, Star } from "lucide-react";

export const revalidate = 60; // ISR every 60 seconds

export default async function Home() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .limit(4);

  const { data: categories } = await supabase
    .from("categories")
    .select("*");

  // SEO Structur Data (JSON-LD) for Homepage
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TokoKita",
    "url": "https://tokokita.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://tokokita.com/katalog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TokoKita",
    "url": "https://tokokita.com",
    "logo": "https://tokokita.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-812-3456-7890",
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": "Indonesian"
    },
    "sameAs": [
      "https://instagram.com/tokokita",
      "https://tiktok.com/@tokokita"
    ]
  };

  return (
    <div style={{ overflow: "hidden" }}>
      {/* Dynamic SEO JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Section */}
      <section style={{ 
        position: "relative",
        background: "radial-gradient(circle at 80% 20%, var(--primary-glow) 0%, transparent 50%), linear-gradient(180deg, var(--gray-50) 0%, var(--background) 100%)", 
        padding: "5rem 0", 
        borderBottom: "1px solid var(--border)" 
      }} className="animate-fade-in">
        <div className="container" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "4rem", 
          alignItems: "center" 
        }}>
          {/* Hero Left Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="animate-slide-up">
            <div style={{ display: "inline-flex" }}>
              <span className="badge badge-primary" style={{ fontSize: "0.8rem", letterSpacing: "0.05em", fontWeight: 700 }}>
                ✨ KOLEKSI TERBARU 2026
              </span>
            </div>
            <h1 className="text-gradient" style={{ 
              fontSize: "clamp(2.5rem, 5vw, 3.75rem)", 
              fontWeight: 800, 
              lineHeight: "1.15", 
              letterSpacing: "-0.04em" 
            }}>
              Ekspresikan Gayamu Setiap Hari
            </h1>
            <p style={{ 
              fontSize: "1.125rem", 
              color: "var(--gray-500)", 
              maxWidth: "520px",
              lineHeight: "1.7"
            }}>
              Temukan produk fashion & aksesoris eksklusif pilihan langsung dari tangan pertama. Belanja praktis, garansi original, gratis ongkir se-Indonesia.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <Link href="/katalog" className="btn btn-primary" style={{ padding: "1rem 2.25rem" }}>
                Belanja Sekarang <ArrowRight size={18} />
              </Link>
              <a href="#promo" className="btn btn-outline" style={{ padding: "1rem 2.25rem" }}>
                Lihat Promo
              </a>
            </div>
          </div>

          {/* Hero Right Graphic */}
          <div style={{ 
            position: "relative", 
            width: "100%", 
            height: "460px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {/* Glowing backdrop decorator */}
            <div style={{
              position: "absolute",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background: "var(--primary)",
              opacity: 0.15,
              filter: "blur(50px)",
              zIndex: 0
            }}></div>
            <div className="hover-lift" style={{ 
              position: "relative",
              width: "90%",
              height: "100%",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              boxShadow: "var(--shadow-premium)",
              border: "1px solid var(--border)",
              zIndex: 1
            }}>
              <Image 
                src="/hero-banner.png"
                alt="Produk Unggulan TokoKita"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 550px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits / Trust Features */}
      <section style={{ padding: "4.5rem 0", backgroundColor: "var(--background)" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem"
          }}>
            {/* Feature 1 */}
            <div className="hover-lift" style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "2rem",
              boxShadow: "var(--shadow-sm)"
            }}>
              <div style={{
                color: "var(--primary)",
                backgroundColor: "var(--primary-light)",
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem"
              }}>
                <Truck size={24} />
              </div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>Gratis Ongkir</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--gray-500)" }}>Layanan gratis pengiriman ke seluruh penjuru Indonesia tanpa minimal belanja.</p>
            </div>

            {/* Feature 2 */}
            <div className="hover-lift" style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "2rem",
              boxShadow: "var(--shadow-sm)"
            }}>
              <div style={{
                color: "var(--accent)",
                backgroundColor: "var(--accent-light)",
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem"
              }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>100% Original</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--gray-500)" }}>Semua barang lolos kurasi ketat dan dijamin asli langsung dari supplier utama.</p>
            </div>

            {/* Feature 3 */}
            <div className="hover-lift" style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "2rem",
              boxShadow: "var(--shadow-sm)"
            }}>
              <div style={{
                color: "var(--primary)",
                backgroundColor: "var(--primary-light)",
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem"
              }}>
                <MessageCircle size={24} />
              </div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>CS Responsif 24/7</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--gray-500)" }}>Tim customer support kami siaga membantu pesanan Anda kapan saja via WhatsApp.</p>
            </div>

            {/* Feature 4 */}
            <div className="hover-lift" style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "2rem",
              boxShadow: "var(--shadow-sm)"
            }}>
              <div style={{
                color: "var(--accent)",
                backgroundColor: "var(--accent-light)",
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem"
              }}>
                <Coins size={24} />
              </div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>Bayar Di Tempat (COD)</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--gray-500)" }}>Bayar pesanan secara aman setelah paket sampai di depan pintu rumah Anda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories (Curated Showcase) */}
      <section style={{ padding: "4.5rem 0", backgroundColor: "var(--gray-50)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge badge-accent" style={{ marginBottom: "0.5rem" }}>EKSPLORASI</span>
            <h2 className="text-2xl font-bold" style={{ fontSize: "2rem", letterSpacing: "-0.02em" }}>Kategori Pilihan</h2>
            <p style={{ color: "var(--gray-500)", marginTop: "0.5rem" }}>Cari produk spesifik sesuai dengan kebutuhan gaya hidupmu</p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem"
          }}>
            {categories && categories.map((cat, index) => {
              const gradients = [
                "linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(9, 79, 43, 0.9) 100%)", // Emerald
                "linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(49, 46, 129, 0.9) 100%)", // Indigo
                "linear-gradient(135deg, rgba(236, 72, 153, 0.4) 0%, rgba(131, 24, 67, 0.9) 100%)", // Pink/Rose
                "linear-gradient(135deg, rgba(245, 158, 11, 0.4) 0%, rgba(146, 64, 14, 0.9) 100%)", // Amber/Gold
              ];
              const gradient = gradients[index % gradients.length];

              return (
                <Link href={`/katalog?kategori=${cat.id}`} key={cat.id} className="hover-lift" style={{
                  position: "relative",
                  height: "220px",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-md)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "1.5rem"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: gradient,
                    zIndex: 0
                  }}></div>
                  <div style={{ zIndex: 1, color: "white" }}>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 800, textTransform: "uppercase" }}>{cat.name}</h3>
                    <p style={{ fontSize: "0.875rem", opacity: 0.85, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      Lihat Koleksi <ArrowRight size={14} />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: "5rem 0", backgroundColor: "var(--background)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: "0.5rem" }}>REKOMENDASI</span>
              <h2 className="text-2xl font-bold" style={{ fontSize: "2rem", letterSpacing: "-0.020em" }}>Produk Unggulan</h2>
            </div>
            <Link href="/katalog" style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
              Lihat Semua Produk <ArrowRight size={16} />
            </Link>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "2.5rem"
          }}>
            {products && products.length > 0 ? (
              products.map((product) => {
                // Calculate discount percentage
                const discount = product.compare_at_price 
                  ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100) 
                  : 0;

                return (
                  <Link href={`/produk/${product.slug}`} key={product.id} className="hover-lift" style={{ 
                    display: "block",
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-sm)"
                  }}>
                    {/* Image Area */}
                    <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", backgroundColor: "var(--gray-50)", overflow: "hidden" }}>
                      {/* Sale Badge */}
                      {discount > 0 && (
                        <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 10 }}>
                          <span className="badge badge-sale-dark" style={{ fontSize: "0.68rem" }}>
                            DISKON {discount}%
                          </span>
                        </div>
                      )}
                      
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.title}
                          fill
                          style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                          sizes="(max-width: 768px) 100vw, 280px"
                          className="product-image"
                        />
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--gray-300)" }}>
                          No Image
                        </div>
                      )}
                    </div>
                    
                    {/* Content Area */}
                    <div style={{ padding: "1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.5rem" }}>
                        <div className="rating-stars">
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "var(--gray-500)", fontWeight: 500 }}>
                          (4.9)
                        </span>
                      </div>
                      <h3 className="font-medium" style={{ 
                        fontSize: "1rem", 
                        marginBottom: "0.75rem",
                        color: "var(--foreground)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        height: "2.4rem",
                        lineHeight: "1.2"
                      }}>
                        {product.title}
                      </h3>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span className="font-bold" style={{ color: "var(--primary)", fontSize: "1.125rem" }}>
                          Rp {product.price.toLocaleString("id-ID")}
                        </span>
                        {product.compare_at_price && (
                          <span style={{ textDecoration: "line-through", color: "var(--gray-300)", fontSize: "0.8125rem" }}>
                            Rp {product.compare_at_price.toLocaleString("id-ID")}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div style={{ gridColumn: "1 / -1", padding: "4rem 0" }}>
                <p className="text-center" style={{ color: "var(--gray-500)", fontSize: "1rem" }}>
                  Belum ada produk unggulan yang aktif di toko kami.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{ padding: "5rem 0", backgroundColor: "var(--gray-50)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="badge badge-primary" style={{ marginBottom: "0.5rem" }}>SOSIAL PROOF</span>
            <h2 className="text-2xl font-bold" style={{ fontSize: "2rem", letterSpacing: "-0.020em" }}>Ulasan Pembeli</h2>
            <p style={{ color: "var(--gray-500)", marginTop: "0.5rem" }}>Apa kata pelanggan setia mengenai pengalaman berbelanja di TokoKita</p>
          </div>

          <div className="testimonial-grid">
            {/* Review 1 */}
            <div style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "2rem",
              boxShadow: "var(--shadow-sm)"
            }} className="hover-lift testimonial-card">
              <div style={{ display: "flex", gap: "0.25rem", color: "hsl(45, 100%, 50%)", marginBottom: "1rem" }}>
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--foreground)", fontStyle: "italic", marginBottom: "1.5rem" }}>
                &quot;Sumpah bagus banget bajunya! Ukurannya pas sesuai deskripsi dan jahitannya rapi banget. Adminnya juga gercep balas WA, barang langsung dikirim hari yang sama.&quot;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary-light)",
                  color: "var(--primary)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  AN
                </div>
                <div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 700 }}>Aulia Ningsih</h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: 600 }}>✓ Verified Buyer</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "2rem",
              boxShadow: "var(--shadow-sm)"
            }} className="hover-lift testimonial-card">
              <div style={{ display: "flex", gap: "0.25rem", color: "hsl(45, 100%, 50%)", marginBottom: "1rem" }}>
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--foreground)", fontStyle: "italic", marginBottom: "1.5rem" }}>
                &quot;Awalnya ragu karena harganya murah, ternyata pas barang datang beneran original dan premium. Kacamata hitamnya keren dan dapet hardcase gratis juga. Recommended!&quot;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-light)",
                  color: "var(--accent)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  RS
                </div>
                <div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 700 }}>Rian Saputra</h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: 600 }}>✓ Verified Buyer</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "2rem",
              boxShadow: "var(--shadow-sm)"
            }} className="hover-lift testimonial-card">
              <div style={{ display: "flex", gap: "0.25rem", color: "hsl(45, 100%, 50%)", marginBottom: "1rem" }}>
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--foreground)", fontStyle: "italic", marginBottom: "1.5rem" }}>
                &quot;Sangat terbantu belanja COD di sini. Kurir ramah dan cepat sampai, bayar pas paket di tangan. Produk arloji nya elegan banget cocok buat kerja harian.&quot;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary-light)",
                  color: "var(--primary)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  DW
                </div>
                <div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 700 }}>Dewi Lestari</h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: 600 }}>✓ Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner / Call To Action Section */}
      <section id="promo" style={{ padding: "6rem 0", position: "relative" }}>
        <div className="container">
          <div style={{
            background: "linear-gradient(135deg, var(--gray-900) 0%, var(--primary-hover) 100%)",
            borderRadius: "var(--radius-lg)",
            padding: "4rem 3rem",
            color: "white",
            textAlign: "center",
            boxShadow: "var(--shadow-lg)",
            position: "relative",
            overflow: "hidden"
          }} className="hover-lift">
            {/* Ambient visual element */}
            <div style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              zIndex: 0
            }}></div>
            <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <span style={{
                color: "var(--primary)",
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                padding: "0.4rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                alignSelf: "center"
              }}>
                🔥 DISKON SPESIAL HARI INI
              </span>
              <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: "1.2" }}>
                Dapatkan Voucher Diskon 10% Untuk Pembelian Pertamamu!
              </h2>
              <p style={{ opacity: 0.8, fontSize: "1rem", lineHeight: "1.6" }}>
                Hubungi Admin kami sekarang di WhatsApp untuk menukarkan voucher khusus ini. Berlaku untuk seluruh produk katalog tanpa batas minimum pembelian.
              </p>
              <div style={{ marginTop: "1rem" }}>
                <a href="https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20ingin%20klaim%20Voucher%20Diskon%2010%25%20untuk%20pembelian%20pertama." target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ padding: "1rem 2.5rem", fontSize: "1rem" }}>
                  <MessageCircle size={20} fill="currentColor" /> Klaim Diskon via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
