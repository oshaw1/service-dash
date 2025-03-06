"use client";

import { useState, useEffect } from "react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import { RefreshCw, Plus } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { Service, StatusData } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const {
    data: services,
    error,
    isLoading,
    mutate,
  } = useSWR<Service[]>("/api/services", fetcher);
  const [statusData, setStatusData] = useState<Record<string, StatusData>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkServiceStatus = async (serviceId: string) => {
    try {
      const response = await fetch(`/api/services/${serviceId}/status`);
      const data = await response.json();
      return { serviceId, ...data };
    } catch (error) {
      console.error(`Error checking status for service ${serviceId}:`, error);
      return {
        serviceId,
        status: "down" as const,
        responseTime: 0,
        details: "Failed to check status",
      };
    }
  };

  const checkAllStatuses = async () => {
    if (!services || services.length === 0) return;

    setIsRefreshing(true);

    try {
      const statusPromises = services.map((service) =>
        checkServiceStatus(service._id)
      );
      const statusResults = await Promise.all(statusPromises);

      const newStatusData = statusResults.reduce((acc, result) => {
        acc[result.serviceId] = {
          status: result.status,
          responseTime: result.responseTime,
          details: result.details,
        };
        return acc;
      }, {} as Record<string, StatusData>);

      setStatusData(newStatusData);
    } catch (error) {
      console.error("Error checking services status:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (services && services.length > 0) {
      checkAllStatuses();
    }
  }, [services]);

  if (error)
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">Failed to load services</div>
        <Button onClick={() => mutate()}>Try Again</Button>
      </div>
    );

  return (
    <>
      <div className="flex justify-between items-center justify-end mb-6">
        <div className="flex gap-2">
          <Button
            onClick={checkAllStatuses}
            disabled={isRefreshing || !services?.length}
            variant="outline"
            className="flex items-center"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Refreshing..." : "Refresh Status"}
          </Button>
          <Button
            className="flex items-center"
            onClick={() => (window.location.href = "/services/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <div className="text-gray-500">Loading services...</div>
        </div>
      ) : services && services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service._id}
              id={service._id}
              name={service.name}
              description={service.description}
              ipAddress={service.ipAddress}
              port={service.port}
              status={statusData[service._id]?.status || "unknown"}
              responseTime={statusData[service._id]?.responseTime}
              uptime={90} // This should be calculated from historical data
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-4">
            Add your first service to start monitoring
          </p>
        </div>
      )}
    </>
  );
}
