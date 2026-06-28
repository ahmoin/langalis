import Link from "next/link";

import { siteConfig } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="border-border border-t bg-card py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-bold text-foreground text-lg">
              {siteConfig.name}
            </h3>
            <p className="text-muted-foreground text-sm">
              {siteConfig.description}
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-border border-t pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2026 {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
