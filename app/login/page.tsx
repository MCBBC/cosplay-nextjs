import LoginForm from "@/app/ui/login-from/login-form";
import Link from "next/link";
export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 m-auto">
        <h2 className="text-3xl font-bold">欢迎回来</h2>
        <p className="mt-2 text-sm text-gray-600">请登录您的账户</p>
        <div className="mt-6">
          <LoginForm></LoginForm>
          <div className="mt-6 text-center text-sm">
            <span>还没有账户?</span>{" "}
            <Link
              href="/sign-up"
              className="underline text-foreground transition">
              立即注册
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 m-12 bg-white shadow-lg rounded-xl"></div>
    </div>
  );
}
