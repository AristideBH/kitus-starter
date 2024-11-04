<script lang="ts">
	import type { TipTapNode } from '../index.d';
	import Builder from '../Builder.svelte';

	type Props = {
		content: TipTapNode[];
		class?: string;
	};

	let { content, class: className }: Props = $props();
</script>

<ul class={className ?? ''}>
	{#each content as item}
		<li>
			{#if item.type === 'listItem'}
				<Builder nodes={item.content} />
			{/if}
		</li>
	{/each}
</ul>
