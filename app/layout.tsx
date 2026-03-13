import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://simonmovilidad.com'),
  title: {
    default: 'Simon Movilidad | Control Total de tu Movilidad en Tiempo Real',
    template: '%s | Simon Movilidad',
  },
  description:
    'Monitorea, protege y gestiona vehículos particulares o flotas desde una experiencia simple, confiable e inteligente. Rastreo GPS, alertas, guantera digital y más.',
  keywords: [
    'monitoreo vehicular',
    'rastreo GPS',
    'gestión de flotas',
    'Colombia',
    'seguridad vehicular',
    'guantera digital',
    'geocercas',
    'alertas inteligentes',
  ],
  authors: [{ name: 'Simon Movilidad' }],
  creator: 'Simon Movilidad',
  publisher: 'Simon Movilidad',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://simonmovilidad.com',
    siteName: 'Simon Movilidad',
    title: 'Simon Movilidad | Control Total de tu Movilidad en Tiempo Real',
    description:
      'Monitorea, protege y gestiona vehículos particulares o flotas desde una experiencia simple, confiable e inteligente.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Simon Movilidad' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simon Movilidad | Control Total de tu Movilidad en Tiempo Real',
    description:
      'Monitorea, protege y gestiona vehículos particulares o flotas desde una experiencia simple, confiable e inteligente.',
    images: ['/og-image.jpg'],
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
  alternates: { canonical: 'https://simonmovilidad.com' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
    { media: '(prefers-color-scheme: light)', color: '#F7FAFC' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
