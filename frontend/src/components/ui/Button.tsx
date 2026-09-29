import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-green-800)] text-[var(--color-on-dark)] shadow-[var(--shadow-control)] hover:bg-[var(--color-green-900)] hover:shadow-none",
  secondary:
    "border border-[var(--color-green-800)] bg-[var(--color-surface)] text-[var(--color-green-900)] hover:bg-[var(--color-surface-muted)]",
  ghost:
    "text-[var(--color-green-800)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-green-900)]",
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
        "rounded-[var(--radius-sm)] px-5 py-3",
        "text-sm font-semibold",
        "transition-[background-color,color,box-shadow] duration-[var(--duration-fast)]",
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    />
  );
}
