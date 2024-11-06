import { drizzle } from 'drizzle-orm/d1';
import type { Actions } from './$types';
import { links } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, fail } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { env } from '$env/dynamic/private';

const limiter = new RateLimiter({
	IP: [10, 'h'],
	IPUA: [5, 'm'],
	cookie: {
		name: 'limid',
		secret: env.RATE_LIMITER_SECRET,
		rate: [2, 'm'],
		preflight: true
	}
});

export const load = async (event) => {
	await limiter.cookieLimiter?.preflight(event);
};

export const actions: Actions = {
	default: async (event) => {
		if (await limiter.isLimited(event)) return error(429, 'Rate limit exceeded');
		const { request, platform } = event;

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
