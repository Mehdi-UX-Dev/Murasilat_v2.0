"use client";

import { getDocumentBySerial } from "@/context/features/docsHard_scan_archive_Slice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import React, { useEffect } from "react";

function page({
  params: { year, shelf, serial },
}: {
  params: {
    year: number;
    shelf: number;
    serial: number;
  };
}) {
  // const dispatch = useAppDispatch();
  // const { documentDetail } = useAppSelector(
  //   (store) => store.docsHard_scan_archive
  // );

  // useEffect(() => {
  //   dispatch(getDocumentBySerial({ year, shelf, serial }));
  // }, []);

  // console.log(documentDetail);

  return (
    <div>
      <h1>hi</h1>
      {/* <div>
        <iframe
          src={`${process.env.NEXT_PUBLIC_MEDIA_SERVER}documentDetail[0].archived_document`}
          title="File Viewer"
          width="500"
          height="500"
        ></iframe>
      </div> */}
    </div>
  );
}

export default page;
