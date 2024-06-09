import Link from "next/link";
import Image from "next/image";
import Favicon from "@/public/images/favicon.ico";
import NavLinks from "./nav_links";
export default function DashboardSideNav() {
  return (
    <div className="hidden md:block  md:w-56 xl:w-64 h-screen border-r border-r-border relative shrink-0">
      <Link
        href="/front"
        className="flex  h-16 items-center border-b px-5 items-center gap-2 font-semibold">
        <Image src={Favicon} alt="网站图标" className="w-8 h-8 text-gray-100" />
        <span>MICROMATRIX</span>
      </Link>

      <NavLinks />
    </div>
  );
}
