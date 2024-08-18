<script lang="ts">
	import '../app.pcss';
	import { client, type DirectusClient } from '$lib/logic/directus';
	import { setContext } from 'svelte';

	import { ModeWatcher } from 'mode-watcher';
	import Navigation from '$lib/components/navigation/Navigation.svelte';

	const directus = client(fetch);
	setContext<DirectusClient>('directus', directus);

	let { children } = $props();
</script>

<ModeWatcher />

<div class="container grid gap-12 py-20" role="main">
	{@render children()}
</div>

<Navigation />
