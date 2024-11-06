import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const links = sqliteTable('links', {
	id: text('id').primaryKey(),
	href: text('href').notNull().unique(),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
});
