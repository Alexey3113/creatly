import type { Metadata } from "next";
import { Bloomhouse } from "@/components/animated-sites/model/sites/Bloomhouse";
export const metadata: Metadata = { title: "Bloomhouse — Step into the light.", description: "Bloomhouse: an illustrated world you move through — entry → orchids → lilypond → dome." };
export default function Page() { return <Bloomhouse />; }
