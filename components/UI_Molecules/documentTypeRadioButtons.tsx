import React from "react";

function TypeGroup() {
  const handleRadioClick = (item: string) => {
    console.log(item);

    // setChecked({
    //   normal: item === "normal" ? true : false,
    //   confidential: item === "confidential" ? true : false,
    //   announcment: item === "announcment" ? true : false,
    //   emergency: item === "emergency" ? true : false,
    // });
  };

  return (
    <div className="flex justify-between w-1/2 max-w-lg mx-4 ">
      {/* Normal Button*/}
      <div
        onClick={() => handleRadioClick("normal")}
        className={`space-x-2   text-center `}
      >
        <label htmlFor="normal" className="text-lg ">
          عادی
        </label>
        <input
          type="radio"
          id="normal"
          name="docType"
          value="normal"
          className="bg-black !border-black border"
        />
      </div>

      {/* Emergency */}
      <div
        onClick={() => handleRadioClick("emergency")}
        className={`space-x-2   text-center `}
      >
        <label htmlFor="emergency">اضطراری</label>
        <input
          type="radio"
          id="emergency"
          name="docType"
          value="emergency"
          className="w-4 h-4"
        />
      </div>

      <div
        onClick={() => handleRadioClick("announcment")}
        className={`space-x-2    text-center`}
      >
        <label htmlFor="announcment">اعلامیه</label>
        <input
          type="radio"
          id="announcment"
          name="docType"
          value="announcment"
          className="w-4 h-4"
        />
      </div>

      {/* Confidential */}
      <div
        onClick={() => handleRadioClick("confidential")}
        className={`space-x-2    text-center`}
      >
        <label htmlFor="confidential">محرمانه</label>
        <input
          type="radio"
          id="confidential"
          name="docType"
          value="confidential"
          className="w-4 h-4"
        />
      </div>
    </div>
  );
}

export default TypeGroup;
