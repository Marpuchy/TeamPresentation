export type TeamAvatarVariant = "crown" | "forge" | "blade" | "veil";

export type TeamTheme = {
  accent: string;
  accentSoft: string;
  secondary: string;
  secondarySoft: string;
  surface: string;
  surfaceAlt: string;
  line: string;
};

export type TeamAvatar = {
  variant: TeamAvatarVariant;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  title: string;
  description: string;
  signatureAbility: string;
  signatureDetail: string;
  github: string;
  email: string;
  theme: TeamTheme;
  avatar: TeamAvatar;
};
