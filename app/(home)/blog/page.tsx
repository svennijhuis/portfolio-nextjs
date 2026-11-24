import { openGraphImage } from "@/app/shared-metadata";
import CardBlog from "@/components/sections-home/blog/card-blog";
import Contact from "@/components/sections-home/contact/contact";
import H1 from "@/components/text/H1";
import Paragraph from "@/components/text/paragraph";
import TitleSmall from "@/components/text/title-small";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

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
    <>
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

          <div className="mt-5 grid grid-cols-1 gap-5 md:mt-8 md:grid-cols-2">
            {posts.map((post, index) => (
              <CardBlog
                key={post.slug}
                post={post}
                number={index + 1}
              />
            ))}
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}
