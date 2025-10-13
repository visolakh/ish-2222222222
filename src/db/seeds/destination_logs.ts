import { db } from '@/db';
import { destinationLogs } from '@/db/schema';

async function main() {
    const sampleDestinationLogs = [
        // Application ID 2 - Both successful
        {
            applicationId: 2,
            destinationName: 'horizon_email',
            status: 'success',
            statusCode: 200,
            requestId: null,
            responseBody: 'Email sent to contact@horizonwork.uz',
            errorMessage: null,
            attemptedAt: new Date('2024-02-20T14:35:01Z').toISOString(),
            createdAt: new Date('2024-02-20T14:35:01Z').toISOString(),
        },
        {
            applicationId: 2,
            destinationName: 'horizon_webhook',
            status: 'success',
            statusCode: 200,
            requestId: 'req-webhook-84721',
            responseBody: '{"received":true,"id":"webhook-84721"}',
            errorMessage: null,
            attemptedAt: new Date('2024-02-20T14:35:03Z').toISOString(),
            createdAt: new Date('2024-02-20T14:35:03Z').toISOString(),
        },
        // Application ID 3 - Both successful
        {
            applicationId: 3,
            destinationName: 'horizon_email',
            status: 'success',
            statusCode: 200,
            requestId: null,
            responseBody: 'Email sent to contact@horizonwork.uz',
            errorMessage: null,
            attemptedAt: new Date('2024-02-21T09:42:01Z').toISOString(),
            createdAt: new Date('2024-02-21T09:42:01Z').toISOString(),
        },
        {
            applicationId: 3,
            destinationName: 'horizon_webhook',
            status: 'success',
            statusCode: 200,
            requestId: 'req-webhook-92463',
            responseBody: '{"received":true,"id":"webhook-92463"}',
            errorMessage: null,
            attemptedAt: new Date('2024-02-21T09:42:02Z').toISOString(),
            createdAt: new Date('2024-02-21T09:42:02Z').toISOString(),
        },
        // Application ID 4 - Email success, webhook failed
        {
            applicationId: 4,
            destinationName: 'horizon_email',
            status: 'success',
            statusCode: 200,
            requestId: null,
            responseBody: 'Email sent to contact@horizonwork.uz',
            errorMessage: null,
            attemptedAt: new Date('2024-02-22T16:18:01Z').toISOString(),
            createdAt: new Date('2024-02-22T16:18:01Z').toISOString(),
        },
        {
            applicationId: 4,
            destinationName: 'horizon_webhook',
            status: 'failed',
            statusCode: 503,
            requestId: null,
            responseBody: null,
            errorMessage: 'Service temporarily unavailable',
            attemptedAt: new Date('2024-02-22T16:18:03Z').toISOString(),
            createdAt: new Date('2024-02-22T16:18:03Z').toISOString(),
        },
        // Application ID 5 - Email success, webhook failed
        {
            applicationId: 5,
            destinationName: 'horizon_email',
            status: 'success',
            statusCode: 200,
            requestId: null,
            responseBody: 'Email sent to contact@horizonwork.uz',
            errorMessage: null,
            attemptedAt: new Date('2024-02-23T11:55:01Z').toISOString(),
            createdAt: new Date('2024-02-23T11:55:01Z').toISOString(),
        },
        {
            applicationId: 5,
            destinationName: 'horizon_webhook',
            status: 'failed',
            statusCode: 503,
            requestId: null,
            responseBody: null,
            errorMessage: 'Service temporarily unavailable',
            attemptedAt: new Date('2024-02-23T11:55:02Z').toISOString(),
            createdAt: new Date('2024-02-23T11:55:02Z').toISOString(),
        },
        // Application ID 6 - Both successful
        {
            applicationId: 6,
            destinationName: 'horizon_email',
            status: 'success',
            statusCode: 200,
            requestId: null,
            responseBody: 'Email sent to contact@horizonwork.uz',
            errorMessage: null,
            attemptedAt: new Date('2024-02-24T08:27:01Z').toISOString(),
            createdAt: new Date('2024-02-24T08:27:01Z').toISOString(),
        },
        {
            applicationId: 6,
            destinationName: 'horizon_webhook',
            status: 'success',
            statusCode: 200,
            requestId: 'req-webhook-73581',
            responseBody: '{"received":true,"id":"webhook-73581"}',
            errorMessage: null,
            attemptedAt: new Date('2024-02-24T08:27:03Z').toISOString(),
            createdAt: new Date('2024-02-24T08:27:03Z').toISOString(),
        },
        // Application ID 7 - Email success, webhook failed
        {
            applicationId: 7,
            destinationName: 'horizon_email',
            status: 'success',
            statusCode: 200,
            requestId: null,
            responseBody: 'Email sent to contact@horizonwork.uz',
            errorMessage: null,
            attemptedAt: new Date('2024-02-25T13:39:01Z').toISOString(),
            createdAt: new Date('2024-02-25T13:39:01Z').toISOString(),
        },
        {
            applicationId: 7,
            destinationName: 'horizon_webhook',
            status: 'failed',
            statusCode: 503,
            requestId: null,
            responseBody: null,
            errorMessage: 'Service temporarily unavailable',
            attemptedAt: new Date('2024-02-25T13:39:02Z').toISOString(),
            createdAt: new Date('2024-02-25T13:39:02Z').toISOString(),
        },
        // Application ID 8 - Both successful
        {
            applicationId: 8,
            destinationName: 'horizon_email',
            status: 'success',
            statusCode: 200,
            requestId: null,
            responseBody: 'Email sent to contact@horizonwork.uz',
            errorMessage: null,
            attemptedAt: new Date('2024-02-26T10:14:01Z').toISOString(),
            createdAt: new Date('2024-02-26T10:14:01Z').toISOString(),
        },
        {
            applicationId: 8,
            destinationName: 'horizon_webhook',
            status: 'success',
            statusCode: 200,
            requestId: 'req-webhook-56294',
            responseBody: '{"received":true,"id":"webhook-56294"}',
            errorMessage: null,
            attemptedAt: new Date('2024-02-26T10:14:03Z').toISOString(),
            createdAt: new Date('2024-02-26T10:14:03Z').toISOString(),
        },
        // Application ID 9 - Email success, webhook failed
        {
            applicationId: 9,
            destinationName: 'horizon_email',
            status: 'success',
            statusCode: 200,
            requestId: null,
            responseBody: 'Email sent to contact@horizonwork.uz',
            errorMessage: null,
            attemptedAt: new Date('2024-02-27T15:51:01Z').toISOString(),
            createdAt: new Date('2024-02-27T15:51:01Z').toISOString(),
        },
        {
            applicationId: 9,
            destinationName: 'horizon_webhook',
            status: 'failed',
            statusCode: 503,
            requestId: null,
            responseBody: null,
            errorMessage: 'Service temporarily unavailable',
            attemptedAt: new Date('2024-02-27T15:51:02Z').toISOString(),
            createdAt: new Date('2024-02-27T15:51:02Z').toISOString(),
        },
    ];

    await db.insert(destinationLogs).values(sampleDestinationLogs);
    
    console.log('✅ Destination logs seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});