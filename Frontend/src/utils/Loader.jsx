import { UtensilsCrossed } from "lucide-react";
import React from "react";

export const Loader = () => {
  return (
    <div className="border-2 bg-zinc-100 border-dotted border-green-500 rounded-full p-8">
      <UtensilsCrossed className="w-12 h-12 animate-bounce text-green-500 transition-all duration-300" />
    </div>
  );
};
