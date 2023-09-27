"use client";

import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";
import PDFTemplate from "@/components/pdf/pdfTemplate";
import { langProps_PDF } from "@/universalTypes";

const PDF = ({ params: { locale } }: { params: { locale: Locale } }) => {
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
    <div id="myElement" className="space-y-4">
      <div>
        <h1 className="font-sans text-center text-4xl font-bold mb-8">
          Todo List
        </h1>
        <div className="flex ml-20 space-x-40 text-2xl font-sans font-semibold ">
          <h1>Day:</h1>
          <h1>Date:</h1>
        </div>

        <table className="mx-auto w-11/12  mt-8  text-center">
          <thead className="bg-primary-100">
            <tr className="">
              <th className="border w-40 p-2 ">Time</th>
              <th className="border p-2 ">Task</th>
            </tr>
          </thead>

          <tbody>
            <tr className=" ">
              <td className="border p-5 border-primary-700"></td>
              <td className="border p-5 border-primary-700"></td>
            </tr>
            <tr className="">
              <td className="border p-5 border-primary-700"></td>
              <td className="border p-5 border-primary-700"></td>
            </tr>
            <tr className="">
              <td className="border p-5 border-primary-700"></td>
              <td className="border p-5 border-primary-700"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/*  */}
      <div>
        <h1 className="font-sans text-center text-4xl font-bold mb-8">
          Todo List
        </h1>
        <div className="flex ml-20 space-x-40 text-2xl font-sans font-semibold ">
          <h1>Day:</h1>
          <h1>Date:</h1>
        </div>

        <table className="mx-auto w-11/12  mt-8  text-center">
          <thead className="bg-primary-100">
            <tr className="">
              <th className="border w-40 p-2 ">Time</th>
              <th className="border p-2 ">Task</th>
            </tr>
          </thead>

          <tbody>
            <tr className=" ">
              <td className="border p-5 border-primary-700"></td>
              <td className="border p-5 border-primary-700"></td>
            </tr>
            <tr className="">
              <td className="border p-5 border-primary-700"></td>
              <td className="border p-5 border-primary-700"></td>
            </tr>
            <tr className="">
              <td className="border p-5 border-primary-700"></td>
              <td className="border p-5 border-primary-700"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/*  */}
      <div>
        <h1 className="font-sans text-center text-4xl font-bold mb-8">
          Todo List
        </h1>
        <div className="flex ml-20 space-x-40 text-2xl font-sans font-semibold ">
          <h1>Day:</h1>
          <h1>Date:</h1>
        </div>

        <table className="mx-auto w-11/12  mt-8  text-center">
          <thead className="bg-primary-100">
            <tr className="">
              <th className="border w-40 p-2 ">Time</th>
              <th className="border p-2 ">Task</th>
            </tr>
          </thead>

          <tbody>
            <tr className=" ">
              <td className="border p-5 border-primary-700"></td>
              <td className="border p-5 border-primary-700"></td>
            </tr>
            <tr className="">
              <td className="border p-5 border-primary-700"></td>
              <td className="border p-5 border-primary-700"></td>
            </tr>
            <tr className="">
              <td className="border p-5 border-primary-700"></td>
              <td className="border p-5 border-primary-700"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PDF;
