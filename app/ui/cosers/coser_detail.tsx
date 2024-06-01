import Link from "next/link";
import { BreadcrumbsComponents } from "../breadcrumbs/breadcurmbs";
import {
  Image,
  Avatar,
  // Autocomplete,
  // AutocompleteItem,
} from "@nextui-org/react";
import { Suspense } from "react";
import { CoserDetailBackGroundSkeleton } from "../skeletons/cosers_skeleon";
import { CosplayList } from "./coser_show";
import { CustomPagination } from "../cosplay/pagination";
import { fetchCosplayPagesByCoserId } from "@/app/lib/fetch_data/data";
export async function CoserDetailMain({
  name,
  id,
  searchParams,
}: {
  name: string;
  id: number | string;
  searchParams?: {
    queryProduction?: string;
    queryCharacter?: string;
    page?: string;
  };
}) {
  const breads = [
    { path: "/front", name: "首页" },
    { path: "/front/cosers", name: "Cosers" },
    { path: "", name: name },
  ];
  const totalPages = await fetchCosplayPagesByCoserId({ coserId: id });

  return (
    <>
      <BreadcrumbsComponents breads={breads} />
      <CoserBackground coserId={id} />
      {/* <CoserDetailSearch /> */}
      <CosplayList
        coserId={id}
        currentPage={searchParams?.page}
        queryCharacter={searchParams?.queryCharacter}
        queryProduction={searchParams?.queryProduction}
      />
      {totalPages > 1 ? <CustomPagination totalPages={totalPages} /> : <></>}
    </>
  );
}

export function CoserBackground({ coserId }: { coserId: string | number }) {
  return (
    <Suspense fallback={<CoserDetailBackGroundSkeleton />}>
      <div className="w-full pb-1/4">
        <Image
          classNames={{
            img: "object-cover rounded-none w-full",
            wrapper: "w-full !max-w-full",
          }}
          src="https://image.sharecosplay.com/efdb34b1-3f6b-4a92-b979-cdb1c6b5698e"
          alt="background"
        />
      </div>
      <div className="flex items-end p-3 md:px-6 md:pb-4 md:pt-3 border border-solid border-gray-200">
        <Avatar
          color="default"
          showFallback
          className="w-20 md:w-32 h-20 md:h-32 p-1 md:p-2 border border-solid border-gray-200 bg-white -mt-16 z-10"
          name="蠢"
          radius="sm"
        />
        <div className="ml-4 md:ml-5 w-full -mt-16 md:mt-0 z-10">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white md:text-slate-950 mb-1 md:mb-2">
            蠢沫沫
          </h4>
        </div>
      </div>
    </Suspense>
  );
}

export function CoserContactInformation() {
  const contactList = [
    { title: "Twitter", src: "" },
    { title: "Facebook", src: "" },
    { title: "Instagram", src: "" },
    { title: "微博", src: "" },
  ];
  return (
    <div className="flex space-x-1 w-0 min-w-full overflow-x-auto">
      {contactList.map((item, index) =>
        item.src ? (
          <Link
            key={index}
            className="text-gray-900"
            href={item.src}
            title={item.title}></Link>
        ) : (
          <div className="text-gray-400" title={item.title} key={index}></div>
        )
      )}
    </div>
  );
}

// export function CoserDetailSearch() {
//   const production = [
//     {
//       label: "Cat",
//       value: "cat",
//       description: "The second most popular pet in the world",
//     },
//   ];

//   return (
//     <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 my-6">
//       <Autocomplete
//         isDisabled
//         defaultItems={production}
//         placeholder="作品"
//         defaultSelectedKey="cat"
//         className="w-full md:w-3/5">
//         {(item) => (
//           <>
//             <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
//           </>
//         )}
//       </Autocomplete>
//       {/* <Autocomplete
//         isDisabled
//         placeholder="角色"
//         defaultSelectedKey="cat"
//         defaultItems={production}
//         className="flex items-center w-full md:w-2/5">
//         {production.map((item) => (
//           <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
//         ))}
//       </Autocomplete> */}
//     </div>
//   );
// }
