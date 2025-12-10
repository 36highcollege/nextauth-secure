import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
}

export const AuthButton = forwardRef<HTMLButtonElement, AuthButtonProps>(
  ({ className, children, loading, variant = "primary", disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      ghost: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg px-6 py-2",
          "text-sm font-medium transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          variants[variant],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

AuthButton.displayName = "AuthButton";
