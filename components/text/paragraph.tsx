import { cn } from "@/utils/class-merge";
import React from "react";

interface ParagraphProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size: "sm" | "md" | "lg";
  color: "black" | "gray" | "white";
  fontWeight: "light" | "normal" | "medium";
}

const Paragraph = React.forwardRef<HTMLHeadingElement, ParagraphProps>(
  ({ className, size, color, fontWeight, ...props }, ref) => {
    return (
      <p
        className={cn(className, {
          // Size
          "text-16 leading-24 md:text-9 md:leading-19": size === "sm",
          "text-16 md:text-18": size === "md",
          "text-21": size === "lg",
          // Color
          "text-black": color === "black",
          "text-gray": color === "gray",
          "text-white": color === "white",
          // Font weigsssht
          "font-light": fontWeight === "light",
          "font-normal": fontWeight === "normal",
          "font-medium": fontWeight === "medium",
        })}
        ref={ref}
        {...props}
      />
    );
  }
);

Paragraph.displayName = "Paragraph";

export default Paragraph;
