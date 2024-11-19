import type { RequestHandler } from './$types';
import { client } from '$lib/logic/directus';
import { listPages } from '$lib/types/client';
// import { PUBLIC_SITE_URL } from '$env/static/public';
import { SITE_URL } from '$env/static/private';
import type { Collections } from '$lib/types/client';

export const GET: RequestHandler = async ({ fetch }) => {
    const directus = client(fetch);
    const frequency = "weekly";
    const priority = "0.8";

    const conditions = {
        "_and": [
            {
                "status": { "_nin": ['archived', 'draft'] },
            }, {
                "seo_detail": { "_nnull": true }
            }
        ]
    }

    const manualEntries = [
        {
            path: "",
            lastmod: new Date().toISOString(),
            frequency,
            priority,
        },
        {
            path: "/kitchen",
            lastmod: new Date().toISOString(),
            frequency,
            priority,
        },
        {
            path: "/contact",
            lastmod: new Date().toISOString(),
            frequency: "weekly",
            priority,
        }
    ]

    const pages = await directus.request(listPages({
        filter: conditions,
        fields: ["permalink", "date_updated", { seo_detail: ["meta_robots"] }]
    }))


    const convertToSitemapEntries = (items: Collections.Pages[]) => {
        return items
            .filter(item =>
                !item.seo_detail?.meta_robots?.includes("noindex")
            )
            .map((item) => {
                return {
                    path: `/${item.permalink}`,
                    lastmod: item?.date_updated,
                    frequency: "weekly",
                    priority: "0.8",
                    robots: item?.seo_detail?.meta_robots,
                }
            })
    }




    const pagesAndPosts = [
        ...manualEntries,
        ...convertToSitemapEntries(pages),
        // ...postsEntries,
    ];


    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pagesAndPosts
            .map((entry) => {
                return `
                <url>
                    <loc>${SITE_URL}${entry.path}</loc>
                    <lastmod>${entry.lastmod}</lastmod>
                    <changefreq>${entry.frequency}</changefreq>
                    <priority>${entry.priority}</priority>
                </url>`;
            })
            .join("")}
    </urlset>`;


    return new Response(xml, {
        headers: {
            "Cache-Control": "max-age=0, s-maxage=3600",
            "Content-Type": "application/xml",
        },
    });
};