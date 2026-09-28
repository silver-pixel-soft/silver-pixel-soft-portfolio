import React from "react";
import { cn } from "../../lib/utils";

interface SectionHeadingProps {
  subtitle?: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle,
  title,
  description,
  className,
  align = "center",
}) => {
  return (
    <div
      className={cn(
        "mb-16",
        align === "center" ? "text-center mx-auto" : "text-left",
        align === "right" ? "text-right ml-auto" : "",
        className
      )}
    >
      {subtitle && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-5",
            align === "center" ? "mx-auto" : ""
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
          <span>{subtitle}</span>
        </div>
      )}

      <h3
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5",
          align === "center" ? "max-w-3xl mx-auto" : "max-w-2xl"
        )}
      >
        {title}
      </h3>

      {description && (
        <p
          className={cn(
            "text-base sm:text-lg text-slate-300 leading-relaxed font-normal",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
