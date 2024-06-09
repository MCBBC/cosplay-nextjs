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
        <Button className="ml-auto mr-2" size="sm">
          退出
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
