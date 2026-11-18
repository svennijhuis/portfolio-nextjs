import LinkStyling from "@/components/buttons/link-styling";
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

        {post.cover && (
          <div className="relative mt-4 aspect-[16/9] max-h-[640px] w-full overflow-hidden rounded-2xl md:mt-6">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="blog-prose prose mx-auto mt-4 max-w-[720px] md:mt-6">
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

        <div className="mx-auto mt-6 max-w-[720px]">
          {post.xUrl && (
            <div className="bg-gray flex flex-col gap-2 rounded-2xl border-[1px] border-black/20 p-2 sm:flex-row sm:items-center sm:justify-between md:p-3">
              <div>
                <p className="text-12 text-grayDark font-light">
                  Originally posted on X
                </p>
                <p className="text-18 mt-[4px] font-medium text-black">
                  Join the conversation there
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
            className="text-14 mt-3 inline-block font-light text-black underline-offset-4 hover:underline"
          >
            ← All posts
          </Link>
        </div>
      </div>
    </article>
  );
}
