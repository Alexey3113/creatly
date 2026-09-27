import type { Metadata } from "next";
import { pageMeta } from "@/components/shared/page-titles";
import { StageLab } from "@/components/story-sites/stage";

// title/description — свои у каждого сайта (бренд + обещание из самого сайта, scripts/gen-page-titles.ts)
export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  return pageMeta("story2", slug?.[0]);
}

export default async function Story2Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  return <StageLab initialSlug={slug?.[0]} />;
}
