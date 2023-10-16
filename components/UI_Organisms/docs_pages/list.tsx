"use client";

import { Button } from "@/components/UI_Molecules/Button";
import { clearSearch } from "@/context/features/archiveSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { GetShamsiDate } from "@/date-converter";
import { langProps_ARCHIVE } from "@/universalTypes";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

function ListTable({ type, ...lang }: langProps_ARCHIVE & { type: string }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { documents, searchedResults, isInSearch } = useAppSelector(
    (store) => store.archive
  );
  const dispatch = useAppDispatch();

  const paginate = ({ selected }: { selected: number }) =>
    setCurrentPage(selected + 1);

  let data = [];
  if (isInSearch) {
    data = [...searchedResults];
  } else {
    data = [...documents];
  }

  return data?.length ? (
    <div>
      <div>
        {/* table */}
        <table className="w-full text-center table-auto mt-8 shadow-lg">
          <thead className="border-b border-primary-500 bg-primary-500">
            <tr className=" bg-light font-IranSans ">
              <th>{lang.date}</th>
              <th>{lang.title}</th>
              <th>{type === "sadira" ? lang.sender : lang.search}</th>
              <th>{lang.content}</th>
              <th>{lang.number}</th>
            </tr>
          </thead>
          <tbody className="font-nazanin ">
            {data.map((item ) => (
              <tr
                key={item.document.serial}
                className="border-b border-primary-500"
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

        <ReactPaginate
          onPageChange={paginate}
          pageCount={4}
          pageRangeDisplayed={5}
          marginPagesDisplayed={0}
          previousLabel={"<<"}
          nextLabel={">>"}
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
      <div>No Documents</div>
      {isInSearch && (
        <Button
          intent={"primary"}
          fullWidth
          handleClick={() => dispatch(clearSearch())}
          label="Clear Search"
        />
      )}
    </div>
  );
}

export default ListTable;
