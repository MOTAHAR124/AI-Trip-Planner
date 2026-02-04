import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/seo";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{ path: string; changeFrequency: "daily" | "weekly" | "monthly"; priority: number }> =
    [
      { path: "/", changeFrequency: "weekly", priority: 1 },
      { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
      { path: "/privacy", changeFrequency: "monthly", priority: 0.3 },
      { path: "/terms", changeFrequency: "monthly", priority: 0.3 },
    ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
