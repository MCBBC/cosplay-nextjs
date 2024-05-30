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
      className="flex-auto h-full overflow-auto">
      {children}
    </ScrollShadow>
  );
}
