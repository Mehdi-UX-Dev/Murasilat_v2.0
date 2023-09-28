"use client";

import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";
import { langProps_PDF } from "@/universalTypes";
import IstilamFormat from "@/components/pdf/istilamFormat";
import MaktoobFormat from "@/components/pdf/maktoobFormat";
import Image from "next/image";
import MOH from "../../../public/images/moh.jpg";
import kabulUni from "../../../public/images/KabulUni.png";
import { GetQamariDate, GetShamsiDate } from "@/date-converter";
import { usePathname } from "next/navigation";
import Label from "@/components/UI_Molecules/docTypeLabel_PDFTemplatePage";

const PDF = ({ params: { locale } }: { params: { locale: Locale } }) => {
  const shamsiDate = GetShamsiDate();
  const qamariDate = GetQamariDate();
  const path = usePathname();
  const docType = "normal";
  const body = "The quick brown fox jumps over the lazy dog";

  const [lang, setLang] = useState<langProps_PDF>();
  useEffect(() => {
    const generatePDF = async () => {
      const element = document.getElementById("myElement");

      // Generate HTML2PDF
      {
        html2pdf().from(element).toContainer().save();
      }
    };

    generatePDF();
  }, []);

  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).pdf;
      setLang(res);
    })();
  }, [locale]);

  return (
    <div id="myElement" className=" mt-auto  grid content-between grid-rows-5 bg-white">
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
              {path === "/write/writeMaktoob" && (
                <>
                  {" "}
                  <div className="flex gap-8  mr-10">
                    <div className="flex items-center space-x-3">
                      {Array.of(
                        "confidential",
                        "announcment",
                        "emergency",
                        "normal"
                      ).map((type) => (
                        <>
                          <div
                            key={type}
                            className="border rouned border-black w-8 h-5  relative"
                          >
                            {type == docType && (
                              <p className="absolute bottom-0 left-2 text-2xl font-bold ">
                                ✓
                              </p>
                            )}
                          </div>
                          <Label type={type} />
                        </>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <p>(1)</p>
                    <p>:{lang?.warida_num}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="w-full border-b-2 border-black  mt-4"></div>
      </section>

      {/* quill content  */}

      <IstilamFormat body={body} />

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

export default PDF;
