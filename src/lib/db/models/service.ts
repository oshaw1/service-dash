import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  description?: string;
  ipAddress: string;
  port: number;
  monitoringMethod: 'ping' | 'http' | 'custom';
  apiEndpoint?: string;
  customCommand?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    ipAddress: { type: String, required: true },
    port: { type: Number, required: true },
    monitoringMethod: { 
      type: String, 
      enum: ['ping', 'http', 'custom'], 
      required: true 
    },
    apiEndpoint: { type: String },
    customCommand: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);