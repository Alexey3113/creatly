import type { Metadata } from "next";
import { pageMeta } from "@/components/shared/page-titles";
import { StoryLab } from "@/components/story-sites";
import { FontLinks } from "@/components/shared/FontLinks";
import { FONT_HREFS } from "@/components/story-sites/fonts";

// title/description — свои у каждого сайта (бренд + обещание из самого сайта, scripts/gen-page-titles.ts)
export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  return pageMeta("story", slug?.[0]);
}

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
