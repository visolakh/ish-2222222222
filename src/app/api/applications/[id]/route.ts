import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { applications } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ID is valid integer
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { status } = body;

    // Validate status field
    if (!status) {
      return NextResponse.json(
        { 
          error: 'Status is required',
          code: 'MISSING_STATUS' 
        },
        { status: 400 }
      );
    }

    // Validate status is either 'new' or 'processed'
    if (status !== 'new' && status !== 'processed') {
      return NextResponse.json(
        { 
          error: "Invalid status. Must be 'new' or 'processed'",
          code: 'INVALID_STATUS' 
        },
        { status: 400 }
      );
    }

    // Update the application record
    const updated = await db
      .update(applications)
      .set({
        status,
        updatedAt: new Date().toISOString()
      })
      .where(eq(applications.id, parseInt(id)))
      .returning();

    // Check if record was found and updated
    if (updated.length === 0) {
      return NextResponse.json(
        { 
          error: 'Application not found',
          code: 'NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Return updated application
    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + error
      },
      { status: 500 }
    );
  }
}