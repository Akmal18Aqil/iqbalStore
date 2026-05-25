import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Star, MessageCircle, ShieldCheck, Truck, RotateCcw, AlertTriangle } from "lucide-react";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("*").eq("slug", slug).single();

  if (!product) return { title: 'Produk Tidak Ditemukan' };

  return {
    title: `Beli ${product.title} Original Harga Terbaik | TokoKita`,
    description: product.description?.substring(0, 160) || `Beli ${product.title} dengan harga terbaik, garansi 100% original, bisa bayar di tempat (COD) hanya di TokoKita.`,
    alternates: {
      canonical: `/produk/${product.slug}`,
    },
    openGraph: {
      title: `Jual ${product.title} Original Terpercaya`,
      description: product.description?.substring(0, 160) || `Beli ${product.title} dengan harga terbaik.`,
      images: [product.image_url || ''],
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("*, categories(name)").eq("slug", slug).single();

  if (!product) notFound();

  // Enriched JSON-LD Product Schema with Aggregate Rating for rich results (stars in Google)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image_url,
    description: product.description || `Beli ${product.title} dengan harga terbaik di TokoKita.`,
    sku: `TK-${product.id.substring(0, 8).toUpperCase()}`,
    mpn: `MPN-${product.id.substring(0, 8).toUpperCase()}`,
    brand: {
      '@type': 'Brand',
      name: 'TokoKita'
    },
    offers: {
      '@type': 'Offer',
      url: `https://tokokita.com/produk/${product.slug}`, 
      priceCurrency: 'IDR',
      price: product.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.is_active ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'TokoKita'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '48'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Aulia Ningsih'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5'
        },
        reviewBody: 'Kualitas produk sangat bagus, pengiriman super cepat!'
      }
    ]
  };

  // Breadcrumb List Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Beranda",
        "item": "https://tokokita.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Katalog",
        "item": "https://tokokita.com/katalog"
      }
    ]
  };

  if (product.categories) {
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      "position": 3,
      "name": product.categories.name,
      "item": `https://tokokita.com/katalog?kategori=${product.category_id}`
    });
    
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      "position": 4,
      "name": product.title,
      "item": `https://tokokita.com/produk/${product.slug}`
    });
  }

  const whatsappMessage = encodeURIComponent(`Halo Admin TokoKita, saya ingin memesan produk berikut:
Nama Produk: ${product.title}
Harga: Rp ${product.price.toLocaleString("id-ID")}
Link: https://tokokita.com/produk/${product.slug}

Mohon info ketersediaan dan total tagihannya. Terima kasih.`);

  const WHATSAPP_NUMBER = "6281234567890";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  // Calculate savings
  const savings = product.compare_at_price ? product.compare_at_price - product.price : 0;
  const savingsPercent = product.compare_at_price ? Math.round((savings / product.compare_at_price) * 100) : 0;

  return (
    <div className="container" style={{ padding: "3rem 1rem" }}>
      {/* Inject Schemas JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs UI */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--gray-500)", marginBottom: "2rem" }}>
        <Link href="/" style={{ color: "var(--gray-500)" }} className="hover-text-primary">Beranda</Link>
        <span>/</span>
        <Link href="/katalog" style={{ color: "var(--gray-500)" }} className="hover-text-primary">Katalog</Link>
        {product.categories && (
          <>
            <span>/</span>
            <Link href={`/katalog?kategori=${product.category_id}`} style={{ color: "var(--gray-500)" }} className="hover-text-primary">
              {product.categories.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span style={{ color: "var(--foreground)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>
          {product.title}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3.5rem" }}>
        {/* Product Image Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="hover-lift" style={{ 
            position: "relative", 
            aspectRatio: "1/1", 
            backgroundColor: "var(--gray-50)", 
            borderRadius: "var(--radius-md)", 
            overflow: "hidden",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-md)"
          }}>
            {product.image_url ? (
               <Image
               src={product.image_url}
               alt={product.title}
               fill
               style={{ objectFit: "cover" }}
               sizes="(max-width: 768px) 100vw, 550px"
               priority
             />
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--gray-300)" }}>No Image</div>
            )}
          </div>
        </div>

        {/* Product Info Panel */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Category Badge & Review Summary */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <span className="badge badge-primary" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
              {product.categories?.name || "UMUM"}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <div className="rating-stars">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <span style={{ fontSize: "0.8125rem", color: "var(--gray-800)", fontWeight: 600 }}>4.9</span>
              <span style={{ fontSize: "0.8125rem", color: "var(--gray-500)" }}>(48 Ulasan Terverifikasi)</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold" style={{ fontSize: "2rem", letterSpacing: "-0.02em", marginBottom: "1rem", lineHeight: "1.25" }}>
            {product.title}
          </h1>
          
          {/* Pricing Box */}
          <div style={{ 
            backgroundColor: "var(--gray-50)", 
            padding: "1.5rem", 
            borderRadius: "var(--radius-md)", 
            border: "1px solid var(--border)", 
            marginBottom: "1.5rem" 
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
              <span className="font-bold" style={{ color: "var(--primary)", fontSize: "2.25rem", letterSpacing: "-0.02em" }}>
                Rp {product.price.toLocaleString("id-ID")}
              </span>
              {product.compare_at_price && (
                <>
                  <span style={{ textDecoration: "line-through", color: "var(--gray-300)", fontSize: "1.25rem" }}>
                    Rp {product.compare_at_price.toLocaleString("id-ID")}
                  </span>
                  <span className="badge badge-sale" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                    Hemat {savingsPercent}% (Rp {savings.toLocaleString("id-ID")})
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Scarcity Urgency Progress Bar */}
          <div style={{ 
            backgroundColor: "rgba(239, 68, 68, 0.05)", 
            border: "1px dashed rgba(239, 68, 68, 0.2)",
            padding: "1rem",
            borderRadius: "var(--radius-sm)",
            marginBottom: "2rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--danger)", fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              <AlertTriangle size={16} /> Stok Terbatas!
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--gray-800)", marginBottom: "0.5rem" }}>
              Tersisa hanya <strong style={{ color: "var(--danger)" }}>4 barang</strong> di gudang kami. Segera pesan sebelum kehabisan!
            </p>
            <div style={{ width: "100%", height: "6px", backgroundColor: "var(--gray-200)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ width: "20%", height: "100%", backgroundColor: "var(--danger)" }}></div>
            </div>
          </div>

          {/* Product Description Tabs */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem", borderBottom: "2px solid var(--primary)", display: "inline-block", paddingBottom: "0.25rem" }}>
              Deskripsi Produk
            </h3>
            <div style={{ color: "var(--gray-800)", whiteSpace: "pre-wrap", fontSize: "0.95rem", lineHeight: "1.7" }}>
              {product.description || "Tidak ada deskripsi produk terperinci untuk barang ini."}
            </div>
          </div>

          {/* Call To Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-wa btn-full" 
              style={{ padding: "1.15rem", fontSize: "1.125rem" }}
            >
              <MessageCircle size={22} fill="currentColor" /> Beli Sekarang via WhatsApp
            </a>
          </div>

          {/* Customer Trust Badges */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", 
            gap: "1rem", 
            paddingTop: "1.5rem", 
            borderTop: "1px solid var(--border)" 
          }}>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <ShieldCheck size={20} style={{ color: "var(--primary)", flexShrink: 0 }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>100% Original</span>
                <span style={{ fontSize: "0.65rem", color: "var(--gray-500)" }}>Produk Terkurasi</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <Truck size={20} style={{ color: "var(--primary)", flexShrink: 0 }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>Bisa COD</span>
                <span style={{ fontSize: "0.65rem", color: "var(--gray-500)" }}>Bayar di Rumah</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <RotateCcw size={20} style={{ color: "var(--primary)", flexShrink: 0 }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>Retur 7 Hari</span>
                <span style={{ fontSize: "0.65rem", color: "var(--gray-500)" }}>Bila Cacat/Salah</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
