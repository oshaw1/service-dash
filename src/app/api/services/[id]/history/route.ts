import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import StatusHistory from '@/lib/db/models/statusHistory';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const page = parseInt(url.searchParams.get('page') || '1');
    const skip = (page - 1) * limit;
    
    const total = await StatusHistory.countDocuments({ serviceId: params.id });
    
    const history = await StatusHistory.find({ serviceId: params.id })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);
    
    return NextResponse.json({
      data: history,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching service history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service history' },
      { status: 500 }
    );
  }
}