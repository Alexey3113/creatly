import type { Metadata } from "next";
import { Highland } from "@/components/animated-sites/model/sites/Highland";
export const metadata: Metadata = { title: "Drystane — Walk until the sky changes its mind.", description: "Highland: an illustrated world you move through — moor → loch → ruin → storm." };
export default function Page() { return <Highland />; }
