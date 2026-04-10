"use client";

import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import { startTransition, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import {
  Anvil,
  Code2,
  Crown,
  Eye,
  Mail,
  Shield,
  Sparkles,
  Sword,
  type LucideIcon,
} from "lucide-react";

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

const variantIcons: Record<TeamMember["avatar"]["variant"], LucideIcon> = {
  crown: Crown,
  forge: Anvil,
  blade: Sword,
  veil: Eye,
};

const particles = [
  { left: "8%", top: "16%", size: 5, delay: 0.2 },
  { left: "22%", top: "10%", size: 7, delay: 1.1 },
  { left: "48%", top: "14%", size: 5, delay: 0.7 },
  { left: "74%", top: "11%", size: 7, delay: 1.6 },
  { left: "92%", top: "22%", size: 6, delay: 0.9 },
];

export function TeamShowcase({ members }: TeamShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const selectorRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const shouldReduceMotion = useReducedMotion();

  const selectedMember = members[selectedIndex];
  const selectedIcon = variantIcons[selectedMember.avatar.variant];
  const leadStat = getLeadStat(selectedMember.stats);
  const averageStat = Math.round(
    selectedMember.stats.reduce((sum, stat) => sum + stat.value, 0) /
      selectedMember.stats.length,
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),transparent_14%),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_100%,128px_128px,128px_128px] opacity-35" />
        <div
          className="absolute left-[-10%] top-[-6%] h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: selectedMember.theme.glow }}
        />
        <div
          className="absolute right-[-8%] top-[6%] h-[24rem] w-[24rem] rounded-full blur-3xl"
          style={{ background: selectedMember.theme.secondarySoft }}
        />
        <div
          className="absolute bottom-[-18%] left-[42%] h-[22rem] w-[22rem] rounded-full blur-3xl"
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
                ? { opacity: [0.16, 0.36, 0.16] }
                : {
                    opacity: [0.12, 0.54, 0.14],
                    y: [0, -14, 0],
                    scale: [0.94, 1.14, 0.96],
                  }
            }
            transition={{
              duration: 4.8 + index * 0.4,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1560px] flex-col px-4 pb-8 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pb-10">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="font-display text-[clamp(2.45rem,5.2vw,4.15rem)] leading-[0.94] tracking-[0.1em] text-white">
            Pactum X Team
          </h1>
          <p className="mt-2 text-[0.68rem] uppercase tracking-[0.36em] text-slate-300/58 sm:text-[0.76rem]">
            Selecciona un miembro del equipo
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.06 }}
          className="mt-4"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="section-eyebrow">Selector del equipo</p>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-white/56">
              {String(members.length).padStart(2, "0")} miembros
            </div>
          </div>

          <div
            role="radiogroup"
            aria-label="Seleccion de personajes del equipo Pactum X"
            onKeyDown={handleSelectorKeyDown}
            className="roster-scroll flex gap-3 overflow-x-auto overflow-y-visible px-2 py-4 sm:px-3 lg:gap-4"
          >
            <LayoutGroup>
              {members.map((member, index) => {
                const isSelected = selectedIndex === index;
                const isHovered = hoveredId === member.id;

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
                    onMouseLeave={() =>
                      setHoveredId((current) => (current === member.id ? null : current))
                    }
                    onClick={() => selectIndex(index)}
                    transition={transition}
                    className={`relative shrink-0 overflow-visible focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                      isSelected
                        ? "basis-[23rem] sm:basis-[30rem] lg:basis-[38rem] xl:basis-[42rem]"
                        : isHovered
                          ? "basis-[8.75rem] sm:basis-[9.5rem] lg:basis-[10.25rem]"
                          : "basis-[6.75rem] sm:basis-[7.4rem] lg:basis-[8rem]"
                    }`}
                  >
                    {isSelected ? (
                      <ExpandedSelectorCard member={member} />
                    ) : (
                      <CompactSelectorCard member={member} hovered={isHovered} />
                    )}
                  </motion.button>
                );
              })}
            </LayoutGroup>
          </div>
        </motion.section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_420px] xl:items-start">
          <AnimatePresence mode="wait" initial={false}>
            <motion.section
              key={`${selectedMember.id}-portrait`}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 14 }}
              transition={transition}
              className="pactum-panel rounded-[34px] p-3 sm:p-4"
              style={{ boxShadow: `0 18px 80px rgba(0,0,0,0.5), 0 0 0 1px ${selectedMember.theme.accentSoft}` }}
            >
              <PanelAccent member={selectedMember} />

              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
                <div className="flex flex-wrap gap-2">
                  <PanelChip
                    label={selectedMember.title}
                    accent={selectedMember.theme.accent}
                    fill={selectedMember.theme.accentSoft}
                  />
                  <PanelChip
                    label={selectedMember.role}
                    accent={selectedMember.theme.secondary}
                    fill={selectedMember.theme.secondarySoft}
                  />
                </div>

                <IconBadge member={selectedMember} icon={selectedIcon} />
              </div>

              <div className="min-h-[560px] rounded-[30px] border border-white/10 bg-black/20 p-2">
                <CharacterPortrait
                  member={selectedMember}
                  mode="featured"
                  active
                />
              </div>

              <div className="mt-4 grid gap-3 px-2 sm:grid-cols-3">
                <QuickInfoCard
                  label="Clase"
                  value={selectedMember.title}
                  accent={selectedMember.theme.accent}
                />
                <QuickInfoCard
                  label="Rango"
                  value={selectedMember.rank}
                  accent={selectedMember.theme.secondary}
                />
                <QuickInfoCard
                  label="Dominio"
                  value={leadStat.label}
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
              <PanelAccent member={selectedMember} />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Atributos</p>
                  <h2 className="font-display mt-3 text-[2.55rem] tracking-[0.08em] text-white">
                    Estadisticas
                  </h2>
                </div>

                <IconBadge member={selectedMember} icon={Shield} />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <StatSummary
                  label="Media"
                  value={String(averageStat)}
                  accent={selectedMember.theme.accent}
                />
                <StatSummary
                  label="Pico"
                  value={leadStat.value.toString()}
                  accent={selectedMember.theme.secondary}
                />
                <StatSummary
                  label="Nodos"
                  value={String(selectedMember.stats.length).padStart(2, "0")}
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
              <PanelAccent member={selectedMember} />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="section-eyebrow">Perfil</p>
                  <h2 className="font-display mt-3 text-[3.15rem] tracking-[0.08em] text-white">
                    {selectedMember.name}
                  </h2>
                  <p
                    className="mt-2 text-sm uppercase tracking-[0.28em]"
                    style={{ color: selectedMember.theme.secondary }}
                  >
                    {selectedMember.role}
                  </p>
                </div>

                <IconBadge member={selectedMember} icon={selectedIcon} />
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div>
                  <div
                    className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${selectedMember.theme.accentSoft}`,
                      background: `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02)), radial-gradient(circle at top right, ${selectedMember.accentColor}18, transparent 48%)`,
                    }}
                  >
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-300/54">
                      {selectedMember.title}
                    </p>
                    <p className="mt-3 text-lg leading-8 text-slate-300/82">
                      {selectedMember.description}
                    </p>
                  </div>

                  <div
                    className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.05] p-5"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${selectedMember.theme.secondarySoft}`,
                      background: `linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)), radial-gradient(circle at top right, ${selectedMember.theme.secondary}18, transparent 44%)`,
                    }}
                  >
                    <p className="section-eyebrow">Contribucion distintiva</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      {selectedMember.signatureAbility}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300/76">
                      {selectedMember.signatureDetail}
                    </p>
                  </div>

                  <div
                    className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-5"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${selectedMember.theme.accentSoft}`,
                      background: `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02)), radial-gradient(circle at bottom right, ${selectedMember.accentColor}16, transparent 52%)`,
                    }}
                  >
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
              <PanelAccent member={selectedMember} />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Contacto</p>
                  <h2 className="font-display mt-3 text-[2.55rem] tracking-[0.08em] text-white">
                    Enlaces
                  </h2>
                </div>

                <IconBadge member={selectedMember} icon={Sparkles} />
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

              <div
                className="mt-5 rounded-[28px] border border-white/10 bg-white/[0.04] p-5"
                style={{
                  background: `linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)), radial-gradient(circle at top right, ${selectedMember.theme.secondary}16, transparent 52%)`,
                  boxShadow: `inset 0 0 0 1px ${selectedMember.theme.secondarySoft}`,
                }}
              >
                <p className="section-eyebrow">Lectura rapida</p>
                <p className="mt-3 text-sm leading-7 text-slate-300/74">
                  Perfil dominante en <span className="text-white">{leadStat.label}</span>,
                  con una media de <span className="text-white">{averageStat}</span> y una
                  identidad visual alineada con su especialidad.
                </p>
              </div>
            </motion.aside>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ExpandedSelectorCard({ member }: { member: TeamMember }) {
  const leadStat = getLeadStat(member.stats);
  const Icon = variantIcons[member.avatar.variant];

  return (
    <div className="group relative overflow-visible px-1 py-1">
      <div
        className="absolute -inset-3 rounded-[38px] opacity-90 blur-2xl"
        style={{ background: member.theme.glow }}
      />

      <div
        className="relative h-[252px] overflow-hidden rounded-[32px] border"
        style={{
          borderColor: member.theme.accentSoft,
          boxShadow: `0 0 0 1px ${member.theme.accentSoft}, inset 0 0 0 1px rgba(255,255,255,0.05)`,
          background: `linear-gradient(135deg, ${member.theme.accentSoft} 0%, rgba(8,10,18,0.96) 28%, rgba(6,8,14,0.98) 100%)`,
        }}
      >
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        <div className="grid h-full grid-cols-[11.5rem_minmax(0,1fr)] gap-3 p-2 sm:grid-cols-[12.4rem_minmax(0,1fr)] lg:grid-cols-[13.5rem_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-[26px] border border-white/10">
            <CharacterPortrait member={member} mode="wide" active />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...transition, delay: 0.05 }}
            className="flex min-w-0 flex-col justify-between rounded-[26px] border border-white/8 bg-black/24 px-5 py-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.32em] text-white/64">
                {member.avatar.codename}
              </div>
              <div className="rounded-full border border-white/10 bg-black/30 p-2.5">
                <Icon className="h-[18px] w-[18px]" style={{ color: member.theme.secondary }} />
              </div>
            </div>

            <div className="min-w-0">
              <p className="font-display text-[2.1rem] leading-[0.95] tracking-[0.08em] text-white">
                {member.name}
              </p>
              <p
                className="mt-2 text-xs uppercase tracking-[0.28em]"
                style={{ color: member.theme.secondary }}
              >
                {member.title}
              </p>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-300/78">
                {member.subtitle}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <MiniStatCard
                label="Rol"
                value={member.role}
                accent={member.theme.accent}
              />
              <MiniStatCard
                label="Dominio"
                value={leadStat.label}
                accent={member.theme.secondary}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CompactSelectorCard({
  member,
  hovered,
}: {
  member: TeamMember;
  hovered: boolean;
}) {
  return (
    <motion.div
      animate={{
        y: hovered ? -4 : 0,
      }}
      transition={transition}
      className="relative overflow-visible"
    >
      <div
        className="absolute -inset-1.5 rounded-[34px] opacity-0 blur-2xl transition-opacity duration-300"
        style={{
          background: member.theme.glow,
          opacity: hovered ? 0.8 : 0,
        }}
      />

      <div className="relative h-[252px] overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(11,13,20,0.98),rgba(7,9,14,0.96))] shadow-[0_18px_46px_rgba(0,0,0,0.38)]">
        <div className="absolute inset-0 rounded-[32px] border border-white/4" />

        <motion.div
          className="absolute inset-[7px] overflow-hidden rounded-[24px]"
          animate={{
            scale: hovered ? 1.04 : 0.985,
            filter: hovered ? "brightness(1.06) contrast(1.06)" : "brightness(0.78)",
          }}
          transition={transition}
        >
          <CharacterPortrait member={member} mode="compact" active={hovered} />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/88 to-transparent" />

        <div className="absolute inset-x-4 bottom-4">
          <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/46">
            {member.avatar.codename}
          </p>
          <p className="font-display mt-2 text-[1.65rem] leading-none tracking-[0.08em] text-white">
            {member.name}
          </p>
          <motion.p
            initial={false}
            animate={{ opacity: hovered ? 1 : 0.58, y: hovered ? 0 : 2 }}
            transition={transition}
            className="mt-2 text-[0.68rem] uppercase tracking-[0.24em] text-slate-300/70"
          >
            {member.title}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

function PanelAccent({ member }: { member: TeamMember }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-6 top-0 h-px"
      style={{
        background: `linear-gradient(90deg, transparent, ${member.theme.accent}, ${member.theme.secondary}, transparent)`,
      }}
    />
  );
}

function IconBadge({
  member,
  icon: Icon,
}: {
  member: TeamMember;
  icon: LucideIcon;
}) {
  return (
    <div
      className="rounded-full border border-white/10 bg-black/28 p-3"
      style={{ boxShadow: `0 0 24px ${member.theme.glow}` }}
    >
      <Icon className="h-5 w-5" style={{ color: member.theme.secondary }} />
    </div>
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
    <div
      className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4"
      style={{
        background: `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02)), radial-gradient(circle at top right, ${accent}1f, transparent 52%)`,
        boxShadow: `inset 0 0 0 1px ${accent}18`,
      }}
    >
      <p className="text-[0.66rem] uppercase tracking-[0.3em] text-white/42">
        {label}
      </p>
      <p className="mt-3 text-sm uppercase tracking-[0.18em]" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}

function MiniStatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-[20px] border border-white/10 bg-white/[0.03] p-3"
      style={{
        background: `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02)), radial-gradient(circle at top right, ${accent}18, transparent 54%)`,
        boxShadow: `inset 0 0 0 1px ${accent}16`,
      }}
    >
      <p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/44">
        {label}
      </p>
      <p className="mt-2 text-[0.72rem] uppercase tracking-[0.2em]" style={{ color: accent }}>
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
    <div
      className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4"
      style={{
        background: `linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)), radial-gradient(circle at top right, ${accent}18, transparent 56%)`,
        boxShadow: `inset 0 0 0 1px ${accent}16`,
      }}
    >
      <p className="text-[0.66rem] uppercase tracking-[0.3em] text-white/42">
        {label}
      </p>
      <p
        className="mt-3 line-clamp-2 text-sm font-semibold uppercase tracking-[0.16em]"
        style={{ color: accent }}
      >
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
        <p className="text-sm uppercase tracking-[0.16em] text-slate-300/76">
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
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.05,
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
    <div
      className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5"
      style={{
        background: `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02)), radial-gradient(circle at top right, ${accent}16, transparent 52%)`,
        boxShadow: `inset 0 0 0 1px ${accent}14`,
      }}
    >
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
      style={{
        background: `linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)), radial-gradient(circle at top right, ${accent}16, transparent 54%)`,
        boxShadow: `inset 0 0 0 1px ${accent}14`,
      }}
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

function getLeadStat(stats: TeamStat[]) {
  return stats.reduce((best, current) => (current.value > best.value ? current : best));
}
