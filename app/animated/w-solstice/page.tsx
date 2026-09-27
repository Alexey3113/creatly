import type { Metadata } from "next";
import { Solstice } from "@/components/animated-sites/model/sites/Solstice";
export const metadata: Metadata = { title: "Glød — Come home to the fire.", description: "Solstice: an illustrated world you move through — snowforest → lake → hearth → whiteout." };
export default function Page() { return <Solstice />; }
