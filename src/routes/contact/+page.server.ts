import type { PageServerLoad, Actions } from './$types';
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "$lib/types/forms/contact";
import { zod } from "sveltekit-superforms/adapters";
import { client, directusError } from '$lib/logic/directus';
import { createContactFormsItem } from '$lib/types/client';

export const load = (async () => {
    return {
        form: await superValidate(zod(formSchema)),
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(formSchema));

        if (form.data.honeypot || !form.valid) {
            return fail(400, {
                form,
            });
        }

        try {
            const directus = client(fetch);
            await directus.request(createContactFormsItem(form.data))
        } catch (e) {
            directusError(e)
        }

        return {
            form,
        };
    },
};