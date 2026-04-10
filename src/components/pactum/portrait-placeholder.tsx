import { motion } from "framer-motion";

import type { TeamMember } from "@/types/team";

type PortraitPlaceholderProps = {
  member: TeamMember;
  reducedMotion: boolean;
};

const transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function PortraitPlaceholder({
  member,
  reducedMotion,
}: PortraitPlaceholderProps) {
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#090b12]/88 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_44%)]" />
      <div className="absolute inset-4 rounded-[28px] border border-white/6" />

      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,rgba(8,10,18,0.98),rgba(5,6,11,0.9))]">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `radial-gradient(circle at 50% 18%, ${member.theme.glow} 0%, transparent 40%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 28%)`,
          }}
        />

        <motion.div
          className="rune-ring absolute inset-8 rounded-full border"
          style={{
            borderColor: member.theme.accentSoft,
          }}
          animate={
            reducedMotion
              ? { opacity: [0.28, 0.4, 0.28] }
              : { scale: [0.96, 1.02, 0.96] }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="rune-ring-reverse absolute inset-14 rounded-full border border-dashed"
          style={{
            borderColor: member.theme.secondarySoft,
          }}
          animate={
            reducedMotion
              ? { opacity: [0.16, 0.28, 0.16] }
              : { scale: [1, 1.04, 1] }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-x-10 top-10 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.35em] text-white/45">
          <span>{member.portraitPlaceholder.designation}</span>
          <span>{member.rank}</span>
        </div>

        <div className="absolute inset-x-10 bottom-10 flex items-end justify-between text-[0.7rem] uppercase tracking-[0.32em] text-white/40">
          <span>Retrato temporal</span>
          <span>{member.name}</span>
        </div>

        <motion.div
          className="absolute left-1/2 top-[54%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            background: member.theme.glow,
          }}
          animate={
            reducedMotion
              ? { opacity: [0.26, 0.38, 0.26] }
              : { scale: [0.9, 1.08, 0.94], opacity: [0.28, 0.44, 0.28] }
          }
          transition={{
            duration: 6.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-x-16 top-[18%] bottom-[18%] rounded-[999px] border border-white/5" />

        <div
          className="absolute left-1/2 top-1/2 h-[68%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-[999px]"
          style={{
            background: `linear-gradient(180deg, ${member.theme.accentSoft} 0%, rgba(255,255,255,0.03) 28%, rgba(3,4,8,0.82) 100%)`,
            boxShadow: `0 0 0 1px ${member.theme.accentSoft}`,
          }}
        />

        <div className="absolute left-1/2 top-[44%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm" />
        <div className="absolute left-1/2 top-[62%] h-48 w-36 -translate-x-1/2 -translate-y-1/2 rounded-t-[999px] rounded-b-[28px] border border-white/10 bg-black/20 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={transition}
          className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center"
        >
          <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.7rem] uppercase tracking-[0.4em] text-white/60">
            Avatar conceptual
          </span>

          <span
            className="font-[family:var(--font-display)] text-[clamp(4.75rem,9vw,8rem)] leading-none tracking-[0.28em] text-white"
            style={{
              textShadow: `0 0 32px ${member.theme.glow}`,
            }}
          >
            {member.portraitPlaceholder.monogram}
          </span>

          <div className="h-px w-36 bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          <p className="max-w-xs text-sm uppercase tracking-[0.38em] text-slate-300/72">
            {member.title}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
