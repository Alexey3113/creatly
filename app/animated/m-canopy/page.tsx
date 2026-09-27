import type { Metadata } from "next";
import { Canopy } from "@/components/animated-sites/model/Canopy";
export const metadata: Metadata = { title: "Canopy — Walk into the quiet.", description: "Canopy: an illustrated world you move through — ridge → falls → pass → meadow." };
export default function Page() { return <Canopy />; }
