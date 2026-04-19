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
    <div className={cn(
      "mb-16",
      align === "center" ? "text-center mx-auto" : "text-left",
      align === "right" ? "text-right ml-auto" : "",
      className
    )}>
      {subtitle && (
        <h2 className="text-sm font-semibold text-sky-500 tracking-wider uppercase mb-3">
          {subtitle}
        </h2>
      )}
      <h3 className={cn(
        "text-3xl md:text-5xl font-bold text-white mb-6",
        align === "center" ? "" : "max-w-xl"
      )}>
        {title}
      </h3>
      {description && (
        <p className={cn(
          "text-lg text-neutral-400 leading-relaxed",
          align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"
        )}>
          {description}
        </p>
      )}
    </div>
  );
};
