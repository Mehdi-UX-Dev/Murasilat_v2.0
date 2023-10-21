import React from "react";

function Label({ type }: { type: string }) {
  let label = "";
  switch (type) {
    case "N":
      label = "عادی";
      break;
    case "U":
      label = "اضطراری";
      break;
    case "A":
      label = "اعلامیه";
      break;
    case "C":
      label = "محرمانه";
  }
  return <label htmlFor={type}>{label}</label>;
}

export default Label;
