import { motion } from "framer-motion";

import type { TeamMember } from "@/types/team";

type BackgroundEffectsProps = {
  member: TeamMember;
  reducedMotion: boolean;
};

const particles = [
  { left: "8%", top: "14%", size: 8, delay: 0 },
  { left: "18%", top: "68%", size: 10, delay: 1.4 },
  { left: "32%", top: "28%", size: 6, delay: 2.1 },
  { left: "48%", top: "10%", size: 12, delay: 0.8 },
  { left: "56%", top: "74%", size: 7, delay: 2.9 },
  { left: "70%", top: "34%", size: 9, delay: 1.9 },
  { left: "84%", top: "18%", size: 6, delay: 0.6 },
  { left: "90%", top: "62%", size: 10, delay: 2.4 },
];

export function BackgroundEffects({
  member,
  reducedMotion,
}: BackgroundEffectsProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="ambient-grid absolute inset-0 opacity-40" />
      <div className="ambient-noise absolute inset-0 opacity-30" />

      <motion.div
        className="absolute left-[-8%] top-[-18%] h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${member.theme.glow} 0%, transparent 72%)`,
        }}
        animate={
          reducedMotion
            ? { opacity: [0.45, 0.55, 0.45] }
            : {
                x: [0, 48, 0],
                y: [0, 32, 0],
                scale: [0.95, 1.08, 0.98],
                opacity: [0.42, 0.72, 0.42],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[-14%] right-[-4%] h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${member.theme.secondarySoft} 0%, transparent 74%)`,
        }}
        animate={
          reducedMotion
            ? { opacity: [0.38, 0.52, 0.38] }
            : {
                x: [0, -36, 0],
                y: [0, -20, 0],
                scale: [1, 1.06, 0.98],
                opacity: [0.28, 0.54, 0.28],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6 opacity-40"
        style={{
          boxShadow: `0 0 140px ${member.theme.glow}`,
        }}
        animate={
          reducedMotion
            ? { opacity: [0.18, 0.28, 0.18] }
            : { rotate: [0, 360], scale: [0.96, 1.02, 0.98] }
        }
        transition={{
          duration: 46,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/8 opacity-30"
        animate={
          reducedMotion ? { opacity: [0.14, 0.22, 0.14] } : { rotate: [360, 0] }
        }
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div
        className="fog-cloud absolute left-[12%] top-[18%] h-56 w-56 rounded-full opacity-70"
        style={{
          background: `radial-gradient(circle, ${member.theme.accentSoft} 0%, transparent 72%)`,
        }}
      />

      <div
        className="fog-cloud absolute bottom-[20%] right-[22%] h-60 w-60 rounded-full opacity-60"
        style={{
          background: `radial-gradient(circle, ${member.theme.secondarySoft} 0%, transparent 72%)`,
          animationDelay: "4s",
        }}
      />

      <div className="absolute inset-x-[12%] top-[18%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-x-[16%] bottom-[22%] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      {particles.map((particle, index) => (
        <motion.span
          key={`${member.id}-${particle.left}-${particle.top}`}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            background:
              index % 2 === 0 ? member.theme.accent : member.theme.secondary,
            boxShadow: `0 0 18px ${
              index % 2 === 0 ? member.theme.glow : member.theme.secondarySoft
            }`,
          }}
          animate={
            reducedMotion
              ? { opacity: [0.18, 0.4, 0.18] }
              : {
                  y: [0, -18, 0],
                  opacity: [0.12, 0.52, 0.12],
                  scale: [0.9, 1.15, 0.92],
                }
          }
          transition={{
            duration: 4.8 + index * 0.7,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,6,11,0.24)_58%,rgba(5,6,11,0.82)_100%)]" />
    </div>
  );
}
