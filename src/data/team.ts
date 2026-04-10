import type { TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
  {
    id: "marc",
    name: "Marc",
    role: "Direccion creativa y sistemas",
    title: "Arquitecto del Juramento",
    description:
      "Convierte intuiciones dispersas en reglas con identidad. Disena el esqueleto del pacto, alinea tono y mecanicas, y protege la coherencia global del proyecto.",
    signatureAbility: "Concilio de Reglas",
    abilityDetail:
      "Une fantasia, ritmo de juego y claridad de produccion para que cada sistema tenga peso, lectura y proposito dentro de Pactum X.",
    rank: "Nexo primario",
    specialization: "Vision total del proyecto",
    lore:
      "Cuando una idea amenaza con romper la atmosfera del juego, Marc la reescribe hasta que parezca inevitable dentro del mundo.",
    quote: "Todo pacto funciona mejor cuando la regla tambien cuenta una historia.",
    accentColor: "#8b5cf6",
    theme: {
      accent: "#8b5cf6",
      accentSoft: "rgba(139, 92, 246, 0.18)",
      secondary: "#22d3ee",
      secondarySoft: "rgba(34, 211, 238, 0.18)",
      glow: "rgba(139, 92, 246, 0.34)",
    },
    portraitPlaceholder: {
      imageSrc: null,
      monogram: "MX",
      designation: "Pacto 01",
    },
    stats: [
      { label: "Sistema de pactos", value: 96 },
      { label: "Direccion creativa", value: 93 },
      { label: "Construccion de mundo", value: 89 },
      { label: "Ritmo de produccion", value: 84 },
      { label: "Cohesion de vision", value: 95 },
    ],
  },
  {
    id: "cesar",
    name: "Cesar",
    role: "Programacion jugable y tecnica",
    title: "Forjador del Nucleo",
    description:
      "Traduce las decisiones de diseno en comportamiento estable. Construye sistemas, integra herramientas y mantiene la compilacion lista para soportar ambicion real.",
    signatureAbility: "Sello de Integracion",
    abilityDetail:
      "Toma ideas complejas y las convierte en funcionalidades robustas, con foco en rendimiento, solidez tecnica y capacidad de iteracion.",
    rank: "Ejecutor arcano",
    specialization: "Infraestructura interactiva",
    lore:
      "Su territorio natural es la parte invisible del juego: donde cada mejora del flujo interno evita friccion y acelera el siguiente avance.",
    quote: "Si el sistema aguanta cambios duros, entonces esta listo para crecer.",
    accentColor: "#ef4444",
    theme: {
      accent: "#ef4444",
      accentSoft: "rgba(239, 68, 68, 0.18)",
      secondary: "#f59e0b",
      secondarySoft: "rgba(245, 158, 11, 0.18)",
      glow: "rgba(239, 68, 68, 0.3)",
    },
    portraitPlaceholder: {
      imageSrc: null,
      monogram: "CS",
      designation: "Pacto 02",
    },
    stats: [
      { label: "Programacion jugable", value: 95 },
      { label: "Adaptacion tecnica", value: 93 },
      { label: "Optimizacion", value: 90 },
      { label: "Herramientas internas", value: 87 },
      { label: "Estabilidad de version", value: 92 },
    ],
  },
  {
    id: "andreu",
    name: "Andreu",
    role: "Diseno de combate y balance",
    title: "Maestro del Encuentro",
    description:
      "Mide tension, recompensa y ritmo para que cada combate tenga intencion. Ajusta encounters, progresion y lectura tactica hasta que la experiencia respire control.",
    signatureAbility: "Rito de Presion",
    abilityDetail:
      "Construye enfrentamientos que ensenan sin frenar, castigan sin frustrar y mantienen la tension en el punto justo.",
    rank: "Vanguardia tactica",
    specialization: "Tension jugable",
    lore:
      "Cuando una mecanica parece correcta pero no emociona, Andreu la somete a iteracion hasta que la decision del jugador se siente afilada.",
    quote: "Un buen combate no solo reta; revela de que esta hecho el jugador.",
    accentColor: "#38bdf8",
    theme: {
      accent: "#38bdf8",
      accentSoft: "rgba(56, 189, 248, 0.18)",
      secondary: "#22c55e",
      secondarySoft: "rgba(34, 197, 94, 0.18)",
      glow: "rgba(56, 189, 248, 0.3)",
    },
    portraitPlaceholder: {
      imageSrc: null,
      monogram: "AN",
      designation: "Pacto 03",
    },
    stats: [
      { label: "Diseno de combate", value: 94 },
      { label: "Balance jugable", value: 91 },
      { label: "Progresion sistemica", value: 86 },
      { label: "Lectura tactica", value: 89 },
      { label: "Testeo de encounters", value: 87 },
    ],
  },
  {
    id: "ismael",
    name: "Ismael",
    role: "Interfaz, experiencia y pulido",
    title: "Custodio del Umbral",
    description:
      "Hace que la interfaz se lea, que el feedback responda y que la presentacion final tenga presencia. Su trabajo conecta intencion visual con claridad de juego.",
    signatureAbility: "Veladura de Impacto",
    abilityDetail:
      "Pulsa la ultima capa de calidad del proyecto: claridad visual, respuesta inmediata y una sensacion tactil mas cercana a una produccion de alta gama.",
    rank: "Guardian del pulso",
    specialization: "Interfaz y acabado",
    lore:
      "En su mesa se decide si el juego solo funciona o si ademas deja huella en cada transicion, cada golpe y cada pantalla.",
    quote: "El jugador nota el pulido incluso cuando no sabe nombrarlo.",
    accentColor: "#f59e0b",
    theme: {
      accent: "#f59e0b",
      accentSoft: "rgba(245, 158, 11, 0.18)",
      secondary: "#fb7185",
      secondarySoft: "rgba(251, 113, 133, 0.18)",
      glow: "rgba(245, 158, 11, 0.3)",
    },
    portraitPlaceholder: {
      imageSrc: null,
      monogram: "IS",
      designation: "Pacto 04",
    },
    stats: [
      { label: "Vision de interfaz", value: 92 },
      { label: "Pulido final", value: 94 },
      { label: "Direccion audiovisual", value: 87 },
      { label: "Claridad de feedback", value: 91 },
      { label: "Soporte de equipo", value: 88 },
    ],
  },
];
