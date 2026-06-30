import { headers } from "next/headers";
import { DashboardSection } from "@/components/sections/dashboard";
import { HeroSection } from "@/components/sections/hero";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>{session ? <DashboardSection session={session} /> : <HeroSection />}</>
  );
}
