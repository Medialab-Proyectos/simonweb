// ============================================================
// KPI Definitions — Metadata, formulas, interpretations
// ============================================================

export interface KPIDefinition {
  id: string;
  name: string;
  definition: string;
  formula: string;
  whyItMatters: string;
  howToInterpret: string;
  impacts: ("productividad" | "calidad" | "capacidad" | "estimación")[];
  unit: "%" | "vistas/hora" | "horas" | "score" | "número";
  recommendedRange: { min: number; max: number; label: string };
  example: string;
  tooltip: string;
}

export const KPI_DEFINITIONS: KPIDefinition[] = [
  {
    id: "throughput",
    name: "Throughput por rol",
    definition:
      "Cantidad de vistas entregadas por hora de trabajo de un rol específico.",
    formula: "vistas entregadas ÷ horas de trabajo",
    whyItMatters:
      "Mide la velocidad de producción real. Permite comparar rendimiento entre roles y períodos.",
    howToInterpret:
      "Un valor alto indica alta productividad. Debe analizarse junto con calidad y retrabajo para evitar interpretaciones engañosas.",
    impacts: ["productividad", "capacidad"],
    unit: "vistas/hora",
    recommendedRange: { min: 0.8, max: 99, label: "> 0.8 vistas/hora" },
    example:
      "Si el Senior entregó 20 vistas en 16 horas, su throughput es 1.25 vistas/hora.",
    tooltip: "Vistas entregadas por hora trabajada",
  },
  {
    id: "weighted_throughput",
    name: "Throughput ponderado",
    definition:
      "Throughput ajustado por tipo de vista: las responsivas valen 0.75 y los estados extra 0.5.",
    formula:
      "(vistas principales + responsivas × 0.75 + estados extra × 0.5) ÷ horas trabajadas",
    whyItMatters:
      "Refleja el esfuerzo real más allá del conteo de vistas. Penaliza menos el volumen de estados simples.",
    howToInterpret:
      "Más representativo que el throughput simple. Los factores son configurables según la complejidad real del equipo.",
    impacts: ["productividad", "capacidad"],
    unit: "vistas/hora",
    recommendedRange: { min: 0.7, max: 99, label: "> 0.7 ponderadas/hora" },
    example:
      "10 vistas principales + 6 responsivas×0.75 + 4 estados×0.5 = 16.5 puntos ponderados en 12h = 1.38/hora.",
    tooltip: "Throughput ajustado por peso de cada tipo de vista",
  },
  {
    id: "rework_rate",
    name: "Tasa de retrabajo",
    definition:
      "Porcentaje de vistas entregadas que debieron corregirse o rehacerse.",
    formula: "vistas corregidas ÷ vistas totales entregadas × 100",
    whyItMatters:
      "Indica problemas de claridad inicial, ejecución o validación. Alto retrabajo reduce la capacidad efectiva real.",
    howToInterpret:
      "Menos es mejor. Un retrabajo de 28% indica que casi 3 de cada 10 vistas requirieron corrección.",
    impacts: ["calidad", "capacidad"],
    unit: "%",
    recommendedRange: { min: 0, max: 20, label: "< 20%" },
    example:
      "Si se entregaron 30 vistas y 8 fueron corregidas, el retrabajo es 26.7%.",
    tooltip: "% de vistas que requirieron corrección",
  },
  {
    id: "connection_index",
    name: "Índice de conexión",
    definition:
      "Porcentaje de vistas que fueron conectadas correctamente dentro del flujo.",
    formula: "vistas conectadas correctamente ÷ total vistas asignadas × 100",
    whyItMatters:
      "Mide la calidad estructural del flujo. Baja conexión produce prototipos fragmentados y aumenta el retrabajo.",
    howToInterpret:
      "Cercano al 100% es ideal. Valores bajos sugieren entrega de pantallas aisladas sin contexto de flujo.",
    impacts: ["calidad"],
    unit: "%",
    recommendedRange: { min: 80, max: 100, label: "> 80%" },
    example:
      "Si se asignaron 25 vistas y 20 están conectadas, el índice es 80%.",
    tooltip: "% de vistas correctamente conectadas en el flujo",
  },
  {
    id: "quality_score",
    name: "Puntaje de calidad",
    definition: "Promedio del puntaje otorgado por el stakeholder (1 a 10).",
    formula: "promedio de scores de stakeholder",
    whyItMatters:
      "Refleja la percepción de calidad del cliente interno. Captura dimensiones no medibles con datos de producción.",
    howToInterpret:
      "8 o más es saludable. Menos de 6 indica problemas de alineación con expectativas.",
    impacts: ["calidad"],
    unit: "score",
    recommendedRange: { min: 7.5, max: 10, label: "> 7.5/10" },
    example:
      "Si el stakeholder evaluó 3 proyectos con 9, 7 y 8, el puntaje promedio es 8.0.",
    tooltip: "Promedio de evaluación del stakeholder (1-10)",
  },
  {
    id: "on_time_delivery",
    name: "Entrega a tiempo",
    definition: "Porcentaje de entregas realizadas dentro del plazo acordado.",
    formula: "entregas a tiempo ÷ entregas totales × 100",
    whyItMatters:
      "Mide confiabilidad y planificación del equipo. Impacta directamente la confianza del stakeholder.",
    howToInterpret:
      "Más es mejor. Menos del 60% es una señal crítica de problemas de capacidad o estimación.",
    impacts: ["productividad", "estimación"],
    unit: "%",
    recommendedRange: { min: 80, max: 100, label: "> 80%" },
    example: "Si se realizaron 10 entregas y 8 fueron a tiempo, la tasa es 80%.",
    tooltip: "% de proyectos entregados en el plazo acordado",
  },
  {
    id: "research_efficiency",
    name: "Eficiencia de investigación",
    definition:
      "Porcentaje del tiempo de un rol dedicado a investigación o discovery.",
    formula: "horas de investigación ÷ horas totales del rol × 100",
    whyItMatters:
      "Permite balancear producción y discovery. Muy bajo puede indicar diseño sin contexto.",
    howToInterpret:
      "No hay un rango único. Depende del tipo de proyecto. En flujos nuevos, 20-30% es razonable.",
    impacts: ["calidad", "productividad"],
    unit: "%",
    recommendedRange: { min: 10, max: 35, label: "10% – 35%" },
    example:
      "Si el Senior trabajó 20h y dedicó 5h a discovery, su eficiencia de investigación es 25%.",
    tooltip: "% de horas del rol dedicadas a investigación",
  },
  {
    id: "effective_capacity",
    name: "Capacidad efectiva",
    definition:
      "Throughput ponderado ajustado por retrabajo. Representa la producción neta real.",
    formula:
      "(vistas ponderadas × (1 − retrabajo_decimal)) ÷ horas trabajadas",
    whyItMatters:
      "Es el KPI de productividad más completo. Combina velocidad, volumen y calidad de entrega.",
    howToInterpret:
      "Mayor es mejor. Si el retrabajo es alto, este valor cae aunque el throughput sea alto.",
    impacts: ["productividad", "capacidad"],
    unit: "vistas/hora",
    recommendedRange: { min: 1.0, max: 99, label: "> 1.0" },
    example:
      "Throughput ponderado de 1.5 con retrabajo de 20% = capacidad efectiva de 1.2 vistas/hora.",
    tooltip: "Producción neta real ajustada por retrabajo",
  },
  {
    id: "estimation_accuracy",
    name: "Precisión de estimación",
    definition:
      "Qué tan cerca estuvo la estimación de horas del tiempo real invertido.",
    formula:
      "(1 − |horas reales − horas estimadas| ÷ horas estimadas) × 100",
    whyItMatters:
      "Mide la madurez del proceso de planeación. Mejora con el tiempo si se registran datos históricos.",
    howToInterpret:
      "100% = estimación perfecta. Por debajo del 60% indica dificultad estructural para estimar.",
    impacts: ["estimación"],
    unit: "%",
    recommendedRange: { min: 75, max: 100, label: "> 75%" },
    example:
      "Si se estimaron 40h y se trabajaron 50h, la precisión es 75%.",
    tooltip: "% de acierto entre horas estimadas y horas reales",
  },
  {
    id: "estimation_deviation",
    name: "Desviación de estimación",
    definition:
      "Diferencia porcentual entre horas reales y estimadas. Positivo = subestimación.",
    formula: "(horas reales − horas estimadas) ÷ horas estimadas × 100",
    whyItMatters:
      "Indica sesgo sistemático en la estimación. Si siempre es positivo, el equipo subestima.",
    howToInterpret:
      "Ideal cercano a 0%. Positivo = más tiempo del estimado. Negativo = menos tiempo del estimado.",
    impacts: ["estimación"],
    unit: "%",
    recommendedRange: { min: -15, max: 15, label: "Entre −15% y +15%" },
    example:
      "Si se estimaron 40h y se trabajaron 50h, la desviación es +25% (subestimación).",
    tooltip: "Diferencia % entre horas reales y estimadas",
  },
  {
    id: "design_system_coverage",
    name: "Cobertura de sistema de diseño",
    definition:
      "Porcentaje de componentes reutilizados del sistema de diseño vs componentes totales usados.",
    formula: "componentes reutilizados ÷ componentes totales × 100",
    whyItMatters:
      "Alta cobertura indica uso eficiente del sistema y velocidad sostenible. Baja cobertura = deuda de diseño.",
    howToInterpret:
      "Más alto es mejor. Menos del 50% sugiere creación excesiva de componentes nuevos.",
    impacts: ["productividad", "calidad"],
    unit: "%",
    recommendedRange: { min: 60, max: 100, label: "> 60%" },
    example:
      "Si se usaron 20 componentes y 14 fueron del sistema existente, la cobertura es 70%.",
    tooltip: "% de componentes reutilizados del sistema de diseño",
  },
  {
    id: "research_load",
    name: "Carga de investigación",
    definition: "Total de horas de investigación invertidas en un proyecto.",
    formula: "suma de horas de investigación de todos los roles participantes",
    whyItMatters:
      "Muestra cuánto esfuerzo de discovery hay por proyecto. Permite comparar con calidad y retrabajo.",
    howToInterpret:
      "Mayor carga de investigación suele correlacionar con menor retrabajo. Pero debe ser balanceada con tiempo de producción.",
    impacts: ["calidad", "estimación"],
    unit: "horas",
    recommendedRange: { min: 4, max: 99, label: "> 4h por proyecto" },
    example:
      "Un proyecto con 8h de investigación entre Junior (2h), Senior (3h) y Líder (3h).",
    tooltip: "Horas totales de investigación en el proyecto",
  },
  {
    id: "role_participation",
    name: "Participación real por rol",
    definition:
      "Porcentaje del tiempo total del proyecto aportado por cada rol.",
    formula: "horas del rol ÷ horas totales del proyecto × 100",
    whyItMatters:
      "Revela carga de trabajo real por rol. Útil para equilibrar asignaciones futuras.",
    howToInterpret:
      "Proporciones muy desequilibradas pueden indicar dependencias o cuellos de botella.",
    impacts: ["capacidad"],
    unit: "%",
    recommendedRange: { min: 10, max: 90, label: "Variable por proyecto" },
    example:
      "En un proyecto de 30h: Líder 10h (33%), Senior 12h (40%), Junior 8h (27%).",
    tooltip: "% de tiempo total del proyecto por rol",
  },
];
