import ID from "@/components/UI_Organisms/ID";
import SideBar from "@/components/UI_Organisms/sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Include shared UI here e.g. a header or sidebar */}
      <SideBar />

      <div className="grow px-8 pt-8">
        <ID />

        {children}
      </div>
    </div>
  );
}
