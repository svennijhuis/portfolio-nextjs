"use client";

import InViewFadeIn from "@/components/animation/inview-fade-in";
import LinkStyling from "@/components/buttons/link-styling";
import Paragraph from "@/components/text/paragraph";
import { Variants, motion, useInView } from "motion/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface CardWorkProps {
  children: React.ReactNode;
  title: string;
  imageSrc: StaticImageData;
  viewUrl: string;
  nameUrl: string;
  text: string;
  urlProject?: string;
}

const CardWork = ({
  title,
  imageSrc,
  viewUrl,
  nameUrl,
  text,
  children,
  urlProject,
}: CardWorkProps) => {
  const cardVariants: Variants = {
    offscreen: {
      width: 0,
    },
    onscreen: {
      width: "100%",
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 50,
        delay: 0.5,
      },
    },
  };

  const linkVariants: Variants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        delay: 1,
      },
    },
  };

  return (
    <article className="col-span-1 flex flex-col">
      <div className="relative w-full">
        <motion.div
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-15% 0% -15% 0%" }}
          className="relative h-[250px] overflow-hidden md:h-[350px]"
        >
          <Image
            className="h-full w-full rounded-xl object-cover md:rounded-2xl"
            src={imageSrc}
            alt={title}
            width={1000}
            height={1000}
          />
        </motion.div>
        <motion.div
          variants={linkVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-15% 0% -15% 0%" }}
          className="absolute bottom-2 right-2 flex w-full"
        >
      {
        urlProject && (
        <LinkStyling
            className="ml-auto"
            href={urlProject}
            icon="arrow"
            iconHover="eye"
            color="gray"
            target="_blank"
          >
            View
          </LinkStyling>
        )
      }
        </motion.div>
      </div>
      <InViewFadeIn delay={0.5} time={0.5}>
        <div className="mt-1 grid grid-cols-3 gap-1 md:mt-2">
          {
            urlProject && (
              <h4 className="col-span-3 pr-1 text-20 font-medium text-black hover:opacity-80 hover:transition-all md:col-span-1">
                <Link target="_blank" href={urlProject}>
                  {title}
                </Link>
              </h4>
            )
          }
  

          <div className="col-span-3 md:col-span-2 md:mr-4">
            <Paragraph
              className="mb-[15px]"
              size="sm"
              color="black"
              fontWeight="light"
            >
              {text}
              <a className="font-medium underline" href={viewUrl}>
                {nameUrl}
              </a>
            </Paragraph>

            <div className="flex flex-wrap gap-1">{children}</div>
          </div>
        </div>
      </InViewFadeIn>
    </article>
  );
};

export default CardWork;
