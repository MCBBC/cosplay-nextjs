export default function RightContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex-auto">{children}</div>;
}
