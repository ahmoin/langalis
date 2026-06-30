"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavStreak({ streak }: { streak: number }) {
  const hasStreak = streak > 0;

  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <Flame
        className={cn(
          "size-4",
          hasStreak
            ? "fill-orange-500 text-orange-500"
            : "text-muted-foreground"
        )}
      />
      <span className="font-semibold text-sm">{streak}</span>
    </div>
  );
}
