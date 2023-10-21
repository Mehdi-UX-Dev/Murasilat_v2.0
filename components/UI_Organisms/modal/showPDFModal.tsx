import { Button } from "@/components/UI_Molecules/Button";
import { InputField } from "@/components/UI_Molecules/Input";
import PDFTemplate from "@/components/pdf/pdfTemplate";
import { hidePDF, saveToWarida } from "@/context/features/documentSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { getDictionary } from "@/i18n-server";
import { langProps_PDF } from "@/universalTypes";
import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

function PDF_DASHBOARD(locale) {
  const dispatch = useAppDispatch();
  const { pdf } = useAppSelector((store) => store.documents);
  const [pdfLang, setPdfLang] = useState<langProps_PDF>();

  useEffect(() => {
    (async () => {
      const pdfRes = (await getDictionary(locale)).pdf;
      setPdfLang(pdfRes);
    })();
  }, [locale]);

  const [updateDocument, setUpdateDocument] = useState({
    content_update: "",
    summary: "",
    remarks: "",
  });
  return (
    <div className=" overflow-auto fixed inset-0 z-20   bg-black bg-opacity-30 backdrop-blur-sm flex space-x-4 justify-center items-center  ">
      <MdOutlineCancel
        size={48}
        className="absolute  top-10 right-20 "
        onClick={() => dispatch(hidePDF())}
      />
      <PDFTemplate
        {...pdfLang}
        body={pdf.pdfContent.content}
        docType={pdf.pdfContent.urgency}
      />

      <div className="bg-white h-fit  p-10 w-96 mr-4">
        <h1 className="text-xl font-bold mb-4">ثبت وارده</h1>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault(),
              dispatch(
                saveToWarida({
                  id: pdf.pdfContent.serial,
                  ...updateDocument,
                })
              );
          }}
        >
          <label className="text-center w-full" htmlFor="content-update">{pdfLang?.make_changes}</label>
          <textarea
            name="content_update"
            id="content_update"
            className="border border-black rounded"
            cols={30}
            rows={10}
            onChange={() =>
              setUpdateDocument(
                (prevState) => (
                  console.log(prevState),
                  {
                    ...prevState,
                    //  prevSa: value,
                  }
                )
              )
            }
          ></textarea>
          <InputField
            name="summary"
            inputType="text"
            state="Default"
            label={pdfLang?.write_summary}
            fullWidth
            handleChange={(value, name) =>
              setUpdateDocument((prevState) => ({
                ...prevState,
                [name]: value,
              }))
            }
          />
          <InputField
            name="remarks"
            inputType="text"
            state="Default"
            label={pdfLang?.write_consideration}
            fullWidth
            handleChange={(value, name) =>
              setUpdateDocument((prevState) => ({
                ...prevState,
                [name]: value,
              }))
            }
          />
          <Button type="submit" width={"full"} label={pdfLang?.save_changes} />
        </form>
      </div>
    </div>
  );
}

export default PDF_DASHBOARD;
