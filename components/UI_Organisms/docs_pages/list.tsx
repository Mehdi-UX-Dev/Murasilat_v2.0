"use client";

import { langProps_ARCHIVE } from "@/universalTypes";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function ListTable({ ...lang }: langProps_ARCHIVE) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [Data, setData] = useState();

  useEffect(() => {
    const itemsPerPage = 10;
    // fetch("https://jsonplaceholder.typicode.com/posts").then((response) => {
    //   setData(response.data);
    //   setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    // });
  }, []);
  const paginate = ({ selected }: { selected: number }) =>
    setCurrentPage(selected + 1);
  console.log(currentPage);

  return (
    <div className="mr-[240px]">
      {/*  */}
      <div className="grow text-right mx-12">
        {/* <Id /> */}

        {/* table */}
        <table className="w-full table-auto mt-8 shadow-lg">
          <thead className="border-b border-primary-500 bg-primary-500">
            <tr className=" bg-light font-IranSans ">
              <th>{lang.date}</th>
              <th>{lang.title}</th>
              <th>{lang.sender}</th>
              <th>{lang.content}</th>
              <th>{lang.number}</th>
            </tr>
          </thead>
          <tbody className="font-nazanin ">
            <tr className="border-b border-primary-500">
              <td> 25/4/1402</td>
              <td>تایید راپور</td>
              <td>رییس پوهنحی</td>
              <td> راپور احصاییه اساتید</td>
              <td>1</td>
            </tr>
            <tr className="border-b border-primary-500">
              <td> 25/4/1402</td>
              <td>تایید راپور</td>
              <td>رییس پوهنحی</td>
              <td> راپور احصاییه اساتید</td>
              <td>1</td>
            </tr>
            <tr className="border-b border-primary-500">
              <td> 25/4/1402</td>
              <td>تایید راپور</td>
              <td>رییس پوهنحی</td>
              <td> راپور احصاییه اساتید</td>
              <td>1</td>
            </tr>{" "}
            <tr className="border-b border-primary-500">
              <td> 25/4/1402</td>
              <td>تایید راپور</td>
              <td>رییس پوهنحی</td>
              <td> راپور احصاییه اساتید</td>
              <td>1</td>
            </tr>
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
          pageLinkClassName={" px-[8px] py-[1px] hover:border-b-2 hover:border-primary-900  "}
          previousLinkClassName={"font-bold"}
          nextLinkClassName={"font-bold"}
          activeLinkClassName={"border-b-4 border-primary-900 "}
        />
      </div>
    </div>
  );
}

export default ListTable;
