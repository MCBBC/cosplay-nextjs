import { EditCoserForm } from "@/app/ui/dashboard/coser/edit-form";

export default async function Page({
  params,
}: {
  searchParams?: {
    page?: string;
    query?: string;
  };
  params?: {
    id: string;
  };
}) {
  const coserInfo = {
    id: 0,
    name: "",
    slug: "",
    description: "",
    post_count: 0,
    avatar: "",
    background_image: "",
  };
  return (
    <>
      <EditCoserForm coserInfo={coserInfo} />
    </>
  );
}
