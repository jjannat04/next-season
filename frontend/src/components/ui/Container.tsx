import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={[
        "mx-auto w-full max-w-[var(--content-width)]",
        "px-6 lg:px-10",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}