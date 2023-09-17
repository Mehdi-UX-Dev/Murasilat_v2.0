"use client";

import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import Image from "next/image";
import kabulUni from "../../../public/images/KabulUni.png";
import MOH from "../../../public/images/moh.jpg";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";
import { GetShamsiDate, GetQamariDate } from "@/date-converter";

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
  const shamsiDate = GetShamsiDate();
  const qamariDate = GetQamariDate();
  const [lang, setLang] = useState<langProps>();
  useEffect(() => {
    const generatePDF = async () => {
      const element = document.getElementById("myElement");

      // Generate HTML2PDF
      {
        lang && html2pdf().from(element).toContainer().save();
      }
    };

    generatePDF();
  }, [lang]);

  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).pdf;
      setLang(res);
    })();
  }, [locale]);

  return (
    <div id="myElement" className="mx-4 grid grid-rows-5">
      {/*  */}
      <section id="header" className="row-span-1">
        <div className="flex justify-between mx-8 mt-4 text-center">
          <Image src={MOH} alt="person" className="h-24 w-24 object-cover" />
          <div className="font-semibold font-IranSans space-y-1">
            <p>د لوړو زده کړو وزارت</p>
            <p>د کابل پوهنتون ریاست</p>
            <p>د کمپیوټر ساینس پوهنځی</p>
            <p>دیپارتمنت انجنیری نرم افزار</p>
          </div>
          <Image
            src={kabulUni}
            alt="person"
            className="h-24 w-24 object-cover"
          />
        </div>

        <div className="flex justify-end mr-8 mt-2 space-y-4 ">
          <div className="pr-4">
            <div className="flex justify-end ">
              <p>(1)</p>
              <p>:{lang?.doc_number}</p>
            </div>
            <div className="flex justify-end space-x-1">
              <div className="flex space-x-2">
                <p> {qamariDate}</p>
                <p>:مطابق</p>
              </div>
              <div className="flex space-x-2">
                <p> {shamsiDate}</p>
                <p>:{lang?.doc_date}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex gap-8  mr-10">
                {[...Array(4)].map((_, k) => (
                  <div className="flex items-center space-x-1" key={k}>
                    <div className="border rouned border-black w-8 h-5  relative">{k === 1 && <p className="absolute bottom-0 left-2 text-2xl font-bold ">✓</p>}</div>
                    <label htmlFor="">{k}</label>
                  </div>
                ))}
              </div>
              <div className="flex space-x-1">
                <p>(1)</p>
                <p>:{lang?.warida_num}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-b-2 border-black  mt-4"></div>
      </section>

      {/*  */}
      <section id="body" className="row-span-3"></section>
      {/*  */}
      <section id="footer" className="row-span-1">
        <div className="w-full border-b border-black  mt-4"></div>

        <div className="flex justify-between mx-8">
          <div>
            <p>Computer Science Faculty of Kabul University</p>
            <p>Address: Karte Char Kabul University Road</p>
            <p>Phone: 0123456789</p>
            <p>website: www.csf.ku.edu</p>
          </div>
          <div className="text-end">
            <p>{lang?.faculty_info}</p>
            <p>{lang?.address}</p>
            <p>0123456789:{lang?.phone}</p>
            <p>www.csf.ku.edu:{lang?.webiste}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelloWorldPDF;
