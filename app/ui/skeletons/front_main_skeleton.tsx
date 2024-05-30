import { BellIcon } from "@heroicons/react/24/outline";
import { CosplayListSkeleton } from "./image_group_skeleton";
export default function FrontMain() {
  return (
    <div className="w-full px-8">
      <div className="h-6"></div>
      <div className="flex items-center space-x-2 mb-6 p-2 rounded-lg border text-foreground text-sm">
        <BellIcon className="w-4 h-4" />
        <p>项目还未完工，有些许BUG</p>
      </div>
      <CosplayListSkeleton></CosplayListSkeleton>
    </div>
  );
}
