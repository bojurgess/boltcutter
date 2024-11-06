import { drizzle } from 'drizzle-orm/d1';
import type { RequestHandler } from './$types';
import { links } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, platform }) => {
	console.log(platform?.env.DATABASE);

	const db = drizzle(platform!.env.DATABASE);
	const { id } = params;

	const [row] = await db.select({ href: links.href }).from(links).where(eq(links.id, id));

	if (!row) {
		return new Response(null, { status: 404 });
	}

	return redirect(301, row.href);
};
