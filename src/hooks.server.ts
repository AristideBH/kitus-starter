import type { Cookies, Handle } from '@sveltejs/kit';
import type { JwtPayload } from 'jsonwebtoken';

import jwt from "jsonwebtoken";
import { redirect } from '@sveltejs/kit';
import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
import { constructCookieOpts } from '$logic/directus';

const TOKEN_EXPIRATION_BUFFER = 300;

// exchange the refresh token for an access token
async function refreshAccessToken(cookies: Cookies) {
    const res = await fetch(PUBLIC_DIRECTUS_URL + "/auth/refresh", {
        method: "POST",
        mode: "cors",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: cookies.get('refresh_token') }),
    });

    if (res.status >= 300) {
        cookies.delete('refresh_token', { path: '/' });
        cookies.delete('access_token', { path: '/' });
        throw new Error("Refresh Token Status != 200");
    }
    const data = (await res.json()).data;

    cookies.set("refresh_token", data.refresh_token, constructCookieOpts(60 * 60 * 24 * 30));
    cookies.set("access_token", data.access_token, constructCookieOpts(Math.floor(data.expires / 1000)));
}

function isTokenExpired(jwtPayload: JwtPayload | null) {
    return jwtPayload?.exp ? jwtPayload.exp < Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION_BUFFER : true;

}

function shouldProtectRoute(url: string) {
    return url.split("/").includes("(protected)")
}

export const handle: Handle = async ({ event, resolve }) => {
    const { cookies, url } = event

    if (cookies.get('access_token') || cookies.get('refresh_token')) {
        let jwtPayload = cookies.get('access_token') ? jwt.decode(cookies.get('access_token') || '') as jwt.JwtPayload | null : null;

        if (isTokenExpired(jwtPayload) || !cookies.get('access_token')) {
            try {
                await refreshAccessToken(cookies);
                jwtPayload = cookies.get('access_token') ? jwt.decode(cookies.get('access_token') || '') as jwt.JwtPayload | null : null;
            } catch {
                cookies.delete('refresh_token', { path: '/' });
                cookies.delete('access_token', { path: '/' });
            }
        }

        event.locals.user = (jwtPayload as jwt.JwtPayload)?.id;
        event.locals.token = cookies.get('access_token');
    }

    if (event.route.id && shouldProtectRoute(event.route.id) && !event.locals.user) {
        throw redirect(302, `/login?redirectedFrom=${encodeURIComponent(url.pathname)}`);
    }

    // this is needed so that the response headers from SvelteKit do include the correct header to allow the browser to parse json requests
    return await resolve(event, {
        filterSerializedResponseHeaders: (key) => {
            return key.toLowerCase() === 'content-type'
        }
    });
};