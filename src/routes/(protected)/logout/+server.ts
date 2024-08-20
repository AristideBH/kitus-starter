import { redirect } from '@sveltejs/kit';
import { directusError } from '$lib/logic/directus.js';
import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

export async function GET({ cookies, fetch, request }) {
    try {
        if (cookies.get('refresh_token'))
            await fetch(`${PUBLIC_DIRECTUS_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'user-agent': request.headers.get("user-agent") ?? ''
                },
                body: JSON.stringify({ refresh_token: cookies.get('refresh_token') })
            });
    } catch (e) {
        directusError(e)
    }
    cookies.delete('refresh_token', { path: '/' });
    cookies.delete('access_token', { path: '/' });

    redirect(302, `/`);
}