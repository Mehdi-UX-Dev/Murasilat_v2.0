import { InputField } from '../../../components/UI_Molecules/Input';
import { Button } from '../../../components/UI_Molecules/Button';
import React, { useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import Image from 'next/image';
import { PiUserSwitchBold } from 'react-icons/pi';
import { useAppDispatch, useAppSelector } from '@/context/hooks';
import { logout } from '@/context/features/loginSlice';
import { useRouter } from 'next/navigation';

function CardV3({ ...lang }) {
  const { user, error } = useAppSelector((store) => store.user);
  const [showPassword, setShowPassword] = useState(false);
  const dispath = useAppDispatch();

  const router = useRouter();

  const handleLogout = () => {
    dispath(logout());
  };

  const expiryDate = new Date(user?.exp * 1000);
  const currentDate = new Date();

  // if (currentDate < expiryDate) {
  //   router.replace('/dashboard');
  // }

  return (
    <div className=" drop-shadow-lg bg-white w-[560px] mx-auto px-4 py-20 ">
      <div className="flex justify-end mr-2">
        <button onClick={handleLogout}>
          <PiUserSwitchBold size={28} className="text-primary-600" />
        </button>
      </div>
      <div className="max-w-[320px] mx-auto">
        <div className="mx-auto text-center mb-4">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_SERVER?.slice(0, -4)}${
              user?.profile_pic
            }`}
            alt="photo"
            width={160}
            height={160}
            className="rounded-full object-cover mx-auto mb-4"
          />
          <h3 className=" font-bold text-xl ">{user?.fullname}</h3>
          <h3 className=" font-semibold text-primary-600">{user?.title}</h3>
        </div>
        <div className="relative mb-6">
          <AiFillEye
            onClick={() => setShowPassword((current) => !current)}
            size={16}
            className={'absolute left-2 bottom-3'}
          />
          <InputField
            inputType={showPassword ? 'text' : 'password'}
            label={lang.password}
            fullWidth
            state={error ? 'ErrorState' : 'Default'}
            name="password"
          />
        </div>

        <Button
          type="submit"
          label={'Submit'}
          intent={'primary'}
          size={'medium'}
          fullWidth
        />
      </div>
    </div>
  );
}

export default CardV3;
