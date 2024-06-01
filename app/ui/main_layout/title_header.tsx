import Image from "next/image";
import Favicon from "@/public/images/favicon.ico";
import {
  Divider,
  Button,
  Navbar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarContent,
} from "@nextui-org/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import NavLinks from "./nav_links";

export default function TitleHeader() {
  return (
    <>
      <Navbar
        classNames={{ content: "!justify-center !basis-auto", wrapper: "px-0" }}
        isBlurred
        isBordered={true}>
        <NavbarContent className="h-6 w-6 md:hidden ml-4">
          <NavbarMenuToggle icon={<Bars3Icon />} />
        </NavbarContent>

        <NavbarContent className="flex items-center justify-center py-3 px-4">
          <Image
            src={Favicon}
            alt="网站图标"
            className="w-10 h-10 mr-4"
            unoptimized
          />
          <div className="text-lg font-semibold">Share Cosplay</div>
        </NavbarContent>
        <NavbarContent className="md:hidden mr-4 ">
          <Link href={"/login"}>
            <Button
              className="min-flex w-full justify-start items-centerw, inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs"
              size="sm">
              登录
            </Button>
          </Link>
        </NavbarContent>
        <NavbarMenu>
          <NavLinks />
        </NavbarMenu>
      </Navbar>
    </>
  );
}
