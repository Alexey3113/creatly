import type { Metadata } from "next";
import { StoryLab } from "@/components/story-sites";
import { FontLinks } from "@/components/shared/FontLinks";
import { FONT_HREFS } from "@/components/story-sites/fonts";

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
  return (
    <>
      <FontLinks hrefs={FONT_HREFS} />
      <StoryLab initialSlug={slug?.[0]} />
    </>
  );
}
