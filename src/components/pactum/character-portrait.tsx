"use client";

import { motion } from "framer-motion";
import { Anvil, Crown, Eye, Sword, type LucideIcon } from "lucide-react";

import type { TeamAvatarVariant, TeamMember } from "@/types/team";

type CharacterPortraitProps = {
  member: TeamMember;
  mode?: "compact" | "wide" | "featured";
  active?: boolean;
};

const iconMap: Record<TeamAvatarVariant, LucideIcon> = {
  crown: Crown,
  forge: Anvil,
  blade: Sword,
  veil: Eye,
};

const modeConfig = {
  compact: {
    x: -18,
    y: 56,
    scale: 1.18,
    ring: 82,
    iconClass: "h-4 w-4",
    iconSize: "p-2.5",
  },
  wide: {
    x: -8,
    y: 28,
    scale: 1.13,
    ring: 96,
    iconClass: "h-[18px] w-[18px]",
    iconSize: "p-2.5",
  },
  featured: {
    x: 0,
    y: 22,
    scale: 1.14,
    ring: 114,
    iconClass: "h-5 w-5",
    iconSize: "p-3",
  },
} as const;

export function CharacterPortrait({
  member,
  mode = "featured",
  active = false,
}: CharacterPortraitProps) {
  const config = modeConfig[mode];
  const Icon = iconMap[member.avatar.variant];
  const reveal = mode !== "compact";

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[#06070d]">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 18%), radial-gradient(circle at 50% 14%, ${member.theme.glow} 0%, transparent 34%), linear-gradient(180deg, rgba(8,10,18,0.94) 0%, rgba(4,5,10,0.99) 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:54px_54px] opacity-20" />

      <motion.div
        className="absolute left-1/2 top-[15%] h-48 w-48 -translate-x-1/2 rounded-full blur-3xl"
        animate={
          active
            ? { opacity: [0.38, 0.56, 0.4], scale: [0.98, 1.08, 1] }
            : { opacity: [0.22, 0.34, 0.24], scale: [0.96, 1.02, 0.98] }
        }
        transition={{
          duration: 5.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ background: member.theme.glow }}
      />

      <motion.div
        className="absolute left-1/2 top-[45%] h-[44%] w-[40%] -translate-x-1/2 rounded-[50%] blur-[52px]"
        animate={
          active
            ? { opacity: [0.2, 0.34, 0.22] }
            : { opacity: [0.12, 0.18, 0.12] }
        }
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ background: member.theme.secondarySoft }}
      />

      <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-4">
        {mode !== "compact" ? (
          <div className="rounded-full border border-white/10 bg-black/28 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.32em] text-white/58">
            {member.avatar.sigil}
          </div>
        ) : (
          <span />
        )}

        <motion.div
          className={`rounded-full border border-white/10 bg-black/28 backdrop-blur-sm ${config.iconSize}`}
          animate={
            active
              ? { y: [0, -4, 0], opacity: [0.64, 0.94, 0.72] }
              : { opacity: [0.28, 0.44, 0.28] }
          }
          transition={{
            duration: 4.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ boxShadow: `0 0 24px ${member.theme.glow}` }}
        >
          <Icon className={config.iconClass} style={{ color: member.theme.secondary }} />
        </motion.div>
      </div>

      <svg
        viewBox="0 0 420 540"
        className="h-full w-full [filter:drop-shadow(0_18px_34px_rgba(0,0,0,0.42))]"
      >
        <circle
          cx="210"
          cy="150"
          r={config.ring}
          fill="none"
          stroke={member.theme.accentSoft}
          strokeWidth="2.1"
          strokeDasharray={mode === "compact" ? "7 10" : "10 12"}
          opacity="0.92"
        />
        <circle
          cx="210"
          cy="150"
          r={config.ring - 28}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.4"
        />
        <path
          d="M94 484 C126 420 162 372 210 334 C258 372 294 420 326 484"
          fill="none"
          stroke={member.theme.accentSoft}
          strokeWidth="2.1"
          opacity="0.54"
        />
        <path d="M122 226 H298" stroke={member.theme.secondarySoft} strokeWidth="1.8" />
        <ellipse cx="210" cy="476" rx="112" ry="28" fill={member.theme.accentSoft} opacity="0.12" />

        <g
          transform={`translate(${config.x} ${config.y}) scale(${config.scale})`}
          style={{ transformOrigin: "210px 270px" }}
        >
          {renderFigure(member)}
        </g>
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/88 to-transparent" />
      {mode === "compact" ? (
        <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.82))]" />
      ) : null}

      {reveal ? (
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.45))]" />
      ) : null}
    </div>
  );
}

function renderFigure(member: TeamMember) {
  return (
    <>
      <path
        d="M92 514 C118 440 154 350 210 280 C266 350 302 440 328 514 Z"
        fill="rgba(5,6,10,0.96)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="2.2"
      />
      <path
        d="M118 492 C138 422 168 350 210 304 C252 350 282 422 302 492"
        fill="none"
        stroke={member.theme.secondarySoft}
        strokeWidth="4.6"
      />
      {renderBody(member)}
      {renderHead(member)}
      {renderEquipment(member)}
      <circle
        cx="210"
        cy="380"
        r="98"
        fill="none"
        stroke={member.theme.secondarySoft}
        strokeDasharray="5 14"
        opacity="0.44"
      />
    </>
  );
}

function renderBody(member: TeamMember) {
  switch (member.avatar.variant) {
    case "crown":
      return (
        <g>
          <path
            d="M128 336 C140 280 174 242 210 242 C246 242 280 280 292 336 C262 314 238 306 210 306 C182 306 158 314 128 336 Z"
            fill="rgba(22,18,36,0.98)"
            stroke={member.theme.accent}
            strokeWidth="2.8"
          />
          <path
            d="M122 504 C138 416 168 334 210 292 C252 334 282 416 298 504 Z"
            fill="rgba(12,13,22,0.98)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="2.1"
          />
          <path
            d="M172 340 L210 318 L248 340 L234 398 H186 Z"
            fill="rgba(33,24,58,0.96)"
            stroke={member.theme.secondary}
            strokeWidth="2.1"
          />
          <path
            d="M146 350 L170 322 L188 404 L158 420 Z"
            fill="rgba(20,17,33,0.94)"
            stroke={member.theme.accentSoft}
            strokeWidth="1.8"
          />
          <path
            d="M274 350 L250 322 L232 404 L262 420 Z"
            fill="rgba(20,17,33,0.94)"
            stroke={member.theme.accentSoft}
            strokeWidth="1.8"
          />
        </g>
      );
    case "forge":
      return (
        <g>
          <path
            d="M116 340 C128 284 168 252 210 252 C252 252 292 284 304 340 C274 320 242 310 210 310 C178 310 146 320 116 340 Z"
            fill="rgba(36,18,18,0.98)"
            stroke={member.theme.accent}
            strokeWidth="2.6"
          />
          <path
            d="M116 506 C130 428 162 346 210 300 C258 346 290 428 304 506 Z"
            fill="rgba(14,12,14,0.98)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="2.1"
          />
          <path
            d="M164 338 H256 L246 402 H174 Z"
            fill="rgba(52,22,20,0.96)"
            stroke={member.theme.secondary}
            strokeWidth="2"
          />
          <path
            d="M142 330 L112 380 L158 392 L186 340 Z"
            fill="rgba(62,28,22,0.96)"
            stroke={member.theme.secondary}
            strokeWidth="1.9"
          />
          <path
            d="M278 330 L308 380 L262 392 L234 340 Z"
            fill="rgba(62,28,22,0.96)"
            stroke={member.theme.secondary}
            strokeWidth="1.9"
          />
        </g>
      );
    case "blade":
      return (
        <g>
          <path
            d="M128 336 C138 282 174 248 210 248 C246 248 282 282 292 336 C262 316 238 308 210 308 C182 308 158 316 128 336 Z"
            fill="rgba(14,24,36,0.98)"
            stroke={member.theme.accent}
            strokeWidth="2.4"
          />
          <path
            d="M124 504 C140 422 170 344 210 302 C250 344 280 422 296 504 Z"
            fill="rgba(10,14,22,0.98)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="2.1"
          />
          <path
            d="M176 336 L210 320 L244 336 L232 402 H188 Z"
            fill="rgba(16,30,46,0.96)"
            stroke={member.theme.secondary}
            strokeWidth="2"
          />
          <path
            d="M152 328 L126 382 L168 394 L190 344 Z"
            fill="rgba(12,28,44,0.96)"
            stroke={member.theme.secondary}
            strokeWidth="1.8"
          />
        </g>
      );
    case "veil":
      return (
        <g>
          <path
            d="M128 336 C138 278 174 242 210 242 C246 242 282 278 292 336 C264 314 238 306 210 306 C182 306 156 314 128 336 Z"
            fill="rgba(30,24,14,0.98)"
            stroke={member.theme.accent}
            strokeWidth="2.4"
          />
          <path
            d="M122 504 C138 418 170 338 210 294 C250 338 282 418 298 504 Z"
            fill="rgba(12,11,12,0.98)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="2.1"
          />
          <path
            d="M184 342 L210 322 L236 342 L228 396 H192 Z"
            fill="rgba(52,38,16,0.96)"
            stroke={member.theme.secondary}
            strokeWidth="2"
          />
          <path
            d="M150 356 C168 330 184 320 210 318 C236 320 252 330 270 356"
            fill="none"
            stroke={member.theme.accentSoft}
            strokeWidth="2"
          />
        </g>
      );
  }
}

function renderHead(member: TeamMember) {
  switch (member.avatar.variant) {
    case "crown":
      return (
        <g>
          <path
            d="M152 262 C162 200 184 156 210 138 C236 156 258 200 268 262 C248 242 230 232 210 232 C190 232 172 242 152 262 Z"
            fill="rgba(18,16,30,0.98)"
            stroke={member.theme.accentSoft}
            strokeWidth="2.4"
          />
          <ellipse
            cx="210"
            cy="196"
            rx="34"
            ry="44"
            fill="rgba(28,25,40,0.92)"
            stroke="rgba(255,255,255,0.1)"
          />
          <path
            d="M168 154 L184 128 L210 150 L236 128 L252 154 L246 178 H174 Z"
            fill="rgba(255,255,255,0.08)"
            stroke={member.theme.secondary}
            strokeWidth="2.3"
          />
          <path d="M194 196 H206" stroke={member.theme.secondary} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M214 196 H226" stroke={member.theme.secondary} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="186" cy="148" r="3.5" fill={member.theme.accent} />
          <circle cx="210" cy="142" r="3.5" fill={member.theme.accent} />
          <circle cx="234" cy="148" r="3.5" fill={member.theme.accent} />
        </g>
      );
    case "forge":
      return (
        <g>
          <path
            d="M146 270 C152 214 178 178 210 170 C242 178 268 214 274 270 C252 252 232 244 210 244 C188 244 168 252 146 270 Z"
            fill="rgba(28,16,16,0.98)"
            stroke={member.theme.accentSoft}
            strokeWidth="2.2"
          />
          <ellipse
            cx="210"
            cy="208"
            rx="36"
            ry="42"
            fill="rgba(36,22,22,0.94)"
            stroke="rgba(255,255,255,0.1)"
          />
          <path d="M176 178 H244" stroke="rgba(255,255,255,0.12)" strokeWidth="8" strokeLinecap="round" />
          <path d="M182 188 H238" stroke={member.theme.secondary} strokeWidth="3" strokeLinecap="round" />
          <path d="M194 210 H226" stroke={member.theme.secondary} strokeWidth="2.2" strokeLinecap="round" />
        </g>
      );
    case "blade":
      return (
        <g>
          <path
            d="M152 264 C160 212 184 176 210 164 C236 176 260 212 268 264 C248 248 230 240 210 240 C190 240 172 248 152 264 Z"
            fill="rgba(16,22,34,0.98)"
            stroke={member.theme.accentSoft}
            strokeWidth="2.2"
          />
          <ellipse
            cx="210"
            cy="204"
            rx="34"
            ry="42"
            fill="rgba(20,26,36,0.94)"
            stroke="rgba(255,255,255,0.1)"
          />
          <path d="M188 170 L210 152 L232 170" fill="none" stroke={member.theme.secondary} strokeWidth="2.8" />
          <path d="M194 202 H206" stroke={member.theme.secondary} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M214 202 H226" stroke={member.theme.secondary} strokeWidth="2.2" strokeLinecap="round" />
        </g>
      );
    case "veil":
      return (
        <g>
          <path
            d="M144 272 C152 208 178 166 210 146 C242 166 268 208 276 272 C252 252 230 242 210 242 C190 242 168 252 144 272 Z"
            fill="rgba(18,16,10,0.98)"
            stroke={member.theme.accentSoft}
            strokeWidth="2.2"
          />
          <ellipse
            cx="210"
            cy="198"
            rx="34"
            ry="46"
            fill="rgba(22,18,12,0.94)"
            stroke="rgba(255,255,255,0.1)"
          />
          <ellipse
            cx="210"
            cy="148"
            rx="54"
            ry="18"
            fill="rgba(255,255,255,0.05)"
            stroke={member.theme.secondary}
            strokeWidth="2.3"
          />
          <circle cx="210" cy="148" r="7" fill={member.theme.accent} />
          <path d="M194 202 H226" stroke={member.theme.secondary} strokeWidth="2.2" strokeLinecap="round" />
        </g>
      );
  }
}

function renderEquipment(member: TeamMember) {
  switch (member.avatar.variant) {
    case "crown":
      return (
        <g>
          <path
            d="M138 238 L122 316 L152 334 L166 250 Z"
            fill="rgba(42,24,60,0.86)"
            stroke={member.theme.secondary}
            strokeWidth="1.8"
          />
          <path
            d="M282 238 L298 316 L268 334 L254 250 Z"
            fill="rgba(42,24,60,0.86)"
            stroke={member.theme.secondary}
            strokeWidth="1.8"
          />
          <circle cx="210" cy="366" r="15" fill={member.theme.accent} opacity="0.54" />
          <circle cx="210" cy="366" r="7" fill={member.theme.secondary} opacity="0.82" />
        </g>
      );
    case "forge":
      return (
        <g>
          <rect
            x="286"
            y="170"
            width="48"
            height="56"
            rx="7"
            fill="rgba(74,40,26,0.96)"
            stroke={member.theme.secondary}
            strokeWidth="2.2"
          />
          <rect
            x="304"
            y="224"
            width="12"
            height="156"
            rx="5"
            fill="rgba(82,48,28,0.96)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.3"
          />
          <path d="M294 182 H326" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
        </g>
      );
    case "blade":
      return (
        <g>
          <path
            d="M304 142 L316 128 L328 142 L322 340 H310 Z"
            fill="rgba(186,228,255,0.28)"
            stroke={member.theme.secondary}
            strokeWidth="2"
          />
          <path d="M292 336 H340" stroke={member.theme.accent} strokeWidth="4.4" />
          <rect
            x="308"
            y="340"
            width="16"
            height="72"
            rx="4"
            fill="rgba(10,16,22,0.96)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.2"
          />
        </g>
      );
    case "veil":
      return (
        <g>
          <path
            d="M126 216 C142 192 158 182 176 178"
            fill="none"
            stroke={member.theme.secondary}
            strokeWidth="2.3"
          />
          <path
            d="M294 216 C278 192 262 182 244 178"
            fill="none"
            stroke={member.theme.secondary}
            strokeWidth="2.3"
          />
          <path
            d="M210 344 L232 376 L210 408 L188 376 Z"
            fill="rgba(82,58,16,0.96)"
            stroke={member.theme.secondary}
            strokeWidth="1.9"
          />
          <circle cx="210" cy="376" r="7" fill={member.theme.accent} opacity="0.75" />
        </g>
      );
  }
}
