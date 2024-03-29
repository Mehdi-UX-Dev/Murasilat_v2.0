'use client';
import Image from 'next/image';
import ReactQuill from 'react-quill';
import { useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/UI_Molecules/Button';
import { useAppDispatch, useAppSelector } from '@/context/hooks';
import { GetQamariDate, GetShamsiDate } from '@/date-converter';
import { useRouter } from 'next/navigation';
import {
  BroadcastCreateProps,
  createBroadcast,
} from '@/context/features/broadcastSlice';
import { FaSpinner } from 'react-icons/fa';
import { localeProps } from '@/universalTypes';
import ErrorBox from '@/components/misc/errorBox';
import modules from '@/Quill.module.';
import { AiOutlinePlus } from 'react-icons/ai';

function Preview({ params: { locale } }: localeProps) {
  const quillRef = useRef<ReactQuill>(null);
  const [value, setValue] = useState<BroadcastCreateProps['value']>(undefined);
  const {
    user: { user },
    broadcast: { loading, error },
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!quillRef.current) return;
    quillRef.current.editor?.format('align', 'right');
    quillRef.current.editor?.format('direction', 'rtl');
    quillRef.current.editor?.format('size', 'large');
  }, []);

  const handleCancel = () => {
    router.push(`/${locale}/dashboard`);
  };

  const handleSubmit = () => {
    dispatch(
      createBroadcast({
        value,
        date: new Date().toISOString(),
        callback: () => router.replace(`/${locale}/dashboard`),
      })
    );
  };

  return !error ? (
    <div className="w-full min-h-screen h-auto bg-white p-8">
      <div className="bg-slate-50 rounded shadow flex flex-col p-8">
        {/* Header */}
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-start">
            <Image
              src={'/images/KabulUni.png'}
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
              src={'/images/moh.jpg'}
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
          <div className="flex flex-col items-end w-full pb-4">
            <input
              value={value?.title}
              onChange={({ target }) =>
                setValue((prev) => ({ ...prev, title: target.value }))
              }
              type="text"
              className="py-2 px-4 outline-1 w-full outline-slate-50 rounded text-xl"
              dir="rtl"
              placeholder="عنوان را بنویسید"
              required
            />
            <input
              value={value?.subject}
              onChange={({ target }) =>
                setValue((prev) => ({ ...prev, subject: target.value }))
              }
              type="text"
              className="py-2 px-4 outline-1 w-full outline-slate-50 rounded text-xl"
              dir="rtl"
              placeholder=" موضوع را بنویسید"
            />
          </div>
          {/*Editor */}
          <ReactQuill
            ref={quillRef}
            onChange={(newValue) => {
              setValue((prev) => ({ ...prev, content: newValue }));
            }}
            className="h-[80vh] mb-8"
            modules={modules}
            theme="snow"
            value={value?.content}
          />
          {/**Sadira Section */}
          <div className="flex items-center justify-between w-full pt-8">
            <input
              value={value?.remarks}
              onChange={({ target }) =>
                setValue((prev) => ({ ...prev, remarks: target.value }))
              }
              type="text"
              className="py-2 px-4 outline-1 w-1/2 outline-slate-50 rounded text-xl"
              dir="rtl"
              placeholder="ملاحظات را بنویسید"
              required
            />
            <input
              value={value?.summary}
              onChange={({ target }) =>
                setValue((prev) => ({ ...prev, summary: target.value }))
              }
              type="text"
              className="py-2 px-4 outline-1 w-1/2 outline-slate-50 rounded text-xl"
              dir="rtl"
              placeholder="خلاصه را بنویسید"
              required
            />
          </div>
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

      <div className="flex items-center  justify-end ">
        <div className="relative order-2 ">
          <label
            htmlFor="selector"
            className="flex w-fit items-center space-x-2 cursor-pointer border border-black  hover:bg-primary-700  hover:text-white font-bold py-3 px-6  rounded-lg"
          >
            <p>انتخاب سند</p>
            <AiOutlinePlus size={16} />
          </label>
          <input
            id="selector"
            type="file"
            name="attachment"
            className="hidden"
            onChange={(data) => {
              const file = data.target.files?.[0];
              if (file) {
                setValue((prev) => ({
                  ...prev,
                  attachments: file,
                }));
              }
            }}
          />
        </div>
        <p className="order-1 pr-4">{value?.attachments?.name}</p>
      </div>

      <div className="p-8 w-full space-x-4 flex justify-end">
        <Button
          intent={'secondary'}
          size={'medium'}
          width={'half'}
          label="بازگشت"
          handleClick={handleCancel}
          loading={loading}
        />
        {loading ? (
          <div className="bg-primary-700 text-white rounded text-[18px] px-4 py-[12px]">
            <FaSpinner size={22} className="animate-spin m-auto text-white" />
          </div>
        ) : (
          <Button
            intent={'primary'}
            size={'medium'}
            width={'half'}
            label="ارسال"
            handleClick={handleSubmit}
          />
        )}
      </div>
    </div>
  ) : (
    <ErrorBox message={error.message} />
  );
}

export default Preview;
