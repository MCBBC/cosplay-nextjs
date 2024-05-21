import TitleHeader from "@/app/ui/mainLayout/title-header";
import SideNav from "@/app/ui/mainLayout/side-nav";
import RightContainer from "@/app/ui/mainLayout/right-container";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-full">
      <SideNav></SideNav>
      <RightContainer>
        <TitleHeader></TitleHeader>
        {children}
      </RightContainer>
    </main>
  );
}
