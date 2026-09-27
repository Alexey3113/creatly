import type { Metadata } from "next";
import { pageMeta } from "@/components/shared/page-titles";
import { AnimatedLab } from "@/components/animated-sites";
import { FontLinks } from "@/components/shared/FontLinks";
import { FONT_HREFS } from "@/components/animated-sites/fonts";

// title/description — свои у каждого сайта (бренд + обещание из самого сайта, scripts/gen-page-titles.ts)
export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  return pageMeta("animated", slug?.[0]);
}

export default async function AnimatedPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  return (
    <>
      <FontLinks hrefs={FONT_HREFS} />
      <AnimatedLab initialSlug={slug?.[0]} />
    </>
  );
}
