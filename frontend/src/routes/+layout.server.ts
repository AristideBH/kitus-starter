import type { LayoutServerLoad } from './$types';
import { client } from '$logic/directus';
import { readMenus } from '$lib/types/client';

export const load = (async ({ url, fetch, locals }) => {
    // const user = locals.user;
    const token = locals.token ? locals.token : null;
    const directus = client(fetch, token);

    //@ts-expect-error TS screams when using dot notation for Directus fields
    const headerNav = await directus.request(readMenus("Header", { fields: ["*.*.*.*.*"] }));

    return {
        // Trigger for pages transition
        pathName: url.pathname,
        // Navigation
        headerNav
    };
}) satisfies LayoutServerLoad;