import LoginForm from "@/app/ui/login-from/login-form";
export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="mt-56 w-full max-w-md p-8 mx-auto">
        <h2 className="text-3xl font-bold">欢迎回来</h2>
        <p className="mt-2 text-sm text-gray-600">请登录您的账户</p>
        <div className="mt-6">
          <LoginForm></LoginForm>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 m-12 bg-white shadow-lg rounded-xl"></div>
    </div>
  );
}
