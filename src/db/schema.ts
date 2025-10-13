import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const applications = sqliteTable('applications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  submissionId: text('submission_id').notNull().unique(),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  desiredPosition: text('desired_position'),
  submittedAt: text('submitted_at').notNull(),
  pageUrl: text('page_url'),
  language: text('language').notNull(),
  utmSource: text('utm_source'),
  utmCampaign: text('utm_campaign'),
  status: text('status').notNull().default('new'),
  honeypot: text('honeypot'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const destinationLogs = sqliteTable('destination_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  applicationId: integer('application_id').notNull().references(() => applications.id),
  destinationName: text('destination_name').notNull(),
  status: text('status').notNull(),
  statusCode: integer('status_code'),
  requestId: text('request_id'),
  responseBody: text('response_body'),
  errorMessage: text('error_message'),
  attemptedAt: text('attempted_at').notNull(),
  createdAt: text('created_at').notNull(),
});