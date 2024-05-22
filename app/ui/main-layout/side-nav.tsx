import NavLinks from "@/app/ui/main-layout/nav-links";
import { Divider } from "@nextui-org/divider";
export default function SideNav() {
  return (
    <div className="hidden md:block  md:w-56 xl:w-64 h-screen border-r border-r-border">
      <div className="h-16"></div>
      <Divider></Divider>
      <div className="space-y-8 p-6">
        <NavLinks></NavLinks>
      </div>
    </div>
  );
}
