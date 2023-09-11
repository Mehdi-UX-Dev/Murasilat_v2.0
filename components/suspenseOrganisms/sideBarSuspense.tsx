import React from "react";

function SideBarSuspense() {
  return (
    <div className="animate-pulse grid  content-between py-10 pr-5 shadow-lg w-[240px] ">
      <div className="space-y-2 mx-auto">
        <div className="rounded-full h-14 w-14 bg-primary-700"></div>
        <div className="h-2 w-14 bg-primary-700 rounded"></div>
      </div>

      <div className="space-y-20 mx-auto">
        {/* section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <div className="h-2 w-14 bg-primary-700 rounded"></div>
            <div className="rounded-full bg-primary-700 w-10 h-10 "></div>
          </div>
          <div className="flex items-center space-x-4 mx-auto">
            <div className="h-2 w-8 bg-primary-700 rounded"></div>
            <div className="rounded-full bg-primary-700 w-6 h-6 "></div>
          </div>
          <div className="flex items-center space-x-4 mx-auto">
            <div className="h-2 w-8 bg-primary-700 rounded"></div>
            <div className="rounded-full bg-primary-700 w-6 h-6 "></div>
          </div>
          <div className="flex items-center space-x-4 mx-auto">
            <div className="h-2 w-8 bg-primary-700 rounded"></div>
            <div className="rounded-full bg-primary-700 w-6 h-6 "></div>
          </div>
        </div>

        {/* section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <div className="h-2 w-14 bg-primary-700 rounded"></div>
            <div className="rounded-full bg-primary-700 w-10 h-10 "></div>
          </div>
          <div className="flex items-center space-x-4 mx-auto">
            <div className="h-2 w-8 bg-primary-700 rounded"></div>
            <div className="rounded-full bg-primary-700 w-6 h-6 "></div>
          </div>
          <div className="flex items-center space-x-4 mx-auto">
            <div className="h-2 w-8 bg-primary-700 rounded"></div>
            <div className="rounded-full bg-primary-700 w-6 h-6 "></div>
          </div>
          <div className="flex items-center space-x-4 mx-auto">
            <div className="h-2 w-8 bg-primary-700 rounded"></div>
            <div className="rounded-full bg-primary-700 w-6 h-6 "></div>
          </div>
        </div>

        {/* section */}
        <div className="flex items-center space-x-4">
          <div className="h-2 w-14 bg-primary-700 rounded"></div>
          <div className="rounded-full bg-primary-700 w-10 h-10 "></div>
        </div>
      </div>

      {/* section */}
      <div className="flex items-center space-x-4 mx-auto">
        <div className="h-2 w-14 bg-primary-700 rounded"></div>
        <div className="rounded-full bg-primary-700 w-10 h-10 "></div>
      </div>
    </div>
  );
}

export default SideBarSuspense;
