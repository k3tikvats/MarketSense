import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <div className={cn(
      "flex items-center",
      size === "sm" && "gap-1",
      size === "md" && "gap-2",
      size === "lg" && "gap-3",
      className
    )}>
      <img 
        src="/marketsense_logo.png" 
        alt="Market Pulse Logo" 
        className={cn(
          "rounded-sm",
          size === "sm" && "h-6 w-6",
          size === "md" && "h-8 w-8",
          size === "lg" && "h-10 w-10"
        )}
      />
      <span className={cn(
        "font-semibold text-primary",
        size === "sm" && "text-sm",
        size === "md" && "text-base",
        size === "lg" && "text-lg"
      )}>
        MarketSense
      </span>
    </div>
  );
}
