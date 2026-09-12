import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://mazajrituals.shop";
  const paths = ["", "/collections", "/about", "/contact", "/privacy", "/terms", "/faq", ...PRODUCTS.map((p) => `/products/${p.slug}`)];
  return paths.map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly", priority: path === "" ? 1 : 0.7 }));
}
