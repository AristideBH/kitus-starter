import type { PageServerLoad } from './$types';
import { client, directusError } from '$lib/logic/directus';
import { readHomepage } from '$lib/types/client';
export const load = (async ({ fetch }) => {
    try {
        const directus = client(fetch);
        const home = await directus.request(
            readHomepage({ fields: ['img', { seo_detail: ["*"] }] })
        );
        return {
            home
        };

    } catch (error) {
        directusError(error);

    }
}) satisfies PageServerLoad;