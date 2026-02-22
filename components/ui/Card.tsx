import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`paper-panel panel-hover rounded-2xl ${className}`}>{children}</div>;
}
