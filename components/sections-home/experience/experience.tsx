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
    title: "Software Developer",
    icon: "work",
    text: "As a backend-focused software engineer, I design and implement scalable microservices and Azure Functions using .NET (C#) and Rust. My role involves developing cloud-based services, optimizing system architecture, and ensuring reliability and maintainability. Additionally, I contribute to shaping the software architecture and strategic direction of the platform.",
    subjectArray: [
      ".NET",
      "C#",
      "Rust",
      "Microservices",
      "Azure Functions",
      "Terrafom",
      "Azure",
    ],
  },
  {
    title: "React.js & Node.js Developer",
    icon: "work",
    text: "After completing my internship, I was given the opportunity to expand my responsibilities. With the departure of my internship supervisor, I stepped into their role, taking full ownership of the Apollo GraphQL backend and the React client-side application for Auto.nl.",
    subjectArray: [
      "React.js",
      "Node.js",
      "Apollo Client",
      "GraphQL",
      "Tailwind CSS",
    ],
  },
  {
    title: "Front-end Web Development",
    icon: "work",
    text: "I have been working at Day-Six since April 2021, primarily focusing on front-end development. Additionally, I have experience creating small custom plugins and themes.",
    subjectArray: [
      "React.js",
      "Tailwind CSS",
      "PHP",
      "GSAP",
      "Gutenburg Blocks",
    ],
  },
  {
    title: "Front-end Web Development Intership",
    icon: "work",
    text: "During my internship, I focused on expanding my knowledge while working independently on a React client-side application connected to an Apollo GraphQL backend. I actively participated in code reviews and followed the Scrum methodology to ensure high-quality development. Over time, I was given the opportunity to work in a hybrid environment and independently develop and deploy TypeScript-based features to production.",
    subjectArray: [
      "React.js",
      "Node.js",
      "Apollo Client",
      "GraphQL",
      "Tailwind CSS",
    ],
  },
  {
    title: "Front-end Web Development Intership",
    icon: "work",
    text: "I completed a 10-week internship at Louwman ICT Services B.V. as a Front-End Developer intern, where I contributed to the development of various web applications. My work primarily involved React and Gutenberg blocks, focusing on building and optimizing reusable components.",
    subjectArray: [
      "Guestburg Blocks",
      "React.js",
      "WordPress",
      "Tailwind CSS",
    ],
  },
  {
    title: "Cyclist",
    icon: "work",
    text: "From January 2018 to October 2019, I was a member of the Volkerwessels-Merckx Cycling Team and competed in cycling races national and internationally.",
    subjectArray: ["Challenges"],
  },
];

const School: Card[] = [
  {
    title: "Communication and Multimedia Design (HBO)",
    icon: "grid",
    text: "During my studies in Communication and Multimedia Design (CMD), I explored both design and development. I worked on projects involving UI/UX design, front-end development, and back-end development, gaining experience in both areas. Over time, I developed a preference for back-end development, which led me to focus more on technical problem-solving and system architecture. As part of my studies, I completed two technical internships, further strengthening my development skills. I also learned how to write technical plans, document processes, and effectively communicate with clients and team members to ensure smooth project execution. Through my minors, I deepened my technical knowledge and expanded my expertise in both front-end and back-end development, allowing me to make informed decisions about system design and implementation.",
    subjectArray: ["Development", "UX Design", "Research"],
  },
  {
    title: "Minor Blockchain Development",
    icon: "grid",
    text: "During this minor, I developed skills in building Web3 applications on the Ethereum network, using Solidity to create smart contracts. I gained a deep understanding of blockchain structure and functionality, learning when and how this technology can be effectively applied. This provided me with a strong foundation in the capabilities and challenges of decentralized networks. As part of the program, I worked on an application using NestJS and Next.js, designed to identify vulnerabilities in smart contracts before deployment. I was responsible for the backend, developing a Node.js-based system with NestJS, MySQL, and Docker, implementing authorization and security measures to ensure reliable contract verification.",
    subjectArray: [
      "Blockchain",
      "Smart Contracts",
      "Decentralized Apps",
      "NestJS",
      "React.js",
      "Solidity",
    ],
  },
  {
    title: "Minor information design",
    icon: "grid",
    text: "During my studies at the Amsterdam University of Applied Sciences (HvA), I completed the Information Design minor, where I developed skills in data visualization and user-friendly design. A key aspect of this minor was working with web development libraries to create interactive applications. I primarily used React for building user interfaces and D3.js for developing dynamic data visualizations. This minor gave me a deeper understanding of how to combine design and technology to make complex data more accessible. It also strengthened my technical skills and taught me how to translate information into intuitive web applications.",
    subjectArray: [
      "D3.js",
      "React.js",
      "Data Visualization",
      "UX Design",
      "Interaction Design",
    ],
  },
  {
    title: "Marketing and Communication (MBO niveau 4)",
    icon: "grid",
    text: "Johan Cruyff College is a school for elite athletes that offers a Marketing and Communication vocational education program alongside their athletic pursuits.",
    subjectArray: ["Marketing", "Communication", "Sales"],
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
    text: "My primary focus is backend development, where I specialize in building scalable and efficient solutions using C# and .NET. These technologies form the core of my daily work.",
    subjectArray: ["C#", ".NET", "MongoDB", "Azure Functions", "Azure"],
  },
  {
    title: "Rust",
    icon: "development",
    text: "I'm currently developing in Rust in my current job, primarily focusing on building high-performance APIs using Axum and Tokio",
    subjectArray: [
      "Rust",
      "Axum",
      "Tokio",
      "MongoDB",
      "Azure Functions",
      "Azure",
    ],
  },
  {
    title: "Express & Backend Integration",
    icon: "development",
    text: "I enjoy using Express and NestJS to create APIs for web applications, effectively connecting the backend with the front-end and databases.",
    subjectArray: ["Express", "NestJS", "Node.js", "GraphQL", "RESTful APIs"],
  },
  {
    title: "React.js & Front-end Development",
    icon: "development",
    text: "As a skilled developer, I specialize in React.js, crafting dynamic user interfaces. I also have extensive experience with Next.js, Tailwind CSS, and Framer Motion, which I use to build responsive and visually appealing front-end applications.",
    subjectArray: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "PHP",
    icon: "development",
    text: "I've used PHP in various projects, including developing custom themes and plugins for WordPress. It remains a valuable tool in my development toolkit.",
    subjectArray: ["PHP", "WordPress", "Custom Plugins", "Custom Themes"],
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
                With a diverse background in web development, work experience,
                and education, I have gained valuable skills and the ability to
                tackle challenges from various perspectives. I am always eager
                to continue learning and growing in my field.
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
                    className="flex rounded-3xl border-[1px] border-black px-1 py-[2px] text-12 font-normal text-black"
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
