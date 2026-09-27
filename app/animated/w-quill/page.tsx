import type { Metadata } from "next";
import { Quill } from "@/components/animated-sites/model/sites/Quill";
export const metadata: Metadata = { title: "Quill — Think in full sentences again.", description: "Quill: an illustrated world you move through — avenue → library → nook → courtyard." };
export default function Page() { return <Quill />; }
