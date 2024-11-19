import type { RequestHandler } from './$types';
import { client } from '$lib/logic/directus';
import { listPages } from '$lib/types/client';
import { PUBLIC_SITE_URL } from '$env/static/public';
import { gzip } from 'zlib';
import { promisify } from 'util';

enum Frequency {
    ALWAYS = 'always',
    HOURLY = 'hourly',
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
    NEVER = 'never'
}
interface SitemapEntry {
    path: string;
    lastmod: string;
    frequency: Frequency;
    priority: string;
}

const compress = promisify(gzip);

export const GET: RequestHandler = async ({ fetch }) => {
    const directus = client(fetch);
    const frequency = Frequency.WEEKLY;
    const priority = "0.8";

    const conditions = {
        "_and": [
            { "status": { "_nin": ['archived', 'draft'] } },
            { "seo_detail": { "_nnull": true } }
        ]
    };

    const manualEntries: SitemapEntry[] = [
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
            path: "/layout",
            lastmod: new Date().toISOString(),
            frequency,
            priority,
        },
        {
            path: "/contact",
            lastmod: new Date().toISOString(),
            frequency,
            priority,
        }
    ];

    try {
        const pages = await directus.request(listPages({
            filter: conditions,
            fields: ["permalink", "date_updated", { seo_detail: ["meta_robots"] }]
        }));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const convertToSitemapEntries = (items: any[]): SitemapEntry[] => {
            return items
                .filter(item => !item.seo_detail?.meta_robots?.includes("noindex"))
                .map((item) => ({
                    path: `/${item.permalink}`,
                    lastmod: item?.date_updated,
                    frequency,
                    priority
                }));
        };

        const pagesAndPosts = [
            ...manualEntries,
            ...convertToSitemapEntries(pages),
            // add posts and other collections here
        ];

        const getLastModified = (entries: SitemapEntry[]) => {
            return new Date(Math.max(...entries.map(e => new Date(e.lastmod).getTime()))).toISOString();
        };

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pagesAndPosts
                .map((entry) => `
                    <url>
                        <loc>${PUBLIC_SITE_URL}${entry.path}</loc>
                        <lastmod>${entry.lastmod}</lastmod>
                        <changefreq>${entry.frequency}</changefreq>
                        <priority>${entry.priority}</priority>
                    </url>`
                ).join("")}
        </urlset>`.replace(/>\s+</g, '><').trim();

        const compressed = await compress(xml);

        return new Response(compressed, {
            headers: {
                "Cache-Control": "max-age=0, s-maxage=3600",
                "Content-Type": "application/xml",
                "Content-Encoding": "gzip",
                "Last-Modified": getLastModified(pagesAndPosts)
            },
        });
    } catch (error) {
        console.error('Failed to fetch pages:', error);
        return new Response('Error generating sitemap', { status: 500 });
    }
};
