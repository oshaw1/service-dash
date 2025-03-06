import { cn } from "@/lib/utils";
import { ServiceStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: ServiceStatus;
  className?: string;
}

const statusClasses = {
  up: "bg-green-100 text-green-800 border-green-200",
  down: "bg-red-100 text-red-800 border-red-200",
  degraded: "bg-yellow-100 text-yellow-800 border-yellow-200",
  unknown: "bg-gray-100 text-gray-800 border-gray-200",
};

const statusLabels = {
  up: "Online",
  down: "Offline",
  degraded: "Degraded",
  unknown: "Unknown",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusClasses[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}