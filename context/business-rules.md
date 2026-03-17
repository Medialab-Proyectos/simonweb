# Business Rules

Este documento contiene las reglas de negocio que rigen el comportamiento del producto Simon Movilidad. Estas reglas se basan en los requerimientos corporativos, el manual de marca y las definiciones técnicas de producto.

---

# 1. Reglas del dominio

Describe la lógica central del ecosistema de movilidad inteligente.

## Ecosistema Transaccional

Simon no es solo una App de rastreo; es un ecosistema de movilidad basado en un modelo transaccional que integra seguros, asistencias y pagos (Simon Pay)

## Centralidad del Vehículo

Para los usuarios B2C, todos los servicios y la arquitectura de información funcionan alrededor del vehículo. Los servicios mostrados se actualizan dinámicamente según el vehículo seleccionado

## Cobertura de Monitoreo

El rastreo satelital y las geocercas operan 24/7, pero las asistencias viales y otros beneficios están sujetos a la disponibilidad del prestador

---

# 2. Reglas de estados del sistema

Cada vehículo registrado debe reportar un estado claro:

- Activo / Conectado
  Desconectado (sin señal de telemetría).

## Vigencia de Documentos (Guantera)

Los documentos en la "Guantera Digital" (ahora denominada "Documentos del Vehículo") deben mostrar estados de vigencia
Vigente (Color cian).
Próximo a vencer (Color naranja).
Vencido (Color rojo).

---

# 3. Reglas de acceso y permisos

## Roles del Sistema

- B2C (Personas): Acceso a localización, documentos, seguros y asistencias particulares
- B2B (Empresas/Flotas): Acceso a herramientas de optimización de costos, rentabilidad y telemetría avanzada

## Usuarios sin vehículo

Los usuarios que no tienen un vehículo registrado pero cuentan con servicios contratados (ej. seguros) pueden acceder a los módulos de Seguros y Documentos, pero tienen restringidas las funciones de Telemetría y Localización.

---

# 4. Reglas de validación

## Garantía de Equipos

Todos los dispositivos instalados cuentan con una regla de validación de garantía de 12 meses

## Denominación de Módulos

En la interfaz técnica y comunicaciones formales de producto, se debe evitar el nombre "Guantera", prefiriendo "Documentos del vehículo" para mayor claridad

---

# 5. Reglas de procesos o flujos

## Solicitud de Asistencias

El proceso de asistencia no es automatizado por chatbot. El usuario debe:

- Acceder al módulo de Asistencias.
- Pulsar el botón de llamada (marcado rápido #230 o #280)
- Ser atendido por un agente humano (no se permite el uso de avatares de chatbot)

## Visualización de Servicios (Grid)

## La interfaz principal debe limitar la visualización a un máximo de 6 servicios principales en un grid de 2 columnas para evitar la saturación cognitiva del usuario

# 6. Reglas de cálculo o lógica interna

## Métricas de Impacto (Landing Page)

Las cifras mostradas en la web deben reflejar datos reales validados por el equipo de producto.

- +50.000 Dispositivos instalados.
- +44.000 Vehículos activos.
- +19.000 Vehículos productivos.
- Regla Crítica: Está prohibido mostrar porcentajes de satisfacción de clientes por solicitud expresa de mercadeo

---

# 7. Restricciones del sistema

## Identidad Visual

El sistema debe operar bajo el esquema de Modo Oscuro (fondo negro) con el uso de Verde Cian (#00FFC2) para acentos, iconos y elementos activos [Manual Simon Vrt].

## Isotipo de Marca

El isotipo del candado de Simon debe aparecer siempre centrado y en un tamaño reducido en el footer de las aplicaciones y el sitio web

---

# 8. Reglas de comunicación con el usuario

## Canales Oficiales de Contacto

Toda comunicación de soporte debe dirigir a los canales validados:

- WhatsApp: (+57) 310 5511862
- Marcación rápida: #230 o #280
- Línea Nacional: 01 8000 189 890.

## Notificaciones de Vencimiento

El sistema debe alertar automáticamente al usuario sobre el vencimiento próximo de documentos críticos como SOAT y RTM

---

# 9. Reglas que el agente UX debe respetar

El agente UX:

- No debe incluir la métrica de satisfacción de clientes en ningún componente visual.
- Debe incluir obligatoriamente el asterisco (*) con la nota legal: *Sujeto a disponibilidad del prestador de servicio en la sección de asistencias y beneficios
- Debe priorizar las cifras de impacto al inicio de la landing page para generar confianza inmediata [Feedback].

---

# 10. Supuestos permitidos

- Se permite el uso de imágenes de modelos de vehículos genéricos de alta gama (ej. sedán blanco) con efectos de luz neón cian si no se dispone de fotografías reales de la flota
  Se asume la integración de Simon Pay como una sección de "Expectativa" o "Muy pronto" en la fase actual de la landing page
