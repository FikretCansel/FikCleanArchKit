import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseClassName =
  "inline-flex items-center justify-center rounded font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary-hover",
  secondary:
    "border border-brand-border bg-brand-surface text-brand-secondary-foreground hover:bg-brand-muted",
  ghost:
    "text-brand-secondary-foreground hover:bg-brand-muted",
  danger:
    "bg-brand-danger text-brand-danger-foreground hover:bg-brand-danger-hover"
};

const sizeClassNames: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-sm"
};

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function Button({
  children,
  className,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={joinClassNames(
        baseClassName,
        variantClassNames[variant],
        sizeClassNames[size],
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export type { ButtonProps, ButtonSize, ButtonVariant };
