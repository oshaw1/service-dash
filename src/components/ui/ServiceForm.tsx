'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";

const serviceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  ipAddress: z.string().min(1, "IP Address is required"),
  port: z.coerce.number().int().positive("Port must be a positive number"),
  monitoringMethod: z.enum(["ping", "http", "custom"], {
    required_error: "Please select a monitoring method",
  }),
  apiEndpoint: z.string().optional(),
  customCommand: z.string().optional(),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  onSubmit: (data: ServiceFormValues) => Promise<void>;
  initialData?: Partial<ServiceFormValues>;
  isEdit?: boolean;
}

export function ServiceForm({
  onSubmit,
  initialData,
  isEdit = false,
}: ServiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      monitoringMethod: "ping",
      ...initialData,
    },
  });

  const monitoringMethod = watch("monitoringMethod");

  const handleFormSubmit = async (data: ServiceFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Service Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description (Optional)
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="ipAddress"
              className="block text-sm font-medium text-gray-700"
            >
              IP Address / Hostname
            </label>
            <input
              id="ipAddress"
              type="text"
              {...register("ipAddress")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            {errors.ipAddress && (
              <p className="mt-1 text-sm text-red-600">
                {errors.ipAddress.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="port"
              className="block text-sm font-medium text-gray-700"
            >
              Port
            </label>
            <input
              id="port"
              type="number"
              {...register("port")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            {errors.port && (
              <p className="mt-1 text-sm text-red-600">{errors.port.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monitoring Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center border border-gray-300 rounded-md p-3">
              <input
                id="ping"
                type="radio"
                value="ping"
                {...register("monitoringMethod")}
                className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
              />
              <label
                htmlFor="ping"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Ping
              </label>
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-3">
              <input
                id="http"
                type="radio"
                value="http"
                {...register("monitoringMethod")}
                className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
              />
              <label
                htmlFor="http"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                HTTP Request
              </label>
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-3">
              <input
                id="custom"
                type="radio"
                value="custom"
                {...register("monitoringMethod")}
                className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
              />
              <label
                htmlFor="custom"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Custom Command
              </label>
            </div>
          </div>
          {errors.monitoringMethod && (
            <p className="mt-1 text-sm text-red-600">
              {errors.monitoringMethod.message}
            </p>
          )}
        </div>

        {monitoringMethod === "http" && (
          <div>
            <label
              htmlFor="apiEndpoint"
              className="block text-sm font-medium text-gray-700"
            >
              API Endpoint
            </label>
            <input
              id="apiEndpoint"
              type="text"
              {...register("apiEndpoint")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="/health"
            />
            {errors.apiEndpoint && (
              <p className="mt-1 text-sm text-red-600">
                {errors.apiEndpoint.message}
              </p>
            )}
          </div>
        )}

        {monitoringMethod === "custom" && (
          <div>
            <label
              htmlFor="customCommand"
              className="block text-sm font-medium text-gray-700"
            >
              Custom Command
            </label>
            <input
              id="customCommand"
              type="text"
              {...register("customCommand")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="e.g., curl -s http://{host}:{port}/status"
            />
            <p className="mt-1 text-xs text-gray-500">
              Use {"{host}"} and {"{port}"} placeholders to reference the service's IP address and port.
            </p>
            {errors.customCommand && (
              <p className="mt-1 text-sm text-red-600">
                {errors.customCommand.message}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : isEdit ? "Update Service" : "Add Service"}
        </Button>
      </div>
    </form>
  );
}