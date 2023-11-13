import CardSuspense from "@/components/suspenseOrganisms/Card";

export default function Loading() {
  return (
    <div dir="rtl" className=" fixed right-72">
      <div className="flex space-x-4  mt-8">
        <CardSuspense />
        <CardSuspense />
        <CardSuspense />
      </div>

      <div className="flex space-x-4  mt-8">
        <CardSuspense />
        <CardSuspense />
        <CardSuspense />
      </div>
    </div>
  );
}
