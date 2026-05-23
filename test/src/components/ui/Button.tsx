import React, { type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-sky-500 text-white hover:bg-sky-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-sky-500/30",
      secondary: "bg-white/5 border border-white/10 text-white transition-all hover:bg-white/10 hover:scale-105 backdrop-blur-sm",
      ghost: "text-neutral-400 hover:text-sky-400 hover:bg-sky-500/10",
      icon: "bg-white/10 backdrop-blur-md text-white hover:bg-sky-500",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-full gap-2",
      md: "px-6 py-2.5 text-sm rounded-full gap-2",
      lg: "px-8 py-3.5 text-base rounded-full gap-2",
      icon: "w-12 h-12 rounded-full",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
