export type TeamStat = {
  label: string;
  value: number;
};

export type TeamTheme = {
  accent: string;
  accentSoft: string;
  secondary: string;
  secondarySoft: string;
  glow: string;
};

export type TeamPortraitPlaceholder = {
  imageSrc: string | null;
  monogram: string;
  designation: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  title: string;
  description: string;
  signatureAbility: string;
  abilityDetail: string;
  rank: string;
  specialization: string;
  lore: string;
  quote: string;
  accentColor: string;
  theme: TeamTheme;
  portraitPlaceholder: TeamPortraitPlaceholder;
  stats: TeamStat[];
};
