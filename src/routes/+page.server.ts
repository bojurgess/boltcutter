import { drizzle } from 'drizzle-orm/d1';
import type { Actions } from './$types';
import { links } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, platform }) => {
		const form = await request.formData();
		const href = form.get('href') as string;

		const db = drizzle(platform!.env.DATABASE);

		let row: { id: string } | undefined;

		[row] = await db.select({ id: links.id }).from(links).where(eq(links.href, href));

		if (!row) {
			[row] = await db.insert(links).values({ id: generateID(), href }).returning({ id: links.id });
		}

		if (!row.id) {
			return fail(500);
		} else {
			return { id: row.id };
		}
	}
};

function generateID() {
	return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
