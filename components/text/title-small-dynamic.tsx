import styles from "./text.module.scss";
import clsx from "clsx";

interface TitleSmallProps {
  className?: string;
  list: string[];
}

const TitleSmallDynamic = ({ className, list }: TitleSmallProps) => {
  return (
    <div
      className={clsx(
        "flex h-[28px] w-fit flex-col items-center justify-center overflow-hidden rounded-full bg-orange px-[15px] text-14 font-light leading-22 text-white md:text-13",
        className
      )}
    >
      <ul className={styles.list}>
        {list.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default TitleSmallDynamic;
