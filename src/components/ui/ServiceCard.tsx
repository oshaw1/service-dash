import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Clock, Server } from "lucide-react";
import Link from "next/link";
import { ServiceStatus } from "@/lib/types";

interface ServiceCardProps {
  id: string;
  name: string;
  description?: string;
  ipAddress: string;
  port: number;
  status: ServiceStatus;
  responseTime?: number;
  uptime?: number;
}

export function ServiceCard({
  id,
  name,
  description,
  ipAddress,
  port,
  status,
  responseTime,
  uptime,
}: ServiceCardProps) {
  return (
    <Link href={`/services/${id}`}>
      <Card className="overflow-hidden transition-colors hover:bg-slate-50">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xl truncate">{name}</CardTitle>
          <StatusBadge status={status} />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            )}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Server className="w-4 h-4 mr-1 text-muted-foreground" />
                <span>
                  {ipAddress}:{port}
                </span>
              </div>
              {responseTime !== undefined && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                  <span>{responseTime}ms</span>
                </div>
              )}
            </div>
            {uptime !== undefined && (
              <div className="mt-2">
                <div className="text-xs text-muted-foreground mb-1">
                  Uptime: {uptime.toFixed(2)}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${uptime}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}