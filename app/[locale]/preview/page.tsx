'use client'
import modules from "@/Quill.module.";
import Image from 'next/image';
import { logos } from './imageData';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import "react-quill/dist/quill.snow.css";

function Preview() {
  const [value,setValue] = useState('')
  return (
    <div className="w-full h-full bg-slate-400">
      <div
        style={{
          height: '297mm',
          width: '210mm',
          margin: 'auto',
          padding: '10mm',
          backgroundColor: '#fff',
        }}
        className="flex flex-col"
      >
        <section
          style={{
            direction: 'rtl',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5mm',
            alignItems: 'center',
            position: 'relative',
            height: '80mm',
            padding: '5mm',
            width: '100%',
            margin: '0 auto',
            fontFamily: 'system-ui',
            fontSize: '4mm',
          }}
        >
          <Image
            src={logos.university}
            width={70}
            height={70}
            alt="university logo"
            className="bg-slate-400 rounded-[50%] absolute left-[30px]"
          />
          <Image
            src={logos.ministry}
            width={70}
            height={70}
            alt="ministry logo"
            className="bg-slate-400 rounded-[50%] absolute right-[30px]"
          />
          <span>د کابل پوهنتون ریاست</span>
          <span>Kabul University</span>
          <span>{'د کمپیوتر ساینس پوهنزی'}</span>
          <span>{'مدیریت تدریسی'}</span>
          <span>{'مدیریت تدریسی'}</span>
          <span
            style={{
              marginTop: '1mm',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              شماره:{' '}
              <span style={{ fontSize: '4mm', textDecoration: 'underline' }}>
                {'2'}
              </span>
            </span>
            <span>تعداد ضمایم: ۲</span>
          </span>
          <span
            style={{
              marginTop: '1mm',
              paddingBottom: '1mm',
              width: '100%',
              display: 'flex',
              justifyContent: 'spacebetween',
              borderBottom: '.5mm solid black',
            }}
          >
            <span>تاریخ: ۱۲-۱۲-۱۴۴۴ ه.ش مطابق به ۱۴۰۲-۲-۲ ه.ق</span>
            <span style={{ display: 'flex', gap: '0.5mm' }}>عادی</span>
          </span>

          <span
            style={{
              alignSelf: 'flex-start',
              direction: 'rtl',
              marginTop: '1mm',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '1mm' }}>
              به 
              <select name="to" id="to">
                <option value="shahidzai">شهیدزی</option>
                <option value="shahidzai">اسلمزی</option>
              </select>
            </div>
            <div style={{ fontWeight: 'bold' }}>
              موضوع: 
              <input type="text" />
            </div>
          </span>
        </section>

        <section className="h-[180mm] w-full p-[5mm]" style={{direction:'rtl'}}>
        <ReactQuill
            onChange={(newValue) => {
              setValue(newValue);
            }}
            className=""
            modules={modules}
            theme="snow"
            value={value}
          />
        </section>
        <section
          style={{
            padding: '1mm',
            paddingBottom: '0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            direction: 'rtl',
            borderTop: '.5mm solid black',
            width: '100%',
            margin: '0 auto',
            fontFamily: 'system-ui',
            fontSize: '3.5mm',
            height:"25mm"
            // background: 'blue',
          }}
        >
          <div>
            <p>آدرس: کارته چهار, کابل dfd - افغانستان</p>
            <p>
              صفحه <span className="pageNumber"></span>/
              <span className="totalPages"></span>
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '0.5mm',
              justifyContent: 'flex-start',
              fontSize: '2.5mm',
            }}
          >
            <div>
              <p>شماره تماس: 232323232</p>
              <p>ایمیل: me@meail.com</p>
              <p style={{ marginBottom: 0 }}>
                لطفا این کود را اسکن نمایید تا فایل مربوطه باز گردد
              </p>
            </div>
            <div className="h-[10mm] w-[10mm] bg-slate-600" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Preview;
