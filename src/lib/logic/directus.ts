import type { Schema, Collections, Types } from '$lib/types/client';
import type { SerializeOptions } from 'cookie';

import { createDirectus, rest, authentication, readFile } from '@directus/sdk';
import { PUBLIC_DIRECTUS_URL, PUBLIC_COOKIE_DOMAIN } from '$env/static/public';
import { error } from '@sveltejs/kit';
import { toast } from 'svelte-sonner';
import directusSettings from '$lib/directus-backend/collections/settings.json'

// * ////////////////////////////////////////////////////////////////////////////////
// * Types & definitions
// * ////////////////////////////////////////////////////////////////////////////////

export type Fetch = {
    (input: URL | RequestInfo | string, init?: RequestInit | undefined): Promise<Response>;
};

export type DirectusClient = ReturnType<typeof client>;

export type CustomDirectusFile = Partial<Types.Optional<Collections.DirectusFile>>
export const assetBaseUrl = `${PUBLIC_DIRECTUS_URL}/assets/`;
//@ts-expect-error this is a hack to get the type from a json object
export const PixelSizes = directusSettings[0].storage_asset_presets.map((preset) => preset.key) as const;
export type DirectusImagePreset = typeof PixelSizes[number];

export type DirectusTokens = {
    access_token: string,
    refresh_token: string,
    expires: number
}

// * ////////////////////////////////////////////////////////////////////////////////
// * Client
// * ////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a Directus client instance with authentication and REST helpers.
*
* @param fetch - Fetch function to use for requests.
* @param token - Auth token to use.
* @returns The Directus client instance.
*/
export function client(fetch: Fetch, token?: string | null) {
    //@ts-expect-error we pass the function not to execute it
    const options = fetch ? { globals: { fetch } } : {};
    const directus = createDirectus<Schema>(PUBLIC_DIRECTUS_URL, options)
        .with(authentication('cookie', { credentials: 'include' }))
        .with(rest());

    if (token) directus.setToken(token);
    return directus;
}


// * ////////////////////////////////////////////////////////////////////////////////
// * Utils functions
// * ////////////////////////////////////////////////////////////////////////////////


export const getImgData = async (uuid: string | null | undefined | Collections.DirectusFile) => {
    if (!uuid || typeof uuid === "object") return
    const directus = client(fetch);
    const data = await directus.request(readFile(uuid))
    return data as CustomDirectusFile
}


export const directusError = (err: unknown, showToast: boolean = false) => {
    if (typeof err === 'string') {
        const parsedErr = JSON.parse(err);
        if (showToast) toast.error(parsedErr.errors[0].message);
        error(401, parsedErr.errors[0].message);
    } else {
        error(401, 'Error while using SDK');
    }
}


// * ////////////////////////////////////////////////////////////////////////////////
// * Authentication
// * ////////////////////////////////////////////////////////////////////////////////

/**
 * Logs in a user by making a request to the Directus API login endpoint.
 *
 * @param request - The incoming request object.
 * @param email - The email of the user logging in.
 * @param password - The password of the user logging in.
 * @returns A promise resolving to the authentication tokens.
 */
export const loginUser = async (
    request: Request,
    email: FormDataEntryValue | null,
    password: FormDataEntryValue | null
): Promise<DirectusTokens> => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const userAgent = request.headers.get('user-agent');

    if (userAgent) headers['user-agent'] = userAgent;

    const req = await fetch(`${PUBLIC_DIRECTUS_URL}/auth/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            email,
            password
        })
    });

    if (req.status >= 300) throw new Error(await req.text());

    const json = await req.json();
    return json.data;
};

/**
 * Constructs cookie options for setting authentication cookies.
 *
 * @param age - Max age of the cookie in seconds
 * @returns Cookie options with domain, path, security settings, and maxAge set
 */
export const constructCookieOpts = (age: number): SerializeOptions & { path: string } => {
    return {
        domain: PUBLIC_COOKIE_DOMAIN,
        // send cookie for every page
        path: '/',
        // server side only cookie so you can't use `document.cookie`
        httpOnly: true,
        // only requests from same site can send cookies
        sameSite: 'strict',
        // only sent over HTTPS in production
        secure: process.env.NODE_ENV === 'production',
        // set cookie to expire after a given time
        maxAge: age
    };
};