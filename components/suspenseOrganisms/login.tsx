import React from "react";

function LoginSuspense() {
  return (
    <div className="animate-pulse mt-8 mx-8">
      <div className="flex justify-between">
        <div className="h-16 w-16 rounded-full bg-primary-400"></div>
        <div className="flex space-x-4">
          <div className="h-16 w-16 rounded-full bg-primary-400"></div>
          <div className="h-16 w-16 rounded-full bg-primary-400"></div>
        </div>
      </div>

      <div className="bg-white  shadow-lg max-w-lg mx-auto mt-20 p-5">
        <div className="h-6 w-4/12 bg-primary-400 rounded mx-auto "></div>
        <div className="my-12">
          <div className="h-3 w-10 bg-primary-400 rounded ml-auto mr-20 mt-4 mb-2 "></div>
          <div className="h-10 w-8/12 bg-primary-400 rounded mx-auto "></div>
          <div className="h-3 w-10 bg-primary-400 rounded ml-auto mr-20 mt-4 mb-2  "></div>
          <div className="h-10 w-8/12 bg-primary-400 rounded mx-auto "></div>
        </div>

        <div className="h-10 w-6/12 bg-primary-400 rounded mx-auto mt-12"></div>
      </div>
    </div>
  );
}

export default LoginSuspense;
