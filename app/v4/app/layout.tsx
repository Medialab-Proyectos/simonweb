import type { Metadata, Viewport } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://simonmovilidad.com"),
  title: "Simon Movilidad | Control Total de tu Movilidad en Tiempo Real",
  description:
    "Monitorea, protege y gestiona vehiculos particulares o flotas desde una experiencia simple, confiable e inteligente. Rastreo GPS, alertas, guantera digital y mas.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://simonmovilidad.com",
    siteName: "Simon Movilidad",
    title: "Simon Movilidad | Control Total de tu Movilidad en Tiempo Real",
    description:
      "Monitorea, protege y gestiona vehiculos particulares o flotas desde una experiencia simple, confiable e inteligente.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Simon Movilidad" }],
  },
  icons: {
    icon: [
      { url: "/v4/favicon.svg", type: "image/svg+xml" },
      { url: "/v4/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/v4/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        <Script id="hotjar" strategy="afterInteractive">
          {`(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:6668406,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      </body>
    </html>
  )
}
