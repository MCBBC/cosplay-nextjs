import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function LoginForm() {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          邮箱
        </label>
        <div className="relative px-px">
          <input
            id="email"
            type="email"
            name="email"
            required
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          <div className="flex items-center">
            密码{" "}
            <Link
              href={"/front/forgot-password"}
              className="ml-auto inline-block text-sm underline">
              忘记密码?
            </Link>
          </div>
        </label>
        <div className="relative px-px">
          <input
            type="password"
            name=""
            id=""
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <EyeIcon width={20} height={20} />
          </button>
        </div>
      </div>
      <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">
        登录
      </div>
    </form>
  );
}
