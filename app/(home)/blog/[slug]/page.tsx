import LinkStyling from "@/components/buttons/link-styling";
import Contact from "@/components/sections-home/contact/contact";
import H1 from "@/components/text/H1";
import TitleSmall from "@/components/text/title-small";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownAsync } from "react-markdown";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(post.cover && { images: [post.cover] }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="pt-10 pb-8 md:pt-[160px] md:pb-12">
        <div className="container">
          <TitleSmall className="mb-2">
            {formatDate(post.date)} · {post.readingTime} min read
          </TitleSmall>
          <H1 className="text-33 sm:text-45 md:text-70 max-w-[1100px] leading-40 sm:leading-50 md:leading-75">
            {post.title}
          </H1>
          {post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-12 flex rounded-3xl border-[1px] border-black px-1 py-[2px] font-normal text-black"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mx-auto mt-4 max-w-[720px] md:mt-6">
            {post.cover && (
              <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="blog-prose prose max-w-none">
              <MarkdownAsync
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                  [
                    rehypePrettyCode,
                    { theme: "github-dark-default", keepBackground: false },
                  ],
                ]}
              >
                {post.content}
              </MarkdownAsync>
            </div>

            {post.xUrl && (
              <div className="mt-5 flex flex-col gap-2 border-t-[1px] border-black/20 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-black">
                    <XLogo />
                  </span>
                  <p className="text-16 md:text-18 leading-22 font-light text-black">
                    This post was originally posted on{" "}
                    <Link
                      href={post.xUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange font-medium underline underline-offset-4"
                    >
                      X
                    </Link>
                    .
                  </p>
                </div>
                <LinkStyling
                  href={post.xUrl}
                  target="_blank"
                  color="black"
                  icon="arrow"
                  iconHover="eye"
                >
                  View on X
                </LinkStyling>
              </div>
            )}

            <Link
              href="/blog"
              className="text-14 mt-4 inline-block font-light text-black underline-offset-4 hover:underline"
            >
              ← All posts
            </Link>
          </div>
        </div>
      </article>
      <Contact />
    </>
  );
}

const XLogo = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="#fff"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
