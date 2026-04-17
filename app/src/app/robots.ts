import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/speak", "/history"],
      },
    ],
    sitemap: "https://brightspeaker.com/sitemap.xml",
    host: "https://brightspeaker.com",
  };
}
