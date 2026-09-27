import type { Metadata } from "next";
import { Emberroad } from "@/components/animated-sites/model/sites/Emberroad";
export const metadata: Metadata = { title: "Amberline — Walk until the heat breaks.", description: "Ember Road: an illustrated world you move through — dunes → oasis → storm → camp." };
export default function Page() { return <Emberroad />; }
