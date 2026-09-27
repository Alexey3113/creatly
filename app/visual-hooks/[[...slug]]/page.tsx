import type { Metadata } from "next";
import VisualHooksLab from "@/components/visual-hooks/VisualHooksLab";
import "@/components/visual-hooks/visual-hooks.css";

export const metadata: Metadata = {
  title: "Visual Hooks Lab",
  description: "Bespoke first-screen concepts by Creatly — motion, cutouts and type.",
};

export default async function VisualHooksPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return <VisualHooksLab initialSlug={slug?.[0]} />;
}

