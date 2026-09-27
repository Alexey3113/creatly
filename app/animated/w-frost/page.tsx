import type { Metadata } from "next";
import { Frost } from "@/components/animated-sites/model/sites/Frost";
export const metadata: Metadata = { title: "Farline — Empty is the whole point.", description: "Frost: an illustrated world you move through — plain → cave → aurora → seaice." };
export default function Page() { return <Frost />; }
