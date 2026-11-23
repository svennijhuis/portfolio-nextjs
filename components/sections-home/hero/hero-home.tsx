import AnimatedTextWord from "@/components/animation/AnimatedText";
import InViewFadeIn from "@/components/animation/inview-fade-in";
import ScaleOnScroll from "@/components/animation/scale-on-scroll";
import LinkStyling from "@/components/buttons/link-styling";
import H1 from "@/components/text/H1";
import Paragraph from "@/components/text/paragraph";

const HeroHome = () => {
  return (
    <ScaleOnScroll className="pt-12 pb-10 md:pt-[180px]">
      <section className="container grid grid-cols-1 md:grid-cols-2">
        <article className="col-span-1 mb-2 md:col-span-2 md:mb-3">
          <H1 className="max-w-[1050px] font-semibold text-black">
            <AnimatedTextWord
              text="Hi, I'M SVEN. I BUILD SOFTWARE."
              className="mr-[10px] md:mr-3"
              darkWords={[true, false, false, false, false, true]}
              marginView="-15% 0% -15% 0%"
              loadingHeight="min-h-[120px] md:min-h-[220px]"
            />
          </H1>
        </article>
        <article className="col-span-1 mb-2 md:mb-0">
          <InViewFadeIn delay={1} time={0.8}>
            <Paragraph
              className="max-w-[500px]"
              size="md"
              color="black"
              fontWeight="medium"
            >
              For me, it's all about continuous growth and improvement as a
              software developer while exploring new technologies and
              approaches.
            </Paragraph>
          </InViewFadeIn>
        </article>
        <article className="col-span-1">
          <InViewFadeIn delay={1} time={0.8}>
            <Paragraph
              className="mb-2 max-w-[500px] md:mb-3"
              size="md"
              color="black"
              fontWeight="light"
            >
              I work daily with .NET, C#, and Rust, and I also have experience
              with Node.js and TypeScript. My focus is on building robust and
              scalable software. I'm passionate about continuously improving my
              skills and staying up to date with the latest technologies.
            </Paragraph>
            <div className="flex gap-2 md:gap-3">
              <LinkStyling
                href="/#about-me"
                color="black"
                icon="arrow"
                iconHover="mail"
              >
                About me
              </LinkStyling>
              <LinkStyling
                href="/#experience"
                color="gray"
                icon="arrow"
                iconHover="screen"
              >
                Skills
              </LinkStyling>
            </div>
          </InViewFadeIn>
        </article>
      </section>
    </ScaleOnScroll>
  );
};
export default HeroHome;
