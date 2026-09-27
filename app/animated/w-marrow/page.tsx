import type { Metadata } from "next";
import { Marrow } from "@/components/animated-sites/model/sites/Marrow";
export const metadata: Metadata = { title: "Marrow — Bring the only warm light.", description: "Marrow: an illustrated world you move through — mouth → crystal → river → cathedral." };
export default function Page() { return <Marrow />; }
