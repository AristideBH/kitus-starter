<script lang="ts">
	import type { TipTapNode } from '../index.d';
	import Render from '../Render.svelte';

	let { content, class: className }: { content: TipTapNode[]; class?: string } = $props();
</script>

<ol class={className ?? ''}>
	{#each content as item}
		<li>
			{#if item.type === 'listItem'}
				<Render editor={item} />
			{/if}
		</li>
	{/each}
</ol>
