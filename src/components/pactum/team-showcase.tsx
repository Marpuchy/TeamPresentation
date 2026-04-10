"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import { startTransition, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRightLeft,
  Crown,
  Cpu,
  Crosshair,
  Layers3,
  Sparkles,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

import type { TeamMember } from "@/types/team";

import { BackgroundEffects } from "./background-effects";
import { PortraitPlaceholder } from "./portrait-placeholder";
import { StatsRadar } from "./stats-radar";

type TeamShowcaseProps = {
  members: TeamMember[];
};

const selectorIcons: Record<string, LucideIcon> = {
  marc: Crown,
  cesar: Cpu,
  andreu: Crosshair,
  ismael: Layers3,
};

const panelClass = "glass-panel";

const entranceTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function TeamShowcase({ members }: TeamShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectorRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedMember = members[selectedIndex];
  const featuredStats = selectedMember.stats.slice(0, 3);
  const shouldReduceMotion = useReducedMotion();

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
      className="relative isolate min-h-screen overflow-hidden bg-[#05060b] text-slate-100"
    >
      <BackgroundEffects
        member={selectedMember}
        reducedMotion={Boolean(shouldReduceMotion)}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] flex-col px-4 pb-6 pt-5 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={entranceTransition}
          className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_440px] xl:items-end"
        >
          <div className="max-w-3xl">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.72rem] uppercase tracking-[0.38em] text-white/62">
              Escuadra de desarrollo
            </span>

            <h1 className="mt-5 font-[family:var(--font-display)] text-[clamp(3.2rem,8vw,6rem)] leading-[0.92] tracking-[0.06em] text-white">
              Pactum X Team
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300/78 sm:text-lg">
              Una presentacion tratada como seleccion de personajes: perfiles
              con clase propia, lectura tactica y una puesta en escena pensada
              para sentirse parte del universo oscuro de Pactum X.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <HeaderSignal
              label="Presencias"
              value="04"
              detail="Miembros activos"
            />
            <HeaderSignal
              label="Interfaz"
              value="AAA"
              detail="Lectura limpia"
            />
            <HeaderSignal
              label="Despliegue"
              value="Vercel"
              detail="Build lista"
            />
          </div>
        </motion.header>

        <div className="mt-6 grid flex-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)_360px]">
          <div className="order-2 flex flex-col gap-6 xl:order-1">
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...entranceTransition, delay: 0.06 }}
              className={`${panelClass} p-5 sm:p-6`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Camara de seleccion</p>
                  <h2 className="mt-3 font-[family:var(--font-display)] text-3xl tracking-[0.08em] text-white">
                    Elige una presencia
                  </h2>
                </div>

                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.68rem] uppercase tracking-[0.32em] text-white/55">
                  {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                  {String(members.length).padStart(2, "0")}
                </span>
              </div>

              <div
                onKeyDown={handleSelectorKeyDown}
                aria-label="Selector de miembros"
                className="mt-5 grid gap-3"
              >
                <LayoutGroup>
                  {members.map((member, index) => {
                    const Icon = selectorIcons[member.id];
                    const isSelected = index === selectedIndex;

                    return (
                      <button
                        key={member.id}
                        ref={(element) => {
                          selectorRefs.current[index] = element;
                        }}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => selectIndex(index)}
                        className="group relative overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-left transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/16 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                        style={
                          isSelected
                            ? {
                                borderColor: member.theme.accentSoft,
                                boxShadow: `0 0 0 1px ${member.theme.accentSoft}, 0 0 42px ${member.theme.glow}`,
                              }
                            : undefined
                        }
                      >
                        {isSelected ? (
                          <motion.span
                            layoutId="selector-highlight"
                            className="absolute inset-0 rounded-[24px]"
                            style={{
                              background: `linear-gradient(135deg, ${member.theme.accentSoft} 0%, rgba(255,255,255,0.03) 58%)`,
                            }}
                          />
                        ) : null}

                        <div className="relative z-10 flex items-start gap-4">
                          <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/20"
                            style={{
                              boxShadow: `inset 0 0 0 1px ${member.theme.accentSoft}`,
                            }}
                          >
                            <Icon
                              className="h-5 w-5"
                              style={{ color: member.theme.secondary }}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-[0.72rem] uppercase tracking-[0.34em] text-white/45">
                                {member.portraitPlaceholder.designation}
                              </span>
                              <span className="text-sm text-white/44">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </div>

                            <h3 className="mt-2 font-[family:var(--font-display)] text-2xl tracking-[0.08em] text-white">
                              {member.name}
                            </h3>

                            <p className="mt-1 text-sm uppercase tracking-[0.24em] text-slate-300/72">
                              {member.title}
                            </p>

                            <p className="mt-3 text-sm leading-6 text-slate-300/72">
                              {member.role}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </LayoutGroup>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...entranceTransition, delay: 0.12 }}
              className={`${panelClass} p-5 sm:p-6`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Canal de lectura</p>
                  <h2 className="mt-3 font-[family:var(--font-display)] text-3xl tracking-[0.08em] text-white">
                    Protocolo activo
                  </h2>
                </div>

                <ArrowRightLeft className="mt-1 h-5 w-5 text-white/45" />
              </div>

              <div className="mt-5 grid gap-3 text-sm text-slate-300/74">
                <ProtocolLine text="Usa flechas o clic para alternar entre perfiles." />
                <ProtocolLine text="Cada miembro cambia color, energia y lectura de stats." />
                <ProtocolLine text="La informacion vive en un array editable para futuras iteraciones." />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.blockquote
                  key={selectedMember.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={entranceTransition}
                  className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-5"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${selectedMember.theme.accentSoft}`,
                  }}
                  >
                    <p className="section-eyebrow">Eco del perfil</p>
                    <p className="mt-3 text-lg leading-8 text-white/88">
                      &ldquo;{selectedMember.quote}&rdquo;
                    </p>
                  </motion.blockquote>
              </AnimatePresence>
            </motion.section>
          </div>

          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...entranceTransition, delay: 0.08 }}
            className="order-1 xl:order-2"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={selectedMember.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.99 }}
                transition={entranceTransition}
                className={`${panelClass} flex h-full flex-col justify-between p-5 sm:p-8`}
              >
                <div className="grid gap-8 xl:grid-cols-[minmax(0,0.95fr)_360px] xl:items-start">
                  <PortraitPlaceholder
                    member={selectedMember}
                    reducedMotion={Boolean(shouldReduceMotion)}
                  />

                  <div className="flex flex-col gap-5 xl:pt-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <BadgeChip
                        label={`Rango | ${selectedMember.rank}`}
                        accent={selectedMember.theme.accent}
                        accentSoft={selectedMember.theme.accentSoft}
                      />
                      <BadgeChip
                        label={`Clase | ${selectedMember.title}`}
                        accent={selectedMember.theme.secondary}
                        accentSoft={selectedMember.theme.secondarySoft}
                      />
                    </div>

                    <div>
                      <p className="section-eyebrow">Operador seleccionado</p>
                      <h2 className="mt-2 font-[family:var(--font-display)] text-[clamp(3rem,5vw,4.75rem)] leading-[0.92] tracking-[0.08em] text-white">
                        {selectedMember.name}
                      </h2>
                      <p
                        className="mt-3 text-base uppercase tracking-[0.32em]"
                        style={{ color: selectedMember.theme.secondary }}
                      >
                        {selectedMember.role}
                      </p>
                    </div>

                    <p className="max-w-2xl text-lg leading-8 text-slate-300/84">
                      {selectedMember.description}
                    </p>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {featuredStats.map((stat) => (
                        <div
                          key={`${selectedMember.id}-${stat.label}`}
                          className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4"
                        >
                          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/42">
                            Rasgo clave
                          </p>
                          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-slate-300/72">
                            {stat.label}
                          </p>
                          <p
                            className="mt-2 text-3xl font-semibold"
                            style={{ color: selectedMember.theme.accent }}
                          >
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
                      <div className="energy-sheen opacity-50" />
                      <div className="relative z-10 flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/20"
                          style={{
                            boxShadow: `inset 0 0 0 1px ${selectedMember.theme.accentSoft}`,
                          }}
                        >
                          <WandSparkles
                            className="h-5 w-5"
                            style={{ color: selectedMember.theme.secondary }}
                          />
                        </div>

                        <div>
                          <p className="section-eyebrow">Aporte distintivo</p>
                          <h3 className="mt-2 text-2xl font-semibold text-white">
                            {selectedMember.signatureAbility}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-slate-300/76">
                            {selectedMember.abilityDetail}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-[1fr_1.1fr]">
                      <InfoCard
                        label="Especializacion"
                        value={selectedMember.specialization}
                      />
                      <InfoCard
                        label="Detalle de mundo"
                        value={selectedMember.lore}
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </motion.main>

          <div className="order-3 flex flex-col gap-6">
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...entranceTransition, delay: 0.1 }}
              className={`${panelClass} p-5 sm:p-6`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Matriz de especializacion</p>
                  <h2 className="mt-3 font-[family:var(--font-display)] text-3xl tracking-[0.08em] text-white">
                    Lectura tactica
                  </h2>
                </div>

                <Activity className="mt-1 h-5 w-5 text-white/42" />
              </div>

              <div className="mt-5">
                <StatsRadar member={selectedMember} />
              </div>

              <div className="mt-6 space-y-4">
                {selectedMember.stats.map((stat, index) => (
                  <div
                    key={`${selectedMember.id}-${stat.label}`}
                    className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm uppercase tracking-[0.18em] text-slate-300/76">
                        {stat.label}
                      </span>
                      <span className="text-sm font-semibold text-white/84">
                        {stat.value}
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                      <motion.div
                        key={`${selectedMember.id}-${stat.label}-bar`}
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        transition={{
                          duration: 0.68,
                          ease: [0.22, 1, 0.36, 1],
                          delay: index * 0.08,
                        }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${selectedMember.theme.accent} 0%, ${selectedMember.theme.secondary} 100%)`,
                          boxShadow: `0 0 18px ${selectedMember.theme.glow}`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...entranceTransition, delay: 0.16 }}
              className={`${panelClass} p-5 sm:p-6`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Archivo del pacto</p>
                  <h2 className="mt-3 font-[family:var(--font-display)] text-3xl tracking-[0.08em] text-white">
                    Registro rapido
                  </h2>
                </div>

                <Sparkles className="mt-1 h-5 w-5 text-white/42" />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selectedMember.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={entranceTransition}
                >
                  <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/42">
                      Vector dominante
                    </p>
                    <p className="mt-3 text-xl font-semibold text-white">
                      {selectedMember.stats[0]?.label}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-300/72">
                      El perfil seleccionado empuja el proyecto desde esta
                      disciplina principal sin perder cohesion con la vision
                      global del juego.
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <InfoCard
                      label="Clase operativa"
                      value={selectedMember.title}
                    />
                    <InfoCard label="Firma visual" value={selectedMember.name} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.section>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeaderSignal({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="glass-panel p-4">
      <p className="text-[0.68rem] uppercase tracking-[0.32em] text-white/45">
        {label}
      </p>
      <p className="mt-3 font-[family:var(--font-display)] text-3xl tracking-[0.08em] text-white">
        {value}
      </p>
      <p className="mt-1 text-sm text-slate-300/70">{detail}</p>
    </div>
  );
}

function ProtocolLine({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/50" />
      <p className="leading-7">{text}</p>
    </div>
  );
}

function BadgeChip({
  label,
  accent,
  accentSoft,
}: {
  label: string;
  accent: string;
  accentSoft: string;
}) {
  return (
    <span
      className="rounded-full border px-4 py-2 text-[0.72rem] uppercase tracking-[0.28em] text-white/72"
      style={{
        borderColor: accentSoft,
        background: accentSoft,
        boxShadow: `0 0 0 1px ${accentSoft}`,
        color: accent,
      }}
    >
      {label}
    </span>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/42">
        {label}
      </p>
      <p className="mt-3 text-sm leading-7 text-slate-300/76">{value}</p>
    </div>
  );
}
