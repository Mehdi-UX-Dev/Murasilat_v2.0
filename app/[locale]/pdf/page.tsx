"use client";

import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import Image from "next/image";
import kabulUni from "../../../public/images/KabulUni.png";
import MOH from "../../../public/images/moh.jpg";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";
import  { GetShamsiDate, GetQamariDate } from "@/date-converter";

type langProps = {
  moh: string;
  kudirectorate: string;
  faculty_directorate: string;
  office: string;
  faculty_info: string;
  address: string;
  phone: string;
  webiste: string;
  doc_number: string;
  doc_date: string;
  warida_num: string;
};

const HelloWorldPDF = ({
  params: { locale },
}: {
  params: { locale: Locale };
}) => {
  const shamsiDate = GetShamsiDate()
  const qamariDate = GetQamariDate()
  useEffect(() => {
    const generatePDF = async () => {
      const doc = new jsPDF();
      const element = document.getElementById("myElement");

      // Generate HTML2PDF
      html2pdf().from(element).toContainer(doc).output("datauristring");
    };

    generatePDF();
  }, []);

  const [lang, setLang] = useState<langProps>();

  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).pdf;
      setLang(res);
    })();
  }, [locale]);

  return (
    <div id="myElement" className="text-center">
      <div className="flex justify-between mx-8 mt-6">
        <Image src={MOH} alt="person" className="h-24 w-24 object-cover" />
        <div className="font-semibold font-IranSans space-y-1">
          <p>د لوړو زده کړو وزارت</p>
          <p>د کابل پوهنتون ریاست</p>
          <p>د کمپیوټر ساینس پوهنځی</p>
          <p>دیپارتمنت انجنیری نرم افزار</p>
        </div>
        <Image src={kabulUni} alt="person" className="h-24 w-24 object-cover" />
      </div>

      <div className="flex justify-end ">
        <section>
          <div className="flex justify-end ">
            <p>(1)</p>
            <p>:{lang?.doc_number}</p>
          </div>
          <div className="flex space-x-1">
            <div className="flex space-x-2">
              <p> {qamariDate}</p>
              <p>:مطابق</p>
            </div>
            <div className="flex space-x-2">
              <p> {shamsiDate}</p>
              <p>:{lang?.doc_date}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelloWorldPDF;
