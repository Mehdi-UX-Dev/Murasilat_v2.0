import { Button } from "@/components/UI_Molecules/Button";
import { InputField } from "@/components/UI_Molecules/Input";
import { saveToWarida } from "@/context/features/documentSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { getDictionary } from "@/i18n-server";
import { langProps_PDF, localeProps } from "@/universalTypes";
import React, { useEffect, useState } from "react";

function SabtWarida({ locale }: { locale: string }) {
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
    <form
      className="space-y-4 max-w-4xl ml-auto"
      onSubmit={(e) => {
        e.preventDefault(),
          dispatch(
            saveToWarida({
              id: pdf.serial,
              ...updateDocument,
              callback: () => {},
            })
          );
      }}
    >
      <h1 className="text-xl font-bold mb-4 text-right">ثبت وارده</h1>

      <div className="flex items-center space-x-6 justify-end ">
        <div>
          {" "}
          <label className="block text-right" htmlFor="content-update">
            {pdfLang?.make_changes}
          </label>
          <textarea
            dir="rtl"
            name="content_update"
            id="content_update"
            className="border border-black rounded"
            cols={30}
            rows={5}
            onChange={(event) => {
              setUpdateDocument((prevState) => ({
                ...prevState,
                content_update: event.target.value,
              }));
            }}
          ></textarea>
        </div>
        <div className="grow max-w-sm">
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
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" width={"half"} label={pdfLang?.save_changes} />
      </div>
    </form>
  );
}

export default SabtWarida;
