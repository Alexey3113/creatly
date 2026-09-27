import type { Metadata } from "next";
import { Voyage } from "@/components/animated-sites/model/sites/Voyage";
export const metadata: Metadata = { title: "Cloudwright — Cross an ocean with no shore.", description: "Voyage: an illustrated world you move through — cloudsea → isles → storm → harbor." };
export default function Page() { return <Voyage />; }
