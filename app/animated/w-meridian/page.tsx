import type { Metadata } from "next";
import { Meridian } from "@/components/animated-sites/model/sites/Meridian";
export const metadata: Metadata = { title: "Meridian — Meet the city before neon wins.", description: "Meridian: an illustrated world you move through — rooftops → alley → rain → dawncity." };
export default function Page() { return <Meridian />; }
