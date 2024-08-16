import Image from "./Image.svelte";
import { PixelSizes, type DirectusClient, type DirectusImagePreset, assetBaseUrl, type CustomDirectusFile } from "$lib/logic/directus";
import { readFile } from "@directus/sdk";
import { thumbHashToDataURL } from 'thumbhash';
import type { Types } from "$lib/types/client";

export type ImageProps = {
    item: CustomDirectusFile | Types.Optional<string>;
    alt?: string;
    title?: string;
    preset?: DirectusImagePreset;
    transformations?: Record<string, string | number> | null;
    class?: string;
    showCaption?: boolean;
    loading?: 'lazy' | 'eager';

};


/**
 * Fetches file information from the Directus API.
 * @param client The Directus client instance.
 * @param id The ID of the file to fetch.
 * @returns A promise that resolves to the file information.
 * @throws Will throw an error if the API request fails.
 */
const getFileInfos = async (client: DirectusClient, id: string) => {
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


const getImgSrcSet = (
    id: string
) => {
    const srcSet = [];
    for (const size of PixelSizes)
        srcSet.push(`${assetBaseUrl}${id}?key=${size} ${size.replace('px', '')}w`)
    return srcSet.join(', ');
}


const getImgUrl = (
    id: string,
    preset?: DirectusImagePreset | null,
    transformations?: Record<string, string | number> | null
) => {
    if (preset) return `${assetBaseUrl}${id}?key=${preset}`

    if (transformations) {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(transformations)) {
            params.append(key, value.toString());
        }
        return `${assetBaseUrl}${id}?${params.toString()}`;
    }

    return `${assetBaseUrl}${id}`;
};


const getThumbhashUrl = (thumbhash: string) => {
    return thumbHashToDataURL(Uint8Array.from(atob(thumbhash ?? ''), (c) => c.charCodeAt(0)));
};


const setIntersectionObserver = (element: HTMLElement, callback: () => void) => {
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
    getFileInfos,
    getImgUrl,
    getImgSrcSet,
    getThumbhashUrl,
    setIntersectionObserver
}