import React, { memo } from "react";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showVerified?: boolean;
}

const COLORS = [
  "bg-indigo-500",
  "bg-violet-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-pink-500",
];

const SIZES = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-lg",
  lg: "w-16 h-16 text-xl",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getColor(name: string): string {
  if (!name) return "bg-slate-500";
  const index = name.charCodeAt(0) % COLORS.length;
  return COLORS[index];
}

export const Avatar = memo(function Avatar({
  name,
  size = "md",
  className = "",
  showVerified = false,
}: AvatarProps) {
  const initials = getInitials(name || "U");
  const color = getColor(name || "U");
  const sizeClass = SIZES[size];

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <div
        className={`${sizeClass} ${color} rounded-full flex items-center justify-center font-bold text-white select-none`}
      >
        {initials}
      </div>
      {showVerified && (
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center">
          <svg
            className="w-2.5 h-2.5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
});
