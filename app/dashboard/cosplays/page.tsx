import CosplaysTable from "@/app/ui/dashboard/cosplays/cosplays_table";
export default function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = searchParams?.page || 1;
  return (
    <>
      <div className="p-8">
        <CosplaysTable currentPage={currentPage} />
      </div>
    </>
  );
}
