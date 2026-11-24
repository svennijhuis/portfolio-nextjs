import AboutMe from "@/components/sections-home/about-me/about-me";
import Blog from "@/components/sections-home/blog/blog";
import Contact from "@/components/sections-home/contact/contact";
import Experience from "@/components/sections-home/experience/experience";
import ImageGallery from "@/components/sections-home/gallery/image-gallery";
import HeroHome from "@/components/sections-home/hero/hero-home";
import JsonLd from "@/components/seo/json-ld";

// import Work from "@/components/sections-home/work/work";

export const revalidate = 0;

export const metadata = {
  title: {
    absolute: "Sven Nijhuis",
  },
  alternates: {
    canonical: "/",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sven Nijhuis",
  url: "https://svennijhuis.io",
  jobTitle: "Backend developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hoorn",
    addressCountry: "NL",
  },
  sameAs: [
    "https://www.linkedin.com/in/sven-nijhuis/",
    "https://x.com/sven_nijhuis",
  ],
};

export default async function Page() {
  return (
    <>
      <JsonLd data={personJsonLd} />
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
