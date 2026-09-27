import type { Metadata } from "next";
import { Halcyon } from "@/components/animated-sites/model/sites/Halcyon";
export const metadata: Metadata = { title: "Petalfare — Follow the petals down.", description: "Halcyon: an illustrated world you move through — avenue → river → lawn → riverside." };
export default function Page() { return <Halcyon />; }
