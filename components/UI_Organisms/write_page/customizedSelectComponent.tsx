import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import Person from "@/components/UI_Molecules/personSendList";
import SelectedPerson from "@/components/UI_Molecules/personSelectedAvatar";

import { useAppSelector } from "@/context/hooks";
import { cx } from "class-variance-authority";

function CustomizedSelectComponent({ documentType }: { documentType: string }) {
  const { receivers, selectedReceiver } = useAppSelector(
    (store) => store.documents
  );

  const [listVisbile, setListVisible] = useState(true);
  const showList = () => {
    setListVisible(!listVisbile);
  };

  return (
    <div
      dir="rtl"
      className={cx(
        "relative   text-end pr-4 border-l border-primary-400 h-16 py-4 ",
        {
          "grow ml-2": documentType === "maktoob",
          "w-1/2 ml-auto": documentType !== "maktoob",
        }
      )}
    >
      <div
        className="flex items-center justify-between pl-2"
        onClick={showList}
      >
        <div className="flex items-center">
          <p> ارسال به</p>
          <BsChevronDown className="mr-3" />
        </div>
        {selectedReceiver && <SelectedPerson {...selectedReceiver} />}
      </div>
      <div
        hidden={listVisbile}
        className="bg-primary-100 relative z-10 shadow-lg w-72  py-4  space-y-4 "
      >
        {receivers.map((person) => (
          <Person key={person.id} info={person} />
        ))}
      </div>
    </div>
  );
}

export default CustomizedSelectComponent;
