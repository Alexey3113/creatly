import type { Metadata } from "next";
import { AnimatedLab } from "@/components/animated-sites";
import { FontLinks } from "@/components/shared/FontLinks";
import { FONT_HREFS } from "@/components/animated-sites/fonts";

export const metadata: Metadata = {
  title: "Animated — how did they do this · Creatly",
  description: "30 кино-анимированных сайтов на движке ScrollStage: scroll-scrub, video-scrub, шейдеры и частицы. Один доминирующий приём на экран.",
};

export default async function AnimatedPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  return (
    <>
      <FontLinks hrefs={FONT_HREFS} />
      <AnimatedLab initialSlug={slug?.[0]} />
    </>
  );
}
