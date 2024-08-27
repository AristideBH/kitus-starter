<script lang="ts">
	import type { TipTapNode } from '../index.d';
	import Render from '../Render.svelte';

	let { content, class: className }: { content: TipTapNode[]; class?: string } = $props();
</script>

<ul class={className ?? ''}>
	{#each content as item}
		<li>
			{#if item.type === 'listItem'}
				<!-- <Render editor={item} /> -->
				todo : list item
			{/if}
		</li>
	{/each}
</ul>
