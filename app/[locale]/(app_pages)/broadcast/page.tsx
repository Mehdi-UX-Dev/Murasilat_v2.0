'use client';
import Image from 'next/image';
import { logos } from './imageData';
import ReactQuill from 'react-quill';
import { useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/UI_Molecules/Button';
import { useAppSelector } from '@/context/hooks';
import { GetQamariDate, GetShamsiDate } from '@/date-converter';

function Preview() {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],

      [
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' },
      ],
      [{ direction: 'rtl' }, { direction: 'ltr' }],
    ],
  };
  const quillRef = useRef<ReactQuill>(null);
  const [value, setValue] = useState('');
  const { user } = useAppSelector((store) => store.user);
  const now = new Date().getTime();
  useEffect(() => {
    if (!quillRef.current) return;
    quillRef.current.editor?.format('align', 'right');
    quillRef.current.editor?.format('direction', 'rtl');
    quillRef.current.editor?.format('size', 'large');
  }, []);

  return (
    <div className="w-full min-h-screen h-auto bg-white p-8">
      <div className="bg-slate-50 rounded shadow flex flex-col p-8">
        {/* Header */}
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-start">
            <Image
              src={logos.university}
              width={100}
              height={100}
              alt="university logo"
              className="bg-slate-400 rounded-[50%]"
            />
            <div className="flex flex-col text-lg items-center ">
              <span>د کابل پوهنتون ریاست</span>
              <span>Kabul University</span>
              <span>{user?.authority}</span>
              <span>{user?.title}</span>
            </div>
            <Image
              src={logos.ministry}
              width={100}
              height={100}
              alt="ministry logo"
              className="bg-slate-400 rounded-[50%]"
            />
          </div>
          <div className="flex text-lg flex-col items-end">
            <p>
              شماره:
              <span className="opacity-50 text-base ">
                {' '}
                به صورت خودکار اظافه میشود
              </span>
            </p>
            <div className="flex justify-between w-full">
              <p>متحدالمال</p>
              <p>
                تاریخ: {GetShamsiDate()} ه.ش مطابق به {GetQamariDate()}
                ه.ق
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[2px] bg-slate-900" />
        {/* Body */}
        <div className="flex flex-col w-full py-8 h-screen">
          {/* Meta */}
          <div className="flex flex-col items-end w-full">
            <input
              type="text"
              className="py-2 px-4 outline-1 w-full outline-slate-50 rounded text-xl"
              dir="rtl"
              placeholder="عنوان را بنویسید"
            />
          </div>
          {/*Editor */}
          <ReactQuill
            ref={quillRef}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            className="h-[85%]"
            modules={modules}
            theme="snow"
            value={value}
          />
        </div>
        <div className="w-full h-[2px] bg-slate-900" />
        {/* Footer */}
        <div className="flex justify-between w-full p-4 text-sm font-semibold">
          <div className="flex items-end">
            <div className="h-16 w-16 bg-slate-600 flex items-center justify-center text-center text-slate-50">
              خودکار اظافه میشود
            </div>
            <p className="ml-4">
              لطفا این کود را اسکن نمایید تا فایل مربوطه باز گردد
            </p>
          </div>
          <div className="flex flex-col" dir="rtl">
            <p>آدرس: کارته چهار, کابل - افغانستان</p>
            <p>شماره تماس: 0202222222</p>
            <p>ایمیل: {user?.email}</p>
          </div>
        </div>
      </div>
      <div className="p-8 w-full space-x-4 flex justify-end">
        <Button
          intent={'secondary'}
          size={'medium'}
          width={'half'}
          label="لغو"
        />
        <Button
          intent={'primary'}
          size={'medium'}
          width={'half'}
          label="ارسال"
        />
      </div>
    </div>
  );
}

export default Preview;
