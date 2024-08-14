import type { PageLoad } from './$types';
import { client } from '$lib/logic/directus';
import { readHomepage } from '$lib/types/client';

export const load = (async ({ fetch }) => {
    const directus = client(fetch);
    return {
        homepage: await directus.request(readHomepage())
    };
}) satisfies PageLoad;

