import React from "react";

function IstilamFormat({ body }: { body: string | undefined }) {
  return (
    <div className="flex row-span-3 h-full my-2 mx-2 ">
      <div className="border-4 w-full h-full border-black">
        <div className="border-b-4 h-10 border-black text-center">احکام</div>
        <div></div>
      </div>
      <div className="border-4 w-full relative  h-full border-black">
        <div className="border-b-4  h-10 border-black text-center  ">
          پیشنهاد
        </div>
        <div className="h-full top-0 right-0 w-5 absolute border-l-4 border-black"></div>
        <div>jkldfk</div>
      </div>
    </div>
  );
}

export default IstilamFormat;
