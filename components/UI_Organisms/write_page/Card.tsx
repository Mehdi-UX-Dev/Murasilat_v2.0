import React, { ReactNode, useEffect, useState } from "react";
import { MdBookmarkBorder } from "react-icons/md";
import Image from "next/image";
import { Button } from "../../UI_Molecules/Button";
import { GetShamsiDate } from "@/date-converter";
import {
  BsArrowDownCircle,
  BsArrowUpCircle,
  BsBookmarkFill,
} from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/context/hooks";
import {
  deleteFromBookMark,
  saveToBookMark,
  showBookmarkModal,
} from "@/context/features/documentSlice";
import { langProps_ARCHIVE, langProps_DASHBOARD } from "@/universalTypes";

//! docDataType did not correpond correctly and we had errors
type docDataType = {
  sender: {
    fullname: string;
    authority: { title: string };
    profile_pic: string;
  };
  receiver: {
    fullname: string;
    authority: { title: string };
    profile_pic: string;
  };
  document_type?: string;
  serial: number;
  date: string;
  title: string;
  read?: boolean;
  bookmarked?: boolean;
};

function Card({
  listType,
  lang,
  doc,
}: {
  lang?: langProps_ARCHIVE;
  listType: string;
  doc: any;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const path = usePathname();

  const [personData, setPersonDate] = useState({
    fullname: "",
    authority: "",
    picture: "",
  });

  useEffect(() => {
    if (
      listType === "receivedRecently" ||
      listType === "unreadDocuments" ||
      path == "/per/archive/warida" ||
      path === "/ps/archive/warida"
    ) {
      setPersonDate({
        fullname: doc.sender.fullname,
        authority: doc.sender.authority.title,
        picture: doc.sender.profile_pic,
      });
    } else if (
      listType === "sentRecently" ||
      path === "/per/archive/sadira" ||
      path === "/ps/archive/sadira"
    ) {
      setPersonDate({
        fullname: doc.receiver.fullname,
        authority: doc.receiver.authority.title,
        picture: doc.receiver.profile_pic,
      });
    }
  }, []);

  return (
    <div className="border  relative flex-shrink-0 border-light shadow-md rounded-md w-[442px] p-8">
      {listType === "receivedRecently" ||
        path === "/per/archive/warida" ||
        (path === "/ps/archive/warida" && (
          <BsArrowDownCircle
            size={20}
            className="absolute left-1 top-1 rounded-full  text-white bg-green-400"
          />
        ))}

      {(listType === "sentRecently" ||
        path === "/per/archive/sadira" ||
        path === "/ps/archive/sadira") && (
        <BsArrowUpCircle
          size={20}
          className="absolute left-1 top-1 rounded-full  text-white bg-cyan-400"
        />
      )}

      <div className="flex justify-between items-center">
        <div className="text-center">
          <p className="font-bold text-lg">{doc?.serial}</p>
          <p className="">{GetShamsiDate(doc?.date)}</p>
          <p>{lang?.[doc.document_type as keyof typeof lang]}</p>
        </div>

        <div className="flex space-x-[16px]">
          <div className="text-right">
            <p className="font-semibold text-xl">{personData.fullname}</p>
            <p>{personData.authority}</p>
          </div>
          <Image
            src={personData.picture}
            alt="ID"
            className=" object-cover rounded-full"
            width={48}
            height={48}
          />
        </div>
      </div>

      <div className="py-6 space-y-[8px] text-right">
        <h2 className="font-bold text-[24px]">{doc.title}</h2>
        {/* //? should there be a summary */}
        <p className="text-medium">خلاصه: کمیسیون اعطا شد</p>
      </div>

      <div className="flex items-center ml-auto space-x-4">
        {doc.read && (
          <>
            {doc?.bookmarked ? (
              <BsBookmarkFill
                size={32}
                className="text-yellow-400 hover:scale-110"
                onClick={() => {
                  dispatch(showBookmarkModal());
                  dispatch(deleteFromBookMark(doc.serial));
                }}
              />
            ) : (
              <MdBookmarkBorder
                className="hover:scale-110"
                size={48}
                onClick={() => {
                  dispatch(showBookmarkModal()),
                    dispatch(
                      saveToBookMark({
                        documentType: doc.document_type as string,
                        documentId: doc.serial,
                      })
                    );
                }}
              />
            )}
          </>
        )}

        <Button
          intent="secondary"
          label="بخوان"
          size="medium"
          handleClick={() => {
            router.push(`archive/${doc.document_type}/${doc.serial}`);
          }}
          width={"full"}
        />
      </div>
    </div>
  );
}

export default Card;
