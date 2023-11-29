import { useAppSelector } from "@/context/hooks";
import { useRouter } from "next/navigation";
import React from "react";

function SearchedResults({ ...lang }) {
  const { searchedDocuments } = useAppSelector((store) => store.documents);
  const router = useRouter();

  return (
    <div className="absolute bg-white mt-2 rounded shadow-lg h-64 z-10 w-full space-y-2  overflow-auto">
      <div className="text-right mx-4 mt-2">
        <div className="flex items-center space-x-2 justify-end">
          <div className="bg-cyan-400 h-2 w-2 rounded-full "></div>
          <p className="font-bold font-rounded text-2xl">صادره </p>
        </div>
        {searchedDocuments?.sadira?.map((item, idx) => (
          <div
            key={item?.document?.serial}
            className="flex justify-end items-center "
          >
            <div
              onClick={() =>
                router.push(`archive/documents/${item.document.serial}`)
              }
              className="bg-white flex items-center justify-end space-x-4 shadow-lg grow p-1.5 rounded-md space-y-1 hover:bg-primary-300 hover:cursor-pointer "
            >
              <div>
                <p className="">
                  {item?.document?.serial}: {lang.doc_number}
                </p>
                <div className="flex justify-end space-x-10 ">
                  <p>
                    {item?.document?.title} : {lang.title}
                  </p>
                  <p>
                    {" "}
                    {lang.receiver}: {item?.document?.receiver?.fullname}{" "}
                  </p>
                </div>
              </div>

              <p>:{idx + 1}</p>
            </div>
          </div>
        ))}
      </div>{" "}
      <div className="border-b w-full mx-1"></div>
      <div className="text-right mx-4">
        <div className="flex items-center space-x-2 justify-end">
          <div className="bg-green-400 h-2 w-2 rounded-full "></div>
          <p className="font-bold font-rounded text-2xl">وارده </p>
        </div>

        {searchedDocuments?.warida?.map((item, idx) => (
          <div
            onClick={() =>
              router.push(
                `archive/${item.document.document_type}/${item.document.serial}`
              )
            }
            key={item?.document?.serial}
            className="bg-white flex items-center justify-end space-x-4 shadow-lg grow p-1.5 rounded-md space-y-1 hover:bg-primary-300 hover:cursor-pointer "
          >
            <div className="bg-white flex items-center justify-end space-x-4 shadow-lg grow p-1.5 rounded-md space-y-1 ">
              <div>
                <p className="">
                  {item?.document?.serial}: {lang.doc_number}
                </p>
                <div className="flex justify-end space-x-10 ">
                  <p>
                    {item?.document?.title} : {lang.title}
                  </p>
                  <p>
                    {" "}
                    {lang.receiver}: {item?.document?.sender?.fullname}{" "}
                  </p>
                </div>
              </div>

              <p>:{idx + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchedResults;
