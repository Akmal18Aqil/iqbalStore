import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Search, Filter, Star } from "lucide-react";

export const revalidate = 60;

export const metadata = {
  title: 'Katalog Produk Lengkap | TokoKita',
  description: 'Jelajahi berbagai koleksi produk fashion dan lifestyle terbaik dengan harga bersahabat di TokoKita. Pengiriman cepat dan garansi uang kembali.',
}

export default async function KatalogPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ kategori?: string; q?: string; sort?: string }> 
}) {
  const supabase = await createClient();
  const params = await searchParams;
  
  // Fetch Categories
  const { data: categories } = await supabase.from("categories").select("*");
  
  // Build Products Query
  let query = supabase.from("products").select("*, categories(name)").eq("is_active", true);
  
  // Filter by Category
  if (params.kategori) {
    query = query.eq("category_id", params.kategori);
  }
  
  // Filter by Search Query
  if (params.q) {
    query = query.ilike("title", `%${params.q}%`);
  }
  
  // Sort Products
  if (params.sort === "price_asc") {
    query = query.order("price", { ascending: true });
  } else if (params.sort === "price_desc") {
    query = query.order("price", { ascending: false });
  } else {
    // Default sort: newest
    query = query.order("created_at", { ascending: false });
  }
  
  const { data: products } = await query;
  const activeCategory = categories?.find(c => c.id === params.kategori);

  // SEO Breadcrumb List Schema
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

  if (activeCategory) {
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      "position": 3,
      "name": activeCategory.name,
      "item": `https://tokokita.com/katalog?kategori=${activeCategory.id}`
    });
  }

  return (
    <div className="container" style={{ padding: "3rem 1rem" }}>
      {/* Inject Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs UI */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--gray-500)", marginBottom: "1.5rem" }}>
        <Link href="/" style={{ color: "var(--gray-500)" }} className="hover-text-primary">Beranda</Link>
        <span>/</span>
        {activeCategory ? (
          <>
            <Link href="/katalog" style={{ color: "var(--gray-500)" }} className="hover-text-primary">Katalog</Link>
            <span>/</span>
            <span style={{ color: "var(--foreground)", fontWeight: 500 }}>{activeCategory.name}</span>
          </>
        ) : (
          <span style={{ color: "var(--foreground)", fontWeight: 500 }}>Katalog</span>
        )}
      </div>

      <div style={{ marginBottom: "2.5rem" }}>
        <h1 className="text-2xl font-bold" style={{ fontSize: "2.25rem", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
          {activeCategory ? `Kategori: ${activeCategory.name}` : "Semua Produk"}
        </h1>
        <p style={{ color: "var(--gray-500)" }}>
          Menampilkan {products ? products.length : 0} produk berkualitas tinggi untuk menyempurnakan gaya hidup Anda.
        </p>
      </div>
      
      {/* Filter and Search Section */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "2rem",
        marginBottom: "3rem"
      }}>
        {/* Search & Sort Panel */}
        <form method="GET" action="/katalog" style={{
          backgroundColor: "var(--gray-50)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1.25rem",
          alignItems: "center"
        }}>
          {/* Preserve category parameter */}
          {params.kategori && <input type="hidden" name="kategori" value={params.kategori} />}

          {/* Search Box */}
          <div style={{ flex: "2 1 300px", position: "relative" }}>
            <input 
              type="text" 
              name="q" 
              defaultValue={params.q || ""} 
              placeholder="Cari nama produk..." 
              className="input-field"
              style={{ width: "100%", paddingLeft: "2.75rem", marginBottom: 0 }}
            />
            <Search size={18} style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--gray-300)"
            }} />
          </div>

          {/* Sorting Box */}
          <div style={{ flex: "1 1 200px" }}>
            <select 
              name="sort" 
              defaultValue={params.sort || ""}
              className="input-field"
              style={{ width: "100%", cursor: "pointer", marginBottom: 0, paddingRight: "2rem" }}
            >
              <option value="">Urutan Default (Terbaru)</option>
              <option value="price_asc">Harga: Termurah</option>
              <option value="price_desc">Harga: Termahal</option>
            </select>
          </div>

          {/* Filter Action Buttons */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button type="submit" className="btn btn-primary" style={{ padding: "0.875rem 1.5rem" }}>
              Terapkan Filter
            </button>
            {(params.q || params.sort || params.kategori) && (
              <Link href="/katalog" className="btn btn-outline" style={{ padding: "0.875rem 1.5rem" }}>
                Reset
              </Link>
            )}
          </div>
        </form>

        {/* Category Pills Selector */}
        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Filter size={16} /> Pilih Kategori
          </h3>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link 
              href={params.q || params.sort ? `/katalog?${params.q ? `q=${params.q}&` : ''}${params.sort ? `sort=${params.sort}` : ''}` : '/katalog'}
              className={`btn ${!params.kategori ? "btn-primary" : "btn-outline"}`}
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem", borderRadius: "9999px" }}
            >
              Semua Produk
            </Link>
            {categories?.map(c => {
              // Construct URL preserves other params
              const queryParams = new URLSearchParams();
              queryParams.set("kategori", c.id);
              if (params.q) queryParams.set("q", params.q);
              if (params.sort) queryParams.set("sort", params.sort);

              return (
                <Link 
                  key={c.id} 
                  href={`/katalog?${queryParams.toString()}`} 
                  className={`btn ${params.kategori === c.id ? "btn-primary" : "btn-outline"}`}
                  style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem", borderRadius: "9999px" }}
                >
                  {c.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "2.5rem",
      }}>
        {products && products.length > 0 ? (
          products.map((product) => {
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
                <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", backgroundColor: "var(--gray-50)", overflow: "hidden" }}>
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
                      sizes="(max-width: 768px) 100vw, 260px"
                      className="product-image"
                    />
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--gray-300)" }}>
                      No Image
                    </div>
                  )}
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <p className="text-sm" style={{ color: "var(--primary)", fontWeight: 600, marginBottom: "0.25rem", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                    {product.categories?.name}
                  </p>
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
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.75rem" }}>
                    <div className="rating-stars">
                      <Star size={11} fill="currentColor" />
                      <Star size={11} fill="currentColor" />
                      <Star size={11} fill="currentColor" />
                      <Star size={11} fill="currentColor" />
                      <Star size={11} fill="currentColor" />
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "var(--gray-500)", fontWeight: 500 }}>
                      (4.9)
                    </span>
                  </div>

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
          <div style={{ gridColumn: "1 / -1", padding: "5rem 0", textAlign: "center" }} className="glass">
            <p style={{ color: "var(--gray-500)", fontSize: "1.125rem" }}>
              Tidak ada produk yang sesuai dengan filter pencarian Anda.
            </p>
            <Link href="/katalog" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
              Lihat Semua Produk
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
