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

      <div>
        {/* Id goes here */}
        {children}
      </div>
    </div>
  );
}
