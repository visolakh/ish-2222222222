import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { applications, destinationLogs } from '@/db/schema';
import { eq } from 'drizzle-orm';

type DestinationResult = {
  destination: string;
  status: 'success' | 'failed';
  error?: string;
};

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        {
          error: 'Valid ID is required',
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    const applicationId = parseInt(id);

    // Parse request body
    const body = await request.json();
    const { destinations } = body;

    // Default destinations if not provided or empty
    const targetDestinations: string[] =
      destinations && Array.isArray(destinations) && destinations.length > 0
        ? destinations
        : ['horizon_email', 'horizon_webhook'];

    // Query application
    const application = await db
      .select()
      .from(applications)
      .where(eq(applications.id, applicationId))
      .limit(1);

    if (application.length === 0) {
      return NextResponse.json(
        {
          error: 'Application not found',
          code: 'APPLICATION_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    const app = application[0];
    const results: DestinationResult[] = [];

    // Process each destination
    for (const destination of targetDestinations) {
      const currentTimestamp = new Date().toISOString();

      if (destination === 'horizon_email') {
        // Simulate email sending
        try {
          await db.insert(destinationLogs).values({
            applicationId: app.id,
            destinationName: 'horizon_email',
            status: 'success',
            statusCode: 200,
            responseBody: 'Email resend simulation successful',
            attemptedAt: currentTimestamp,
            createdAt: currentTimestamp,
          });

          results.push({
            destination: 'horizon_email',
            status: 'success',
          });
        } catch (error) {
          console.error('Error logging horizon_email:', error);
          results.push({
            destination: 'horizon_email',
            status: 'failed',
            error: 'Failed to log email simulation',
          });
        }
      } else if (destination === 'horizon_webhook') {
        // Send webhook
        try {
          const webhookPayload = {
            source: 'horizonwork.uz',
            submission_id: app.submissionId,
            submitted_at: app.submittedAt,
            language: app.language,
            page_url: app.pageUrl || null,
            utm: {
              source: app.utmSource || null,
              campaign: app.utmCampaign || null,
            },
            applicant: {
              full_name: app.fullName,
              phone: app.phone,
              desired_position: app.desiredPosition || null,
            },
          };

          const response = await fetch(
            'https://api.horizonwork.uz/hooks/applications',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(webhookPayload),
            }
          );

          const statusCode = response.status;
          let responseBody = '';

          try {
            responseBody = await response.text();
          } catch (e) {
            responseBody = 'Unable to parse response body';
          }

          if (response.ok) {
            // Success (200-299)
            await db.insert(destinationLogs).values({
              applicationId: app.id,
              destinationName: 'horizon_webhook',
              status: 'success',
              statusCode: statusCode,
              responseBody: responseBody,
              attemptedAt: currentTimestamp,
              createdAt: currentTimestamp,
            });

            results.push({
              destination: 'horizon_webhook',
              status: 'success',
            });
          } else {
            // Failure
            await db.insert(destinationLogs).values({
              applicationId: app.id,
              destinationName: 'horizon_webhook',
              status: 'failed',
              statusCode: statusCode,
              errorMessage: `HTTP ${statusCode}: ${responseBody}`,
              attemptedAt: currentTimestamp,
              createdAt: currentTimestamp,
            });

            results.push({
              destination: 'horizon_webhook',
              status: 'failed',
              error: `HTTP ${statusCode}`,
            });
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';

          await db.insert(destinationLogs).values({
            applicationId: app.id,
            destinationName: 'horizon_webhook',
            status: 'failed',
            errorMessage: errorMessage,
            attemptedAt: currentTimestamp,
            createdAt: currentTimestamp,
          });

          results.push({
            destination: 'horizon_webhook',
            status: 'failed',
            error: errorMessage,
          });
        }
      } else if (destination === 'mehnat_uz') {
        // Currently disabled
        try {
          await db.insert(destinationLogs).values({
            applicationId: app.id,
            destinationName: 'mehnat_uz',
            status: 'failed',
            errorMessage: 'Destination is currently disabled',
            attemptedAt: currentTimestamp,
            createdAt: currentTimestamp,
          });

          results.push({
            destination: 'mehnat_uz',
            status: 'failed',
            error: 'Destination is currently disabled',
          });
        } catch (error) {
          console.error('Error logging mehnat_uz:', error);
          results.push({
            destination: 'mehnat_uz',
            status: 'failed',
            error: 'Failed to log disabled destination',
          });
        }
      } else {
        // Unknown destination
        results.push({
          destination: destination,
          status: 'failed',
          error: 'Unknown destination',
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Resend completed',
        results: results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + error,
      },
      { status: 500 }
    );
  }
}