import React from "react";
import Button from "components/button";
import ArrowRight from "assets/icons/arrow-right";

const SliderComponent = () => {
   return (
      <div className="flex flex-col items-center w-full text-center lg:w-6/12 lg:text-left lg:items-start">
         <h3 className="mb-4 font-normal text-gray-900 capitalize text-30px">
            <span className="font-bold">Bazaar</span> provides you
            <span className="block font-bold">Safe Delivery.</span>
         </h3>
         <p className="text-gray-500 mb-40px">
            Get items at your home within 30 minutes
         </p>
         <Button variant="elevation">
            <span className="mr-2">Shop Now</span> <ArrowRight width="13px" />
         </Button>
      </div>
   );
};

export default SliderComponent;
