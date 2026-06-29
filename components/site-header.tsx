"use client";

import Link from "next/link";

import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { NavUser } from "@/components/nav-user";
import { Button } from "@/components/ui/button";
import { authClient, type Session } from "@/lib/auth-client";
import { siteConfig } from "@/lib/config";

export function SiteHeader({
  initialSession,
}: {
  initialSession: Session | null;
}) {
  const { data: clientSession, isPending } = authClient.useSession();
  const session = isPending ? clientSession || initialSession : clientSession;

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper 3xl:fixed:px-0 px-6 group-has-data-[slot=designer]/layout:max-w-none">
        <div className="3xl:fixed:container flex h-(--header-height) items-center group-has-data-[slot=designer]/layout:fixed:max-w-none **:data-[slot=separator]:h-4!">
          <MobileNav className="flex lg:hidden" items={siteConfig.navItems} />
          <Button
            asChild
            className="hidden size-8 hover:bg-transparent lg:flex dark:hover:bg-transparent"
            size="icon"
            variant="ghost"
          >
            <Link href="/">
              <Icons.logo className="size-5 text-foreground group-hover/button:text-primary" />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
          </Button>
          <MainNav className="hidden lg:flex" items={siteConfig.navItems} />
          <div className="ml-auto flex items-center gap-2">
            {session ? (
              <NavUser
                user={{
                  name: session.user.name,
                  email: session.user.email,
                  avatar:
                    session.user.image ||
                    `https://avatar.vercel.sh/${session.user.email}`,
                }}
              />
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
