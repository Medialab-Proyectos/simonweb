"use client"

import { SegmentProvider } from "@/components/landing/segment-context"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { DemoModalProvider } from "@/components/landing-v3/demo-modal-context"
import { DemoModal } from "@/components/landing-v3/demo-form"
import { FloatingFab } from "@/components/landing-v3/floating-fab"
import { CookieBanner } from "@/components/landing/cookie-banner"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// ─── Cookie policy sections ──────────────────────────────────────────────────
const sections = [
  {
    id: "1",
    title: "1. Que son las cookies",
    content: (
      <div className="space-y-4">
        <p>
          Las cookies son pequenos archivos de texto que los sitios web almacenan en el dispositivo
          del usuario (computador, telefono movil, tableta) cuando este los visita. Estas permiten
          que el sitio recuerde informacion sobre la visita, como preferencias de idioma,
          configuracion y otros datos, para facilitar la proxima visita y hacer que el sitio sea mas
          util para el usuario.
        </p>
        <p>
          Las cookies no pueden acceder a otros datos del dispositivo del usuario ni ejecutar
          programas. Su finalidad es exclusivamente funcional y analitica dentro del contexto de la
          navegacion web.
        </p>
      </div>
    ),
  },
  {
    id: "2",
    title: "2. Tipos de cookies que utilizamos",
    content: (
      <div className="space-y-5">
        <div>
          <h4 className="font-semibold text-foreground">Cookies estrictamente necesarias</h4>
          <p className="mt-1">
            Son esenciales para el funcionamiento basico del sitio web. Permiten la navegacion por la
            pagina, el acceso a areas seguras y el uso de funcionalidades fundamentales. Sin estas
            cookies, el sitio no puede funcionar correctamente. No requieren consentimiento del
            usuario.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground">Cookies de rendimiento y analitica</h4>
          <p className="mt-1">
            Recopilan informacion sobre como los usuarios interactuan con el sitio web, que paginas
            visitan con mas frecuencia, si reciben mensajes de error y otros datos de navegacion.
            Utilizamos herramientas como Vercel Analytics para este fin. La informacion recopilada es
            agregada y anonima, y se utiliza exclusivamente para mejorar el funcionamiento del sitio.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground">Cookies de funcionalidad</h4>
          <p className="mt-1">
            Permiten que el sitio recuerde las elecciones que hace el usuario (como el segmento
            seleccionado entre Personas y Empresas, preferencias de tema visual u otras
            configuraciones) para proporcionar una experiencia mas personalizada.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground">Cookies de terceros</h4>
          <p className="mt-1">
            Algunas funcionalidades del sitio pueden integrar servicios de terceros (como Google
            Play, App Store o widgets de redes sociales) que pueden establecer sus propias cookies.
            Simon Movilidad no controla estas cookies de terceros; su uso esta sujeto a las politicas
            de privacidad de cada proveedor.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "3",
    title: "3. Finalidad de las cookies",
    content: (
      <div className="space-y-3">
        <p>Las cookies que utilizamos tienen las siguientes finalidades:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Garantizar el correcto funcionamiento tecnico de la Plataforma Digital.
          </li>
          <li>
            Recordar preferencias del usuario para mejorar la experiencia de navegacion.
          </li>
          <li>
            Obtener datos anonimos y agregados sobre el uso del sitio para fines de mejora continua.
          </li>
          <li>
            Facilitar la interaccion con servicios externos (redes sociales, tiendas de
            aplicaciones).
          </li>
          <li>
            Mantener la seguridad de la sesion del usuario durante su navegacion.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "4",
    title: "4. Base legal para el uso de cookies",
    content: (
      <div className="space-y-4">
        <p>
          El uso de cookies en la Plataforma Digital de Simon Movilidad se fundamenta en:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Ley 1581 de 2012</strong> (Ley de Proteccion de Datos Personales de Colombia) y
            su Decreto Reglamentario 1377 de 2013, en lo relativo al tratamiento de datos personales.
          </li>
          <li>
            <strong>Ley 527 de 1999</strong> sobre mensajes de datos y comercio electronico.
          </li>
          <li>
            <strong>Interes legitimo</strong> del responsable para garantizar la seguridad y el
            correcto funcionamiento de la plataforma (cookies estrictamente necesarias).
          </li>
          <li>
            <strong>Consentimiento del usuario</strong> para cookies de analitica, funcionalidad y
            terceros, otorgado mediante la continuacion de la navegacion o la aceptacion expresa del
            aviso de cookies.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "5",
    title: "5. Como gestionar y desactivar cookies",
    content: (
      <div className="space-y-4">
        <p>
          El usuario tiene derecho a aceptar o rechazar las cookies no esenciales. Puede gestionar
          sus preferencias de cookies de las siguientes maneras:
        </p>
        <div>
          <h4 className="font-semibold text-foreground">Configuracion del navegador</h4>
          <p className="mt-1">
            Todos los navegadores modernos permiten configurar las cookies. El usuario puede
            bloquear, eliminar o recibir un aviso antes de que se almacene una cookie. La
            configuracion varia segun el navegador:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Google Chrome: Configuracion &gt; Privacidad y seguridad &gt; Cookies</li>
            <li>Mozilla Firefox: Opciones &gt; Privacidad y seguridad</li>
            <li>Safari: Preferencias &gt; Privacidad</li>
            <li>Microsoft Edge: Configuracion &gt; Privacidad, busqueda y servicios</li>
          </ul>
        </div>
        <div className="mt-3 rounded-lg border border-border bg-card/30 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Nota importante:</strong> La desactivacion de
            cookies estrictamente necesarias puede afectar el funcionamiento del sitio web e impedir
            el acceso a ciertas funcionalidades de la Plataforma Digital.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "6",
    title: "6. Periodo de conservacion",
    content: (
      <div className="space-y-4">
        <p>
          El periodo de conservacion de las cookies varia segun su tipo:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Cookies de sesion:</strong> se eliminan automaticamente al cerrar el navegador.
          </li>
          <li>
            <strong>Cookies persistentes:</strong> permanecen en el dispositivo durante un periodo
            determinado o hasta que el usuario las elimine manualmente. El periodo maximo de
            conservacion no excede los 12 meses desde su instalacion.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "7",
    title: "7. Transferencia de datos a terceros",
    content: (
      <div className="space-y-4">
        <p>
          La informacion recopilada mediante cookies analiticas puede ser procesada por proveedores
          de servicios de analitica (como Vercel Analytics) cuyos servidores pueden estar ubicados
          fuera de Colombia. En tales casos, se garantiza que dichos proveedores cumplen con
          estandares adecuados de proteccion de datos.
        </p>
        <p>
          Simon Movilidad no vende, comercializa ni cede a terceros la informacion recopilada a
          traves de cookies con fines distintos a los descritos en esta politica.
        </p>
      </div>
    ),
  },
  {
    id: "8",
    title: "8. Derechos del usuario",
    content: (
      <div className="space-y-4">
        <p>
          De conformidad con la Ley 1581 de 2012, el usuario tiene derecho a:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Conocer, actualizar y rectificar sus datos personales.</li>
          <li>
            Solicitar la eliminacion de sus datos cuando considere que no estan siendo tratados
            conforme a la normativa.
          </li>
          <li>Revocar la autorizacion otorgada para el tratamiento de datos.</li>
          <li>
            Acceder de forma gratuita a los datos personales que hayan sido objeto de tratamiento.
          </li>
          <li>
            Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por
            infracciones a la normativa de proteccion de datos.
          </li>
        </ul>
        <p>
          Para ejercer estos derechos, el usuario puede comunicarse a traves de los canales
          indicados en la seccion de contacto de esta politica.
        </p>
      </div>
    ),
  },
  {
    id: "9",
    title: "9. Actualizaciones de esta politica",
    content: (
      <div className="space-y-4">
        <p>
          Simon Movilidad (Quantum Data Processing de Colombia S.A.S.) se reserva el derecho de
          modificar esta Politica de Cookies en cualquier momento para adaptarla a novedades
          legislativas, tecnologicas o cambios en los servicios ofrecidos.
        </p>
        <p>
          Cualquier modificacion sera publicada en esta pagina. Se recomienda al usuario revisar
          periodicamente esta politica para estar informado sobre como se utilizan las cookies.
        </p>
      </div>
    ),
  },
  {
    id: "10",
    title: "10. Contacto",
    content: (
      <div className="space-y-4">
        <p>
          Para cualquier consulta, solicitud o reclamacion relacionada con el uso de cookies o el
          tratamiento de datos personales, el usuario puede contactarnos a traves de:
        </p>
        <ul className="space-y-3 pl-1">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
              1
            </span>
            <div>
              <span className="font-semibold text-foreground">Correo electronico:</span>{" "}
              <a
                href="mailto:servicioalcliente@simonmovilidad.com"
                className="text-primary hover:underline"
              >
                servicioalcliente@simonmovilidad.com
              </a>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
              2
            </span>
            <div>
              <span className="font-semibold text-foreground">WhatsApp:</span>{" "}
              <a
                href="https://wa.me/573105511862"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                +57 310 5511862
              </a>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
              3
            </span>
            <div>
              <span className="font-semibold text-foreground">Linea nacional:</span>{" "}
              <a href="tel:018000189890" className="text-primary hover:underline">
                01 8000 189 890
              </a>
            </div>
          </li>
        </ul>
        <p className="mt-2 text-sm text-muted-foreground">
          Responsable del tratamiento: Quantum Data Processing de Colombia S.A.S. (NIT
          900.237.820-6), Bogota D.C., Colombia.
        </p>
      </div>
    ),
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────
export default function CookiesPage() {
  return (
    <SegmentProvider>
      <DemoModalProvider>
        <Header />

        <main className="min-h-screen bg-background pt-24 pb-16 lg:pt-28 lg:pb-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {/* Page header */}
            <div className="mb-10">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">
                Legal
              </span>
              <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Politica de Cookies
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
                En Simon Movilidad utilizamos cookies para mejorar tu experiencia de navegacion.
                Aqui te explicamos que cookies usamos, para que y como puedes gestionarlas.
              </p>
              <p className="mt-2 text-sm text-muted-foreground/70">
                Quantum Data Processing de Colombia S.A.S. &mdash; Ultima actualizacion: 2025
              </p>
            </div>

            {/* Accordion sections */}
            <Accordion type="single" collapsible defaultValue="1" className="space-y-3">
              {sections.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="rounded-xl border border-border bg-card/40 px-5 transition-colors data-[state=open]:bg-card/70 data-[state=open]:border-primary/20"
                >
                  <AccordionTrigger className="py-5 text-base font-semibold text-foreground hover:no-underline hover:text-primary [&[data-state=open]]:text-primary">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {section.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Related links */}
            <div className="mt-12 rounded-xl border border-border bg-card/50 p-6">
              <h2 className="text-sm font-semibold text-foreground">Documentos relacionados</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href="/privacidad"
                  className="inline-flex rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary/30 hover:text-primary transition-all"
                >
                  Privacidad y tratamiento de datos
                </a>
                <a
                  href="/terminos"
                  className="inline-flex rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary/30 hover:text-primary transition-all"
                >
                  Terminos y condiciones
                </a>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingFab />
        <DemoModal />
      </DemoModalProvider>
    </SegmentProvider>
  )
}
