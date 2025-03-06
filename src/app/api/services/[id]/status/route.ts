import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Service from '@/lib/db/models/service';
import StatusHistory from '@/lib/db/models/statusHistory';
import { ping } from '@/lib/monitoring/ping';
import { checkHttp } from '@/lib/monitoring/http';
import { runCustomCommand } from '@/lib/monitoring/custom';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const service = await Service.findById(params.id);
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    let statusResult;
    
    switch (service.monitoringMethod) {
      case 'ping':
        statusResult = await ping(service.ipAddress);
        break;
      case 'http':
        statusResult = await checkHttp(service.ipAddress, service.port, service.apiEndpoint);
        break;
      case 'custom':
        statusResult = await runCustomCommand(service.customCommand || '', service.ipAddress, service.port);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid monitoring method' },
          { status: 400 }
        );
    }
    
    const statusHistory = new StatusHistory({
      serviceId: service._id,
      status: statusResult.status,
      responseTime: statusResult.responseTime,
      details: statusResult.details,
    });
    
    await statusHistory.save();
    
    return NextResponse.json(statusResult);
  } catch (error) {
    console.error('Error checking service status:', error);
    return NextResponse.json(
      { error: 'Failed to check service status' },
      { status: 500 }
    );
  }
}