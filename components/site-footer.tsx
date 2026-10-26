"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { studio } from "@/lib/studio";

const links = [
  { href: "/work", label: "Work" },
  { href: "/practice", label: "Practice" },
  { href: "/enquiry", label: "Enquiry" },
];

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 py-10 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="text-[15px] font-medium">{studio.name}</p>
          <a
            className="mt-2 inline-block text-[15px] text-muted underline-offset-4 hover:underline"
            href={`mailto:${studio.email}`}
          >
            {studio.email}
          </a>
        </div>
        <nav aria-label="Footer" className="flex gap-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-[15px]">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
