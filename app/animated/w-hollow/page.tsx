import type { Metadata } from "next";
import { Hollow } from "@/components/animated-sites/model/sites/Hollow";
export const metadata: Metadata = { title: "Hollow — Walk into the glow.", description: "Hollow: an illustrated world you move through — thicket → grove → spirit → dawnwood." };
export default function Page() { return <Hollow />; }
