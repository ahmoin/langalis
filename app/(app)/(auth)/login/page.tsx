import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserAuthForm } from "@/components/user-auth-form";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Log in to your Langalis account",
  description: "Log in to your Langalis account",
};

export default async function AuthenticationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex h-screen items-center justify-center px-8">
      <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-sm">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-semibold text-2xl tracking-tight">
            Create an account
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your email below to create your account
          </p>
        </div>
        <UserAuthForm initialState="login" />
      </div>
    </div>
  );
}
