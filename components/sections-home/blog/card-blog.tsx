import { formatDate, type PostMeta } from "@/lib/blog";
import ArrowIcon from "@/public/icons/arrow-icon";
import XIcon from "@/public/icons/x-icon";
import Link from "next/link";

interface CardBlogProps {
  post: PostMeta;
  /** Post number shown in the tile, oldest post is 01. */
  number: number;
}

const CardBlog = ({ post, number }: CardBlogProps) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group col-span-1 flex flex-col rounded-2xl border-[1px] border-black/20 bg-white p-[15px] transition-all duration-500 ease-in-out hover:-translate-y-[4px] hover:border-black/40 sm:flex-row sm:gap-2 md:p-2"
    >
      <div className="bg-softBlack relative mb-1.5 flex h-[65px] w-[65px] shrink-0 items-center justify-center rounded-lg transition-colors duration-500 group-hover:bg-black sm:mb-0 sm:h-[90px] sm:w-[90px]">
        <span className="text-24 text-orange sm:text-32 font-mono font-medium">
          {String(number).padStart(2, "0")}
        </span>
        {post.xUrl && (
          <span
            className="absolute -right-[6px] -bottom-[6px] flex h-[26px] w-[26px] items-center justify-center rounded-full border-[2px] border-white bg-black"
            title="Originally posted on X"
          >
            <XIcon size={11} />
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-1">
          <span className="text-12 text-grayDark truncate font-light">
            /{post.slug}
          </span>
          <span className="text-12 text-grayDark font-light whitespace-nowrap">
            {formatDate(post.date)} · {post.readingTime} min read
          </span>
        </div>

        <h4 className="text-18 md:text-20 mt-[6px] leading-24 font-medium text-black md:leading-26">
          {post.title}
        </h4>

        {post.description && (
          <p className="text-14 mt-[6px] line-clamp-2 leading-22 font-light text-black">
            {post.description}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-1 pt-1.5">
          <div className="flex flex-wrap gap-1">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-12 flex rounded-3xl border-[1px] border-black px-1 py-[2px] font-normal text-black"
              >
                #{tag}
              </span>
            ))}
          </div>
          <span className="group-hover:bg-orange flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-black p-[5px] transition-all duration-500 group-hover:-rotate-45">
            <span className="flex w-full invert [&_svg]:h-auto [&_svg]:w-full">
              <ArrowIcon />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CardBlog;
