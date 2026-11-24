import ButtonStyling from "@/components/buttons/button-styling";
import Paragraph from "@/components/text/paragraph";
import ArrowIcon from "@/public/icons/arrow-icon";
import BookIcon from "@/public/icons/book-icon";
import DevelopmentIcon from "@/public/icons/development-icon";
import EyeIcon from "@/public/icons/eye-icon";
import GridIcon from "@/public/icons/grid-icon";
import MailIcon from "@/public/icons/mail-icon";
import PhoneIcon from "@/public/icons/phone-icon";
import ScreenIcon from "@/public/icons/screen-icon";
import WorkIcon from "@/public/icons/work-icon";
import clsx from "clsx";
import * as React from "react";
import styles from "./card-experience.module.scss";

interface CardExperienceProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
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
}

const CardExperience = React.forwardRef<HTMLDivElement, CardExperienceProps>(
  ({ children, title, text, icon, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [showReadMore, setShowReadMore] = React.useState(false);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const truncatedHeight = 50;

    // Improved content height check
    React.useEffect(() => {
      const checkHeight = () => {
        if (contentRef.current) {
          const fullHeight = contentRef.current.scrollHeight;
          setShowReadMore(fullHeight > truncatedHeight + 20); // Added buffer for better detection
        }
      };

      checkHeight();
      // Re-check on window resize
      window.addEventListener("resize", checkHeight);
      return () => window.removeEventListener("resize", checkHeight);
    }, [text]);

    React.useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 500 && isExpanded) {
          setIsExpanded(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [isExpanded]);

    return (
      <article
        {...props}
        ref={ref}
        className={clsx(
          "sticky top-10 flex flex-col rounded-2xl border-[1px] border-black/20 bg-gray p-[15px] transition-all duration-500 ease-in-out md:top-[200px] md:p-2",
          isExpanded
            ? "h-auto min-h-[220px] md:min-h-[245px]"
            : "h-[220px] md:h-[245px]"
        )}
      >
        <div className="flex gap-1 md:gap-2">
          <div
            className={clsx(
              "flex h-[65px] w-[65px] items-center justify-center rounded-lg bg-softBlack p-1",
              styles.icon
            )}
          >
            {icon === "arrow" ? (
              <ArrowIcon />
            ) : icon === "book" ? (
              <BookIcon />
            ) : icon === "development" ? (
              <DevelopmentIcon />
            ) : icon === "eye" ? (
              <EyeIcon />
            ) : icon === "grid" ? (
              <GridIcon />
            ) : icon === "mail" ? (
              <MailIcon />
            ) : icon === "phone" ? (
              <PhoneIcon />
            ) : icon === "screen" ? (
              <ScreenIcon />
            ) : icon === "work" ? (
              <WorkIcon />
            ) : null}
          </div>
          <div className="flex flex-col">
            <h4 className="mb-1 text-18 font-medium text-black md:text-20">
              {title}
            </h4>
            <div className="flex flex-wrap gap-1">{children}</div>
          </div>
        </div>

        {/* Text section with Read More functionality */}
        <div
          className="relative overflow-hidden pt-1 transition-all duration-500 ease-in-out"
          style={{
            maxHeight: isExpanded
              ? // @ts-ignore
                `${contentRef?.current?.scrollHeight + 100 || 1000}px`
              : `${truncatedHeight}px`,
          }}
        >
          <div ref={contentRef} className="transition-all duration-500">
            <Paragraph
              className="flex h-full items-center pb-[5px] pr-1 md:items-end"
              size="sm"
              color="black"
              fontWeight="light"
            >
              {text}
            </Paragraph>
          </div>
        </div>

        {showReadMore && (
          <div className="mt-auto shrink-0 pt-1">
            <ButtonStyling
              color="black"
              icon="arrow"
              iconHover="eye"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show Less" : "Read More"}
            </ButtonStyling>
          </div>
        )}
      </article>
    );
  }
);

CardExperience.displayName = "Card";

export default CardExperience;
