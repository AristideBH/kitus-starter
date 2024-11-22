import type { LayoutServerLoad } from './$types';
import { client } from '$logic/directus';
import { readMenus } from '$lib/types/client';
import { readSettings } from '@directus/sdk';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, locals, url }) => {
    const user = locals.user;
    const token = locals.token ?? null;
    const directus = client(fetch, token);

    //@ts-expect-error TS screams when using dot notation for Directus fields
    const headerNav = await directus.request(readMenus("Header", { fields: ["*.*.*.*.*.*"] }));
    //@ts-expect-error TS screams when using dot notation for Directus fields
    const footerNav = await directus.request(readMenus("Footer", { fields: ["*.*.*"] }));
    const global = await directus.request(readSettings());


    if (global.maintenance_state && url.pathname !== "/maintenance") {
        redirect(307, "/maintenance");
    } else if (url.pathname === "/maintenance" && !global.maintenance_state) {
        redirect(307, "/");
    }


    return {
        // Transition
        pathName: url.pathname,
        // Auth
        user,
        token,
        // Data
        headerNav,
        footerNav,
        global,
        maintenance: {
            state: global.maintenance_state,
            title: global.maintenance_title,
            description: global.maintenance_description
        }
    };
}) satisfies LayoutServerLoad;