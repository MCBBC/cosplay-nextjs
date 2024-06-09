import { MDXRemote } from "next-mdx-remote/rsc";
export default function CosplaysContent({
  markdownText,
}: {
  markdownText: string;
}) {
  return <MDXRemote source={markdownText} />;
}
