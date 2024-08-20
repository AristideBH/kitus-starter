import type { PageLoad } from './$types';
import { client } from '$lib/logic/directus';
import { readMe } from "@directus/sdk";
import { error } from "@sveltejs/kit";


export const load = (async ({ parent, fetch }) => {
    const { token } = await parent();
    const directus = client(fetch, token);
    try {
        return {
            user: await directus.request(
                readMe({ fields: ['*'] })
            ),
        };
    } catch {
        error(404, "User not found");
    }
}) satisfies PageLoad;