import type { PageLoad } from './$types';
import { client } from '$lib/logic/directus';
import { readHomepage, readPages } from '$lib/types/client';

export const load = (async ({ fetch }) => {
    const directus = client(fetch);
    // const homepage = await directus.request(readHomepage({
    //     fields: [
    //         // { img: ["id", "title", "width", "height", "description", "focal_point_x", "focal_point_y", "thumbhash"] }
    //         "img"
    //     ]
    // }));
    const page = await directus.request(readPages("b5a79e88-ee47-403f-9849-625bb4a757cb"));
    return {
        // img: homepage.img,
        page: page
    };
}) satisfies PageLoad;

