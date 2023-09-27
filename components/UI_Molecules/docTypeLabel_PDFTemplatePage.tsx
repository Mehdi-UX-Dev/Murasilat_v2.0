import React from "react";

function Label({
  type,
}: {
  type: string
}) {
  let label = "";
  switch (type) {
    case "normal":
      label = "عادی";
      break;
    case "emergency":
      label = "اضطراری";
      break;
    case "announcment":
      label = "اعلامیه";
      break;
    case "confidential":
      label = "محرمانه";
  
  }
  return <label htmlFor={type}>{label}</label>;
}

export default Label;
