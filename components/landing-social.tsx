"use client";

import {
  Envelope,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { studio } from "@/lib/studio";

const marks = [
  { label: "Email", href: `mailto:${studio.email}`, Icon: Envelope },
  { label: "Facebook", href: "", Icon: FacebookLogo },
  { label: "LinkedIn", href: "", Icon: LinkedinLogo },
  { label: "Instagram", href: "", Icon: InstagramLogo },
];

export function LandingSocial() {
  return (
    <ul className="mt-5 flex items-center justify-center gap-3 lg:justify-start">
      {marks.map(({ label, href, Icon }) => (
        <li key={label}>
          {href ? (
            <a
              href={href}
              aria-label={label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white text-white"
            >
              <Icon size={16} weight="regular" aria-hidden="true" />
            </a>
          ) : (
            <span
              role="img"
              aria-label={label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white text-white"
            >
              <Icon size={16} weight="regular" aria-hidden="true" />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
