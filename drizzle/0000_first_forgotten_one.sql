CREATE TABLE `applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`submission_id` text NOT NULL,
	`full_name` text NOT NULL,
	`phone` text NOT NULL,
	`desired_position` text,
	`submitted_at` text NOT NULL,
	`page_url` text,
	`language` text NOT NULL,
	`utm_source` text,
	`utm_campaign` text,
	`status` text DEFAULT 'new' NOT NULL,
	`honeypot` text,
	`ip_address` text,
	`user_agent` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `applications_submission_id_unique` ON `applications` (`submission_id`);--> statement-breakpoint
CREATE TABLE `destination_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`application_id` integer NOT NULL,
	`destination_name` text NOT NULL,
	`status` text NOT NULL,
	`status_code` integer,
	`request_id` text,
	`response_body` text,
	`error_message` text,
	`attempted_at` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON UPDATE no action ON DELETE no action
);
