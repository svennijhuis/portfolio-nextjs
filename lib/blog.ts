import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover?: string;
  xUrl?: string;
  tags: string[];
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
}

const WORDS_PER_MINUTE = 200;

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    // gray-matter parses unquoted YAML dates into Date objects.
    date:
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date ?? ""),
    cover: data.cover,
    xUrl: data.xUrl,
    tags: data.tags ?? [],
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    content,
  };
}

/** All posts, newest first. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter(file => file.endsWith(".md"))
    .map(file => {
      const { content, ...meta } = readPostFile(file);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const fileName = `${slug}.md`;
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  if (!fs.existsSync(path.join(BLOG_DIR, fileName))) return null;
  return readPostFile(fileName);
}

/** 2026-11-18 -> 18.11.2026 */
export function formatDate(date: string): string {
  const [y, m, d] = date.split("-");
  return y && m && d ? `${d}.${m}.${y}` : date;
}
