import Paragraph from "../text/paragraph";

const Footer = () => {
  return (
    <section className="bg-gray ">
      <div className="container ">
        <div className="border-t-[1px] border-grayDark/40">
          <Paragraph
            className="py-2 text-center"
            size={"sm"}
            color={"black"}
            fontWeight={"light"}
          >
            Sven Nijhuis | Backend developer | © {new Date().getFullYear()} All
            rights reserved
          </Paragraph>
        </div>
      </div>
    </section>
  );
};
export default Footer;
