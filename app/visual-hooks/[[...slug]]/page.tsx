import type { Metadata } from "next";
import VisualHooksLab from "@/components/visual-hooks/VisualHooksLab";
import "@/components/visual-hooks/visual-hooks.css";
import { FontLinks } from "@/components/shared/FontLinks";
import { FONT_HREFS } from "@/components/visual-hooks/fonts";

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
  return (
    <>
      <FontLinks hrefs={FONT_HREFS} />
      <VisualHooksLab initialSlug={slug?.[0]} />
    </>
  );
}

