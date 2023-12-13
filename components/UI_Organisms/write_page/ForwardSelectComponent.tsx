import React, { useEffect, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import Person from '@/components/UI_Molecules/personSendList';
import SelectedPerson from '@/components/UI_Molecules/personSelectedAvatar';

import { useAppSelector } from '@/context/hooks';
import { cx } from 'class-variance-authority';
import axios from 'axios';
type receiverType = { id: number | any };

function ForwardSelectComponent({
  receiver,
  onSelectReceiver,
  documentType,
}: {
  documentType: string;
  receiver: any;
  onSelectReceiver: any;
}) {
  const [receivers, setReceivers] = useState<receiverType[]>([]);
  //   const [selectedReceiver, setSelectedReceiver] = useState<any>();

  const [listVisbile, setListVisible] = useState(true);
  const showList = () => {
    setListVisible(!listVisbile);
  };

  useEffect(() => {
    if (receivers.length) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/users/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            JSON.parse(localStorage.getItem('TOKENS') || '')?.access,
          accept: 'application/json',
        },
      })
      .then((response) => {
        setReceivers(response.data);
      });
  }, [receivers]);

  console.log('hekjkj');

  return (
    <div
      dir="rtl"
      className={cx(
        'relative   text-end pr-4 border-l border-primary-400 h-16 py-4 ',
        {
          'grow ml-2': documentType === 'maktoob',
          'w-1/2 ml-auto': documentType !== 'maktoob',
        }
      )}
    >
      <div
        className="flex items-center justify-between pl-2"
        onClick={showList}
      >
        <div className="flex items-center">
          <p>راجع به</p>
          <BsChevronDown className="mr-3" />
        </div>
        {receiver ? <SelectedPerson {...receiver} /> : 'گیرنده را انتخاب کنید'}
      </div>
      <div
        hidden={listVisbile}
        className="bg-primary-100 relative z-10 shadow-lg w-72  py-4  space-y-4 "
      >
        {receivers.map((person) => (
          <Person
            onClick={(target) => onSelectReceiver(target)}
            key={person.id}
            info={person}
          />
        ))}
      </div>
    </div>
  );
}

export default ForwardSelectComponent;
