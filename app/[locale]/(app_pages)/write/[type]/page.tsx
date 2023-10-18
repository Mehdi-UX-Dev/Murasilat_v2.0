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
import { GetShamsiDate } from '@/date-converter';
import PDFTemplate from '@/components/pdf/pdfTemplate';
import {
  langProps_PDF,
  langProps_WRITE,
  localeProps,
  writtenDocumentValues_PROPS,
} from '@/universalTypes';
import axios from 'axios';
import {
  fetchReceivers,
  writeDocument,
} from '@/context/features/documentSlice';
import { useAppDispatch, useAppSelector } from '@/context/hooks';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

function FileSelector({ files, setFiles }) {
  const handleFileChange = (event) => {
    const allFiles = [...files, ...event.target.files];
    setFiles(allFiles);
  };

  return (
    <div>
      <label htmlFor="selector">File selector</label>
      <input id="selector" type="file" onChange={handleFileChange} />

      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}

function Page({ params: { locale } }: localeProps) {
  // Create a new Date object representing the current date
  const shamsiDate = GetShamsiDate();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { selectedReceiver, loading } = useAppSelector(
    (store) => store.documents
  );

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/users/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('TOKENS'))?.access,
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
    attachments: [],
  });

  const handleDocSumbit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(
      writeDocument({
        documentData: { ...docValue, receiver: selectedReceiver.id },
        callback: () => {
          router.replace('/archive/sadira');
        },
      })
    );
  };

  const [lang, setLang] = useState<langProps_WRITE>();
  const [pdfLang, setPdfLang] = useState<langProps_PDF>();
  const [showPdfModal, setShowPdfModal] = useState(false);

  useEffect(() => {
    (async () => {
      const dictionary = await getDictionary(locale);
      setLang(dictionary.Write_Page);
      setPdfLang(dictionary.pdf);
    })();
  }, [locale]);

  useEffect(() => {
    if (recieverList.length) return;
    dispatch(fetchReceivers());
  }, [dispatch, recieverList.length]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;
    setDocValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (files: File[]) => {
    setDocValue((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
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
            onChange={handleInputChange}
          />
        </div>
        <FileSelector
          files={docValue.attachments}
          setFiles={handleFileChange}
        />
        <div className="flex justify-end space-x-4">
          <Button
            loading={loading}
            intent="secondary"
            label={lang?.preview_draft}
            handleClick={handleDocumentPreviewModal}
          />

          {loading ? (
            <div className="bg-primary-700 text-white rounded text-[18px] px-4 py-[12px]">
              <FaSpinner size={22} className="animate-spin m-auto text-white" />
            </div>
          ) : (
            <Button label={lang?.send_document} size="large" type="submit" />
          )}
        </div>
        {/*  */}
      </form>
    </div>
  );
}

export default Page;
