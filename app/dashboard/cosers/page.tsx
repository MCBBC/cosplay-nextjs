import { BackupButton } from "@/app/ui/common/client-buttons";
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
    <div className="px-8">
      <BackupButton />
    </div>
  );
}
