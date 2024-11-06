CREATE TABLE `links` (
	`id` text PRIMARY KEY NOT NULL,
	`href` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `links_href_unique` ON `links` (`href`);