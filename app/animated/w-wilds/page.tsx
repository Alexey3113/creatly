import type { Metadata } from "next";
import { Wilds } from "@/components/animated-sites/model/sites/Wilds";
export const metadata: Metadata = { title: "Veldlight — Chase the light, not the checklist.", description: "Wilds: an illustrated world you move through — acacia → waterhole → migration → baobab." };
export default function Page() { return <Wilds />; }
