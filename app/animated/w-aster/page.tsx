import type { Metadata } from "next";
import { Aster } from "@/components/animated-sites/model/sites/Aster";
export const metadata: Metadata = { title: "Apogee — Come this close to the stars.", description: "Aster: an illustrated world you move through — hilltop → telescope → milkyway → meteor." };
export default function Page() { return <Aster />; }
