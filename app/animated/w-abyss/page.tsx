import type { Metadata } from "next";
import { Abyss } from "@/components/animated-sites/model/sites/Abyss";
export const metadata: Metadata = { title: "Rubrica — It glows because something remembers.", description: "Abyss: an illustrated world you move through — forecourt → colonnade → idol → brinepool." };
export default function Page() { return <Abyss />; }
