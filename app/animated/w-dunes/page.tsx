import type { Metadata } from "next";
import { Dunes } from "@/components/animated-sites/model/sites/Dunes";
export const metadata: Metadata = { title: "Sossus — Stand where the light splits in two.", description: "Dunes: an illustrated world you move through — ridgeline → tree → crest → sunset." };
export default function Page() { return <Dunes />; }
