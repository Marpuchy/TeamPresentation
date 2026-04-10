import { motion } from "framer-motion";

import type { TeamMember } from "@/types/team";

type StatsRadarProps = {
  member: TeamMember;
};

const SIZE = 260;
const CENTER = SIZE / 2;
const RADIUS = 88;

function getPoint(index: number, ratio: number, total: number) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / total;

  return {
    x: CENTER + Math.cos(angle) * RADIUS * ratio,
    y: CENTER + Math.sin(angle) * RADIUS * ratio,
  };
}

function getPolygonPoints(values: number[]) {
  return values
    .map((value, index) => {
      const point = getPoint(index, value / 100, values.length);
      return `${point.x},${point.y}`;
    })
    .join(" ");
}

function getGridPoints(total: number, ratio: number) {
  return Array.from({ length: total }, (_, index) => {
    const point = getPoint(index, ratio, total);
    return `${point.x},${point.y}`;
  }).join(" ");
}

export function StatsRadar({ member }: StatsRadarProps) {
  const values = member.stats.map((stat) => stat.value);
  const polygonPoints = getPolygonPoints(values);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/8 bg-white/[0.03] p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_64%)]" />

      <motion.svg
        key={member.id}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto h-[260px] w-full max-w-[320px]"
      >
        {[1, 0.75, 0.5, 0.25].map((ratio) => (
          <polygon
            key={ratio}
            points={getGridPoints(member.stats.length, ratio)}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}

        {member.stats.map((stat, index) => {
          const point = getPoint(index, 1, member.stats.length);

          return (
            <line
              key={`${stat.label}-axis`}
              x1={CENTER}
              y1={CENTER}
              x2={point.x}
              y2={point.y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          );
        })}

        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        >
          <polygon
            points={polygonPoints}
            fill={member.theme.accentSoft}
            stroke={member.theme.accent}
            strokeWidth="2.6"
          />

          {member.stats.map((stat, index) => {
            const point = getPoint(index, stat.value / 100, member.stats.length);

            return (
              <circle
                key={stat.label}
                cx={point.x}
                cy={point.y}
                r="5"
                fill={member.theme.secondary}
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="1.2"
              />
            );
          })}
        </motion.g>

        <circle
          cx={CENTER}
          cy={CENTER}
          r="30"
          fill="rgba(8, 10, 18, 0.88)"
          stroke="rgba(255,255,255,0.1)"
        />

        <text
          x={CENTER}
          y={CENTER - 2}
          textAnchor="middle"
          fill="rgba(248,250,252,0.88)"
          fontSize="12"
          letterSpacing="3.8"
        >
          PERFIL
        </text>
        <text
          x={CENTER}
          y={CENTER + 16}
          textAnchor="middle"
          fill="rgba(248,250,252,0.66)"
          fontSize="10"
          letterSpacing="4"
        >
          ACTIVO
        </text>
      </motion.svg>
    </div>
  );
}
