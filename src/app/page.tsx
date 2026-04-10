import { TeamShowcase } from "@/components/pactum/team-showcase";
import { teamMembers } from "@/data/team";

export default function Home() {
  return <TeamShowcase members={teamMembers} />;
}
