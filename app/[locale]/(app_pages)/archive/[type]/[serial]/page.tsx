"use client";

import IstilamFormat from "@/components/pdf/istilamFormat";
import MaktoobFormat from "@/components/pdf/maktoobFormat";
import { localeProps } from "@/universalTypes";

function DocumentByID({
  params: { locale, type, serial },
}: {
  params: {
    type: "broadcast" | "istilam" | "maktoob" | "pishnihad";
    serial: number;
    locale : localeProps
  };
}) {
  return type === "maktoob" || type === "broadcast" ? (
    <MaktoobFormat type={type} serial={serial} />
  ) : (
    <IstilamFormat type={type} serial={serial} locale={locale}/>
  );
}

export default DocumentByID;
