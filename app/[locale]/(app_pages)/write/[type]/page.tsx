'use client';

import { Button } from '@/components/UI_Molecules/Button';
import TypeGroup from '@/components/UI_Molecules/documentTypeRadioButtons';
import CustomizedSelectComponent from '@/components/UI_Organisms/write_page/customizedSelectComponent';
import modules from '../../../../../Quill.module.';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import "../../../../../app/quill.rtl.css";
import { getDictionary } from '@/i18n-server';
import UserInfo from '@/components/UI_Organisms/user/userInfo';
import { useMyContext } from '../../../../../hooks/credentialsContext';
import { GetShamsiDate } from '@/date-converter';
import PDFTemplate from '@/components/pdf/pdfTemplate';
import {
  PDFProps_PDFTemplate,
  langProps_PDF,
  langProps_WRITE,
  localeProps,
  writtenDocumentValues_PROPS,
} from '@/universalTypes';
import axios from 'axios';
import {
  fetchReceivers,
  selectReceiver,
  writeDocument,
} from '@/context/features/documentSlice';
import { useAppDispatch, useAppSelector } from '@/context/hooks';

function Page({ params: { locale } }: localeProps) {
  const myContext = useMyContext();
  // Create a new Date object representing the current date
  const shamsiDate = GetShamsiDate();
  const dispatch = useAppDispatch();
  const { selectedReceiver } = useAppSelector((store) => store.documents);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/users/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            JSON.parse(localStorage.getItem('TOKENS') || '')?.access,
          accept: 'application/json',
        },
      })
      .then(
        (res) => {
          setRecieverList(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
  }, []);

  const [recieverList, setRecieverList] = useState<object[]>([]);

  const [docValue, setDocValue] = useState<writtenDocumentValues_PROPS>({
    date: new Date(),
    urgency: 'N',
    content: '',
    title: '',
    summary: '',
  });

  const handleDocSumbit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(
      writeDocument({
        documentData: { ...docValue, receiver: selectedReceiver?.id },
        callback: () => {
          alert('Document created successfully');
        },
      })
    );
  };

  const [lang, setLang] = useState<langProps_WRITE>();
  const [pdfLang, setPdfLang] = useState<langProps_PDF>();
  const [showPdfModal, setShowPdfModal] = useState(false);

  useEffect(() => {
    (async () => {
      const writePageDocTypeResponse = (await getDictionary(locale)).Write_Page;
      setLang(writePageDocTypeResponse);
    })();
  }, [locale]);

  useEffect(() => {
    dispatch(fetchReceivers());
  }, []);

  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).pdf;
      setPdfLang(res);
    })();
  }, [locale]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;
    setDocValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDocumentPreviewModal: React.MouseEventHandler<
    HTMLButtonElement
  > = (event) => {
    event.preventDefault();
    setShowPdfModal(true);
  };

  const handleNot: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
  };

  return showPdfModal ? (
    <div
      onClick={() => {
        setShowPdfModal(false);
      }}
    >
      <div className="  fixed inset-0 overflow-auto bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <PDFTemplate
          {...pdfLang}
          body={docValue.content}
          docType={docValue.urgency}
        />
      </div>
    </div>
  ) : (
    <div>
      {myContext?.userModuleState && (
        <div className=" fixed inset-0  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  ">
          <UserInfo />
        </div>
      )}
      {/*  */}
      <form
        onSubmit={handleDocSumbit}
        className=" xl:w-[1024px] 2xl:w-[1200px]  mt-12 ml-4   "
      >
        <div className="border border-primary-400 mb-4">
          <div className="flex justify-between border border-b-0 border-primary-400 py-3 px-4 bg-primary-300 font-bold">
            <p>{shamsiDate}</p>
            {/* <p>01</p> */}
          </div>

          <div className="flex items-center border border-b-0 border-primary-300  pl-2 ">
            <TypeGroup setDocValue={setDocValue} />
            <CustomizedSelectComponent
              recieverList={recieverList}
              setDocValue={setDocValue}
            />
          </div>

          <input
            type="text"
            className="w-full border border-b-0 border-primary-400 pr-4 py-2"
            placeholder={lang?.title}
            dir="rtl"
            onChange={handleInputChange}
            name="title"
          />

          {/* the quill editor is still not good in design, needs work */}
          <ReactQuill
            onChange={(value) => {
              setDocValue((item: writtenDocumentValues_PROPS) => ({
                ...item,
                content: value,
              }));
            }}
            className="h-[23rem] overflow-hidden  "
            theme="snow"
            modules={modules}
            value={docValue.content}
          />

          <input
            type="text"
            className="w-full border-t  border-primary-400 pr-4 py-2"
            placeholder={lang?.summary}
            dir="rtl"
            name="summary"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            intent="secondary"
            label={lang?.preview_draft}
            handleClick={handleDocumentPreviewModal}
          />
          <Button label={lang?.send_document} size="large" type="submit" />
        </div>
        {/*  */}
      </form>
    </div>
  );
}

export default Page;
