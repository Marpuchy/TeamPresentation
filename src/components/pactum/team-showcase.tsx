"use client";

import type {
  CSSProperties,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { startTransition, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Anvil,
  Code2,
  Crown,
  Eye,
  Mail,
  Sword,
  type LucideIcon,
} from "lucide-react";

import type { TeamMember } from "@/types/team";

type TeamShowcaseProps = {
  members: TeamMember[];
};

type EdgeAlign = "left" | "right";

const panelTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1] as const,
};

const revealTransition = {
  duration: 0.24,
  ease: [0.22, 1, 0.36, 1] as const,
};

const iconMap: Record<TeamMember["avatar"]["variant"], LucideIcon> = {
  crown: Crown,
  forge: Anvil,
  blade: Sword,
  veil: Eye,
};

export function TeamShowcase({ members }: TeamShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const activeIndex = hoveredIndex ?? selectedIndex;

  const selectIndex = (nextIndex: number, focusPanel = false) => {
    if (!members[nextIndex]) {
      return;
    }

    startTransition(() => {
      setSelectedIndex(nextIndex);
    });

    if (focusPanel) {
      panelRefs.current[nextIndex]?.focus();
    }
  };

  const handlePointerEnter = (
    event: ReactPointerEvent<HTMLElement>,
    index: number,
  ) => {
    if (event.pointerType === "mouse") {
      setHoveredIndex(index);
    }
  };

  const handlePointerLeave = (
    event: ReactPointerEvent<HTMLElement>,
    index: number,
  ) => {
    if (event.pointerType === "mouse") {
      setHoveredIndex((current) => (current === index ? null : current));
    }
  };

  const handlePanelKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    index: number,
  ) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        selectIndex(index);
        break;
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        selectIndex((index + 1) % members.length, true);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        selectIndex((index - 1 + members.length) % members.length, true);
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
    <main className="relative min-h-[100svh] overflow-hidden bg-[#050705] text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),transparent_14%,transparent_86%,rgba(255,255,255,0.02))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,103,126,0.1),transparent_20%),radial-gradient(circle_at_top_right,rgba(74,101,92,0.08),transparent_18%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-px bg-white/10" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/10" />

      <div className="relative z-10">
        <header className="flex flex-col items-center gap-4 px-6 py-14 sm:py-20 text-center">
          <a
            href="https://pactumx.itch.io/"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex flex-col items-center gap-3"
          >
            <span className="text-[0.58rem] uppercase tracking-[0.28em] text-slate-500">
              Ya disponible en
            </span>
            <span className="font-display text-[clamp(1.6rem,5vw,3.8rem)] leading-[0.9] tracking-[0.05em] text-white transition-colors duration-200 group-hover:text-[#c8f04e]">
              Descarga nuestro juego aquí&nbsp;→
            </span>
            <span
              aria-hidden
              className="h-px w-24 bg-gradient-to-r from-transparent via-[#c8f04e66] to-transparent transition-all duration-300 group-hover:w-48 group-hover:via-[#c8f04e]"
            />
          </a>

          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-[clamp(1rem,2.5vw,1.6rem)] font-semibold uppercase tracking-[0.18em] text-slate-300">
              Nuestros Perfiles
            </p>
            <span className="text-[1.4rem] leading-none text-slate-500">↓</span>
          </div>
        </header>

        <div
          role="list"
          aria-label="Roster vertical del equipo Pactum X"
          className="flex flex-col gap-1"
        >
          {members.map((member, index) => {
            const isLeft = index % 2 === 0;
            const align: EdgeAlign = isLeft ? "left" : "right";
            const isActive = activeIndex === index;
            const isSelected = selectedIndex === index;
            const Icon = iconMap[member.avatar.variant];
            const sectionCode = `${index + 1}`.padStart(2, "0");

            return (
              <motion.article
                key={member.id}
                layout
                ref={(element) => {
                  panelRefs.current[index] = element;
                }}
                role="button"
                tabIndex={0}
                aria-label={`Abrir perfil de ${member.name}`}
                aria-expanded={isActive}
                aria-pressed={isSelected}
                onClick={() => selectIndex(index)}
                onKeyDown={(event) => handlePanelKeyDown(event, index)}
                onPointerEnter={(event) => handlePointerEnter(event, index)}
                onPointerLeave={(event) => handlePointerLeave(event, index)}
                transition={shouldReduceMotion ? { duration: 0 } : panelTransition}
                className={`relative min-h-0 cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                  isActive
                    ? "min-h-[18rem] sm:min-h-[20rem]"
                    : "min-h-[12.5rem] sm:min-h-[13rem]"
                }`}
                style={getPanelStyle(member, isLeft, isActive, isSelected)}
              >
                <div
                  aria-hidden
                  className={`absolute inset-y-0 ${isLeft ? "left-0" : "right-0"} w-[18px] sm:w-[22px] lg:w-[26px]`}
                  style={{
                    background: `linear-gradient(180deg, ${member.theme.accent} 0%, ${member.theme.secondary} 100%)`,
                    opacity: isActive ? 0.82 : isSelected ? 0.72 : 0.54,
                  }}
                />
                <div
                  aria-hidden
                  className={`absolute inset-y-0 ${isLeft ? "left-[18px] sm:left-[22px] lg:left-[26px]" : "right-[18px] sm:right-[22px] lg:right-[26px]"} w-[42%]`}
                  style={{
                    background: isLeft
                      ? `linear-gradient(90deg, ${member.theme.accentSoft} 0%, transparent 78%)`
                      : `linear-gradient(270deg, ${member.theme.accentSoft} 0%, transparent 78%)`,
                    opacity: isActive ? 1 : 0.72,
                  }}
                />
                <div
                  aria-hidden
                  className={`absolute top-0 ${isLeft ? "left-0" : "right-0"} h-px w-[13rem] sm:w-[18rem] lg:w-[24rem]`}
                  style={{
                    background: isLeft
                      ? `linear-gradient(90deg, ${member.theme.secondary} 0%, transparent 100%)`
                      : `linear-gradient(270deg, ${member.theme.secondary} 0%, transparent 100%)`,
                  }}
                />
                <div
                  aria-hidden
                  className={`absolute bottom-0 ${isLeft ? "right-0" : "left-0"} h-px w-[10rem] sm:w-[14rem] lg:w-[20rem]`}
                  style={{
                    background: isLeft
                      ? `linear-gradient(270deg, ${member.theme.accent} 0%, transparent 100%)`
                      : `linear-gradient(90deg, ${member.theme.accent} 0%, transparent 100%)`,
                    opacity: 0.68,
                  }}
                />

                <div
                  className={`relative flex py-3 sm:py-4 lg:py-5 ${
                    isLeft
                      ? "justify-start pr-3 sm:pr-4 lg:pr-6"
                      : "justify-end pl-3 sm:pl-4 lg:pl-6"
                  }`}
                >
                  <div
                    className={`flex w-full min-w-0 flex-col px-4 py-4 sm:w-[90%] sm:px-6 sm:py-5 lg:w-[72%] lg:max-w-[76rem] ${
                      isLeft ? "items-start text-left" : "items-end text-right"
                    }`}
                  >
                    <div
                      className={`flex w-full min-w-0 items-start gap-4 ${
                        isLeft ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      <SectionMarker
                        code={sectionCode}
                        accent={member.theme.accent}
                        secondary={member.theme.secondary}
                        surface={member.theme.surfaceAlt}
                        align={align}
                      />

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div
                          className={`flex min-w-0 items-center gap-3 ${
                            isLeft ? "flex-row" : "flex-row-reverse"
                          }`}
                        >
                          <PanelBadge
                            label={member.title}
                            accent={member.theme.accent}
                            fill={member.theme.accentSoft}
                            align={align}
                          />

                          <div
                            aria-hidden
                            className="h-px flex-1"
                            style={{
                              background: isLeft
                                ? `linear-gradient(90deg, ${member.theme.line} 0%, transparent 100%)`
                                : `linear-gradient(270deg, ${member.theme.line} 0%, transparent 100%)`,
                            }}
                          />

                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 bg-transparent"
                            style={getIconFrameStyle(member, align)}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                        </div>

                        <div className="mt-4 w-full min-w-0">
                          <p className="font-display text-[clamp(1.45rem,3.8vw,3rem)] leading-[0.92] tracking-[0.07em] text-white">
                            {member.name}
                          </p>

                          <p
                            className="mt-2 text-[0.64rem] uppercase tracking-[0.22em]"
                            style={{ color: member.theme.secondary }}
                          >
                            {member.role}
                          </p>

                          <p
                            className="mt-3 text-[0.8rem] font-medium leading-6 sm:text-[0.86rem]"
                            style={{ color: member.theme.accent }}
                          >
                            {member.title}
                          </p>

                          <p
                            className={`mt-3 max-w-[68ch] text-[0.78rem] leading-6 text-slate-300 sm:text-[0.84rem] ${
                              isActive ? "" : "line-clamp-2"
                            }`}
                          >
                            {member.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={
                        shouldReduceMotion
                          ? {
                              height: isActive ? "auto" : 0,
                              opacity: isActive ? 1 : 0,
                              marginTop: isActive ? 20 : 0,
                            }
                          : {
                              height: isActive ? "auto" : 0,
                              opacity: isActive ? 1 : 0,
                              marginTop: isActive ? 20 : 0,
                            }
                      }
                      transition={shouldReduceMotion ? { duration: 0 } : revealTransition}
                      className="w-full overflow-hidden"
                    >
                      <motion.div
                        layout="position"
                        initial={false}
                        animate={
                          shouldReduceMotion
                            ? { y: 0 }
                            : { y: isActive ? 0 : -6 }
                        }
                        transition={shouldReduceMotion ? { duration: 0 } : revealTransition}
                        className="w-full border-t pt-5"
                        style={{ borderColor: member.theme.line }}
                      >
                        <div
                          className={`grid gap-3 lg:items-start ${
                            isLeft
                              ? "lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]"
                              : "lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)]"
                          }`}
                        >
                          {isLeft ? (
                            <>
                              <DetailCard
                                label="Contribucion distintiva"
                                title={member.signatureAbility}
                                detail={member.signatureDetail}
                                accent={member.theme.secondary}
                                align={align}
                              />
                              <div className="space-y-3">
                                <ProfileEssentialsCard member={member} align={align} />
                                <div className="grid gap-2">
                                  <ProfileLink
                                    icon={<Code2 className="h-4 w-4" />}
                                    label="GitHub"
                                    value={member.github}
                                    href={`https://github.com/${member.github}`}
                                    accent={member.theme.accent}
                                    align={align}
                                  />
                                  <ProfileLink
                                    icon={<Mail className="h-4 w-4" />}
                                    label="Correo"
                                    value={member.email}
                                    href={`mailto:${member.email}`}
                                    accent={member.theme.secondary}
                                    align={align}
                                  />
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="space-y-3">
                                <ProfileEssentialsCard member={member} align={align} />
                                <div className="grid gap-2">
                                  <ProfileLink
                                    icon={<Code2 className="h-4 w-4" />}
                                    label="GitHub"
                                    value={member.github}
                                    href={`https://github.com/${member.github}`}
                                    accent={member.theme.accent}
                                    align={align}
                                  />
                                  <ProfileLink
                                    icon={<Mail className="h-4 w-4" />}
                                    label="Correo"
                                    value={member.email}
                                    href={`mailto:${member.email}`}
                                    accent={member.theme.secondary}
                                    align={align}
                                  />
                                </div>
                              </div>
                              <DetailCard
                                label="Contribucion distintiva"
                                title={member.signatureAbility}
                                detail={member.signatureDetail}
                                accent={member.theme.secondary}
                                align={align}
                              />
                            </>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function SectionMarker({
  code,
  accent,
  secondary,
  surface,
  align,
}: {
  code: string;
  accent: string;
  secondary: string;
  surface: string;
  align: EdgeAlign;
}) {
  return (
    <div
      className="flex h-12 w-12 shrink-0 flex-col justify-between border border-white/10 px-2 py-1.5"
      style={{
        ...getChromeClipStyle(align, 10),
        background: `linear-gradient(180deg, ${surface} 0%, rgba(5,7,5,0.92) 100%)`,
        boxShadow: `inset 0 0 0 1px ${accent}24`,
      }}
    >
      <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {code}
      </span>
      <span
        aria-hidden
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, ${accent} 0%, ${secondary} 100%)`,
        }}
      />
    </div>
  );
}

function PanelBadge({
  label,
  accent,
  fill,
  align,
}: {
  label: string;
  accent: string;
  fill: string;
  align: EdgeAlign;
}) {
  return (
    <span
      className="inline-flex max-w-[16rem] items-center overflow-hidden border px-3 py-1.5 text-[0.56rem] uppercase tracking-[0.18em] text-ellipsis whitespace-nowrap"
      style={{
        ...getChromeClipStyle(align, 10),
        borderColor: fill,
        background: `linear-gradient(180deg, ${fill} 0%, rgba(5,7,5,0.84) 100%)`,
        color: accent,
      }}
    >
      {label}
    </span>
  );
}

function DetailCard({
  label,
  title,
  detail,
  accent,
  align,
}: {
  label: string;
  title: string;
  detail: string;
  accent: string;
  align: EdgeAlign;
}) {
  return (
    <div
      className={`border px-3 py-3 sm:px-4 sm:py-3.5 ${
        align === "left" ? "text-left" : "text-right"
      }`}
      style={{
        ...getChromeClipStyle(align, 14),
        background:
          align === "left"
            ? `linear-gradient(135deg, ${accent}12 0%, rgba(6,8,6,0.9) 100%)`
            : `linear-gradient(225deg, ${accent}12 0%, rgba(6,8,6,0.9) 100%)`,
        borderColor: `${accent}22`,
        boxShadow: `inset 0 0 0 1px ${accent}14`,
      }}
    >
      <p className="text-[0.52rem] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <h3 className="mt-2 text-[0.92rem] leading-5 font-semibold text-white">
        {title}
      </h3>
      <p className="mt-2 text-[0.76rem] leading-6 text-slate-300">
        {detail}
      </p>
    </div>
  );
}

function ProfileEssentialsCard({
  member,
  align,
}: {
  member: TeamMember;
  align: EdgeAlign;
}) {
  return (
    <div
      className={`border px-3 py-3 sm:px-4 sm:py-3.5 ${
        align === "left" ? "text-left" : "text-right"
      }`}
      style={{
        ...getChromeClipStyle(align, 14),
        background:
          align === "left"
            ? `linear-gradient(135deg, ${member.theme.accentSoft} 0%, rgba(6,8,6,0.92) 100%)`
            : `linear-gradient(225deg, ${member.theme.accentSoft} 0%, rgba(6,8,6,0.92) 100%)`,
        borderColor: member.theme.line,
        boxShadow: `inset 0 0 0 1px ${member.theme.accentSoft}`,
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-0">
        <InfoBlock
          className="border-b border-white/8 pb-3 sm:border-b-0 sm:border-r sm:border-white/8 sm:pb-0 sm:pr-4"
          label="Rol"
          value={member.role}
          accent={member.theme.secondary}
        />
        <InfoBlock
          className="pt-0 sm:pl-4"
          label="Especializacion"
          value={member.title}
          accent={member.theme.accent}
        />
      </div>
    </div>
  );
}

function InfoBlock({
  className,
  label,
  value,
  accent,
}: {
  className?: string;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className={`min-w-0 ${className ?? ""}`}>
      <p className="text-[0.52rem] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p
        className="mt-2 text-[0.82rem] leading-6 text-slate-200"
        style={{ color: accent }}
      >
        {value}
      </p>
    </div>
  );
}

function ProfileLink({
  icon,
  label,
  value,
  href,
  accent,
  align,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  accent: string;
  align: EdgeAlign;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
      onClick={(event) => event.stopPropagation()}
      className={`flex min-w-0 items-center gap-3 border px-3 py-2.5 transition-colors duration-150 hover:bg-white/[0.03] ${
        align === "left" ? "text-left" : "flex-row-reverse text-right"
      }`}
      style={{
        ...getChromeClipStyle(align, 12),
        background:
          align === "left"
            ? `linear-gradient(135deg, ${accent}10 0%, rgba(6,8,6,0.88) 100%)`
            : `linear-gradient(225deg, ${accent}10 0%, rgba(6,8,6,0.88) 100%)`,
        borderColor: `${accent}20`,
        boxShadow: `inset 0 0 0 1px ${accent}14`,
      }}
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-transparent"
        style={getInlineChipStyle(accent, align)}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[0.52rem] uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>
        <p className="mt-1 truncate text-[0.76rem] leading-5 text-slate-200">
          {value}
        </p>
      </div>
    </a>
  );
}

function getPanelStyle(
  member: TeamMember,
  isLeft: boolean,
  isActive: boolean,
  isSelected: boolean,
): CSSProperties {
  return {
    background: isLeft
      ? `linear-gradient(90deg, ${member.theme.surface} 0%, ${member.theme.surfaceAlt} 46%, #050705 100%)`
      : `linear-gradient(270deg, ${member.theme.surface} 0%, ${member.theme.surfaceAlt} 46%, #050705 100%)`,
    boxShadow: isActive
      ? `inset 0 0 0 1px ${member.theme.line}, inset 0 0 0 2px rgba(255,255,255,0.03)`
      : isSelected
        ? `inset 0 0 0 1px ${member.theme.secondarySoft}, inset 0 0 0 2px rgba(255,255,255,0.02)`
        : "inset 0 0 0 1px rgba(255,255,255,0.08)",
    clipPath: getPanelClip(isLeft),
  };
}

function getIconFrameStyle(member: TeamMember, align: EdgeAlign): CSSProperties {
  return {
    ...getChromeClipStyle(align, 10),
    background: `linear-gradient(180deg, ${member.theme.surfaceAlt} 0%, rgba(5,7,5,0.92) 100%)`,
    color: member.theme.accent,
    boxShadow: `inset 0 0 0 1px ${member.theme.accentSoft}`,
  };
}

function getInlineChipStyle(accent: string, align: EdgeAlign): CSSProperties {
  return {
    ...getChromeClipStyle(align, 8),
    background: "linear-gradient(180deg, rgba(18,22,18,0.94) 0%, rgba(6,8,6,0.92) 100%)",
    color: accent,
    boxShadow: `inset 0 0 0 1px ${accent}16`,
  };
}

function getPanelClip(isLeft: boolean) {
  return isLeft
    ? "polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%)"
    : "polygon(26px 0, 100% 0, 100% 100%, 0 100%, 0 26px)";
}

function getChromeClipStyle(
  align: EdgeAlign,
  inset: number,
): Pick<CSSProperties, "clipPath"> {
  return {
    clipPath:
      align === "left"
        ? `polygon(0 0, calc(100% - ${inset}px) 0, 100% ${inset}px, 100% 100%, 0 100%)`
        : `polygon(${inset}px 0, 100% 0, 100% 100%, 0 100%, 0 ${inset}px)`,
  };
}
