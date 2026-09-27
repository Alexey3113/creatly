import type { Metadata } from "next";
import { Lumen } from "@/components/animated-sites/model/sites/Lumen";
export const metadata: Metadata = { title: "Farlight — Hold the last light.", description: "Lumen: an illustrated world you move through — cape → cove → beam → dawn." };
export default function Page() { return <Lumen />; }
