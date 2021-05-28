import { useContext, useState } from "react";
import NumberFormat from "react-number-format";
import { DrawerContext } from "contexts/drawer/drawer.provider";
import { Scrollbar } from "components/scrollbar";
import ArrowLeft from "assets/icons/arrow-left";
import Input from "components/input";
import Button from "components/button";
import { useCart } from "contexts/cart/cart.provider";
import Textarea from "components/textarea";
import OrderSubmit from "./order-submit";
import {
   InputBase,
   TextBoxCommonBase,
   TextBoxEnable,
} from "components/utils/theme";
const initialState = {
   phone_number: "",
   name: "",
   address: "",
   postal_code: "",
   suite: "",
};

export default function Checkout() {
   const { dispatch } = useContext(DrawerContext);
   const [formData, setFormData] = useState(initialState);
   const [success, setSuccess] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const { items, calculatePrice, clearCart } = useCart();

   const hideCheckout = () => {
      dispatch({
         type: "TOGGLE_CHECKOUT_VIEW",
         payload: {
            showCheckout: false,
         },
      });
   };

   const submitOrder = async () => {
      const { name, address, postal_code, suite, phone_number } = formData;
      if (!phone_number.trim()) {
         setError({
            field: "phone_number",
            message: "Phone number is required",
         });
         return;
      }

      setLoading(true);

      const res = await fetch("/api/order", {
         method: "POST",
         body: JSON.stringify({
            items: items
               .map(item => `${item.name} - ${item.quantity}`)
               .toString(),
            address: `${name} ${address} ${postal_code} ${suite}`,
            phone_number: phone_number,
            email: "email@email.com",
            bill_amount: calculatePrice(),
         }),
      });
      if (res.status === 200) {
         setSuccess(true);
         clearCart();
         setLoading(false);
      } else {
         setError(true);
      }
   };

   const onChange = e => {
      const { value, name } = e.currentTarget;
      setFormData({
         ...formData,
         [name]: value,
      });
   };
   if (success) {
      return <OrderSubmit />;
   }
   return (
      <div className="flex flex-col w-full h-full">
         <div className="relative flex justify-center w-full px-30px py-20px">
            <button
               className="absolute flex items-center justify-center w-auto h-10 text-gray-500 transition duration-300 top-half -mt-20px left-30px focus:outline-none hover:text-gray-900"
               onClick={hideCheckout}
               aria-label="close"
            >
               <ArrowLeft />
            </button>
            <h2 className="m-0 font-bold text-24px">Checkout</h2>
         </div>

         <Scrollbar className="flex-grow checkout-scrollbar">
            <div className="flex flex-col px-30px pt-20px">
               <div className="flex flex-col mb-45px">
                  <span className="flex font-semibold text-gray-900 text-18px mb-15px">
                     Contact Information
                  </span>
                  <NumberFormat
                     format="+1 (###) ###-####"
                     mask="_"
                     placeholder="Mobile Phone Number"
                     className={`${InputBase} ${TextBoxCommonBase} ${TextBoxEnable}`}
                     value={formData.phone_number}
                     onValueChange={({ value }) =>
                        setFormData({
                           ...formData,
                           phone_number: value,
                        })
                     }
                  />
                  {error?.field === "phone_number" && (
                     <p className="font-semibold text-12px text-error pt-10px pl-15px">
                        {error.message}
                     </p>
                  )}
               </div>

               <div className="flex flex-col">
                  <span className="flex font-semibold text-gray-900 text-18px mb-15px">
                     Shipping Address
                  </span>
                  <Input
                     placeholder="Name"
                     className="mb-10px"
                     name="name"
                     value={formData.name}
                     onChange={onChange}
                  />

                  <Textarea
                     placeholder="Enter Address"
                     className="mb-10px"
                     name="address"
                     value={formData.address}
                     onChange={onChange}
                  ></Textarea>

                  <div className="flex items-center mb-10px">
                     <Input
                        placeholder="Postal Code"
                        style={{ width: "calc(50% - 5px)", marginRight: "5px" }}
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={onChange}
                     />
                     <Input
                        placeholder="Apartment, Suite, etc."
                        style={{ width: "calc(50% - 5px)", marginLeft: "5px" }}
                        name="suite"
                        value={formData.suite}
                        onChange={onChange}
                     />
                  </div>
               </div>
            </div>
         </Scrollbar>

         <div className="flex flex-col p-30px">
            <Button
               className="w-full big"
               onClick={submitOrder}
               loading={loading}
            >
               Order Now
            </Button>
         </div>
      </div>
   );
}
