import type { TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
  {
    id: "marc",
    name: "Marc",
    role: "Direccion creativa y sistemas",
    title: "Arquitecto del Juramento",
    description:
      "Transforma ideas sueltas en sistemas con identidad propia. Ordena el mapa de decisiones, fija el tono de Pactum X y cuida que cada mecanica responda a una vision comun.",
    signatureAbility: "Concilio de Reglas",
    signatureDetail:
      "Construye el marco que conecta fantasia, reglas y produccion para que el nucleo del juego se sienta compacto, legible y con personalidad.",
    github: "Marpuchy",
    email: "marc@pactumx.dev",
    theme: {
      accent: "#7a687f",
      accentSoft: "rgba(122, 104, 127, 0.15)",
      secondary: "#757b90",
      secondarySoft: "rgba(117, 123, 144, 0.14)",
      surface: "#141216",
      surfaceAlt: "#0d0c10",
      line: "rgba(122, 104, 127, 0.3)",
    },
    avatar: {
      variant: "crown",
    },
  },
  {
    id: "cesar",
    name: "Cesar",
    role: "Programacion jugable y tecnica",
    title: "Forjador del Nucleo",
    description:
      "Lleva las ideas de papel al juego con una implementacion que aguanta iteracion real. Une herramientas, logica y rendimiento para que la vision no se rompa al ejecutarse.",
    signatureAbility: "Sello de Integracion",
    signatureDetail:
      "Convierte conceptos complejos en sistemas robustos con foco en rendimiento, estabilidad y velocidad de iteracion para todo el equipo.",
    github: "cesar-pactumx",
    email: "cesar@pactumx.dev",
    theme: {
      accent: "#a16a4d",
      accentSoft: "rgba(161, 106, 77, 0.15)",
      secondary: "#7d5a4d",
      secondarySoft: "rgba(125, 90, 77, 0.14)",
      surface: "#16120f",
      surfaceAlt: "#100d0b",
      line: "rgba(161, 106, 77, 0.3)",
    },
    avatar: {
      variant: "forge",
    },
  },
  {
    id: "andreu",
    name: "Andreu",
    role: "Diseno de combate y balance",
    title: "Maestro del Encuentro",
    description:
      "Moldea los combates para que cada encuentro tenga una curva clara de tension, respuesta y recompensa. Su trabajo hace que las decisiones del jugador se sientan afiladas.",
    signatureAbility: "Rito de Presion",
    signatureDetail:
      "Orquesta enfrentamientos que ensenan sin frenar, castigan sin romper el ritmo y mantienen la presion donde el juego mas lo necesita.",
    github: "andreu-pactumx",
    email: "andreu@pactumx.dev",
    theme: {
      accent: "#5d7b78",
      accentSoft: "rgba(93, 123, 120, 0.15)",
      secondary: "#607983",
      secondarySoft: "rgba(96, 121, 131, 0.14)",
      surface: "#101413",
      surfaceAlt: "#0b0f0f",
      line: "rgba(93, 123, 120, 0.3)",
    },
    avatar: {
      variant: "blade",
    },
  },
  {
    id: "ismael",
    name: "Ismael",
    role: "Interfaz, experiencia y pulido",
    title: "Custodio del Umbral",
    description:
      "Asegura que la interfaz tenga presencia, que la respuesta visual se lea al instante y que cada transicion eleve la sensacion de calidad del juego.",
    signatureAbility: "Veladura de Impacto",
    signatureDetail:
      "Refina interfaz, timing visual y respuesta audiovisual hasta convertir la presentacion del proyecto en una experiencia mas solida, clara y deseable.",
    github: "ismael-pactumx",
    email: "ismael@pactumx.dev",
    theme: {
      accent: "#998455",
      accentSoft: "rgba(153, 132, 85, 0.15)",
      secondary: "#727149",
      secondarySoft: "rgba(114, 113, 73, 0.14)",
      surface: "#15140f",
      surfaceAlt: "#0f0e09",
      line: "rgba(153, 132, 85, 0.3)",
    },
    avatar: {
      variant: "veil",
    },
  },
];
