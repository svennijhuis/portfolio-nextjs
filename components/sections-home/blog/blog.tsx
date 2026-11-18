import AnimatedTextWord from "@/components/animation/AnimatedText";
import InViewFadeIn from "@/components/animation/inview-fade-in";
import LinkStyling from "@/components/buttons/link-styling";
import H3 from "@/components/text/H3";
import Paragraph from "@/components/text/paragraph";
import TitleSmall from "@/components/text/title-small";
import { getAllPosts } from "@/lib/blog";
import CardBlog from "./card-blog";

const MAX_ON_HOME = 4;

const Blog = () => {
  const posts = getAllPosts();
  if (posts.length === 0) return null;

  const visible = posts.slice(0, MAX_ON_HOME);
  const hasMore = posts.length > MAX_ON_HOME;

  return (
    <section id="blog" className="bg-gray py-8 md:py-12">
      <div className="container grid grid-cols-1 md:grid-cols-2 md:gap-5">
        <article className="col-span-1">
          <TitleSmall className="mb-2">Blog</TitleSmall>
        </article>
        <article className="col-span-1">
          <H3 className="max-w-[370px] text-black md:max-w-[485px]">
            <AnimatedTextWord
              text="Notes from the terminal"
              className="mr-1 uppercase"
              darkWords={[true, true, false, false]}
              marginView="-30% 0% -25% 0%"
              loadingHeight="min-h-[80px] md:min-h-[100px]"
            />
          </H3>
          <InViewFadeIn delay={1.3} time={0.8}>
            <Paragraph
              className="mt-2 max-w-[520px] md:mt-3"
              size="md"
              color="black"
              fontWeight="light"
            >
              Things I learn, build and think about as a developer. Most of
              these started as a post on X.
            </Paragraph>
          </InViewFadeIn>
        </article>
      </div>

      <div className="container mt-3 grid grid-cols-1 gap-5 md:mt-6 md:grid-cols-2">
        {visible.map((post, index) => (
          <CardBlog key={post.slug} post={post} number={posts.length - index} />
        ))}
      </div>

      {hasMore && (
        <div className="container mt-3 flex justify-end md:mt-5">
          <LinkStyling href="/blog" color="black" icon="arrow" iconHover="eye">
            See more
          </LinkStyling>
        </div>
      )}
    </section>
  );
};

export default Blog;
