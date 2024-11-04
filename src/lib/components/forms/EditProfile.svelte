<script lang="ts">
	import { directusError, type DirectusClient } from '$lib/logic/directus';

	import { updateMe } from '@directus/sdk';
	import { getContext } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';

	import { toast } from 'svelte-sonner';
	import { page } from '$app/stores';
	import Footer from '../layout/Footer.svelte';

	const directus = getContext<DirectusClient>('directus');
	let user = $state($page.data.user);

	type Props = {
		class?: string;
	};
	let { class: className }: Props = $props();

	async function updateProfile() {
		try {
			await directus.request(
				updateMe({
					first_name: user.first_name,
					last_name: user.last_name,
					title: user.title
				})
			);
			toast.success('Profile updated successfully');
		} catch (e) {
			directusError(e, true);
		}
	}
</script>

<!-- <pre>{JSON.stringify($page.data.user, null, 2)}</pre> -->

<!-- {#if user.avatar}
	<img
		src={getImageURL(user.avatar)}
		alt=""
		class="layout-side-left mb-6 size-52 rounded-full border-2 ring-2 ring-primary"
	/>
{/if} -->

<Card.Root class="mx-auto w-full max-w-xl bg-muted">
	<Card.Header>
		<Card.Title class="mt-0 text-3xl">Profile</Card.Title>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4 ">
		<div class="inputWrapper">
			<Label for="first_name">Prénom</Label>
			<Input id="first_name" bind:value={user.first_name} />
		</div>
		<div class="inputWrapper">
			<Label for="last_name">Nom</Label>
			<Input id="last_name" bind:value={user.last_name} />
		</div>
		<div class="inputWrapper">
			<Label for="email">Email</Label>
			<Input id="email" disabled={true} required type="email" bind:value={user.email} />
		</div>
		<div class="inputWrapper">
			<Label for="title">Titre</Label>
			<Input id="title" bind:value={user.title} />
		</div>
	</Card.Content>
	<Card.Footer>
		<Button class="ms-auto w-fit " onclick={updateProfile}>Update profile</Button>
	</Card.Footer>
</Card.Root>

<style lang="postcss">
	.inputWrapper {
		@apply flex flex-col gap-1.5;
	}
</style>
