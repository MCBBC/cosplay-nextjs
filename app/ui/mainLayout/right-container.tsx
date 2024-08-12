import { ScrollShadow } from "@nextui-org/react";
export default function RightContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ScrollShadow
      hideScrollBar={true}
      visibility="none"
      className="flex-auto h-dvh overflow-auto">
      {children}
    </ScrollShadow>
  );
}
