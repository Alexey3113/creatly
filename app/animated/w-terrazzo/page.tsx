import type { Metadata } from "next";
import { Terrazzo } from "@/components/animated-sites/model/sites/Terrazzo";
export const metadata: Metadata = { title: "Meltemi — Whitewash above. Turquoise below.", description: "Terrazzo: an illustrated world you move through — village → domes → steps → harbor." };
export default function Page() { return <Terrazzo />; }
