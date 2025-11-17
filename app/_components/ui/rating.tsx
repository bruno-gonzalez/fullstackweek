"use client";

import { Star } from "lucide-react";
import { cn } from "@/app/_lib/utils";

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

const Rating = ({ value, onChange, readonly = false, size = "md" }: RatingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
          className={cn(
            "transition-colors",
            !readonly && "hover:scale-110 cursor-pointer",
            readonly && "cursor-default"
          )}
        >
          <Star
            className={cn(
              sizeClasses[size],
              star <= value
                ? "fill-yellow-400 text-yellow-400"
                : "fill-none text-gray-400"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default Rating;
