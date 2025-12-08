import { Dumbbell } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex gap-2">
      <Dumbbell className="h-6 w-6 text-primary" />
      <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary-foreground bg-clip-text">
        Rec-It
      </span>
    </div>
  );
}
