import Image from "./Image.svelte";
import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
import { handleDirectusErrors, PixelSizes, type Client, type DirectusImagePreset } from "$lib/logic/directus";
import { readFile } from "@directus/sdk";
import { thumbHashToDataURL } from 'thumbhash';

/**
 * Fetches file information from the Directus API.
 * @param client The Directus client instance.
 * @param id The ID of the file to fetch.
 * @returns A promise that resolves to the file information.
 * @throws Will throw an error if the API request fails.
 */
const fetchFileInfo = async (client: Client, id: string) => {
    return await client.request(
        readFile(id, {
            fields: [
                'id',
                'title',
                'width',
                'height',
                'focal_point_y',
                'focal_point_x',
                'thumbhash',
                'description'
            ]
        })
    )
};
const baseUrl = `${PUBLIC_DIRECTUS_URL}/assets/`;

const getImgSrcSet = (
    id: string
) => {
    const srcSet = [];
    for (const size of PixelSizes)
        srcSet.push(`${baseUrl}${id}?key=${size} ${size.replace('px', '')}w`)
    return srcSet.join(', ');
}


const getImgUrl = (
    id: string,
    preset?: DirectusImagePreset | null,
    transformations?: Record<string, string | number> | null
) => {


    if (preset) {
        return `${baseUrl}${id}?key=${preset}`;
    }

    if (transformations) {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(transformations)) {
            params.append(key, value.toString());
        }
        return `${baseUrl}${id}?${params.toString()}`;
    }

    return `${baseUrl}${id}`;
};


const getThumbhashUrl = (thumbhash: string) => {
    return thumbHashToDataURL(Uint8Array.from(atob(thumbhash ?? ''), (c) => c.charCodeAt(0)));
};

function setupIntersectionObserver(element: HTMLElement, callback: () => void) {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                callback();
                observer.unobserve(entry.target);
            }
        },
        { rootMargin: '-50px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
}


export {
    // Component
    Image,
    // Functions
    fetchFileInfo,
    getImgUrl,
    getImgSrcSet,
    getThumbhashUrl,
    setupIntersectionObserver
}