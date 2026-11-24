import InViewFadeIn from "@/components/animation/inview-fade-in";
import RotateOnScroll from "@/components/animation/rotate-onscroll";
import LinkStyling from "@/components/buttons/link-styling";
import Paragraph from "@/components/text/paragraph";
import TitleSmall from "@/components/text/title-small";
import CloudIcon from "@/public/icons/background/cloud";
import Image from "next/image";
import ImageProfile from "../../../public/images/sven.webp";

const AboutMe = () => {
  return (
    <section
      id="about-me"
      className="container relative grid grid-cols-1 gap-2 overflow-hidden md:grid-cols-2 md:gap-5"
    >
      <article className="col-span-1 mt-8 flex justify-between md:mt-12">
        <TitleSmall>About me</TitleSmall>
        <InViewFadeIn delay={0.8} time={0.8}>
          <Image
            className="mr-3 aspect-square h-[125px] w-[125px] rounded-full object-cover md:h-[150px] md:w-[150px]"
            src={ImageProfile}
            width={150}
            height={150}
            alt="Sven Nijhuis"
          />
        </InViewFadeIn>
        <RotateOnScroll className="absolute bottom-[-100px] left-[-100px] -z-[2] h-[250px] w-[250px] opacity-20 md:h-[375px] md:w-[375px]">
          <CloudIcon />
        </RotateOnScroll>
      </article>
      <article className="col-span-1 mb-8 max-w-[520px] md:my-12">
        <InViewFadeIn delay={0.8} time={0.8}>
          <Paragraph
            className="mb-2 md:mb-3"
            size="md"
            color="black"
            fontWeight="normal"
          >
            I'm Sven Nijhuis, a backend developer based in Hoorn,
            Netherlands.
          </Paragraph>
          <Paragraph
            className="mb-2 md:mb-3"
            size="md"
            color="black"
            fontWeight="light"
          >
            My day-to-day work is C# and .NET on Azure. I also build GitHub
            agentic workflow templates on custom self-hosted runners, and an
            internal plugin marketplace for AI providers, skills and agents. I
            work with MCP servers and context engineering. In my own projects,
            agents build in cloud environments. I design the work and review
            what they produce. nstack is my open source set of agent skills. It
            works in Claude Code, Codex, Cursor and GitHub Copilot.
            <br />
            <br />
            I still use TypeScript, React, Next.js, Node.js, NestJS, Express
            and PHP when a project needs them.
            <br />
            <br />
            I have run 4 marathons, and I play tennis. High-level competitive
            cycling taught me discipline, perseverance, and clear communication
            under pressure.
          </Paragraph>
          <LinkStyling href="/#work" icon="arrow" iconHover="eye" color="gray">
            See my work
          </LinkStyling>
        </InViewFadeIn>
      </article>
    </section>
  );
};
export default AboutMe;
