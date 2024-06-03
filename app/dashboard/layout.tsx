import DashboardSideNav from "../ui/dashboard/side_nav";
import DashboardHeadMenu from "../ui/dashboard/head_menu";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <DashboardSideNav />
      <div className="flex flex-col">
        <DashboardHeadMenu />
        {children}
      </div>
    </div>
  );
}
