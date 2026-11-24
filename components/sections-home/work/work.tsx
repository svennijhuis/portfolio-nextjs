import AnimatedTextWord from "@/components/animation/AnimatedText";
import InViewFadeIn from "@/components/animation/inview-fade-in";
import H3 from "@/components/text/H3";
import Paragraph from "@/components/text/paragraph";
import TitleSmall from "@/components/text/title-small";
import ampere from "../../../public/images/ampere.png";
import daysix from "../../../public/images/daysix.png";
import dynamicCharting from "../../../public/images/dynamic-chart.png";
import gapstars from "../../../public/images/gapstars.png";
import svenNijhuis from "../../../public/images/portfolio-sven.png";
import CardWork from "./card-work";

const Work = () => {
  const data = [
    // {
    //   title: "Microservices Architecture",
    //   imageSrc: microservices,
    //   viewUrl: "",
    //   nameUrl: "",
    //   text: "A private project implementing microservices architecture using modern technologies for high-performance distributed systems.",
    //   tech: ["C#", ".NET", "Rust"],
    //   urlProject: "",
    // },
    {
      title: "Day Six",
      imageSrc: daysix,
      viewUrl: "https://daysix.nl",
      nameUrl: "Day Six",
      text: "A fast website with animations, created on behalf of ",
      tech: ["Reactjs", "Nextjs", "Tailwind CSS", "Framer Motion"],
      urlProject: "https://daysix.nl/",
    },
    // {
    //   title: "Sven Nijhuis Portfolio",
    //   imageSrc: svenNijhuis,
    //   viewUrl: "",
    //   nameUrl: "",
    //   text: "This website is my personal portfolio, created to showcase who I am and where I aspire to go.",
    //   tech: [
    //     "React.js",
    //     "Next.js",
    //     "Typescript",
    //     "Supabase",
    //     "Tailwind CSS",
    //     "Framer Motion",
    //   ],
    //   urlProject: "https://github.com/svennijhuis/portfolio-supabase-nextjs",
    // },
    {
      title: "Dynamic Charting",
      imageSrc: dynamicCharting,
      viewUrl: "",
      nameUrl: "",
      text: "This project was created for school. I had to create a dynamic chart.",
      tech: ["React.js", "Tailwind CSS", "D3.js"],
      // urlProject:
      //   "https://github.com/svennijhuis/Stock-chart-with-d3.js-and-react.js",
    },
    {
      title: "Ampère",
      imageSrc: ampere,
      viewUrl: "https://daysix.nl",
      nameUrl: "Day Six",
      text: "I contributed to building the single page with attention to detail. I created this website on behalf of ",
      tech: ["PHP", "Tailwind CSS", "GSAP"],
      urlProject: "https://amperebezorgt.nl",
    },
  ];

  return (
    <section id="work" className="bg-gray py-8 md:py-12">
      <div className="container grid grid-cols-1 md:grid-cols-2 md:gap-5">
        <article className="col-span-1">
          <TitleSmall className="mb-2">Work</TitleSmall>
        </article>
        <article className="col-span-1">
          <H3 className="max-w-[370px] text-black md:max-w-[485px]">
            <AnimatedTextWord
              text="My work in Web Development"
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
              Right below you can take a glimpse of my web development portfolio
              to get a better idea of my work. If you would like to know more or
              have any questions, feel free to connect with me on LinkedIn or by
              e-mail. I would be pleased to talk with you!
            </Paragraph>
          </InViewFadeIn>
        </article>
      </div>
      <div className="container mt-3 grid grid-cols-1 gap-x-5 gap-y-5 md:mt-6 md:grid-cols-2">
        {data.map((item, index) => (
          <CardWork
            key={index}
            title={item.title}
            imageSrc={item.imageSrc}
            viewUrl={item.viewUrl}
            nameUrl={item.nameUrl}
            text={item.text}
            urlProject={item.urlProject}
          >
            {item.tech.map((item, index) => (
              <span
                className="flex rounded-3xl border-[1px] border-black px-1 py-[2px] text-14 font-normal text-black md:text-12"
                key={index}
              >
                {item}
              </span>
            ))}
          </CardWork>
        ))}
      </div>
    </section>
  );
};
export default Work;
