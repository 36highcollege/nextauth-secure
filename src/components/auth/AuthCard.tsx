import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl bg-card p-8 shadow-xl",
        "border border-border/50",
        className
      )}
    >
      {children}
    </div>
  );
}

interface AuthCardHeaderProps {
  title: string;
  description?: string;
}

export function AuthCardHeader({ title, description }: AuthCardHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

interface AuthCardFooterProps {
  children: ReactNode;
}

export function AuthCardFooter({ children }: AuthCardFooterProps) {
  return (
    <div className="mt-6 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}
