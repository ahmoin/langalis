import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper 3xl:fixed:px-0 px-6 group-has-data-[slot=designer]/layout:max-w-none">
        <div className="3xl:fixed:container flex h-(--header-height) items-center group-has-data-[slot=designer]/layout:fixed:max-w-none **:data-[slot=separator]:h-4!">
          <MobileNav className="flex lg:hidden" items={siteConfig.navItems} />
          <MainNav className="hidden lg:flex" items={siteConfig.navItems} />
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
