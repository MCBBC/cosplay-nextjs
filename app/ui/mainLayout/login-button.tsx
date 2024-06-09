import Link from "next/link";

export default function LoginButton() {
  return (
    // <Link href="/dashboard">
    // </Link>
    <button className="invisible inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">
      登陆
    </button>
  );
}
