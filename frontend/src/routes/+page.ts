import type { PageLoad } from './$types';
import { client } from '$lib/logic/directus';
import { readHomepage } from '$lib/types/client';

export const load = (async ({ fetch }) => {
    const directus = client(fetch);
    const homepage = await directus.request(readHomepage({
        fields: [
            { img: ["id", "title", "width", "height", "description", "focal_point_x", "focal_point_y", "thumbhash"] }
            // "img"
        ]
    }));
    return {
        img: homepage.img
    };
}) satisfies PageLoad;

