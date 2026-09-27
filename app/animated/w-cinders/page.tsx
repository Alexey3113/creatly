import type { Metadata } from "next";
import { Cinders } from "@/components/animated-sites/model/sites/Cinders";
export const metadata: Metadata = { title: "Hraun — Walk the line between fire and ice.", description: "Cinders: an illustrated world you move through — blacksand → geyser → lava → glacier." };
export default function Page() { return <Cinders />; }
