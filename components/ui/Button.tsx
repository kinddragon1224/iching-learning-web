import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: Variant }) {
  const cls = {
    primary: "rounded-lg bg-[var(--gold-line)] px-4 py-2 text-sm font-semibold text-black",
    secondary: "rounded-lg border border-[rgba(212,178,106,0.45)] px-4 py-2 text-sm",
    ghost: "rounded-lg px-4 py-2 text-sm underline",
  }[variant];

  return <Link href={href} className={cls}>{children}</Link>;
}
