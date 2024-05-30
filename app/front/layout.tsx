import TitleHeader from "@/app/ui/main_layout/title_header";
import SideNav from "@/app/ui/main_layout/side_nav";
import RightContainer from "@/app/ui/main_layout/right_container";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen">
      <SideNav></SideNav>
      <RightContainer>
        <TitleHeader></TitleHeader>
        <div className="w-full px-8">{children}</div>
      </RightContainer>
    </main>
  );
}
