import { openGraphImage } from "@/app/shared-metadata";
import H1 from "@/components/text/H1";
import Paragraph from "@/components/text/paragraph";
import TitleSmall from "@/components/text/title-small";
import { formatDate, getAllPosts } from "@/lib/blog";
import ArrowIcon from "@/public/icons/arrow-icon";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on web development, tooling and the things I build.",
  openGraph: {
    ...openGraphImage,
    title: "Blog | Sven Nijhuis",
    description: "Notes on web development, tooling and the things I build.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="pt-10 pb-8 md:pt-[160px] md:pb-12">
      <div className="container">
        <TitleSmall className="mb-2">Blog</TitleSmall>
        <H1>
          All <span className="text-grayDark">posts</span>
        </H1>
        <Paragraph
          className="mt-2 max-w-[520px] md:mt-3"
          size="md"
          color="black"
          fontWeight="light"
        >
          {posts.length} {posts.length === 1 ? "post" : "posts"} on web
          development, tooling and the things I build.
        </Paragraph>

        <ul className="mt-5 flex flex-col gap-1.5 md:mt-8">
          {posts.map(post => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group bg-gray grid grid-cols-1 items-center gap-[6px] rounded-2xl border-[1px] border-black/20 p-[15px] transition-all duration-500 ease-in-out hover:border-black/40 md:grid-cols-[140px_1fr_auto] md:gap-3 md:p-2"
              >
                <span className="text-13 text-grayDark md:text-14 font-light">
                  {formatDate(post.date)}
                </span>
                <div>
                  <h2 className="text-20 md:text-24 leading-26 font-medium text-black md:leading-30">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="text-14 mt-[4px] leading-22 font-light text-black">
                      {post.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-13 text-grayDark font-light whitespace-nowrap">
                    {post.readingTime} min read
                  </span>
                  <span className="group-hover:bg-orange flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-black p-[8px] transition-all duration-500 group-hover:-rotate-45">
                    <span className="flex w-full invert [&_svg]:h-auto [&_svg]:w-full">
                      <ArrowIcon />
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
