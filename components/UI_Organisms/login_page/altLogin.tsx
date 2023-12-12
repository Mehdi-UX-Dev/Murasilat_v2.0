import { InputField } from '../../UI_Molecules/Input';
import { Button } from '../../UI_Molecules/Button';
import React, { useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import Image from 'next/image';
import { PiUserSwitchBold } from 'react-icons/pi';
import { useAppDispatch, useAppSelector } from '@/context/hooks';
import { login, logout } from '@/context/features/loginSlice';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

function AltLogin({
  locale,
  ...lang
}: {
  password: string;
  submit: string;
} & { locale: string }) {
  const { user, error, loading } = useAppSelector((store) => store.user);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { password } = event.target;
    dispatch(
      login({
        email: user?.email,
        password: password.value,
        callback: () => router.replace(`/${locale}/dashboard`),
      })
    );
  };

  //! there is an error for directly injecting the pic into the code
  return (
    <div className=" drop-shadow-lg bg-white w-[560px] mx-auto px-4 py-20 ">
      <div className="flex justify-end mr-2">
        <button onClick={handleLogout}>
          <PiUserSwitchBold size={28} className="text-primary-600" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="max-w-[320px] mx-auto">
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
        <div className="flex flex-col mb-6">
          <div className="relative">
            <InputField
              direction={'ltr'}
              inputType={showPassword ? 'text' : 'password'}
              label={lang.password}
              fullWidth
              state={error ? 'ErrorState' : 'Default'}
              name="password"
            />
            <AiFillEye
              onClick={() => setShowPassword((current) => !current)}
              size={16}
              className={`absolute right-2 bottom-3 ${error && 'text-red-500'}`}
            />
          </div>
          <div
            role="alert"
            className="text-myAccent-error-300 "
            id="ErrorContainer"
          >
            {lang[error as keyof typeof lang]}
          </div>
        </div>
        {loading ? (
          <div className="bg-primary-700 text-white rounded text-base px-[10px] py-2 w-full">
            <FaSpinner size={22} className="animate-spin m-auto text-white" />
          </div>
        ) : (
          <Button
            type="submit"
            label={lang.submit}
            intent={'primary'}
            size={'medium'}
            width={'full'}
          />
        )}
      </form>
    </div>
  );
}

export default AltLogin;
