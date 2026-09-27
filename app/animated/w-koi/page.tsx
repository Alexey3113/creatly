import type { Metadata } from "next";
import { Koi } from "@/components/animated-sites/model/sites/Koi";
export const metadata: Metadata = { title: "Koian — Four gates, one long exhale.", description: "Koi: an illustrated world you move through — torii → pond → bridge → teahouse." };
export default function Page() { return <Koi />; }
