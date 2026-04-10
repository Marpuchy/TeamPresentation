"use client";

import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import { startTransition, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Code2, Mail, Shield, Sparkles } from "lucide-react";

import type { TeamMember, TeamStat } from "@/types/team";

import { CharacterPortrait } from "./character-portrait";
import { StatsRadar } from "./stats-radar";

type TeamShowcaseProps = {
  members: TeamMember[];
};

const transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};

const particles = [
  { left: "10%", top: "14%", size: 6, delay: 0.2 },
  { left: "22%", top: "20%", size: 8, delay: 1.1 },
  { left: "42%", top: "9%", size: 5, delay: 0.6 },
  { left: "63%", top: "17%", size: 7, delay: 1.8 },
  { left: "78%", top: "11%", size: 5, delay: 0.9 },
  { left: "90%", top: "26%", size: 8, delay: 1.5 },
];

export function TeamShowcase({ members }: TeamShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const selectorRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const shouldReduceMotion = useReducedMotion();

  const selectedMember = members[selectedIndex];
  const averageStat = Math.round(
    selectedMember.stats.reduce((sum, stat) => sum + stat.value, 0) /
      selectedMember.stats.length,
  );
  const leadStat = selectedMember.stats.reduce((best, current) =>
    current.value > best.value ? current : best,
  );

  const themeStyle = {
    "--accent": selectedMember.theme.accent,
    "--accent-soft": selectedMember.theme.accentSoft,
    "--secondary": selectedMember.theme.secondary,
    "--secondary-soft": selectedMember.theme.secondarySoft,
    "--glow": selectedMember.theme.glow,
  } as CSSProperties;

  const selectIndex = (nextIndex: number, focusButton = false) => {
    const safeIndex = (nextIndex + members.length) % members.length;

    startTransition(() => {
      setSelectedIndex(safeIndex);
    });

    if (focusButton) {
      selectorRefs.current[safeIndex]?.focus();
    }
  };

  const handleSelectorKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        selectIndex(selectedIndex + 1, true);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        selectIndex(selectedIndex - 1, true);
        break;
      case "Home":
        event.preventDefault();
        selectIndex(0, true);
        break;
      case "End":
        event.preventDefault();
        selectIndex(members.length - 1, true);
        break;
      default:
        break;
    }
  };

  return (
    <section
      style={themeStyle}
      className="relative min-h-screen overflow-hidden text-slate-100"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_16%),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_100%,128px_128px,128px_128px] opacity-40" />
        <div
          className="absolute left-[-8%] top-[-8%] h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: selectedMember.theme.glow }}
        />
        <div
          className="absolute right-[-10%] top-[8%] h-[24rem] w-[24rem] rounded-full blur-3xl"
          style={{ background: selectedMember.theme.secondarySoft }}
        />
        <div
          className="absolute bottom-[-16%] left-[40%] h-[22rem] w-[22rem] rounded-full blur-3xl"
          style={{ background: selectedMember.theme.accentSoft }}
        />

        {particles.map((particle, index) => (
          <motion.span
            key={`${particle.left}-${particle.top}`}
            className="absolute rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              background:
                index % 2 === 0
                  ? selectedMember.theme.accent
                  : selectedMember.theme.secondary,
              boxShadow: `0 0 18px ${
                index % 2 === 0
                  ? selectedMember.theme.glow
                  : selectedMember.theme.secondarySoft
              }`,
            }}
            animate={
              shouldReduceMotion
                ? { opacity: [0.2, 0.4, 0.2] }
                : {
                    opacity: [0.16, 0.6, 0.18],
                    y: [0, -16, 0],
                    scale: [0.92, 1.18, 0.94],
                  }
            }
            transition={{
              duration: 4.8 + index * 0.45,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1560px] flex-col px-4 pb-8 pt-6 sm:px-6 lg:px-8 lg:pb-10">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="mx-auto max-w-5xl text-center"
        >
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.72rem] uppercase tracking-[0.38em] text-white/64">
            Escuadra de desarrollo
          </span>
          <h1 className="mt-5 font-[family:var(--font-display)] text-[clamp(3.2rem,8vw,6rem)] leading-[0.9] tracking-[0.08em] text-white">
            Pactum X Team
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300/78 sm:text-lg">
            Cuatro perfiles, una misma atmosfera. Pasa el cursor para inspeccionar
            cada avatar y selecciona a quien quieras desplegar como personaje
            activo del equipo.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.06 }}
          className="mt-8"
        >
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="section-eyebrow">Selector de personajes</p>
              <p className="mt-2 text-sm text-slate-300/72">
                Pasa el cursor para revelar. Clic para fijar el personaje en pantalla.
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.7rem] uppercase tracking-[0.32em] text-white/60">
              {String(selectedIndex + 1).padStart(2, "0")} /{" "}
              {String(members.length).padStart(2, "0")} activo
            </div>
          </div>

          <div
            role="radiogroup"
            aria-label="Seleccion de personajes del equipo Pactum X"
            onKeyDown={handleSelectorKeyDown}
            className="roster-scroll flex gap-4 overflow-x-auto pb-2"
          >
            <LayoutGroup>
              {members.map((member, index) => {
                const isSelected = selectedIndex === index;
                const isHovered = hoveredId === member.id;
                const hasHoveredPeer = hoveredId !== null && !isHovered;
                const flexGrow = isSelected ? 1.22 : isHovered ? 1.08 : hasHoveredPeer ? 0.92 : 1;

                return (
                  <motion.button
                    key={member.id}
                    ref={(element) => {
                      selectorRefs.current[index] = element;
                    }}
                    layout
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onMouseEnter={() => setHoveredId(member.id)}
                    onMouseLeave={() => setHoveredId((current) =>
                      current === member.id ? null : current,
                    )}
                    onClick={() => selectIndex(index)}
                    animate={{ flexGrow }}
                    transition={transition}
                    className="group relative min-w-[270px] basis-0 md:min-w-0"
                  >
                    <div
                      className="pactum-panel relative h-[232px] overflow-hidden rounded-[30px] p-2 transition-transform duration-300 group-hover:-translate-y-1"
                      style={
                        isSelected
                          ? {
                              boxShadow: `0 0 0 1px ${member.theme.accentSoft}, 0 20px 70px ${member.theme.glow}`,
                            }
                          : undefined
                      }
                    >
                      {isSelected ? (
                        <motion.div
                          layoutId="roster-outline"
                          className="absolute inset-0 rounded-[30px] border"
                          style={{
                            borderColor: member.theme.accent,
                            boxShadow: `0 0 0 1px ${member.theme.accentSoft}, inset 0 0 0 1px ${member.theme.secondarySoft}`,
                          }}
                        />
                      ) : null}

                      <motion.div
                        className="absolute inset-2 overflow-hidden rounded-[24px]"
                        animate={{
                          scale: isSelected ? 1.02 : isHovered ? 1.03 : 0.985,
                          filter: isSelected || isHovered ? "brightness(1.08)" : "brightness(0.72)",
                        }}
                        transition={transition}
                      >
                        <CharacterPortrait
                          member={member}
                          mode="roster"
                          active={isSelected || isHovered}
                        />
                      </motion.div>

                      <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-4">
                        <div className="text-left">
                          <p className="text-[0.66rem] uppercase tracking-[0.34em] text-white/48">
                            {member.avatar.codename}
                          </p>
                          <p className="mt-2 font-[family:var(--font-display)] text-2xl tracking-[0.08em] text-white">
                            {member.name}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.26em] text-slate-300/72">
                            {member.title}
                          </p>
                        </div>

                        <div
                          className="rounded-full border border-white/10 bg-black/40 px-3 py-2 text-[0.65rem] uppercase tracking-[0.28em] text-white/72"
                          style={
                            isSelected
                              ? {
                                  borderColor: member.theme.accentSoft,
                                  color: member.theme.secondary,
                                }
                              : undefined
                          }
                        >
                          {isSelected ? "Activo" : "Seleccionar"}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </LayoutGroup>
          </div>
        </motion.section>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_420px] xl:items-start">
          <AnimatePresence mode="wait" initial={false}>
            <motion.section
              key={`${selectedMember.id}-portrait`}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 14 }}
              transition={transition}
              className="pactum-panel overflow-hidden rounded-[34px] p-3 sm:p-4"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
                <div className="flex flex-wrap gap-2">
                  <PanelChip
                    label={`Clase | ${selectedMember.title}`}
                    accent={selectedMember.theme.accent}
                    fill={selectedMember.theme.accentSoft}
                  />
                  <PanelChip
                    label={`Rol | ${selectedMember.role}`}
                    accent={selectedMember.theme.secondary}
                    fill={selectedMember.theme.secondarySoft}
                  />
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-white/60">
                  {selectedMember.avatar.sigil}
                </div>
              </div>

              <div className="min-h-[560px]">
                <CharacterPortrait
                  member={selectedMember}
                  mode="featured"
                  active
                />
              </div>

              <div className="mt-4 grid gap-3 px-2 sm:grid-cols-3">
                <QuickInfoCard
                  label="Estado"
                  value="Seleccionado"
                  accent={selectedMember.theme.accent}
                />
                <QuickInfoCard
                  label="Arquetipo"
                  value={selectedMember.title}
                  accent={selectedMember.theme.secondary}
                />
                <QuickInfoCard
                  label="Rango"
                  value={selectedMember.rank}
                  accent={selectedMember.theme.accent}
                />
              </div>
            </motion.section>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.aside
              key={`${selectedMember.id}-stats`}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={transition}
              className="pactum-panel rounded-[34px] p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Panel de atributos</p>
                  <h2 className="mt-3 font-[family:var(--font-display)] text-3xl tracking-[0.08em] text-white">
                    Estadisticas del perfil
                  </h2>
                </div>

                <div className="rounded-full border border-white/10 bg-black/30 p-3">
                  <Shield
                    className="h-5 w-5"
                    style={{ color: selectedMember.theme.secondary }}
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <StatSummary
                  label="Promedio"
                  value={String(averageStat)}
                  accent={selectedMember.theme.accent}
                />
                <StatSummary
                  label="Dominio mayor"
                  value={leadStat.value.toString()}
                  accent={selectedMember.theme.secondary}
                />
                <StatSummary
                  label="Lectura"
                  value="Mixta"
                  accent={selectedMember.theme.accent}
                />
              </div>

              <div className="mt-5">
                <StatsRadar member={selectedMember} />
              </div>

              <div className="mt-6 space-y-4">
                {selectedMember.stats.map((stat, index) => (
                  <StatBar
                    key={`${selectedMember.id}-${stat.label}`}
                    stat={stat}
                    index={index}
                    member={selectedMember}
                  />
                ))}
              </div>
            </motion.aside>
          </AnimatePresence>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_360px] xl:items-start">
          <AnimatePresence mode="wait" initial={false}>
            <motion.section
              key={`${selectedMember.id}-detail`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={transition}
              className="pactum-panel rounded-[34px] p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="section-eyebrow">Ficha de personaje</p>
                  <h2 className="mt-3 font-[family:var(--font-display)] text-4xl tracking-[0.08em] text-white">
                    {selectedMember.name}
                  </h2>
                  <p
                    className="mt-2 text-sm uppercase tracking-[0.28em]"
                    style={{ color: selectedMember.theme.secondary }}
                  >
                    {selectedMember.subtitle}
                  </p>
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] uppercase tracking-[0.32em] text-white/60">
                  {selectedMember.avatar.codename}
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div>
                  <p className="text-lg leading-8 text-slate-300/82">
                    {selectedMember.description}
                  </p>

                  <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                    <p className="section-eyebrow">Contribucion distintiva</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      {selectedMember.signatureAbility}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300/76">
                      {selectedMember.signatureDetail}
                    </p>
                  </div>

                  <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="section-eyebrow">Detalle de mundo</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300/74">
                      {selectedMember.lore}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <DetailList
                    title="Focos de trabajo"
                    items={selectedMember.focusAreas}
                    accent={selectedMember.theme.accent}
                  />
                  <DetailList
                    title="Herramientas y enfoque"
                    items={selectedMember.tools}
                    accent={selectedMember.theme.secondary}
                  />
                </div>
              </div>
            </motion.section>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.aside
              key={`${selectedMember.id}-contact`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={transition}
              className="pactum-panel rounded-[34px] p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Contacto del perfil</p>
                  <h2 className="mt-3 font-[family:var(--font-display)] text-3xl tracking-[0.08em] text-white">
                    Enlaces del miembro
                  </h2>
                </div>

                <Sparkles className="mt-1 h-5 w-5 text-white/42" />
              </div>

              <div className="mt-5 space-y-3">
                <ContactButton
                  icon={<Code2 className="h-5 w-5" />}
                  label="GitHub"
                  value={selectedMember.github}
                  href={`https://github.com/${selectedMember.github}`}
                  accent={selectedMember.theme.accent}
                />
                <ContactButton
                  icon={<Mail className="h-5 w-5" />}
                  label="Correo"
                  value={selectedMember.email}
                  href={`mailto:${selectedMember.email}`}
                  accent={selectedMember.theme.secondary}
                />
              </div>

              <div className="mt-5 rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                <p className="section-eyebrow">Lectura rapida</p>
                <p className="mt-3 text-sm leading-7 text-slate-300/74">
                  Perfil dominante en <span className="text-white">{leadStat.label}</span>,
                  con una media de <span className="text-white">{averageStat}</span> y una
                  presencia clara dentro de la alineacion de Pactum X.
                </p>
              </div>
            </motion.aside>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function PanelChip({
  label,
  accent,
  fill,
}: {
  label: string;
  accent: string;
  fill: string;
}) {
  return (
    <span
      className="rounded-full border px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em]"
      style={{
        borderColor: fill,
        background: fill,
        color: accent,
      }}
    >
      {label}
    </span>
  );
}

function QuickInfoCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[0.66rem] uppercase tracking-[0.3em] text-white/42">
        {label}
      </p>
      <p className="mt-3 text-sm uppercase tracking-[0.24em]" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}

function StatSummary({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-[0.66rem] uppercase tracking-[0.3em] text-white/42">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}

function StatBar({
  stat,
  index,
  member,
}: {
  stat: TeamStat;
  index: number;
  member: TeamMember;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm uppercase tracking-[0.18em] text-slate-300/76">
          {stat.label}
        </p>
        <p className="text-sm font-semibold text-white/86">{stat.value}</p>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
        <motion.div
          key={`${member.id}-${stat.label}`}
          initial={{ width: 0 }}
          animate={{ width: `${stat.value}%` }}
          transition={{
            duration: 0.64,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.06,
          }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${member.theme.accent} 0%, ${member.theme.secondary} 100%)`,
            boxShadow: `0 0 18px ${member.theme.glow}`,
          }}
        />
      </div>
    </div>
  );
}

function DetailList({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
      <p className="section-eyebrow">{title}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-black/24 px-3 py-2 text-[0.68rem] uppercase tracking-[0.24em]"
            style={{ color: accent }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ContactButton({
  icon,
  label,
  value,
  href,
  accent,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  accent: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
      className="flex items-center gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/28">
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[0.66rem] uppercase tracking-[0.3em] text-white/42">
          {label}
        </p>
        <p className="mt-2 truncate text-sm text-slate-200/86">{value}</p>
      </div>
    </a>
  );
}
