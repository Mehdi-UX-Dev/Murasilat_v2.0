import { useAppSelector } from "@/context/hooks";
import React, { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "../write_page/Card";
import { cx } from "class-variance-authority";
import { langProps_DASHBOARD } from "@/universalTypes";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/navigation";

function StackCards({ type, ...lang }: langProps_DASHBOARD & { type: string }) {
  const { documents } = useAppSelector((store) => store.documents);
  const containerRef = useRef<HTMLDivElement>(null!);

  const scrollLeft = () => {
    containerRef.current.scrollLeft -= 100;
  };

  const scrollRight = () => {
    containerRef.current.scrollLeft += 100;
  };

  const { push } = useRouter();

  let title = "";
  let route = "";

  switch (type) {
    case "unreadDocuments":
      title = lang?.unread;
      route = "unread";
      break;

    case "sentRecently":
      title = lang.recently_sent;
      route = "archive/sadira";
      break;

    case "receivedRecently":
      title = lang.recently_received;
      route = "archive/warida";
      break;
  }
  return (
    <section className="mr-8">
      <div className="flex justify-between  mx-4">
        {
          <div
            className={cx(
              "space-x-4 items-center hover:text-primary-600 hover:cursor-pointer",
              {
                flex: documents[type as keyof typeof documents].length > 0,
                invisible:
                  documents[type as keyof typeof documents].length === 0,
              }
            )}
            onClick={() => push(route)}
          >
            <BsThreeDots size={24} />
            <p className="font-bold font-nazanin text-lg">مشاهده بیشتر</p>
          </div>
        }

        <div className="flex !justify-self-end  items-center space-x-3 mb-2">
          <div
            className={cx(
              "rounded-full relative  text-center font-semibold text-sm text-white ",
              {
                "bg-myAccent-error-300 w-5 h-5": type === "unreadDocuments",
                "bg-green-300 w-3 h-3": type === "receivedRecently",
                "bg-cyan-400 w-3 h-3": type === "sentRecently",
              }
            )}
          >
            {type === "unreadDocuments" && documents.unreadDocuments.length}
            {type === "unreadDocuments" && (
              <p className="h-4 w-4 absolute top-0.5 -z-10 left-0.5  animate-ping bg-myAccent-error-500 rounded-full"></p>
            )}
          </div>

          <h1 className="text-2xl font-IranSans font-bold ">{title}</h1>
        </div>
      </div>

      <div className="relative flex ">
        {documents[type as keyof typeof documents].length >= 3 && (
          <AiOutlineLeft
            className="absolute top-1/2 lg:left-2  border-2  border-primary-900 rounded-full p-1 bg-white hover:bg-primary-900  hover:text-white z-10"
            size={36}
            onClick={scrollLeft}
          />
        )}

        {documents[type as keyof typeof documents].length ? (
          <div
            ref={containerRef}
            className=" transition-transform duration-300 ease-in-out flex  space-x-4 max-w-screen-lg 2xl:max-w-screen-xl   ml-auto  overflow-x-auto py-2  scrollbar-hide "
          >
            {documents[type as keyof typeof documents].map((doc) => (
              <Card listType={type} key={doc.serial} doc={doc} locale="per" />
            ))}
          </div>
        ) : (
          <div className="w-full text-right text-lg font-IranSans pr-3 ">
            {lang.no_document}
          </div>
        )}

        {documents[type as keyof typeof documents].length >= 3 && (
          <AiOutlineRight
            className="absolute lg:right-3 top-1/2 border-2 border-primary-900 hover:bg-primary-900 bg-white hover:text-white  rounded-full p-1  z-10"
            size={36}
            onClick={scrollRight}
          />
        )}
      </div>
    </section>
  );
}

export default StackCards;
