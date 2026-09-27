import type { Metadata } from "next";
import { Fjord } from "@/components/animated-sites/model/sites/Fjord";
export const metadata: Metadata = { title: "Fjordro — Go quiet between the walls.", description: "Fjord: an illustrated world you move through — cliffs → boat → waterfall → village." };
export default function Page() { return <Fjord />; }
