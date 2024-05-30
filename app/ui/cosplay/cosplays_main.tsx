import { Pagination } from "@nextui-org/react";
import { BreadcrumbsComponents } from "../breadcrumbs/breadcurmbs";

import { CosplayList } from "./cosplay_list";

export default function CosplayMain() {
  return (
    <>
      <Pagination showControls total={10} initialPage={1} />
    </>
  );
}
