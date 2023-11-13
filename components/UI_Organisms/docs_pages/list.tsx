"use client";

import { Button } from "@/components/UI_Molecules/Button";
import { clearSearch } from "@/context/features/archiveSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { GetShamsiDate } from "@/date-converter";
import { langProps_ARCHIVE, langProps_PDF } from "@/universalTypes";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Card from "../write_page/Card";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { useRouter } from "next/navigation";

function ListTable({
  showMethod,
  type,
  locale,
  ...lang
}: langProps_ARCHIVE & {
  type: string;
  showMethod: { cardType: boolean; tableType: boolean };
  locale: string;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfLang, setPdfLang] = useState<langProps_PDF>();
  const [pdfData, setPdfData] = useState({
    visiblility: false,
    body: "",
    urgency: "",
  });

  const { documents, searchedResults, isInSearch } = useAppSelector(
    (store) => store.archive
  );

  const dispatch = useAppDispatch();

  const paginate = ({ selected }: { selected: number }) =>
    setCurrentPage(selected + 1);

  let data: {
    document: {
      serial: string;
      date: string;
      title: string;
      receiver: {
        fullname: string;
      };
      sender: {
        fullname: string;
      };
    };
    summary: string;
  }[] = [];
  if (isInSearch) {
    data = [...searchedResults];
  } else {
    data = [...documents];
  }
  const router = useRouter();

  useEffect(() => {
    dispatch(clearSearch());
  }, [dispatch]);

  return data?.length ? (
    <div>
      <div>
        {/* table */}
        {showMethod?.tableType && (
          <table
            id="table"
            className="w-full text-center table-auto mt-8 border"
          >
            <thead className="border-b border-primary-500  bg-primary-900 text-white ">
              <tr className=" bg-light font-IranSans ">
                <th>{lang.date}</th>
                <th>{lang.title}</th>
                <th>{type === "sadira" ? lang.sender : lang.search}</th>
                <th>{lang.content}</th>
                <th>{lang.number}</th>
              </tr>
            </thead>
            <tbody className="font-rounded ">
              {data.map((item) => (
                <tr
                  key={item.document.serial}
                  className="border-b border-primary-500 hover:bg-primary-400"
                  onClick={() => router.push(`${type}/${item.document.serial}`)}
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
        )}

        <div className="flex justify-end mt-4">
          {showMethod?.cardType &&
            data.map((doc) => (
              console.log(doc),
              
              <Card
                listType=""
                lang={lang}
                key={doc.document.serial}
                {...doc.document}
              />
            ))}
        </div>

        <ReactPaginate
          onPageChange={paginate}
          pageCount={Math.ceil(documents.length / 10)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={0}
          previousLabel={
            <TfiArrowCircleLeft
              size={24}
              className="hover:bg-black bg-white rounded-full hover:border hover:border-black hover:text-white"
            />
          }
          nextLabel={
            <TfiArrowCircleRight
              size={24}
              className="hover:bg-black bg-white rounded-full hover:border hover:border-black hover:text-white"
            />
          }
          containerClassName={" flex justify-center gap-8 mt-8"}
          pageLinkClassName={
            " px-[8px] py-[1px] hover:border-b-2 hover:border-primary-900  "
          }
          previousLinkClassName={"font-bold"}
          nextLinkClassName={"font-bold"}
          activeLinkClassName={"border-b-4 border-primary-900 "}
        />
      </div>
    </div>
  ) : (
    <div>
      <div className="">
        <h1 className="text-xl font-bold font-nazanin text-center mt-8">
          {lang.no_document}
        </h1>
      </div>
      {isInSearch && (
        <Button
          intent={"primary"}
          handleClick={() => dispatch(clearSearch())}
          label="Clear Search"
        />
      )}
    </div>
  );
}

export default ListTable;
