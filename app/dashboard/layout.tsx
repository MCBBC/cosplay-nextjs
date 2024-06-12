import DashboardSideNav from "../ui/dashboard/side-nav";
import DashboardHeadMenu from "../ui/dashboard/head-menu";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <DashboardSideNav />
      <div className="flex flex-auto flex-col overflow-auto">
        <DashboardHeadMenu />
        {children}
      </div>
    </div>
  );
}
