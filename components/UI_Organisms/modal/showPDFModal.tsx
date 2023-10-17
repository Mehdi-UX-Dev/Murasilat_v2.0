import { Button } from "@/components/UI_Molecules/Button";
import { InputField } from "@/components/UI_Molecules/Input";
import PDFTemplate from "@/components/pdf/pdfTemplate";
import { hidePreview, saveToWarida } from "@/context/features/documentSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { getDictionary } from "@/i18n-server";
import { langProps_PDF, localeProps } from "@/universalTypes";
import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

function PDF_DASHBOARD(locale) {
  const dispatch = useAppDispatch();
  const { documents } = useAppSelector((store) => store.documents);
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
    <div className=" overflow-auto fixed inset-0 z-20  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  ">
      <MdOutlineCancel size={24} onClick={() => dispatch(hidePreview())} />
      <div className="bg-white h-screen w-72 mr-4">
        <form
          onSubmit={(e) => {
            e.preventDefault(), console.log(documents[0]);

            dispatch(
              saveToWarida({
                id: documents[0].serial,
                ...updateDocument,
              })
            );
          }}
        >
          <InputField
            name="content_update"
            inputType="text"
            state="Default"
            label="make changes"
            fullWidth
            handleChange={(value, name) =>
              setUpdateDocument((prevState) => ({
                ...prevState,
                [name]: value,
              }))
            }
          />
          <InputField
            name="summary"
            inputType="text"
            state="Default"
            label="write summary"
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
            label="write considerations"
            fullWidth
            handleChange={(value, name) =>
              setUpdateDocument((prevState) => ({
                ...prevState,
                [name]: value,
              }))
            }
          />
          <Button type="submit" label="Save Changes" />
        </form>
      </div>
      <PDFTemplate
        {...pdfLang}
        body={documents[0].content}
        docType={documents[0].docType}
      />
    </div>
  );
}

export default PDF_DASHBOARD;
