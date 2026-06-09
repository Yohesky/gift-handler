import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

export function Toast({ message, variant = "success", onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 w-[90%] px-5 py-3 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 ease-out",
        visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
        variant === "success"
          ? "bg-green-500"
          : "bg-red-500"
      )}
    >
      {variant === "success" ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <XCircle className="w-5 h-5" />
      )}
      {message}
    </div>
  );
}
