import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './migrations',

	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID as string,
		databaseId: process.env.CLOUDFLARE_DATABASE_ID as string,
		token: process.env.CLOUDFLARE_D1_TOKEN as string
	},

	verbose: true,
	strict: true,
	dialect: 'sqlite',
	driver: 'd1-http'
});
