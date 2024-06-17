import { signOut } from "@/auth";

import { Button, Navbar, NavbarContent } from "@nextui-org/react";
export default function DashboardHeadMenu() {
  return (
    <Navbar
      classNames={{
        content: "!justify-center !basis-auto",
        wrapper: "px-0 max-w-full",
      }}
      isBordered={true}>
      <NavbarContent className="">
        <form
          className="ml-auto"
          action={async () => {
            "use server";
            await signOut();
          }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            退出
          </button>
        </form>
      </NavbarContent>
    </Navbar>
  );
}
