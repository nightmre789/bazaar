import { useContext } from "react";
import Link from "next/link";
import { Scrollbar } from "components/scrollbar";
import ActiveLink from "components/active-link";
import { DrawerContext } from "contexts/drawer/drawer.provider";
import CloseIcon from "assets/icons/close";
import Logo from "assets/icons/logo";
import {
   Facebook,
   Twitter,
   Youtube,
   Github,
   Instagram,
   Linkedin,
} from "assets/icons/social-icons";

const menus = [
   {
      id: 1,
      pathname: "https://medsy-modern.vercel.app/",
      title: "Bazaar Modern",
   },
   {
      id: 2,
      pathname: "/",
      title: "Bazaar Minimal",
   },
   {
      id: 3,
      pathname: "https://medsy-classic.vercel.app/",
      title: "Bazaar Classic",
   },
   {
      id: 4,
      pathname: "/faq",
      title: "FAQ",
   },
   {
      id: 5,
      pathname: "/terms",
      title: "Terms & Conditions",
   },
];

const social = [
   {
      id: 0,
      link: "/",
      icon: <Facebook />,
      className: "facebook",
      title: "facebook",
   },
   {
      id: 1,
      link: "/",
      icon: <Twitter />,
      className: "twitter",
      title: "twitter",
   },
   {
      id: 2,
      link: "/",
      icon: <Youtube />,
      className: "youtube",
      title: "youtube",
   },
   {
      id: 3,
      link: "/",
      icon: <Github />,
      className: "github",
      title: "github",
   },
   {
      id: 4,
      link: "/",
      icon: <Instagram />,
      className: "instagram",
      title: "instagram",
   },
   {
      id: 5,
      link: "/",
      icon: <Linkedin />,
      className: "linkedin",
      title: "linkedin",
   },
];

export default function DrawerMenu() {
   const { dispatch } = useContext(DrawerContext);
   const hideMenu = () => {
      dispatch({
         type: "OPEN_MENU",
         payload: {
            menu: false,
         },
      });
   };

   return (
      <>
         <div className="flex flex-col w-full h-full">
            <div className="relative flex items-center justify-start flex-shrink-0 w-full bg-gray-100 h-90px px-30px">
               <Link href="/">
                  <a className="flex" onClick={hideMenu}>
                     <span className="sr-only">Bazaar</span>
                     <Logo width="100px" id="medsy-menu-logo" />
                  </a>
               </Link>

               <button
                  className="absolute flex items-center justify-center text-gray-500 w-30px h-30px right-25px focus:outline-none"
                  onClick={hideMenu}
                  aria-label="close"
               >
                  <CloseIcon />
               </button>
            </div>

            <Scrollbar className="flex-grow menu-scrollbar">
               <div className="flex flex-col py-60px pb-40px lg:pb-60px">
                  {menus.map((menu, index) => (
                     <ActiveLink
                        href={menu.pathname}
                        activeClassName="font-semibold active"
                        key={index}
                     >
                        <a
                           className="relative pr-4 mb-8 text-gray-900 transition duration-300 ease-in-out menu-item pl-30px last:mb-0 hover:text-gray-900"
                           onClick={hideMenu}
                        >
                           {menu.title}
                        </a>
                     </ActiveLink>
                  ))}
               </div>
            </Scrollbar>

            <div className="flex items-center justify-start flex-shrink-0 h-12 bg-gray-100 border-t border-gray-300 px-30px lg:hidden">
               {social.map((item, index) => (
                  <a
                     href={item.link}
                     className={`social ${item.className}`}
                     target="_blank"
                     key={index}
                  >
                     <span className="sr-only">{item.title}</span>
                     {item.icon}
                  </a>
               ))}
            </div>
         </div>
      </>
   );
}
