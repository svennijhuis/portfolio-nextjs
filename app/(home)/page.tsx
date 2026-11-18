import AboutMe from "@/components/sections-home/about-me/about-me";
import Blog from "@/components/sections-home/blog/blog";
import Contact from "@/components/sections-home/contact/contact";
import Experience from "@/components/sections-home/experience/experience";
import ImageGallery from "@/components/sections-home/gallery/image-gallery";
import HeroHome from "@/components/sections-home/hero/hero-home";

// import Work from "@/components/sections-home/work/work";

export const revalidate = 0;

export const metadata = {
  title: "Home",
};

export default async function Page() {
  return (
    <>
      <HeroHome />
      <ImageGallery />
      <AboutMe />
      {/* <Work /> */}
      <Blog />
      <Experience />
      <Contact />
    </>
  );
}
