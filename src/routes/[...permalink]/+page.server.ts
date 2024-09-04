import type { PageServerLoad } from './$types';

import { client } from '$lib/logic/directus';
import { listPages } from '$lib/types/client';
import { error } from '@sveltejs/kit';
import { adaptToTipTapNodes, processContent } from '$lib/components/editor/index.svelte';

export const load = (async ({ params, fetch }) => {
    const directus = client(fetch);

    const pages = await directus.request(listPages(
        {
            filter: {
                "_and": [
                    {
                        "status": { "_nin": ['archived', 'draft'] }
                    },
                    {
                        "permalink": { "_eq": params.permalink }
                    }

                ]
            },
            fields: ["title", "editor", { seo_detail: ["*"] }]
        }
    ))

    if (pages.length === 0) error(404, "Page not found");

    const editor = await processContent(pages[0].editor.content, directus);

    return {
        page: pages[0],
        editor: adaptToTipTapNodes(editor)
    };
}) satisfies PageServerLoad;