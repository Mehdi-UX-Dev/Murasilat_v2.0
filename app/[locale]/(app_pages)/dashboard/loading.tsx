import CardSuspense from "@/components/suspenseOrganisms/Card";
import DashboardDocumentButtonSuspense from "../../../../components/suspenseOrganisms/dashboardDocumentButton";

export default function Loading() {
  return (
    <div>
      <div className="flex space-x-4 justify-end mt-8">
        <DashboardDocumentButtonSuspense />
      </div>
      <div className="flex space-x-4 ">
        <CardSuspense/>
      </div>
    </div>
  );
}
