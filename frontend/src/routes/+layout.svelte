<script lang="ts">
	import { client, type DirectusClient } from '$lib/logic/directus';
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { setContext } from 'svelte';

	const directus = client(fetch);
	setContext<DirectusClient>('directus', directus);

	let { children } = $props();
</script>

<ModeWatcher />

<div class="container" role="main">
	{@render children()}
</div>
