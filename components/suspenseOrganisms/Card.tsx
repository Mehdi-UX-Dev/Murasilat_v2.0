import React from "react";

function CardSuspense() {
  return (
    <div className="border  animate-pulse border-light shadow-md rounded-md w-[442px] p-8 space-y-6 ">
      <div className="flex justify-between items-center">
        {/* date and number */}
        <div>
          <div className=" space-y-2">
            <div className="bg-primary-700 rounded h-2 w-12 "></div>
            <div className="bg-primary-700 rounded h-2 w-12 "></div>
          </div>
        </div>

        {/* ame and text */}
        <div className="flex items-center space-x-2">
          <div className=" space-y-2">
            <div className="bg-primary-700 rounded h-2 w-12 "></div>
            <div className="bg-primary-700 rounded h-2 w-12 "></div>
          </div>
          <div className="bg-primary-700 rounded-full w-14 h-14 "></div>
        </div>
      </div>
      {/* title and summary */}
      <div dir="rtl" className=" space-y-3">
        <div className="bg-primary-700 rounded h-2 w-44 "></div>
        <div className="bg-primary-700 rounded h-2 w-44 "></div>
      </div>

      {/* button */}
      <div className="bg-primary-700 rounded h-6 w-64 mx-auto "></div>
    </div>
  );
}

export default CardSuspense;
