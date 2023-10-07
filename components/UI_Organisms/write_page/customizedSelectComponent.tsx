import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import Person from "@/components/UI_Molecules/personSendList";
import SelectedPerson from "@/components/UI_Molecules/personSelectedAvatar";
import { DocValueTypes, personProps } from "@/app/[locale]/(app_pages)/create/[type]/page";


//* type person is used several times, so export it as a default type to reduce redundancy 


type recieverListProps ={
  recieverList : Array<personProps>, 
  setDocValue : React.Dispatch<React.SetStateAction<DocValueTypes>>
}

function CustomizedSelectComponent({recieverList, setDocValue} : recieverListProps) {
  const [listVisbile, setListVisible] = useState(true);
  const showList = () => {
    setListVisible(!listVisbile);
  };
  // const [personInfo, setPersonInfo] = useState<personProps[]>([]);

  const [selectedPerson, setSelectedPerson] = useState([])
  return (
    <div
      dir="rtl"
      className="relative grow text-end pr-4 border-l border-primary-400 h-16 py-4 ml-2"
    >
      <div
        className="flex items-center justify-between pl-2"
        onClick={showList}
      >
        <div className="flex items-center">
          <p> ارسال به</p>
          <BsChevronDown className="mr-3" />
        </div>
        {selectedPerson.map((person) => (
          <SelectedPerson key={1} info={person} length={recieverList.length} removeSelectedPerson={setDocValue} />
        ))}
      </div>
      <div
        hidden={listVisbile}
        className="bg-primary-100 shadow-lg w-72  py-4  space-y-4 "
      >
          {recieverList.map((person) => (
          <Person key={person.id} info={person}   />
        ))}
        {/* <Person setPersonInfo={setDocValue} /> */}
        <div className="border border-primary-400" />
      </div>
    </div>
  );
}

export default CustomizedSelectComponent;
