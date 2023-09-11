import React from "react";

function DashboardDocumentButtonSuspense() {
  return (
    <div className="border border-primary-800 shadow rounded-md p-4 max-w-xs w-full">
      <div className="animate-pulse flex justify-end items-center space-x-4">
        <div className="rounded-full bg-primary-700 h-6 w-6"></div>

        <div dir="rtl" className="space-y-2">
          <div className="h-2 bg-slate-700 rounded w-24"></div>
          <div className="h-2 bg-slate-700 rounded w-40"></div>
        </div>
        <div className="rounded-full bg-primary-700 h-10 w-10"></div>
      </div>
    </div>
  );
}

export default DashboardDocumentButtonSuspense;
