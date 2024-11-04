import type { Types } from "$lib/types/client";

import Image from "./Image.svelte";
import { PixelSizes, type DirectusClient, type DirectusImagePreset, assetBaseUrl, type CustomDirectusFile } from "$lib/logic/directus";
import { readFile } from "@directus/sdk";
import { thumbHashToDataURL } from 'thumbhash';

type ImageProps = {
    item: CustomDirectusFile | Types.Optional<string>;
    alt?: string;
    title?: string;
    preset?: DirectusImagePreset;
    transformations?: Record<string, string | number> | null;
    class?: string;
    showCaption?: boolean;
    loading?: 'lazy' | 'eager';
    aspectOverwrite?: boolean
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
                'description',
                'type'

            ]
        })
    )
};


/**
 * Generates a srcset string for an image with the given ID, using the predefined PixelSizes.
 * The srcset will contain the asset URL with the image ID, along with the size in pixels as the descriptor.
 * This is useful for providing responsive image sources to the browser.
 *
 * @param id - The ID of the image to generate the srcset for.
 * @returns A comma-separated string of image sources with size descriptors.
 */
const getImgSrcSet = (
    id: string
) => {
    const srcSet = [];
    for (const size of PixelSizes)
        srcSet.push(`${assetBaseUrl}${id}?key=${size} ${size.replace('px', '')}w`)
    return srcSet.join(', ');
}


/**
 * Generates the URL for an image asset with optional transformations or a preset.
 *
 * @param id - The ID of the image asset.
 * @param preset - An optional Directus image preset to apply to the URL.
 * @param transformations - An optional object of key-value pairs representing image transformations to apply to the URL.
 * @returns The URL for the image asset with the specified preset or transformations.
 */
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


/**
 * Generates the URL for a thumbhash image.
 *
 * @param thumbhash - The thumbhash string to convert to a data URL.
 * @returns The data URL for the thumbhash image.
 */
const getThumbhashUrl = (thumbhash: string) => {
    return thumbHashToDataURL(Uint8Array.from(atob(thumbhash ?? ''), (c) => c.charCodeAt(0)));
};


/**
 * Sets up an IntersectionObserver on the provided HTML element and calls the provided callback function when the element becomes visible in the viewport.
 *
 * @param element - The HTML element to observe.
 * @param callback - The function to call when the element becomes visible.
 * @returns A function that can be called to disconnect the observer.
 */
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
    // Types,
    type ImageProps,
    // Component
    Image,
    // Functions
    getFileInfos,
    getImgUrl,
    getImgSrcSet,
    getThumbhashUrl,
    setIntersectionObserver
}