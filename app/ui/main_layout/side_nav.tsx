import NavLinks from "@/app/ui/main_layout/nav_links";

import { Divider } from "@nextui-org/react";
import LoginButton from "./login_button";

export default function SideNav() {
  return (
    <div className="hidden md:block  md:w-56 xl:w-64 h-screen border-r border-r-border relative shrink-0">
      <div className="h-16"></div>
      <Divider></Divider>

      <NavLinks></NavLinks>

      <div className="absolute p-3 bottom-0 w-full">
        <LoginButton />
      </div>
    </div>
  );
}
