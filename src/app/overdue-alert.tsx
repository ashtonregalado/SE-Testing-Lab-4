import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import { useState } from "react";

export function OverdueAlert({ count }: { count: number }) {
  const [visible, setVisible] = useState(true);

  if (!visible || count === 0) return null;

  return (
    <Alert className="bg-red-50 border border-red-200 text-red-700 rounded-xl relative pr-10 my-7">
      <AlertTitle className="font-semibold">Attention needed!</AlertTitle>
      <AlertDescription>
        You have {count} overdue task{count > 1 ? "s" : ""}.
      </AlertDescription>

      <button
        onClick={() => setVisible(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  );
}
