"use client";

import { motion } from "framer-motion";
import { Anvil, Crown, Eye, Sword, type LucideIcon } from "lucide-react";

import type { TeamAvatarVariant, TeamMember } from "@/types/team";

type CharacterPortraitProps = {
  member: TeamMember;
  mode?: "roster" | "featured";
  active?: boolean;
};

const iconMap: Record<TeamAvatarVariant, LucideIcon> = {
  crown: Crown,
  forge: Anvil,
  blade: Sword,
  veil: Eye,
};

export function CharacterPortrait({
  member,
  mode = "featured",
  active = false,
}: CharacterPortraitProps) {
  const Icon = iconMap[member.avatar.variant];
  const compact = mode === "roster";
  const id = `${member.id}-${mode}`;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[30px] border border-white/10 bg-[#06070d]">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 24%), radial-gradient(circle at 50% 18%, ${member.theme.glow} 0%, transparent 36%), linear-gradient(180deg, rgba(7,8,14,0.88) 0%, rgba(4,5,10,0.98) 100%)`,
        }}
      />

      <div
        className="absolute left-1/2 top-[18%] h-36 w-36 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: member.theme.glow }}
      />

      <motion.div
        className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/25 p-2.5 backdrop-blur-sm"
        animate={
          active
            ? { y: [0, -5, 0], opacity: [0.65, 1, 0.72] }
            : { opacity: [0.34, 0.5, 0.34] }
        }
        transition={{
          duration: compact ? 4.2 : 5.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          boxShadow: `0 0 26px ${member.theme.glow}`,
        }}
      >
        <Icon className="h-5 w-5" style={{ color: member.theme.secondary }} />
      </motion.div>

      {!compact ? (
        <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[0.65rem] uppercase tracking-[0.34em] text-white/70">
          {member.avatar.codename}
        </div>
      ) : null}

      <motion.div
        className="absolute inset-x-[6%] bottom-0 top-[10%]"
        animate={
          active
            ? { y: [0, -8, 0], scale: [1, 1.018, 1] }
            : { y: [0, -4, 0], scale: [0.985, 1, 0.985] }
        }
        transition={{
          duration: compact ? 5.4 : 6.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 420 540" className="h-full w-full">
          <defs>
            <linearGradient id={`cloak-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
              <stop offset="28%" stopColor="rgba(18,20,31,0.92)" />
              <stop offset="100%" stopColor="rgba(2,3,8,1)" />
            </linearGradient>
            <linearGradient id={`hood-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="48%" stopColor="rgba(9,10,17,0.9)" />
              <stop offset="100%" stopColor="rgba(2,3,8,1)" />
            </linearGradient>
          </defs>

          <rect
            x="26"
            y="26"
            width="368"
            height="488"
            rx="28"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
          />

          <circle
            cx="210"
            cy="148"
            r={compact ? 88 : 102}
            fill="none"
            stroke={member.theme.accentSoft}
            strokeWidth="2"
            strokeDasharray="6 10"
          />
          <circle
            cx="210"
            cy="148"
            r={compact ? 60 : 72}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.4"
          />

          <path
            d="M82 448 L166 384"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2"
          />
          <path
            d="M338 448 L254 384"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2"
          />
          <path
            d="M112 214 H308"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="2"
          />

          {renderArtifact(member.avatar.variant, member)}

          <path
            d="M150 302 C158 228 178 170 210 138 C242 170 262 228 270 302 C248 286 230 278 210 278 C190 278 172 286 150 302 Z"
            fill={`url(#hood-${id})`}
            stroke={member.theme.accentSoft}
            strokeWidth="2"
          />
          <path
            d="M138 502 C146 430 170 328 210 256 C250 328 274 430 282 502 Z"
            fill={`url(#cloak-${id})`}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
          />
          <path
            d="M120 500 C138 410 166 338 210 296 C254 338 282 410 300 500"
            fill="none"
            stroke={member.theme.secondarySoft}
            strokeWidth="3"
          />

          <ellipse
            cx="210"
            cy="184"
            rx="40"
            ry="54"
            fill="rgba(5,6,12,0.86)"
            stroke="rgba(255,255,255,0.06)"
          />
          <path
            d="M170 184 C178 152 192 136 210 136 C228 136 242 152 250 184"
            fill="none"
            stroke={member.theme.secondary}
            strokeWidth="2.2"
          />

          <path
            d="M174 230 C188 214 200 208 210 208 C220 208 232 214 246 230"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
          />

          <circle
            cx="210"
            cy="388"
            r="96"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeDasharray="4 14"
          />
        </svg>
      </motion.div>

      {!compact ? (
        <>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/82 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]" />

          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.66rem] uppercase tracking-[0.32em] text-white/52">
                {member.avatar.sigil}
              </p>
              <p className="mt-2 font-[family:var(--font-display)] text-2xl tracking-[0.08em] text-white">
                {member.name}
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[0.66rem] uppercase tracking-[0.28em] text-white/68">
              {member.rank}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

function renderArtifact(variant: TeamAvatarVariant, member: TeamMember) {
  switch (variant) {
    case "crown":
      return (
        <g>
          <path
            d="M150 110 L178 84 L210 118 L242 84 L270 110 L262 138 H158 Z"
            fill="rgba(255,255,255,0.06)"
            stroke={member.theme.accent}
            strokeWidth="2.5"
          />
          <circle cx="178" cy="102" r="4" fill={member.theme.secondary} />
          <circle cx="210" cy="92" r="4" fill={member.theme.secondary} />
          <circle cx="242" cy="102" r="4" fill={member.theme.secondary} />
        </g>
      );
    case "forge":
      return (
        <g>
          <path
            d="M286 108 L320 124 L308 146 L274 130 Z"
            fill="rgba(255,255,255,0.06)"
            stroke={member.theme.accent}
            strokeWidth="2.2"
          />
          <path
            d="M278 140 L248 188"
            stroke={member.theme.secondary}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      );
    case "blade":
      return (
        <g>
          <path
            d="M300 102 L332 134 L270 196 L246 172 Z"
            fill="rgba(255,255,255,0.04)"
            stroke={member.theme.accent}
            strokeWidth="2.2"
          />
          <path
            d="M246 172 L228 190"
            stroke={member.theme.secondary}
            strokeWidth="4.6"
            strokeLinecap="round"
          />
        </g>
      );
    case "veil":
      return (
        <g>
          <ellipse
            cx="210"
            cy="118"
            rx="64"
            ry="24"
            fill="rgba(255,255,255,0.03)"
            stroke={member.theme.accent}
            strokeWidth="2.2"
          />
          <circle cx="210" cy="118" r="10" fill={member.theme.secondary} />
        </g>
      );
  }
}
