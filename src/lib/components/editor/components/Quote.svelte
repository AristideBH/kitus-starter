<script lang="ts">
	import type { Collections } from '$lib/types/client';

	type Props = { content: Collections.Quote };

	let { content }: Props = $props();
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
