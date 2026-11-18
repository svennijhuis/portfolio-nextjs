---
title: "Hello world: how this blog works"
description: "A tiny Markdown-powered blog inside my Next.js portfolio. No CMS, no database, just files."
date: "2026-11-18"
cover: "/blog/hello-world/cover.png"
# Link to the original post on X. Remove this line if the post was never on X.
xUrl: "https://x.com/"
tags: ["nextjs", "markdown"]
---

I post a lot of my thoughts on X, but I also want them to live on my own website.
So I built the simplest blog I could think of: **one Markdown file per post**.

## How a post is made

Every post is a file in `content/blog/`. The file name becomes the URL, so
`hello-world.md` lives at `/blog/hello-world`. At the top of the file there is
a small block with the details:

```yaml
---
title: "Hello world: how this blog works"
description: "Short summary for the cards and SEO"
date: "2026-11-18"
cover: "/blog/hello-world/cover.png"
xUrl: "https://x.com/..."
tags: ["nextjs", "markdown"]
---
```

Images go in `public/blog/<slug>/` and you use them like normal Markdown:

```md
![A diagram](/blog/hello-world/diagram.png)
```

## What happens on build

- `lib/blog.ts` reads all files, sorts them newest first and works out the reading time.
- The landing page shows the **4 newest** posts, with a _See more_ button once there are more.
- Every post is rendered at build time with syntax highlighting.

```ts
export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
```

> Write it once on X, keep it forever on your own site.

That's it. Copy, paste, push.
