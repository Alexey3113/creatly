import type { Metadata } from "next";
import { Pilgrim } from "@/components/animated-sites/model/sites/Pilgrim";
export const metadata: Metadata = { title: "Lungta — Some prayers you have to climb.", description: "Pilgrim: an illustrated world you move through — valley → bridge → monastery → summit." };
export default function Page() { return <Pilgrim />; }
