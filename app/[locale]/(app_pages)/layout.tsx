import ID from "@/components/UI_Organisms/docs_group_pages/ID";
import SideBar from "@/components/UI_Organisms/docs_group_pages/sidebar";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";

export default async function DashboardLayout({
  children, // will be a page or nested layout
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const lang = (await getDictionary(locale)).dashboard;

  return (
    <div className="flex  flex-row-reverse min-h-screen">
      {/* Include shared UI here e.g. a header or sidebar */}
      <SideBar lang={lang} />

      <div className="grow px-8 pt-8">
        <ID />

        {children}
      </div>
    </div>
  );
}
