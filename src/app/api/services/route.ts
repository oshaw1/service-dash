import { NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db/mongodb';
import Service from '@/lib/db/models/service';

const serviceSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  ipAddress: z.string().min(1),
  port: z.number().int().positive(),
  monitoringMethod: z.enum(['ping', 'http', 'custom']),
  apiEndpoint: z.string().optional(),
  customCommand: z.string().optional(),
});

export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find({}).sort({ createdAt: -1 });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = serviceSchema.parse(body);
    
    await dbConnect();
    
    const service = new Service(validatedData);
    await service.save();
    
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}