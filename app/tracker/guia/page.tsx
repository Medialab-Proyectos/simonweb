"use client";

import { HelpCircle, ClipboardList, Calculator, BarChart2, Users, TrendingUp, Package, Lightbulb } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "que-es",
    icon: HelpCircle,
    title: "¿Para qué sirve esta herramienta?",
    color: "text-cyan-400",
    content: `Esta herramienta es el sistema interno de medición y estimación del equipo UX de Simon Movilidad.

Tiene tres propósitos principales:

1. **Registrar desempeño real**: guarda datos de proyectos ya ejecutados — horas, vistas, calidad, retrabajo, conexión.

2. **Calcular KPIs por rol**: mide productividad, calidad, precisión y eficiencia de cada rol (Junior, Senior, Líder UX).

3. **Estimar proyectos futuros**: usa el historial para proyectar horas, riesgo y tiempo de entrega de proyectos nuevos.

Con el tiempo, a medida que se registran más proyectos, la herramienta se vuelve más precisa y útil para planeación de capacidad.`,
  },
  {
    id: "como-registrar",
    icon: ClipboardList,
    title: "¿Cómo registrar un proyecto real?",
    color: "text-blue-400",
    content: `Ve a la sección **Registro** en el menú lateral.

**Modo Rápido**: ingresa los datos esenciales — producto, proyecto, complejidad, plataforma, horas por rol, vistas y calidad.

**Modo Completo**: incluye campos adicionales como tipos de investigación, notas por rol, sistema de diseño y observaciones.

Para cada rol que participó:
1. Activa el switch "Participó"
2. Ingresa horas de diseño, ajustes y conexión
3. Activa investigación si el rol participó en discovery
4. Ingresa producción: vistas principales, responsive, estados extra, corregidas y conectadas
5. Ingresa revisiones recibidas y puntaje de calidad del stakeholder (1-10)
6. Indica si entregó a tiempo

Al final, ingresa las horas reales totales y las horas estimadas del proyecto.`,
  },
  {
    id: "como-estimar",
    icon: Calculator,
    title: "¿Cómo usar el estimador?",
    color: "text-amber-400",
    content: `Ve a la sección **Estimador** en el menú lateral.

1. Ingresa el nombre del producto y los parámetros del proyecto: tipo de trabajo, plataforma, complejidad y claridad del requerimiento.
2. Define el número de vistas estimadas: principales, responsive y estados extra.
3. Indica si el proyecto requiere conexión de flujos y/o discovery.
4. Selecciona los roles participantes y su % de participación.
5. Haz clic en "Calcular estimación".

El sistema genera cuatro rangos: **Optimista**, **Probable**, **Base** y **Conservadora**.

La confianza de la estimación depende de cuántos proyectos similares existen en el historial. Con más proyectos registrados, la estimación es más precisa.`,
  },
  {
    id: "campos",
    icon: Lightbulb,
    title: "¿Qué significa cada campo?",
    color: "text-purple-400",
    content: `**Vistas principales**: pantallas únicas que representan un estado o flujo completo.

**Vistas responsive**: adaptaciones de la misma pantalla a otro tamaño (ej: escritorio vs tablet). Valen 0.75 en el throughput ponderado.

**Estados extra / negativos**: pantallas de estado vacío, error, cargando, etc. Valen 0.5 en el throughput ponderado.

**Vistas corregidas**: pantallas que debieron rehacerse o ajustarse por observaciones del stakeholder. Base del cálculo de retrabajo.

**Vistas conectadas**: pantallas que están correctamente enlazadas dentro del prototipo o flujo de Figma.

**Calidad del stakeholder**: puntaje de 1 a 10 que el dueño de producto o stakeholder asigna al entregable.

**Horas estimadas**: horas que el equipo calculó que tomaría el proyecto antes de iniciarlo. Fundamental para la precisión de estimación.`,
  },
  {
    id: "kpis",
    icon: BarChart2,
    title: "¿Qué significa cada KPI?",
    color: "text-emerald-400",
    content: `**Throughput**: vistas entregadas por hora. Mide velocidad de producción.

**Throughput ponderado**: ajusta el valor por tipo de vista. Más representativo que el simple.

**Tasa de retrabajo**: % de vistas que debieron corregirse. Menos es mejor.

**Índice de conexión**: % de vistas correctamente enlazadas. Mide calidad estructural del flujo.

**Calidad promedio**: promedio de puntaje del stakeholder.

**Entrega a tiempo**: % de entregas dentro del plazo. Mide confiabilidad.

**Capacidad efectiva**: throughput ponderado ajustado por retrabajo. El KPI más completo.

**Precisión de estimación**: qué tan cerca estuvo la estimación de las horas reales.

**Desviación de estimación**: diferencia porcentual. Positiva = subestimación.`,
  },
  {
    id: "semaforos",
    icon: TrendingUp,
    title: "¿Cómo interpretar los semáforos?",
    color: "text-rose-400",
    content: `Los semáforos indican el estado de salud de cada KPI en tres niveles:

🟢 **Saludable**: el KPI está dentro del rango óptimo. No requiere acción inmediata.

🟡 **Atención**: el KPI está por fuera del rango ideal pero no es crítico. Revisar las causas.

🔴 **Crítico**: el KPI está en zona de riesgo. Requiere acción o investigación urgente.

Los rangos de cada semáforo son configurables en la sección **Configuración** del sistema.

Ejemplo:
- Retrabajo 12% → 🟢 Saludable (< 20%)
- Retrabajo 24% → 🟡 Atención (entre 20% y 30%)
- Retrabajo 38% → 🔴 Crítico (> 30%)`,
  },
  {
    id: "roles",
    icon: Users,
    title: "¿Cómo comparar roles sin sesgo?",
    color: "text-indigo-400",
    content: `Los roles no deben compararse directamente en todos los KPIs porque tienen responsabilidades distintas.

**Junior**: foco en producción y reducción de retrabajo. Sus métricas de velocidad mejoran con la experiencia.

**Senior**: foco en throughput, calidad estructural y conexión de flujos. Es el rol más productivo en volumen.

**Líder UX**: foco en calidad final, precisión de estimación y eficiencia de investigación. No se espera que tenga el mayor throughput.

Para comparar de forma justa:
- Usa la **Capacidad efectiva** como KPI integrador.
- Compara cada rol consigo mismo en el tiempo (curva de aprendizaje).
- No penalices al Líder por menor throughput si su calidad y precisión son altas.`,
  },
  {
    id: "estimacion",
    icon: Calculator,
    title: "¿Cómo leer horas estimadas vs reales?",
    color: "text-cyan-400",
    content: `La comparativa de horas estimadas vs reales mide la madurez del proceso de planeación.

**Desviación positiva** (ej: +25%): el proyecto tomó más tiempo del estimado. Común en proyectos de alta complejidad o con requerimientos poco claros.

**Desviación negativa** (ej: -10%): el proyecto fue más rápido. Puede indicar sobreestimación o subestimación del alcance real.

**Desviación ideal**: entre -15% y +15%.

Para mejorar la precisión:
- Registrar horas desglosadas por rol y actividad.
- Incluir horas de investigación en la estimación.
- Usar el estimador interno que aprende del historial.
- Comparar proyectos similares antes de estimar.`,
  },
  {
    id: "curvas",
    icon: TrendingUp,
    title: "¿Cómo leer una curva de desempeño?",
    color: "text-emerald-400",
    content: `Las curvas de desempeño en la sección **Tendencias** muestran la evolución acumulada de cada KPI a lo largo del tiempo.

**Eje X**: proyectos en orden cronológico.

**Eje Y**: valor del KPI calculado acumulativamente.

**Línea punteada**: umbral de referencia (meta).

Cómo interpretar:

- **Línea ascendente en throughput, calidad o conexión** → mejora sostenida.
- **Línea descendente en retrabajo** → reducción de correcciones. Positivo.
- **Línea plana** → estabilidad. Revisar si es normal o hay estancamiento.
- **Línea que cruza el umbral de abajo hacia arriba** → el equipo superó la meta.

Las zonas de color (cuando estén disponibles) indican rangos saludable, atención y crítico.`,
  },
  {
    id: "capacidad",
    icon: Package,
    title: "¿Cómo usar esto para planificación de capacidad?",
    color: "text-amber-400",
    content: `Esta herramienta permite tomar decisiones informadas de carga y asignación.

**Para proyectos futuros**:
1. Usa el Estimador con los parámetros del proyecto.
2. Compara el rango probable de horas con la disponibilidad del equipo.
3. Usa la capacidad efectiva por rol para saber quién puede absorber más carga.

**Para análisis de carga actual**:
- Revisa el Dashboard general para ver horas totales y distribución.
- Usa KPIs por Rol para identificar qué rol está más tensionado.
- Usa KPIs por Producto para identificar qué producto requiere más atención.

**Reglas prácticas**:
- Un rol con retrabajo > 30% no debería asumir proyectos de alta complejidad sin acompañamiento.
- Un rol con precisión de estimación < 60% se beneficia de desglosar actividades antes de estimar.
- El Líder UX con alta carga de investigación tiene menos disponibilidad para producción directa.`,
  },
];

export default function GuiaPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <HelpCircle className="h-6 w-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Guía de uso e interpretación</h1>
          <p className="text-sm text-slate-400">Todo lo que necesitas saber para usar esta herramienta con efectividad</p>
        </div>
      </div>

      {/* Quick nav */}
      <div className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="text-xs px-3 py-1.5 rounded-full border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors"
          >
            {s.title.split("¿")[1]?.split("?")[0]?.trim() ?? s.title}
          </a>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              id={section.id}
              className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800">
                <Icon className={cn("h-5 w-5 shrink-0", section.color)} />
                <h2 className="text-sm font-semibold text-slate-200">{section.title}</h2>
              </div>
              <div className="px-5 py-4">
                <div className="prose prose-sm prose-invert max-w-none">
                  {section.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("**") && para.endsWith("**") && para.split("**").length === 3) {
                      return <h4 key={i} className="text-sm font-semibold text-slate-200 mt-3 mb-1">{para.slice(2, -2)}</h4>;
                    }
                    // Parse inline bold
                    const parts = para.split(/\*\*(.*?)\*\*/g);
                    return (
                      <p key={i} className="text-sm text-slate-400 leading-relaxed mb-2">
                        {parts.map((part, j) =>
                          j % 2 === 1 ? (
                            <strong key={j} className="text-slate-200 font-medium">{part}</strong>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
