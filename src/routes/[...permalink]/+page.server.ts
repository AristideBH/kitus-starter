import type { PageServerLoad } from './$types';

import { client } from '$lib/logic/directus';
import { listPages } from '$lib/types/client';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, fetch }) => {
    const directus = client(fetch);

    const pages = await directus.request(listPages(
        {
            filter: {
                "_and": [
                    {
                        "status": {
                            "_nin": ['archived', 'draft']
                        }
                    },
                    {
                        "permalink": {
                            "_eq": params.permalink
                        }
                    }

                ]
            },
            fields:
                ["title", "editor"]
        }
    ))

    if (pages.length === 0) {
        error(404, "Page not found");
    }

    return {
        page: pages[0]
    };
}) satisfies PageServerLoad;