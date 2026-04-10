export type TeamStat = {
  label: string;
  value: number;
};

export type TeamAvatarVariant = "crown" | "forge" | "blade" | "veil";

export type TeamTheme = {
  accent: string;
  accentSoft: string;
  secondary: string;
  secondarySoft: string;
  glow: string;
};

export type TeamAvatar = {
  variant: TeamAvatarVariant;
  codename: string;
  sigil: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  title: string;
  subtitle: string;
  description: string;
  signatureAbility: string;
  signatureDetail: string;
  rank: string;
  lore: string;
  focusAreas: string[];
  tools: string[];
  github: string;
  email: string;
  accentColor: string;
  theme: TeamTheme;
  avatar: TeamAvatar;
  stats: TeamStat[];
};
