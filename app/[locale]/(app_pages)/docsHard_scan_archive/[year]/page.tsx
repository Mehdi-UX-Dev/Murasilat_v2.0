import { getShelf } from "@/context/features/docsHard_scan_archive_Slice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import React, { useEffect } from "react";

function page({ params: { year } }: { params: { year: string } }) {
  const dispatch = useAppDispatch();
  const { shelf } = useAppSelector((store) => store.docsHard_scan_archive);

  useEffect(() => {
    dispatch(getShelf());
  }, []);
  return <div>{year}</div>;
}

export default page;
