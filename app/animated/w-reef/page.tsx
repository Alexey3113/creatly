import type { Metadata } from "next";
import { Reef } from "@/components/animated-sites/model/sites/Reef";
export const metadata: Metadata = { title: "Craterline — Walk the whole island, once.", description: "Reef: an illustrated world you move through — beach → jungle → lagoon → ridge." };
export default function Page() { return <Reef />; }
