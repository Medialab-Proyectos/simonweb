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

// ─── Sub-accordion for nested sections (Formas de Uso) ───────────────────────
function SubAccordion({
  items,
}: {
  items: { id: string; title: string; content: React.ReactNode }[]
}) {
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

// ─── Legal content blocks ────────────────────────────────────────────────────
const sections = [
  {
    id: "1",
    title: "1. Aceptacion de Politicas de la Plataforma Digital",
    content: (
      <div className="space-y-4">
        <p>
          Quantum Data Processing de Colombia S.A.S. (NIT 900.237.820-6), con domicilio en la Cra
          106 No. 15 A 25 Ofc 314 Ed Zf Business Center, Bogota D.C., Colombia, pone a disposicion
          de los usuarios el acceso a la Plataforma Digital mediante{" "}
          <a
            href="https://www.simonmovilidad.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            https://www.simonmovilidad.com/
          </a>{" "}
          y las aplicaciones moviles para Android e iOS.
        </p>
        <p>
          El uso de la Plataforma Digital, por parte del usuario y/o cliente indica que este ha
          leido y acepta los terminos y condiciones, asi como la politica de privacidad. Los
          usuarios deben utilizar la informacion de la plataforma de manera licita. Quantum Data se
          reserva el derecho de modificar los terminos de acuerdo con cambios tecnicos, comerciales
          y legales.
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
            "Almacenamiento fisico o digital de elementos de forma organizada para acceso futuro.",
          ],
          [
            "Autorizacion",
            "Consentimiento previo, expreso e informado del titular para el tratamiento de datos personales.",
          ],
          [
            "Base de Datos",
            "Conjunto organizado de datos sometido a tratamiento.",
          ],
          [
            "Cliente",
            "Persona natural o juridica con contrato de suscripcion con Quantum Data.",
          ],
          [
            "Dato Personal",
            "Informacion vinculada o que pueda asociarse a personas naturales determinadas o determinables.",
          ],
          [
            "Disponibilidad",
            "Posibilidad de una cosa o persona de estar presente cuando se la necesita.",
          ],
          [
            "Hacking",
            "Actividad que busca vulnerar los riesgos de seguridad de un sistema de informacion.",
          ],
          [
            "Plataforma Digital",
            "Sitio web https://www.simonmovilidad.com/ y/o aplicacion movil para sistemas Android/iOS.",
          ],
          [
            "Potestativo",
            "Hecho sujeto a la libre discrecion o autoridad del individuo.",
          ],
          [
            "Resguardar",
            "Proteger personas o cosas de algun perjuicio.",
          ],
          [
            "Servicios",
            "Actividades del proveedor que satisfacen necesidades del cliente.",
          ],
          [
            "Suspender",
            "Detener o interrumpir una accion temporal o indefinidamente.",
          ],
          [
            "Sistema de seguridad",
            "Conjunto de elementos interconectados que previenen, detectan o responden a intrusiones y tentativas de robo de informacion.",
          ],
          [
            "Tratamiento",
            "Operaciones sobre datos personales incluyendo recoleccion, almacenamiento, uso, circulacion o eliminacion.",
          ],
          [
            "Usuario",
            "Persona natural o juridica que utiliza la Plataforma Digital.",
          ],
          [
            "Variaciones tecnicas",
            "Acto y resultado de variar: cambiar, alterar.",
          ],
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
          Quantum Data proporciona servicios de geolocalizacion e informacion a los clientes para
          el acceso a datos. Esta informacion esta sujeta a reglas de interpretacion y analisis, por
          lo que su uso o aplicacion sera responsabilidad exclusiva del usuario y/o cliente.
        </p>
        <p>
          La compania podra negar, restringir o condicionar el acceso a la plataforma a su
          discrecion y podra modificar el contenido del portal sin previo aviso. Los usuarios y
          clientes no podran:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Realizar conductas contrarias a la legislacion o al presente documento que causen
            afectacion a Quantum Data, usuarios o clientes.
          </li>
          <li>
            Realizar actividades descritas como punibles en la legislacion aplicable.
          </li>
          <li>Vulnerar informaticamente cualquier aspecto de la plataforma.</li>
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
          La informacion disponible para clientes y usuarios es exclusivamente para fines de
          visualizacion de datos y comunicacion. Los usuarios deben verificar la informacion en
          fuentes oficiales. Quantum Data se reserva el derecho de modificar la Plataforma Digital,
          sin previo consentimiento y notificacion a los Usuarios y/o Clientes.
        </p>
        <p>
          Los clientes, mediante la creacion de usuario y contrasena por parte de Quantum Data,
          podran identificarse y ejecutar las funciones disponibles bajo su responsabilidad. Al usar
          los servicios de monitoreo, el usuario y/o cliente permite a Quantum Data acceder a su
          hardware de GPS y obtener de cualquier otro modo dicha informacion sobre su ubicacion y
          ruta.
        </p>

        {/* 4.1 Guantera */}
        <div className="mt-6 rounded-xl border border-border bg-card/50 p-5">
          <h4 className="text-base font-semibold text-foreground">
            4.1. Forma de Uso Modulo &ldquo;Guantera&rdquo;
          </h4>
          <p className="mt-3 text-muted-foreground">
            Este modulo proporciona acceso a la informacion del vehiculo agrupada en cuatro
            categorias: Propiedad, Mantenimiento, Seguros y Operacion para vehiculos con servicio de
            geolocalizacion SIMON.
          </p>
          <p className="mt-3 text-muted-foreground">
            Los datos provienen de fuentes externas incluyendo el RUNT (Registro Unico Nacional de
            Transito), municipios, departamentos, el Ministerio de Transporte de Colombia y
            entidades reguladoras. Quantum Data no garantiza la exactitud ni la actualizacion
            permanente de esta informacion. Por lo tanto, el usuario es responsable de verificar su
            actualizacion, exactitud y vigencia en los canales oficiales correspondientes.
          </p>
          <p className="mt-3 text-muted-foreground">
            El modulo presenta informacion exclusivamente con fines informativos sin asumir
            responsabilidad por los datos de fuentes oficiales.
          </p>

          <SubAccordion
            items={[
              {
                id: "4-1-propiedad",
                title: "Categoria Propiedad",
                content: (
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-foreground">a. Tarjeta de propiedad</h5>
                      <p className="mt-1">
                        Los usuarios podran subir fotos o documentos PDF de la tarjeta de propiedad
                        para vehiculos registrados en SIMON. La informacion puede incluir fuentes
                        externas como el RUNT. Quantum Data no se hace responsable por la veracidad
                        de la informacion. La carga de la tarjeta de propiedad es solo con fines de
                        registro; los originales deben presentarse a las autoridades cuando sea
                        requerido.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">b. Impuesto Vehicular</h5>
                      <p className="mt-1">
                        Datos provenientes de plataformas municipales, departamentales o de entidades
                        reguladoras disponibles para Bogota, Cali, Villavicencio, Barranquilla y
                        Medellin. El usuario debe consultar directamente en los canales oficiales de
                        su respectiva entidad territorial para confirmar la validez, vigencia y
                        posibles modificaciones de la informacion presentada.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">c. Mi Credito</h5>
                      <p className="mt-1">
                        Este modulo ofrece informacion parcial sobre los creditos asociados al
                        vehiculo del usuario con las entidades financieras que mantienen un convenio
                        vigente con Quantum Data. Esta informacion no es oficial y requiere
                        verificacion del usuario con las entidades financieras directamente. Quantum
                        Data no asume responsabilidad alguna.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">d. Otros documentos</h5>
                      <p className="mt-1">
                        Los usuarios podran subir documentos adicionales predefinidos por la
                        plataforma para facilitar su acceso. La digitalizacion de documentos no
                        reemplaza los originales. Los usuarios verifican la validez, estado y
                        condicion de los documentos.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                id: "4-1-seguros",
                title: "Categoria Seguros",
                content: (
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-foreground">a. Submodulo SOAT</h5>
                      <p className="mt-1">
                        Este modulo proporciona informacion sobre la vigencia del SOAT, numero de
                        poliza y fecha de vencimiento a partir de consultas al RUNT, sujeto a
                        actualizaciones, modificaciones o errores de la plataforma. El usuario es
                        responsable de confirmar la validez de la informacion con las autoridades de
                        transito, movilidad o la entidad emisora del SOAT.
                      </p>
                      <p className="mt-2">
                        La informacion de la plataforma no constituye compra, renovacion o asesoria
                        de seguros. Las solicitudes de servicio se transfieren a PROMOTEC LTDA.
                        AGENCIA DE SEGUROS para contacto con asesores y contratacion.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">b. Poliza de seguro</h5>
                      <p className="mt-1">
                        Los usuarios autorizan compartir informacion con aliados comerciales de
                        Quantum Data incluyendo aseguradoras y agencias para el ofrecimiento de
                        productos de seguros. El modulo muestra polizas &ldquo;Todo Riesgo&rdquo;
                        donde PROMOTEC LTDA. actua como intermediario, mostrando numero de poliza,
                        aseguradora, vigencia y fecha de vencimiento.
                      </p>
                      <p className="mt-2">
                        Para polizas endosadas o con intermediarios diferentes, los usuarios podran
                        ingresar los datos manualmente. La actualizacion y veracidad de esta
                        informacion sera responsabilidad exclusiva del usuario, por lo que Quantum
                        Data no asumira ninguna responsabilidad por la exactitud, integridad o
                        actualizacion de los datos ingresados.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">Asistencias Viales</h5>
                      <p className="mt-1">
                        Este modulo informa a los clientes sobre los servicios de asistencia
                        disponibles. Los servicios de asistencia son prestados exclusivamente por
                        Asistencias y Servicios Automatizados Ya S.A.S. (Asisya), por lo que no se
                        entendera que Quantum Data participa en la prestacion de dichos servicios.
                        Quantum Data no asume responsabilidad por el alcance de las asistencias ni
                        por los danos resultantes.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                id: "4-1-mantenimiento",
                title: "Categoria Mantenimiento",
                content: (
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-foreground">
                        a. Submodulo RTM (Revision Tecnico Mecanica)
                      </h5>
                      <p className="mt-1">
                        El submodulo RTM permite consultar informacion sobre la vigencia de la
                        Revision Tecnico-Mecanica, incluyendo la fecha de la ultima revision y la
                        fecha del proximo vencimiento. Los datos son extraidos del RUNT y estan
                        sujetos a cambios de la plataforma. Las inconsistencias requieren aclaracion
                        directa con el Centro de Diagnostico Automotor (CDA).
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                id: "4-1-operacion",
                title: "Categoria Operacion",
                content: (
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-foreground">a. Licencia de conduccion</h5>
                      <p className="mt-1">
                        Los usuarios podran subir fotos o documentos digitalizados de la licencia de
                        conduccion mostrando categorias activas y vigencia. El cargue de la licencia
                        de conduccion solo es con fines de registro, por lo cual, no sustituye el
                        documento original.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">b. Pico y placa</h5>
                      <p className="mt-1">
                        Datos provenientes de plataformas municipales, departamentales o de entidades
                        reguladoras disponibles para Bogota, Cali, Villavicencio, Barranquilla y
                        Medellin. Los usuarios deben consultar los canales oficiales para confirmar
                        la validez y posibles modificaciones.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">c. Kit de Carretera</h5>
                      <p className="mt-1">
                        La informacion se alinea con la normatividad vigente del Ministerio de
                        Transporte segun el Codigo Nacional de Transito. Es deber del usuario
                        verificar la normatividad vigente y los cambios de la misma.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">
                        d. Botiquin de Primeros Auxilios
                      </h5>
                      <p className="mt-1">
                        La informacion se alinea con la normatividad del Ministerio de Transporte
                        segun el Codigo Nacional de Transito. Los usuarios deben verificar la
                        normatividad vigente y sus cambios.
                      </p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    id: "5",
    title: "5. Acceso",
    content: (
      <div className="space-y-4">
        <p>
          Los clientes de la compania acceden a la Plataforma Digital mediante usuario y contrasena
          asignados que constituyen firma electronica identificando a los clientes en las relaciones
          con Quantum Data.
        </p>
        <p>
          El uso del Password de seguridad es personal e intransferible, por lo que quien lo
          administra es el usuario como unico responsable de la confidencialidad del mismo. Los
          clientes deben mantener sus credenciales estrictamente confidenciales. Los usuarios no
          podran transferir ni ser sustituidos por terceros en el ejercicio de los derechos y
          compromisos asignados. Los clientes asumen la responsabilidad de la seguridad y el
          cumplimiento de las politicas.
        </p>
        <p>
          La informacion suministrada al momento de acceder y usar la Plataforma Digital, es
          confidencial. Quantum Data no se hara responsable de los perjuicios ocasionados en caso de
          que el Cliente y/o usuario, divulgue dicha informacion.
        </p>
      </div>
    ),
  },
  {
    id: "6",
    title:
      "6. Veracidad, confidencialidad y autorizacion de los datos personales",
    content: (
      <div className="space-y-4">
        <p>
          La informacion suministrada por el cliente esta sometida al tratamiento de la compania
          segun los fines y politicas establecidos en{" "}
          <a
            href="https://www.simonmovilidad.com/docs/Pol%C3%ADticas_PDP_.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            la Politica de Tratamiento de Datos Personales
          </a>
          . La informacion debe ser veraz, verificable y actualizada. Quantum Data garantiza que las
          credenciales asignadas para acceder a la informacion mediante la pagina y/o aplicacion,
          estan basadas en la veracidad de la misma.
        </p>
        <p>
          Los clientes y usuarios comprenden y autorizan el tratamiento y almacenamiento de datos
          para la validacion de identidad, identificacion del perfil de usuario y las acciones
          requeridas para el uso de la Plataforma Digital.
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
          Los usuarios y clientes comprenden y autorizan el almacenamiento y tratamiento seguro de
          datos segun los limites de la naturaleza de los datos personales y la Ley 1581 de 2012, el
          Decreto 1377 de 2013 y las normas concordantes. El tratamiento requiere el consentimiento
          previo del autorizante.
        </p>
        <p>
          Para condiciones optimas de seguridad, los clientes y usuarios deben:
        </p>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            Generar credenciales de entrada optimas y condiciones de seguridad (como preguntas de
            seguridad) para las operaciones que Quantum Data considere necesarias en la plataforma;
            los usuarios son responsables del cuidado y confidencialidad de sus credenciales.
          </li>
          <li>
            Entender que sin el uso de contrasena, el acceso al sistema y la realizacion de
            funciones resulta imposible. Las credenciales entregadas y generadas por el usuario
            incluyendo nombre de usuario, contrasena de entrada, contrasena dinamica, respuestas de
            seguridad y mecanismos futuros son personales e intransferibles; los usuarios mantienen
            la responsabilidad de privacidad de la contrasena.
          </li>
          <li>
            En casos de sospecha de acceso no autorizado o descubrimiento de vulneracion de
            credenciales, los usuarios deben tomar las medidas necesarias incluyendo cambio de
            contrasena y preguntas de seguridad para prevenir el uso no autorizado o fraudulento.
          </li>
          <li>
            Si las condiciones adecuadas de creacion de usuario no son viables a traves de la pagina
            o la aplicacion movil, los usuarios deben comunicarse con Quantum Data a traves de los
            canales disponibles para la gestion adecuada del acceso.
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
          Quantum Data se esfuerza por proporcionar disponibilidad de la Plataforma Digital las 24
          horas del dia, los 7 dias de la semana, los 365 dias del ano. Aun asi, Quantum Data se
          reserva el derecho y la disposicion de restringir, suspender o interrumpir el servicio de
          forma temporal o permanente por razones de seguridad, dificultades tecnicas, fallas de
          Internet o razones ajenas.
        </p>
        <p>
          Los usuarios entienden que Quantum Data no garantiza acceso continuo e ininterrumpido. Las
          interrupciones del servicio promueven la diligencia de Quantum Data para la pronta
          restauracion sin obligar responsabilidad.
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
          garantiza precision y no ofrece soporte para consultas derivadas de informacion de
          terceros.
        </p>
        <p>
          Quantum Data no asume responsabilidad por el uso, divulgacion, modificacion o eliminacion
          de datos derivados de dichas consultas. La responsabilidad del usuario y cliente incluye
          verificar la precision a traves de fuentes oficiales.
        </p>
        <p>Quantum Data no asume responsabilidad por:</p>
        <ol className="list-decimal space-y-3 pl-6">
          <li>
            Uso indebido del servicio por si mismo o por personas no autorizadas; los clientes
            asumen la responsabilidad de los movimientos ordenados por canal desarrollando
            condiciones de seguridad adecuadas.
          </li>
          <li>
            Fuerza mayor, casos fortuitos, causas ajenas o actos de terceros que potencialmente
            causen perjuicio al cliente/usuario, imposibilidad de realizacion de operaciones,
            retraso, desvio o alteracion.
          </li>
          <li>
            Circunstancias donde la falla o rechazo de operacion se origine en clientes, usuarios,
            terceros, tales como errores en fuentes de informacion o desactualizacion, operacion
            incorrecta del sistema, informacion insuficiente en formularios, dano en sistemas de
            transmision de datos o asuntos externos a la operacion de Quantum Data.
          </li>
          <li>
            Sitios de proveedores terceros y relaciones con cualquier persona. Quantum Data permanece
            desconectado de las relaciones comerciales y contractuales entre el cliente y terceros;
            por tanto no existe responsabilidad de Quantum Data respecto a la fecha, valor,
            condiciones o informacion de terceros con los cuales los clientes realizan movimientos en
            la plataforma, ni por errores o desinformacion de terceros.
          </li>
          <li>
            Quantum Data a traves de su Plataforma Digital podra incluir enlaces de interes (sitios
            vinculados). Quantum Data no genera, aprueba o certifica los contenidos, informacion,
            material publicitario o servicios incluidos y publicados en los sitios vinculados. El
            acceso a sitios vinculados queda a opcion del usuario, asumiendo la responsabilidad de
            acceso.
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
          condiciones y/o reglamentos de Quantum Data; bajo ninguna circunstancia reemplaza o
          sustituye los reglamentos propios derivados de las especificaciones de cada uno.
        </p>
        <p>La informacion adicional a esta regulacion mantiene su aplicacion.</p>
      </div>
    ),
  },
  {
    id: "11",
    title: "11. Propiedad intelectual",
    content: (
      <div className="space-y-4">
        <p>
          Quantum Data no concede licencia ni autorizacion de uso sobre los desarrollos
          intelectuales publicados en la Plataforma Digital ni sobre la propiedad o derechos
          relacionados. Los derechos de propiedad intelectual respecto de la Plataforma Digital, son
          propiedad exclusiva de Quantum Data, y en especial lo relacionado con su uso, explotacion,
          divulgacion, publicacion, reproduccion, distribucion y transformacion.
        </p>
        <p>
          Los usuarios y clientes no adquieren derechos por el simple uso de la plataforma. La
          plataforma contiene enlaces a paginas externas sobre las cuales Quantum Data no ejerce
          control y no asume responsabilidad. El contenido de dichos enlaces es responsabilidad
          exclusiva de las respectivas entidades y la consulta es del cliente/usuario.
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
          El Usuario y/o Cliente acepta que se entiende como firma electronica cualquier forma de
          identificacion al usuario, datos como la direccion IP, nombre del usuario, contrasenas, un
          mensaje de texto con un codigo enviado al telefono movil registrado, un correo electronico
          enviado al correo electronico registrado.
        </p>
        <p>
          Conforme al Articulo 7 del Decreto 2364 de 2012, los usuarios aceptan que codigos,
          contrasenas (OTP), datos biometricos o mecanismos proporcionados por Quantum Data en
          procesos de solicitud, aceptacion, autorizacion y aprobacion de productos/servicios
          constituyen tecnicas de identificacion personal o autenticacion electronica apropiadas y
          confiables que cumplen los requisitos de firma para el reconocimiento de autoria y
          contenido de los actos o negocios juridicos realizados con Quantum Data:
        </p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Solicitud o aceptacion de productos y servicios del cliente.</li>
          <li>Autenticacion de operaciones monetarias o no monetarias.</li>
          <li>Consulta de informacion y autorizacion de reportes centrales.</li>
          <li>Autorizacion de tratamiento de datos personales.</li>
          <li>
            Aceptacion de la Politica de Tratamiento de Datos Personales de Quantum Data.
          </li>
          <li>
            Cualquier otra autorizacion o declaracion durante la solicitud de productos/servicios,
            reconociendo el contenido y suscripcion del documento.
          </li>
        </ol>
        <p>
          El Cliente y/o Usuario aceptan que su firma electronica o digital, sustituye o reemplaza
          para todos los efectos su firma manuscrita y reconoce que dichos actos, documentos,
          ordenes y operaciones tienen los efectos legales de la Ley 527 de 1999. Los usuarios
          autorizan el almacenamiento, preservacion y consulta de la firma electronica para
          verificacion de autenticidad. Los usuarios reconocen que la captura de firma se almacena
          en las aplicaciones de gestion de Quantum Data y su recuperacion por realizacion de
          transaccion o autorizacion y generacion de documentos u ordenes.
        </p>
        <p>
          Los usuarios reconocen que los documentos u ordenes que aparezcan con firma electronica
          capturada y almacenada son efectivamente completados personalmente o bajo su control y
          responsabilidad. Los usuarios se obligan al mantenimiento de custodia y control de la
          creacion de datos, ejerciendo diligencia para prevenir la utilizacion no autorizada de
          datos de creacion de firma, y aviso oportuno a Quantum Data de situaciones que generen
          duda sobre la seguridad de la firma digital. Todo lo acordado en el presente conserva
          vigencia y produce los efectos correspondientes contra todas las operaciones o documentos
          firmados u ordenados mientras se mantenga el estatus de usuario de Quantum Data.
        </p>
        <p>
          Los usuarios autorizan a Quantum Data a notificar comunicaciones, decisiones e informacion
          general mediante el correo electronico indicado o informacion obtenida mediante consulta de
          informacion central.
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
          Como clientes y usuarios de Quantum Data, se tienen derechos a conocer, actualizar,
          rectificar y/o eliminar datos recolectados en bases de datos y presentar solicitudes y/o
          quejas (PQRs) relacionadas con los productos y servicios ofrecidos por la compania.
        </p>
        <p>Los medios de solicitud y reclamacion son:</p>
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
              <span className="font-semibold text-foreground">Linea telefonica:</span>
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

        <div className="mt-6 rounded-xl border border-border bg-card/50 p-5">
          <h4 className="text-sm font-semibold text-foreground">
            Informacion de contacto adicional
          </h4>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>
              Telefono/WhatsApp:{" "}
              <a href="tel:018000189890" className="text-primary hover:underline">
                018000189890
              </a>{" "}
              -{" "}
              <a href="https://wa.me/573232203121" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                3232203121
              </a>
            </li>
            <li>
              Tigo/Claro:{" "}
              <span className="font-semibold text-foreground">#230</span>
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:servicioalcliente@simonmovilidad.com"
                className="text-primary hover:underline"
              >
                servicioalcliente@simonmovilidad.com
              </a>
            </li>
            <li>Horario de atencion: 24/7</li>
          </ul>
        </div>
      </div>
    ),
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────
export default function TerminosPage() {
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
                Terminos y Condiciones de Uso de la Plataforma Digital
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
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

            {/* Bottom contact card */}
            <div className="mt-12 rounded-xl border border-border bg-card/50 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Si tienes preguntas sobre estos terminos, contactanos en{" "}
                <a
                  href="mailto:servicioalcliente@simonmovilidad.com"
                  className="text-primary hover:underline font-medium"
                >
                  servicioalcliente@simonmovilidad.com
                </a>{" "}
                o al{" "}
                <a
                  href="https://wa.me/573105511862"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
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
