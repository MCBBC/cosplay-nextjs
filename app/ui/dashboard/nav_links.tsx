import Link from "next/link";
import {
  HomeIcon,
  CameraIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function NavLinks() {
  const links = [
    { name: "Cosplays", icon: CameraIcon, href: "/dashboard/cosplays" },
    { name: "Cosers", icon: UserCircleIcon, href: "/dashboard/cosers" },
  ];
  return (
    <div className="space-y-8 p-6">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            href={link.href}
            key={link.name}
            className="flex w-full justify-start items-center">
            <LinkIcon className="h-6 w-6 shrink-0" />
            <h2 className="px-4 text-lg font-semibold tracking-tight">
              {link.name}
            </h2>
          </Link>
        );
      })}
    </div>
  );
}
