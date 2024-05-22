import RightContainer from "./right-container";
import SideNav from "./side-nav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideNav></SideNav>
      <RightContainer>{children}</RightContainer>
    </>
  );
}
