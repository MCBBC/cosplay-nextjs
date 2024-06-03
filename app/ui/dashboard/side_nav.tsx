import Link from "next/link";
import Image from "next/image";
import Favicon from "@/public/images/favicon.ico";
import NavLinks from "./nav_links";
export default function DashboardSideNav() {
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-[60px] items-center border-b px-5">
        <Link href="/front" className="flex items-center gap-2 font-semibold">
          <Image
            src={Favicon}
            alt="网站图标"
            className="w-8 h-8 text-gray-100"
          />
          <span>MICROMATRIX</span>
        </Link>
      </div>
      <NavLinks />
    </div>
  );
}
