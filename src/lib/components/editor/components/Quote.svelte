<script lang="ts">
	import type { Collections } from '$lib/types/client';

	let { content }: { content: Collections.Quote } = $props();
	let { text, author } = content;
</script>

<blockquote class="flex max-w-xl flex-col">
	<p class="lead">
		{text}
	</p>
	{#if author}
		<footer class="mt-2">— {author}</footer>
	{/if}
</blockquote>
