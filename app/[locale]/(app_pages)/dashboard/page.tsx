"use client";

import Card from "@/components/UI_Organisms/write_page/Card";
import React, { useEffect, useRef, useState } from "react";
import { getDictionary } from "@/i18n-server";
import { useMyContext } from "@/hooks/credentialsContext";
import UserInfo from "@/components/UI_Organisms/user/userInfo";
import DashboardButton from "@/components/UI_Molecules/dashboradCreateButton";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  langProps_DASHBOARD,
  langProps_PDF,
  localeProps,
} from "@/universalTypes";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDocuments,
  hidePreview,
  saveToWarida,
} from "@/context/features/documentSlice";
import PDFTemplate from "@/components/pdf/pdfTemplate";
import { InputField } from "@/components/UI_Molecules/Input";
import { Button } from "@/components/UI_Molecules/Button";
import { useAppSelector } from "@/context/hooks";
import { MdOutlineCancel } from "react-icons/md";

function Dashboard({ params: { locale } }: localeProps) {
  const myContext = useMyContext();
  const containerRef = useRef<HTMLDivElement>(null!);
  const [pdfLang, setPdfLang] = useState<langProps_PDF>();

  const scrollLeft = () => {
    containerRef.current.scrollLeft -= 100;
  };

  const scrollRight = () => {
    containerRef.current.scrollLeft += 100;
  };
  const [lang, setDashLang] = useState<langProps_DASHBOARD | undefined>(
    undefined
  );
  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).dashboard;
      setDashLang(res);
      const pdfRes = (await getDictionary(locale)).pdf;
      setPdfLang(pdfRes);
    })();
  }, [locale]);

  const { documents, loading, error, pdf } = useAppSelector(
    (store) => store.documents
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDocuments());
  }, []);

  const [updateDocument, setUpdateDocument] = useState({
    content_update: "",
    summary: "",
    remarks: "",
  });

  return (
    lang && (
      <div className=" space-y-8" >
        {/* //? can not the user info be used in the layout ?? */}
        {/* {myContext?.userModuleState && (
          <div className=" fixed inset-0 z-20  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  ">
            <UserInfo />
          </div>
        )} */}

        {pdf.visible && (
          <div className=" overflow-auto fixed inset-0 z-20  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  ">
           
           <MdOutlineCancel size={24} onClick={() => dispatch(hidePreview())}/>
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
        )}

        <div className="flex justify-end space-x-4 text-right mt-8">
          <DashboardButton
            lang={lang}
            type="maktoob"
            path="/write/writeMaktoob"
          />
          <DashboardButton
            lang={lang}
            type="istilam"
            path="/write/writeIstilam"
          />
          <DashboardButton
            lang={lang}
            type="iishnihad"
            path="/write/writeIstilam"
          />{" "}
        </div>

        <div className="relative flex  ">
          {" "}
          <AiOutlineLeft
            className="absolute top-1/2 lg:left-2  text-primary-500 bg-primary-400 rounded-full p-1 bg-opacity-20 hover:bg-opacity-70 z-10"
            size={36}
            onClick={scrollLeft}
          />
          <div
            ref={containerRef}
            // transition is not working properly
            className=" transition-transform duration-300 ease-in-out flex  space-x-4 max-w-screen-lg 2xl:max-w-screen-xl   ml-auto  overflow-x-auto py-2 shadow-lg scrollbar-hide "
          >
            {documents.length && <Card {...documents[0]} />}
          </div>
          <AiOutlineRight
            className="absolute lg:right-3 top-1/2 text-primary-500 bg-primary-400 rounded-full p-1 bg-opacity-20 hover:bg-opacity-70 z-10"
            size={36}
            onClick={scrollRight}
          />
        </div>

        <div className="relative flex  ">
          {" "}
          <AiOutlineLeft
            className="absolute top-1/2 lg:left-2  text-primary-500 bg-primary-400 rounded-full p-1 bg-opacity-20 hover:bg-opacity-70 z-10"
            size={36}
            onClick={scrollLeft}
          />
          <div
            ref={containerRef}
            // transition is not working properly
            className=" transition-transform duration-300 ease-in-out flex  space-x-4 max-w-screen-lg 2xl:max-w-screen-xl   ml-auto  overflow-x-auto py-2 shadow-lg scrollbar-hide "
          ></div>
          <AiOutlineRight
            className="absolute lg:right-3 top-1/2 text-primary-500 bg-primary-400 rounded-full p-1 bg-opacity-20 hover:bg-opacity-70 z-10"
            size={36}
            onClick={scrollRight}
          />
        </div>
      </div>
    )
  );
}

export default Dashboard;
