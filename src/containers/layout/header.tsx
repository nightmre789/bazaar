import { useContext } from "react";
import Link from "next/link";
import PhoneIcon from "assets/icons/phone";
import CartIcon from "assets/icons/cart-icon";
import Logo from "assets/icons/logo";
import Search from "components/search";
import { DrawerContext } from "contexts/drawer/drawer.provider";
import { useCart } from "contexts/cart/cart.provider";
import { useRouter } from "next/router";

export default function Header() {
   const router = useRouter();
   const { dispatch }: any = useContext(DrawerContext);
   const { itemsCount } = useCart();

   const showMenu = () => {
      dispatch({
         type: "OPEN_MENU",
         payload: {
            menu: true,
         },
      });
   };

   const showCart = () => {
      dispatch({
         type: "SLIDE_CART",
         payload: {
            open: true,
         },
      });
      dispatch({
         type: "TOGGLE_CART_VIEW",
         payload: {
            showCart: true,
         },
      });
   };

   const isHome = router.pathname === "/";

   return (
      <header className="fixed z-20 flex items-center w-full text-gray-700 bg-white shadow-mobile body-font h-90px lg:shadow-header pr-20px md:pr-30px lg:pr-40px">
         <button
            aria-label="Menu"
            className="flex flex-col items-center justify-center flex-shrink-0 h-full outline-none menuBtn w-50px focus:outline-none lg:w-90px"
            onClick={showMenu}
         >
            <span className="menuIcon">
               <span className="bar" />
               <span className="bar" />
               <span className="bar" />
            </span>
         </button>

         <Link href="/">
            <a className="hidden mx-auto lg:mr-10 lg:flex">
               <span className="sr-only">Bazaar</span>
               <Logo width="110px" id="medsy-header-logo" />
            </a>
         </Link>

         <div className="w-full ml-10px mr-20px lg:mr-10 lg:ml-auto lg:flex lg:justify-center">
            {isHome && <Search />}
         </div>

         <button
            className="relative flex items-center justify-center flex-shrink-0 h-auto focus:outline-none"
            onClick={showCart}
            aria-label="cart-button"
         >
            <div className="relative">
               <CartIcon width="20px" height="20px" />
               <span
                  className="absolute flex items-center justify-center text-white bg-gray-900 rounded-full w-18px h-18px"
                  style={{ fontSize: "10px", top: "-10px", right: "-10px" }}
               >
                  {itemsCount}
               </span>
            </div>
            <span className="hidden ml-3 text-base font-semibold md:flex text-14px">
               Basket{" "}
            </span>
         </button>
      </header>
   );
}
