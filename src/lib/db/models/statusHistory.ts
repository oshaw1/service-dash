import mongoose, { Schema, Document } from 'mongoose';

export interface IStatusHistory extends Document {
  serviceId: mongoose.Types.ObjectId;
  status: 'up' | 'down' | 'degraded';
  responseTime?: number;
  timestamp: Date;
  details?: string;
}

const StatusHistorySchema: Schema = new Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  status: { 
    type: String, 
    enum: ['up', 'down', 'degraded'], 
    required: true 
  },
  responseTime: { type: Number },
  timestamp: { type: Date, default: Date.now },
  details: { type: String },
});

export default mongoose.models.StatusHistory || 
  mongoose.model<IStatusHistory>('StatusHistory', StatusHistorySchema);