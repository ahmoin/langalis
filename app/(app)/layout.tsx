import { headers } from "next/headers";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { auth } from "@/lib/auth";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div
      className="group/layout relative z-10 flex min-h-svh flex-col bg-background has-data-[slot=designer]:h-svh has-data-[slot=designer]:overflow-hidden"
      data-slot="layout"
    >
      <SiteHeader initialSession={session} />
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
