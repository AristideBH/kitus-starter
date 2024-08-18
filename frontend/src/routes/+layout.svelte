<script lang="ts">
	import '../app.pcss';
	import { client, type DirectusClient } from '$lib/logic/directus';
	import { setContext } from 'svelte';

	import { ModeWatcher } from 'mode-watcher';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import { page } from '$app/stores';
	console.log('🩺 > page:', $page);

	const directus = client(fetch);
	setContext<DirectusClient>('directus', directus);

	let { children } = $props();
</script>

<ModeWatcher />

<Navigation></Navigation>

{#key $page.data.pathname}
	<div class="container grid gap-12 py-20" role="main">
		{@render children()}
	</div>
{/key}
