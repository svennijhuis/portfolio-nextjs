import { cn } from "@/utils/class-merge";
import React from "react";

interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const H3 = React.forwardRef<HTMLHeadingElement, H3Props>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        className={cn(
          "text-normal text-[clamp(22px,6.5vw,33px)] leading-[1.15] sm:text-35 sm:leading-40 md:text-45 md:leading-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

H3.displayName = "H3";

export default H3;