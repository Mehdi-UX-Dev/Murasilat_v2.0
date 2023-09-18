import CardSuspense from "@/components/suspenseOrganisms/Card";
import DashboardDocumentButtonSuspense from "../../../../components/suspenseOrganisms/dashboardDocumentButton";

export default function Loading() {
  return (
    <div dir="rtl" className=" fixed right-72">
      <div className="flex space-x-4  mt-8">
        <DashboardDocumentButtonSuspense />
        <DashboardDocumentButtonSuspense />
        <DashboardDocumentButtonSuspense />
      </div>
      <div className="flex space-x-4  mt-8">
        <CardSuspense />
        <CardSuspense />
      </div>
    </div>
  );
}
