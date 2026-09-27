import type { Metadata } from "next";
import { Cocoa } from "@/components/animated-sites/model/sites/Cocoa";
export const metadata: Metadata = { title: "Arara — Climb into the green cathedral.", description: "Cocoa: an illustrated world you move through — canopy → river → macaws → emergence." };
export default function Page() { return <Cocoa />; }
