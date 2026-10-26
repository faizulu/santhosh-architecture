"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { studio } from "@/lib/studio";

const links = [
  { href: "/work", label: "Work" },
  { href: "/practice", label: "Practice" },
  { href: "/enquiry", label: "Enquiry" },
];

function isCurrent(pathname: string, href: string) {
  if (href === "/work") return pathname.startsWith("/work");
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 md:px-10">
        <Link href="/" className="text-[15px] font-medium tracking-tight">
          {studio.name}
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
              className="text-[15px] underline-offset-4 aria-[current=page]:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X size={22} weight="regular" aria-hidden="true" />
          ) : (
            <List size={22} weight="regular" aria-hidden="true" />
          )}
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-line bg-bg md:hidden"
        >
          <ul className="mx-auto flex w-full max-w-[1400px] flex-col px-4 py-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                  className="block py-3 text-lg underline-offset-4 aria-[current=page]:underline"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
