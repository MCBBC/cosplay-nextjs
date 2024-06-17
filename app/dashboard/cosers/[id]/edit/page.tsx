import { EditCoserForm } from "@/app/ui/dashboard/coser/edit-form";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    query?: string;
  };
  params?: {};
}) {
  return (
    <>
      <EditCoserForm />
    </>
  );
}
