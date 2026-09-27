import type { Metadata } from "next";
import { Serein } from "@/components/animated-sites/model/sites/Serein";
export const metadata: Metadata = { title: "Sentier — Follow the wall to the table.", description: "Serein: an illustrated world you move through — fields → village → cellar → terrace." };
export default function Page() { return <Serein />; }
