import React, { type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none";

    const variants = {
      primary: "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white hover:shadow-[0_0_28px_rgba(99,102,241,0.55)] hover:scale-[1.02] active:scale-[0.98] border border-white/10",
      secondary: "bg-white/[0.06] border border-white/[0.18] text-white hover:bg-indigo-500/15 hover:border-indigo-400/50 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md shadow-sm",
      ghost: "text-slate-300 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-xl",
      icon: "bg-white/[0.06] border border-white/10 backdrop-blur-md text-white hover:bg-indigo-600 hover:border-indigo-400",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs rounded-full gap-2",
      md: "px-6 py-2.5 text-sm rounded-full gap-2",
      lg: "px-8 py-3.5 text-base rounded-full gap-2",
      icon: "w-11 h-11 rounded-full",
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
