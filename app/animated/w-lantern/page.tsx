import type { Metadata } from "next";
import { Lantern } from "@/components/animated-sites/model/sites/Lantern";
export const metadata: Metadata = { title: "Redthread — A red thread through the mist.", description: "Lantern: an illustrated world you move through — terraces → gate → festival → shrine." };
export default function Page() { return <Lantern />; }
