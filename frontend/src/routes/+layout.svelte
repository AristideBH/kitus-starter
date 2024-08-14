<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { client, type Client } from '$lib/logic/directus';
	import { setContext } from 'svelte';

	const directus = client(fetch);
	setContext<Client>('directus', directus);
</script>

<ModeWatcher />

<div class="container" role="main">
	<slot></slot>
</div>
