<script lang="ts">
	import type { TipTapNode } from '../index.d';
	import Render from '../Render.svelte';

	let { content, class: className }: { content: TipTapNode[]; class?: string } = $props();
</script>

<blockquote class="{className ?? ''} lead">
	{#each content as item}
		<Render editor={item} />
		{item.content[0].text}
	{/each}
</blockquote>
