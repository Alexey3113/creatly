import type { Metadata } from "next";
import { StoryLab } from "@/components/story-sites";

export const metadata: Metadata = {
  title: "Story Sites — Creatly",
  description: "Сторителлинг-сайты: один скролл перелистывает журнал историй.",
};

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return <StoryLab initialSlug={slug?.[0]} />;
}
