import { Phone, Mail, MessageCircle, Hash } from "lucide-react"
import Link from "next/link"
import { Logo } from "./logo"

const footerLinks = {
  soluciones: [
    { label: "Monitoreo 24/7",     href: "#soluciones-grid" },
    { label: "Geocercas",          href: "#soluciones-grid" },
    { label: "Documentos del vehículo", href: "#soluciones-grid" },
    { label: "Reportes",           href: "#soluciones-grid" },
    { label: "SimonPay",           href: "#soluciones-grid" },
  ],
  empresa: [
    { label: "¿Quiénes somos?",  href: "#soluciones" },
    { label: "Para empresas",    href: "#empresas-section" },
    { label: "Clientes",         href: "#clientes" },
    { label: "FAQ",              href: "#faq" },
    { label: "Contacto",         href: "#demo" },
  ],
  legal: [
    { label: "Política de privacidad",  href: "/privacidad" },
    { label: "Términos y condiciones",  href: "/terminos" },
    { label: "Tratamiento de datos",    href: "/datos" },
  ],
}

// ─── Simon lock isotipo (small) ──────────────────────────────────────────────
function SimonIsotipo({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="319 0 96 149"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M414.66 75.644C414.66 60.1547 407.255 46.4346 395.781 37.822V23.3341C395.181 15.2556 388.477 0 367.33 0C346.184 0 339.513 14.9886 338.913 22.9002V37.7218C327.272 46.3344 319.834 60.1213 319.834 75.644C319.834 79.8835 320.434 83.9228 321.435 87.8285C321.602 88.4961 321.768 89.1304 321.935 89.798C321.935 89.8314 321.935 89.8982 321.969 89.9315C326.371 105.588 338.579 117.939 354.155 122.513V148.45L391.679 117.705C405.454 109.46 414.66 94.3714 414.66 77.1128C414.66 76.8791 414.627 76.6788 414.627 76.4451C414.627 76.1781 414.66 75.911 414.66 75.644ZM354.956 23.668C355.256 21.3312 356.657 15.3224 367.33 15.3224C378.537 15.3224 379.771 21.7652 380.038 24.0352V30.0439C376.036 28.9423 371.8 28.3415 367.43 28.3415C363.061 28.3415 358.925 28.9089 354.956 29.9772V23.668ZM372.567 97.4425L373.367 108.926H361.16L362.227 97.4425C352.254 95.1392 344.95 86.3263 344.95 75.6106C344.95 63.2926 354.889 53.3447 367.364 53.3447C379.838 53.3447 389.611 63.2926 389.611 75.6106C389.611 86.3263 382.34 95.1058 372.534 97.4425H372.567Z" fill="#00FFC2"/>
    </svg>
  )
}

export function Footer() {
  return (
    <footer
      id="contacto"
      className="bg-[#080808]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Pie de página</h2>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

        {/* Central brand block */}
        <div className="mb-12 flex flex-col items-center text-center">
          <SimonIsotipo className="h-12 w-auto opacity-80" />
          <p className="mt-5 text-base font-medium text-muted-foreground">
            La tecnología que transforma tu movilidad.
          </p>

          {/* Contact row */}
          <address className="mt-6 not-italic flex flex-wrap items-center justify-center gap-5">
            <a
              href="https://wa.me/573105511862"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              +57 310 5511862
            </a>
            <a
              href="tel:018000189890"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              01 8000 189 890
            </a>
            <a
              href="tel:#230"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Hash className="h-4 w-4" aria-hidden="true" />
              #230
            </a>
            <a
              href="tel:#280"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Hash className="h-4 w-4" aria-hidden="true" />
              #280
            </a>
            <a
              href="mailto:info@simonmovilidad.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              info@simonmovilidad.com
            </a>
          </address>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-3">
          <nav aria-label="Soluciones">
            <h3 className="text-sm font-semibold text-foreground">Soluciones</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.soluciones.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Empresa">
            <h3 className="text-sm font-semibold text-foreground">Empresa</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal" className="col-span-2 sm:col-span-1">
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Simon Movilidad. Todos los derechos reservados.
          </p>

          {/* Social links */}
          <div className="flex gap-4" aria-label="Redes sociales">
            <a href="https://facebook.com/simonmovilidad" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors" aria-label="Simon Movilidad en Facebook">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="https://instagram.com/simonmovilidad" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors" aria-label="Simon Movilidad en Instagram">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
            </a>
            <a href="https://linkedin.com/company/simonmovilidad" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors" aria-label="Simon Movilidad en LinkedIn">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
