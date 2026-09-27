import type { Metadata } from "next";
import { Bazaar } from "@/components/animated-sites/model/sites/Bazaar";
export const metadata: Metadata = { title: "Lantern road — Follow the lanterns in.", description: "Bazaar: an illustrated world you move through — gate → spice → square → edge." };
export default function Page() { return <Bazaar />; }
