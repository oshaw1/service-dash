import { Types } from 'mongoose';

export type MonitoringMethod = 'ping' | 'http' | 'custom';
export type ServiceStatus = 'up' | 'down' | 'degraded' | 'unknown';

export interface Service {
  _id: string;
  name: string;
  description?: string;
  ipAddress: string;
  port: number;
  monitoringMethod: MonitoringMethod;
  apiEndpoint?: string;
  customCommand?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StatusData {
  status: ServiceStatus;
  responseTime?: number;
  details?: string;
}

export interface StatusHistory {
  _id: string;
  serviceId: Types.ObjectId | string;
  status: ServiceStatus;
  responseTime?: number;
  timestamp: Date;
  details?: string;
}