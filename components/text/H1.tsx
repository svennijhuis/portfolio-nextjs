import { cn } from "@/utils/class-merge";
import React from "react";

interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const H1 = React.forwardRef<HTMLHeadingElement, H1Props>(
  ({ className, ...props }, ref) => {
    return (
      <h1
        className={cn(
          "text-normal text-[clamp(26px,7.2vw,38px)] uppercase leading-[1.05] text-black sm:text-55 sm:leading-55 md:text-[100px] md:leading-110",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

H1.displayName = "H1";

export default H1;
