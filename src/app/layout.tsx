import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'TokoKita | Toko Online Dropship Terpercaya & Terlengkap',
    template: '%s | TokoKita'
  },
  description: 'Belanja mudah, aman, dan cepat di TokoKita. Temukan produk-produk fashion dan lifestyle terbaik dengan harga terjangkau, jaminan 100% original, dan gratis ongkir seluruh Indonesia.',
  keywords: ['toko online', 'dropship indonesia', 'belanja murah', 'toko dropship', 'produk original', 'gratis ongkir', 'fashion murah', 'barang unik'],
  authors: [{ name: 'TokoKita Team' }],
  creator: 'TokoKita',
  publisher: 'TokoKita',
  metadataBase: new URL('http://localhost:3000'), // Replace with actual domain in production
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TokoKita | Belanja Mudah & Cepat',
    description: 'Temukan produk-produk terbaik dengan harga terjangkau dan jaminan 100% original.',
    url: 'https://tokokita.com',
    siteName: 'TokoKita',
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
