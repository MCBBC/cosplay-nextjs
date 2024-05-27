export default function RightContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex-auto h-full overflow-auto">{children}</div>;
}
