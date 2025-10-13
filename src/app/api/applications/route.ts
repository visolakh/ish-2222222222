import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { applications, destinationLogs } from '@/db/schema';
import { eq, desc, gt, and, sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      full_name,
      phone,
      desired_position,
      page_url,
      language,
      utm_source,
      utm_campaign,
      honeypot
    } = body;

    // Validation: honeypot field must be empty
    if (honeypot && honeypot.trim() !== '') {
      return NextResponse.json(
        { error: 'Invalid submission', code: 'HONEYPOT_FILLED' },
        { status: 400 }
      );
    }

    // Validation: full_name is required
    if (!full_name || full_name.trim() === '') {
      return NextResponse.json(
        { error: 'Full name is required', code: 'MISSING_FULL_NAME' },
        { status: 400 }
      );
    }

    // Validation: phone is required and must match Uzbekistan pattern
    if (!phone || phone.trim() === '') {
      return NextResponse.json(
        { error: 'Phone number is required', code: 'MISSING_PHONE' },
        { status: 400 }
      );
    }

    const phonePattern = /^\+998[0-9]{9}$/;
    if (!phonePattern.test(phone.trim())) {
      return NextResponse.json(
        {
          error: 'Phone number must start with +998 and have 9 digits after',
          code: 'INVALID_PHONE_FORMAT'
        },
        { status: 400 }
      );
    }

    // Validation: language must be one of ru, uz, en
    const validLanguages = ['ru', 'uz', 'en'];
    const normalizedLanguage = language?.trim() || 'ru';
    if (!validLanguages.includes(normalizedLanguage)) {
      return NextResponse.json(
        {
          error: 'Language must be one of: ru, uz, en',
          code: 'INVALID_LANGUAGE'
        },
        { status: 400 }
      );
    }

    // Extract IP address from request headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ipAddress = forwardedFor?.split(',')[0].trim() || realIp || 'unknown';

    // Rate limiting: check if application exists from this IP in last 60 seconds
    const sixtySecondsAgo = new Date(Date.now() - 60000).toISOString();
    const recentApplications = await db
      .select()
      .from(applications)
      .where(
        and(
          eq(applications.ipAddress, ipAddress),
          gt(applications.createdAt, sixtySecondsAgo)
        )
      )
      .limit(1);

    if (recentApplications.length > 0) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      );
    }

    // Generate submission ID
    const submissionId = uuidv4();

    // Extract user agent
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Current timestamp
    const now = new Date().toISOString();

    // Insert application
    const newApplication = await db
      .insert(applications)
      .values({
        submissionId,
        fullName: full_name.trim(),
        phone: phone.trim(),
        desiredPosition: desired_position?.trim() || null,
        submittedAt: now,
        pageUrl: page_url?.trim() || null,
        language: normalizedLanguage,
        utmSource: utm_source?.trim() || null,
        utmCampaign: utm_campaign?.trim() || null,
        status: 'new',
        honeypot: honeypot || null,
        ipAddress,
        userAgent,
        createdAt: now,
        updatedAt: now
      })
      .returning();

    const applicationId = newApplication[0].id;

    // Destination 1: horizon_email (simulated)
    await db.insert(destinationLogs).values({
      applicationId,
      destinationName: 'horizon_email',
      status: 'success',
      statusCode: 200,
      requestId: null,
      responseBody: 'Email simulation successful',
      errorMessage: null,
      attemptedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    });

    // Destination 2: horizon_webhook
    const webhookPayload = {
      source: 'horizonwork.uz',
      submission_id: submissionId,
      submitted_at: now,
      language: normalizedLanguage,
      page_url: page_url?.trim() || null,
      utm: {
        source: utm_source?.trim() || null,
        campaign: utm_campaign?.trim() || null
      },
      applicant: {
        full_name: full_name.trim(),
        phone: phone.trim(),
        desired_position: desired_position?.trim() || null
      }
    };

    try {
      const webhookResponse = await fetch(
        'https://api.horizonwork.uz/hooks/applications',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(webhookPayload)
        }
      );

      const responseText = await webhookResponse.text();
      let responseBody = responseText;
      try {
        responseBody = JSON.stringify(JSON.parse(responseText));
      } catch {
        // Keep as text if not valid JSON
      }

      if (webhookResponse.ok) {
        await db.insert(destinationLogs).values({
          applicationId,
          destinationName: 'horizon_webhook',
          status: 'success',
          statusCode: webhookResponse.status,
          requestId: webhookResponse.headers.get('x-request-id') || null,
          responseBody,
          errorMessage: null,
          attemptedAt: new Date().toISOString(),
          createdAt: new Date().toISOString()
        });
      } else {
        await db.insert(destinationLogs).values({
          applicationId,
          destinationName: 'horizon_webhook',
          status: 'failed',
          statusCode: webhookResponse.status,
          requestId: webhookResponse.headers.get('x-request-id') || null,
          responseBody,
          errorMessage: `HTTP ${webhookResponse.status}: ${webhookResponse.statusText}`,
          attemptedAt: new Date().toISOString(),
          createdAt: new Date().toISOString()
        });
      }
    } catch (webhookError) {
      console.error('Webhook error:', webhookError);
      await db.insert(destinationLogs).values({
        applicationId,
        destinationName: 'horizon_webhook',
        status: 'failed',
        statusCode: null,
        requestId: null,
        responseBody: null,
        errorMessage: webhookError instanceof Error ? webhookError.message : String(webhookError),
        attemptedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      });
    }

    return NextResponse.json(
      {
        success: true,
        submission_id: submissionId,
        message: 'Application submitted successfully'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/applications error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Fetch all applications ordered by created_at DESC
    const allApplications = await db
      .select()
      .from(applications)
      .orderBy(desc(applications.createdAt));

    // For each application, fetch its destination logs
    const applicationsWithLogs = await Promise.all(
      allApplications.map(async (app) => {
        const logs = await db
          .select({
            id: destinationLogs.id,
            destination_name: destinationLogs.destinationName,
            status: destinationLogs.status,
            status_code: destinationLogs.statusCode,
            response_body: destinationLogs.responseBody,
            error_message: destinationLogs.errorMessage,
            attempted_at: destinationLogs.attemptedAt
          })
          .from(destinationLogs)
          .where(eq(destinationLogs.applicationId, app.id));

        return {
          id: app.id,
          submission_id: app.submissionId,
          full_name: app.fullName,
          phone: app.phone,
          desired_position: app.desiredPosition,
          status: app.status,
          submitted_at: app.submittedAt,
          language: app.language,
          page_url: app.pageUrl,
          utm_source: app.utmSource,
          utm_campaign: app.utmCampaign,
          created_at: app.createdAt,
          destination_logs: logs
        };
      })
    );

    return NextResponse.json(applicationsWithLogs, { status: 200 });
  } catch (error) {
    console.error('GET /api/applications error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
      },
      { status: 500 }
    );
  }
}