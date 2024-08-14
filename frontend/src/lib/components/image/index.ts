import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
import { type Client } from "$lib/logic/directus";
import { readFile } from "@directus/sdk";

export const fetchFileInfo = async (client: Client, id: string) => {
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
    );
};

export const getImgUrl = (
    id: string,
    preset?: string | null,
    transformations?: Record<string, string | number> | null
) => {
    const baseUrl = `${PUBLIC_DIRECTUS_URL}/assets/`;

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