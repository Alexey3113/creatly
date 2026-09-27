import type { Metadata } from "next";
import { Nomad } from "@/components/animated-sites/model/sites/Nomad";
export const metadata: Metadata = { title: "Windmane — Some horizons you have to earn.", description: "Nomad: an illustrated world you move through — grassland → herd → camp → pass." };
export default function Page() { return <Nomad />; }
