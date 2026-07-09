import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = "https://cachicamo.studio";

function withAlternates(path: string) {
  return {
    es: `${BASE_URL}${path}`,
    en: `${BASE_URL}/en${path}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticDefs: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/blog", priority: 0.9 },
    { path: "/ia", priority: 0.7 },
    { path: "/web", priority: 0.7 },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticDefs.map(({ path, priority }) => ({
    url: `${BASE_URL}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "/ia" || path === "/web" ? "monthly" : "weekly",
    priority,
    alternates: { languages: withAlternates(path) },
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: { languages: withAlternates(`/blog/${post.slug}`) },
  }));

  return [...staticRoutes, ...postRoutes];
}
