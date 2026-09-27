import type { Metadata } from "next";
import { Emberfall } from "@/components/animated-sites/model/sites/Emberfall";
export const metadata: Metadata = { title: "Emberfall — Where the valley learns to burn.", description: "Emberfall: an illustrated world you move through — ridge → river → orchard → harvest." };
export default function Page() { return <Emberfall />; }
