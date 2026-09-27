import type { Metadata } from "next";
import { StageLab } from "@/components/story-sites/stage";

export const metadata: Metadata = {
  title: "Story v2 — кино-истории · Creatly",
  description: "Кинематографичные стори-сайты: один жест перелистывает сцену с zoom/wipe/smash.",
};

export default async function Story2Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  return <StageLab initialSlug={slug?.[0]} />;
}
