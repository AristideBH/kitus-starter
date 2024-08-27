import type { PageServerLoad } from './$types';

import { client, type DirectusClient } from '$lib/logic/directus';
import { listPages } from '$lib/types/client';
import { error } from '@sveltejs/kit';
import { elementQuery } from '$lib/components/editor/index.svelte';
import type { CustomAttrs } from '$lib/components/editor';

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
                ["title", "editor",]
        }
    ))

    if (pages.length === 0) {
        error(404, "Page not found");
    }

    type EditorItem = {
        type: string,
        attrs: CustomAttrs
    }

    async function processContent(content: unknown[], directus: DirectusClient) {
        return Promise.all(content.map(async (item: EditorItem) => {
            if (item.type === "relation-block") {
                const data = await elementQuery(directus, item.attrs);
                if (data && 'editor' in data && Array.isArray(data.editor.content)) {
                    // Recursively process nested content
                    data.editor.content = await processContent(data.editor.content, directus);
                }
                return data;
            }
            return item;
        }));
    }

    const editor = await processContent(pages[0].editor.content, directus);



    // console.log('🩺: load -> mappedContent', mappedContent[0].editor.content)




    return {
        page: pages[0], editor
    };
}) satisfies PageServerLoad;