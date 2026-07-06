import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Logo from "@layouts/components/Logo";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  return (
    <footer className="section relative mt-8 sm:mt-12 pt-10 sm:pt-[70px] pb-8 sm:pb-[50px]">
      <ImageFallback
        className="-z-[1] object-cover object-left  md:object-top"
        src="/images/footer-bg-shape.svg"
        alt="footer background"
        fill={true}
      />
      <div className="container text-center">
        <div className="mb-4 sm:mb-6 inline-flex">
          <Logo />
        </div>
        {markdownify(footer_content, "p", "max-w-[638px] mx-auto text-sm sm:text-base px-2")}

        {/* footer menu */}
        <ul className="mb-8 sm:mb-12 mt-4 sm:mt-6 flex-wrap space-x-1 sm:space-x-2 lg:space-x-4">
          {menu.footer.map((menu) => (
            <li className="inline-block" key={menu.name}>
              <Link
                href={menu.url}
                className="p-1 sm:p-2 text-sm sm:text-base font-bold text-dark hover:text-primary dark:text-darkmode-light lg:p-4"
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* social icons */}
        <div className="inline-flex">
          <Social source={social} className="socials mb-8 sm:mb-12 justify-center" />
        </div>
        {/* copyright */}
        {markdownify(copyright, "p", "text-sm sm:text-base")}
      </div>
    </footer>
  );
};

export default Footer;
