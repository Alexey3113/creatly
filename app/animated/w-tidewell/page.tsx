import type { Metadata } from "next";
import { Tidewell } from "@/components/animated-sites/model/sites/Tidewell";
export const metadata: Metadata = { title: "Tidewell — Go down to the quiet.", description: "Tidewell: an illustrated world you move through — cliff → pools → dive → surface." };
export default function Page() { return <Tidewell />; }
