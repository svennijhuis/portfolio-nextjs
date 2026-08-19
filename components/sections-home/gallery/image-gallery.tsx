import ampere from "../../../public/images/ampere.png";
import AndCoWoman from "../../../public/images/andcowoman.png";
import dynamicCharting from "../../../public/images/dynamic-chart.png";
import gapstars from "../../../public/images/gapstars.png";
import Headload from "../../../public/images/headload.png";
import svenNijhuis from "../../../public/images/portfolio-sven.png";
import Scanner from "../../../public/images/scanner.png";
import ParallaxScrollSection from "./parallax-scroll-section";
import Image, { StaticImageData } from "next/image";

interface ImageGalleryInterface {
  src: StaticImageData;
  title: string;
}

const data: ImageGalleryInterface[] = [
  { src: ampere, title: "Ampère" },
  { src: gapstars, title: "Gapstars" },
  { src: svenNijhuis, title: "Sven Nijhuis Portfolio" },
  { src: dynamicCharting, title: "Dynamic Charting" },
  { src: Scanner, title: "Scanner" },
  { src: Headload, title: "Headload productions" },
  { src: AndCoWoman, title: "AndCoWoman" },
];

/**
 * Each column starts at a different image so the three columns don't line up,
 * while staying identical between the server and the browser.
 */
const columnFrom = (offset: number) => [
  ...data.slice(offset),
  ...data.slice(0, offset),
];

const columns = [
  { speed: 15, className: "flex flex-col gap-3", images: columnFrom(0) },
  { speed: -10, className: undefined, images: columnFrom(3) },
  { speed: 10, className: undefined, images: columnFrom(5) },
];

const ImageGallery = () => {
  return (
    <div className="max-w-screen  relative h-[100vh] overflow-hidden md:h-[150vh]">
      <section className=" absolute left-1/2 top-0 grid h-[100vh] w-[190vw] -translate-x-1/2 transform grid-cols-3 gap-[15px] overflow-hidden bg-softBlack sm:w-[160vw] md:h-[150vh] md:w-[140vw] md:gap-3">
        {columns.map(({ speed, className, images }) => (
          <div key={speed} className="relative col-span-1 h-full">
            <ParallaxScrollSection className={className} speed={speed}>
              {images.map((item: ImageGalleryInterface) => (
                <Image
                  className="mb-[15px] aspect-video  w-full rounded-md object-cover md:mb-3  md:rounded-xl"
                  key={item.title}
                  src={item.src}
                  alt={item.title}
                  width={1000}
                  height={1000}
                />
              ))}
            </ParallaxScrollSection>
          </div>
        ))}
      </section>
    </div>
  );
};
export default ImageGallery;
