"use client";

import IstilamFormat from "@/components/pdf/istilamFormat";
import MaktoobFormat from "@/components/pdf/maktoobFormat";

function DocumentByID({
  params: { type, serial },
}: {
  params: {
    type: "broadcast" | "istilam" | "maktoob" | "pishnihad";
    serial: number;
  };
}) {
  return type === "maktoob" || type === "broadcast" ? (
    <MaktoobFormat type={type} serial={serial} />
  ) : (
    <IstilamFormat type={type} serial={serial} />
  );
}

export default DocumentByID;
