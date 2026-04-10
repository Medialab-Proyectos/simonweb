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

type SectionItem = {
  id: string
  title: string
  content: React.ReactNode
}

function SubAccordion({ items }: { items: SectionItem[] }) {
  return (
    <Accordion type="multiple" className="mt-4">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="border-border/50 last:border-b-0"
        >
          <AccordionTrigger className="py-3 text-sm font-semibold text-foreground/90 hover:no-underline hover:text-primary">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

const useModuleItems: SectionItem[] = [
  {
    id: "4-1",
    title: '4.1. Formas de Uso Modulo "Mis Vehiculos"',
    content: (
      <div className="space-y-4">
        <p>
          Este modulo permite visualizar los datos esenciales del vehiculo: placa, linea, modelo,
          marca, fechas de vencimiento del SOAT y la RTM, y el estado de pico y placa segun la
          ciudad de matricula del vehiculo en Bogota, Cali, Villavicencio, Barranquilla y Medellin.
        </p>
        <p>
          La informacion se presenta con fines exclusivamente informativos y Quantum Data no asume
          responsabilidad por errores, omisiones, interrupciones o retrasos en los datos emitidos
          por fuentes oficiales.
        </p>
      </div>
    ),
  },
  {
    id: "4-2",
    title: '4.2. Formas de Uso Modulo "Seguros"',
    content: (
      <div className="space-y-5">
        <p>
          Este modulo permite al usuario acceder a informacion de submodulos agrupados en dos
          categorias segun su necesidad: Compra tu SOAT y Seguros de Automoviles.
        </p>

        <div>
          <h5 className="font-semibold text-foreground">4.2.1. Compra tu SOAT</h5>
          <p className="mt-2">
            Este submodulo ofrece dos opciones para gestionar la adquisicion del SOAT:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">Compra Online:</strong> redirige al usuario a la
              pagina web de Seguros Mundial para completar la compra directamente.
            </li>
            <li>
              <strong className="text-foreground">Agendar Llamada:</strong> ofrece canales de
              contacto para que la gestion posterior sea manejada por Promotec.
            </li>
          </ul>
          <p className="mt-3">
            La informacion disponible en la plataforma no constituye una compra, renovacion ni
            asesoria en materia de seguros. Si el usuario requiere alguno de estos servicios, la
            solicitud sera remitida a PROMOTEC LTDA. AGENCIA DE SEGUROS para la gestion
            correspondiente.
          </p>
        </div>

        <div>
          <h5 className="font-semibold text-foreground">4.2.2. Seguros de Automoviles</h5>
          <p className="mt-2">
            Este submodulo integra el multicotizador de PROMOTEC LTDA. AGENCIA DE SEGUROS para
            que el usuario pueda evaluar opciones al adquirir la poliza de seguro de su vehiculo.
          </p>
          <p className="mt-3">
            Este modulo tambien tiene fines exclusivamente informativos y Quantum Data no asume
            responsabilidad por errores, omisiones, interrupciones o retrasos en la informacion
            presentada.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "4-3",
    title: '4.3. Formas de Uso Modulo "Asistencias"',
    content: (
      <div className="space-y-4">
        <p>
          Este modulo informa al cliente sobre las asistencias disponibles. Los servicios de
          asistencia son prestados exclusivamente por Asistencias y Servicios Automatizados Ya
          S.A.S. (Asisya).
        </p>
        <p>
          En consecuencia, no se entendera que Quantum Data participa en la prestacion de dichos
          servicios y no asume responsabilidad alguna por su alcance ni por los perjuicios
          derivados de su prestacion.
        </p>
        <p>
          Para solicitar informacion adicional o conocer los detalles del servicio, el cliente debe
          ponerse en contacto directamente con Asisya y consultar sus terminos y condiciones.
        </p>
      </div>
    ),
  },
  {
    id: "4-4",
    title: '4.4. Forma de Uso Modulo "Localizacion"',
    content: (
      <div className="space-y-4">
        <p>
          Este modulo permite al usuario acceder a informacion en tiempo real sobre la ubicacion de
          los vehiculos asociados.
        </p>
        <p>
          La informacion se obtiene a partir de la conectividad de los dispositivos AVL. La
          localizacion y el monitoreo se realizaran mediante los medios dispuestos por Quantum Data
          siempre que el vehiculo se encuentre dentro del territorio colombiano y dentro del area de
          cobertura de las companias proveedoras del servicio de telefonia movil.
        </p>
        <p>
          Estos servicios estan sujetos a limitaciones propias de la capacidad inalambrica y a
          otras condiciones tecnicas que pueden afectar su funcionamiento, como la geografia del
          terreno, la congestion de la red, tuneles, sotanos, condiciones climaticas, capacidad de
          transmision y cualquier otro factor atribuible al cliente o a terceros.
        </p>
        <p>
          El modulo permite visualizar la ubicacion del vehiculo, eventos relevantes, recorridos
          diarios y la opcion de descargar reportes. La veracidad, precision, continuidad y
          disponibilidad de los datos puede verse afectada por factores externos ajenos al control
          directo de Quantum Data.
        </p>
      </div>
    ),
  },
  {
    id: "4-5",
    title: '4.5. Forma de Uso Modulo "Guantera"',
    content: (
      <div className="space-y-5">
        <p>
          Este modulo permite acceder a diversos submodulos agrupados en cuatro categorias:
          Propiedad, Mantenimiento, Seguros y Operacion, para los vehiculos que cuenten con el
          servicio de geolocalizacion de SIMON.
        </p>
        <p>
          Los datos pueden obtenerse de fuentes externas como el RUNT, alcaldias, gobernaciones,
          el Ministerio de Transporte y otras entidades reguladoras. Quantum Data no garantiza la
          exactitud ni la actualizacion permanente de esta informacion, por lo que el usuario es
          responsable de verificar su vigencia y exactitud en los canales oficiales.
        </p>
        <p>
          Este modulo se limita a presentar informacion con fines informativos y no asume
          responsabilidad por los datos emitidos por fuentes oficiales.
        </p>

        <div className="rounded-xl border border-border bg-card/40 p-5">
          <h5 className="text-sm font-semibold text-foreground">4.5.1. Categoria Propiedad</h5>
          <div className="mt-4 space-y-4">
            <div>
              <h6 className="font-semibold text-foreground">
                a. Factura, Declaracion de Importacion y Manual del Vehiculo
              </h6>
              <p className="mt-1">
                Permite cargar y almacenar digitalmente estos documentos para facilitar su acceso.
                Su digitalizacion es meramente informativa y no sustituye los originales, que deben
                conservarse y presentarse cuando sean requeridos por autoridades o entidades
                competentes. El usuario es responsable de garantizar su vigencia, autenticidad y
                validez.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-foreground">b. Tarjeta de propiedad</h6>
              <p className="mt-1">
                El usuario puede cargar una foto o archivo PDF de la tarjeta de propiedad asociada a
                los vehiculos registrados en SIMON. Este submodulo tambien puede contener
                informacion proveniente del RUNT, por lo cual Quantum Data no se hace responsable
                por su veracidad. El cargue se realiza solo con fines de registro y no sustituye el
                documento original.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-foreground">c. Impuesto Vehicular</h6>
              <p className="mt-1">
                La informacion puede provenir de plataformas de alcaldias, gobernaciones u otros
                entes reguladores y solo estara disponible para vehiculos de Bogota, Cali,
                Villavicencio, Barranquilla y Medellin. El usuario debe confirmar su validez,
                vigencia y modificaciones en los canales oficiales de la entidad territorial
                correspondiente.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-foreground">d. Otros documentos</h6>
              <p className="mt-1">
                Permite cargar documentos adicionales previamente definidos por la plataforma para
                facilitar su acceso. La digitalizacion no sustituye los originales y el usuario debe
                verificar la vigencia, estado y validez de estos documentos.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card/40 p-5">
          <h5 className="text-sm font-semibold text-foreground">4.5.2. Categoria Seguros</h5>
          <div className="mt-4 space-y-4">
            <div>
              <h6 className="font-semibold text-foreground">a. Submodulo SOAT</h6>
              <p className="mt-1">
                Permite acceder a informacion sobre la vigencia del SOAT, numero de poliza y fecha
                de vencimiento. Estos datos se obtienen directamente del RUNT y pueden estar
                sujetos a actualizaciones, modificaciones o errores derivados de dicha plataforma.
              </p>
              <p className="mt-2">
                Incluye las opciones de Compra Online con redireccionamiento a Seguros Mundial y
                Agendar Llamada con gestion posterior por Promotec. La informacion disponible en la
                plataforma no constituye una compra, renovacion ni asesoria en seguros.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-foreground">b. Poliza de seguro</h6>
              <p className="mt-1">
                Al usar este submodulo, el usuario autoriza que la informacion sea compartida y
                tratada por aliados comerciales de Quantum Data, como aseguradoras y agencias de
                seguros, para ofrecer productos relacionados.
              </p>
              <p className="mt-2">
                Este submodulo permite visualizar polizas Todo Riesgo en las que PROMOTEC LTDA.
                AGENCIA DE SEGUROS actue como intermediario, mostrando numero de poliza, entidad
                aseguradora, vigencia y fecha de vencimiento. Si la poliza fue endosada o tiene
                otro intermediario, el usuario puede ingresar manualmente la informacion, siendo de
                su exclusiva responsabilidad su actualizacion y veracidad.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-foreground">
                c. Certificado de Garantia del Vehiculo
              </h6>
              <p className="mt-1">
                Este submodulo permite cargar y almacenar digitalmente el certificado de garantia
                del vehiculo. Su digitalizacion es solo informativa y no sustituye los originales,
                que deben conservarse y presentarse cuando sea necesario. El usuario es responsable
                de garantizar la vigencia, autenticidad y validez del documento.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card/40 p-5">
          <h5 className="text-sm font-semibold text-foreground">4.5.3. Categoria Mantenimiento</h5>
          <div className="mt-4 space-y-4">
            <div>
              <h6 className="font-semibold text-foreground">
                a. Submodulo RTM (Revision Tecnico Mecanica)
              </h6>
              <p className="mt-1">
                Permite consultar informacion sobre la vigencia de la revision tecnico-mecanica,
                incluyendo la fecha de la ultima revision y la fecha del proximo vencimiento. Esta
                informacion es extraida directamente del RUNT y puede estar sujeta a cambios
                realizados por dicha plataforma.
              </p>
              <p className="mt-2">
                Cualquier inconsistencia debe ser aclarada directamente con el Centro de Diagnostico
                Automotor donde se realizo la RTM.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-foreground">
                b. Submodulo Guia de Control de Mantenimiento
              </h6>
              <p className="mt-1">
                Notifica al usuario sobre mantenimientos programados del vehiculo con base en
                kilometraje, tiempo transcurrido y horas de motor.
              </p>
              <p className="mt-2">
                Tambien permite agendar automaticamente citas de mantenimiento con concesionarios o
                marcas aliadas a traves de Asisya, mediante la generacion de un lead para coordinar
                la disponibilidad del usuario y del concesionario.
              </p>
              <p className="mt-2">
                El usuario puede adjuntar el documento que certifica el mantenimiento realizado. La
                carga del archivo tiene un proposito exclusivamente informativo.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card/40 p-5">
          <h5 className="text-sm font-semibold text-foreground">4.5.4. Categoria Operacion</h5>
          <div className="mt-4 space-y-4">
            <div>
              <h6 className="font-semibold text-foreground">a. Licencia de conduccion</h6>
              <p className="mt-1">
                Permite cargar una foto o documento digitalizado de la licencia de conduccion para
                visualizar categorias activas y vigencia. El cargue es solo con fines de registro y
                no sustituye el documento original.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-foreground">b. Pico y placa</h6>
              <p className="mt-1">
                La informacion puede provenir de plataformas de alcaldias, gobernaciones u otros
                entes reguladores y solo estara disponible para vehiculos de Bogota, Cali,
                Villavicencio, Barranquilla y Medellin. El usuario debe verificar en los canales
                oficiales de su entidad territorial la validez, vigencia y modificaciones de la
                informacion presentada.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-foreground">c. Kit de Carretera</h6>
              <p className="mt-1">
                La informacion contenida en este submodulo esta alineada con la normativa vigente
                emitida por el Ministerio de Transporte conforme al Codigo Nacional de Transito. El
                usuario debe verificar la normatividad vigente y sus cambios.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-foreground">d. Botiquin de Primeros Auxilios</h6>
              <p className="mt-1">
                La informacion contenida en este submodulo tambien esta alineada con la normativa
                vigente emitida por el Ministerio de Transporte conforme al Codigo Nacional de
                Transito. El usuario debe verificar la normatividad vigente y sus cambios.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-foreground">e. Testigos</h6>
              <p className="mt-1">
                Permite consultar el significado de los testigos del tablero del vehiculo, sus
                caracteristicas y posibles soluciones en caso de activacion.
              </p>
              <p className="mt-2">
                Esta informacion aplica unicamente para las marcas Chevrolet, Volkswagen, Ford, KIA,
                Renault, Nissan, Mazda, JAC, JMC y Foton, y esta alineada con el contenido del
                manual del vehiculo. Aun asi, el usuario debe verificar siempre la informacion en el
                manual correspondiente a su vehiculo.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "4-6",
    title: '4.6. Forma de Uso Modulo "Reportes"',
    content: (
      <div className="space-y-4">
        <p>
          El modulo de Reportes AVL permite consultar los vehiculos asociados a la cuenta y
          seleccionar un rango de fechas especifico para delimitar el periodo a analizar.
        </p>
        <p>
          Durante el intervalo seleccionado, el sistema muestra eventos registrados por los
          vehiculos a traves de tarjetas informativas y ofrece la posibilidad de visualizar el
          recorrido realizado, incluyendo informacion detallada sobre la ruta y variables
          relacionadas con el comportamiento del vehiculo.
        </p>
        <p>
          Esta funcionalidad proporciona una vision detallada del desempeno y comportamiento del
          vehiculo para facilitar el analisis y la toma de decisiones.
        </p>
      </div>
    ),
  },
  {
    id: "4-7",
    title: '4.7. Forma de Uso Modulo "Convenios"',
    content: (
      <div className="space-y-4">
        <p>
          Este modulo permite al usuario consultar los convenios activos disponibles para su uso y
          muestra informacion con caracter exclusivamente informativo.
        </p>
        <p>
          El usuario puede seleccionar la ciudad para visualizar la lista de convenios y su
          ubicacion en un mapa. Al seleccionar un convenio especifico, puede acceder al detalle de
          la ubicacion donde se presta el servicio.
        </p>
        <p>
          Los convenios corresponden a servicios prestados exclusivamente por proveedores terceros,
          por lo que no se entendera que Quantum Data participa en la prestacion de dichos
          servicios ni asume responsabilidad por su alcance o perjuicios derivados.
        </p>
      </div>
    ),
  },
  {
    id: "4-8",
    title: '4.8. Forma de Uso Modulo "Mis Creditos"',
    content: (
      <div className="space-y-4">
        <p>
          Este submodulo ofrece informacion parcial sobre los creditos asociados al vehiculo del
          usuario con entidades financieras que mantienen un convenio vigente con Quantum Data.
        </p>
        <p>
          Esta informacion no debe considerarse oficial, por lo que el usuario debe verificar su
          exactitud directamente con las entidades financieras correspondientes. Quantum Data no
          asume responsabilidad alguna sobre la veracidad de la informacion proporcionada.
        </p>
      </div>
    ),
  },
]

const sections: SectionItem[] = [
  {
    id: "1",
    title: "1. Aceptacion de Politicas de la Plataforma Digital",
    content: (
      <div className="space-y-4">
        <p>
          Quantum Data Processing de Colombia S.A.S., en adelante Quantum Data o la Compania,
          identificada con NIT 900.237.820-6, con domicilio principal en la Cra 106 No. 15 A 25
          Ofc 314 Ed Zf Business Center, Bogota D.C., Colombia, deja a disposicion de sus clientes
          y usuarios la Plataforma Digital por medio de la cual podran realizar consultas y acceder
          a informacion a traves del sitio web{" "}
          <a
            href="https://www.simonmovilidad.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            https://www.simonmovilidad.com/
          </a>{" "}
          y/o la aplicacion movil disponible para Android e iOS.
        </p>
        <p>
          El uso de la Plataforma Digital indica que el usuario y/o cliente ha leido y acepta los
          terminos y condiciones y la politica de privacidad de la compania, asi como cada una de
          las disposiciones incluidas en este documento.
        </p>
        <p>
          El usuario debe hacer un uso licito de la informacion que Quantum Data pone a su
          disposicion por medio de la Plataforma Digital y su utilizacion se cenira estrictamente a
          lo establecido en el presente documento.
        </p>
        <p>
          Quantum Data se reserva el derecho de modificar estos terminos y condiciones de acuerdo
          con variaciones tecnicas, comerciales y juridicas que se adopten e involucren a la
          compania y a sus proveedores.
        </p>
      </div>
    ),
  },
  {
    id: "2",
    title: "2. Definiciones",
    content: (
      <dl className="space-y-3">
        {[
          [
            "Almacenar",
            "Guardar elementos de forma fisica o digital en algun lugar, de forma ordenada, con el fin de acceder a ellos en el momento que se disponga.",
          ],
          [
            "Autorizacion",
            "Consentimiento previo, expreso e informado del titular para llevar a cabo el tratamiento de datos personales.",
          ],
          ["Base de Datos", "Conjunto organizado de datos que sea objeto de tratamiento."],
          ["Cliente", "Persona natural o juridica que ha suscrito un contrato con Quantum Data."],
          [
            "Dato Personal",
            "Cualquier informacion vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.",
          ],
          [
            "Disponibilidad",
            "Posibilidad de una cosa o persona de estar presente cuando se la necesita.",
          ],
          [
            "Hacking",
            "Actividad que busca pasar a traves de los riesgos de seguridad que presente el sistema de informacion.",
          ],
          [
            "Plataforma Digital",
            "Sitio web https://www.simonmovilidad.com/ y/o aplicacion movil disponible para Android e iOS.",
          ],
          [
            "Potestativo",
            "Hecho que, cualquiera sea su origen, se encuentra sujeto a la libre facultad o potestad de cada individuo.",
          ],
          [
            "Resguardar",
            "Proteger o hacer que una persona o una cosa no reciba dano, poniendola en un lugar, guardandola o cubriendola.",
          ],
          [
            "Servicios",
            "Actividad o serie de actividades llevadas a cabo por un proveedor con el proposito de satisfacer una determinada necesidad del cliente.",
          ],
          [
            "Suspender",
            "Detener o interrumpir durante un tiempo o indefinidamente el desarrollo de una accion o dejarla sin efecto.",
          ],
          [
            "Sistema de seguridad",
            "Grupo de elementos instalados e intercomunicados entre si que previenen, detectan o actuan ante intrusiones e intentos de robo de informacion.",
          ],
          [
            "Tratamiento",
            "Cualquier operacion o conjunto de operaciones sobre datos personales, tales como la recoleccion, almacenamiento, uso, circulacion o supresion.",
          ],
          ["Usuario", "Persona natural o juridica que hace uso de la Plataforma Digital."],
          ["Variaciones tecnicas", "Acto y resultado de variar: cambiar o alterar."],
        ].map(([term, def]) => (
          <div key={term}>
            <dt className="font-semibold text-foreground">{term}:</dt>
            <dd className="mt-0.5 text-muted-foreground">{def}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    id: "3",
    title: "3. Uso de la Plataforma",
    content: (
      <div className="space-y-4">
        <p>
          Quantum Data proporcionara el servicio de geolocalizacion e informacion a sus clientes,
          permitiendoles acceder y conocer los datos suministrados. Esta informacion esta sujeta a
          reglas de interpretacion y analisis, por lo que su uso o aplicacion sera responsabilidad
          exclusiva del usuario y/o cliente.
        </p>
        <p>
          Quantum Data podra negar, restringir o condicionar el acceso y uso de la Plataforma
          Digital, total o parcialmente, a su entera discrecion y por razones de seguridad, y
          tambien podra modificar todo o parte del contenido del portal en cualquier momento y sin
          previo aviso.
        </p>
        <p>En todo caso, el usuario y/o cliente no podra usar la plataforma para:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Ejecutar conductas contrarias a la legislacion vigente o al presente documento que
            generen afectacion a Quantum Data, a sus usuarios o a sus clientes.
          </li>
          <li>Realizar actividades descritas como punitivas en la legislacion aplicable.</li>
          <li>Violentar informaticamente cualquier aspecto de la Plataforma Digital.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "4",
    title: "4. Formas de Uso",
    content: (
      <div className="space-y-4">
        <p>
          La informacion disponible para clientes y usuarios tiene como finalidad unicamente la
          visualizacion de datos y la comunicacion. Por ello, es responsabilidad exclusiva del
          usuario verificar y consultar las fuentes oficiales de donde se ha obtenido dicha
          informacion.
        </p>
        <p>
          Quantum Data se reserva el derecho de modificar la Plataforma Digital, asi como los
          terminos de confidencialidad y proteccion de datos, sin previo consentimiento ni
          notificacion, para adaptarlos a requerimientos legislativos, tecnicos o de servicio. Por
          lo anterior, es deber del usuario revisar estos terminos y condiciones periodicamente.
        </p>
        <p>
          En general, el cliente podra identificarse mediante el usuario y la contrasena creados,
          adjudicados o habilitados por Quantum Data y ejecutar, bajo su responsabilidad, las
          funciones y operaciones disponibles. Al utilizar el servicio de monitoreo, el usuario
          autoriza a Quantum Data a acceder al hardware de GPS y a registrar, compilar y desplegar
          informacion sobre ubicacion y ruta para efectos internos, de acuerdo con la politica de
          privacidad.
        </p>

        <SubAccordion items={useModuleItems} />
      </div>
    ),
  },
  {
    id: "5",
    title: "5. Acceso",
    content: (
      <div className="space-y-4">
        <p>
          Los clientes de la compania tienen acceso a la Plataforma Digital mediante un usuario y
          contrasena asignados al momento del registro. Estas credenciales constituyen la firma
          electronica que identificara al cliente en sus relaciones con Quantum Data.
        </p>
        <p>
          El password de seguridad es personal e intransferible. El usuario es el unico responsable
          de la confidencialidad de sus credenciales y tiene la obligacion de mantenerlas en
          absoluta reserva, sin cederlas ni permitir la sustitucion por terceros.
        </p>
        <p>
          Para formalizar el acceso a la aplicacion mediante datos biometricos, el sistema valida
          que las funciones de autenticacion del dispositivo se hayan surtido satisfactoriamente
          bajo el mecanismo biometrico elegido, como huella dactilar o Face ID, previamente
          registrado en los ajustes del usuario y/o cliente.
        </p>
        <p>
          La autorizacion para el acceso biometrico depende exclusivamente de la configuracion de
          seguridad del dispositivo movil del usuario y/o cliente. SIMON no controla, almacena ni
          tiene acceso a la informacion biometrica del dispositivo movil.
        </p>
        <p>
          La informacion suministrada al momento de acceder y usar la Plataforma Digital es
          confidencial y Quantum Data no se hara responsable de los perjuicios ocasionados si el
          cliente y/o usuario divulga dicha informacion.
        </p>
      </div>
    ),
  },
  {
    id: "6",
    title: "6. Veracidad, confidencialidad y autorizacion de los datos personales",
    content: (
      <div className="space-y-4">
        <p>
          La informacion suministrada por el cliente esta sujeta a tratamiento por parte de la
          compania de acuerdo con las finalidades y politicas establecidas. Puede consultarse en{" "}
          <a href="/privacidad" className="text-primary hover:underline">
            la Politica de Tratamiento de Datos Personales
          </a>
          . Esta informacion debe ser veraz, comprobable y actualizada.
        </p>
        <p>
          De esta forma, Quantum Data garantiza que las credenciales asignadas para acceder a la
          informacion mediante la pagina y/o aplicacion estan basadas en la veracidad de la misma.
        </p>
        <p>
          El cliente y/o usuario comprende y autoriza el tratamiento y almacenamiento de sus datos
          con el fin de validar su identidad, perfil de usuario y demas acciones requeridas para el
          uso de la Plataforma Digital.
        </p>
      </div>
    ),
  },
  {
    id: "7",
    title: "7. Seguridad de la Informacion del Usuario y/o Cliente",
    content: (
      <div className="space-y-4">
        <p>
          El usuario y/o cliente comprende y autoriza que sus datos seran almacenados y tratados de
          forma segura en la Plataforma Digital, sujetos a los limites derivados de la naturaleza de
          los datos personales, la Ley 1581 de 2012, el Decreto 1377 de 2013 y las demas normas
          concordantes. En este sentido, el tratamiento solo podra hacerse previa autorizacion del
          titular.
        </p>
        <p>Para garantizar condiciones de seguridad optimas, el cliente y/o usuario esta obligado a:</p>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            Generar claves de ingreso y condiciones de seguridad optimas, como preguntas de
            seguridad, para las operaciones que Quantum Data estime necesarias dentro de la
            Plataforma Digital.
          </li>
          <li>
            Actuar bajo el entendido de que sin la utilizacion de las contrasenas no se podra
            ingresar al sistema ni realizar funciones, solicitudes, traslados, consultas o
            prestaciones del servicio.
          </li>
          <li>
            Mantener la privacidad y custodia de las credenciales entregadas por Quantum Data o
            generadas por el propio usuario, tales como usuario, contrasena, contrasena dinamica,
            respuestas de seguridad y demas mecanismos futuros.
          </li>
          <li>
            En caso de sospecha de acceso no autorizado o de descubrimiento de alguna clave, tomar
            las medidas necesarias, como cambio de contrasenas y preguntas de seguridad, para
            evitar usos no autorizados o fraudulentos.
          </li>
          <li>
            Si no es factible disponer de las condiciones pertinentes para la correcta creacion del
            usuario por medio de la pagina o aplicativo movil, comunicarlo a Quantum Data a traves
            de los canales dispuestos para realizar la debida gestion.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "8",
    title: "8. Disponibilidad",
    content: (
      <div className="space-y-4">
        <p>
          Quantum Data procurara brindar la disposicion de la Plataforma Digital las 24 horas del
          dia, los 7 dias de la semana y los 365 dias del ano.
        </p>
        <p>
          Aun asi, se reserva el derecho de restringir, suspender o interrumpir el servicio de
          forma temporal o permanente por razones de seguridad, dificultades tecnicas, fallas de
          internet o causas ajenas, por lo que el usuario comprende que Quantum Data no garantiza
          acceso continuo e ininterrumpido.
        </p>
        <p>
          En caso de interrupcion del servicio, Quantum Data desplegara la debida diligencia para
          restablecerlo con prontitud, sin que ello implique obligacion o responsabilidad alguna.
        </p>
      </div>
    ),
  },
  {
    id: "9",
    title: "9. Exoneracion de Responsabilidad de Quantum Data",
    content: (
      <div className="space-y-4">
        <p>
          La informacion disponible en la Plataforma Digital puede provenir de fuentes externas y
          bases de datos de terceros, como el RUNT, alcaldias y gobernaciones. Quantum Data no
          garantiza la precision ni ofrece soporte para los servicios de consulta derivados de esta
          informacion de terceros.
        </p>
        <p>
          Asimismo, Quantum Data no asume responsabilidad alguna por el uso, divulgacion,
          modificacion o eliminacion de datos que puedan resultar de dichas consultas. Es
          responsabilidad exclusiva del usuario y cliente verificar la exactitud de la informacion
          consultando directamente las fuentes oficiales correspondientes.
        </p>
        <p>Quantum Data no sera responsable, entre otros, por los siguientes eventos:</p>
        <ol className="list-decimal space-y-3 pl-6">
          <li>
            El uso indebido del servicio por si mismo o por personas no autorizadas, por lo que el
            cliente asume la responsabilidad de los movimientos ordenados mediante el canal y del
            adecuado desarrollo de las condiciones de seguridad.
          </li>
          <li>
            Fuerza mayor, caso fortuito, causa extrana o hecho de un tercero que pueda ocasionar
            perjuicios e imposibilitar, demorar, desviar o alterar la realizacion de operaciones y
            funciones.
          </li>
          <li>
            Circunstancias en las que la falla o rechazo de la operacion sea atribuible a clientes,
            usuarios o terceros, tales como error o desactualizacion de fuentes de informacion,
            incorrecta operacion del sistema, informacion insuficiente en formularios y solicitudes
            o danos en los sistemas de transmision de datos.
          </li>
          <li>
            Las relaciones comerciales y contractuales realizadas entre el cliente y terceros
            proveedores. Quantum Data se encuentra desligado de dichas relaciones y no asume
            responsabilidad sobre fecha, valor, condiciones o informacion de terceros con los cuales
            el cliente realice movimientos a traves de la Plataforma Digital.
          </li>
          <li>
            Los vinculos o sitios enlazados de interes para el usuario. Quantum Data no genera,
            aprueba ni certifica los contenidos, informacion, material publicitario o servicios
            publicados en sitios vinculados. El acceso a dichos sitios es potestativo del usuario y
            se realiza bajo su propia responsabilidad.
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: "10",
    title: "10. Complementariedad",
    content: (
      <div className="space-y-4">
        <p>
          Los terminos y condiciones aqui consignados son complementarios a las politicas,
          condiciones y/o reglamentos de Quantum Data y bajo ninguna circunstancia reemplazan o
          sustituyen los reglamentos propios derivados de las especificaciones de cada uno.
        </p>
        <p>
          En consecuencia, la informacion adicional que se encuentre consignada en otras
          disposiciones conservara su aplicacion.
        </p>
      </div>
    ),
  },
  {
    id: "11",
    title: "11. Propiedad intelectual",
    content: (
      <div className="space-y-4">
        <p>
          Quantum Data no concede ninguna licencia o autorizacion de uso sobre los desarrollos
          intelectuales publicados en la Plataforma Digital ni sobre cualquier otra propiedad o
          derecho relacionado con sus contenidos.
        </p>
        <p>
          Los derechos de propiedad intelectual respecto de la Plataforma Digital son propiedad
          exclusiva de Quantum Data, especialmente en lo relacionado con su uso, explotacion,
          divulgacion, publicacion, reproduccion, distribucion y transformacion, razon por la cual
          ni el usuario ni el cliente adquieren derecho alguno por el simple uso de la Plataforma
          Digital.
        </p>
        <p>
          La Plataforma Digital contiene enlaces a paginas externas sobre las cuales Quantum Data no
          ejerce control alguno ni tiene responsabilidad. El contenido de tales enlaces sera
          responsabilidad exclusiva de las entidades respectivas y de la consulta propia del cliente
          y/o usuario.
        </p>
      </div>
    ),
  },
  {
    id: "12",
    title: "12. Firma electronica",
    content: (
      <div className="space-y-4">
        <p>
          El usuario y/o cliente acepta que se entiende como firma electronica cualquier forma de
          identificacion al usuario, incluidos datos como la direccion IP, nombre del usuario,
          contrasenas, un mensaje de texto con codigo enviado al telefono movil registrado, un
          correo electronico enviado al correo registrado o cualquier combinacion de estos medios.
        </p>
        <p>
          Conforme a lo dispuesto en el articulo 7 del Decreto 2364 de 2012, el usuario y/o cliente
          acepta que los codigos, contrasenas, OTP, datos biometricos o cualquier otro mecanismo
          dispuesto por Quantum Data en sus procesos de solicitud, aceptacion, autorizacion o
          aprobacion de productos y/o servicios constituyen tecnicas de identificacion personal o
          autenticacion electronica apropiadas y confiables.
        </p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Solicitud o aceptacion de productos y servicios por parte del cliente.</li>
          <li>Autenticacion para operaciones monetarias o no monetarias.</li>
          <li>Autorizacion para consulta y reporte de informacion en centrales.</li>
          <li>Autorizacion para el tratamiento de datos personales.</li>
          <li>Aceptacion de la Politica de Tratamiento de Datos Personales de Quantum Data.</li>
          <li>
            Cualquier otra autorizacion o declaracion impartida durante la solicitud del producto
            y/o servicio, reconociendo el contenido y suscripcion de documentos electronicos.
          </li>
        </ol>
        <p>
          El cliente y/o usuario acepta que su firma electronica o digital sustituye o reemplaza
          para todos los efectos su firma manuscrita y reconoce que tales actuaciones, documentos,
          ordenes u operaciones tienen todos los efectos juridicos consagrados en la Ley 527 de
          1999.
        </p>
        <p>
          El usuario autoriza que la firma electronica o digital sea almacenada, conservada y
          consultada con la finalidad de verificar su autenticidad. Tambien reconoce como realizado
          de manera personal o bajo su control cualquier documento u orden que aparezca con su firma
          electronica o digital capturada y almacenada en Quantum Data.
        </p>
        <p>
          El usuario se obliga a mantener control y custodia sobre los datos de creacion de la
          firma, actuar con diligencia para evitar su utilizacion no autorizada y dar aviso oportuno
          a Quantum Data sobre cualquier situacion que ponga en duda la seguridad de la firma
          digital. Asimismo, autoriza a Quantum Data para notificar comunicaciones, decisiones e
          informacion general por medios electronicos.
        </p>
      </div>
    ),
  },
  {
    id: "13",
    title: "13. Presentacion de Solicitudes y/o reclamaciones",
    content: (
      <div className="space-y-4">
        <p>
          Como cliente y/o usuario de Quantum Data, usted tiene derecho a conocer, actualizar,
          rectificar y/o eliminar los datos recolectados en las bases internas, asi como presentar
          solicitudes y/o reclamaciones relacionadas con los productos y/o servicios ofrecidos por
          la compania.
        </p>
        <p>Los medios para realizar estas solicitudes y/o reclamaciones son:</p>
        <ul className="space-y-3 pl-1">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
              1
            </span>
            <div>
              <span className="font-semibold text-foreground">Atencion presencial:</span>
              <span className="ml-1 text-muted-foreground">
                Carrera 56 # 9-17 Edificio Torre Americas Oficina 501
              </span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
              2
            </span>
            <div>
              <span className="font-semibold text-foreground">Linea de atencion telefonica:</span>
              <span className="ml-1 text-muted-foreground">(601) 3906972</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
              3
            </span>
            <div>
              <span className="font-semibold text-foreground">Correo electronico:</span>
              <a
                href="mailto:servicioalcliente@simonmovilidad.com"
                className="ml-1 text-primary hover:underline"
              >
                servicioalcliente@simonmovilidad.com
              </a>
            </div>
          </li>
        </ul>
      </div>
    ),
  },
]

export default function TerminosPage() {
  return (
    <SegmentProvider>
      <DemoModalProvider>
        <Header />

        <main className="min-h-screen bg-background pb-16 pt-24 lg:pb-20 lg:pt-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">
                Legal
              </span>
              <h1 className="mt-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">
                Terminos y Condiciones de Uso de la Plataforma Digital
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
                Quantum Data Processing de Colombia S.A.S. - Ultima actualizacion: 5 de febrero de
                2025
              </p>
            </div>

            <Accordion type="single" collapsible defaultValue="1" className="space-y-3">
              {sections.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="rounded-xl border border-border bg-card/40 px-5 transition-colors data-[state=open]:border-primary/20 data-[state=open]:bg-card/70"
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

            <div className="mt-12 rounded-xl border border-border bg-card/50 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Si tienes preguntas sobre estos terminos, contactanos en{" "}
                <a
                  href="mailto:servicioalcliente@simonmovilidad.com"
                  className="font-medium text-primary hover:underline"
                >
                  servicioalcliente@simonmovilidad.com
                </a>{" "}
                o al{" "}
                <a
                  href="https://wa.me/573105511862"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  WhatsApp +57 310 5511862
                </a>
              </p>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingFab />
        <DemoModal />
        <CookieBanner />
      </DemoModalProvider>
    </SegmentProvider>
  )
}
