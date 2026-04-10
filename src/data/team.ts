import type { TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
  {
    id: "marc",
    name: "Marc",
    role: "Direccion creativa y sistemas",
    title: "Arquitecto del Juramento",
    subtitle: "Mantiene la vision, las reglas y el tono del pacto en una misma linea.",
    description:
      "Transforma ideas sueltas en sistemas con identidad propia. Ordena el mapa de decisiones, fija el tono de Pactum X y cuida que cada mecanica responda a una vision comun.",
    signatureAbility: "Concilio de Reglas",
    signatureDetail:
      "Construye el marco que conecta fantasia, reglas y produccion para que el nucleo del juego se sienta compacto, legible y con personalidad.",
    rank: "Nexo primario",
    lore:
      "Cuando una idea amenaza la coherencia del universo, Marc la reescribe hasta que parece haber nacido dentro del pacto.",
    focusAreas: [
      "Vision de proyecto",
      "Sistemas nucleares",
      "Construccion de mundo",
    ],
    tools: ["Direccion creativa", "Ajuste de balance", "Documentacion de sistemas"],
    github: "Marpuchy",
    email: "marc@pactumx.dev",
    accentColor: "#8b5cf6",
    theme: {
      accent: "#8b5cf6",
      accentSoft: "rgba(139, 92, 246, 0.18)",
      secondary: "#22d3ee",
      secondarySoft: "rgba(34, 211, 238, 0.18)",
      glow: "rgba(139, 92, 246, 0.34)",
    },
    avatar: {
      variant: "crown",
      codename: "Pacto I",
      sigil: "Corona del juramento",
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
    subtitle: "Vuelve estable lo ambicioso y convierte mecanicas en sistemas fiables.",
    description:
      "Lleva las ideas de papel al juego con una implementacion que aguanta iteracion real. Une herramientas, logica y rendimiento para que la vision no se rompa al ejecutarse.",
    signatureAbility: "Sello de Integracion",
    signatureDetail:
      "Convierte conceptos complejos en sistemas robustos con foco en rendimiento, estabilidad y velocidad de iteracion para todo el equipo.",
    rank: "Ejecutor arcano",
    lore:
      "Su territorio natural es lo invisible: herramientas, integraciones y capas tecnicas que hacen que el resto del equipo avance sin friccion.",
    focusAreas: [
      "Logica jugable",
      "Herramientas internas",
      "Optimizacion tecnica",
    ],
    tools: ["Codigo jugable", "Flujos internos", "Ingenieria de version"],
    github: "cesar-pactumx",
    email: "cesar@pactumx.dev",
    accentColor: "#ef4444",
    theme: {
      accent: "#ef4444",
      accentSoft: "rgba(239, 68, 68, 0.18)",
      secondary: "#f59e0b",
      secondarySoft: "rgba(245, 158, 11, 0.18)",
      glow: "rgba(239, 68, 68, 0.3)",
    },
    avatar: {
      variant: "forge",
      codename: "Pacto II",
      sigil: "Yunque arcano",
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
    subtitle: "Define la tension del combate y la lectura tactica de cada enfrentamiento.",
    description:
      "Moldea los combates para que cada encuentro tenga una curva clara de tension, respuesta y recompensa. Su trabajo hace que las decisiones del jugador se sientan afiladas.",
    signatureAbility: "Rito de Presion",
    signatureDetail:
      "Orquesta enfrentamientos que ensenan sin frenar, castigan sin romper el ritmo y mantienen la presion donde el juego mas lo necesita.",
    rank: "Vanguardia tactica",
    lore:
      "Cuando una mecanica funciona pero no emociona, Andreu la empuja hasta que el encuentro deja huella y obliga a tomar decisiones reales.",
    focusAreas: [
      "Diseno de combate",
      "Balance de encuentros",
      "Respuesta tactica",
    ],
    tools: ["Bucles de combate", "Pruebas de arena", "Balance iterativo"],
    github: "andreu-pactumx",
    email: "andreu@pactumx.dev",
    accentColor: "#38bdf8",
    theme: {
      accent: "#38bdf8",
      accentSoft: "rgba(56, 189, 248, 0.18)",
      secondary: "#22c55e",
      secondarySoft: "rgba(34, 197, 94, 0.18)",
      glow: "rgba(56, 189, 248, 0.3)",
    },
    avatar: {
      variant: "blade",
      codename: "Pacto III",
      sigil: "Filo de arena",
    },
    stats: [
      { label: "Diseno de combate", value: 94 },
      { label: "Balance jugable", value: 91 },
      { label: "Cadencia de encuentro", value: 88 },
      { label: "Lectura tactica", value: 89 },
      { label: "Pruebas de arena", value: 87 },
    ],
  },
  {
    id: "ismael",
    name: "Ismael",
    role: "Interfaz, experiencia y pulido",
    title: "Custodio del Umbral",
    subtitle: "Da forma a la lectura visual y convierte la sensacion final en una presentacion de alta gama.",
    description:
      "Asegura que la interfaz tenga presencia, que la respuesta visual se lea al instante y que cada transicion eleve la sensacion de calidad del juego.",
    signatureAbility: "Veladura de Impacto",
    signatureDetail:
      "Refina interfaz, timing visual y respuesta audiovisual hasta convertir la presentacion del proyecto en una experiencia mas solida, clara y deseable.",
    rank: "Guardian del pulso",
    lore:
      "En su mesa se decide si el juego solo funciona o si ademas deja una impresion nitida en cada pantalla, golpe y transicion.",
    focusAreas: [
      "Vision de interfaz",
      "Flujos de usuario",
      "Pulido audiovisual",
    ],
    tools: ["Sistemas de interfaz", "Retorno visual", "Pulido de movimiento"],
    github: "ismael-pactumx",
    email: "ismael@pactumx.dev",
    accentColor: "#f59e0b",
    theme: {
      accent: "#f59e0b",
      accentSoft: "rgba(245, 158, 11, 0.18)",
      secondary: "#fb7185",
      secondarySoft: "rgba(251, 113, 133, 0.18)",
      glow: "rgba(245, 158, 11, 0.3)",
    },
    avatar: {
      variant: "veil",
      codename: "Pacto IV",
      sigil: "Ojo del umbral",
    },
    stats: [
      { label: "Vision de interfaz", value: 92 },
      { label: "Pulido final", value: 94 },
      { label: "Respuesta visual", value: 91 },
      { label: "Claridad de lectura", value: 91 },
      { label: "Soporte de equipo", value: 88 },
    ],
  },
];
