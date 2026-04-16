"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import type { ReactNode } from "react";

export default function Providers({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return <LanguageProvider>{children}</LanguageProvider>;
}
