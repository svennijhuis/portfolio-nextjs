import { getAllPosts } from "@/lib/blog";
import { MetadataRoute } from "next";

const BASE_URL = "https://svennijhuis.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/blog`, lastModified: new Date() },
    ...posts.map(post => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
