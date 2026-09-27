import type { Metadata } from "next";
import { pageMeta } from "@/components/shared/page-titles";
import VisualHooksLab from "@/components/visual-hooks/VisualHooksLab";
import "@/components/visual-hooks/visual-hooks.css";
// посайтовые правки волны раскатки — ПОСЛЕ базового css (при равной специфичности побеждают они)
import "@/components/visual-hooks/biz-prosite.css";
import "@/components/visual-hooks/biz-bespoke.css";
import "@/components/visual-hooks/hooks-stories.css";
import "@/components/visual-hooks/hooks-scenes.css";
import { FontLinks } from "@/components/shared/FontLinks";
import { FONT_HREFS } from "@/components/visual-hooks/fonts";

// title/description — свои у каждого сайта (бренд + обещание из самого сайта, scripts/gen-page-titles.ts)
export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  return pageMeta("hooks", slug?.[0]);
}

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

