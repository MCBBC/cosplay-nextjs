import RightContainer from "./right_container";
import SideNav from "./side_nav";

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
