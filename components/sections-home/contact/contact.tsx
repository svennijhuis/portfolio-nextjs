import AnimatedTextWord from "@/components/animation/AnimatedText";
import InViewFadeIn from "@/components/animation/inview-fade-in";
import LinkStyling from "@/components/buttons/link-styling";
import H3 from "@/components/text/H3";
import Paragraph from "@/components/text/paragraph";
import TitleSmall from "@/components/text/title-small";

const Contact = () => {
  return (
    <section id="contact" className="bg-gray py-8 md:py-12">
      <div className="container grid grid-cols-1 md:grid-cols-2 md:gap-5">
        <article className="col-span-1">
          <TitleSmall className="mb-2">Contact</TitleSmall>
        </article>
        <article className="col-span-1">
          <H3 className="max-w-[370px] text-black md:max-w-[485px]">
            <AnimatedTextWord
              text="Let's Connect!"
              className="mr-1 uppercase"
              darkWords={[false, true]}
              marginView="-30% 0% -25% 0%"
              loadingHeight="min-h-[40px] md:min-h-[50px]"
            />
          </H3>
          <InViewFadeIn delay={0.8} time={0.8}>
            <Paragraph
              className="mt-2 max-w-[520px] md:mt-3"
              size="md"
              color="black"
              fontWeight="light"
            >
              I'm always interested in new opportunities and collaborations.
              Don't hesitate to get in touch with me by e-mail or connect with
              me on LinkedIn. I look forward to hear from you!
            </Paragraph>
            <div className="mt-2 flex flex-wrap gap-2 md:mt-3 ">
              <LinkStyling
                target="_blank"
                href="https://www.linkedin.com/in/sven-nijhuis/"
                color="black"
                icon="arrow"
                iconHover="screen"
              >
                LinkedIn
              </LinkStyling>
              <LinkStyling
                target="_blank"
                href="mailto:sanijhuis@live.nl"
                color="black"
                icon="arrow"
                iconHover="mail"
              >
                E-mail
              </LinkStyling>
            </div>
          </InViewFadeIn>
        </article>
      </div>
    </section>
  );
};
export default Contact;
