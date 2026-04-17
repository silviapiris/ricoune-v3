import type { Metadata } from "next";
import MentionsLegalesContent from "./MentionsLegalesContent";

export const metadata: Metadata = {
  title: "Mentions légales — Ricoune",
  description: "Mentions légales du site officiel Ricoune.",
};

export default function MentionsLegalesPage(): React.ReactElement {
  return <MentionsLegalesContent />;
}
