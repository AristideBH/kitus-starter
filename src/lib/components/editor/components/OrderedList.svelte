<script lang="ts">
	import type { TipTapNode } from '../index.d';
	import Builder from '../Builder.svelte';

	let { content, class: className }: { content: TipTapNode[]; class?: string } = $props();
</script>

<ol class={className ?? ''}>
	{#each content as item}
		<li>
			{#if item.type === 'listItem'}
				<Builder nodes={item.content} />
			{/if}
		</li>
	{/each}
</ol>
