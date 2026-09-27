import type { Metadata } from "next";
import { Willow } from "@/components/animated-sites/model/sites/Willow";
export const metadata: Metadata = { title: "Moss & Lantern — Slow down to bayou time.", description: "Willow: an illustrated world you move through — cypress → channel → fireflies → delta." };
export default function Page() { return <Willow />; }
