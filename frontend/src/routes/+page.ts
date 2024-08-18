import type { PageLoad } from './$types';
import { client } from '$lib/logic/directus';
import { readPages } from '$lib/types/client';

export const load = (async ({ fetch }) => {
    const directus = client(fetch);

    const page = await directus.request(readPages("b5a79e88-ee47-403f-9849-625bb4a757cb"));
    return {
        page: page
    };
}) satisfies PageLoad;

