<script lang="ts">
	import type { Collections } from '$lib/types/client';

	let { content }: { content: Collections.Quote } = $props();
</script>

<blockquote class="flex max-w-xl flex-col">
	<p class="lead">
		{content.text}
	</p>
	{#if content.author}
		<footer class="mt-2">— {content.author}</footer>
	{/if}
</blockquote>
