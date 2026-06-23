import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/editor", "/dashboard"] },
    ],
    sitemap: "https://creatly.ru/sitemap.xml",
  };
}
