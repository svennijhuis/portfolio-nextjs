"use client";

import AnimatedTextWord from "@/components/animation/AnimatedText";
import ButtonStyling from "@/components/buttons/button-styling";
import H3 from "@/components/text/H3";
import Paragraph from "@/components/text/paragraph";
import TitleSmallDynamic from "@/components/text/title-small-dynamic";
import { useRef, useState } from "react";
import CardExperience from "./card-experience";

interface Card {
  title: string;
  text: string;
  icon:
    | "arrow"
    | "book"
    | "development"
    | "eye"
    | "grid"
    | "mail"
    | "phone"
    | "screen"
    | "work";
  subjectArray: string[];
}

const WorkExperience: Card[] = [
  {
    title: "Backend Developer, Transavia",
    icon: "work",
    text: "June 2025 to present. I build backend services and APIs in C# and .NET on Azure for boarding pass, baggage drop-off and Flying Blue. I maintain the Azure resources with Bicep and CI/CD. I also work on GitHub agentic workflows, an internal plugin marketplace for AI agents, AI demos and the AI guild.",
    subjectArray: ["C#", ".NET", "Azure", "Bicep", "CI/CD"],
  },
  {
    title: "Backend Developer, Auto.nl",
    icon: "work",
    text: "From September 2024 to May 2025, at Auto.nl (Louwman Group), I built microservices and Azure workloads in .NET and Rust, with MongoDB. I mentored frontend developers.",
    subjectArray: [".NET", "C#", "Rust", "MongoDB", "Azure"],
  },
  {
    title: "Frontend Developer, Auto.nl",
    icon: "work",
    text: "From February 2024 to September 2024 I took over the Apollo GraphQL backend and the React client after my supervisor left, and I delivered features.",
    subjectArray: ["React.js", "Apollo", "GraphQL"],
  },
  {
    title: "Frontend internship, Auto.nl",
    icon: "work",
    text: "From September 2023 to February 2024 I worked on a React client with Apollo GraphQL, took part in code reviews and Scrum, and shipped TypeScript features.",
    subjectArray: ["React.js", "GraphQL", "TypeScript"],
  },
  {
    title: "Frontend internship, Louwman ICT",
    icon: "work",
    text: "From January 2022 to July 2022 I built web apps with React and Gutenberg blocks, and reusable components.",
    subjectArray: ["React.js", "Gutenberg", "WordPress"],
  },
  {
    title: "Full stack developer, Day Six",
    icon: "work",
    text: "From April 2021 to March 2024 I built custom webshops and dashboards with Next.js, WordPress and Node.js. I sat with clients and worked the product out on paper.",
    subjectArray: ["Next.js", "WordPress", "Node.js", "PHP"],
  },
  {
    title: "Competitive cycling",
    icon: "work",
    text: "From January 2018 to October 2019 I raced at a high level with the Volkerwessels-Merckx Cycling Team, in the Netherlands and abroad.",
    subjectArray: ["Cycling"],
  },
];

const School: Card[] = [
  {
    title: "Bachelor, Communication and Multimedia Design",
    icon: "grid",
    text: "From September 2020 to June 2024 I studied Communication and Multimedia Design at the Hogeschool van Amsterdam. Front-end and back-end, with a focus on architecture. Two technical internships.",
    subjectArray: ["HvA", "Front-end", "Back-end"],
  },
  {
    title: "Minor Blockchain Development",
    icon: "grid",
    text: "From February 2023 to July 2023. Solidity, NestJS, Node.js and Docker. I built the backend of an app that checks smart contracts, with NestJS, MySQL and Docker.",
    subjectArray: ["Solidity", "NestJS", "Node.js", "Docker"],
  },
  {
    title: "Minor Information Design",
    icon: "grid",
    text: "From September 2022 to February 2023 at the Hogeschool van Amsterdam. React and D3.js for data visualization.",
    subjectArray: ["React.js", "D3.js"],
  },
  {
    title: "Marketing and Communication",
    icon: "grid",
    text: "From 2016 to 2019 at the Johan Cruyff College. Marketing and communication.",
    subjectArray: ["Marketing", "Communication"],
  },
  {
    title: "Vmbo-T",
    icon: "grid",
    text: "I attended VMBO-T at Veenlanden College Vinkeveen, which is a regular school.",
    subjectArray: ["General Education"],
  },
];

const Skills: Card[] = [
  {
    title: "C# & .NET",
    icon: "development",
    text: "C# and .NET are what I use most. At Transavia I build backend services and APIs on Azure, and I maintain those resources with Bicep and CI/CD.",
    subjectArray: ["C#", ".NET", "Azure", "Bicep", "CI/CD"],
  },
  {
    title: "AI engineering",
    icon: "development",
    text: "At Transavia I build GitHub agentic workflow templates on custom self-hosted runners, and an internal marketplace for AI providers, skills and agents. I work on MCP servers and context engineering, give AI demos, and help organise the AI guild. In my own projects, agents build in cloud environments and I design and review. nstack is my open source agent skills. It works in Claude Code, Codex, Cursor and GitHub Copilot.",
    subjectArray: [
      "Agentic workflows",
      "MCP",
      "nstack",
      "Context engineering",
      "GitHub Copilot",
    ],
  },
  {
    title: "Rust",
    icon: "development",
    text: "I used Rust at Auto.nl from September 2024 to May 2025, next to .NET, for microservices and APIs with MongoDB.",
    subjectArray: ["Rust", "Axum", "Tokio", "MongoDB"],
  },
  {
    title: "Express & NestJS",
    icon: "development",
    text: "I have used Express and NestJS to build APIs, mostly in earlier work and during my studies.",
    subjectArray: ["Express", "NestJS", "Node.js"],
  },
  {
    title: "React & Next.js",
    icon: "development",
    text: "I have built interfaces with React and Next.js, including at Auto.nl, Day Six and on this site.",
    subjectArray: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    title: "PHP & WordPress",
    icon: "development",
    text: "I have used PHP for WordPress themes and plugins, including client work at Day Six.",
    subjectArray: ["PHP", "WordPress"],
  },
];

const CARDS: Record<string, Card[]> = { Skills, WorkExperience, School };

const Experience = () => {
  const [subject, setSubject] = useState<string>("Skills");
  const data = CARDS[subject] ?? [];
  const myRef = useRef<null | HTMLDivElement>(null);

  return (
    <>
      <div id="experience" ref={myRef} className="mt-[-60px] pt-6"></div>
      <section className="bg-softBlack py-8 md:py-12">
        <div className="container grid grid-cols-1 md:grid-cols-2 md:gap-5">
          <div className="col-span-1">
            <div className="sticky top-8 md:top-[200px]">
              <TitleSmallDynamic
                className="mb-2"
                list={["Skills", "Work Experience", "Education"]}
              />
              <H3 className="max-w-[370px] text-white md:max-w-[485px]">
                <AnimatedTextWord
                  text="Skills, Experience, Education"
                  className="mr-1 uppercase"
                  darkWords={[false, true, false]}
                  marginView="-30% 0% -25% 0%"
                  loadingHeight="min-h-[80px] md:min-h-[100px]"
                />
              </H3>
              <Paragraph
                className="my-2 max-w-[520px] md:my-3"
                size="md"
                color="white"
                fontWeight="light"
              >
                C# and .NET on Azure, AI engineering next to that, and the
                jobs and studies behind it.
              </Paragraph>
              <div className="flex flex-wrap gap-2">
                <ButtonStyling
                  icon="arrow"
                  iconHover="eye"
                  color="gray"
                  onClick={() => {
                    setSubject("Skills");
                    if (myRef.current) {
                      myRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  Skills
                </ButtonStyling>
                <ButtonStyling
                  icon="arrow"
                  iconHover="eye"
                  color="gray"
                  onClick={() => {
                    setSubject("WorkExperience");
                    if (myRef.current) {
                      myRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  Work Experience
                </ButtonStyling>
                <ButtonStyling
                  icon="arrow"
                  iconHover="eye"
                  color="gray"
                  onClick={() => {
                    setSubject("School");
                    if (myRef.current) {
                      myRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  Education
                </ButtonStyling>
              </div>
            </div>
          </div>
          <div className="col-span-1 mt-4 grid gap-2">
            {data.map((item: Card, index: number) => (
              <CardExperience
                key={index}
                title={item.title}
                text={item.text}
                icon={item.icon}
              >
                {item.subjectArray.map((subject, index: number) => (
                  <span
                    className="flex rounded-3xl border-[1px] border-black px-1 py-[2px] text-14 font-normal text-black md:text-12"
                    key={index}
                  >
                    {subject}
                  </span>
                ))}
              </CardExperience>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;
