"use client";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import { Button } from "../button";
import { authenticate } from "@/app/lib/actions/auth";

export default function LoginForm() {
  let [hidePasswordState, setPasswordState] = useState(true);
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <form className="space-y-6" action={dispatch}>
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
            type={hidePasswordState ? "password" : "text"}
            name="password"
            id="password"
            required
            minLength={6}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setPasswordState(!hidePasswordState)}>
            {hidePasswordState ? (
              <EyeSlashIcon width={20} height={20} />
            ) : (
              <EyeIcon width={20} height={20} />
            )}
          </button>
        </div>
      </div>
      <LoginButton />
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true">
        {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return <Button aria-disabled={pending}>登录</Button>;
}
