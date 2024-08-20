import type { PageServerLoad, Actions } from './$types';

import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { createUser } from '@directus/sdk';

import { formSchema } from "$lib/types/forms/signin";
import { client, loginUser, constructCookieOpts, directusError } from '$logic/directus';


// Set in days - sync this with the Setting from Directus.
const REFRESH_TOKEN_TTL = 7;

// This makes sure that the login page is only available if the user is not logged in yet
export const load = (async ({ locals, url }) => {
    const redirectedFrom = url.searchParams.get('redirectedFrom')
    if (locals.token) redirect(302, redirectedFrom ? redirectedFrom : `/profile`)

    return {
        form: await superValidate(zod(formSchema)),
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        const { cookies, request, fetch } = event;
        const email = form.data.email;
        const password = form.data.password;
        const directus = client(fetch);

        if (!form.valid) return fail(400, { form });

        try {
            //a) First create the user
            await directus.request(createUser({ email, password }));
        } catch (e) {
            directusError(e)
        }

        try {
            // b) then login the user as usual
            const tokens = await loginUser(request, email, password);
            // save cookies
            cookies.set('access_token', tokens.access_token,
                constructCookieOpts(Math.floor(tokens.expires / 1000))
            );
            cookies.set('refresh_token', tokens.refresh_token,
                constructCookieOpts(60 * 60 * 24 * REFRESH_TOKEN_TTL)
            );

        } catch (e) {
            directusError(e)
        }

        return { form };
    }
};