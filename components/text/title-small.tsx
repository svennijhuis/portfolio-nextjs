import clsx from "clsx";

interface TitleSmallProps {
  children: React.ReactNode;
  className?: string;
}

const TitleSmall = ({ children, className }: TitleSmallProps) => {
  return (
    <h2
      className={clsx(
        "flex h-[28px] w-fit items-center justify-center rounded-full bg-orange px-[15px] text-13 font-light leading-22 text-white",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default TitleSmall;
