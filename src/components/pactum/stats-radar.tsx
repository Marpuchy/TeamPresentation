"use client";

import { motion } from "framer-motion";

import type { TeamMember } from "@/types/team";

type StatsRadarProps = {
  member: TeamMember;
};

const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = 112;

function getPoint(index: number, ratio: number, total: number) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / total;

  return {
    x: CENTER + Math.cos(angle) * RADIUS * ratio,
    y: CENTER + Math.sin(angle) * RADIUS * ratio,
  };
}

function buildPoints(values: number[]) {
  return values
    .map((value, index) => {
      const point = getPoint(index, value / 100, values.length);
      return `${point.x},${point.y}`;
    })
    .join(" ");
}

function buildGrid(total: number, ratio: number) {
  return Array.from({ length: total }, (_, index) => {
    const point = getPoint(index, ratio, total);
    return `${point.x},${point.y}`;
  }).join(" ");
}

export function StatsRadar({ member }: StatsRadarProps) {
  const values = member.stats.map((stat) => stat.value);
  const points = buildPoints(values);

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#070912]/90 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_64%)]" />

      <motion.svg
        key={member.id}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="relative mx-auto h-[320px] w-full max-w-[360px]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
      >
        {[1, 0.8, 0.6, 0.4, 0.2].map((ratio) => (
          <polygon
            key={ratio}
            points={buildGrid(member.stats.length, ratio)}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1.2"
          />
        ))}

        {member.stats.map((stat, index) => {
          const point = getPoint(index, 1, member.stats.length);
          const labelPoint = getPoint(index, 1.17, member.stats.length);

          return (
            <g key={stat.label}>
              <line
                x1={CENTER}
                y1={CENTER}
                x2={point.x}
                y2={point.y}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1"
              />
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                fill="rgba(226,232,240,0.6)"
                fontSize="9"
                letterSpacing="2.6"
              >
                {String(index + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}

        <motion.polygon
          points={points}
          fill={member.theme.accentSoft}
          stroke={member.theme.accent}
          strokeWidth="2.8"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />

        {member.stats.map((stat, index) => {
          const point = getPoint(index, stat.value / 100, member.stats.length);

          return (
            <circle
              key={`${stat.label}-node`}
              cx={point.x}
              cy={point.y}
              r="5.5"
              fill={member.theme.secondary}
              stroke="rgba(255,255,255,0.72)"
              strokeWidth="1.3"
            />
          );
        })}

        <circle
          cx={CENTER}
          cy={CENTER}
          r="42"
          fill="rgba(8,10,18,0.9)"
          stroke="rgba(255,255,255,0.1)"
        />
        <text
          x={CENTER}
          y={CENTER - 4}
          textAnchor="middle"
          fill="rgba(248,250,252,0.9)"
          fontSize="12"
          letterSpacing="4"
        >
          PERFIL
        </text>
        <text
          x={CENTER}
          y={CENTER + 16}
          textAnchor="middle"
          fill={member.theme.secondary}
          fontSize="12"
          letterSpacing="4"
        >
          ACTIVO
        </text>
      </motion.svg>
    </div>
  );
}
