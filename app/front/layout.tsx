import TitleHeader from "@/app/ui/main-layout/title-header";
import SideNav from "@/app/ui/main-layout/side-nav";
import RightContainer from "@/app/ui/main-layout/right-container";

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
        {children}
      </RightContainer>
    </main>
  );
}
