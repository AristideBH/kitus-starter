<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';
	import { afterNavigate, disableScrollHandling } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';

	let { children }: { children: Snippet } = $props();

	afterNavigate(() => {
		disableScrollHandling();
		setTimeout(() => {
			scrollTo({ top: 0, behavior: 'instant' });
		}, 300);
	});
</script>

{#key $page.url.pathname}
	<main in:fly={{ y: 50, delay: 450 }} out:fade={{ duration: 300 }}>
		{@render children()}
	</main>
{/key}
