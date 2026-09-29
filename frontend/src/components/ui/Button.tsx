import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-green-800)] text-[var(--color-surface)] hover:bg-[var(--color-green-900)]",
  secondary:
    "border border-[var(--color-border-strong)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-surface-muted)]",
  ghost:
    "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-[var(--radius-md)] px-4 py-2.5",
        "text-sm font-medium",
        "transition-colors duration-[var(--duration-fast)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-[var(--color-green-700)]",
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    />
  );
}