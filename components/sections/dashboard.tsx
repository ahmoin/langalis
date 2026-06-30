"use client";

import { MessageScrollerDemo } from "@/components/message-scroller-demo";
import { NavUser } from "@/components/nav-user";
import type { Session } from "@/lib/auth-client";

export function DashboardSection({ session }: { session: Session | null }) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 border-border border-r bg-card px-6 py-8 md:flex md:flex-col">
        {session && (
          <div className="mt-auto">
            <NavUser
              user={{
                name: session.user.name,
                email: session.user.email,
                avatar:
                  session.user.image ||
                  `https://avatar.vercel.sh/${session.user.email}`,
              }}
            />
          </div>
        )}
      </aside>

      <main className="flex flex-1 flex-col">
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <MessageScrollerDemo />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
