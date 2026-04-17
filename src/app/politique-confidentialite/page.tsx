import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Ricoune",
  description: "Politique de confidentialité du site officiel Ricoune.",
};

export default function PolitiqueConfidentialitePage(): React.ReactElement {
  return <PrivacyContent />;
}
