import NavLinks from "@/app/ui/main_layout/nav_links";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
export default function SideNav() {
  return (
    <div className="hidden md:block  md:w-56 xl:w-64 h-screen border-r border-r-border relative shrink-0">
      <div className="h-16"></div>
      <Divider></Divider>

      <NavLinks></NavLinks>

      <div className="absolute p-3 bottom-0 w-full">
        <Link href="/login">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">
            登陆
          </button>
        </Link>
      </div>
    </div>
  );
}
