"use client";

import {
  clearSearch,
  documentDataType,
  fetchArchiveDocuments,
} from "@/context/features/archiveSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { GetShamsiDate } from "@/date-converter";
import { langProps_ARCHIVE, langProps_PDF } from "@/universalTypes";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Card from "../write_page/Card";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/UI_Molecules/Button";

function ListTable({
  setTable,
  type,
  locale,
  ...lang
}: langProps_ARCHIVE & {
  type: string;
  locale: string;
  setTable: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const { documents, searchedResults, isInSearch } = useAppSelector(
    (store) => store.archive
  );

  const dispatch = useAppDispatch();

  const paginate = ({ selected }: { selected: number }) =>
    setCurrentPage(selected + 1);

  useEffect(() => {
    dispatch(fetchArchiveDocuments({ type, page: currentPage }));
  }, []);

  useEffect(() => {
    setTable(document.getElementById("table"));
  });

  let data: documentDataType = {};
  if (isInSearch) {
    data = {
      results: searchedResults.results,
    };
  } else {
    data = { ...documents };
  }

  const { push } = useRouter();

  return data?.results?.length ? (
    <div>
      <div>
        <table
          id="table"
          className="w-11/12 text-center table-auto mt-8 border mx-auto  "
        >
          <thead className="border-b border-primary-500  bg-primary-900 text-white ">
            <tr className=" bg-light font-IranSans hover:cursor-pointer ">
              <th>{lang.date}</th>
              <th>{lang.title}</th>
              <th>{type === "sadira" ? "گیرنده" : lang.sender}</th>
              <th>{lang.content}</th>
              <th>{lang.number}</th>
            </tr>
          </thead>
          <tbody className="font-rounded ">
            {data?.results?.map((item: any) => (
              <tr
                key={item.document.serial}
                className="border-b border-primary-500 hover:bg-primary-400 hover:cursor-pointer py-2"
                onClick={() =>
                  push(`${item.document.document_type}/${item.document.serial}`)
                }
              >
                <td>{GetShamsiDate(item?.document?.date)}</td>
                <td>{item?.document?.title}</td>
                <td>
                  {type === "sadira"
                    ? item?.document?.receiver?.fullname
                    : item?.document?.sender?.fullname}
                </td>
                <td>{item?.summary}</td>
                <td>{item?.document?.serial}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {!isInSearch && (
          <ReactPaginate
            pageCount={Math.ceil((documents.count || 0) / 10)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={0}
            previousLabel={
              data.previous && (
                <TfiArrowCircleLeft
                  size={24}
                  className="hover:bg-black bg-white rounded-full hover:border hover:border-black hover:text-white"
                  onClick={() => setCurrentPage(currentPage - 1)}
                />
              )
            }
            nextLabel={
              data.next && (
                <TfiArrowCircleRight
                  size={24}
                  className="hover:bg-black bg-white rounded-full hover:border hover:border-black hover:text-white"
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              )
            }
            containerClassName={" flex justify-center gap-8 mt-8"}
            pageLinkClassName={
              " px-[8px] py-[1px] hover:border-b-2 hover:border-primary-900  "
            }
            previousLinkClassName={"font-bold"}
            nextLinkClassName={"font-bold"}
            activeLinkClassName={"border-b-4 border-primary-700 mt-1 "}
          />
        )}
      </div>
    </div>
  ) : (
    <div>
      <div className="">
        <h1 className="text-xl font-bold font-nazanin text-center mt-8">
          {lang.no_document}
        </h1>
      </div>
      <div className="flex justify-center mt-4">
        {isInSearch && (
          <Button
            intent={"primary"}
            handleClick={() => dispatch(clearSearch())}
            label="جستجو را پاک کنید"
          />
        )}
      </div>
    </div>
  );
}

export default ListTable;
