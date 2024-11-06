import { drizzle } from 'drizzle-orm/d1';
import type { Actions } from './$types';
import { links } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, platform }) => {
		const form = await request.formData();
		const href = form.get('href') as string;

		const db = drizzle(platform!.env.DATABASE);

		let row: { id: string } | undefined;

		await db.transaction(async (tx) => {
			[row] = await tx.select({ id: links.id }).from(links).where(eq(links.href, href));

			if (!row) {
				[row] = await tx
					.insert(links)
					.values({ id: generateID(), href })
					.returning({ id: links.id });
			}
		});

		if (!row) {
			return error(500, 'Failed to create link');
		} else {
			return row.id;
		}
	}
};

function generateID() {
	return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
