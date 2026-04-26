import type { MetadataRoute } from "next";

const BASE = "https://brightspeaker.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/for-educators", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/for-schools", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/blog/reduce-filler-words-k12", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog/five-minute-elementary-speaking-warmup", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/resources", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/resources/sl-k-5-speaking-checklist", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
